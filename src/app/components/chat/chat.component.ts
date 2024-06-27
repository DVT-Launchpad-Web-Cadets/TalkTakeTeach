import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  private isBrowser: boolean;

  socket: WebSocket | undefined;
  numOfUsers = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.socket = new WebSocket('ws://localhost:3000/chat');
      if (this.socket) {
        this.socket.addEventListener('message', (e) => {
          const event = JSON.parse(e.data);

          switch (event.type) {
            case 'MESSAGES_ADD':
              this.addMessage(event.data);
              break;
            case 'MESSAGES_SET':
              this.setMessages(event.data);
              break;
            case 'USERS_ADD':
              this.addUser(event.data);
              break;
            case 'USERS_REMOVE':
              this.removeUser(event.data);
              break;
            case 'USERS_SET':
              this.setUsers(event.data);
              break;
          }
        });

        const formEl = document.getElementById('form');
        const input = document.getElementById('input') as HTMLInputElement;

        formEl?.addEventListener('submit', (event) => {
          // Prevent from submitting page
          event.preventDefault();

          this.socket?.send(
            JSON.stringify({
              text: input.value,
            })
          );

          // Clear the input
          input.value = '';
        });
      }
    }
  }

  addMessage(message: IMessage) {
    const messagesEl = document.getElementById('messages') as HTMLDivElement;

    if (message.username == undefined) {
      const notificationEl = document.createElement('div');
      // notificationEl.classList.add('alert');
      // notificationEl.classList.add('alert-info');
      notificationEl.classList.add(
        'text-sm',
        'p-2',
        'm-1',
        'w-fit',
        'text-center',
        'bg-slate-300',
        'flex',
        'self-center',
        'justify-center',
        'rounded-full'
      );

      // const notificationTextEl = document.createElement('span');
      notificationEl.innerText = message.text;
      // notificationEl.appendChild(notificationTextEl);

      messagesEl.appendChild(notificationEl);
    } else {
      const chatBubbleEl = document.createElement('div');
      chatBubbleEl.classList.add('chat', 'chat-start', 'w-fit');

      const chatBubbleHeader = document.createElement('div');
      chatBubbleHeader.classList.add('chat-header', 'italic');
      chatBubbleHeader.innerText = message.username;

      const date = new Date(message.timestamp);
      const time = `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      const timeEl = document.createElement('div');
      timeEl.classList.add('text-xs', 'font-light', 'self-end');
      timeEl.innerText = time;

      chatBubbleHeader.appendChild(timeEl);

      const chatTextBox = document.createElement('div');
      chatTextBox.classList.add(
        'chat-bubble',
        'flex',
        'flex-col',
        'min-w-[100px]'
      );
      chatTextBox.innerText = message.text;
      chatTextBox.appendChild(timeEl);

      chatBubbleEl.appendChild(chatBubbleHeader);
      chatBubbleEl.appendChild(chatTextBox);

      messagesEl.appendChild(chatBubbleEl);
    }

    // Scroll to bottom of messages element
    messagesEl.scrollTo(0, messagesEl.scrollHeight);
  }

  setMessages(messages: IMessage[]) {
    const messagesEl = document.getElementById('messages') as HTMLDivElement;
    messagesEl.innerHTML = ''; //clear and add all again messages
    messages.forEach((message) => this.addMessage(message));
  }

  addUser(username: string) {
    const el = document.createElement('h4');

    el.setAttribute('id', username);

    el.appendChild(document.createTextNode(username));
    const usersEl = document.getElementById('users') as HTMLDivElement;
    usersEl.appendChild(el);
  }

  removeUser(username: string) {
    const userEl = document.getElementById(username) as HTMLHeadingElement;
    userEl.outerHTML = '';
  }

  setUsers(usernames: string[]) {
    const usersEL = document.getElementById('users') as HTMLDivElement;
    usersEL.innerHTML = '';
    usernames.forEach((username) => {
      this.numOfUsers += 1;
      this.addUser(username);
    });
  }
}
export interface IUser {
  username: string;
}

export interface IMessage {
  text: string;
  username: string;
  timestamp: number;
}
