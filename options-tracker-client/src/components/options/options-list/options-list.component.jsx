import React from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker"
import OptionsSummary from '../options-summary/options-summary.component';
import { CalculateOptionNet, CalculateSummary } from '../../../services/option-summary.service';
import { DateToString } from "../../../utils/date-utils";
import { ObjectListToCsv } from "../../../utils/csv-utils"
import editIcon from '../../../resources/images/edit-icon.png'

import './options-list.style.css';

const OptionsList = () => {

    const optionsList = useSelector((state) => state.options.list);
    const optionsListReversed = [...optionsList].reverse().map(a => a);
    const [reverseList, setReverseList] = useState(true);
    
    const [actionFilter, setActionFilter] = useState('ALL');
    const [campaignFilter, setCampaignFilter] = useState('');
    const [currencyFilter, setCurrencyFilter] = useState('');
    const [tickerFilter, setTickerFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('ALL');
    const [fromDateFilter, setFromDateFilter] = useState();
    const [toDateFilter, setToDateFilter] = useState();
    const [fromExpirationFilter, setFromExpirationFilter] = useState();
    const [toExpirationFilter, setToExpirationFilter] = useState();

    let today = new Date();
    let optionsListToRender = reverseList ? optionsListReversed : optionsList;

    if (actionFilter && actionFilter !== 'ALL') {
        optionsListToRender = optionsListToRender.filter(option => {
            return option.action === actionFilter;
        });
    }

    if (campaignFilter) {
        optionsListToRender = optionsListToRender.filter(option => {
            return option.campaign.includes(campaignFilter.toUpperCase());
        });
    }

    if (currencyFilter) {
        optionsListToRender = optionsListToRender.filter(option => {
            return option.currency.includes(currencyFilter.toUpperCase());
        });
    }

    if (fromDateFilter) {
        const calculatedDate = new Date(fromDateFilter);
        optionsListToRender = optionsListToRender.filter(option => {
            return option.date >= fromDateFilter.getTime();
        });
    }

    if (tickerFilter) {
        optionsListToRender = optionsListToRender.filter(option => {
            return option.ticker.includes(tickerFilter.toUpperCase());
        });
    }

    if (typeFilter && typeFilter !== 'ALL') {
        optionsListToRender = optionsListToRender.filter(option => {
            return option.type === typeFilter;
        });
    }

    if (toDateFilter) {
        optionsListToRender = optionsListToRender.filter(option => {
            return option.date <= toDateFilter.getTime();
        });
    }

    if (fromExpirationFilter) {
        optionsListToRender = optionsListToRender.filter(option => {
            return option.expiration >= fromExpirationFilter.getTime();
        });
    }

    if (toExpirationFilter) {
        optionsListToRender = optionsListToRender.filter(option => {
            return option.expiration <= toExpirationFilter.getTime();
        });
    }

    const summary = CalculateSummary(optionsListToRender);

    const exportCsv = (event) => {

        console.log(optionsList);

        let csvContent = ObjectListToCsv(optionsList);
        let fileName = new Date().toJSON().slice(0, 16);

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `options-tracker-${fileName}.csv`);
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
    }

    const reverseCheckboxHandler = () => {
        setReverseList(!reverseList);
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
                        checked={reverseList}
                        onChange={reverseCheckboxHandler} /> Show in reverse
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <div>
                                <DatePicker
                                    dateFormat="yyyy-MM-dd"
                                    className="listFilter"
                                    placeholderText="From date"
                                    selected={fromDateFilter}
                                    selectsStart
                                    startDate={fromDateFilter}
                                    endDate={toDateFilter}
                                    onChange={(date) =>
                                        setFromDateFilter(date)} />
                            </div>
                            <div>
                                <DatePicker dateFormat="yyyy-MM-dd"
                                    className="listFilter"
                                    placeholderText="To date"
                                    selected={toDateFilter}
                                    selectsEnd
                                    startDate={fromDateFilter}
                                    endDate={toDateFilter}
                                    minDate={fromDateFilter}
                                    onChange={(date) => setToDateFilter(date)} />
                            </div>
                        </th>
                        <th>
                            <input name="tickerFilter"
                                type="search"
                                className="listFilter"
                                placeholder="ticker"
                                onChange={e => setTickerFilter(e.target.value)} />
                        </th>
                        <th>
                            <select name="type" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                                <option value="ALL">C/P</option>
                                <option value="PUT">PUT</option>
                                <option value="CALL">CALL</option>
                            </select>
                        </th>
                        <th>
                            <select name="action" value={actionFilter} onChange={e => setActionFilter(e.target.value)}>
                                <option value="ALL">b/s</option>
                                <option value="buy">buy</option>
                                <option value="sell">sell</option>
                            </select>
                        </th>
                        <th>strike</th>
                        <th>lastPrice</th>
                        <th>
                            <div>
                                <DatePicker
                                    dateFormat="yyyy-MM-dd"
                                    className="listFilter"
                                    placeholderText="From exp"
                                    selected={fromExpirationFilter}
                                    selectsStart
                                    startDate={fromExpirationFilter}
                                    endDate={toExpirationFilter}
                                    onChange={(date) =>
                                        setFromExpirationFilter(date)} />
                            </div>
                            <div>
                                <DatePicker dateFormat="yyyy-MM-dd"
                                    className="listFilter"
                                    placeholderText="To exp"
                                    selected={toExpirationFilter}
                                    selectsEnd
                                    startDate={fromExpirationFilter}
                                    endDate={toExpirationFilter}
                                    minDate={fromExpirationFilter}
                                    onChange={(date) => setToExpirationFilter(date)} />
                            </div>
                        </th>
                        <th>ctrs</th>
                        <th>ctrsSz</th>
                        <th>premium</th>
                        <th>
                            <input name="currencyFilter"
                                type="text"
                                className="listFilter"
                                placeholder="currency"
                                onChange={e => setCurrencyFilter(e.target.value)} />
                        </th>                    
                        <th>comm</th>
                        <th>net</th>
                        <th>
                            <input name="campaignFilter"
                                value={campaignFilter}
                                type="search"
                                className="listFilter"
                                placeholder="campaign"
                                onChange={e => setCampaignFilter(e.target.value)} />
                        </th>
                        <th>conv.Rate</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {optionsListToRender.map((option) => (
                        <tr key={option.id} className={option.expiration >= today.getTime() ? 'active' : 'expired'}>
                            <td>{DateToString(new Date(option.date))}</td>
                            <td>{option.ticker}</td>
                            <td>{option.type}</td>
                            <td>{option.action}</td>
                            <td>{option.strike}</td>
                            <td>{option.lastPrice}</td>
                            <td>{DateToString(new Date(option.expiration))}</td>
                            <td>{option.contracts}</td>
                            <td>{option.contractSize}</td>
                            <td>{option.action === "sell" ? option.premium : option.premium * -1}</td>
                            <td>{option.currency}</td>
                            <td>{option.commission}</td>
                            <td>{CalculateOptionNet(option).toFixed(2)}</td>
                            <td><span onClick={e => setCampaignFilter(option.campaign)}>{option.campaign}</span></td>
                            <td>{option.conversionRate}</td>
                            <td><Link to={`/option/edit/${option.id}`}><img className="edit-icon" src={editIcon} alt="edit"/></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {summary && <OptionsSummary summary={summary} />}
            
        </Fragment>
    );
}

export default OptionsList;