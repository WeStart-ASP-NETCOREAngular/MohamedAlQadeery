import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPublisherResponse } from 'src/app/interfaces/publisher/PublisherDtos';
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
  publisherId: number;
  publishers: IPublisherResponse[] = [];

  showAlert = false;
  alertMessage = '';

  imagesUrl = `${environment.baseURL}/images`;
  constructor(private _publisherService: PublisherService) {}

  ngOnInit(): void {
    this.publisherNameInput = new FormControl('', [Validators.required]);
    this.publisherFormGroup = new FormGroup({
      name: this.publisherNameInput,
    });

    this._publisherService.GetAllPublishers().subscribe((res) => {
      this.publishers = res;
    });
  }

  HandleOnSubmit() {
    console.log(this.publisherFormGroup.value);

    this.ResetForm();
  }

  HandleOnEdit(publisherId: number) {
    this._publisherService.GetPublisherById(publisherId).subscribe((res) => {
      this.formType = 'update';
      this.buttonLabel = 'تحديث';
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
}
