import { Appointment, AppointmentService, Service } from "../../models";


export const createAppointmentService = async (appointmentID: number, serviceID: number, licenseID: number, isPaid: boolean, customCost: number) => {
    try {
        return await AppointmentService.create({ appointmentID, serviceID, licenseID, isPaid, customCost });
    } catch (error: any) {
        throw new Error("Failed to create appointment service: " + error.message);
    }
};

export const getAppointmentServicesByLicense = async (licenseID: number) => {
    try {
        return await AppointmentService.findAll({ where: {licenseID}});
    } catch (error: any) {
        throw new Error("Failed to fetch appointment services: " + error.message);
    }
};

export const getAppointmentServiceById = async (id: number, licenseID: number) => {
    try {
        return await AppointmentService.findOne({ where: { appointmentServiceID: id, licenseID }});
    } catch (error: any) {
        throw new Error("Failed to fetch appointment service: " + error.message);
    }
};

export const updateAppointmentService = async (id: number, data: any) => {
    try {
        return await AppointmentService.update(data, { where: { appointmentServiceID: id } });
    } catch (error: any) {
        throw new Error("Failed to update appointment service: " + error.message);
    }
};

export const deleteAppointmentService = async (id: number, licenseID: number) => {
    try {
        return await AppointmentService.destroy({ where: { appointmentServiceID: id, licenseID } });
    } catch (error: any) {
        throw new Error("Failed to delete appointment service: " + error.message);
    }
};

export const getAppointmentServiceByApp = async (appointmentID: number, licenseID: number) => {
    try {
        const appointmentExist = await Appointment.findOne({ where: { appointmentID, licenseID }});
        if(!appointmentExist){
            throw new Error('the appointment Does not exist!!');
        }

        const serviceList = await AppointmentService.findAll({
            where: { appointmentID, licenseID },
            include: [
                {
                    model: Service,
                    as: "services"
                }
            ]
        })
        return serviceList;
    } catch (error: any) {
        throw new Error("Failed to fetch appointment service: " + error.message);
    }
};
