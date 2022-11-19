import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import classes from './option-form.module.css';
import { ParseStringToDate } from "../../../utils/date-utils";


const OptionForm = ({ option, formCallback, formCancelCallback }) => {

    const [id, setId] = useState(option?.id);
    const [date, setDate] = useState(option?.date);
    const [ticker, setTicker] = useState(option?.ticker);
    const [type, setType] = useState(option === undefined ? 'PUT' : option.type);
    const [action, setAction] = useState(option === undefined ? 'buy' : option.action);
    const [strike, setStrike] = useState(option?.strike);
    const [lastPrice, setLastPrice] = useState(option?.lastPrice);
    const [expiration, setExpiration] = useState(option?.expiration);
    const [contracts, setContracts] = useState(option?.contracts);
    const [contractSize, setContractSize] = useState(option?.contractSize);
    const [premium, setPremium] = useState(option?.premium);
    const [currency, setCurrency] = useState(option?.currency);
    const [conversionRate, setConversionRate] = useState(option?.conversionRate);
    const [commission, setCommission] = useState(option?.commission);
    const [campaign, setCampaign] = useState(option?.campaign);

    const [daysToExpiration, setDaysToExpiration] = useState(0);
    const [totalRisk, setTotalRisk] = useState(0);
    const [totalRiskBase, setTotalRiskBase] = useState(0);
    const [totalBenefit, setTotalBenefit] = useState(0);
    const [annualRateOfReturn, setAnnualRateOfReturn] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        var calculatedDate = new Date(date);
        var calculatedExpiration = new Date(expiration);

        const editedOption = {
            id: id,
            date: calculatedDate.getTime(),
            ticker: ticker,
            type: type,
            action: action,
            strike: parseFloat(strike),
            lastPrice: parseFloat(lastPrice),
            expiration: calculatedExpiration.getTime(),
            contracts: parseInt(contracts),
            contractSize: parseInt(contractSize),
            premium: parseFloat(premium),
            currency: currency,
            conversionRate: parseFloat(conversionRate),
            commission: parseFloat(commission),
            campaign: campaign
        };

        console.log(editedOption);

        formCallback(editedOption)
    }

    useEffect(() => {
        if(date !== undefined && expiration !== undefined) {
            let span = new Date(expiration).getTime() - new Date(date).getTime();
            let days = span / 86400000;
            setDaysToExpiration(days);
        }
    }, [date, expiration]);

    useEffect(() => {
        if(strike !== undefined && contracts !== undefined && contractSize !== undefined) {
            setTotalRisk(strike * contracts * contractSize);
        }

    }, [strike, contracts, contractSize]);

    useEffect(() => {
        if(totalRisk !== undefined && conversionRate !== null) {
            setTotalRiskBase((totalRisk / conversionRate).toFixed(2));
        }

    }, [totalRisk, conversionRate]);

    useEffect(() => {
        if(premium !== undefined && contracts !== null && contractSize !== null) {
            setTotalBenefit((action === ('buy' || 'xbuy') ? -1 : 1) * premium * contracts * contractSize - commission);
        }

    }, [action, premium, contracts, contractSize, commission]);

    useEffect(() => {
       if(totalRisk > 0 && daysToExpiration > 0) {
        setAnnualRateOfReturn((totalBenefit / totalRisk * 100 * 365 / daysToExpiration).toFixed(2));
       }
        
    }, [daysToExpiration, totalRisk, totalBenefit]);

    return (

            <form onSubmit={handleSubmit}>
                <div className={classes.wrapper}>
                    <div className="form-field">
                        <label>Date</label>
                        <DatePicker name="datefrom" dateFormat="yyyy-MM-dd" autocomplete="off" selected={ParseStringToDate(date)} onChange={(date) => setDate(date)} required />
                    </div>
                    <div className="form-field">
                        <label>Ticker</label>
                        <input name="ticker" type="text" value={ticker || ''} onChange={e => setTicker(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Type</label>
                        <select name="type" value={type || 'PUT'} className={classes.formSelect} onChange={e => setType(e.target.value)}>
                            <option value="PUT">PUT</option>
                            <option value="CALL">CALL</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Action</label>
                        <select name="action" value={action || 'buy'} className={classes.formSelect} onChange={e => setAction(e.target.value)}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                            <option value="xbuy">xBuy</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Strike</label>
                        <input name="strike" value={strike || ''} onChange={e => setStrike(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Last Price</label>
                        <input name="lastPrice" value={lastPrice || ''} onChange={e => setLastPrice(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Expiration</label>
                        <DatePicker dateFormat="yyyy-MM-dd" autocomplete="off" selected={ParseStringToDate(expiration)} onChange={(date) => setExpiration(date)} required />
                    </div>
                    <div className="form-field">
                        <label>Contracts</label>
                        <input name="contracts" value={contracts || ''} type="number" onChange={e => setContracts(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Contract Size</label>
                        <input name="contractSize" value={contractSize || ''} type="number" onChange={e => setContractSize(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Premium</label>
                        <input name="premium" value={premium || ''} type="number" onChange={e => setPremium(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Currency</label>
                        <input name="currency" value={currency || ''} onChange={e => setCurrency(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Conv.Rate</label>
                        <input name="conversionRate" value={conversionRate || ''} type="number" step="any" onChange={e => setConversionRate(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Commission</label>
                        <input name="commission" value={commission || ''} type="number" step="any" onChange={e => setCommission(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Campaign</label>
                        <input name="campaign" value={campaign || ''} type="text" onChange={e => setCampaign(e.target.value)} required />
                    </div>
                </div>
                <div className={classes.stats}>
                    <div>Days to Exp: {daysToExpiration}</div>
                    <div>Total Benefit: {totalBenefit}</div>
                    <div>Total Risk: {totalRisk} (Base: {totalRiskBase})</div>
                    <div>Anualized return: {annualRateOfReturn}%</div>
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={formCancelCallback}>Cancel</button>
            </form>     

    );
}

export default OptionForm;