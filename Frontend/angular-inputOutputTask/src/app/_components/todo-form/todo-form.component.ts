import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodosService } from 'src/app/_services/todos.service';
import { ITodo } from '../../_interfaces/ITodo';

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
  constructor(public _todoService: TodosService) {}

  ngOnInit(): void {}

  OnAddTodo() {
    const todo: ITodo = {
      id: ++this.genrateId,
      title: this.todoTitle,
      content: this.todoContent,
    };

    this._todoService.AddTodo(todo);

    this.ClearInputs();
  }

  private ClearInputs() {
    this.todoTitle = '';
    this.todoContent = '';
  }

  DisableAddButton(): boolean {
    if (this.todoTitle == '' || this.todoContent == '') {
      return true;
    }

    return false;
  }
}
