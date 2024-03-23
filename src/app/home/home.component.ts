import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userName: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const currentUser = this.authService.user.value;
    this.userName = currentUser ? currentUser.name : '';
  }

  
  // username = '';
  // emailAddress = '';
  // pass = '';
  // gender = '';
  // checkboxValues = ['Reading', 'Singing', 'Dancing'];
  // selectedValues = {};
  // isAtLeastOneChecked = false;
  // selectedCheckValues = [];
  // formSubmitted = false;


//   @ViewChild('registrationForm') form: NgForm;

//   genders = [
//     {id: 'male', value: 'male', display: 'Male'},
//     {id: 'female', value: 'female', display: 'Female'},
//     {id: 'other', value: 'other', display: 'Other'},
//   ];

//   onClickSubmit(form: NgForm) {
//     console.log("form",form.value); 
//     this.username = this.form.value.username; 
//     this.emailAddress = this.form.value.email; 
//     this.pass = this.form.value.password;
//     this.gender = this.form.value.gender; 
    
//     this.selectedCheckValues = Object.keys(this.selectedValues).filter(key => this.selectedValues[key]);

//     // const formValue = this.form.value;
//     this.formSubmitted = true; 
//     // console.log(this.username, this.emailAddress, this.pass, this.gender, this.selectedCheckValues);
    

//     this.form.reset();
//  }

//   updateButtonState(){
//     this.isAtLeastOneChecked = Object.values(this.selectedValues).some(value => value);
//     this.form.control.setValue({ ...this.selectedValues });
//   }

}
