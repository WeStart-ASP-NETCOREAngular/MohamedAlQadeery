import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPublisherResponse } from 'src/app/interfaces/publisher/PublisherDtos';
import { PublisherService } from 'src/app/services/publisher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-publishers-row',
  templateUrl: './publishers-row.component.html',
  styleUrls: ['./publishers-row.component.css'],
})
export class PublishersRowComponent implements OnInit {
  constructor(private _route: Router) {}
  imagesUrl = `${environment.baseURL}/images/thumbs/med`;
  @Input() publishers$: Observable<IPublisherResponse[]>;
  currentUrl = '';
  ngOnInit(): void {
    this.currentUrl = this._route.url;
  }
}
