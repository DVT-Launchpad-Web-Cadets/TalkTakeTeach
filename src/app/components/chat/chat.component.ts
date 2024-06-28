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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  chatStore: Store<ChatState> = inject(Store);
  messages$ = this.chatStore.select(selectMessages);

  chatService: ChatService = inject(ChatService);
  socket: WebSocket | undefined;

  clientID = crypto.randomUUID().toString();

  messageForm = new FormGroup({
    message: new FormControl(''),
  });

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
    const form = this.messageForm.getRawValue();
    if (form.message) {
      const message: MessageInterface = {
        messageText: form.message,
        userId: this.clientID,
        timestampSent: new Date(Date.now()),
      };
      this.chatStore.dispatch(sendNewMessage({ message }));
      this.messageForm.reset();

      const messagesEl = document.getElementById('messages') as HTMLDivElement;
      messagesEl.scrollTo(0, messagesEl.scrollHeight);
    }
  }

  getTime(timestamp: Date | undefined) {
    let date: Date;
    if (timestamp) {
      date = new Date(timestamp);
    } else {
      date = new Date(Date.now());
    }
    const time = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return time;
  }

  truncateUser(userId: string) {
    return 'user_' + userId.substring(0, 8);
  }
}
