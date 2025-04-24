import { ButtonProperties } from "./buttonProperties";
import { StampType } from "./stamp.DTO";

export interface IEnrichedStamp {
  id?: string;
  userId?: string;
  username?: string;
  role?: string;
  department?: string;
  date: Date;
  time: string;
  type: StampType;
  workedHours?: number;
  button?: ButtonProperties[];
}
