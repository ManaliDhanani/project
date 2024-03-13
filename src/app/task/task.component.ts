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
  allTasks: Task[] = [];

  ngOnInit(){
    this.fetchAllTasks();
  }

  fetchAllTasks() {
    this.taskService.fetchAllTasks()
    .subscribe((tasks)=> {
      this.allTasks = tasks;
    })
  }

  DeleteTask(id: string | undefined){
    this.taskService.DeleteTask(id);
  }

  DeleteAllTasks(){
    this.taskService.DeleteAllTasks();
  }

}
