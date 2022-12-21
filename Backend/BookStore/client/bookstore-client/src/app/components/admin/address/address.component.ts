import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { IAddressResponse } from 'src/app/interfaces/address/IAddressDtos';
import { IZoneResponse } from 'src/app/interfaces/zone/IZoneDtos';
import { AddressService } from 'src/app/services/address.service';
import { ZonesService } from 'src/app/services/zones.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  formType = 'create';
  buttonLabel = 'انشاء';

  //#region Address Forms Controls
  addressFormGroup: FormGroup;
  address1Input: FormControl;
  address2Input: FormControl;
  postalCodeInput: FormControl;
  zoneIdInput: FormControl;
  //#endregion

  //#region Address Select Input
  zonesOptions: { id: number; name: string }[] = [];

  //#endregion

  addressId: number;
  addresses: IAddressResponse[] = [];
  showForm = false;

  constructor(
    private _addressService: AddressService,
    private _zonesService: ZonesService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.InitForm();

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
          this._toastr.error(err, 'Error in fetching zones');
        },
      });

    this._addressService.GetAllAddresses().subscribe((res) => {
      this.addresses = res;
    });
  }

  private InitForm() {
    this.address1Input = new FormControl('', [Validators.required]);
    this.address2Input = new FormControl('');
    this.postalCodeInput = new FormControl('', [Validators.required]);
    this.zoneIdInput = new FormControl('', [Validators.required]);
    this.addressFormGroup = new FormGroup({
      address1: this.address1Input,
      address2: this.address2Input,
      postalCode: this.postalCodeInput,
      zoneId: this.zoneIdInput,
    });
  }

  HandleOnSubmit() {
    console.log(this.addressFormGroup.value);
    if (this.formType == 'create') {
      this.CreateAddress();
    } else {
      this.UpdateAddress();
    }

    this.ResetForm();
  }

  HandleOnEdit(addressId: number) {
    this._addressService.GetAddressById(addressId).subscribe((res) => {
      this.formType = 'update';
      this.buttonLabel = 'تحديث';
      this.address1Input.setValue(res.address1);
      this.postalCodeInput.setValue(res.postalCode);
      this.zoneIdInput.setValue(res.zone.id);
      if (res.address2) {
        this.address2Input.setValue(res.address2);
      }

      this.addressId = res.id;
      this.showForm = true;
    });
  }

  private UpdateAddress() {
    this._addressService
      .UpdateAddress(this.addressFormGroup.value, this.addressId)
      .subscribe((res) => {
        let address = this.addresses.find((c) => c.id == res.id)!;
        address.address1 = res.address1;
        address.postalCode = res.postalCode;
        address.zone = res.zone;
        if (res.address2) {
          address.address2 = res.address2;
        }
        this.showForm = false;
        this._toastr.success(`تم تحديث العنوان بنجاح `, 'تمت العملية');
      });
  }

  private CreateAddress() {
    this._addressService
      .CreateAddress(this.addressFormGroup.value)
      .subscribe((res) => {
        this.addresses.push(res);
        this._toastr.success(`تم اضافة العنوان بنجاح `, 'تمت العملية');
      });
  }

  HandleOnDelete(addressId: number) {
    this._addressService.DeleteAddress(addressId).subscribe({
      next: () => {
        this._toastr.success('تم حذف العنوان بنجاح', 'تمت العملية');
        this.addresses = this.addresses.filter((c) => c.id != addressId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private ResetForm() {
    this.formType = 'create';
    this.buttonLabel = 'انشاء';

    this.addressFormGroup.reset();
  }
}
