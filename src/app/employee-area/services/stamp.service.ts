import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp } from '../../shared/models/stamp.DTO';
import { HttpClient } from '@angular/common/http';
import { IEnrichedStamp } from '../../shared/models/enrichedStamp.interface';


@Injectable({
  providedIn: 'root',
})
export class StampService {

  listaStamp: Stamp[] = [];

  private _http = inject(HttpClient);
  private _url = 'https://localhost:44333/api/Stamp'; 


  constructor() {
    const savedStampList = localStorage.getItem('listaStamp');
    if (savedStampList) {
      this.listaStamp = JSON.parse(savedStampList);
    }
  }

  GetStamp(): Observable<Stamp[]> {
    return this._http.get<Stamp[]>(this._url);
  }

  GetStampById(id: string): Observable<Stamp> {
    return this._http.get<Stamp>(`${this._url}/${id}`);
  }

  GetStampByUserId(userId: string | null): Observable<Stamp[]> {
    return this._http.get<Stamp[]>(`${this._url}/Get/${userId}`);
  }

  PostStamp(stamp: Stamp): Observable<Stamp> {
    return this._http.post<Stamp>(this._url, stamp);
  }

}
