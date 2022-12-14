import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IZoneResponse } from 'src/app/interfaces/zone/IZoneDtos';
import { ZonesService } from 'src/app/services/zones.service';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css'],
})
export class ZonesComponent implements OnInit {
  formType = 'create';
  buttonLabel = 'انشاء';
  zoneFormGroup: FormGroup;
  zoneNameInput: FormControl;
  zoneId: number;
  zones: IZoneResponse[] = [];

  constructor(
    private _zoneService: ZonesService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.zoneNameInput = new FormControl('', [Validators.required]);
    this.zoneFormGroup = new FormGroup({
      name: this.zoneNameInput,
    });

    this._zoneService.GetAllZones().subscribe((res) => {
      this.zones = res;
    });
  }

  HandleOnSubmit() {
    console.log(this.zoneFormGroup.value);
    if (this.formType == 'create') {
      this.CreateZone();
    } else {
      this.UpdateZone();
    }

    this.ResetForm();
  }

  HandleOnEdit(zoneId: number) {
    this._zoneService.GetZoneById(zoneId).subscribe((res) => {
      this.formType = 'update';
      this.buttonLabel = 'تحديث';
      this.zoneNameInput.setValue(res.name);
      this.zoneId = res.id;
    });
  }

  private UpdateZone() {
    this._zoneService
      .UpdateZone(this.zoneFormGroup.value, this.zoneId)
      .subscribe((res) => {
        let zone = this.zones.find((c) => c.id == res.id)!;
        zone.name = res.name;
        this._toastr.success(
          `تم تحديث المحافظة : ${zone.name}, بنجاح`,
          'تمت العملية'
        );
      });
  }

  private CreateZone() {
    this._zoneService.CreateZone(this.zoneFormGroup.value).subscribe((res) => {
      this.zones.push(res);
      this._toastr.success(
        `تم اضافة المحافظة : ${res.name}, بنجاح`,
        'تمت العملية'
      );
    });
  }

  HandleOnDelete(zoneId: number) {
    this._zoneService.DeleteZone(zoneId).subscribe({
      next: () => {
        this._toastr.success('تم حذف المحافظة بنجاح', 'تمت العملية');
        this.zones = this.zones.filter((c) => c.id != zoneId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private ResetForm() {
    this.formType = 'create';
    this.buttonLabel = 'انشاء';

    this.zoneFormGroup.reset();
  }
}
