import { Data } from "@angular/router";

export enum StampType {
    in = 'entrata',
    out = 'uscita',
}

export class Stamp {
    constructor( public date : Data, public time : number, public type : StampType) { }
}