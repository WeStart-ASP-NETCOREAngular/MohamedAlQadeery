import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  showAlert = false;
  alertMessage = '';

  imagesUrl = `${environment.baseURL}/images`;

  imagePreview = '';
  progressValue = '';
  constructor(private _publisherService: PublisherService) {}

  ngOnInit(): void {
    this.publisherNameInput = new FormControl('', [Validators.required]);
    this.publisherLogoInput = new FormControl('');

    this.publisherFormGroup = new FormGroup({
      name: this.publisherNameInput,
      logo: this.publisherLogoInput,
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
            this.imagePreview = `${this.imagesUrl}/${res.body.logo}`;
          }

          this.ShowAlertMessage('تم اضافة/تحديث البيانات');
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
          }

          this.ShowAlertMessage('تم اضافة/تحديث البيانات');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  HandleOnEdit(publisherId: number) {
    this._publisherService.GetPublisherById(publisherId).subscribe((res) => {
      this.publisherFormGroup.controls['logo'].clearValidators();
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
        this.ShowAlertMessage('تم حذف دار النشر بنجاح');
        this.publishers = this.publishers.filter((c) => c.id != publisherId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ShowAlertMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  private ResetForm() {
    this.ShowAlertMessage('تم انشاء/تحديث البيانات بنجاح');
    this.formType = 'create';
    this.buttonLabel = 'انشاء';

    this.publisherFormGroup.reset();
  }

  HandleFileInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files!;
    if (files.length > 0) {
      // file exist
      this.publisherLogoInput.setValue(files[0]);
    }
    console.log(files);
  }
}
