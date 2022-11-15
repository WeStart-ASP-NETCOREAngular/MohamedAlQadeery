import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITodo } from '../interfaces/ITodo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todoTitle = '';
  todoContent = '';
  genrateId: number = 0;

  @Output() onAddTodoEvent = new EventEmitter<ITodo>();
  isEmptyInput: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  OnAddTodo() {
    const todo: ITodo = {
      id: ++this.genrateId,
      title: this.todoTitle,
      content: this.todoContent,
    };
    this.onAddTodoEvent?.emit(todo);
  }

  DisableAddButton(): boolean {
    if (this.todoTitle == '' || this.todoContent == '') {
      return true;
    }

    return false;
  }
}
