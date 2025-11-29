import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "./config/db"; // Import your Sequelize instance
import { License } from "./index";
import { ToothAct } from "./index";

class Act extends Model {
    public actID!: number;
    public licenseID!: number;
    public title!: string;
    public cost!: number;

    public static initModel() {
        return Act.init(
            {
                actID: {
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
                modelName: "Acts",
                timestamps: false,
            }
        );
    }
    // static associate(models: any) {
    //     Act.belongsToMany(models.Tooth, {
    //         through: ToothAct,
    //         foreignKey: "actID",
    //     });
    // }
}

export default Act;
