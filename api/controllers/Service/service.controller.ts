import { Request, Response } from "express";
import * as serviceService from "../../services/Service";
import { createLog } from "../../services/Logs/createLog";
import LogsAction from "../../enums/LogsAction";
import EntityType from "../../enums/EntityType";

export const createService = async (req: any, res: Response) => {
    try {
        const licenseID = req.license.licenseID;
        const { title, cost } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!cost || isNaN(cost) || cost <= 0) {
            return res.status(400).json({ message: "Cost must be a positive number" });
        }
        const service = await serviceService.createService(licenseID, title, cost);
        res.status(201).json(service);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getServicesByLicense = async (req: any, res: Response) => {
    const licenseID = req.license.licenseID;
    try {
        const services = await serviceService.getServices(licenseID);
        res.json(services);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getServiceById = async (req: any, res: Response) => {
    const { serviceID } = req.params;
    const licenseID = req.license.licenseID;
    try {
        const service = await serviceService.getServiceById(parseInt(serviceID), licenseID);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json(service);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateService = async (req: any, res: Response) => {
    const { serviceID } = req.params;
    const licenseID = req.license.licenseID; 
    try {
        let updatedService = req.body;
        updatedService.licenseID = licenseID;
        const [updatedRows] = await serviceService.updateService(parseInt(serviceID), req.body);
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Service not found" });
        }
        const service = await serviceService.getServiceById(parseInt(serviceID), licenseID);
        res.json(service);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteService = async (req: any, res: Response) => {
    const { serviceID } = req.params;
    const licenseID = req.license.licenseID;
    const userID = req.user.userID;
    try {
        const service = await serviceService.getServiceById(parseInt(serviceID), licenseID);
        const deletedRows = await serviceService.deleteService(parseInt(serviceID), licenseID);
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Service not found" });
        }
        if(service){
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: service?.serviceID,
                entityType: EntityType.Service,
                details: { deletedData: service }
            });
        }
        
        res.json({ message: "Service deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
