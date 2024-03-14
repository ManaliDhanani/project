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

  public id: string;
  isEditMode: boolean = false;
  selectedTask: Task;
  @ViewChild('taskForm') taskForm: NgForm;

  // taskService: TaskService = inject(TaskService);

  constructor(
    public router: Router, 
    public route: ActivatedRoute, 
    public taskService: TaskService
  ){}

  CreateOrUpdateTask(form: NgForm){
    if(!this.isEditMode){
      this.taskService.CreateTask(form.value);
    }
    else{
      this.taskService.UpdateTask(this.selectedTask.id, form.value);
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.route.snapshot.paramMap.get('id')){
      this.isEditMode = true;
      this.taskService.fetchAllTasks().subscribe((tasks)=> {
        for(let task of tasks){
          if(task.id == this.id){
            this.selectedTask = task;
            this.taskForm.form.patchValue(this.selectedTask);
          }
        }     
      })
    }  
 }
 
}