import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
    return (
        <Fragment>
            <div className="navbar">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/option/add'>Add Option</Link></li>
                    <li><Link to='/option/import'>Import Option</Link></li>
                </ul>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;