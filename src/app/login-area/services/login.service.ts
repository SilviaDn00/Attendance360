import { inject, Injectable, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/users';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private _userServices: UsersService = inject(UsersService);
  private _users: User[] = [];

  constructor() {
    this._userServices.getUsers().subscribe((data) => {
      this._users = data;
    });
  }

  login(email: string, password: string): boolean {
    // Cerchiamo un utente con username e password che corrispondono
    const user = this._users.find(u => u.email === email && u.password === password);

    // Se esiste un utente che corrisponde, restituiamo true (accesso consentito)
    if (user) {
      localStorage.setItem('id', user.id);
      localStorage.setItem('name', user.name);
      localStorage.setItem('surname', user.surname);
      localStorage.setItem('role', user.role);
      return true;
    } else {
      // Altrimenti, restituiamo false (accesso negato)
      return false;
    }
  }

  getRole(): string | null {
    return localStorage.getItem('role') || null;
  }

  getUserID(): string | null {
    return localStorage.getItem('id') || null;
  }

  getUsername(): string | null {
    let n = this._users.find(u => u.id === localStorage.getItem('id'))?.name || null;
    let s = this._users.find(u => u.id === localStorage.getItem('id'))?.surname || null;
    let username = n + ' ' + s;
    return username;
  }

  logout(): void {
    localStorage.clear();
  }
}
