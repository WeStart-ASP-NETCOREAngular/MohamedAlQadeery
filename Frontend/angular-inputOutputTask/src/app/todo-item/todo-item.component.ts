import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from '../interfaces/ITodo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo | undefined;
  constructor() {}

  ngOnInit(): void {}
}
