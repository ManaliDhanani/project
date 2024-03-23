import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router,ActivatedRoute  } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Model/Task';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    public taskService: TaskService
  ){}

  taskForm: FormGroup;
  formdata:any = {};
  isEditMode: boolean = false;
  data: any = [];
  public id: string;
  selectedTask: Task;
  public res: any;
  public tags: any;
  public tagId: Array<number> = [];
  dropdownSettings:IDropdownSettings = {};
  stakeHolderSettings: IDropdownSettings = {};
  public userRes: any;
  public users: any;

  CreateTask(){

    this.formdata = this.taskForm.value;

    const tagId: Array<number> = [];
    const stakeHolderId: Array<number>=[];
    
    
    for(let tag of this.formdata.tags){
      console.log("tag",tag);
      
      tagId.push(tag.id);
    }

    for(let val of this.formdata.stakeHolder){
      stakeHolderId.push(val.id);
    }
 
    let value = {
      name: this.formdata.name,
      description: this.formdata.description,
      createDate: this.formdata.createDate,
      tags: tagId,
      stakeHolder: stakeHolderId
    };

    this.taskService.CreateTask(value); 
      
  }

  ngOnInit() {

    this.taskForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      createDate: new FormControl(null, Validators.required),
      tags: new FormControl(null, Validators.required),
      stakeHolder: new FormControl(null, Validators.required),
    });

    this.taskService.fetchAllTags().subscribe((res)=> {
      this.res = res;
      this.tags = this.res.data; 
    });

    this.taskService.fetchAllUsers().subscribe((res) => {
      this.userRes = res;
      this.users = this.userRes.data;
    })

    this.dropdownSettings = {
      idField: 'id',
      textField: 'tag'
    }

    this.stakeHolderSettings = {
      idField: 'id',
      textField: 'name'
    }
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.isEditMode = true;
      this.taskService.fetchAllTasks().subscribe((tasks)=> {
        this.data = tasks;
        for(let task of this.data.data){
          if(task.id == this.id){
            this.selectedTask = task;
            this.selectedTask.tags = this.selectedTask.tags.map(tag => parseInt(tag));
            this.selectedTask.stakeHolder = this.selectedTask.stakeHolder.map(stakeId => parseInt(stakeId))
            this.selectedTask.tags = this.tags.filter(tag => this.selectedTask.tags.includes(tag.id));
            this.selectedTask.stakeHolder = this.users.filter(user => this.selectedTask.stakeHolder.includes(user.id));
            this.taskForm.patchValue(this.selectedTask);
          }
        }     
      })
    }  
 }

 

 

  // isEditMode: boolean = false;
  // public id: string;
  // selectedTask: Task;
  // public res: any;
  // public tags: any;
  // public tagId: Array<number> = [];
  // dropdownSettings:IDropdownSettings = {};
  // stakeHolderSettings: IDropdownSettings = {};
  // data: any = [];
  // selectedTags: any[] = [];
  // public userRes: any;
  // public users: any;
  // selectedStakeHolders: any[] = [];

  // @ViewChild('taskForm') taskForm: NgForm;

//   constructor(
//     public router: Router, 
//     public route: ActivatedRoute, 
//     public taskService: TaskService
//   ){}

//   CreateTask(form: NgForm){
//     // if(!this.isEditMode){

//       const id: Array<number> = [];
//       const stakeHolderId: Array<number>=[];

//       console.log("form.value",form.value);
//       for(let tag of form.value.tag){
//         id.push(tag.id);
//       }

//       for(let val of form.value.stakeHolder){
//         stakeHolderId.push(val.id);
//       }
      
  
//       let value = {
//         name: form.value.name,
//         description: form.value.description,
//         createDate: form.value.createDate,
//         tags: id,
//         stakeHolder: stakeHolderId
//       };

//       console.log(value);

//       this.taskService.CreateTask(value); 
      
    
//       // }
//     // else{
//     //   this.taskService.UpdateTask(this.selectedTask.id, form.value);
//     // }
//   }

//   ngOnInit() {

//     this.taskService.fetchAllTags().subscribe((res)=> {
//       this.res = res;
//       this.tags = this.res.data; 
//     });

//     this.taskService.fetchAllUsers().subscribe((res) => {
//       console.log("users:",res);
//       this.userRes = res;
//       this.users = this.userRes.data;
//     })

//     this.dropdownSettings = {
//       idField: 'id',
//       textField: 'tag'
//     }

//     this.stakeHolderSettings = {
//       idField: 'id',
//       textField: 'name'
//     }
    
//     this.id = this.route.snapshot.paramMap.get('id');
//     if(this.id){
//       this.isEditMode = true;
//       this.taskService.fetchAllTasks().subscribe((tasks)=> {
//         this.data = tasks;
//         for(let task of this.data.data){
//           if(task.id == this.id){
//             this.selectedTask = task;
//             console.log("this.selectedTask",this.selectedTask);
            
//             this.selectedTask.tags = this.selectedTask.tags.map(tag => parseInt(tag));
//             this.selectedTags = this.tags.filter(tag => this.selectedTask.tags.includes(tag.id));

//             this.selectedTask.stakeHolder = this.selectedTask.stakeHolder.map(stakeId => parseInt(stakeId))
//             console.log("this.selectedTask.stakeHolder",this.selectedTask.stakeHolder);
//             this.selectedStakeHolders = this.users.filter(user => this.selectedTask.stakeHolder.includes(user.id));
//             console.log("this.selectedStakeHolders",this.selectedStakeHolders);
//             this.taskForm.form.patchValue(this.selectedTask);
//           }
//         }     
//       })
//     }  
//  }
 
}
