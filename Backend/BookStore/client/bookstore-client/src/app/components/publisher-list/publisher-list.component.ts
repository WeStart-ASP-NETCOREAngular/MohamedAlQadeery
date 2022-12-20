import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPublisherResponse } from 'src/app/interfaces/publisher/PublisherDtos';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css'],
})
export class PublisherListComponent implements OnInit {
  constructor(private _publisherService: PublisherService) {}
  publishers$: Observable<IPublisherResponse[]>;
  ngOnInit(): void {
    this.publishers$ = this._publisherService.GetAllPublishers();
  }
}
