import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db"; // Import your Sequelize instance
import Patient from "./Patient";
import { License } from "./index";
import { ToothAct } from "./index";
import Appointment from "./Appointment";
import ToothRDV from "./ToothRDV";


class Tooth extends Model {
    public toothID!: number;
    public licenseID!: number;
    public patientID!: number;
    public toothNumber?: string;
    public adult!: boolean;
    public notes?: string;

    public static initModel() {
        return Tooth.init(
            {
                toothID: {
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
                        key: "patientID",
                    },
                },
                toothNumber: {
                    type: DataTypes.STRING,
                },
                adult: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                notes: {
                    type: DataTypes.TEXT,
                },
            },
            {
                sequelize,
                modelName: "Tooths",
                timestamps: false,
            }
        );
    }
    static associate(models: any) {
        // Tooth.belongsToMany(models.Act, {
        //     through: ToothAct,
        //     foreignKey: "toothID",
        // });
        Tooth.belongsToMany(models.Appointment, {
            through: ToothRDV,
            foreignKey: "toothID",
        });
    }
}

export default Tooth;
