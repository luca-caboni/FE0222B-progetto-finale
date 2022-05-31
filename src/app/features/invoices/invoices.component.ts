import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { DialogDeleteInvoiceComponent } from '../dialog/dialog-delete-invoice.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})


export class InvoicesComponent implements OnInit{


  dataInvoices!: any;
  sub!: Subscription;
  customerId!: number;
  check!: boolean;
  displayedColumns = ['id', 'ragioneSociale', 'stato', 'data', 'importo', 'azioni'];
  data = new Date();
  hour = `${this.data.getHours()}:${this.data.getMinutes()}:${this.data.getSeconds()}`;
  day = `${this.data.getDate()}/${this.data.getMonth()}/${this.data.getFullYear()}`;


  constructor(private invoicesSrv: InvoicesService, private currentRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCustomerId();
    if (this.customerId) {
      this.invoicesSrv
        .getInvoicesByCustomer(this.customerId, 0, 20)
        .subscribe((res) => {
          console.log(res);
          this.dataInvoices = res;
        });
    } else {
      this.invoicesSrv.getAllInvoices(0, 20).subscribe((res) => {
        this.dataInvoices = res;
        console.log(this.dataInvoices.content, this.dataInvoices);
      });
    }
  }

  delete(id: number) {
    this.openDialog();
    this.invoicesSrv.deleteInvoice(id).subscribe((res) => {
      console.log(res);
    });
  }
  getCustomerId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      console.log(res);
      this.customerId = +res['id'];
      console.log(this.customerId);
    });
    if (this.customerId) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  onPageEvent(event: PageEvent) {
    this.invoicesSrv
      .getAllInvoices(event.pageIndex, event.pageSize)
      .subscribe((res) => {
        console.log(res);
        this.dataInvoices = res;
        console.log(this.dataInvoices);
      });
  }

  openDialog(): void {
    const dialogDel = this.dialog.open(DialogDeleteInvoiceComponent, {
      width: '250px',
    });

    dialogDel.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  sendMail(mail: string) {
    console.log("mail");
    window.location.href = "mailto:" + mail;
  }

  call(tel: number) {
    console.log("tel");
    window.location.href = "telto:" + tel;
  }
}

