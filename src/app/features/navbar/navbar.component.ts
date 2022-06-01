import { Component, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { DataAuth } from 'src/app/models/data-auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  checkLogin$!: Observable<boolean>
  checkUser$!: Observable<DataAuth | null>


  constructor(private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.checkLogin$ = this.authSrv.loginControl$
  }

  logout() {
    localStorage.clear();
    this.authSrv.loginStatus.next(false)
    this.authSrv.loginControl$.subscribe()
    this.router.navigate(['/login'])
  }

  isLoggedIn() {
    return this.authSrv.isLoggedIn;
  }

}
