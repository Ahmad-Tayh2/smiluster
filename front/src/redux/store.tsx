import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "./features/appointments/appointmentsSlice";
import authReducer from "./features/auth/authSlice";
import invoicingReducer from "./features/invoicing/invoicingSlice";
import patientsReducer from "./features/patients/patientsSlice";
import settingsReducer from "./features/settings/settingsSlice";
import stockReducer from "./features/stock/stockSlice";
import documentsReducer from "./features/documents/documentsSlice";
import chartReducer from "./features/chart/chartSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";
import paginationReducer from "./features/pagination/paginationSlice";
const store = configureStore({
    reducer: {
        appointments: appointmentsReducer,
        auth: authReducer,
        invoicing: invoicingReducer,
        patients: patientsReducer,
        settings: settingsReducer,
        stock: stockReducer,
        documents: documentsReducer,
        chart: chartReducer,
        notifications: notificationsReducer,
        pagination: paginationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
