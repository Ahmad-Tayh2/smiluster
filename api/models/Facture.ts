import { DataTypes, Model } from 'sequelize';
import sequelize from './config/db';
import License from './License';

class Facture extends Model {
  public factureID!: number;
  public licenseID!: number;
  public factureRef!: string;
  public totalNeededAmount!: number;
  public totalPaidAmount!: number;
  public restAmount!:number;
  public closedAt!: Date;
  public createdAt!: Date;

  public static initModel() {
    return Facture.init(
      {
        factureID: {
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
        factureRef: {
          type: DataTypes.STRING,
          allowNull: true
        },
        totalNeededAmount: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
        totalPaidAmount: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
        restAmount: {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        },
        closedAt: {
          type: DataTypes.DATE,
          defaultValue: null,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Facture',
        timestamps: false,
      }
    );
  }


    static associate(models: any) {
        Facture.hasMany(models.Appointment, { foreignKey: 'factureID', as: 'appointments' });
        Facture.hasMany(models.Payment, { foreignKey: 'factureID', as: 'payments' });
    }

}

export default Facture;
