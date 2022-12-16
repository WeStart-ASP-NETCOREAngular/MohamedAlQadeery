import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IContactusResponse } from 'src/app/interfaces/contact-us/IContactusDtos';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  messages: IContactusResponse[] = [];
  selectedMessage: IContactusResponse;
  showMessage = false;

  constructor(
    private _contactussService: ContactUsService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._contactussService.GetAllMessages().subscribe((res) => {
      this.messages = res;
    });
  }

  OnShowMessage(messageId: number) {
    this._contactussService.MarkMessageAsRead(messageId).subscribe({
      next: () => {
        this.selectedMessage = this.messages.find((m) => m.id == messageId)!;
        if (!this.selectedMessage.readAt) {
          this.selectedMessage.readAt = new Date();
          this._toastr.success(
            'تغير حالة الرسالة',
            'تم تحديث حالة الرسالة الى تم قرائتها'
          );
        }
        this.showMessage = true;
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }

  OnClickBack() {
    this.showMessage = false;
  }

  MarkAsUnRead(messageId: number) {
    this._contactussService.MarkMessageAsUnRead(messageId).subscribe({
      next: () => {
        this.selectedMessage = this.messages.find((m) => m.id == messageId)!;
        if (this.selectedMessage.readAt) {
          this.selectedMessage.readAt = null;
          this._toastr.success(
            'تغير حالة الرسالة',
            'تم تحديث حالة الرسالة الى لم يتم قرائتها'
          );
        }
        this.showMessage = true;
      },
      error: (err) => {
        this._toastr.error(err);
      },
    });
  }
}
