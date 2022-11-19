import { EventEmitter, Injectable } from '@angular/core';
import { ITodo } from '../_interfaces/ITodo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos: ITodo[] = [];

  constructor() {}

  OnEditTodoSelected = new EventEmitter<ITodo>();
  OnUpdatedTodo = new EventEmitter(); //Invoke after todo is updated

  AddTodo(todo: ITodo) {
    this.todos.push(todo);
  }

  DeleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id != id);
  }

  UpdateTodo(todo: ITodo) {
    let todoToUpdate = this.todos.find((t) => t.id == todo.id)!;
    todoToUpdate.title = todo.title;
    todoToUpdate.content = todo.content;
    this.OnUpdatedTodo.emit();
  }
}
