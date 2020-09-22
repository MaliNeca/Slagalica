import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SupervisorComponent} from './supervisor/supervisor.component';;
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { GuestComponent } from './guest/guest.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './users.service';
import { MaterialModule } from './material.module';
import {HttpClientModule} from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './security/auth.guard';
import { ResetPasswordQuestionComponent } from './reset-password-question/reset-password-question.component';
import { ResetNewPasswordComponent } from './reset-new-password/reset-new-password.component';
import { AdminSingleGameComponent } from './admin-single-game/admin-single-game.component';
import { Supervisor55Component } from './supervisor/supervisor55/supervisor55.component';
import { SupervisorGeografijaComponent } from './supervisor/supervisor-geografija/supervisor-geografija.component';
import { SupervisorPeharComponent } from './supervisor/supervisor-pehar/supervisor-pehar.component';
import { UserSingleGameComponent } from './user/user-single-game/user-single-game.component';
import { UserScoreComponent } from './user/user-score/user-score.component';
import { UserGameScoreComponent } from './user/user-game-score/user-game-score.component';
import { AnagramGameComponent } from './anagram-game/anagram-game.component';
import { MojBrojComponent } from './moj-broj/moj-broj.component';
import { PetGameComponent } from './pet-game/pet-game.component';
import { GeografijaGameComponent } from './geografija-game/geografija-game.component';
import { PeharGameComponent } from './pehar-game/pehar-game.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    SupervisorComponent,
    GuestComponent,
    ResetPasswordComponent,
    ResetPasswordQuestionComponent,
    ResetNewPasswordComponent,
    AdminSingleGameComponent,
    Supervisor55Component,
    SupervisorGeografijaComponent,
    SupervisorPeharComponent,
    UserSingleGameComponent,
    UserScoreComponent,
    UserGameScoreComponent,
    AnagramGameComponent,
    MojBrojComponent,
    PetGameComponent,
    GeografijaGameComponent,
    PeharGameComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule, 
    MaterialModule, 
    BrowserAnimationsModule
  ],
  entryComponents: [UserComponent, AnagramGameComponent, MojBrojComponent, PetGameComponent,GeografijaGameComponent,PeharGameComponent],
  providers: [UsersService, AuthGuard],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
