import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stamp, StampType } from '../../models/stamp';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StampService {

  listaStamp: Stamp[] = [];

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
