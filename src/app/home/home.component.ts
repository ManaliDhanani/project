import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username = '';
  emailAddress = '';
  pass = '';
  gender = '';
  checkboxValues = ['Reading', 'Singing', 'Dancing'];
  selectedValues = {};
  isAtLeastOneChecked = false;
  selectedCheckValues = [];
  formSubmitted = false;

  // @ViewChild('name') tempPara1: ElementRef;
  // @ViewChild('mail') tempPara2: ElementRef;
  // @ViewChild('gen') tempPara3: ElementRef;
  // @ViewChild('check') tempPara4: ElementRef;

  @ViewChild('registrationForm') form: NgForm;

  genders = [
    {id: 'male', value: 'male', display: 'Male'},
    {id: 'female', value: 'female', display: 'Female'},
    {id: 'other', value: 'other', display: 'Other'},
  ];

  onClickSubmit(form: NgForm) {
    console.log("form",form.value); 
    this.username = this.form.value.username; 
    this.emailAddress = this.form.value.email; 
    this.pass = this.form.value.password;
    this.gender = this.form.value.gender; 
    
    this.selectedCheckValues = Object.keys(this.selectedValues).filter(key => this.selectedValues[key]);

    // const formValue = this.form.value;
    this.formSubmitted = true; 
    // console.log(this.username, this.emailAddress, this.pass, this.gender, this.selectedCheckValues);
    

    this.form.reset();
 }

  updateButtonState(){
    this.isAtLeastOneChecked = Object.values(this.selectedValues).some(value => value);
    this.form.control.setValue({ ...this.selectedValues });
  }

  ngOnInit(){ }

}
