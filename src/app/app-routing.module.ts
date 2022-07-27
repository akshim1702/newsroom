import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LoginComponent } from './Pages/login/login.component';
import { NewsRoomComponent } from './Pages/news-room/news-room.component';
import { SettingsComponent } from './Pages/settings/settings.component';
import { TeleprompterComponent } from './Pages/teleprompter/teleprompter.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'news-room',
    component: NewsRoomComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'teleprompter',
    component: TeleprompterComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
     canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
