import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataAuth } from '../models/data-auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  pathApi: string;

  loginStatus = new BehaviorSubject<boolean>(false)
  loginControl$ = this.loginStatus.asObservable();

  isLoggedIn: boolean = false;


  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  login(data: DataAuth) {
    this.isLoggedIn = true;
    console.log(data)
    return this.http.post<DataAuth>(this.pathApi + '/api/auth/login', data)
  }

  signUp(data: any) {
    console.log(data)
    return this.http.post<any>(this.pathApi + '/api/auth/signup', data)
  }

  userGetAll(pageIndex: number, pageSize: number) {
    return this.http.get<any>(`${this.pathApi}/api/users?page=${pageIndex}&size=${pageSize}`)
  }
  get isLogged(): boolean {
    return localStorage.getItem('current-user') != null;
  }

}


