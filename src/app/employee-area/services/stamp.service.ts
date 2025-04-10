import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp, StampType } from '../../models/stamp';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class StampService {

  listaStamp: Stamp[] = [];

  private _http = inject(HttpClient);
  private _urlGet = 'http://localhost:5077/api/Stamp/GetStamps'; // URL del tuo endpoint API
  private _urlPost = 'http://localhost:5077/api/Stamp/PostStamp'; // URL del tuo endpoint API


  constructor() {
    const savedStampList = localStorage.getItem('listaStamp');
    if (savedStampList) {
      this.listaStamp = JSON.parse(savedStampList);
    }
  }

  // GetStamp() {
  //   return this.listaStamp;
  // }

  // PostStamp(stampForm: Stamp): void {
  //   this.listaStamp.push(stampForm);
  //   localStorage.setItem('stampList', JSON.stringify(this.listaStamp))
  // }


    GetStamp(): Observable<Stamp[]> {
    return this._http.get<Stamp[]>(this._urlGet);
  }

  PostStamp(stamp: Stamp): Observable<Stamp> { 
    return this._http.post<Stamp>(this._urlPost, stamp);
  }

}
