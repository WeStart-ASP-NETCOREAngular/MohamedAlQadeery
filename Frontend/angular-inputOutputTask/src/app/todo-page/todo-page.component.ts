import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { ITodo } from '../interfaces/ITodo';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent implements OnInit {
  todos: ITodo[] = [];
  constructor() {}

  showEditForm = false;

  todoToEdit: ITodo = {};

  ngOnInit(): void {}

  HandleOnAddTodo($event: ITodo) {
    this.todos.push($event);
  }

  HandleOnDeleteTodo($event: number) {
    console.log($event);
    this.todos = this.todos.filter((t) => t.id != $event);
  }

  HandleOnEditTodo($event: ITodo) {
    this.todoToEdit = $event;
    this.showEditForm = true;
  }

  HandleOnUpdateTodo($event: ITodo) {
    let todoToUpdate = this.todos.find((t) => t.id == $event.id)!;
    todoToUpdate.title = $event.title;
    todoToUpdate.content = $event.content;

    console.log('todo is updated');
    this.showEditForm = false;
  }
}
