import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    drawerOpen: false,
    filterText: "",
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDrawer: (state, action) => {
            state.drawerOpen = action.payload
        },
        changeText: (state, action) => {
            state.filterText = action.payload
        }
        
    },
    extraReducers: (builder) => {

    }
})

export const {toggleDrawer, changeText} = appSlice.actions
export default appSlice.reducer