import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import './navigation-bar.style.css';

const Navigation = () => {
    return (
        <Fragment>
            <div className="navbar">
                <ul>
                    <li><Link to='/options-tracker'>Home</Link></li>
                    <li><Link to='/options-tracker/option/add'>Add Option</Link></li>
                    <li><Link to='/options-tracker/option/import'>Import Option</Link></li>
                </ul>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;