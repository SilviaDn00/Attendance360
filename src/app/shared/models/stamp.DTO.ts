import { IStamp } from "./stamp.interface";

export enum StampType {
    checkIn = 'ingresso',
    checkOut = 'uscita',
}

export class Stamp implements IStamp {
    constructor(public date: Date, public time: string, public type: StampType, public id?: string, public userID?: string) { }
}