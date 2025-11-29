import { Product, Stock } from "../../models";

export async function retrieveAllStocksByLicence(dynamicQuery: any, pagination: any) {
    try{
        const totalItemsCount = await Stock.count({where: dynamicQuery,
            include: [
                {
                    model: Product,
                    as: "product",
                },
            ],
        });
        const itemsPerPage = parseInt(pagination.itemsPerPage) || 100;
        const currentPageNumber = parseInt(pagination.currentPageNumber) || 1;
        const stocks = await Stock.findAll({
            where: dynamicQuery,
            include: [
                {
                    model: Product,
                    as: "product",
                },
            ],
            limit: itemsPerPage,
            offset: (currentPageNumber - 1) * itemsPerPage,
            order: [['stockID', 'DESC']],
        });

        const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage);

        const paginationMetaData = {
            totalItemsCount: totalItemsCount || 0,
            totalPagesCount: totalPagesCount,
            itemsPerPage: stocks.length,
            currentPageNumber: currentPageNumber
        };

        return {data: stocks, paginationMetaData} ;
    } catch(error: any){
        console.error(error)
        throw new Error(error);
    }
}

