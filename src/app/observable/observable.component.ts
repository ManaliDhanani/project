import { Component } from '@angular/core';
import { Observable, filter, from, map, of } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent {
  title = 'angular-observables';
  
  data:any[] = [];

  array1 = [1, 3, 5, 7, 9];
  array2 = ['A', 'B', 'C', 'D'];

  // myObservable = new Observable((observer) => {
  //   setTimeout(() =>  { observer.next(1); },1000);
  //   setTimeout(() =>  { observer.next(2); },2000);
  //   setTimeout(() =>  { observer.next(3); },3000);
  //   // setTimeout(() =>  { observer.error(new Error('Something went wrong. Please try again later!')); },3500);
  //   setTimeout(() =>  { observer.next(4); },4000);
  //   setTimeout(() =>  { observer.next(5); },5000);
  //   setTimeout(() =>  { observer.complete(); },6000);
  // });

  // myObservable = of(this.array1, this.array2, '30', 'hii');

  // promiseData = new Promise((resolve, reject) => {
  //   resolve([10,20,30,40,50]);
  // })

  // myObservable = from(this.promiseData);

  myObservable = from([2, 4, 6, 8, 10]).pipe(map((val) => {
    return val * 5;
  }), filter((val) => {
    return val % 4 === 0;
  }))

  getAsyncData(){
    // observer
    // next, error, complete
    this.myObservable.subscribe({
      next:(val:any) => {
        this.data.push(val);
        console.log(val);
        
      },
      error(err) {
        alert(err.message);
      },
      complete() {
        alert('All the data is streamed!');
      }
    })
  }

}
