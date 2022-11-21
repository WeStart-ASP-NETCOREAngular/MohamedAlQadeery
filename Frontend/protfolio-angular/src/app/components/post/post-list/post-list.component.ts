import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/IPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: IPost[] = [];
  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.posts = this._postService.GetAllPosts();
  }
}
