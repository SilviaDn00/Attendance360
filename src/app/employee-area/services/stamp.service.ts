import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp } from '../../shared/models/stamp.DTO';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class StampService {

  listaStamp: Stamp[] = [];

  private _http = inject(HttpClient);
  private _url = 'http://localhost:5077/api/Stamp'; // URL del tuo endpoint API


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

  PostStamp(stamp: Stamp): Observable<Stamp> {
    return this._http.post<Stamp>(this._url, stamp);
  }

}
