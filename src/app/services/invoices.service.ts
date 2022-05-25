import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  pathApi: string


  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi
   }

   getInvoices(page:number){
     return this.http.get<any>(`${this.pathApi}/api/fatture?page=${page}&size=20&sort=id,ASC`);
   }

   deleteInvoice(id:number){
     return this.http.delete(`${this.pathApi}/api/fatture/${id}`);
   }

   getInvoiceByCustomer(id:number, page:number){
     return this.http.get<any>(`${this.pathApi}/api/fatture/cliente/${id}?page=${page}&size=20&sort=id,ASC`);
   }

   statusInvoice(){
     return this.http.get<any>(`${this.pathApi}/api/statifattura?page=0&size=20&sort=id,ASC`)
   }

   addInvoice(data: Invoice){
     return this.http.post(`${this.pathApi}/api/fatture`, data)
   }

   getById(id:number){
     return this.http.get<any>(`${this.pathApi}/api/fatture/${id}`)
   }

   modifyInvoice(id:number, data:any){
     return this.http.put<any>(`${this.pathApi}/api/fatture/${id}`,data)
   }


}
