import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodo } from '../interfaces/ITodo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo | undefined;

  @Output() OnEditTodo = new EventEmitter<ITodo>();
  @Output() OnDeleteTodo = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  OnClickEditButton() {
    this.OnEditTodo?.emit(this.todo);
  }

  OnClickDelteButton() {
    this.OnDeleteTodo?.emit(this.todo?.id);
  }
}
