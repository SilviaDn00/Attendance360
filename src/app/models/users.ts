import { ButtonProperties } from "./buttonProperties";

export interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    department: string;
    enabled: boolean;
    button?: ButtonProperties[];
    workedHours?: number;
}

export class User implements IUser {

    public enabled: boolean = true;

    constructor(public id: string, public name: string, public surname: string, public email: string, public password: string, 
        public role: string, public department: string) { }
}
