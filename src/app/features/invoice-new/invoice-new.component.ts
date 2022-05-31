import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.scss']
})
export class InvoiceNewComponent implements OnInit {


  constructor(private invoicesSrv: InvoicesService, private router: ActivatedRoute) { }

  ngOnInit(): void {


}

}

