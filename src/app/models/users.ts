export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    department: string;
}

export class User {      
    constructor( public id: string, public name: string, public surname: string, public email: string, public password: string, public role: string, public department : string ) {}
}