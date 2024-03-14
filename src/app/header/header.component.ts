import { Component } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  currentPathSegment: string;

  constructor(private subService: SubscribeService){
  }
  
  onSubscribe(){
    this.subService.onSubscribeClick('monthly');
  }

}
