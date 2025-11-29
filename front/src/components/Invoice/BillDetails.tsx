import React from "react";
import "./style.css";
import SVGIcon from "../../components/SVGIcon";
import AddServiceCard from "../../components/AddServiceCard";
import ActionsTable from "./ActionsTable";
export default function BillDetails(props: any) {
    const {
        actsTotalCost,
        appServicesTotalCost,
        toothActs,
        appServices,
        hide,
        handleUpdateToothAct,
        handleDeleteToothAct,
        handleGetToothActsByApp,
        handleUpdateAppointmentService,
        handleDeleteAppointmentService,
        handleGetAppointmentServices,
        appointmentID,
        setIsEditing,
    } = props;
    const toothActsData = [
        ...toothActs?.data?.map((item: any) => ({
            title: item.Act.title,
            cost: item.Act.cost,
            isPaid: item.isPaid,
            id: item.toothActID,
            prevData: item,
        })),
    ];
    const appServiceData = [
        ...appServices.map((item: any) => ({
            title: item.services.title,
            cost: item.services.cost,
            isPaid: item.isPaid,
            id: item.appointmentServiceID,
            prevData: item,
        })),
    ];
    const [openService, setOpenService] = React.useState(false);
    return (
        <div
            style={{
                // opacity: hide ? "0.3" : "1",
                // visibility: hide ? "hidden" : "visible",
                // display: hide ? "none" : "block",
                transition: "var(--main-transition)",
                maxHeight: hide ? "0" : "850px",
                overflow: "hidden",
            }}
        >
            <div
                className="invoicing-table-parent"
                style={
                    {
                        // position: "relative",
                        // opacity: hide ? "0.5" : "1",
                    }
                }
            >
                <ActionsTable
                    appointmentID={appointmentID}
                    onUpdate={handleUpdateToothAct}
                    onDelete={handleDeleteToothAct}
                    onGet={handleGetToothActsByApp}
                    total={actsTotalCost.toFixed(0)}
                    totalText="Coût total des actes"
                    columns={["Acte effectué", "Coût", "Statut"]}
                    data={toothActsData}
                    noDataMessagge="Aucune action n'a été effectuée"
                    setIsEditing={setIsEditing}
                />
            </div>

            {appServices.length > 0 && (
                <div
                    className="invoicing-table-parent"
                    style={{
                        marginTop: "10px",
                        // position: "relative",
                        // opacity: hide ? "0.5" : "1",
                    }}
                >
                    <ActionsTable
                        appointmentID={appointmentID}
                        onUpdate={handleUpdateAppointmentService}
                        onDelete={handleDeleteAppointmentService}
                        onGet={handleGetAppointmentServices}
                        total={appServicesTotalCost.toFixed(0)}
                        totalText="Coût total des services"
                        columns={["Service fourni", "Coût", "Statut"]}
                        data={appServiceData}
                        setIsEditing={setIsEditing}
                    />
                </div>
            )}
            <div
                style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                }}
            >
                <button
                    className="add-service-btn center"
                    onClick={() => setOpenService(true)}
                >
                    <SVGIcon
                        type="add"
                        color="inherit"
                        width={25}
                        height={25}
                    />
                    Ajouter service
                </button>
            </div>
            <AddServiceCard
                onClose={() => setOpenService(false)}
                display={openService}
                appointmentID={appointmentID}
                setIsFactureEdited={setIsEditing}
            />
        </div>
    );
}
