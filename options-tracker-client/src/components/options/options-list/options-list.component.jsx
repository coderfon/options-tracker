import React from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { DateToString } from "../../../utils/date-utils";
import { ObjectListToCsv } from "../../../utils/csv-utils"

import './options-list.style.css';

const OptionsList = () => {

    const optionsList = useSelector((state) => state.options.list);
    const optionsListReversed = [...optionsList].reverse().map(a => a);
    const [checked, setChecked] = useState(true);

    const optionsListToRender = checked ? optionsListReversed : optionsList; 

    const exportCsv = (event) => {
        
        console.log(optionsList);

        let csvContent = ObjectListToCsv(optionsList);
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
                        <th>strike</th>
                        <th>lastPrice</th>
                        <th>expiration</th>
                        <th>contracts</th>
                        <th>contractSize</th>
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
                        <td>{option.strike}</td>
                        <td>{option.lastPrice}</td>
                        <td>{DateToString(new Date(option.expiration))}</td>
                        <td>{option.contracts}</td>
                        <td>{option.contractSize}</td>
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