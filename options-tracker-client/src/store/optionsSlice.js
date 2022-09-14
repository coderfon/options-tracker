import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
}

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        addOption: (state, action) => {
            state.list.push(action.payload)
        },
    }
});

export const { addOption } = optionsSlice.actions

export default optionsSlice.reducer