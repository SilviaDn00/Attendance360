export enum StampType {
    checkIn = 'entrata',
    checkOut = 'uscita',
}

export class Stamp {
    constructor( public date : Date, public time : number, public type : StampType, public id?: string, public username?: string) { }
}