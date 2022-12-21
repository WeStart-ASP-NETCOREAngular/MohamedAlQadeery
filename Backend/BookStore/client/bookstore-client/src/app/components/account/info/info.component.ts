import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { IInfoResponse } from 'src/app/interfaces/app-user/IAppUserDtos';
import { IZoneResponse } from 'src/app/interfaces/zone/IZoneDtos';
import { AccountService } from 'src/app/services/account.service';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { ZonesService } from 'src/app/services/zones.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  constructor(
    private _accountService: AccountService,
    private _zonesService: ZonesService,
    private _toast: ToastrService,
    private _addressService: AddressService
  ) {}
  info: IInfoResponse;
  zonesOptions: { id: number; name: string }[] = [];
  hasAddress = false;
  buttonLabel = 'اضافة';
  //#region FormGroup and formControls
  addressInfoFormGroup: FormGroup;
  address1FormControl: FormControl;
  address2FormControl: FormControl;
  postalCodeFormControl: FormControl;
  zoneIdFormControl: FormControl;
  //#endregion

  ngOnInit(): void {
    this.FetchZonesOptions();

    this._accountService.GetUserInfo().subscribe((res) => {
      this.info = res;
      if (this.info.address != null) {
        this.SetFormControlsValues(this.info);
        this.hasAddress = true;
        this.buttonLabel = 'تحديث';
      }
    });
    this.InitAddressInfoFormControls();

    this.addressInfoFormGroup = new FormGroup({
      address1: this.address1FormControl,
      address2: this.address2FormControl,
      postalCode: this.postalCodeFormControl,
      zoneId: this.zoneIdFormControl,
    });
  }

  OnSubmitAddressForm() {
    if (!this.hasAddress) {
      this.CreateAddressForUser();
    } else {
      this.UpdateAddressForUser();
    }
  }

  private UpdateAddressForUser() {
    this._addressService
      .UpdateAddress(this.addressInfoFormGroup.value, this.info.address?.id!)
      .subscribe({
        next: (res) => {
          this.address1FormControl.setValue(res.address1);
          if (res.address2 != null) {
            this.address2FormControl.setValue(res.address2);
          }
          this.postalCodeFormControl.setValue(res.postalCode);
          this.zoneIdFormControl.setValue(res.zone.id);

          this._toast.success('تم تحديث بياناتك بنجاح', 'تحديث بيانات العنوان');
        },
        error: (err) => {
          this._toast.error(err);
        },
      });
  }

  private CreateAddressForUser() {
    this._accountService
      .AddUserAddress(this.addressInfoFormGroup.value)
      .subscribe({
        next: (res) => {
          this._toast.success(
            'تم اضافة عنوان لبياناتك بنجاح',
            'اضافة  بيانات العنوان'
          );
        },
        error: (err) => {
          this._toast.error(err);
        },
      });
  }

  private SetFormControlsValues(res: IInfoResponse) {
    this.address1FormControl.setValue(res.address?.address1);
    if (res.address?.address2 != null) {
      this.address2FormControl.setValue(res.address.address2);
    }
    this.postalCodeFormControl.setValue(res.address?.postalCode);

    if (res.address?.zone) {
      this.zoneIdFormControl.setValue(res.address?.zone.id);
    }
  }

  private FetchZonesOptions() {
    this._zonesService
      .GetAllZones()
      .pipe(
        map((res: IZoneResponse[]) => {
          return res.map((a) => ({ id: a.id, name: a.name }));
        })
      )
      .subscribe({
        next: (res) => {
          this.zonesOptions = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private InitAddressInfoFormControls() {
    this.address1FormControl = new FormControl('', [Validators.required]);
    this.address2FormControl = new FormControl('');
    this.postalCodeFormControl = new FormControl('', [Validators.required]);
    this.zoneIdFormControl = new FormControl('', [Validators.required]);
  }
}
