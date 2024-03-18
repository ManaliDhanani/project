import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';
import { AuthService } from '../services/auth.service';
import { User } from '../Model/User';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(
    private subService: SubscribeService, 
    public authService: AuthService,
  ){}

  isLoggedIn: boolean = false;
  private userSubject: Subscription;

  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }
  
  onSubscribe(){
    this.subService.onSubscribeClick('monthly');
  }

}
