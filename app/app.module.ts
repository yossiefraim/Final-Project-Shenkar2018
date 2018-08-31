import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingCompnents } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { RideFormComponent } from './ride-form/ride-form.component';
import { HandymanFormComponent } from './handyman-form/handyman-form.component';
import { ElderlyFormComponent } from './elderly-form/elderly-form.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import {UserLoginService} from './services/user-login.service';
import {AuthGuardGuard} from './auth-guard.guard';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { UserHomeComponent } from './user-home/user-home.component';
import { ApplicationService } from './services/application.service';
import { OfferService } from './services/offer.service';
import { MatchServiceService } from './services/match-service.service';
import { FilterPipe } from './filter.pipe';
import {GrowlModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/rating';
import { ContactComponent } from './contact/contact.component';




@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingCompnents,
    StudentFormComponent,
    RideFormComponent,
    HandymanFormComponent,
    ElderlyFormComponent,
    MenuFormComponent,
    UserHomeComponent,
    FilterPipe,
    ContactComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    GrowlModule,
    RatingModule
  ],
  providers: [OfferService,ApplicationService,UserLoginService,AuthGuardGuard,MatchServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
