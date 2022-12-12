import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISingleEventResponse } from '../interfaces/event/ISingleEventResponse';
import { IListEventResponse } from '../interfaces/event/IListEventResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = environment.baseURL + '/api/event';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<IListEventResponse[]> {
    return this.http.get<IListEventResponse[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<ISingleEventResponse> {
    return this.http.get<ISingleEventResponse>(`${this.baseUrl}/${id}`);
  }

  createEvent(event: ISingleEventResponse): Observable<ISingleEventResponse> {
    return this.http.post<ISingleEventResponse>(`${this.baseUrl}`, event);
  }

  updateEvent(
    id: number,
    event: ISingleEventResponse
  ): Observable<ISingleEventResponse> {
    return this.http.put<ISingleEventResponse>(`${this.baseUrl}/${id}`, event);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  joinEvent(eventId: number) {
    return this.http.post(`${this.baseUrl}/${eventId}/join-event`, {});
  }

  exitEvent(eventId: number) {
    return this.http.delete(`${this.baseUrl}/${eventId}/exit-event`);
  }
}
