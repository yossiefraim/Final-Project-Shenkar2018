import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { OfferComponent } from './offer/offer.component';
import { LoginComponent } from './login/login.component';
import {StudentFormComponent} from './student-form/student-form.component';
import {RideFormComponent} from './ride-form/ride-form.component';
import {HandymanFormComponent} from './handyman-form/handyman-form.component';
import {ElderlyFormComponent} from './elderly-form/elderly-form.component';
import {MenuFormComponent} from './menu-form/menu-form.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {AuthGuardGuard} from './auth-guard.guard';
import { ContactComponent } from './contact/contact.component';

const routes : Routes = [
  {path: 'home', component: MainComponent },
  {path: 'registration', component: RegistrationComponent},
  {path: 'offer', component: OfferComponent},
  {path: 'login', component: LoginComponent},
  {path: 'studentForm', component: StudentFormComponent,canActivate:[AuthGuardGuard]},
  {path: 'rideForm', component: RideFormComponent,canActivate:[AuthGuardGuard]},
  {path: 'handymanForm', component: HandymanFormComponent,canActivate:[AuthGuardGuard]},
  {path: 'elderlyForm', component: ElderlyFormComponent,canActivate:[AuthGuardGuard]},
  {path: 'userHome', component: UserHomeComponent,canActivate:[AuthGuardGuard]},
  {path: 'menuForm', component: MenuFormComponent},
  {path: 'item', component:ProductPageComponent},
  {path: 'contact', component:ContactComponent},
  {path: '**', component: MainComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
export const routingCompnents = [MainComponent,RegistrationComponent,OfferComponent,LoginComponent,StudentFormComponent,RideFormComponent,HandymanFormComponent,ElderlyFormComponent,MenuFormComponent,UserHomeComponent,ProductPageComponent,ContactComponent]
