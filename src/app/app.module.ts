import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthInterceptor} from './features/auth/auth.interceptor'
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { CustomerDetailsComponent } from './features/customer-details/customer-details.component'
import { CustomerNewComponent } from './features/customer-new/customer-new.component';
import { CustomersComponent } from './features/customers/customers.component'
import { HomeComponent } from './features/home/home.component';
import {InvoiceNewComponent } from './features/invoice-new/invoice-new.component';
import { InvoiceDetailsComponent } from './features/invoice-details/invoice-details.component';
import { InvoicesComponent } from './features/invoices/invoices.component';
import { UsersComponent } from './features/users/users.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './routing-module.module';
import { DialogDeleteInvoiceComponent } from './features/dialog/dialog-delete-invoice.component'
import { DialogModifyInvoiceComponent } from './features/dialog/dialog-modify-invoice.component'
import { DialogModifyCustomerComponent } from 'src/app/features/dialog/dialog-modify-customer.component';
import { DialogDeleteCustomerComponent } from 'src/app/features/dialog/dialog-delete-customer.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CustomerDetailsComponent,
    CustomerNewComponent,
    CustomersComponent,
    HomeComponent,
    InvoiceNewComponent,
    InvoiceDetailsComponent,
    InvoicesComponent,
    NavbarComponent,
    DialogDeleteInvoiceComponent,
    DialogModifyInvoiceComponent,
    DialogModifyCustomerComponent,
    DialogDeleteCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
