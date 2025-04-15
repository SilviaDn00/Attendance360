import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _http = inject(HttpClient);

  private readonly _url = 'http://localhost:5077/api/User/GetUsers'; // URL del tuo endpoint API

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._url);
  }

  PostUsers(): Observable<User[]> {
    return this._http.post<User[]>(this._url, {});
  }
  
  UpdateUsers(user: User): Observable<User[]> {
    return this._http.put<User[]>(this._url, user);
  }

}
