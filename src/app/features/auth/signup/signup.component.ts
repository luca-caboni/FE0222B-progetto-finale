import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  isLoading = false;
  isLoggedIn = false;
  user!: User;

  constructor(private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    this.authSrv.signup(form.value).subscribe({
      next: (v) => {
        console.log(v);
        this.router.navigate(['/login'])
      },
      error: (e) => console.log(e),
      complete: () => console.log('Registrazione avvenuta con successo')
    })
  }
}
