import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  pathApi = environment.pathApi;
  constructor(private http: HttpClient) { }

  getAllInvoices(pageIndex: number, pageSize:number) {
    return this.http.get<any>(`${this.pathApi}/api/fatture?page=${pageIndex}&size=${pageSize}&sort=id,ASC`)
  }
  getInvoicesById(id: number) {
    return this.http.get<any>(`${this.pathApi}/api/fatture/${id}`)
  }
  getInvoicesByCustomer(id: number, pageIndex: number, pageSize: number) {
    return this.http.get<any>(`${this.pathApi}/api/fatture/cliente/${id}?page=${pageIndex}&size=${pageSize}`)
  }


  setInvoice(id: number, data: any) {
    if (id == 0) {
      return this.http.post(`${this.pathApi}/api/fatture`, data)
    } else {
      return this.http.put(`${this.pathApi}/api/fatture/${id}`, data)
    }
  }

  deleteInvoice(id: number) {
    return this.http.delete(`${this.pathApi}/api/fatture/${id}`)
  }

  //stato Fattura
  getStatiInvoice() {
    return this.http.get<any>(`${this.pathApi}/api/statifattura`)
  }

}
