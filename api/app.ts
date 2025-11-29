const express = require("express");
const userRoutes = require("./routes/userRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const patientRoutes = require("./routes/patientRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const documentRoutes = require("./routes/documentRoutes");
const acteRoutes = require("./routes/acteRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const toothRoutes = require("./routes/toothRoutes");
const factureRoutes = require("./routes/factureRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const toothRDVRoutes = require("./routes/toothRDVRoutes");
const toothActRoutes = require("./routes/toothActRoutes");
const appointmentServiceRoutes = require("./routes/appointmentServiceRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

import { SERVER_PORT } from "./config";

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");



app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/license", licenseRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/product", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/act", acteRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/tooth", toothRoutes);
app.use("/api/facture", factureRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/toothRDV", toothRDVRoutes);
app.use("/api/toothAct", toothActRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/appointment-service", appointmentServiceRoutes);


app.listen(SERVER_PORT, () => {
    console.log(`Example app listening on port ${SERVER_PORT}`);
});
