import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



import { AppComponent } from './app.component';
import { TaskListComponent } from './tasklist.component';
import { TaskListItemComponent } from './tasklistitem.component';
import { CreateTaskComponent } from './createtask.component';
import { TaskDetailsComponent } from './taskdetails.component';
import { TaskService } from './task.service';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskListItemComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
