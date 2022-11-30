import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateThreadComponent } from './components/create-thread/create-thread.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditThreadComponent } from './components/edit-thread/edit-thread.component';
import { IndividualMessageComponent } from './components/individual-message/individual-message.component';
import { IndividualProfileComponent } from './components/individual-profile/individual-profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path:'messages', component: DashboardComponent},
  {path: 'thread/:id', component: IndividualMessageComponent},
  {path: 'user/:id', component: IndividualProfileComponent},
  {path: 'edit-thread/:id', component: EditThreadComponent},
  {path: 'create-thread', component: CreateThreadComponent},
  {path: 'edit-profile/:id', component: EditProfileComponent},
  { path: '**', pathMatch: 'full', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
