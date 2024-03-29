import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IPublisherResponse,
  IUpdatePublisherDto,
} from 'src/app/interfaces/publisher/PublisherDtos';
import { PublisherService } from 'src/app/services/publisher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
})
export class PublisherComponent implements OnInit {
  formType = 'create';
  buttonLabel = 'انشاء';
  publisherFormGroup: FormGroup;
  publisherNameInput: FormControl;
  publisherLogoInput: FormControl;

  publisherId: number;
  publishers: IPublisherResponse[] = [];

  imagesUrl = `${environment.baseURL}/images`;

  imagePreview = '';
  progressValue: string = '';

  constructor(
    private _publisherService: PublisherService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.publisherNameInput = new FormControl('', [Validators.required]);
    this.publisherLogoInput = new FormControl('', [Validators.required]);

    this.publisherFormGroup = new FormGroup({
      name: this.publisherNameInput,
      logo: this.publisherLogoInput,
      file: new FormControl(''),
    });

    this._publisherService.GetAllPublishers().subscribe((res) => {
      this.publishers = res;
    });
  }

  HandleOnSubmit() {
    if (this.formType == 'create') {
      this.CreatePublisher();
    } else {
      //update publisher
      this.UpdatePublisher();
    }

    this.ResetForm();
  }

  private CreatePublisher() {
    this._publisherService
      .CreatePublisher(this.publisherFormGroup.value)
      .subscribe({
        next: (res) => {
          if (res.type == HttpEventType.UploadProgress) {
            if (res.total) {
              //not equal to null update progress
              this.progressValue =
                Math.round(100 * (res.loaded / res.total)) + '%';
            }
          }

          if (res.type == HttpEventType.Response && res.body != null) {
            this.publishers.push(res.body);
            this._toastr.success(
              `تم اضافة دار النشر : ${res.body!.name}, بنجاح`,
              'تمت العملية'
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private UpdatePublisher() {
    const request = this.publisherFormGroup.value as IUpdatePublisherDto;
    console.log(request);
    this._publisherService
      .UpdatePublisher(this.publisherId, request)
      .subscribe({
        next: (res) => {
          if (res.type == HttpEventType.UploadProgress && request.logo) {
            if (res.total) {
              //not equal to null update progress
              this.progressValue =
                Math.round(100 * (res.loaded / res.total)) + '%';
            }
          }

          if (res.type == HttpEventType.Response) {
            let publisherIndex = this.publishers.findIndex(
              (p) => p.id == res.body?.id
            );

            this.publishers[publisherIndex].name = res.body!.name;
            this.publishers[publisherIndex].logo = request.logo
              ? res.body!.logo
              : this.publishers[publisherIndex].logo;

            this._toastr.success(
              `تم تحديث دار النشر : ${this.publishers[publisherIndex].name}, بنجاح`,
              'تمت العملية'
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  HandleOnEdit(publisherId: number) {
    this._publisherService.GetPublisherById(publisherId).subscribe((res) => {
      this.publisherFormGroup.controls['logo'].clearValidators();
      this.publisherFormGroup.controls['logo'].updateValueAndValidity();

      this.formType = 'update';
      this.buttonLabel = 'تحديث';
      this.imagePreview = `${this.imagesUrl}/${res.logo}`;
      this.publisherNameInput.setValue(res.name);
      this.publisherId = res.id;
    });
  }

  HandleOnDelete(publisherId: number) {
    this._publisherService.DeletePublisher(publisherId).subscribe({
      next: () => {
        this._toastr.success('تم حذف دار النشر بنجاح', 'تمت العملية');
        this.publishers = this.publishers.filter((c) => c.id != publisherId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ResetForm() {
    this.formType = 'create';
    this.buttonLabel = 'انشاء';
    this.imagePreview = '';
    this.progressValue = '0%';
    this.publisherFormGroup.reset();

    this.publisherFormGroup.controls['logo'].setValidators([
      Validators.required,
    ]);
    this.publisherFormGroup.controls['logo'].updateValueAndValidity();
    console.log('form is reset back to create mode');
  }

  HandleFileInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files!;
    if (files.length > 0) {
      // file exist
      this.publisherLogoInput.setValue(files[0]);
    }
    console.log('file input changed : ' + files);
  }
}
