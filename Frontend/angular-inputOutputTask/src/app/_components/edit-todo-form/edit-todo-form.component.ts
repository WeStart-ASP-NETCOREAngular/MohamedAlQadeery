import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
  @Output() OnUpdateTodoEvent = new EventEmitter<ITodo>();
  constructor() {}

  ngOnInit(): void {
    this.title = this.todoToEdit.title!;
    this.content = this.todoToEdit.content!;
  }

  OnEditTodo() {
    this.todoToEdit.title = this.title;
    this.todoToEdit.content = this.content;
    this.OnUpdateTodoEvent?.emit(this.todoToEdit);
  }
  DisableEditButton() {
    if (this.todoToEdit.title == '' || this.todoToEdit.content == '') {
      return true;
    }

    return false;
  }
}
