import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { updateOption } from '../../../store/optionsSlice';
import OptionForm from "../option-form/option-form.component";

const OptionEdit = (props) => {

    const dispatch = useDispatch()
    const optionsList = useSelector((state) => state.options.list);
    const option = optionsList.filter(o => o.id === parseInt(props.id))[0];

    console.log(optionsList);
    console.log(option);

    const formCallback = (option) => {
        console.log('Parent option-edit');
        console.log(option);
        dispatch(updateOption(option));
        props.onClose();
    }

    const formCancelCallback = () => {
        props.onClose();
    }

    return (
        <div>
            <h1>Edit existion Option</h1>
            <OptionForm option={option} formCallback={formCallback} formCancelCallback={formCancelCallback}/>
        </div>
    );
}

export default OptionEdit;