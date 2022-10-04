import { React, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { importOptions } from "../../../store/optionsSlice";
import { CsvToObjectList } from '../../../utils/csv-utils';


const OptionsImport = () => {

    const dispatch = useDispatch();
    const [importedList, setImportedList] = useState([]);
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const file = event.target.file.files[0];

        if(file) {
            var reader = new FileReader();
            
            reader.onload = function(evt) {
                const text = evt.target.result;                
                const list =  CsvToObjectList(text);

                console.log(text);
                console.log(list);
                
                setImportedList(list);
            }
            reader.onerror = function(evt) {
                console.log('error reading the file');
            }

            reader.readAsText(file, "UTF-8");
        }
    }

    useEffect(() => {
        dispatch(importOptions(importedList));
        if(importedList.length) {
            navigate('/');
        }
        
    }, [importedList,dispatch]);

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input 
                type="file"
                name="file"
                accept=".csv"/>
                <button>Import</button>
            </form>
        </div>
    );
}

export default OptionsImport;