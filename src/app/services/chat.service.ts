import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import MessageInterface from '../interfaces/chats';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'localhost:3000/chat';
  private socket = new BehaviorSubject<WebSocket | undefined>(undefined);
  socket$ = this.socket.asObservable();

  initaliseSocket(webSocket: WebSocket) {
    this.socket.next(webSocket);
  }

  constructor(private http: HttpClient) {}

  getOldMessages(): Observable<MessageInterface[]> {
    return this.http.get<MessageInterface[]>(this.url);
  }

  sendNewMessage(message: MessageInterface, uuid: string): Observable<void> {
    return this.http.post<void>(this.url, message, {
      headers: { userId: uuid },
    });
  }
}
