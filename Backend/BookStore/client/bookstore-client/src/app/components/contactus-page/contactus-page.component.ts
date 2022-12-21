import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-contactus-page',
  templateUrl: './contactus-page.component.html',
  styleUrls: ['./contactus-page.component.css'],
})
export class ContactusPageComponent implements OnInit {
  constructor(
    private _toastr: ToastrService,
    private _contactusService: ContactUsService,
    private _router: Router
  ) {}

  //#region FormGroup and formControls
  contactusFormGroup: FormGroup;
  fullNameFormControl: FormControl;
  emailFormControl: FormControl;
  messageFormControl: FormControl;
  //#endregion
  ngOnInit(): void {
    this.InitFormControls();
    this.contactusFormGroup = new FormGroup({
      fullName: this.fullNameFormControl,
      email: this.emailFormControl,
      message: this.messageFormControl,
    });
  }

  OnSubmitContactForm() {
    this._contactusService
      .CreateContactusMessage(this.contactusFormGroup.value)
      .subscribe({
        next: (res) => {
          this._toastr.success(
            'سيتم التواصل معك على البريد الالكتروني لاحقا',
            'تم ارسال رسالتك بنجاح ',
            {
              positionClass: 'toast-top-center',
            }
          );

          this._router.navigate(['/home']);
        },
        error: (err) => {
          this._toastr.error('حدث خطأ');
          console.log(err);
        },
      });
  }

  private InitFormControls() {
    this.fullNameFormControl = new FormControl('', [Validators.required]);
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.messageFormControl = new FormControl('', [Validators.required]);
  }
}
