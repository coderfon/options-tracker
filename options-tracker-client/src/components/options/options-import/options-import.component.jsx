import { React, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { importOptions } from "../../../store/optionsSlice";


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
                const list = processCSV(evt.target.result);
         
                setImportedList(list);
            }
            reader.onerror = function(evt) {
                console.log('error reading the file');
            }

            reader.readAsText(file, "UTF-8");
        }
    }

    const processCSV = (text) => {
        
        console.log('options-import. processCSV');
        console.log(text);
        const csvHeader = text.slice(0, text.indexOf("\n")).split(",");
        const csvRows = text.slice(text.indexOf("\n")).split("\n").filter(n => n);

        const array = csvRows.map(row => {

            const ints = ["id", "contracts"];
            const floats = ["commission", "conversionRate", "lastPrice", "premium", "strike"];

            const values = row.split(',');
            const obj = csvHeader.reduce((object, header, index) => {
                if(ints.includes(header)) {
                    object[header] = parseInt(values[index]);
                }
                else if(floats.includes(header)) {
                    object[header] = parseFloat(values[index]);
                }
                else {
                    object[header] = values[index];
                }
                
                return object;
              }, {});
              return obj;
        });

        console.log(array);

        return (array);
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