import { Component, Fragment } from "react";

const OptionAdd = () => {

    const options = [];

    const handleSubmit = (event) => {
        event.preventDefault();

        const option = {
            date: event.target.date.value,
            ticker: event.target.ticker.value,
            option: event.target.option.value,
            action: event.target.action.value,
            strike: event.target.strike.value,
            lastPrice: event.target.lastPrice.value,
            expiration: event.target.expiration.value,
            contracts: event.target.contracts.value,
            premium: event.target.premium.value,
            currency: event.target.currency.value,
            conversionRate: event.target.conversionRate.value,
            comission: event.target.comission.value
        };

        options.push(option);

        console.log(options);
    }

    return (
        <Fragment>
            <fieldset>
                <legend>Add Option Operation</legend>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Date</label>
                        <input name="date" type="date" required />
                    </div>
                    <div className="form-field">
                        <label>Ticker</label>
                        <input name="ticker" type="text" required />
                    </div>
                    <div className="form-field">
                        <label>Option</label>
                        <select name="option">
                            <option value="put">PUT</option>
                            <option value="call">CALL</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Action</label>
                        <select name="action">
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Strike</label>
                        <input name="strike" required />
                    </div>
                    <div className="form-field">
                        <label>Last Price</label>
                        <input name="lastPrice" required />
                    </div>
                    <div className="form-field">
                        <label>Expiration</label>
                        <input name="expiration" type="date" required />
                    </div>
                    <div className="form-field">
                        <label>Contracts</label>
                        <input name="contracts" type="number" required />
                    </div>
                    <div className="form-field">
                        <label>Premium</label>
                        <input name="premium" type="number" required />
                    </div>
                    <div className="form-field">
                        <label>Currency</label>
                        <input name="currency" required />
                    </div>
                    <div className="form-field">
                        <label>Conv.Rate</label>
                        <input name="conversionRate" type="number" step="any" required />
                    </div>
                    <div className="form-field">
                        <label>Commision</label>
                        <input name="comission" type="number" step="any" required />
                    </div>
                    <div>
                        <button>Save</button>
                    </div>
                </form>
            </fieldset>
        </Fragment>
    );
}

export default OptionAdd;