import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { Comune } from 'src/app/models/city';
import { Provincia } from 'src/app/models/province';
import { CustomersService } from 'src/app/services/customers.service';
import { ComuniService } from 'src/app/services/comuni.service';
import { ProvinceService } from 'src/app/services/province.service';
import { DialogModifyCustomerComponent } from '../dialog/dialog-modify-customer.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})

export class CustomerDetailsComponent implements OnInit {

  form!: FormGroup;
  comuni!: Comune[];
  province!: Provincia[];
  customerType!: any;
  customerId!: number;
  customer!: Customer;
  sub!: Subscription;
  check!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private customersSrv: CustomersService,
    private comuniSrv: ComuniService,
    private provinceSrv: ProvinceService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nomeContatto: new FormControl(''), //
      cognomeContatto: new FormControl(''), //
      telefonoContatto: new FormControl(''), //
      telefono: new FormControl(''), //
      pec: new FormControl(''), //
      tipoCliente: new FormControl('', [Validators.required]), //
      emailContatto: new FormControl('', [Validators.required]), //
      email: new FormControl('', [Validators.required]), //
      partitaIva: new FormControl('', [Validators.required]), //
      ragioneSociale: new FormControl('', [Validators.required]), //
      indirizzoSedeOperativa: this.formBuilder.group({
        via: new FormControl(''), //
        cap: new FormControl(''), //
        civico: new FormControl(''), //
        localita: new FormControl(''), //
        comune: this.formBuilder.group({
          id: new FormControl('', Validators.required), //
          nome: '',
          provincia: {},
        }),
      }),
    });

    //Fetch Comuni/Province
    this.comuniSrv.getComuni().subscribe((res) => {
      this.comuni = res.content;
    });

    this.provinceSrv.getProvince().subscribe((res) => {
      this.province = res.content;
    });

    //Customer type definition
    this.customersSrv.getCustomerType().subscribe((res) => {
      this.customerType = res;
    });
    this.customerId = 0;

    this.getCustomerId();
    this.checkId(this.customerId)
    this.fillForm();
  }


  getCustomerId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      this.customerId = +res['id'];
      console.log('Id del cliente ' + this.customerId);
    });
    return this.customerId;
  }

  submit(form: { value: { indirizzoSedeOperativa: { comune: Comune } } }) {
    console.log(form.value)

    this.comuni.forEach(comune => {
      if (comune.id == form.value.indirizzoSedeOperativa.comune.id) {
        form.value.indirizzoSedeOperativa.comune = comune;
      }
    })
    console.log(form.value)
    this.customersSrv.setCustomer(form.value, this.customerId).subscribe(res => {
      console.log(res)
    })
    console.log(this.form.value);
    this.form.reset;
    this.router.navigate(['/invoices'])
  }

  restoreData(customerId: number) {
    this.customersSrv.getCustomerById(customerId).subscribe((res) => {
      console.log(res);
      this.customer = res;
      this.form.patchValue({
        nomeContatto: this.customer.nomeContatto,
        cognomeContatto: this.customer.cognomeContatto,
        telefonoContatto: this.customer.telefonoContatto,
        telefono: this.customer.telefono,
        pec: this.customer.pec,

        tipoCliente: this.customer.tipoCliente,
        emailContatto: this.customer.emailContatto,
        email: this.customer.email,
        partitaIva: this.customer.partitaIva,
        ragioneSociale: this.customer.ragioneSociale,

        indirizzoSedeOperativa: {
          via: this.customer.indirizzoSedeOperativa.via,
          cap: this.customer.indirizzoSedeOperativa.cap,
          civico: this.customer.indirizzoSedeOperativa.civico,
          localita: this.customer.indirizzoSedeOperativa.localita,
        },
      })
    })
  }

  fillForm() {
    if (this.customerId != 0) {
      this.restoreData(this.getCustomerId());
      this.setComune();
    }
  }

  setComune() {
    this.comuniSrv.getComuni().subscribe(res => {
      this.comuni = res.content;
      this.comuni.forEach(comune => {
        if (comune.id == this.customer.indirizzoSedeOperativa.comune.id) {
          console.log(comune.id, this.customer.indirizzoSedeOperativa.comune.id)
          this.form.value.indirizzoSedeOperativa.comune = comune;
        }
      })
    })
  }

  checkId(id: number) {
    if (id != 0) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
  openDialog(): void {
    const dialogModCust = this.dialog.open(DialogModifyCustomerComponent, {
      width: '250px',
    });

    dialogModCust.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
