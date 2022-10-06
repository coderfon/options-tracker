import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { addOption } from '../../../store/optionsSlice'
import OptionForm from "../option-form/option-form.component";

const OptionAdd = (props) => {

    const dispatch = useDispatch()
    const option = undefined;

    const formCallback = (option) => {
        console.log('Parent option-add');
        console.log(option);
        dispatch(addOption(option));
        props.onClose();
    }

    const formCancelCallback = () => {
        props.onClose();
    }

    return (
        <div>
            <h1>Add new Option</h1>
            <OptionForm option={option} formCallback={formCallback} formCancelCallback={formCancelCallback}/>
        </div>
    );
}

export default OptionAdd;