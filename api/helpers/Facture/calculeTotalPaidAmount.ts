import { Payment } from "../../models";
import { retrieveFacture } from "../../services/Facture/getFactureByID";
import { modifyFacture } from "../../services/Facture/updateFacture";



const calculeTotalPaidAmount = async (factureID: number, licenseID: number) => {
    const paymentList = await Payment.findAll({ where: { factureID, licenseID}});

    let paidAmount = 0;

    for(const payment of paymentList){
        paidAmount += payment.paymentAmount;
    }

    
    await modifyFacture({factureID, totalPaidAmount: paidAmount});
    const {totalNeededAmount, totalPaidAmount} = (await retrieveFacture(factureID, licenseID));
    
    const restAmount = totalNeededAmount - totalPaidAmount;
    await modifyFacture({factureID, restAmount});
}

export default calculeTotalPaidAmount;