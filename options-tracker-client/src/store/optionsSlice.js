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
    }
});

export const { addOption } = optionsSlice.actions

export default optionsSlice.reducer