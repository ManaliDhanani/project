import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  newTask:string = '';
  taskService: TaskService = inject(TaskService);
  
  onCreateTask(){
    console.log(this.newTask);
    this.taskService.onCreateTask(this.newTask);
  }
  
}
