import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit{

  ngOnInit() {
    // let obs = new Observable((observer) => { observer.next(Math.random()) });

    // obs.subscribe((data) => { console.log(data) });
    // obs.subscribe((val) => { console.log(val) });

    // let subject = new Subject();

    // subject.subscribe((data) => { console.log(data) });
    // subject.subscribe((val) => { console.log(val) });
    // subject.next(Math.random());

    // let subject = new Subject();
    // let subject = new BehaviorSubject(100);
    // let subject = new ReplaySubject(2, 3000);
    // const data = ajax('https://randomuser.me/api/');
    let subject = new AsyncSubject();

    subject.next(100);
    subject.next(200);
    subject.next(300);
    subject.complete();

    subject.subscribe((res) => console.log("1",res));
    subject.subscribe((res) => console.log("2",res));
    
    // subject.next(2020);
    // subject.next(2030);
    // // data.subscribe(subject);

    // subject.subscribe((res) => console.log("3",res));
    
    // subject.next(2040);
  }

}
