import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Task } from "../Model/Task";
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    constructor(public router: Router, private http: HttpClient, public authService: AuthService){}

    CreateTask(task: Task){
        
        // this.http.post<{name: string}>('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks.json',task)
        // // this.http.post<{name: string}>('http://192.168.1.61:3000/task/create',task)
        // .subscribe((response) => {
        //   console.log(response);
        //   this.router.navigate(['/task']);
        // })

        const currentUser = this.authService.user.value;
        
        if (!task.stackHolder) {
            task.stackHolder = [];
        }

        if (!task.tags) {
            task.tags = [];
        }
        
        if (!task.stackHolder || !task.stackHolder.every(num => Number.isInteger(num) && num > 0)) {
            console.error('Invalid stackHolder array');
            return; 
        }
        if (!task.tags || !task.tags.every(num => Number.isInteger(num) && num > 0)) {
            console.error('Invalid tags array');
            return;
        }
        
        task.stackHolder.push(currentUser.id);
        task.createdAt = new Date();

        // this.http.post('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks.json',task)
        this.http.post<{name: string}>('http://192.168.1.61:3000/task/create',task)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/task']);
        })
    }

    fetchAllTasks(){
        return this.http.get<{[key: string]: Task}>('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks.json')
        .pipe(map((response) => {
          let tasks = [];
          for(let key in response){
            tasks.push({...response[key],id: key})
          }
          return tasks;
        }))
    }

    DeleteTask(id: string | undefined){
        this.http.delete('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks/'+id+'.json')
        .subscribe(()=> {
          location.reload();
        })
    }

    DeleteAllTasks(){
        this.http.delete('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks.json')
        .subscribe(()=> {
            location.reload();
        })
    }

    UpdateTask(id: string | undefined, data: Task){
        this.http.put('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks/'+id+'.json', data)
        .subscribe(() => {
            this.router.navigate(['/task']);
        });
    }

}