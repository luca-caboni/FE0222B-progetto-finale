import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataAuth } from '../models/data-auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 pathApi:string;
 authSubject= new BehaviorSubject<null | DataAuth>(null)
 loginStatus= new BehaviorSubject<boolean >(false)

  userControl$= this.authSubject.asObservable();

  constructor(private http:HttpClient) {
    this.pathApi=environment.pathApi;
   }
   login(data:any){
    console.log(data)
    return this.http.post<any>(this.pathApi+ '/api/auth/login',data)
  }

   signUp(data:any){
    console.log(data)
    return this.http.post<any>(this.pathApi+ '/api/auth/signup',data)
   }

  userGetAll(page:number,size:number){
  return this.http.get<any>(`${this.pathApi}/api/users?page=${page}&size=${size}`)
   }
  get isLogged():boolean{
    return localStorage.getItem('current-user')!= null;
  }
  // get CurrentUser():User{
  //   return JSON.parse(localStorage.getItem('current-user')) as User || null;
  // }
}
