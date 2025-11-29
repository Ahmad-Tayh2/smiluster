import { DataTypes, Model } from 'sequelize';
import sequelize from './config/db'; // Import your Sequelize instance
import Patient from './Patient'; // Import the Patient model
import Appointment from './Appointment'; // Import the Appointment model (optional)
import License from './License';

class Document extends Model {
  public docID!: number;
  public licenseID!: number;
  public patientID!: number;
  public appointmentID?: number;
  public url!: string;
  public fileName!: string; 
  public extension!: string;

  // Other model methods and associations can be defined here

  // Define the model associations in the static init method
  public static initModel() {
    return Document.init(
      {
        docID: {
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
        patientID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Patient,
            key: 'patientID',
          },
        },
        appointmentID: {
          type: DataTypes.INTEGER,
          references: {
            model: Appointment,
            key: 'appointmentID',
          },
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fileName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        extension: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Documents',
        timestamps: false,
      }
    );
  }
  
}

export default Document;
