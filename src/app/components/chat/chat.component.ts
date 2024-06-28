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
import { socket } from '../../app.component';

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

  ngOnInit() {
    this.chatStore.dispatch(getOldMessages());
    if (socket) {
      socket.onmessage = (e) => {
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

  getTime(timestamp: number | undefined) {
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
}
