import { Data } from "@angular/router";

export enum StampType {
    checkIn = 'entrata',
    checkOut = 'uscita',
}

export class Stamp {
    constructor( public date : Data, public time : number, public type : StampType) { }
}