import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { resetPendingExport, toggleAddOptionDialog, toggleCalculatorDialog } from '../../../store/optionsSlice'
import { ObjectListToCsv } from "../../../utils/csv-utils";
import homeIcon from '../../../resources/images/home.png';
import addIcon from '../../../resources/images/add.png';
import exportIcon from '../../../resources/images/cloud-download.png';
import importIcon from '../../../resources/images/cloud-upload.png';
import calculatorIcon from '../../../resources/images/calculator.png';

import './navigation-bar.style.css';

const Navigation = () => {

    const dispatch = useDispatch();
    const optionsList = useSelector(state => state.options.list);
    const pendingExport = useSelector(state => state.options.pendingExport);

    const exportHandler = (event) => {

        console.log(optionsList);

        let csvContent = ObjectListToCsv(optionsList);
        let fileName = new Date().toJSON().slice(0, 16);

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `options-tracker-${fileName}.csv`);
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".

        dispatch(resetPendingExport());
    }

    const addOptionHandler = () => {
        dispatch(toggleAddOptionDialog());
    }

    const showCalculatorHandler = () => {
        dispatch(toggleCalculatorDialog());
    }

    return (
        <Fragment>
            <div className="navbar">
                <ul>
                    <li><Link to='/options-tracker'><img src={homeIcon} alt="Home" /></Link></li>
                    <li><a onClick={addOptionHandler}><img src={addIcon} alt="Add Option" /></a></li>
                    <li><Link to='/options-tracker/option/import'><img src={importIcon} alt="Import" /></Link></li>                  
                    <li><a onClick={exportHandler}><img src={exportIcon} className={`${pendingExport ? "pendingExport" : ""}`} alt="Export" /></a></li>
                    <li><a onClick={showCalculatorHandler}><img src={calculatorIcon} alt="Calculator" /></a></li>
                </ul>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;