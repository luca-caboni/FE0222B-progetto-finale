import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-delete-customer',
  template: `
    <h1 mat-dialog-title>Eliminazione cliente</h1>
    <div mat-dialog-content>
      Hai eliminato con successo il cliente!
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close [routerLink]="['/customers']">Torna a clienti</button>
    </div>
  `,
  styles: [
  ]
})

export class DialogDeleteCustomerComponent implements OnInit {


  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogDeleteCustomerComponent);
  }

}
