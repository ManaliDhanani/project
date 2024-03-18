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

  hideNavbar = true;
  authService: AuthService = inject(AuthService);
  isLoginMode: Boolean = true;
  errorMessage: string | null = null;

  constructor(public router: Router){}


  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  OnFormSubmitted(form: NgForm){
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){
      this.authService.login(email, password).subscribe({
        next: (res) => { 
          console.log("response",res);
          
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
      this.authService.signup(email, password, username).subscribe({
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
    });
    }
    form.reset();
  }

}
