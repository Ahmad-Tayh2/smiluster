import { Service } from "../../models";

export const createService = async (licenseID: number, title: string, cost: number) => {
    return await Service.create({ licenseID, title, cost });
};

export const getServices = async (licenseID: number) => {
    return await Service.findAll({ where: { licenseID }});
};

export const getServiceById = async (serviceID: number, licenseID: number) => {
    return await Service.findOne({ where: {serviceID, licenseID }});
};

export const updateService = async (serviceID: number, data: any) => {
    return await Service.update(data, { where: { serviceID } });
};

export const deleteService = async (serviceID: number, licenseID: number) => {
    return await Service.destroy({ where: {serviceID, licenseID }});
};
