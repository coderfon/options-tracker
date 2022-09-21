import React from "react";
import { useState} from "react";


const OptionForm = ({option, formCallback}) => {

    const [id, setId] = useState(option?.id);
    const [date, setDate] = useState(option?.date);
    const [ticker, setTicker] = useState(option?.ticker);
    const [type, setType] = useState(option == undefined ? 'put' : option.type);
    const [action, setAction] = useState(option == undefined ? 'buy' : option.action);
    const [strike, setStrike] = useState(option?.strike);
    const [lastPrice, setLastPrice] = useState(option?.lastPrice);
    const [expiration, setExpiration] = useState(option?.expiration);
    const [contracts, setContracts] = useState(option?.contracts);
    const [premium, setPremium] = useState(option?.premium);
    const [currency, setCurrency] = useState(option?.currency);
    const [conversionRate, setConversionRate] = useState(option?.conversionRate);
    const [comission, setComission] = useState(option?.comission);
    const [campaign, setCampaign] = useState(option?.campaign);

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedOption = {
            id: id,
            date: date,
            ticker: ticker,
            type: type,
            action: action,
            strike: strike,
            lastPrice: lastPrice,
            expiration: expiration,
            contracts: contracts,
            premium: premium,
            currency: currency,
            conversionRate: conversionRate,
            comission: comission,
            campaign: campaign
        };

        formCallback(editedOption)
    }

    return (
        <fieldset>
                <legend>Option Form</legend>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Date</label>
                        <input name="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Ticker</label>
                        <input name="ticker" type="text" value={ticker} onChange={e => setTicker(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Type</label>
                        <select name="type" value={type} onChange={e => setType(e.target.value)}>
                            <option value="put">PUT</option>
                            <option value="call">CALL</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Action</label>
                        <select name="action" value={action} onChange={e => setAction(e.target.value)}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Strike</label>
                        <input name="strike" value={strike} onChange={e => setStrike(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Last Price</label>
                        <input name="lastPrice" value={lastPrice} onChange={e => setLastPrice(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Expiration</label>
                        <input name="expiration" value={expiration} type="date" onChange={e => setExpiration(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Contracts</label>
                        <input name="contracts" value={contracts} type="number" onChange={e => setContracts(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Premium</label>
                        <input name="premium" value={premium} type="number" onChange={e => setPremium(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Currency</label>
                        <input name="currency" value={currency} onChange={e => setCurrency(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Conv.Rate</label>
                        <input name="conversionRate" value={conversionRate} type="number" step="any" onChange={e => setConversionRate(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Commision</label>
                        <input name="comission" value={comission} type="number" step="any" onChange={e => setComission(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Campaign</label>
                        <input name="campaign" value={campaign} type="text"  onChange={e => setCampaign(e.target.value)} required />
                    </div>
                    <div>
                        <button>Save</button>
                    </div>
                </form>
            </fieldset>
    );
}

export default OptionForm;