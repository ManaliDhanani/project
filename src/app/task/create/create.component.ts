import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute  } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Model/Task';

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
  @ViewChild('taskForm') taskForm: NgForm;

  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    public taskService: TaskService
  ){}

  CreateOrUpdateTask(form: NgForm){
    // if(!this.isEditMode){
      
      console.log("form.value",form.value);
      console.log(typeof form.value.tag);
      this.taskService.CreateTask(form.value); 
      
    
      // }
    // else{
    //   this.taskService.UpdateTask(this.selectedTask.id, form.value);
    // }
  }

  ngOnInit() {
    this.taskService.fetchAllTags().subscribe((res)=> {
      this.res = res;
      this.tags = this.res.data;
      console.log(this.tags);
      
    });
    
    // this.id = this.route.snapshot.paramMap.get('id');
    // if(this.route.snapshot.paramMap.get('id')){
    //   this.isEditMode = true;
    //   this.taskService.fetchAllTasks().subscribe((tasks)=> {
    //     for(let task of tasks){
    //       if(task.id == this.id){
    //         this.selectedTask = task;
    //         this.taskForm.form.patchValue(this.selectedTask);
    //       }
    //     }     
    //   })
    // }  
 }
 
}
