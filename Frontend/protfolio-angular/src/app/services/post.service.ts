import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _posts: IPost[] = [
    {
      id: 1,
      title: 'First Post',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores expedita aperiam veritatis,
       placeat necessitatibus rerum ut voluptas dignissimos voluptatum adipisci`,
      createdAt: new Date(),
    },

    {
      id: 2,
      title: 'Second Post',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores expedita aperiam veritatis,
       placeat necessitatibus rerum ut voluptas dignissimos voluptatum adipisci`,
      createdAt: new Date(),
    },

    {
      id: 3,
      title: 'Third Post',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores expedita aperiam veritatis,
       placeat necessitatibus rerum ut voluptas dignissimos voluptatum adipisci`,
      createdAt: new Date('2022-11-22'),
    },
  ];
  constructor() {}

  public GetAllPosts(): IPost[] {
    return this._posts;
  }

  public GetPostById(id: number): IPost | undefined {
    return this._posts.find((p) => p.id == id);
  }
}
