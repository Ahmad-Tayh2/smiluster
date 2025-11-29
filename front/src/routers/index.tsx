import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import RequireAuth from "./RequireAuth";

import { ROUTER } from "../constants/env";
import RequireAuth from "./RequireAuth";
import Layout from "../Layout";
import Home from "../pages/Home";
// import AdminProfile from "../pages/AdminProfile";
import { Login, ForgotPassword, ResetPassword } from "../pages/Auth";
import Appointments from "../pages/Appointments";
import Patients from "../pages/Patients";
import PatientProfile from "../pages/PatientProfile";
import Stock from "../pages/Stock";
import Notifications from "../pages/Notifications";
import Invoicing from "../pages/Invoicing";
import Settings from "../pages/Settings";
import Help from "../pages/Help";
// import Files from "../components/Documents";
// import Chart from "../components/Chart";
import AppointmentPage from "../pages/AppointmentPage";

export const router = createBrowserRouter([
    {
        path: ROUTER.AUTH.LOGIN,
        element: <Login />,
    },
    {
        path: ROUTER.AUTH.FORGET_PASS,
        element: <ForgotPassword />,
    },
    {
        path: ROUTER.AUTH.RESET_PASS,
        element: <ResetPassword />,
    },
    // {
    //     path: ROUTER.PROFILE,
    //     element: (
    //         <RequireAuth>
    //             <Layout>
    //                 <AdminProfile />
    //             </Layout>
    //         </RequireAuth>
    //     ),
    // },
    {
        path: ROUTER.HOME,
        element: (
            <RequireAuth>
                <Layout>
                    <Home />
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: ROUTER.APPOINTMENTS,
        element: (
            <RequireAuth>
                <Layout>
                    <Appointments />
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: ROUTER.PATIENTS,
        element: (
            <RequireAuth>
                <Layout>
                    <Patients />
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: ROUTER.STOCK,
        element: (
            <RequireAuth>
                <Layout>
                    <Stock />
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: ROUTER.HELP,
        element: (
            <RequireAuth>
                <Layout>
                    <Help />
                </Layout>
            </RequireAuth>
        ),
    },
    // {
    //     path: ROUTER.INVOICING,
    //     element: (
    //         <RequireAuth>
    //             <Layout>
    //                 <Invoicing />
    //             </Layout>
    //         </RequireAuth>
    //     ),
    // },
    {
        path: ROUTER.INVOICE_DETAILS(":idInvoice?"),
        element: (
            <RequireAuth>
                <Layout>
                    <Invoicing />
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: ROUTER.NOTIFICATIONS,
        element: (
            <RequireAuth>
                <Layout>
                    <Notifications />
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: ROUTER.SETTINGS,
        element: (
            <RequireAuth>
                <Layout>
                    <Settings />
                </Layout>
            </RequireAuth>
        ),
    },
    // sub routes
    {
        path: ROUTER.PATIENT_PROFILE(":id"),
        element: (
            <RequireAuth>
                <Layout>
                    <PatientProfile />
                    {/* <PatientAppointments /> */}
                    {/* </PatientProfile> */}
                </Layout>
            </RequireAuth>
        ),
    },
    {
        path: ROUTER.APPOINTMENT_PAGE(":id"),
        element: (
            <RequireAuth>
                <Layout>
                    <AppointmentPage />
                </Layout>
            </RequireAuth>
        ),
    },
    // {
    //     path: ROUTER.PATIENT_APPOINTMENTS(":id"),
    //     element: (
    //         <RequireAuth>
    //             <Layout>
    //                 <PatientProfile>
    //                     <PatientAppointments />
    //                 </PatientProfile>
    //             </Layout>
    //         </RequireAuth>
    //     ),
    // },
    // {
    //     path: ROUTER.PATIENT_PRESCRIPTIONS(":id"),
    //     element: (
    //         <RequireAuth>
    //             <Layout>
    //                 <PatientProfile>
    //                     <Files type={"prescription"} />
    //                 </PatientProfile>
    //             </Layout>
    //         </RequireAuth>
    //     ),
    // },
    // {
    //     path: ROUTER.PATIENT_DOCUMENTS(":id"),
    //     element: (
    //         <RequireAuth>
    //             <Layout>
    //                 <PatientProfile>
    //                     <Files type={"document"} />
    //                 </PatientProfile>
    //             </Layout>
    //         </RequireAuth>
    //     ),
    // },
    // {
    //     path: ROUTER.PATIENT_CHART(":id"),
    //     element: (
    //         <RequireAuth>
    //             <Layout>
    //                 <PatientProfile>
    //                     <Chart />
    //                 </PatientProfile>
    //             </Layout>
    //         </RequireAuth>
    //     ),
    // },
]);
