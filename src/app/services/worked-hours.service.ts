import { Injectable } from '@angular/core';
import { Stamp } from '../models/stamp';

@Injectable({
  providedIn: 'root'
})

export class WorkedHoursService {

  public parseTimeInMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10));
    return hours * 60 + minutes;
  }

  public calculateWorkedMinutes(stamps: Stamp[]): number {
    let totalMinutes = 0;

    for (let i = 0; i < stamps.length - 1; i += 2) {
      const checkIn = stamps[i];
      const checkOut = stamps[i + 1];

      if (checkIn.type === 'ingresso' && checkOut.type === 'uscita') {
        const inMinutes = this.parseTimeInMinutes(checkIn.time);
        const outMinutes = this.parseTimeInMinutes(checkOut.time);
        const diff = outMinutes - inMinutes;

        if (diff > 0) {
          totalMinutes += diff;
        }
      }
    }

    return totalMinutes;
  }
}