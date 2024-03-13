import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  reactiveForm: FormGroup;
  checkboxSelected: boolean = false;
  formStatus: string = '';
  formSubmitted = false;
  formdata:any = {};
  // hobby: FormArray;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      username: new FormControl(null, Validators.required, CustomValidators.checkUserName),
      email: new FormControl(null, [Validators.required, Validators.email, CustomValidators.noSpaceAllowed]),
      password: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      gender: new FormControl('male', Validators.required),
      hobbies: new FormArray([]),
      skills: new FormArray([new FormControl(null, Validators.required),]),
    })

    this.reactiveForm.statusChanges.subscribe((status) => {
      this.formStatus = status;
    })
  }

  onHobbyChange(e) {
    const hobby = this.reactiveForm.get('hobbies') as FormArray;

    if (e.target.checked) {
      hobby.push(new FormControl(e.target.value));
      // console.log(hobbies.value);
    } else {
      var index = hobby.controls.findIndex(ind => ind.value === e.target.value);
      hobby.removeAt(index);
      // console.log(hobbies.value);
    }
    this.checkboxSelected = hobby.length > 0;
  }

  addSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }

  deleteSkill(index){
    var controls = <FormArray>this.reactiveForm.get('skills');
    
    if(controls.value.length > 1){
      controls.removeAt(index);
    }
    
  }

  OnFormSubmitted(){
    this.formdata = this.reactiveForm.value;
    this.formSubmitted = true; 
    this.reactiveForm.reset();
    this.checkboxSelected = false;
    const hobbiesArray = this.reactiveForm.get('hobbies') as FormArray;
    hobbiesArray.clear();
    
  }

}
