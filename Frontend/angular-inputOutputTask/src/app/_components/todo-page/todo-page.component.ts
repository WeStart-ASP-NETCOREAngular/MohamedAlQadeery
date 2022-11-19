import {
  Component,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { TodosService } from 'src/app/_services/todos.service';
import { ITodo } from '../../_interfaces/ITodo';
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent implements OnInit, OnDestroy {
  todos: ITodo[] = [];
  constructor(public _todoService: TodosService) {}

  showEditForm = false;

  todoToEdit: ITodo = {};

  ngOnInit(): void {
    this._todoService.OnEditTodoSelected.subscribe((editTodo: ITodo) => {
      this.todoToEdit = editTodo;
      this.showEditForm = true;
    });

    this._todoService.OnUpdatedTodo.subscribe(() => {
      this.showEditForm = false;
    });
  }

  ngOnDestroy(): void {
    this._todoService.OnEditTodoSelected.unsubscribe();

    console.log('TodoPageComponent unsubscribed from edit todo event');
  }

  HandleOnUpdatedFinsihed() {
    this.showEditForm = false;
  }
}
