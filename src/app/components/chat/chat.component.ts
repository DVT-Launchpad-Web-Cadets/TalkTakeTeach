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
    const el = document.createElement('h3');

    if (message.username == undefined) {
      el.appendChild(document.createTextNode(message.text));
    } else {
      el.appendChild(
        document.createTextNode(message.username + ': ' + message.text)
      );
    }

    // Scroll to bottom of messages element
    const messagesEl = document.getElementById('messages') as HTMLDivElement;
    messagesEl.appendChild(el);
    messagesEl.scrollTo(0, messagesEl.scrollHeight);
  }

  // might use this later
  // notifyChat(message: IMessage) {
  //   const el = document.createElement('div');

  //   el.appendChild(
  //     document.createTextNode(message.username + ' ' + message.text)
  //   );

  //   const messagesEl = document.getElementById('messages') as HTMLDivElement;
  //   messagesEl.appendChild(el);
  //   messagesEl.scrollTo(0, messagesEl.scrollHeight);
  // }

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
    usernames.forEach((username) => this.addUser(username));
  }
}
export interface IUser {
  username: string;
}

export interface IMessage {
  text: string;
  username: string;
}
