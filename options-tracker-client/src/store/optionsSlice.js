import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    pendingExport: false,
    showAddOptionDialog: false
}

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        addOption: (state, action) => {
            action.payload.id = state.list.length + 1;
            state.list.push(action.payload);
            state.pendingExport = true;
        },
        importOptions: (state, action) => {
            state.list = action.payload; 
            state.pendingExport = false;       
        },
        resetPendingExport: (state) => {
            state.pendingExport = false;
        },
        toggleAddOptionDialog: (state) => {
            state.showAddOptionDialog = !state.showAddOptionDialog;
        },
        toggleCalculatorDialog: (state) => {
            state.showCalculatorDialog = !state.showCalculatorDialog;
        },
        updateOption: (state, action) => {
            state.list = state.list.map((item) => {
                if(item.id !== action.payload.id) {
                    return item;
                }

                return {
                    ...item,
                    ...action.payload
                }
            });
            state.pendingExport = true;  
        }
    }
});

export const { addOption, importOptions, resetPendingExport, toggleAddOptionDialog, toggleCalculatorDialog, updateOption } = optionsSlice.actions

export default optionsSlice.reducer