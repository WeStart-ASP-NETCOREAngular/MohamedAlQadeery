import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/helpers/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor() {}
  //#region FormGroup and formControls
  registerFormGroup: FormGroup;
  emailFormControl: FormControl;
  firstNameFormControl: FormControl;
  lastNameFormControl: FormControl;
  passwordFormControl: FormControl;
  confirmPasswordFormControl: FormControl;
  //#endregion

  ngOnInit(): void {
    this.InitFormControls();

    this.registerFormGroup = new FormGroup(
      {
        email: this.emailFormControl,
        firstName: this.firstNameFormControl,
        lastName: this.lastNameFormControl,
        password: this.passwordFormControl,
        confirmPassword: this.confirmPasswordFormControl,
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  private InitFormControls() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.firstNameFormControl = new FormControl('', [Validators.required]);
    this.lastNameFormControl = new FormControl('', [Validators.required]);
    this.passwordFormControl = new FormControl('', [Validators.required]);
    this.confirmPasswordFormControl = new FormControl('', [
      Validators.required,
    ]);
  }

  HandleOnLogin() {
    console.log(this.registerFormGroup.value);
  }
}
