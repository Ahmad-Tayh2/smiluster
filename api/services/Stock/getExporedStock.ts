import { Stock } from "../../models";
import { Op } from 'sequelize'

export async function retrieveExporedStock(licenseID: number){
    const today = new Date();
    try{
        const expiredStock = await Stock.findAll({where : {
            licenseID,
            expiredDate:{
                [Op.lt]: today,
            },
        
        }});

        if (expiredStock.length === 0) {
            throw new Error("There is no expired stock");
        }

        return expiredStock;
    } catch(error: any){
        throw new Error(error);
    }
}