import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    public router: Router, 
    public authService: AuthService,
    public snackBar: MatSnackBar,
    ){}

  // openSnackBar(message: string, action: string){
  //   this.snackBar.open(message, action);
  // }

  ngOnInit(){
    
    this.authForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
    this.validateUsername();
    
  }
 
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
    this.validateUsername(); 
  }

  validateUsername() {
    let usernameControl = this.authForm.get('username');
    if (!this.isLoginMode) {
      usernameControl.setValidators([Validators.required]);
    } else {
      usernameControl.clearValidators();
    }
    usernameControl.updateValueAndValidity();
  }

  OnFormSubmitted(){
    const {username, email, password} = this.authForm.value;
    console.log("username",username);
    console.log("email",email);
    console.log("password",password);
    

    if(this.isLoginMode){
      if(email == null){
        this.errorMessage = "*Email is required";
        this.snackBar.open(this.errorMessage);
        setTimeout(() => {
          this.errorMessage = null;
      }, 3000); 
        return;
      }
      if(password == null){
        this.errorMessage = "*Password is required";
        setTimeout(() => {
          this.errorMessage = null;
      }, 3000); 
      }
      else{
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
        this.authForm.reset();
      }
    }
    else{
      if(username == null){
        this.errorMessage = "*Username is required";
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000); 
        return;
      }
      if(email == null){
        this.errorMessage = "*Email is required";
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000); 
        return;
      }
      if(password == null){
        this.errorMessage = "*Password is required";
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000); 
      }
      if(password.length < 6){
        this.errorMessage = "*Password should be at least of 6 characters";
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000); 
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
        this.authForm.reset();
      }
    }
    
  }
}
