import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db";
import License from "./License";

class Patient extends Model {
    public patientID!: number;
    public licenseID!: number;
    public dateOfBirth?: Date;
    public firstName!: string;
    public lastName!: string;
    public gender?: string;
    public generalState?: string;
    public phoneNumber?: string;
    public email?: string;
    public profession?: string;
    public address?: string;

    public static initModel() {
        return Patient.init(
            {
                patientID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                licenseID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: License,
                        key: "licenseID",
                    },
                },
                dateOfBirth: {
                    type: DataTypes.DATE,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                gender: {
                    type: DataTypes.STRING,
                },
                generalState: {
                    type: DataTypes.TEXT,
                },
                phoneNumber: {
                    type: DataTypes.STRING,
                },
                email: {
                    type: DataTypes.STRING,
                },
                profession: {
                    type: DataTypes.STRING,
                },
                address: {
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                modelName: "Patients",
                timestamps: false,
            }
        );
    }
}

export default Patient;
