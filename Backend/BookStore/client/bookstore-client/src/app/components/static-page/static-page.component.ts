import { Component, OnInit } from '@angular/core';
import { IStaticPageResponse } from 'src/app/interfaces/static-pages/IStaticPagesDtos';
import { StaticPagesService } from 'src/app/services/static-pages.service';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css'],
})
export class StaticPageComponent implements OnInit {
  constructor(private _staticPageService: StaticPagesService) {}
  page: IStaticPageResponse;
  ngOnInit(): void {
    this._staticPageService.GetAllStaticPages().subscribe((res) => {
      this.page = res[0];
    });
  }
}
