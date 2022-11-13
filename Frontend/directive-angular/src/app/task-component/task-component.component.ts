import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css'],
})
export class TaskComponentComponent implements OnInit {
  para = 'simple text to display';
  logList: Date[] = [];
  displayPara = false;
  index = 0;
  constructor() {}

  ngOnInit(): void {}

  OnClickDisplayButton() {
    this.displayPara = !this.displayPara;
    this.logList.push(new Date());
  }
}
