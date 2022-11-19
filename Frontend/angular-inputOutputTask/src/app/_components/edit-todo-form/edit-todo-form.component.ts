import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TodosService } from 'src/app/_services/todos.service';
import { ITodo } from '../../_interfaces/ITodo';

@Component({
  selector: 'app-edit-todo-form',
  templateUrl: './edit-todo-form.component.html',
  styleUrls: ['./edit-todo-form.component.css'],
})
export class EditTodoFormComponent implements OnInit {
  @Input() todoToEdit: ITodo = {};
  title = '';
  content = '';

  constructor(public _todoService: TodosService) {}

  ngOnInit(): void {
    this.title = this.todoToEdit.title!;
    this.content = this.todoToEdit.content!;
  }

  OnEditTodo() {
    this.todoToEdit.title = this.title;
    this.todoToEdit.content = this.content;

    this._todoService.UpdateTodo(this.todoToEdit);
  }
  DisableEditButton() {
    if (this.todoToEdit.title == '' || this.todoToEdit.content == '') {
      return true;
    }

    return false;
  }
}
