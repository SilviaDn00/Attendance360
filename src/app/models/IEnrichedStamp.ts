import { ButtonProperties } from "./buttonProperties";
import { StampType } from "./stamp";
 
export interface IEnrichedStamp {
    id?: string;
    username?: string;
    role?: string;
    department?: string;
    date: Date;
    time: string;
    type: StampType;
    workedHours?: number;
    button?: ButtonProperties[];
  }