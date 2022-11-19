import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodosService } from 'src/app/_services/todos.service';
import { ITodo } from '../../_interfaces/ITodo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo = {};

  constructor(public _todoService: TodosService) {}

  ngOnInit(): void {}

  OnClickEditButton() {
    this._todoService.OnEditTodoSelected.emit(this.todo);
  }

  OnClickDelteButton() {
    this._todoService.DeleteTodo(this.todo.id!);
  }
}
