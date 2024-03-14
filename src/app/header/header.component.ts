import { Component, OnInit, inject } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';
import { AuthService } from '../services/auth.service';
import { User } from '../Model/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{

  constructor(private subService: SubscribeService){}

  authService: AuthService = inject(AuthService);

  isLoggedIn:boolean = false;

  ngOnInit(){
    this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
      
    })
  }
  
  onSubscribe(){
    this.subService.onSubscribeClick('monthly');
  }



}
