import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/interfaces/IPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent implements OnInit {
  post!: IPost;
  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((para) => {
      let id = para.get('id')!;
      this.post = this._postService.GetPostById(+id)!;
    });
  }
}
