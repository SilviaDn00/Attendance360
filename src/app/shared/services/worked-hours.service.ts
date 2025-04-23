import { Injectable } from '@angular/core';
import { Stamp } from '../models/stamp';

@Injectable({
  providedIn: 'root'
})

export class WorkedHoursService {

  // Converte una stringa di tempo nel formato "HH:MM" in minuti totali
  public parseTimeInMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10));
    return hours * 60 + minutes;
  }

  // Calcola le ore lavorate in base ai timbri di ingresso e uscita
  public calculateWorkedHours(stamps: Stamp[]): number {
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
    return +(totalMinutes / 60).toFixed(2); // ritorna ore in decimale
  }

  // Calcola le ore lavorate per un utente in una data specifica
  getUserWorkedHours(userId: string, date: Date, allStamps: Stamp[]): number {
    const dateOnly = date.toISOString().slice(0, 10);
    const stampsForUserAndDate = allStamps
      .filter(s => s.userID === userId && new Date(s.date).toISOString().slice(0, 10) === dateOnly)
      .sort((a, b) => this.parseTimeInMinutes(a.time) - this.parseTimeInMinutes(b.time));
  
    return this.calculateWorkedHours(stampsForUserAndDate);
  }
}
 