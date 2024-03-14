import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // don't show navbar in login page in angular and i have defind my routes in app.module.ts file 
  hideNavbar = true;
  authService: AuthService = inject(AuthService);
  isLoginMode: Boolean = true;
  errorMessage: string | null = null;

  router: Router = inject(Router);

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  OnFormSubmitted(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){
      this.authService.login(email, password).subscribe({
        next: (res) => { 
          console.log(res);
          this.router.navigate(['/home']);
        },
        error: (errMsg) => { 
          console.log(errMsg);
          this.errorMessage = errMsg;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000); 
        }
      })
    }
    else{
      this.authService.signup(email, password).subscribe({
        next: (res) => { 
          console.log(res);
          // this.isLoginMode = true;
          this.router.navigate(['/home']);
        },
        error: (errMsg) => { 
          console.log(errMsg);
          this.errorMessage = errMsg;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000); 
        }
      });
    }
    form.reset();
  }

}
