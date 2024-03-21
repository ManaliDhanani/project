import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ServiceComponent } from './service/service.component';
import { ObservableComponent } from './observable/observable.component';
import { TaskComponent } from './task/task.component';
import { CreateComponent } from './task/create/create.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './RouteGuards/authGuard';

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
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
