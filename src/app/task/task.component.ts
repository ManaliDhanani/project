import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskService: TaskService = inject(TaskService);
  http: HttpClient = inject(HttpClient);
  res: any;
  allTasks: any;

  ngOnInit(){
    this.fetchAllTasks();
  }

  fetchAllTasks() {
    this.taskService.fetchAllTasks()
    .subscribe((tasks)=> {
      this.res = tasks;
      this.allTasks = this.res.data;
      console.log(this.allTasks);
    })
  }

  DeleteTask(id: string | undefined){
    this.taskService.DeleteTask(id);
  }

  DeleteAllTasks(){
    this.taskService.DeleteAllTasks();
  }

}
