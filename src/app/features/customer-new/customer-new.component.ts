import { Component, OnInit } from '@angular/core';
import {Customer } from '../../models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { ActivatedRoute } from '@angular/router';
import {City, Province, Site } from '../../models/geo-data';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {

  provinces!: Province[];
  typesCustomer: any;
  cities!: City[];
  newCustomer: Customer = new Customer();
  idCustomer!: number



  constructor(private customersSrv: CustomersService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.province();
    this.city();
    this.typeCustomer();
    this.getIdCustomer();
    this.getCustomer();
  }

  province() {
    this.customersSrv.getProvince().subscribe((res) => {
      this.provinces = res.content;
    });
  }

  city() {
    this.customersSrv.getCity().subscribe((res) => {
      this.cities = res.content;
    });
  }

  getIdCustomer() {
    this.router.params.subscribe(async params => {
      this.idCustomer = +params['id'];

    });
  }
  getCustomer() {
    if (this.idCustomer != 0) {
      this.customersSrv.getCustomerById(this.idCustomer).subscribe(res => this.newCustomer = res)
    }
  }
  typeCustomer() {
    this.customersSrv.getTypeCustomer().subscribe((res) => {
      this.typesCustomer = res;
    });
  }
  udpateCustomer(){
    this.customersSrv.updateCustomer(this.idCustomer, this.newCustomer).subscribe(res => {
      console.log(res);
    });
  }

  addCustomer(){
    this.customersSrv.addCustomer(this.newCustomer).subscribe(res => {
      console.log(res)
    });
  }


}
