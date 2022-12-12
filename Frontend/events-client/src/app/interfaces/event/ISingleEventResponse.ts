import { ICategoryResponseDto } from '../category/ICategoryResponseDto';
import { ITagResponseDto } from '../tag/ITagResponseDto';

export interface ISingleEventResponse {
  id: number;
  name: string;
  createdAt: Date;
  ownerId: string;
  category: ICategoryResponseDto;
  tags: ITagResponseDto[];
  image: string;
  description: string;
  time: string;
  location: string;
  startDate: Date;
}
