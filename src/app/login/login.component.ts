import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authForm: FormGroup;
  formdata:any = {};
  hideNavbar = true;
  isLoginMode: Boolean = true;
  errorMessage: string | null = null;

  constructor(public router: Router, public authService: AuthService){}
  ngOnInit(){
    this.authForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
    this.updateUsernameValidator();
    
  }
 
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
    this.updateUsernameValidator(); 
  }

  updateUsernameValidator() {
    const usernameControl = this.authForm.get('username');
    if (!this.isLoginMode) {
      usernameControl.setValidators([Validators.required]);
    } else {
      usernameControl.clearValidators();
    }
    usernameControl.updateValueAndValidity();
  }

  OnFormSubmitted(){

    this.formdata = this.authForm.value;
    
    const username = this.formdata.username;
    const email = this.formdata.email;
    const password = this.formdata.password;

    if(this.isLoginMode){
      this.authService.login(email, password).subscribe({
        next: (res) => { 
          console.log("response",res);
          this.router.navigate(['/task']);
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
            this.isLoginMode = true;
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
    this.authForm.reset();
  }
}
