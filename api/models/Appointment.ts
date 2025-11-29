import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db";
import User from "./User";
import License from "./License";
import Patient from "./Patient"; 
import Facture from "./Facture";
import ToothRDV from "./ToothRDV";

class Appointment extends Model {
    public appointmentID!: number;
    public userID!: number;
    public licenseID!: number;
    public patientID?: number;
    public factureID?: number;
    public appointmentDateTime!: Date;
    public status!: string;
    public diagnostique?: string;
    public ordonnance?: string;
    public note?: string;
    public cost!: number;
    public appointmentDuration!: number;

    public static initModel() {
        return Appointment.init(
            {
                appointmentID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                userID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: User,
                        key: "userID",
                    },
                },
                licenseID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: License,
                        key: "licenseID",
                    },
                },
                patientID: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Patient,
                        key: "patientID",
                    },
                },
                factureID: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: Facture,
                        key: "factureID",
                    },
                },
                appointmentDateTime: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                diagnostique: {
                    type: DataTypes.TEXT,
                },
                ordonnance: {
                    type: DataTypes.TEXT,
                },
                note: {
                    type: DataTypes.TEXT,
                },
                cost: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    defaultValue: -1,
                },
                appointmentDuration: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Appointments",
                timestamps: false,
            }
        );
    }
    static associate(models: any) {
        Appointment.belongsToMany(models.Tooth, {
            through: ToothRDV,
            foreignKey: "appointmentID",
        });
        Appointment.belongsTo(models.Patient, { foreignKey: 'patientID', as: 'patient' });
        Appointment.belongsTo(models.Facture, { foreignKey: 'factureID', as: 'facture' });
        Appointment.hasMany(models.ToothAct, { foreignKey: 'toothActID', as: 'toothActs' });
        Appointment.hasMany(models.AppointmentService, { foreignKey: 'appointmentServiceID', as: 'appointmentServices' });
    }
}

export default Appointment;
