import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  imports:      [ BrowserModule , HttpModule , ReactiveFormsModule , FormsModule],
  declarations: [ AppComponent , TasksComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
