export enum StampType {
    checkIn = 'entrata',
    checkOut = 'uscita',
}

export class Stamp {
    constructor(public id: string, public date : Date, public time : number, public type : StampType) { }
}