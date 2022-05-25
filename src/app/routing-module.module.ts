import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CustomerDetailsComponent } from './features/customer-details/customer-details.component';
import { CustomerNewComponent } from './features/customer-new/customer-new.component';
import { InvoicesComponent } from './features/invoices/invoices.component';
import { InvoiceUpdateComponent } from './features/invoice-update/invoice-update.component';
import { InvoiceNewComponent } from './features/invoice-new/invoice-new.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { LoginComponent } from './features/auth/login/login.component';
import { UsersComponent } from './features/users/users.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'sign-up',
    component:SignupComponent
  },
  {
    path:'utenti',
    component:UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'clienti',
    component:CustomersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'clienti/:id',
    component:CustomerNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'fattura-cliente/:id',
    component:CustomerDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'nuova-fattura/:id',
    component: InvoiceNewComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'modifica-fattura/:id',
    component: InvoiceUpdateComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'fatture',
    component:InvoicesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
