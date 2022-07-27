import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsRoomComponent } from './Pages/news-room/news-room.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditorComponent } from './editor/editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Pages/login/login.component';
import { LogoutComponent } from './Pages/logout/logout.component';
import { HeaderComponent } from './Pages/header/header.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { TeleprompterComponent } from './Pages/teleprompter/teleprompter.component';
import { CdTimerModule } from 'angular-cd-timer';
import { NgxSmoothScrollModule } from "@boatzako/ngx-smooth-scroll";
import { SettingsComponent } from './Pages/settings/settings.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsRoomComponent,
    EditorComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    TeleprompterComponent,
    SettingsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    AngularEditorModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    CdTimerModule,
    NgxSmoothScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
