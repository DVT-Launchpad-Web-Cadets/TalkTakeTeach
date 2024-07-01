import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatState } from '../../store/chats-store/chats.reducer';
import { Store } from '@ngrx/store';
import { sendNewMessage } from '../../store/chats-store/chats.actions';
import { selectMessages } from '../../store/chats-store/chats.selectors';
import MessageInterface from '../../interfaces/chats';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  chatStore: Store<ChatState> = inject(Store);
  messages$ = this.chatStore.select(selectMessages);

  chatService: ChatService = inject(ChatService);
  clientID = crypto.randomUUID().toString();

  messageForm = new FormGroup({
    message: new FormControl(''),
  });

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
    }
  }
}
