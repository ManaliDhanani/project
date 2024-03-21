import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
// import { Observable, Observer, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'project';

  constructor(public authService: AuthService){}

  ngOnInit() {
      this.authService.autoLogin();
  }

  
//   name = "";
//   userName = "";
//   myCSSClass = "red";
//   applyCSSClass = false;

//   products = [
//     {
//       id: 1,
//       name: 'iPhone X',
//       price: 999,
//       color: ['Red','Black','White'],
//       discount: 8.5,
//       inStock: 5,
//       pImage: "/assets/images/iphone.png",
//       cart: 0,
//     },
//     {
//       id: 2,
//       name: 'Oppo F21 S Pro',
//       price: 750,
//       color: ['Silver','Black','White'],
//       discount: 8,
//       inStock: 0,
//       pImage: "/assets/images/oppo_f21.jpg",
//       cart: 0,
//     },
//     {
//       id: 3,
//       name: 'Vivo T2 Pro',
//       price: 800,
//       color: ['Rose Gold','Silver','Gold','Black'],
//       discount: 9,
//       inStock: 8,
//       pImage: "/assets/images/vivo.png",
//       cart: 0,
//     },
//     {
//       id: 4,
//       name: 'Samsung A34',
//       price: 880,
//       color: ['Multi Color','White','Blue'],
//       discount: 12,
//       inStock: 10,
//       pImage: "/assets/images/samsung.png",
//       cart: 0,
//     },
//     {
//       id: 5,
//       name: 'One Plus Nord 3',
//       price: 900,
//       color: ['Green','White','Blue','Red'],
//       discount: 15,
//       inStock: 12,
//       pImage: "/assets/images/one+.png",
//       cart: 0,
//     },
//     {
//       id: 6,
//       name: 'Xiaomi Mi 18',
//       price: 700,
//       color: ['Black','White','Blue','Purple'],
//       discount: 9,
//       inStock: 0,
//       pImage: "/assets/images/xiaomi_mi.png",
//       cart: 0,
//     },
//   ];

//   searchText = "";
//   handleValue(value: string) {
//     this.searchText = value; 
//   }

//   incCartValue(name:any){
//     this.products.forEach(product => {
//       if(name == product.name){
//         if(product.cart == product.inStock){
//           product.cart = product.inStock;
//         }else{
//           product.cart++;
//         }
//       }
//     })
//   }

//   decCartValue(name:any){
//     this.products.forEach(product => {
//       if(name == product.name){
//         if(product.cart == 0){
//           product.cart = 0;
//         }else{
//           product.cart--;
//         }
//       }
//     })
//   }

//    buyNow(name:any){
//     alert("Order successful..");
//     location.reload();
//   }

//   timeChange = new Observable<string>((observer: Observer<string>) => {
//     setInterval(() => {
//       observer.next(new Date().toString()), 1000
//     }); 
//  }); 

//  presentDate = new Date(); 
  

}
