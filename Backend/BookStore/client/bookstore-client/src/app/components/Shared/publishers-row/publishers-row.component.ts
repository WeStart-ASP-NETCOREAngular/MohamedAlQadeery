import { Component, OnInit } from '@angular/core';
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
  constructor(private _publisherService: PublisherService) {}
  imagesUrl = `${environment.baseURL}/images/thumbs/small`;
  publishers$: Observable<IPublisherResponse[]>;

  ngOnInit(): void {
    this.publishers$ = this._publisherService.GetAllPublishers({
      takeCount: 6,
    });
  }
}
