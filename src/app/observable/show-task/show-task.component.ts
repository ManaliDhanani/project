import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {
  tasks:string[] = [];

  taskService: TaskService = inject(TaskService);

  ngOnInit() {
    this.taskService.createTask.subscribe((value) => {
      this.tasks.push(value);
    })
  }
}
