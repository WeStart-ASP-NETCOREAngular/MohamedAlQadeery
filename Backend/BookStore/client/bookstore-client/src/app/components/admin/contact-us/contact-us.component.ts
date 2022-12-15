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

  constructor(
    private _contactussService: ContactUsService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._contactussService.GetAllMessages().subscribe((res) => {
      this.messages = res;
    });
  }
}
