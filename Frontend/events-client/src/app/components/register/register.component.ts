import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  userName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(
    private _accountService: AccountService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      [this.createCompareValidator(this.password, this.confirmPassword)]
    );
  }

  HandleSubmitForm() {
    this._spinner.show();
    this._accountService.RegisterUser(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._toastr.info(`Welcome ${res.username}`, 'Register Success', {
          positionClass: 'toast-bottom-right',
        });
        this._spinner.hide();
        this._router.navigate(['home']);
      },
      error: (error) => {
        this._toastr.error('Something went wrong');

        console.log(error);
        this._spinner.hide();
      },
    });
  }

  createCompareValidator(
    controlOne: AbstractControl,
    controlTwo: AbstractControl
  ) {
    return () => {
      if (controlOne.value !== controlTwo.value) return { match_error: true };
      return null;
    };
  }
}
