import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEnrichedStamp } from '../../shared/models/enrichedStamp.interface';

@Injectable({
  providedIn: 'root'
})
export class EnrichedStampService {
  private _http = inject(HttpClient);
  private _urlEnrichedStamp = 'https://localhost:44333/api/enrichedstamp'; // URL del tuo endpoint API
  private _urlTodayEnrichedStamp = 'https://localhost:44333/api/enrichedstamp/today';

  constructor() { }

  getEnrichedStamps(): Observable<IEnrichedStamp[]> {
    return this._http.get<IEnrichedStamp[]>(this._urlEnrichedStamp);
  }

  getEnrichedStampById(id: string): Observable<IEnrichedStamp> {
    return this._http.get<IEnrichedStamp>(`${this._urlEnrichedStamp}/${id}`);
  }

  getTodayEnrichedStamps(): Observable<IEnrichedStamp[]> {
    return this._http.get<IEnrichedStamp[]>(this._urlTodayEnrichedStamp);
  }

}
