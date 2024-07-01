import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ChatService } from './services/chat.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TalkTakeTeach';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.initaliseSocket();
  }
}
