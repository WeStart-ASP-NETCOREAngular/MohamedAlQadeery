import { IAuthorResponse } from '../author/IAuthorResponse';
import { ICategoryResponseDto } from '../category/ICategoryResponseDto';
import { IPublisherResponse } from '../publisher/PublisherDtos';

export interface IBookResponse {
  id: number;
  price: number;
  name: string;
  category: ICategoryResponseDto;
  author: IAuthorResponse;
  publisher: IPublisherResponse;

  image: string;
}
