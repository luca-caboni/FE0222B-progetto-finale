import { Component, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;


  @ViewChild(MatAccordion) accordion!: MatAccordion;

  user = localStorage.getItem('user');
  control!: boolean;

  constructor(private router:Router, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.control=this.authSrv.isLogged;
  }
}
