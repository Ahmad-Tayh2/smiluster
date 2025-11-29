import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db"; // Import your Sequelize instance
import License from "./License"; // Import the License model

interface WorkHourSegment {
    day: number;
    startTime: string;
    endTime: string;
}
interface HolidaysList {
    date: Date;
    designation: string;
}
class Settings extends Model {
    public settingID!: number;
    public licenseID!: number;
    public notificationPreferences!: boolean;
    public worksHours!: WorkHourSegment[];
    public sessionPeriod!: string;
    public holidays?: HolidaysList[];
    public allowReminderSMS!: boolean;
    public smsReminderMassage?: string;

    // Other model methods and associations can be defined here

    // Define the model associations in the static init method
    public static initModel() {
        return Settings.init(
            {
                settingID: {
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
                notificationPreferences: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                worksHours: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                sessionPeriod: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                holidays: {
                    type: DataTypes.JSON,
                },
                allowReminderSMS: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                smsReminderMassage: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Settings",
                timestamps: false,
            }
        );
    }
}

export default Settings;
