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

  res: any;
  allTasks: any;
  allTags: any;
  allUsers: any;
  stakeHolder: any;

  constructor(public taskService: TaskService, public http: HttpClient){}

  ngOnInit(){

    this.taskService.fetchAllTags().subscribe((res)=> {
      this.allTags = res;
      this.allTags = this.allTags.data; 
      console.log("this.allTags",this.allTags);
    });

    this.taskService.fetchAllUsers().subscribe((res) => {
      this.allUsers = res;
      this.allUsers = this.allUsers.data;
      console.log("this.allUsers",this.allUsers);
    })

    this.taskService.fetchAllTasks()
    .subscribe((tasks)=> {
      this.res = tasks;
      this.allTasks = this.res.data; 

      for(let i of this.allTasks){
        i.tags = i.tags.map(tag => parseInt(tag));
        i.stakeHolder = i.stakeHolder.map(uid => parseInt(uid));
      }
     
      for(let task of this.allTasks){
        task.tags = this.allTags.filter(tag => task.tags.includes(tag.id));
        task.stakeHolder = this.allUsers.filter(user => task.stakeHolder.includes(user.id));
      }
      console.log("All Tasks:",this.allTasks);

    })

    
    
  }

  // fetchAllTasks() {
    
  // }

  // DeleteTask(id: string | undefined){
  //   this.taskService.DeleteTask(id);
  // }

  // DeleteAllTasks(){
  //   this.taskService.DeleteAllTasks();
  // }

}
