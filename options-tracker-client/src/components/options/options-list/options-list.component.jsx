import React from "react";
import { Fragment } from "react";
import { useSelector } from 'react-redux';

import './options-list.style.css';

const OptionsList = () => {

    const optionsList = useSelector((state) => state.options.list);
    const optionsListReversed = [...optionsList].reverse().map(a => a);

    const [checked, setChecked] = React.useState(true);

    const optionsListToRender = checked ? optionsListReversed : optionsList; 

    const handleChange = () => {
      setChecked(!checked);
    };

    console.log(optionsList);

    const exportCsv = (event) => {
        
        let csvContent = "data:text/csv;charset=utf-8," 
            + "id,date,ticker,option,action,strike,lastPrice,expiration,contracts,premium,currency,conversionRate,comission\n"
            + optionsList.map(o => o.id + ","
                + o.date + ","
                + o.ticker + ","
                + o.option + ","
                + o.action + ","
                + o.strike + ","
                + o.lastPrice + ","
                + o.expiration + ","
                + o.contracts + ","
                + o.premium + ","
                + o.currency + ","
                + o.conversionRate + ","
                + o.comission
            ).join('\n');

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        
        link.click(); // This will download the data file named "my_data.csv".
    }

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
                <tr>
                    <th>date</th>
                    <th>ticker</th>
                    <th>option</th>
                    <th>action</th>
                    <th>lastPrice</th>
                    <th>expiration</th>
                    <th>contracts</th>
                    <th>premium</th>
                    <th>currency</th>
                    <th>conversionRate</th>
                    <th>comission</th>
                </tr>
                {optionsListToRender.map((option) => (
                <tr key={option.id}>
                    <td>{option.date}</td>
                    <td>{option.ticker}</td>
                    <td>{option.option}</td>
                    <td>{option.action}</td>
                    <td>{option.lastPrice}</td>
                    <td>{option.expiration}</td>
                    <td>{option.contracts}</td>
                    <td>{option.premium}</td>
                    <td>{option.currency}</td>
                    <td>{option.conversionRate}</td>
                    <td>{option.comission}</td>
                </tr>
                ))}
            </table>
        </Fragment>
    );
}

export default OptionsList;