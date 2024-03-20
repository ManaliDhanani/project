import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  isEditMode: boolean = false;
  public id: string;
  selectedTask: Task;
  public res: any;
  public tags: any;
  public tagId: Array<number> = [];
  dropdownSettings:IDropdownSettings = {};
  data: any = [];
  selectedTags: any[] = [];

  @ViewChild('taskForm') taskForm: NgForm;

  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    public taskService: TaskService
  ){}

  CreateTask(form: NgForm){
    // if(!this.isEditMode){

      let id: Array<number> = [];
      console.log("form.value",form.value);
      for(let tag of form.value.tag){
        id.push(tag.id);
      }
  
      let value = {
        name: form.value.name,
        description: form.value.description,
        createDate: form.value.createDate,
        tag: id
      };

      this.taskService.CreateTask(value); 
      
    
      // }
    // else{
    //   this.taskService.UpdateTask(this.selectedTask.id, form.value);
    // }
  }

  ngOnInit() {

    this.taskService.fetchAllTags().subscribe((res)=> {
      this.res = res;
      this.tags = this.res.data; 
    });

    this.dropdownSettings = {
      idField: 'id',
      textField: 'tag'
    }
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.paramMap.get('id')){
      this.isEditMode = true;
      this.taskService.fetchAllTasks().subscribe((tasks)=> {
        this.data = tasks;
        for(let task of this.data.data){
          if(task.id == this.id){
            this.selectedTask = task;
            this.selectedTask.tags = this.selectedTask.tags.map(tag => parseInt(tag));
            this.selectedTags = this.tags.filter(tag => this.selectedTask.tags.includes(tag.id));
            console.log(this.tags.filter(tag => this.selectedTask.tags.includes(tag.id)));
            this.taskForm.form.patchValue(this.selectedTask);
          }
        }     
      })
    }  
 }
 
}
