import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker"
import "./option-form.style.css"
import "react-datepicker/dist/react-datepicker.css";


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

    const parseStringToDate = (myDate) => {
        if (myDate === undefined) {
            return '';
        }

        return new Date(myDate);
    }

    return (
        <fieldset>
            <legend>Option Form</legend>
            <form onSubmit={handleSubmit}>
                <div className="wrapper">
                    <div className="form-field">
                        <label>Date</label>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={parseStringToDate(date)} onChange={(date) => setDate(date)} required />
                    </div>
                    <div className="form-field">
                        <label>Ticker</label>
                        <input name="ticker" type="text" value={ticker || ''} onChange={e => setTicker(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Type</label>
                        <select name="type" value={type || 'PUT'} onChange={e => setType(e.target.value)}>
                            <option value="PUT">PUT</option>
                            <option value="CALL">CALL</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Action</label>
                        <select name="action" value={action || 'buy'} onChange={e => setAction(e.target.value)}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
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
                        <DatePicker dateFormat="yyyy-MM-dd" selected={parseStringToDate(expiration)} onChange={(date) => setExpiration(date)} required />
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
                <button type="submit">Save</button>
                <button type="button" onClick={formCancelCallback}>Cancel</button>
            </form>     
        </fieldset >
    );
}

export default OptionForm;