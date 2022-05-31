import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CustomersService } from 'src/app/services/customers.service';
import { DialogDeleteCustomerComponent} from '../dialog/dialog-delete-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  data = new Date();
  hour = `${this.data.getHours()}:${this.data.getMinutes()}:${this.data.getSeconds()}`;
  day = `${this.data.getDate()}/${this.data.getMonth()}/${this.data.getFullYear()}`;
  dataCustomers: any;
  displayedColumns: string[] = [
    'ragioneSociale',
    'email',
    'partitaIva',
    'tipoClienti',
    'emailContatto',
    'comuneSedeOperativa',
    'azioni',
  ];

  constructor(private customersSrv: CustomersService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.customersSrv.getCustomers(0, 20).subscribe((res) => {
      console.log(res, res.content);
      this.dataCustomers = res;
      console.log(this.dataCustomers, this.dataCustomers.content);
    });
  }

  onPageEvent(event: PageEvent) {
    this.customersSrv
      .getCustomers(event.pageIndex, event.pageSize)
      .subscribe((res) => {
        console.log(res);
        this.dataCustomers = res;
        console.log(this.dataCustomers);
      });
  }

  openDialog(): void {
    const dialogDelCust = this.dialog.open(DialogDeleteCustomerComponent, {
      width: '250px',
    });

    dialogDelCust.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  delete(id: number) {
    this.openDialog();
    console.log(id);
    this.dataCustomers.content[id];
    this.customersSrv.deleteCustomer(id).subscribe((res) => {});
  }

}
