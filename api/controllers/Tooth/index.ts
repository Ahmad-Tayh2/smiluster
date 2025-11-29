import { newTooth } from "./newTooth";
import { deleteTooth } from "./deleteTooth";
import { getAllTeethByPatientID } from "./getAllTeethByPatientID";
import { getToothByID } from "./getTooth";
import { updateTooth } from "./updateTooth";
import { assignProcedureToTooth } from "../ToothAct/assignActToTooth.controller";
import { getAllActsByToothID } from "../ToothAct/getAllActsByToothID.controller";
import { getAllAppointmentsByToothID } from "../ToothRDV/getAllAppointmentsByToothID";

export {
    newTooth,
    deleteTooth,
    getAllTeethByPatientID,
    getToothByID,
    updateTooth,
    assignProcedureToTooth,
    getAllActsByToothID,
    getAllAppointmentsByToothID,
};
