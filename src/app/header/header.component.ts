import { Component } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  constructor(private subService: SubscribeService){
  }
  
  onSubscribe(){
    this.subService.onSubscribeClick('monthly');
  }
}
