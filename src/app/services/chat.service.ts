import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import MessageInterface from '../interfaces/chats';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Store } from '@ngrx/store';
import {
  getOldMessages,
  handleNewMessage,
} from '../store/chats-store/chats.actions';
import { ChatState } from '../store/chats-store/chats.reducer';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatUrl = environment.baseUrl + environment.chatSuffix;
  chatStore: Store<ChatState> = inject(Store);
  socket: WebSocket | undefined = undefined;

  initaliseSocket() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket = new WebSocket(environment.webSocketUrl);
      this.chatStore.dispatch(getOldMessages());
      if (this.socket) {
        this.socket.onmessage = (e) => {
          const event = JSON.parse(e.data.toString());
          const newMessage: MessageInterface = event.data;
          if (newMessage.messageText) {
            this.chatStore.dispatch(handleNewMessage({ message: newMessage }));
          }
        };
      }
    }
  }

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getOldMessages(): Observable<MessageInterface[]> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.get<MessageInterface[]>(this.chatUrl, {
      headers,
    });
  }

  sendNewMessage(message: MessageInterface): Observable<void> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post<void>(this.chatUrl, message, { headers });
  }
}
