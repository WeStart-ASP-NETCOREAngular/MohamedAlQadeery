export interface IBookSuggestionResponse {
  id: number;
  email: string;
  bookName: string;
  publisherName: string;
  authorName: string;
  notes: string;
  readAt: Date | null;
  createdAt: Date;
}

export interface ICreateBookSuggestionDto {
  email: string;
  bookName: string;
  publisherName: string;
  authorNameName: string;
  notes: string;
}

export interface IUpdateBookSuggestionDto {
  email: string;
  bookName: string;
  publisherName: string;
  authorNameName: string;
  notes: string;
}
