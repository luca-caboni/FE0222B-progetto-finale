import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogDeleteInvoiceComponent } from '../dialog/dialog-delete-invoice.component';
import { DialogModifyInvoiceComponent } from '../dialog/dialog-modify-invoice.component';
import { Invoice } from '../../models/invoice';
import { CustomersService } from '../../services/customers.service'
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'dettagli-cliente',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {

  customerId!: number;
  invoices!: Invoice[];
  page: number = 0;
  currentIndex: number = this.page;
  displayedColumns = ['id', 'cliente.ragioneSociale', 'importo', 'stato.nome'];


  data = new Date();
  ora = `${this.data.getHours()}:${this.data.getMinutes()}:${this.data.getSeconds()}`;
  giorno = `${this.data.getDate()}/${this.data.getMonth()}/${this.data.getFullYear()}`;

  constructor(
    public invoicesSrv: InvoicesService,
    private customersSrv: CustomersService,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe({
      next: (v) => {
        console.log(v['id']);
        this.customerId = v['id'];
      },
      error: (e) => console.error(e),
      complete: () => console.info('id fattura acquisita'),
    });
  }

  ngAfterViewChecked() {
    console.log('dopo caricamento');
  }

  avanzaPagina() {
    //pagina successiva di fatture
    this.currentIndex++;
    console.log(this.currentIndex);
    this.invoicesSrv.getInvoiceByCustomer(this.customerId, this.currentIndex).subscribe({
      next: (v) => {
        console.log(v.content);
        this.invoices = v.content;
      },
      error: (e) => console.error(e),
      complete: () => console.info('pagina fatture acquisita'),
    });
  }

  indietroPagina() {
    //pagina precedente di fatture
    this.currentIndex--;
    console.log(this.currentIndex);
    this.invoicesSrv.getInvoiceByCustomer(this.customerId, this.currentIndex).subscribe({
      next: (v) => {
        console.log(v.content);
        this.invoices = v.content;
      },
      error: (e) => console.error(e),
      complete: () => console.info('pagina fatture acquisita'),
    });
  }

  onModificaStato(event: any, invoice: Invoice) {
    //modifica dello stato o eliminazione della fattura tramite switch
    console.log(event);
    switch (event) {
      case '1': {
        console.log(event.value + ' Stato non pagata, in attesa di modifiche');
        let newStatus = {
          id: 1,
          nome: 'NON PAGATA',
        };
        invoice.status = newStatus;
        this.invoicesSrv.modifyStatus(invoice).subscribe((res) => {
          //forse si può passare statofattura
          this.dialog.open(DialogModifyInvoiceComponent);
        });
        break;
      }
      case '2': {
        console.log(event.value + ' Stato pagata, in attesa di modifiche');
        let newStatus = {
          id: 2,
          nome: 'PAGATA',
        };
        invoice.status = newStatus;
        this.invoicesSrv.modifyStatus(invoice).subscribe((res) => {
          this.dialog.open(DialogModifyInvoiceComponent);
        });
        break;
      }
      case '3': {
        console.log(event.value + ' Stato eliminata, in attesa di modifiche');
        this.invoicesSrv.deleteInvoice(invoice.id).subscribe((res) => {
          this.dialog.open(DialogDeleteInvoiceComponent);
        });
        break;
      }
    }
  }

  mostraFatture(customerId: number) {
    this.invoicesSrv.getInvoiceByCustomer(this.customerId, this.page).subscribe({
      next: (v) => {
        console.log(v.content);
        this.invoices = v.content;
      },
      error: (e) => {
        console.error('errore nella stampa dettagli cliente');
        console.error(e);
      },
      complete: () => console.info('stampa fatture singolo cliente completata'),
    });
  }


  deleteAll() {
    //cancellazione cliente e fatture associate
    this.customersSrv.deleteInvoicesCustomer(this.customerId).subscribe({
      next: (v) => {
        console.log('cancellazione cliente');
        console.log(v);
      },
      error: (e) => {
        console.error('errore nella cancellazione');
        console.error(e);
      },
      complete: () => console.info('cancellazione cliente completata'),
    });
    this.invoicesSrv.deleteInvoice(this.customerId).subscribe({
      next: (v) => {
        console.log("cancellazione fatture")
        console.log(v);
      },
      error: (e) => console.error("errore nella cancellazione" + e),
      complete: () => console.info('cancellazione fatture completata'),
    });
    setTimeout(() => {
      this.route.navigate(['/customers']);
    }, 1000);
  }
}
