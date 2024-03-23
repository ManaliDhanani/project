import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../Model/Task";
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
let api = "api_url";

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    constructor(public router: Router, private http: HttpClient, public authService: AuthService){}

    CreateTask(task: Task): Observable<any>{
        return  this.http.post(`${api}/task/create`, task);
    }
 
    fetchAllTags(){
        return this.http.get(`${api}/tag/get`);
    }

    fetchAllTasks(){
        const currentUser = this.authService.user.value;
        return this.http.get(`${api}/task/get`);
    }

    fetchAllUsers(){
        return this.http.get(`${api}/user/get`);
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