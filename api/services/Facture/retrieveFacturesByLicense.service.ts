import { Op, Sequelize } from "sequelize";
import { Appointment, Facture, Patient, Payment } from "../../models";

export async function retrieveFacturesByLicense(licenseID: number, query: any) {
    try {
        let {
            closed,
            minNeededAmount,
            maxNeededAmount,
            zeroRestMoney,
            patientID,
            sortBy,
            search,
            status, //can be "payed" - "impayed"  - "part-payed"
            createdAt,
            pagination,
        } = query;

        let filter: any = {
            licenseID,
        };

        if (closed) {
            filter.closedAt = {
                [Op.not]: null,
            };
        }

        if (createdAt) {
            const startOfDay = new Date(createdAt);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(createdAt);
            endOfDay.setHours(23, 59, 59, 999);

            filter.createdAt = { [Op.between]: [startOfDay, endOfDay] };
        }
        

        if (minNeededAmount && maxNeededAmount) {
            filter.totalNeededAmount = {
                [Op.between]: [minNeededAmount, maxNeededAmount],
            };
        } else if (minNeededAmount) {
            filter.totalNeededAmount = {
                [Op.gte]: minNeededAmount,
            };
        } else if (maxNeededAmount) {
            filter.totalNeededAmount = {
                [Op.lte]: maxNeededAmount,
            };
        }

        //BUG
        // if(zeroRestMoney) {
        //     filter.restAmount = 0;
        // }

        if (sortBy !== undefined) {
            //TODO: filter sortby
        }

        if (search) {
            filter[Op.or] = [
                ...(filter[Op.or] || []),
                { factureRef: { [Op.like]: `%${search}%` } },
            ];
        }

        let appointments: any[] = [];
        if (patientID) {
            appointments = await Appointment.findAll({ where: { patientID } });
        }

        // Extract factureIDs from the retrieved appointments
        const factureIDs = appointments.map(
            (appointment) => appointment.factureID
        );
        // Add factureID filter if appointments are retrieved for the specified patientID
        if (factureIDs.length > 0) {
            filter.factureID = factureIDs;
        }

        if (status) {

            console.log(typeof(status));
            let statusFilters = [];
            if (status.includes("payed-status")) {
                statusFilters.push({ restAmount: { [Op.lte]: 0 } });
            }
            if (status.includes("impayed")) {
                statusFilters.push({
                    totalPaidAmount: { [Op.eq]: 0 },
                    totalNeededAmount: { [Op.gt]: 0 },
                });
            }
            if (status.includes("part-payed")) {
                statusFilters.push({
                    totalPaidAmount: { [Op.gt]: 0 },
                    totalNeededAmount: { [Op.gt]: Sequelize.col('totalPaidAmount') },
                });
            }
            console.log(statusFilters)
            if (statusFilters.length > 0) {
                filter[Op.and] = [...(filter[Op.and] || []), { [Op.or]: statusFilters }];
            }
        }
        
        
        // Get the total item count for pagination
        const totalItemsCount = await Facture.count({ where: filter });
        const itemsPerPage = parseInt(pagination.itemsPerPage) || 100;
        const currentPageNumber = parseInt(pagination.currentPageNumber) || 1;
        
        // Fetch the filtered items with pagination
        let factures = await Facture.findAll({
            where: { [Op.and]: filter },
            include: [
                {
                    model: Appointment,
                    as: "appointments",
                    include: [
                        {
                            model: Patient,
                            as: "patient",
                        },
                    ],
                },
                {
                    model: Payment,
                    as: "payments",
                },
            ],
            limit: itemsPerPage,
            offset: (currentPageNumber - 1) * itemsPerPage,
            order: [['factureID', 'DESC']],
        });
        let result: any = [];
        if (factures.length > 0) {
            result = factures.map((facture: any) => {
                let patient = {};
                if (facture.appointments.length > 0) {
                    patient = facture.appointments[0].patient;
                }
                return {
                    ...facture.toJSON(),
                    patient,
                };
            });
        }

        const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage);

        const paginationMetaData = {
            totalItemsCount: totalItemsCount || 0,
            totalPagesCount: totalPagesCount,
            itemsPerPage: itemsPerPage,
            currentPageNumber: currentPageNumber,
        };

        return { data: result, paginationMetaData };
    } catch (error: any) {
        throw new Error(error);
    }
}
