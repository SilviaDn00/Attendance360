import { StampType } from "./stamp";

export interface IStamp {
    date : Date;
    time : string;
    type : StampType;
    id?: string;
    userID?: string;
    workedHours?: number;
}