import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db";
import License from "./License";


class Service extends Model {
    public serviceID!: number;
    public licenseID!: number;
    public title!: string;
    public cost!: number;

    public static initModel() {
        return Service.init(
            {
                serviceID: {
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
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cost: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                modelName: "Services",
                timestamps: false,
            }
        );
    }
}

export default Service;
