import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
}

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        addOption: (state, action) => {
            action.payload.id = state.list.length + 1;
            state.list.push(action.payload);
        },
        importOptions: (state, action) => {
            state.list = action.payload;        
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
            })  
        }
    }
});

export const { addOption, importOptions, updateOption } = optionsSlice.actions

export default optionsSlice.reducer