import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import {SupervisorComponent} from './supervisor/supervisor.component';
import {GuestComponent} from './guest/guest.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordQuestionComponent } from './reset-password-question/reset-password-question.component';
import { ResetNewPasswordComponent } from './reset-new-password/reset-new-password.component';
import { AuthGuard } from './security/auth.guard';
import { AdminSingleGameComponent } from './admin-single-game/admin-single-game.component';
import { SupervisorGeografijaComponent } from './supervisor/supervisor-geografija/supervisor-geografija.component';
import { Supervisor55Component } from './supervisor/supervisor55/supervisor55.component';
import { SupervisorPeharComponent } from './supervisor/supervisor-pehar/supervisor-pehar.component';
import { UserGameScoreComponent } from './user/user-game-score/user-game-score.component';
import { UserScoreComponent } from './user/user-score/user-score.component';
import { UserSingleGameComponent } from './user/user-single-game/user-single-game.component';
import { PetGameComponent } from './pet-game/pet-game.component';
import { GeografijaGameComponent } from './geografija-game/geografija-game.component';
import { PeharGameComponent } from './pehar-game/pehar-game.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', canActivate: [AuthGuard], component: UserComponent},
  {path: 'user/singleGame', canActivate: [AuthGuard], component: UserSingleGameComponent},
  {path: 'user/score', canActivate: [AuthGuard], component: UserScoreComponent},
  {path: 'user/gameScore', canActivate: [AuthGuard], component: UserGameScoreComponent},
  {path: 'admin',canActivate: [AuthGuard], component: AdminComponent},
  {path: 'admin/request',canActivate: [AuthGuard], component: AdminComponent},
  {path: 'admin/singleGame',canActivate: [AuthGuard], component: AdminSingleGameComponent},
  {path: 'supervisor', canActivate: [AuthGuard],  component:SupervisorComponent},
  {path: 'supervisor/anagram', canActivate: [AuthGuard],  component:SupervisorComponent},
  {path: 'supervisor/geografija', canActivate: [AuthGuard],  component:SupervisorGeografijaComponent},
  {path: 'supervisor/5x5', canActivate: [AuthGuard],  component:Supervisor55Component},
  {path: 'supervisor/pehar', canActivate: [AuthGuard],  component:SupervisorPeharComponent},
  {path: 'guest', component:GuestComponent},
  {path: 'reset', component: ResetPasswordComponent},
  {path: 'resetQuestion', canActivate: [AuthGuard], component:ResetPasswordQuestionComponent},
  {path: 'resetNewPassword',  canActivate: [AuthGuard], component:ResetNewPasswordComponent},
  {path: '', component: LoginComponent},
  {path:'test', component:PeharGameComponent}

]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
