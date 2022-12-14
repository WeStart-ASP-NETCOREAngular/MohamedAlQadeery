import { IAuthorResponse } from '../author/IAuthorResponse';
import { ICategoryResponseDto } from '../category/ICategoryResponseDto';
import { IPublisherResponse } from '../publisher/PublisherDtos';
import { ITranslatorResponse } from '../translator/TranslatorDtos';

export interface IBookResponse {
  id: number;
  price: number;
  name: string;
  category: ICategoryResponseDto;
  author: IAuthorResponse;
  publisher: IPublisherResponse;
  translator: ITranslatorResponse;
  about: string;
  discount: number;
  publishYear: number;
  pageCount: number;

  image: string;
}
