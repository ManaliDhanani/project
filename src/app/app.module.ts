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
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/details/:id', component:DetailsComponent  },
  { path: 'about', component: AboutComponent },
  { path: 'observable', component: ObservableComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'task', component: TaskComponent },
  { path: 'createTask', component: CreateComponent },
  { path: 'createTask/:id', component: CreateComponent },
  { path: '**', redirectTo: '', pathMatch:'full' },
]

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
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SubscribeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
