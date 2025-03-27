import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8080/api/auth"
  private userSubject = new BehaviorSubject<User | null>(null);
 
  constructor(
    private http: HttpClient
  ) { }

  register(user: User) : Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user)
  }

  login(credentials : {username: string, password: string}) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
  }

  updateUser(id: number, updateUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateUser).pipe(
      tap((updatedUser: any) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
    );
  }
}
