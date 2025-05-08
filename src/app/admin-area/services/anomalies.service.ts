import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnomaliesService {
  private readonly _http = inject(HttpClient);
  private readonly _urlAnomaly = 'https://localhost:44333/api/Anomalies/today'; // URL del tuo endpoint API

  constructor() { }

  GetTodayAnomalies(): Observable<string[]> {
    return this._http.get<string[]>(this._urlAnomaly);
  }

}
