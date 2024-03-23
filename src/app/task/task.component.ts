import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    });

    this.taskService.fetchAllUsers().subscribe((res) => {
      this.allUsers = res;
      this.allUsers = this.allUsers.data;
    })

    this.taskService.fetchAllTasks()
    .subscribe((tasks)=> {

      this.res = tasks;
      this.allTasks = this.res.data; 

      for(let task of this.allTasks){
        task.tags = task.tags.map(tag => parseInt(tag));
        task.tags = this.allTags.filter(tag => task.tags.includes(tag.id));
        task.stakeHolder = task.stakeHolder.map(uid => parseInt(uid));
        task.stakeHolder = this.allUsers.filter(user => task.stakeHolder.includes(user.id));
      }
      this.allTasks.reverse();
    }) 
    
  }

  displayTags(tags){
    return tags.map(tag => tag.tag).join(', ');
  }

  displayStakeholders(stakeHolders){
    return stakeHolders.map(stakeHolder => stakeHolder.name).join(', ');
  }



  // DeleteTask(id: string | undefined){
  //   this.taskService.DeleteTask(id);
  // }

  // DeleteAllTasks(){
  //   this.taskService.DeleteAllTasks();
  // }

}
