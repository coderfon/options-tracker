import { useDispatch } from 'react-redux'
import { addOption } from '../../../store/optionsSlice'
import OptionForm from "../option-form/option-form.component";

const OptionAdd = () => {

    const dispatch = useDispatch()
    const option = undefined;

    const formCallback = (option) => {
        console.log('Parent option-add');
        console.log(option);
        dispatch(addOption(option));
    }

    return (
        <div>
            <h1>Add new Option</h1>
            <OptionForm option={option} formCallback={formCallback}/>
        </div>
    );
}

export default OptionAdd;