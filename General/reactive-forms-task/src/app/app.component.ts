import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reactive-forms-task';
  projectForm = new FormGroup({
    projectName: new FormControl('', [Validators.required, this.invalidNames]),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl(''),
  });

  projectName = '';
  email = '';
  status = '';
  isSubmit = false;

  invalidNames(control: FormControl): { [text: string]: boolean } | null {
    if (control.value == 'test') {
      return { invalidProjectName: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.projectForm.statusChanges.subscribe((status) => {
      console.log(`Status : ${status}`);
    });
  }
  onSubmit() {
    if (!this.projectForm.valid) return;
    this.projectName = this.projectForm.get('projectName')?.value!;
    this.email = this.projectForm.get('email')?.value!;
    this.status = this.projectForm.get('status')?.value!;
    this.isSubmit = true;
  }
}
