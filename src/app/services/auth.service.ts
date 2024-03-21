import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "../Model/User";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        public http: HttpClient,
        public router: Router,
    ){}
    // token: any;
    user = new BehaviorSubject<User>(null);
    httpOptions = {};
    data:any = {};

    signup(email, password, username){
        const data= { email: email, password: password, name: username, returnSecureToken: true };
        return this.http.post<AuthResponse>(
            '/user/register', data
        )
        .pipe(catchError(this.handleError), tap((res) => {
            this.handleCreateUser(res);
        }))
    }

    login(email, password){
        const data= { email: email, password: password, returnSecureToken: true };
        return this.http.post<AuthResponse>(
            '/user/login', data
        )
        .pipe(catchError(this.handleError), tap((res) => {
            this.handleCreateUser(res);
            this.data = res;
            if (this.data.token) {
                const headers = new HttpHeaders({
                  'Authorization_token': this.data.token
                });
                this.http.post('/user/login', data, { headers: headers }).subscribe();
            }
        }))
    }

    autoLogin(){
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            return;
        }
        const loggedUser = new User(user.email, user.id, user._token, user.name);
        if(loggedUser.token){
            this.user.next(loggedUser);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('user');
    }


    private handleCreateUser(res){
        
        const user = new User(res.data.email , res.data.id, res.token, res.data.name);
        this.user.next(user);
        localStorage.setItem('user',JSON.stringify(user));
        // this.token = res.token;
    }

    private handleError(err){
        console.log(err.error);
        
        let errorMessage = 'An unknown error has occurred';
    
        if(!err.error || !err.error.message){
            return throwError(() => errorMessage);
        }
        return throwError(() => err.error.message);
    }
}

