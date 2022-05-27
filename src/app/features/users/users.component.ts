import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/users.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users!: User[];
  page: number = 0;
  currentIndex: number = this.page;
  displayedColumns = ['id', 'nomeCognome', 'username', 'email', 'roles.roleName'];

  date = new Date(); //gestione data in fondo alla pagina
  hour = `${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`;
  day = `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`;

  constructor(private userSrv: UserService) {

  }

  ngOnInit(): void {
    this.page;
    this.userSrv.getUsers(this.page).subscribe({
      next: (v) => {
        console.log(v.content);
        this.users = v.content;
      },
      error: (e) => console.error(e),
      complete: () => console.info('pagina utenti acquisita'),
    });
  }

  ngAfterViewChecked() {
    console.log('finito caricamento');
  }

  forwardPage() {
    this.currentIndex++;
    console.log(this.currentIndex);
    this.userSrv.getUsers(this.currentIndex).subscribe({
      next: (v) => {
        console.log(v.content);
        this.users = v.content;
      },
      error: (e) => console.error(e),
      complete: () => console.info('pagina fatture acquisita'),
    });
  }

  backPage() {
    this.currentIndex--;
    console.log(this.currentIndex);
    this.userSrv.getUsers(this.currentIndex).subscribe({
      next: (v) => {
        console.log(v.content);
        this.users = v.content;
      },
      error: (e) => console.error(e),
      complete: () => console.info('pagina fatture acquisita'),
    });
  }
}
