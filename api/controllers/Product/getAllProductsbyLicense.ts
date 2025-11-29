import { Op } from "sequelize";
import { retrieveAllProductsByLicence } from "../../services/Product/getAllProductsByLicense";

export async function getAllProductsByLicence(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const { pageNumber = 1, numberOfRows = 10, search } = req.query;
        const page = parseInt(pageNumber);
        const pageSize = parseInt(numberOfRows);
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const dynamicQuery = buildDynamicQuery({ licenseID, search, ...req.query });
        const products = await retrieveAllProductsByLicence(dynamicQuery);
        const paginatedProducts = products.slice(startIndex, endIndex);
        const totalCount = products.length;

        if (totalCount === 0) {
            return res.status(404).json({ error: 'There is no products' });
        }

        const totalPages = Math.ceil(totalCount / pageSize);
        res.status(200).json({ totalPages, paginatedProducts });
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

function buildDynamicQuery({ licenseID, minQuantity, search }: any): DynamicQuery {
    const dynamicQuery: DynamicQuery = {
        where: {
            licenseID,
        },
    };

    if (minQuantity) {
        dynamicQuery.where.minQuantity =  minQuantity ;
    }

    if (search) {
        const searchPattern = `%${search}%`;
        dynamicQuery.where = {
            ...dynamicQuery.where,
            [Op.or]: [
                { productName: { [Op.like]: searchPattern } },
            ],
        };
    }

    return dynamicQuery;
}