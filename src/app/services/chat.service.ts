import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import MessageInterface from '../interfaces/chats';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'localhost:3000/chat';

  constructor(private http: HttpClient) {}

  getOldMessages(): Observable<MessageInterface[]> {
    return this.http.get<MessageInterface[]>(this.url);
  }

  sendNewMessage(message: MessageInterface): Observable<void> {
    return this.http.post<void>(this.url, message);
  }
}
