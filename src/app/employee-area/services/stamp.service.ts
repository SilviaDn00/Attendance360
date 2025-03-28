import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp, StampType } from '../../models/stamp';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StampService {

  listaStamp: Stamp[] = [
    { date: new Date('2021-09-01'), time: 8,  type: StampType.checkOut },
    { date: new Date('2021-09-01'), time: 13, type: StampType.checkIn },
    { date: new Date('2021-09-01'), time: 14, type: StampType.checkOut }
  ];

  private _http = inject(HttpClient);
  private _url = 'stamp.json';

  constructor() {
    const savedStampList = localStorage.getItem('listaStamp');
    if (savedStampList) {
      this.listaStamp = JSON.parse(savedStampList);
    }
  }

  GetStamp() {
    return this.listaStamp;
  }

  PostStamp(stampForm: FormGroup): void {
    this.listaStamp.push(stampForm.value);
    localStorage.setItem('stampList', JSON.stringify(this.listaStamp))
  }


  // PostStamp(stampFormGroup : FormGroup): void {  
  //   this.listaStamp.push(stampFormGroup.value);
  // }

  // GetStamp(): Observable<Stamp[]> {
  //   return this._http.get<Stamp[]>(this._url);
  // }

  // PostStamp(stamp: Stamp): Observable<Stamp> { 
  //   return this._http.post<Stamp>(this._url, stamp);
  // }

}
