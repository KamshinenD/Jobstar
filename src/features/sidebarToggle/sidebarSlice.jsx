import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarIsOpen: false
};


const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarIsOpen = !state.sidebarIsOpen;
        }
    }
})


export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;