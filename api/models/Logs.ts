import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db";
import EntityType from "../enums/EntityType";
import LogsAction from "../enums/LogsAction";

class Logs extends Model {
    public logID!: number;
    public licenseID!: number;
    public userID!: number;
    public action!: LogsAction;
    public entityID!: Logs;
    public entityType!: EntityType;
    public details?: object;

    public static initModel() {
        return Logs.init(
            {
                logID: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                licenseID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                userID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                action: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                entityID: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                entityType: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                details: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Logs",
                timestamps: true,
            }
        );
    }
}

export default Logs;
