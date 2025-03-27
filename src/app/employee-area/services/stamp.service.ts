import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp, StampType } from '../../models/stamp';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StampService {

  listaStamp: Stamp[] = [
    { date: new Date('2021-09-01'), time: 8,  type: StampType.out },
    { date: new Date('2021-09-01'), time: 13, type: StampType.in },
    { date: new Date('2021-09-01'), time: 14, type: StampType.in }
  ];

  stamp(Data: any, password: any) {
    throw new Error('Method not implemented.');
  }

  private _http = inject(HttpClient);
  private _url = 'stamp.json';

  constructor() {}

  GetStamp() {
    return this.listaStamp;
  }

  PostStamp(stamp: Stamp) { 
    console.log(stamp);    
    return this.listaStamp.push(stamp);
  }

  // GetStamp(): Observable<Stamp[]> {
  //   return this._http.get<Stamp[]>(this._url);
  // }

  // PostStamp(stamp: Stamp): Observable<Stamp> { 
  //   return this._http.post<Stamp>(this._url, stamp);
  // }

}
