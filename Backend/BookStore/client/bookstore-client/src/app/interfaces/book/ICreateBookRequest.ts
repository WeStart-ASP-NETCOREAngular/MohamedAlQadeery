export interface ICreateBookRequest {
  name: string;
  price: number;
  discount?: number;
  ImageFile: File;
  about: string;
  publishYear?: number;
  pageCount?: number;
  authorId?: number;
  translatorId?: number;
  publisherId?: number;
  categoryId?: number;
}
