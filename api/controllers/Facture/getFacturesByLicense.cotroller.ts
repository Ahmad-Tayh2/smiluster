import { retrieveFacturesByLicense } from "../../services/Facture/retrieveFacturesByLicense.service";

export async function getFacturesByLicense(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        let {
            closed,
            minNeededAmount,
            maxNeededAmount,
            zeroRestMoney,
            patientID,
            sortBy,
            search,
            status,
            createdAt,
        } = req.query;

        let pagination: Pagination = {};
        if (req.query.itemsPerPage !== undefined) {
            pagination.itemsPerPage = req.query.itemsPerPage;
        }
        if (req.query.currentPageNumber !== undefined) {
            pagination.currentPageNumber = req.query.currentPageNumber;
        }

        if (zeroRestMoney) {
            zeroRestMoney = Number(zeroRestMoney);
        }

        const factures = await retrieveFacturesByLicense(licenseID, {
            closed,
            minNeededAmount,
            maxNeededAmount,
            zeroRestMoney,
            patientID,
            sortBy,
            search,
            status,
            createdAt,
            pagination,
        });

        res.status(200).json(factures);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

interface Pagination {
    itemsPerPage?: number;
    currentPageNumber?: number;
}
