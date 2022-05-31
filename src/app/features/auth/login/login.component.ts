import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataAuth } from 'src/app/models/data-auth';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 form!:FormGroup;
 user!:DataAuth;
 hide: boolean = false;
  constructor(private authSrv:AuthService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      username: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*'),]),
      password: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*'),]),
    })
  }
  submit(form:any){
console.log(form);
this.authSrv.login(form).subscribe((res)=>{
  console.log(res);
  this.user=res;
  console.log(this.user);
  localStorage.setItem('current-user',JSON.stringify(this.user))
  this.router.navigate(['/'])
})
  }
 getFormControl(htmlElement:string){
return this.form.get(htmlElement) as AbstractControl
 }

}
