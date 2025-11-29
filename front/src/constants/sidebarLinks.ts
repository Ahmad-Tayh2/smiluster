import { ROUTER } from "./env";
export const links = [
    { url: ROUTER.HOME, type: "home", name: "Acceuil" },
    { url: ROUTER.APPOINTMENTS, type: "appointments", name: "Rendez-vous" },
    { url: ROUTER.PATIENTS, type: "patients", name: "Patients" },
    { url: ROUTER.STOCK, type: "stock", name: "Stock" },
    { url: ROUTER.INVOICING, type: "invoicing", name: "Facturation" },
    { url: ROUTER.SETTINGS, type: "settings", name: "Paramètres" },
];
