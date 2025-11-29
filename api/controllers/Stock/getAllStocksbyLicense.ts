import { Op } from "sequelize";
import { retrieveAllStocksByLicence } from "../../services/Stock/getAllStocksByLicense";

export async function getAllStocksByLicence(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const search = req.query;
        let pagination: Pagination = {};

        if (req.query.itemsPerPage !== undefined) {
            pagination.itemsPerPage = req.query.itemsPerPage;
        }

        if (req.query.pageNumber !== undefined) {
            pagination.currentPageNumber = req.query.currentPageNumber;
        }
        

        const dynamicQuery = buildDynamicQuery({ licenseID, ...req.query });
        const result = await retrieveAllStocksByLicence(dynamicQuery, pagination);

        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({error: err.message });
    }
}


function buildDynamicQuery(queryParam: any) {
    const { licenseID, quantity, expiredBefore, price, search, minPrice, maxPrice } = queryParam;
    let dynamicQuery: any = {
        licenseID,
    }

    if (quantity) {
        dynamicQuery.quantity = quantity;
    }

    if (expiredBefore) {
        const expiredDate = new Date(expiredBefore);
        dynamicQuery.expiredDate = { [Op.lt]: expiredDate };
    }

    if (price) {
        dynamicQuery.price = price;
    }
    if(minPrice || maxPrice){
        if(minPrice && maxPrice)
            dynamicQuery.price = {[Op.between]: [minPrice, maxPrice]};
        else if(minPrice)
            dynamicQuery.price = {[Op.gte]: minPrice};
        else
            dynamicQuery.price = {[Op.lte]: maxPrice};
    }

    

    if (search) {
        const searchPattern = `%${search}%`;
        dynamicQuery = {
            ...dynamicQuery,
            [Op.or]: [
                { provider: { [Op.like]: searchPattern } },
                { note: { [Op.like]: searchPattern } },
                {
                    "$product.productName$": {
                        [Op.like]: searchPattern,
                    },
                },
            ],
        };
    }

    return dynamicQuery;
}

interface Pagination {
    itemsPerPage?: number;
    currentPageNumber?: number;
}