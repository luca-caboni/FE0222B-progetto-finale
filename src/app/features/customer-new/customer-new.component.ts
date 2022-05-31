import { Component, OnInit } from '@angular/core';
import {Customer } from '../../models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {



  constructor(private customersSrv: CustomersService, private router: ActivatedRoute) { }

  ngOnInit(): void {

  }}
