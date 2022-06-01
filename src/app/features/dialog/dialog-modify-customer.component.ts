import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-modify-customer',
  template: `
    <h1 mat-dialog-title>Modifica fattura</h1>
    <div mat-dialog-content>
      Hai inserito o aggiornato con successo la fattura!
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close [routerLink]="['/customers']">Torna a fatture</button>
    </div>
  `,
  styles: [
  ]
})

export class DialogModifyCustomerComponent implements OnInit {


  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogModifyCustomerComponent);
  }

}
