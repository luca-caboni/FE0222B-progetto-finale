import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';



@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  usernameVal = new FormControl('', [Validators.required]);
  passwordVal = new FormControl('', [Validators.required]);
  form = new FormGroup ({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {}

  onLogin(form: any) {
    console.log(form.value);
    this.authSrv.login(form.value);
    this.router.navigate([''])
  }
}
