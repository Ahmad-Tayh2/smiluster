import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db"; // Import your Sequelize instance
import {Tooth,Act, License, Appointment} from "./index"; // Import the Tooth model

class ToothAct extends Model {
    public toothActID!: number;
    public toothID!: number;
    public actID!: number;
    public licenseID!: number;
    public datePerformed?: Date;
    public appointmentID?: number;
    public isPaid!: boolean;
    public customCost!: number;

    public static initModel() {
        return ToothAct.init(
            {
                toothActID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                toothID: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Tooth,
                        key: "toothID",
                    },
                },
                actID: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Act,
                        key: "actID",
                    },
                },
                appointmentID: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: Appointment,
                        key: "appointmentID",
                    },
                },
                isPaid: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                licenseID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                    model: License,
                    key: 'licenseID',
                    },
                },
                customCost: {
                    type: DataTypes.FLOAT,
                    defaultValue: 0,
                }
            },
            {
                sequelize,
                modelName: "ToothAct",
                timestamps: false,
            }
        );
    }
    static associate(models:any) {
        ToothAct.belongsTo(models.Act, {
            foreignKey: "actID",
        });
        
        ToothAct.belongsTo(models.Appointment, {
            foreignKey: "appointmentID",
        });
        ToothAct.belongsTo(models.Tooth, {
            foreignKey: "toothID",
        });
    }
}

export default ToothAct;
