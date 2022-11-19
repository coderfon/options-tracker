import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddOptionDialog, toggleCalculatorDialog } from "../../store/optionsSlice";
import OptionsList from '../../components/options/options-list/options-list.component';
import Modal from '../../components/navigation/modal/modal.component';
import OptionEdit from '../../components/options/option-edit/option-edit.component';
import OptionAdd from '../../components/options/option-add/option-add.component';
import OptionCalculator from "../../components/options/option-calculator/option-calculator.component";



const Home = () => {

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState();
    const showAddOptionDialog = useSelector(state => state.options.showAddOptionDialog);
    const showCalculatorDialog = useSelector(state => state.options.showCalculatorDialog);

    const triggerEditHandler = (id) => {
        setEditId(id);
        setIsEdit(true);
    }

    const modalCloseHandler = () => {
        setEditId(undefined);
        setIsEdit(false);
        if(showAddOptionDialog) {
            dispatch(toggleAddOptionDialog());
        }
        if(showCalculatorDialog) {
            dispatch(toggleCalculatorDialog());
        }
    }

    return (
        <div>
            <OptionsList onEditHandler={triggerEditHandler}></OptionsList>
            {isEdit &&<Modal><OptionEdit id={editId} onClose={modalCloseHandler}/></Modal>} 
            {showAddOptionDialog &&<Modal><OptionAdd onClose={modalCloseHandler}/></Modal>}   
            {showCalculatorDialog && <Modal><OptionCalculator onClose={modalCloseHandler} /></Modal>}      

            <h2>TO DO</h2>
            <ul>
                <li>Import css</li>
            </ul>
  
        </div>       
    );
}

export default Home;