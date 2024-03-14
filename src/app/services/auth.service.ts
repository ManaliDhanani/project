import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "../Model/User";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    http: HttpClient = inject(HttpClient);
    user = new Subject<User>();

    signup(email, password){
        const data= { email: email, password: password, returnSecureToken: true };
        return this.http.post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvaS5zz8c4iSP8YS6BiXbWUMYsFuYwqmY', 
            data
        )
        .pipe(catchError(this.handleError), tap((res) => {
            this.handleCreateUser(res);
        }))
    }

    login(email, password){
        const data= { email: email, password: password, returnSecureToken: true };
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvaS5zz8c4iSP8YS6BiXbWUMYsFuYwqmY', data)
        .pipe(catchError(this.handleError))
    }

    private handleCreateUser(res){
        const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
        const expiresIn = new Date(expiresInTs);
        const user = new User(res.email, res.localId, res.idToken, expiresIn);
        this.user.next(user);
    }

    handleError(err){
        let errorMessage = 'An unknown error has occured';
        // console.log(err);
        
        if(!err.error || !err.error.error){
            return throwError(() => errorMessage);
        }
        switch(err.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email already exists.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'This operation is not allowed.';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'The Email ID or Password is not correct.';
                break;
        }
        return throwError(() => errorMessage);
    }
}