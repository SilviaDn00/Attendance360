import { inject, Injectable, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _users: User[] = [];
  private _userServices: UsersService = inject(UsersService);

  constructor() {
    this._userServices.getUsers().subscribe((data) => {
      this._users = data;

    });
  }


  // ngOnInit(): void {
  //   this._userServices.getUsers().subscribe((data) => {
  //     this._users = data;

  //   });
  // }

  login(username: string, password: string): boolean {
    console.log('Lista degli utenti:', this._users);
    // Cerchiamo un utente con username e password che corrispondono
    const user = this._users.find(u => u.username === username && u.password === password);

    // Se esiste un utente che corrisponde, restituiamo true (accesso consentito)
    if (user) {
      localStorage.setItem('username', user.username);
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }
}
