import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';
import { DialogModifyInvoiceComponent } from '../dialog/dialog-modify-invoice.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  form!: FormGroup;
  sub!: Subscription;
  invoiceId!: number;
  checkInv!: boolean;
  statiInv!: any;
  invoice!: Invoice;
  customerId!: number;


  constructor(private formBuilder: FormBuilder, private currentRoute: ActivatedRoute, private invoicesSrv: InvoicesService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      data: new FormControl('', [Validators.required]),
      numero: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      anno: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$'),
      ]),
      importo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9.]*$'),
      ]),
      stato: new FormControl('', [Validators.required]),
    });

    this.invoicesSrv.getStatiInvoice().subscribe((res) => {
      this.statiInv = res.content;
      console.log(this.statiInv);
    });

    this.invoiceId = 0;
    this.getInvoiceId();
    this.checkInvId(this.invoiceId);
    this.getCustomerId();
    this.fillForm();


  }

  submit(form: {
    value: {
      data: string;
      numero: number;
      anno: number;
      importo: number;
      stato: number;
    };
  }) {
    console.log(form.value);
    if (this.invoiceId == 0) {
      this.invoice = {
        id: 0,
        anno: 0,
        numero: 0,
        data: '',
        importo: 0,
        stato: { id: 0, nome: '' },
        cliente: {},
      };
    }
    this.invoice.id = this.invoiceId;
    this.invoice.data = form.value.data;
    this.invoice.numero = form.value.numero;
    this.invoice.anno = form.value.anno;
    this.invoice.importo = form.value.importo;
    this.invoice.stato.id = form.value.stato;
    if (this.customerId) { this.invoice.cliente.id = this.customerId }
    this.invoicesSrv.setInvoice(this.invoiceId, this.invoice).subscribe(res => {
      console.log(res)
      if (this.customerId) {this.openDialog(); this.router.navigate(['/customers/invoices', this.customerId]) } else {
        this.openDialog();
      }
    })
  }
  getInvoiceId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      this.invoiceId = +res['id'];
      console.log(res);
      console.log(this.invoiceId);
    });
    return this.invoiceId;
  }
  getCustomerId() {
    this.sub = this.currentRoute.params.subscribe(res => {
      this.customerId = +res['idCliente']
    })
  }
  checkInvId(id: number) {
    if (id != 0) {
      this.checkInv = true;
    } else {
      this.checkInv = false;
    }
  }
  restoreData(fatturaId: number) {
    this.invoicesSrv.getInvoicesById(fatturaId).subscribe(res => {
      console.log(res);
      this.invoice = res;
      this.form.patchValue({
        data: this.invoice.data,
        numero: this.invoice.numero,
        anno: this.invoice.anno,
        importo: this.invoice.importo,
        stato: this.invoice.stato.id
      })
    })
  }

  openDialog(): void {
    const dialogMod = this.dialog.open(DialogModifyInvoiceComponent, {
      width: '250px',
    });

    dialogMod.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  fillForm() {
    if (this.invoiceId != 0) {
      console.log(this.invoiceId)
      this.restoreData(this.invoiceId);
    }
  }
}
