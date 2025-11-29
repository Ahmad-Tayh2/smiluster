import { Op } from "sequelize";
import { retrieveAllPatientsByLicence } from "../../services/Patient/getAllPatientsByLicense";
import sequelize from "sequelize/types/sequelize";

export async function getAllPatientsByLicence(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;

        let pagination: Pagination = {};

        if (req.query.itemsPerPage !== undefined) {
            pagination.itemsPerPage = req.query.itemsPerPage;
        }

        if (req.query.currentPageNumber !== undefined) {
            pagination.currentPageNumber = req.query.currentPageNumber;
        }

        const dynamicQuery: DynamicQuery = {
            where: {
                licenseID: licenseID,
            },
        };

        if (req.query.dateOfBirth) {
            const dateOfBirth = new Date(req.query.dateOfBirth);
            dynamicQuery.where.dateOfBirth = dateOfBirth;
        }
        if (req.query.gender) {
            dynamicQuery.where.gender = req.query.gender;
        }
        if (req.query.phoneNumber) {
            dynamicQuery.where.phoneNumber = req.query.phoneNumber;
        }
        if (req.query.search) {
            const searchPattern = `%${req.query.search}%`;

            dynamicQuery.where = {
                ...dynamicQuery.where,
                [Op.or]: [
                    { firstName: { [Op.like]: searchPattern } },
                    { lastName: { [Op.like]: searchPattern } },
                    { generalState: { [Op.like]: searchPattern } },
                    { email: { [Op.like]: searchPattern } },
                    { profession: { [Op.like]: searchPattern } },
                ],
            };
        }
        const result = await retrieveAllPatientsByLicence(
            dynamicQuery,
            pagination
        );

        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

interface DynamicQuery {
    where: {
        licenseID?: any;
        [key: string]: any;
    };
}
interface Pagination {
    itemsPerPage?: number;
    currentPageNumber?: number;
}
