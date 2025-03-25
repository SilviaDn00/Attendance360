import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getRole(): string | null {
    return localStorage.getItem('role') || null;
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('username');
  }
}
