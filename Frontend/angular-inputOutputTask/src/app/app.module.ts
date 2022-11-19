import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './_components/todo-item/todo-item.component';
import { TodoFormComponent } from './_components/todo-form/todo-form.component';
import { TodoPageComponent } from './_components/todo-page/todo-page.component';
import { FormsModule } from '@angular/forms';
import { EditTodoFormComponent } from './_components/edit-todo-form/edit-todo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoFormComponent,
    TodoPageComponent,
    EditTodoFormComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
