import { DataTypes, Model } from "sequelize";
import sequelize from "./config/db"; 
import { License, Appointment} from "./index"; 
import Service from "./Service";

class AppointmentService extends Model {
    public appointmentServiceID!: number;
    public appointmentID!: number;
    public serviceID!: number;
    public licenseID!: number;
    public isPaid!: boolean;
    public customCost!: number;
    

    public static initModel() {
        return AppointmentService.init(
            {
                appointmentServiceID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                appointmentID: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: Appointment,
                        key: "appointmentID",
                    },
                },
                serviceID: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: Service,
                        key: "serviceID",
                    },
                },
                isPaid: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                customCost: {
                    type: DataTypes.FLOAT,
                    defaultValue: 0,
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
                modelName: "AppointmentService",
                timestamps: false,
            }
        );
    }
    static associate(models:any) {
        AppointmentService.belongsTo(models.Service, {
            foreignKey: "serviceID",
            as: "services"
        });
        
        AppointmentService.belongsTo(models.Appointment, {
            foreignKey: "appointmentID",
            as: "appoitnments",
        });
    }
}

export default AppointmentService;
