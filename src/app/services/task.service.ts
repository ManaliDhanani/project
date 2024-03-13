import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Task } from "../Model/Task";
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    http: HttpClient = inject(HttpClient);

    constructor(public router: Router){}

    CreateTask(task: Task){
        this.http.post<{name: string}>('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks.json',task)
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