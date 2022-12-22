import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
})
export class SelectInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() options: { id: number; name: string }[];
  @Input() placeHolder: string;

  constructor() {}

  ngOnInit(): void {}
}
