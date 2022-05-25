import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  pathApi:string


  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi
   }

  getCustomers(page:number){
    return this.http.get<any>(`${this.pathApi}/api/clienti?page=${page}&size=20&sort=id,ASC`)
  }

  getCustomerById(id:number){
    return this.http.get<any>(`${this.pathApi}/api/clienti/${id}`)
  }

  deleteInvoicesCustomer(id:number){
    return this.http.delete(`${this.pathApi}/api/fatture/cliente/${id}`)
  }

  deleteCustomer(id:number){
    return this.http.delete(`${this.pathApi}/api/clienti/${id}`)
  }

  addCustomer(customer:any){
    return this.http.post<Customer>(`${this.pathApi}/api/clienti`, customer)
  }

  getProvince(){
    return this.http.get<any>(`${this.pathApi}/api/province?page=0&size=20&sort=id,ASC`)
  }

  getCity(){
    return this.http.get<any>(`${this.pathApi}/api/comuni?page=0&size=20&sort=id,ASC`)
  }

  getTypeCustomer(){
    return this.http.get(`${this.pathApi}/api/clienti/tipicliente`);
  }

  updateCustomer(id:number, data:any){
    return this.http.put(`${this.pathApi}/api/clienti/${id}`, data)
  }
}
