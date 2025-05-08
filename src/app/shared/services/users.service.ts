import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.DTO';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _http = inject(HttpClient);

  private readonly _url = 'https://localhost:44333/api/User'; 

  getUsers(onlyEmployees: boolean = false): Observable<User[]> {
    const url = onlyEmployees
      ? `${this._url}?onlyEmployees=true`
      : this._url;
    return this._http.get<User[]>(url);
  }

  getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${this._url}/${id}`);
  }

  PostUsers(user: User): Observable<User[]> {
    return this._http.post<User[]>(this._url, user);
  }

  UpdateUsers(user: User): Observable<User[]> {
    return this._http.put<User[]>(`${this._url}/${user.id}`, user);
  }

  UpdateUserEnabled(id: string): Observable<User> {
    return this._http.put<User>(`${this._url}/${id}`, {});
  }

}
