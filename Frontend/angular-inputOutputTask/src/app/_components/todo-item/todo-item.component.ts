import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from '../../_interfaces/ITodo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo = {};

  @Output() OnEditButtonClicked = new EventEmitter<ITodo>();
  @Output() OnDeleteTodo = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  OnClickEditButton() {
    console.log('edit button click from todo item');

    this.OnEditButtonClicked?.emit(this.todo);
  }

  OnClickDelteButton() {
    this.OnDeleteTodo?.emit(this.todo?.id);
  }
}
