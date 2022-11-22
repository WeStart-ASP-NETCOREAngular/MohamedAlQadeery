import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'template-driven';
  @ViewChild('loginForm') loginForm!: NgForm;
  defaultSelect = 'advanced';
  isNotValid = false;

  onSubmit() {
    if (!this.loginForm.valid) {
      this.isNotValid = true;
    } else {
      this.isNotValid = false;
    }
    console.log(this.loginForm);
  }
}
