import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db"; // Import your Sequelize instance
import License from "./License"; // Import the License model

class User extends Model {
    public userID!: number;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public phone!: number;
    public role!: "Doctor" | "Assistant" | "Secr";
    public licenseID?: number;

    // Other model methods and associations can be defined here

    // Define the model associations in the static init method
    public static initModel() {
        return User.init(
            {
                userID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                phone: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                role: {
                    type: DataTypes.ENUM("Doctor", "Assistant", "Secr"),
                    allowNull: false,
                },
                licenseID: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: License,
                        key: "licenseID",
                    },
                },
            },
            {
                sequelize,
                modelName: "User",
                timestamps: false,
            }
        );
    }
    static associate(models: any) {
        User.belongsTo(models.License, { foreignKey: "licenseID" });
    }
}

export default User;
