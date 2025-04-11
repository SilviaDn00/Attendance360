export enum StampType {
    checkIn = 'ingresso',
    checkOut = 'uscita',
}

export class Stamp {
    constructor( public date : Date, public time : string, public type : StampType, public id?: string, public username?: string) { }
}