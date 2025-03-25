import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private readonly _http = inject(HttpClient);

  private readonly _url  = 'users.json';

  constructor() { }

getUsers() : Observable<User[]> {
    return this._http.get<User[]>(this._url);
  }

}
