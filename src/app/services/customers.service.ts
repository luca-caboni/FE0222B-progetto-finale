import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  pathApi: string;
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getCustomers(pageIndex: number, pageSize: number) {
    return this.http.get<any>(
      `${this.pathApi}/api/clienti?page=${pageIndex}&size=${pageSize}`
    );
  }

  setCustomer(data:any,id:number){
   if(id!=0){
     return this.http.put(`${this.pathApi}/api/clienti/${id}`,data)
   }
  console.log(data)
    return this.http.post(
      `${this.pathApi}/api/clienti`,data
    )
  }
  getCustomerType() {
    return this.http.get(`${this.pathApi}/api/clienti/tipicliente`);
  }
  getCustomerById(id: number) {
    return this.http.get<any>(`${this.pathApi}/api/clienti/${id}`);
  }
  deleteCustomer(id: number) {
    return this.http.delete<any>(`${this.pathApi}/api/clienti/${id}`);
  }
}
