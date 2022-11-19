import { useState, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker"
import { ParseStringToDate } from '../../../utils/date-utils';

const OptionCalculator = (props) => {

    const [premium, setPremium] = useState();
    const [strike, setStrike] = useState();
    const [openDate, setOpenDate] = useState();
    const [expiration, setExpiration] = useState();
    const [dateDiff, setDateDiff] = useState();
    const [arr, setArr] = useState();

    useEffect(() => {
        if(openDate !== undefined && expiration !== undefined) {
            let span = new Date(expiration).getTime() - new Date(openDate).getTime();
            setDateDiff(span / 86400000);        
        }
    }, [openDate, expiration]);

    useEffect(() => {        
        if(dateDiff > 0 && strike !== undefined && strike > 0) {
            let result = premium / strike * 100 * 365 / dateDiff;
            setArr(result);
        }
    }, [premium, strike, dateDiff]);

    return (
        <Fragment>
            <div>
                <div className="form-field">
                    <label>Premium</label>
                    <input name="premium" value={premium || ''} type="number" onChange={e => setPremium(e.target.value)} required />
                </div>
                <div className="form-field">
                    <label>strike</label>
                    <input name="strike" value={strike || ''} type="number" onChange={e => setStrike(e.target.value)} required />
                </div>
                <div className="form-field">
                    <label>Open date</label>
                    <DatePicker name="datefrom" dateFormat="yyyy-MM-dd" autocomplete="off" selected={ParseStringToDate(openDate)} onChange={(date) => setOpenDate(date)} required />
                </div>
                <div className="form-field">
                    <label>Expiration</label>
                    <DatePicker name="datefrom" dateFormat="yyyy-MM-dd" autocomplete="off" selected={ParseStringToDate(expiration)} onChange={(date) => setExpiration(date)} required />
                </div>
            </div>
            <div>
                <span>{arr !== undefined ? arr.toFixed(2) : 0} %</span>
            </div>
            <div>
                <span>{dateDiff} days to expiration</span>
            </div>
            <button type="button" onClick={props.onClose}>Close</button>
        </Fragment>
    );
}

export default OptionCalculator;