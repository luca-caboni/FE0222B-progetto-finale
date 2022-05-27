import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { InvoicesService } from '../../services/invoices.service'
import { CustomersService } from '../../services/customers.service'

@Component({
  selector: 'app-users',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {

  page: number = 0
  customers!: Customer[];
  currentIndex: number = this.page;
  displayedColumns = ['id', 'ragioneSociale', 'partitaIva', 'telefono', 'email'];


  data = new Date();
  hour = `${this.data.getHours()}:${this.data.getMinutes()}:${this.data.getSeconds()}`;
  day = `${this.data.getDate()}/${this.data.getMonth()}/${this.data.getFullYear()}`;


  constructor(private customersSrv: CustomersService, public invoicesSrv: InvoicesService) { }

  ngOnInit(): void {
    this.customersSrv.getCustomers(this.page).subscribe({
      next: (v) => {
        console.log(v.content);
        this.customers = v.content;
      },
      error: (e) => console.error(e),
      complete: () => console.info('pagina customers recuperata'),
    });
  }
  ngAfterViewChecked() {
    console.log('dopo caricamento');
  }

  creaCliente() {//da finire
    this.customersSrv.addCustomer;
  }

  forwardPage() {
    this.currentIndex++;
    console.log(this.currentIndex);
    this.customersSrv.getCustomers(this.currentIndex).subscribe({
      next: (v) => {
        console.log(v.content);
        this.customers = v.content;
      },
      error: (e) => console.error(e),
      complete: () => console.info('pagina fatture acquisita'),
    });
  }

  backPage() {

    this.currentIndex--;
    console.log(this.currentIndex);
    this.customersSrv.getCustomers(this.currentIndex).subscribe({
      next: (v) => {
        console.log(v.content);
        this.customers = v.content;
      },
      error: (e) => console.error(e),
      complete: () => console.info('pagina fatture acquisita'),
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

