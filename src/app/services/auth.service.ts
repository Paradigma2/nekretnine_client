
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor() {}

  private fetchUser(): void {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  currentUser(): User {
    this.fetchUser();
    return this.user;
  }

  authenticated(): boolean {
    this.fetchUser();
    return (this.user ? true : false);
  }

  currentUserRole(): string {
    this.fetchUser();
    return this.user?.role;
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('currentUser');
  }
}
