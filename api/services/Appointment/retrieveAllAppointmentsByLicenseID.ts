import { Op } from "sequelize";
import { Appointment, Facture, Patient, Payment } from "../../models";
import totalCostByApp from "../../helpers/Facture/totalCostByApp";

export async function retrieveAllAppointmentsByLicenseID(
    licenseID: any,
    query: any
) {
    try {
        let {
            startDay,
            endDay,
            patientID,
            factureID,
            status,
            sortBy,
            search,
            itemsPerPage,
            currentPageNumber,
        } = query;
        let filter: any = {
            licenseID,
        };

        if (startDay !== undefined && endDay !== undefined) {
            
            const startD = new Date(startDay);
            const endD = new Date(endDay); 
            startD.setHours(0, 0, 0, 0);
            endD.setHours(23, 59, 59, 999);

            filter.appointmentDateTime = {
                [Op.between]: [startD, endD],
            };
        } else if(startDay !== undefined){
            const startD = new Date(startDay);
            startD.setHours(0, 0, 0, 0);

            filter.appointmentDateTime = {
                [Op.gte]: startD
            };
        } else if(endDay !== undefined ) {
            const endD = new Date(endDay);
            endD.setHours(23, 59, 59, 999);
            
            filter.appointmentDateTime = {
                [Op.lte]: endD
            };
        }

        if (patientID !== undefined) {
            filter.patientID = patientID;
        }
        if (factureID !== undefined) {
            filter.factureID = factureID;
        }
        if (status !== undefined) {
            filter.status = status;
        }
        if (sortBy !== undefined) {
            //TODO: filter sortby
        }
        if (search !== undefined) {
            filter[Op.or] = [
                { diagnostique: { [Op.like]: `%${search}%` } },
                { ordonnance: { [Op.like]: `%${search}%` } },
                { note: { [Op.like]: `%${search}%` } },
                { cost: { [Op.like]: `%${search}%` } },
                { "$patient.firstName$": { [Op.like]: `%${search}%` } },
                { "$patient.lastName$": { [Op.like]: `%${search}%` } },
                { "$patient.generalState$": { [Op.like]: `%${search}%` } },
                { "$patient.phoneNumber$": { [Op.like]: `%${search}%` } },
                { "$patient.email$": { [Op.like]: `%${search}%` } },
                { "$patient.profession$": { [Op.like]: `%${search}%` } },
                { "$patient.address$": { [Op.like]: `%${search}%` } },
            ];
        }

        const totalItemsCount = await Appointment.count({ where: filter,
            include: [
                {
                    model: Patient,
                    as: "patient",
                },
            ],
        });
        itemsPerPage = parseInt(itemsPerPage) || 100;
        currentPageNumber = parseInt(currentPageNumber) || 1;

        
        const appointments = await Appointment.findAll({
            where: filter,
            include: [
                {
                    model: Patient,
                    as: "patient",
                },
                {
                    model: Facture,
                    as: "facture",
                },
            ],
            limit: itemsPerPage,
            offset: (currentPageNumber - 1) * itemsPerPage,
            order: [['appointmentID', 'DESC']],
        });

        const data = await Promise.all(appointments.map(async (app: any) => {
            const appointmentID = app.appointmentID;
            const totalCost = await totalCostByApp(appointmentID, licenseID);
            const totalPaidAmount = (await Payment.findOne({ where:{ appointmentID, licenseID }}))?.paymentAmount || 0;
            return {
                ...app.toJSON(),
                totalCost,
                totalPaidAmount,
            }
        })
        );

        const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage);
        
        const paginationMetaData = {
            totalItemsCount: totalItemsCount || 0,
            totalPagesCount: totalPagesCount,
            itemsPerPage: appointments.length,
            currentPageNumber: currentPageNumber
        };

        return {data , paginationMetaData};
    } catch (error: any) {
        throw new Error(error);
    }
}

