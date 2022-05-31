import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';


@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewChecked() {
    console.log('finito caricamento');
  }
}
