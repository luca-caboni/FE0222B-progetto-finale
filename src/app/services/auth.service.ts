import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/auth-data';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  pathApi: string
  user!: { username: string, email: string, password: string, nome: string, cognome: string, role: [] }
  private authSubject = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubject.asObservable();
  logged = this.authSubject.pipe(map(user => !!user));


  constructor(private http: HttpClient, private router: Router) {
    this.pathApi = environment.pathApi
    this.recoverUser();
  }

  signup(user: any) {
    return this.http.post(`${this.pathApi}/api/auth/signup`, user)
  }

  login(data: AuthData) {
    console.log(data)
    return this.http.post<AuthData>(`${this.pathApi}/api/auth/login`, data).pipe(tap(data => {
      this.authSubject.next(data);
      localStorage.setItem('user', JSON.stringify(data));
    }));
  }

  recoverUser() {
    const userJson = localStorage.getItem('user')
    if (!userJson) {
      return
    }
    const user: AuthData = JSON.parse(userJson)
    this.authSubject.next(user)
  }

  logout() {
    this.authSubject.next(null);
    this.router.navigate(['/login'])
    localStorage.removeItem('user')
  }
}
