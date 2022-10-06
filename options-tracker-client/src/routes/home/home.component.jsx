import { useState } from "react";
import OptionsList from '../../components/options/options-list/options-list.component';
import Modal from '../../components/navigation/modal/modal.component';
import OptionEdit from '../../components/options/option-edit/option-edit.component';
import OptionAdd from '../../components/options/option-add/option-add.component';



const Home = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState();
    const [isAdd, setIsAdd] = useState(false);

    const triggerEditHandler = (id) => {
        setEditId(id);
        setIsEdit(true);
    }

    const modalCloseHandler = () => {
        setEditId(undefined);
        setIsEdit(false);
        setIsAdd(false);
    }

    return (
        <div>
            <button onClick={e => setIsAdd(true)}>Add option</button>
            <OptionsList onEditHandler={triggerEditHandler}></OptionsList>
            {isEdit &&<Modal><OptionEdit id={editId} onClose={modalCloseHandler}/></Modal>} 
            {isAdd &&<Modal><OptionAdd onClose={modalCloseHandler}/></Modal>} 


            <h2>TO DO</h2>
            <ul>
                <li>Import css</li>
                <li>Bell icon alarm to inform that export is needed</li>
                <li>Autocomplete for the Campaign textbox</li>
            </ul>
  
        </div>       
    );
}

export default Home;