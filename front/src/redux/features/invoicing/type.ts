export interface AppointmentState {
    list: Invoice[] | null;
    invoice: Invoice | null;
    filtersBy: FiltersBy;
    loading: boolean;
    patientBills: {
        list: Invoice[] | null;
        filtersBy: FiltersBy;
    };
    // pagination: PaginationFormat;
}
export interface FiltersBy {
    search?: string;
    status?: string[];
    createdAt?: string;
    patientID?: any;
    itemsPerPage?: number;
    currentPageNumber?: number;
}
export interface Invoice {
    id: number;
    ref: string;
    firstNameP: string;
    lastNameP: string;
    creationDate: string;
    totalAmount: number;
    payedAmount: number;
    restAmount: number;
    status: string;
    details: (InvoiceAppointment | InvoicePayment)[];
}
interface InvoiceAppointment {
    type: "appointment";
    id: number;
    date: string;
    time: string;
    status: string;
    diagnostic: string;
    prescription: string;
    note: string;
    cost: number;
    payments:InvoicePayment;
    services:InvoiceService;
    toothActs:InvoiceToothActs;
}
interface InvoiceToothActs {
    type:"toothAct";
    id:number;
    actID:number;
    actName:string;
    toothNumber:number;
    cost:number;
}
interface InvoiceService {
    type:"service";
    id:number;
    cost:number
    title:string;
}
interface InvoicePayment {
    type: "payment";
    id: number;
    factureID:number;
    appointmentID:number;
    date: string;
    time: string;
    cost: number;
}
