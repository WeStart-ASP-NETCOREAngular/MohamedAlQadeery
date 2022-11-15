import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoFormComponent,
    TodoPageComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
