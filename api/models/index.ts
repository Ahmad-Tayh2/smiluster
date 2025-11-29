import db from "./config/db";
import Act from "./Act";
import License from "./License";
import User from "./User";
import Patient from "./Patient";
import Facture from "./Facture";
import Appointment from "./Appointment";
import Document from "./Documents";
import Payment from "./Payment";
import Product from "./Product";
import Settings from "./Settings";
import Stock from "./Stock";
import Tooth from "./Tooth";
import ToothAct from "./ToothAct";
import ToothRDV from "./ToothRDV";
import Service from "./Service";
import AppointmentService from "./AppointmentService";
import Logs from "./Logs";


let models: any = {
    License,
    Act,  
    Patient,
    Settings,
    Product,
    Stock,
    User,
    Facture,
    Appointment,
    Document,
    Payment,
    Tooth,
    ToothAct,
    ToothRDV,
    Service,
    AppointmentService,
    Logs,
};

// Initialize the models by calling initModel
for (const modelName of Object.keys(models)) {
    const model = models[modelName].initModel(); 
    models[modelName] = model; 
}

// Associate the models
for (const modelName of Object.keys(models)) {
    const model = models[modelName];
    if (typeof model?.associate === "function") {
        model.associate(models);
    }
}

db.sync({ force: false }).then(() => {
    console.log("Tables created");
});
export {
    models,
    db,
    Act,
    User,
    License,
    Patient,
    Appointment,
    Document,
    Facture,
    Payment,
    Product,
    Settings,
    Stock,
    Tooth,
    ToothAct,
    ToothRDV,
    Service,
    AppointmentService,
    Logs,
};
