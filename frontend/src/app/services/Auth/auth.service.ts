import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<AuthResponse | null> = new BehaviorSubject<AuthResponse | null>(null);
  public userData = this.userSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user))
    }
  }

  setUser(user: AuthResponse) : void  {
    localStorage.setItem("user", JSON.stringify(user));
    this.userSubject.next(user)
  }

  getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  login(authResponse: AuthResponse) {
    // Stocke les données de l'utilisateur dans le localStorage
    console.log('Token de la réponse de l\'authentification:', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse));
    this.userSubject.next(authResponse); // Met à jour l'observable
  }

  // Déconnexion
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getAuthToken(): string | null {
    const user = this.getUserData();
    return user ? user.token : null
  }

   
}
