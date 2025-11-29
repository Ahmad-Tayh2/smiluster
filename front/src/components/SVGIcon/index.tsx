import React from "react";
import { ReactComponent as HomeSVG } from "../../icons/home.svg";
import { ReactComponent as AppointmentSVG } from "../../icons/appointment.svg";
import { ReactComponent as NotificationSVG } from "../../icons/notification.svg";
import { ReactComponent as PatientSVG } from "../../icons/patient.svg";
import { ReactComponent as StockSVG } from "../../icons/stock.svg";
import { ReactComponent as InvoicingSVG } from "../../icons/invoicing.svg";
import { ReactComponent as SettingsSVG } from "../../icons/settings.svg";
import { ReactComponent as AddSVG } from "../../icons/add.svg";
import { ReactComponent as RightArrowSVG } from "../../icons/right-arrow.svg";
import { ReactComponent as RightSVG } from "../../icons/right.svg";
import { ReactComponent as LeftArrowSVG } from "../../icons/left-arrow.svg";
import { ReactComponent as DotsSVG } from "../../icons/dots.svg";
import { ReactComponent as CheckSVG } from "../../icons/check.svg";
import { ReactComponent as SearchSVG } from "../../icons/search.svg";
import { ReactComponent as RemoveSVG } from "../../icons/remove.svg";
import { ReactComponent as LogoutSVG } from "../../icons/logout.svg";
import { ReactComponent as EditSVG } from "../../icons/edit.svg";
import { ReactComponent as TrashSVG } from "../../icons/trash.svg";
import { ReactComponent as DownloadSVG } from "../../icons/download.svg";
import { ReactComponent as UploadSVG } from "../../icons/upload.svg";
import { ReactComponent as Upload2SVG } from "../../icons/upload2.svg";
import { ReactComponent as PhoneSVG } from "../../icons/phone.svg";
import { ReactComponent as EmailSVG } from "../../icons/email.svg";
import { ReactComponent as MaleSVG } from "../../icons/male.svg";
import { ReactComponent as FemaleSVG } from "../../icons/female.svg";
import { ReactComponent as ViewSVG } from "../../icons/view.svg";

import { ReactComponent as DocumentSVG } from "../../icons/document.svg";
import { ReactComponent as PrescriptionSVG } from "../../icons/prescription.svg";
import { ReactComponent as CameraSVG } from "../../icons/camera.svg";
import { ReactComponent as SandClockSVG } from "../../icons/sand-clock.svg";
import { ReactComponent as NotFound } from "../../icons/not-found.svg";
import { ReactComponent as ShowSVG } from "../../icons/show.svg";
import { ReactComponent as HideSVG } from "../../icons/hide.svg";
import { ReactComponent as MinimizeSVG } from "../../icons/minimize.svg";
import { ReactComponent as MaximizeSVG } from "../../icons/maximize.svg";
import { ReactComponent as DotSVG } from "../../icons/dot.svg";
import { ReactComponent as HelpSVG } from "../../icons/circule-help.svg";
import { ReactComponent as LinkSVG } from "../../icons/go-link.svg";

export default function SVGIcon(props: SVGProps) {
    const { type, color, width, height, style, onClick } = props;
    const iconStyle = {
        ...style,
        color: color,
        width: width + "px",
        height: height + "px",
    };
    switch (type) {
        case "home":
            return <HomeSVG style={iconStyle} onClick={onClick} />;
        case "appointments":
            return <AppointmentSVG style={iconStyle} onClick={onClick} />;
        case "notification":
            return <NotificationSVG style={iconStyle} onClick={onClick} />;
        case "patients":
            return <PatientSVG style={iconStyle} onClick={onClick} />;
        case "stock":
            return <StockSVG style={iconStyle} onClick={onClick} />;
        case "invoicing":
            return <InvoicingSVG style={iconStyle} onClick={onClick} />;
        case "settings":
            return <SettingsSVG style={iconStyle} onClick={onClick} />;
        case "add":
            return <AddSVG style={iconStyle} onClick={onClick} />;
        case "right":
            return <RightSVG style={iconStyle} onClick={onClick} />;
        case "right-arrow":
            return <RightArrowSVG style={iconStyle} onClick={onClick} />;
        case "left-arrow":
            return <LeftArrowSVG style={iconStyle} onClick={onClick} />;
        case "dots":
            return <DotsSVG style={iconStyle} onClick={onClick} />;
        case "check":
            return <CheckSVG style={iconStyle} onClick={onClick} />;
        case "search":
            return <SearchSVG style={iconStyle} onClick={onClick} />;
        case "remove":
            return <RemoveSVG style={iconStyle} onClick={onClick} />;
        case "logout":
            return <LogoutSVG style={iconStyle} onClick={onClick} />;
        case "edit":
            return <EditSVG style={iconStyle} onClick={onClick} />;
        case "trash":
            return <TrashSVG style={iconStyle} onClick={onClick} />;
        case "download":
            return <DownloadSVG style={iconStyle} onClick={onClick} />;
        case "upload":
            return <UploadSVG style={iconStyle} onClick={onClick} />;
        case "upload2":
            return <Upload2SVG style={iconStyle} onClick={onClick} />;
        case "phone":
            return <PhoneSVG style={iconStyle} onClick={onClick} />;
        case "email":
            return <EmailSVG style={iconStyle} onClick={onClick} />;
        case "male":
            return <MaleSVG style={iconStyle} onClick={onClick} />;
        case "female":
            return <FemaleSVG style={iconStyle} onClick={onClick} />;
        case "view":
            return <ViewSVG style={iconStyle} onClick={onClick} />;
        case "document":
            return <DocumentSVG style={iconStyle} onClick={onClick} />;
        case "prescription":
            return <PrescriptionSVG style={iconStyle} onClick={onClick} />;
        case "camera":
            return <CameraSVG style={iconStyle} onClick={onClick} />;
        case "sand-clock":
            return <SandClockSVG style={iconStyle} onClick={onClick} />;
        case "not-found":
            return <NotFound style={iconStyle} onClick={onClick} />;
        case "show":
            return <ShowSVG style={iconStyle} onClick={onClick} />;
        case "hide":
            return <HideSVG style={iconStyle} onClick={onClick} />;
        case "mini":
            return <MinimizeSVG style={iconStyle} onClick={onClick} />;
        case "maxi":
            return <MaximizeSVG style={iconStyle} onClick={onClick} />;
        case "dot":
            return <DotSVG style={iconStyle} onClick={onClick} />;
        case "help":
            return <HelpSVG style={iconStyle} onClick={onClick} />;
        case "link":
            return <LinkSVG style={iconStyle} onClick={onClick} />;
        default:
            return null;
    }
}
interface SVGProps {
    type: string;
    color: string;
    width: number;
    height: number;
    style?: any;
    onClick?: any;
}

SVGIcon.defaultProps = {
    name: "",
    color: "black",
    width: 32,
    height: 32,
    onClick: () => {},
};
