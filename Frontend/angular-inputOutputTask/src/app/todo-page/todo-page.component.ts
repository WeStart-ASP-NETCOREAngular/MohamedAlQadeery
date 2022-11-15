import { Component, OnInit } from '@angular/core';
import { ITodo } from '../interfaces/ITodo';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent implements OnInit {
  todos: ITodo[] = [];
  constructor() {}

  ngOnInit(): void {}

  HandleOnAddTodo($event: ITodo) {
    this.todos.push($event);
  }

  HandleOnDeleteTodo($event: number) {
    console.log($event);
    this.todos = this.todos.filter((t) => t.id != $event);
  }
}
