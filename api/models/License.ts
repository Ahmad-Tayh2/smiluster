import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db"; // Import your Sequelize instance

class License extends Model {
    public licenseID!: number;
    public expirationDate!: Date;
    public licenseKey!: string;

    // Other model methods and associations can be defined here

    // Define the model associations in the static init method
    public static initModel() {
        return License.init(
            {
                licenseID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                expirationDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                licenseKey: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Licenses",
                timestamps: false,
            }
        );
    }
    // Since the association should be declared
    // only from one side
    // static associate(models: any) {
    //     License.hasMany(models.User);
    // }
}

export default License;
