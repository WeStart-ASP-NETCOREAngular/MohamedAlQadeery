import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ITagResponseDto } from 'src/app/interfaces/tag/ITagResponseDto';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.css'],
})
export class AdminTagsComponent implements OnInit {
  tags: ITagResponseDto[] = [];

  constructor(
    private _TagService: TagService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._TagService.GetAllTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  HandleOnDelete(id: number) {
    this._TagService.DeleteTag(id).subscribe({
      next: () => {
        this._toastr.info('Tag has been deleted successfully!');
        this.tags = this.tags.filter((c) => c.id != id);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
