import { Request, Response } from "express";
import * as appointmentServiceService from "../../services/AppointmentService/index.service";
import { retrieveAppointmentByID } from "../../services/Appointment/retrieveAppointmentByID";
import { getServiceById } from "../../services/Service";
import calculeTotalNeededAmount from "../../helpers/Facture/calculeTotalNeededAmount";
import { createLog } from "../../services/Logs/createLog";
import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";


export const createAppointmentService = async (req: any, res: Response) => {
    try {
        const licenseID = req.license.licenseID;
        const { appointmentID, serviceID, isPaid } = req.body;
        const appExist = await retrieveAppointmentByID(appointmentID, licenseID);
        if (!appExist) {
            return res.status(400).json({ message: "Appointment not found" });
        }

        const serviceExist = await getServiceById(serviceID, licenseID);
        if (!serviceExist) {
            return res.status(400).json({ message: "Service not found" });
        }

        const customCost = serviceExist.cost;
        const appointmentService = await appointmentServiceService.createAppointmentService(appointmentID, serviceID, licenseID, isPaid, customCost);
        const factureID = (await retrieveAppointmentByID(appointmentID, licenseID)).factureID;
        if(factureID){
            await calculeTotalNeededAmount(appointmentID, licenseID);
        }
        res.status(201).json(appointmentService);
    } catch (error: any) {
        res.status(400).json({ message: "Failed to create appointment service: " + error.message });
    }
};

export const getAppointmentServicesByLicense = async (req: any, res: Response) => {
    const licenseID = req.license.licenseID;
    try {
        const appointmentServices = await appointmentServiceService.getAppointmentServicesByLicense(licenseID);
        res.json(appointmentServices);
    } catch (error: any) {
        res.status(500).json({ message: "Failed to fetch appointment services: " + error.message });
    }
};

export const getAppointmentServiceById = async (req: any, res: Response) => {
    const { id } = req.params;
    const licenseID = req.license.licenseID;
    try {
        const appointmentService = await appointmentServiceService.getAppointmentServiceById(parseInt(id), licenseID);
        if (!appointmentService) {
            return res.status(404).json({ message: "Appointment service not found" });
        }
        res.json(appointmentService);
    } catch (error: any) {
        res.status(500).json({ message: "Failed to fetch appointment service: " + error.message });
    }
};

export const updateAppointmentService = async (req: any, res: Response) => {
    const { id } = req.params;
    try {
        const licenseID = req.license.licenseID;
        let data = req.body;
        data.licenseID = licenseID;
        const [updatedRows] = await appointmentServiceService.updateAppointmentService(parseInt(id), data);
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Can not update it check the inforamtion provided" });
        }
        const updatedElement = await appointmentServiceService.getAppointmentServiceById(parseInt(id), licenseID);
        if(updatedElement){
            const factureID = (await retrieveAppointmentByID(updatedElement.appointmentID, updatedElement.licenseID)).factureID;
            if(factureID){
                await calculeTotalNeededAmount(updatedElement.appointmentID, updatedElement.licenseID);
            }
        }
        res.json(updatedElement);
    } catch (error: any) {
        res.status(500).json({ message: "Failed to update appointment service: " + error.message });
    }
};

export const deleteAppointmentService = async (req: any, res: Response) => {
    const { id } = req.params;
    const licenseID = req.license.licenseID;
    const userID = req.user.userID;
    try {
        const appService = await appointmentServiceService.getAppointmentServiceById(parseInt(id), licenseID);

        const deletedRows = await appointmentServiceService.deleteAppointmentService(parseInt(id), licenseID);
        
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Appointment service not found" });
        }
        
        if(appService){
            const factureID = (await retrieveAppointmentByID(appService.appointmentID, appService.licenseID)).factureID;
            if(factureID){
                await calculeTotalNeededAmount(appService.appointmentID, appService.licenseID);
            }
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: appService?.appointmentServiceID,
                entityType: EntityType.AppointmentService,
                details: { deletedData: appService }
            });
        }
        
        

        res.json({ message: "Appointment service deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Failed to delete appointment service: " + error.message });
    }
};


export const getAppointmentServiceByApp = async (req: any, res: Response) => {
    const { appointmentID } = req.params;
    const licenseID = req.license.licenseID;
    try {
        const appointmentServices = await appointmentServiceService.getAppointmentServiceByApp(parseInt(appointmentID), licenseID);
        if (!appointmentServices) {
            return res.status(404).json({ message: "There is no appointment services" });
        }
        res.json(appointmentServices);
    } catch (error: any) {
        res.status(500).json({ message: "Failed to fetch appointment service: " + error.message });
    }
};