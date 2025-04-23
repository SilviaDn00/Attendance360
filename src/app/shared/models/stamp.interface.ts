import { StampType } from "./stamp.DTO";

export interface IStamp {
    date: Date;
    time: string;
    type: StampType;
    id?: string;
    userID?: string;
    workedHours?: number;
}