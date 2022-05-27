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
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoices/add',
    component: InvoiceNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoices/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/add',
    component: CustomerNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
