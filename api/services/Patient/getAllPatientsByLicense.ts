import { Patient } from "../../models";

export async function retrieveAllPatientsByLicence(
    dynamicQuery: any,
    pagination: any
) {
    try {
        const totalItemsCount = await Patient.count({
            where: dynamicQuery.where,
        });
        const itemsPerPage = parseInt(pagination.itemsPerPage) || 100;
        const currentPageNumber = parseInt(pagination.currentPageNumber) || 1;
        const patients = await Patient.findAll({
            where: dynamicQuery.where,
            limit: itemsPerPage,
            offset: (currentPageNumber - 1) * itemsPerPage,
            order: [['patientID', 'DESC']],
        });

        const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage);

        const paginationMetaData = {
            totalItemsCount: totalItemsCount || 0,
            totalPagesCount: totalPagesCount,
            itemsPerPage: patients.length,
            currentPageNumber: currentPageNumber,
        };

        return { data: patients, paginationMetaData };
    } catch (error: any) {
        throw new Error(error);
    }
}
