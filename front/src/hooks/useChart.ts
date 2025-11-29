import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { API } from "../constants/env";

import {
    updateTeeth,
    updateActs,
    updateToothActs,
    setError,
    updateToothActsByApp,
} from "../redux/features/chart/chartSlice";
export const useChart = () => {
    const dispatch = useAppDispatch();
    const chart = useAppSelector((state: any) => state.chart);
    const handleGetTeeth = async (patientID: any) => {
        try {
            // dispatch(updatePatient({ loading: true }));
            const response = await fetch(API.chart.teeth.get(patientID), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updateTeeth(data));
                dispatch(setError(null));
            } else {
                dispatch(setError(data.error));
            }
            // dispatch(updatePatient({ loading: false }));
        } catch (error) {
            dispatch(setError(error));

            // dispatch(updatePatient({ error, loading: false }));
        }
    };
    const handleGetToothActs = async (patientID: any) => {
        try {
            dispatch(updateToothActs({ loading: true }));
            const response = await fetch(
                API.chart.toothAct.getActsByPatient(patientID),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token",
                        )}`,
                    },
                },
            );
            const data = await response.json();
            if (response.ok) {
                dispatch(updateToothActs({ data }));
            } else {
                // dispatch(updatePatient({ error: data.error }));
            }
            dispatch(updateToothActs({ loading: false }));

            // dispatch(updatePatient({ loading: false }));
        } catch (error) {
            // dispatch(updatePatient({ error, loading: false }));
        }
        dispatch(updateToothActs({ loading: false }));
    };
    const handleGetToothActsByApp = async (appointmentID: any) => {
        try {
            dispatch(updateToothActsByApp({ loading: true }));
            const response = await fetch(
                API.chart.toothAct.getToothActsByApp(appointmentID),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token",
                        )}`,
                    },
                },
            );
            const data = await response.json();
            if (response.ok) {
                dispatch(updateToothActsByApp({ data }));
            } else {
                // dispatch(updatePatient({ error: data.error }));
            }
            // dispatch(updatePatient({ loading: false }));
        } catch (error) {
            // dispatch(updatePatient({ error, loading: false }));
        }
        dispatch(updateToothActsByApp({ loading: false }));
    };
    //
    const handleGetActs = async () => {
        try {
            // dispatch(updatePatient({ loading: true }));
            const response = await fetch(API.chart.act.get, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updateActs(data));
            } else {
                // dispatch(updatePatient({ error: data.error }));
            }
            // dispatch(updatePatient({ loading: false }));
        } catch (error) {
            // dispatch(updatePatient({ error, loading: false }));
        }
    };
    const handleAddAct = async (newData: any) => {
        try {
            // dispatch(updatePatient({ loading: true }));
            const response = await fetch(API.chart.act.add, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newData),
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                dispatch(setError(data.error));
                return false;
            }
            // dispatch(updatePatient({ loading: false }));
        } catch (error) {
            dispatch(setError(error));
            return false;
            // dispatch(updatePatient({ error, loading: false }));
        }
    };
    const handleAddToothAct = async (newData: any) => {
        try {
            const response = await fetch(API.chart.toothAct.add, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newData),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setError(null));
                return data;
            } else {
                dispatch(setError(data.error));
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const handleUpdateToothAct = async (newData: any, toothActID: any) => {
        try {
            const response = await fetch(
                API.chart.toothAct.update(toothActID),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(newData),
                },
            );
            let data = await response.json();
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const handleDeleteToothAct = async (toothActID: any) => {
        try {
            const response = await fetch(
                API.chart.toothAct.deleteToothAct(toothActID),
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token",
                        )}`,
                    },
                },
            );
            // const data = await response.json();
            if (response.ok) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    };
    const resetError = () => {
        dispatch(setError(null));
    };
    return {
        teeth: chart.teeth,
        acts: chart.acts,
        toothActs: chart.toothActs,
        toothActsByApp: chart.toothActsByApp,
        error: chart.error,
        handleGetToothActs,
        handleGetTeeth,
        handleGetActs,
        handleAddToothAct,
        resetError,
        handleAddAct,
        handleGetToothActsByApp,
        handleDeleteToothAct,
        handleUpdateToothAct,
    };
};
