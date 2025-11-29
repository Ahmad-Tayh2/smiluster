import { DataTypes, Model } from 'sequelize';
import sequelize from './config/db';
import Facture from './Facture';
import License from './License';
import Appointment from './Appointment';

class Payment extends Model {
  public paymentID!: number;
  public licenseID!: number;
  public factureID!: number;
  public appointmentID?: number;
  public paymentAmount!: number;
  public paymentDate?: Date;
  
  public static initModel() {
    return Payment.init(
      {
        paymentID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        licenseID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: License,
            key: 'licenseID',
          },
        },
        factureID: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: Facture,
            key: 'factureID',
          },
        },
        appointmentID: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: Appointment,
            key: 'appointmentID',
          },
        },
        paymentAmount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        paymentDate: {
          type: DataTypes.DATE,
          defaultValue:new Date()
        },
      },
      {
        sequelize,
        modelName: 'Payments',
        timestamps: false,
      }
    );
  }
}

export default Payment;
