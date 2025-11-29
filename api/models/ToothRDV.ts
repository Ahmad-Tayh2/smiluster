import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db"; // Import your Sequelize instance
import {Tooth,Appointment, License} from "./index";

class ToothRDV extends Model {
    public appointmentID!: number;
    public toothID!: number;
    public licenseID!: number;

    public static initModel() {
        return ToothRDV.init(
            {
                ToothRDVID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                appointmentID: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Appointment,
                        key: "appointmentID",
                    },
                },
                toothID: {
                    type: DataTypes.INTEGER,

                    references: {
                        model: Tooth,
                        key: "toothID",
                    },
                },
                licenseID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: License,
                        key: 'licenseID',
                    },
                },
            },
            {
                sequelize,
                modelName: "ToothRDV",
                timestamps: false,
            }
        );
    }

    static associate(models: any) {
        ToothRDV.belongsTo(models.Appointment, {
            foreignKey: "appointmentID",
        });
        ToothRDV.belongsTo(models.Tooth, {
            foreignKey: "toothID",
        });
    }
}

export default ToothRDV;
