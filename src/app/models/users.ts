export interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    department: string;
}

export class User implements IUser {      
    constructor( public id: string, public name: string, public surname: string, public email: string, public password: string, public role: string, public department : string ) {}
}