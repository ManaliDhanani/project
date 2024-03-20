import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";

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
        task.stakeHolder.push(currentUser.id);
        
        const result = {
            name: task.name,
            description: task.description,
            createDate: task.createDate,
            stakeHolder: task.stakeHolder,
            tags: task.tag
        };

        this.http.post<{name: string}>(`/task/create`, result)
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/task']);
        })
    }
 
    fetchAllTags(){
        return this.http.get(`/tag/get`);
    }

    fetchAllTasks(){
        const currentUser = this.authService.user.value;
        console.log(currentUser.token);
        return this.http.get(`/task/get`,  {headers: {Authorization_token: currentUser.token}});
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