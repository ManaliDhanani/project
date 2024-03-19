import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Task } from "../Model/Task";
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from "./auth.service";
const API_URL = "/api";

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    constructor(public router: Router, private http: HttpClient, public authService: AuthService){}

    CreateTask(task: Task){

        const currentUser = this.authService.user.value;
        
        if (!task.stakeHolder) {
            task.stakeHolder = [];
        }

        // if (!task.tags) {
        //     task.tags = [];
        // }
        
        task.stakeHolder.push(currentUser.id);
        // task.tags = task.tag.map((value) => parseInt(value));
        
        const result = {
            name: task.name,
            description: task.description,
            createDate: task.createDate,
            stakeHolder: task.stakeHolder,
            tags: task.tag
        };

        // this.http.post<{name: string}>(`${API_URL}/task/create`, result)
        this.http.post<{name: string}>('http://192.168.1.61:3000/task/create', result)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/task']);
        })
    }

    fetchAllTags(){
        return this.http.get('http://192.168.1.61:3000/tag/get');
    }

    fetchAllTasks(){
        return this.http.get('http://192.168.1.61:3000/task/get');
    }


    // DeleteTask(id: string | undefined){
    //     this.http.delete('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks/'+id+'.json')
    //     .subscribe(()=> {
    //       location.reload();
    //     })
    // }

    // DeleteAllTasks(){
    //     this.http.delete('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks.json')
    //     .subscribe(()=> {
    //         location.reload();
    //     })
    // }

    // UpdateTask(id: string | undefined, data: Task){
    //     this.http.put('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/tasks/'+id+'.json', data)
    //     .subscribe(() => {
    //         this.router.navigate(['/task']);
    //     });
    // }

}