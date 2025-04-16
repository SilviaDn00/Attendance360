import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _http = inject(HttpClient);

  private readonly _urlUsers = 'http://localhost:5077/api/User/GetUsers'; // URL del tuo endpoint API
  private readonly _urlUser = 'http://localhost:5077/api/User/GetUser'; // URL del tuo endpoint API
  private readonly _urlPost = 'http://localhost:5077/api/User/PostUser'; // URL del tuo endpoint API
  private readonly _urlUpdate = `http://localhost:5077/api/User/UpdateUser`; // URL del tuo endpoint API
  private readonly _urlEnabled = 'http://localhost:5077/api/User/EnabledUser'; // URL del tuo endpoint API



  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._urlUsers);
  }

  getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${this._urlUser}/${id}`);
  }

  PostUsers(user : User): Observable<User[]> {
    return this._http.post<User[]>(this._urlPost, user);
  }

  UpdateUsers( user : User): Observable<User[]> {
    console.log('user', user);   
    console.log();
    
    return this._http.put<User[]>(`${this._urlUpdate}/${user.id}`, user);
  }

  UpdateUserEnabled(id: string): Observable<User> {
    return this._http.put<User>(`${this._urlEnabled}/${id}`, {}); 
  }
  

}
