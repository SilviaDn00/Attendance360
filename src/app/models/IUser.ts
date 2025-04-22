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