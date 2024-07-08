import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, switchMap } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import {
  getOldMessages,
  getOldMessagesComplete,
  sendNewMessage,
} from './chats.actions';

@Injectable()
export class ChatEffects {
  getOldMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOldMessages),
      switchMap(() =>
        this.chatService.getOldMessages().pipe(
          map((messages) => {
            return getOldMessagesComplete({ messages });
          }),
          catchError((error) => {
            console.error('Error retrieving the message', error);
            return EMPTY;
          })
        )
      )
    )
  );

  sendNewMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendNewMessage),
        switchMap((action) =>
          this.chatService.sendNewMessage(action.message).pipe(
            catchError((error) => {
              console.error('Error sending message', error);
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private chatService: ChatService) {}
}
