
import LogsAction from "../../enums/LogsAction";
import EntityType from "../../enums/EntityType";
import Logs from "../../models/Logs";

export async function createLog(logElement: log) {
    await Logs.create(logElement);
}

type log = {
    licenseID: number
    userID: number,
    action: LogsAction,
    entityID: number,
    entityType: EntityType,
    details?: object
}