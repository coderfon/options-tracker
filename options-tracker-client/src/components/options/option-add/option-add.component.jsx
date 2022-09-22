import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { addOption } from '../../../store/optionsSlice'
import OptionForm from "../option-form/option-form.component";

const OptionAdd = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const option = undefined;

    const formCallback = (option) => {
        console.log('Parent option-add');
        console.log(option);
        dispatch(addOption(option));

        navigate('/');
    }

    return (
        <div>
            <h1>Add new Option</h1>
            <OptionForm option={option} formCallback={formCallback}/>
        </div>
    );
}

export default OptionAdd;