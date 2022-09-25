import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    pendingExport: false
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

export const { addOption, importOptions, updateOption } = optionsSlice.actions

export default optionsSlice.reducer