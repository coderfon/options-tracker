import { useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { updateOption } from '../../../store/optionsSlice';
import OptionForm from "../option-form/option-form.component";

const OptionEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [postId, setPostId] = useState(id);

    const dispatch = useDispatch()
    const optionsList = useSelector((state) => state.options.list);
    const option = optionsList.filter(o => o.id === postId)[0];

    const formCallback = (option) => {
        console.log('Parent option-edit');
        console.log(option);
        dispatch(updateOption(option));
        navigate('/');
    }

    return (
        <div>
            <h1>Edit existion Option</h1>
            <OptionForm option={option} formCallback={formCallback}/>
        </div>
    );
}

export default OptionEdit;