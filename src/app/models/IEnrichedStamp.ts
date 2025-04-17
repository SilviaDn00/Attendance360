import { StampType } from "./stamp";

export interface IEnrichedStamp {
    username: string;
    role: string;
    department: string;
    date: Date;
    time: string;
    type: StampType;
    workedHours: number;
  }
  