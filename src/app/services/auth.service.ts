import { HttpClient } from "@angular/common/http";
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
    user = new BehaviorSubject<User>(null);

    signup(email, password, username){
        const data= { email: email, password: password, name: username, returnSecureToken: true };
        return this.http.post<AuthResponse>(
            // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvaS5zz8c4iSP8YS6BiXbWUMYsFuYwqmY', data
            'http://192.168.1.61:3000/user/register', data
        )
        .pipe(catchError(this.handleError), tap((res) => {
            this.handleCreateUser(res);
        }))
    }

    login(email, password){
        const data= { email: email, password: password, returnSecureToken: true };
        return this.http.post<AuthResponse>(
            // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvaS5zz8c4iSP8YS6BiXbWUMYsFuYwqmY', data
            'http://192.168.1.61:3000/user/login', data
        )
        .pipe(catchError(this.handleError), tap((res) => {
            this.handleCreateUser(res);
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
        // console.log('res.expiresIn',res.expiresIn);
        // console.log('res.expiresIn * 1000',res.expiresIn * 1000);
        // console.log('new Date().getTime()',new Date().getTime());
        // console.log(new Date(new Date().getTime()));
        
        // const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
        // const expiresIn = new Date(expiresInTs);
        
        // const user = new User(res.email, res.localId, res.idToken, expiresIn, res.name);
        
        const user = new User(res.data.email , res.data.id, res.token, res.data.name);
        this.user.next(user);
        localStorage.setItem('user',JSON.stringify(user));
    }


    // private handleCreateUser(res){
    //     const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    //     const expiresIn = new Date(expiresInTs);
    //     const user = new User(res.email, res.localId, res.idToken, expiresIn);
        
    //     // Fetch additional user information from backend
    //     this.getUserInfoFromBackend(res.localId).subscribe((userData) => {
    //       // Conditionally set username and phoneNumber if available
    //       if (userData && userData.username) {
    //         user.username = userData.username;
    //       }
    //       if (userData && userData.phoneNumber) {
    //         user.phoneNumber = userData.phoneNumber;
    //       }
    
    //       // Store the complete user object in localStorage
    //       localStorage.setItem('user', JSON.stringify(user));
    
    //       // Emit the user object to subscribers
    //       this.user.next(user);
    //     });
    // }

    private handleError(err){
        console.log(err.error);
        
        let errorMessage = 'An unknown error has occurred';
    
        if(!err.error || !err.error.message){
            return throwError(() => errorMessage);
        }
        
        return throwError(() => err.error.message);

        // let errorMessage = 'An unknown error has occured';
        // // console.log(err);
        // if(!err.error || !err.error.error){
        //     return throwError(() => errorMessage);
        // }
        // switch(err.error.error.message){
        //     case 'EMAIL_EXISTS':
        //         errorMessage = 'This Email already exists.';
        //         break;
        //     case 'OPERATION_NOT_ALLOWED':
        //         errorMessage = 'This operation is not allowed.';
        //         break;
        //     case 'INVALID_LOGIN_CREDENTIALS':
        //         errorMessage = 'The Email ID or Password is not correct.';
        //         break;
        // }
        // return throwError(() => errorMessage);
    }
}