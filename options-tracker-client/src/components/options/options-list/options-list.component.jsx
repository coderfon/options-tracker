import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { DateToString } from "../../../utils/date-utils";

import './options-list.style.css';

const OptionsList = () => {

    const optionsList = useSelector((state) => state.options.list);
    const optionsListReversed = [...optionsList].reverse().map(a => a);
    const [checked, setChecked] = React.useState(true);

    const optionsListToRender = checked ? optionsListReversed : optionsList; 

    const exportCsv = (event) => {
        
        console.log('options-list. Export CSV');
        console.log(optionsList);

        let csvContent = "data:text/csv;charset=utf-8," 
            + "id,date,ticker,type,action,strike,lastPrice,expiration,contracts,premium,currency,conversionRate,commission,campaign\n"
            + optionsList.map(o => o.id + ","
                + o.date + ","
                + o.ticker + ","
                + o.type + ","
                + o.action + ","
                + o.strike + ","
                + o.lastPrice + ","
                + o.expiration + ","
                + o.contracts + ","
                + o.premium + ","
                + o.currency + ","
                + o.conversionRate + ","
                + o.commission + ","
                + o.campaign
            ).join('\n');

        let fileName = new Date().toJSON().slice(0,16);

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `options-tracker-${fileName}.csv`);
        document.body.appendChild(link); // Required for FF
        
        link.click(); // This will download the data file named "my_data.csv".
    }

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <Fragment>
            <div>
                <button onClick={exportCsv}>Export CSV</button>
            </div>
            <div>
                <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}/> Show in reverse
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>date</th>
                        <th>ticker</th>
                        <th>type</th>
                        <th>action</th>
                        <th>lastPrice</th>
                        <th>expiration</th>
                        <th>contracts</th>
                        <th>premium</th>
                        <th>currency</th>
                        <th>conversionRate</th>
                        <th>commission</th>
                        <th>campaign</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                {optionsListToRender.map((option) => (
                    <tr key={option.id}>
                        <td>{DateToString(new Date(option.date))}</td>
                        <td>{option.ticker}</td>
                        <td>{option.type}</td>
                        <td>{option.action}</td>
                        <td>{option.lastPrice}</td>
                        <td>{DateToString(new Date(option.expiration))}</td>
                        <td>{option.contracts}</td>
                        <td>{option.premium}</td>
                        <td>{option.currency}</td>
                        <td>{option.conversionRate}</td>
                        <td>{option.commission}</td>
                        <td>{option.campaign}</td>
                        <td><Link to={`/option/edit/${option.id}`}>Edit</Link></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default OptionsList;