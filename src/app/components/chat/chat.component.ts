import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatState } from '../../store/chats-store/chats.reducer';
import { Store } from '@ngrx/store';
import {
  getOldMessages,
  handleNewMessage,
  sendNewMessage,
} from '../../store/chats-store/chats.actions';
import { selectMessages } from '../../store/chats-store/chats.selectors';
import MessageInterface from '../../interfaces/chats';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  chatStore: Store<ChatState> = inject(Store);
  messages$ = this.chatStore.select(selectMessages);

  chatService: ChatService = inject(ChatService);
  socket: WebSocket | undefined;

  ngOnInit() {
    this.chatService.socket$.subscribe((socket) => {
      this.socket = socket;
    });
    this.chatStore.dispatch(getOldMessages());
    if (this.socket) {
      this.socket.onmessage = (e) => {
        const event = JSON.parse(e.data.toString());
        const newMessage: MessageInterface = event.data;
        this.chatStore.dispatch(handleNewMessage({ message: newMessage }));
      };
    }
  }

  sendMessage() {
    const input = document.getElementById('input') as HTMLInputElement;
    const message: MessageInterface = {
      messageText: input.value,
    };
    this.chatStore.dispatch(sendNewMessage({ message }));
  }
}
