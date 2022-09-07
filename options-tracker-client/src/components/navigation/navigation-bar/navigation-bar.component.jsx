import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
    return (
        <Fragment>
            <div className="navbar">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/add-option'>Add Option</Link></li>
                </ul>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;