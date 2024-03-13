import { Component } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent {

  constructor(private subService: SubscribeService){
  }

  onSubscribe(){
    this.subService.onSubscribeClick('quarterly');
  } 

}

  // instead of creating an instant by our own now we are asking angular to inject an instant of this SubscribeService so this SubscribeService is our dependency we are telling angular to inject an instant of this dependency inside service component class.. 
  // now this component is not tightly coupled with SubscribeService class because now we are not instantiating this subscribe service class explicitly in this service component class instead we are asking angular to inject an instant of this SubscribeService class inside service component class.. 
  // DI is a technique(design pattern) using which a class receives its dependencies from an external source rather than creating them itself.
// This three instances in diff component are completely diff and independent of one another 