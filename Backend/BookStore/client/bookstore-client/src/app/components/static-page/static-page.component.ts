import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { IStaticPageResponse } from 'src/app/interfaces/static-pages/IStaticPagesDtos';
import { StaticPagesService } from 'src/app/services/static-pages.service';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css'],
})
export class StaticPageComponent implements OnInit {
  constructor(
    private _staticPageService: StaticPagesService,
    private _route: ActivatedRoute
  ) {}
  page$: Observable<IStaticPageResponse>;
  ngOnInit(): void {
    //localhost:4200/aboutus
    let slug = this._route.snapshot.url.join(''); //aboutus

    this.page$ = this._staticPageService.GetStaticPageSlug(slug);
  }
}
