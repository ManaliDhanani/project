import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceComponent } from './service/service.component';
import { SubscribeService } from './services/subscribe.service';
import { ObservableComponent } from './observable/observable.component';
import { CreateTaskComponent } from './observable/create-task/create-task.component';
import { ShowTaskComponent } from './observable/show-task/show-task.component';
import { SubjectComponent } from './observable/subject/subject.component';
import { TaskComponent } from './task/task.component';
import { CreateComponent } from './task/create/create.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './RouteGuards/authGuard';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from'@angular/fire/compat/auth';
import { DemoMaterialModule } from './material-module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ApiInterceptor } from './services/api-interceptor.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'shop/details/:id', component:DetailsComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'observable', component: ObservableComponent, canActivate: [AuthGuard] },
  { path: 'service', component: ServiceComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'createTask', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'createTask/:id', component: CreateComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch:'full' },
]

// const firebaseConfig = {
//   apiKey: "AIzaSyDvaS5zz8c4iSP8YS6BiXbWUMYsFuYwqmY",
//   authDomain: "angularhttpclient-d6c80.firebaseapp.com",
//   databaseURL: "https://angularhttpclient-d6c80-default-rtdb.firebaseio.com",
//   projectId: "angularhttpclient-d6c80",
//   storageBucket: "angularhttpclient-d6c80.appspot.com",
//   messagingSenderId: "149263745013",
//   appId: "1:149263745013:web:6eaecaf441f81589182abc"
// };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    AboutComponent,
    ShopComponent,
    HomeComponent,
    DetailsComponent,
    ServiceComponent,
    ObservableComponent,
    CreateTaskComponent,
    ShowTaskComponent,
    SubjectComponent,
    TaskComponent,
    CreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    DemoMaterialModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    SubscribeService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
