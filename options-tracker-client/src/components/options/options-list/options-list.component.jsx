import React from "react";
import { Component, Fragment } from "react";
import { useSelector } from 'react-redux'

const OptionsList = () => {

    const optionsList = useSelector((state) => state.options.list);

    return (
        <Fragment>
            {optionsList.map((option) => (
                <div><span>{option.ticker}</span> <span>{option.action}</span></div>
            ))}
        </Fragment>
    );
}

export default OptionsList;