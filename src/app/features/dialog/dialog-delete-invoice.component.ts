import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-invoice',
  template: `
    <h1 mat-dialog-title>Eliminazione fattura</h1>
    <div mat-dialog-content>
      Fattura eliminata con successo!
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close [routerLink]="['/invoices']">Torna a fatture</button>
    </div>
  `,
  styles: [
  ]
})

export class DialogDeleteInvoiceComponent implements OnInit {


  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogDeleteInvoiceComponent);
  }
}
