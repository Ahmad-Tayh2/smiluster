import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
    data: [],
    unseen: 0,
    loading: false,
    error: null,
    message: null,
};
const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.data = action.payload;
            let count = 0;
            action.payload.map((item: any) => {
                count += !item.seen ? 0 : 1;
            });
            state.unseen = count;
        },
    },
});
export const { setNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
