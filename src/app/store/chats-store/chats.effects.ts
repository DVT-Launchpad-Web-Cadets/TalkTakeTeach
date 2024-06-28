import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import {
  getOldMessages,
  getOldMessagesComplete,
  getOldMessagesFailure,
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
          catchError((error) => of(getOldMessagesFailure({ error })))
        )
      )
    )
  );

  sendNewMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendNewMessage),
        switchMap((action) =>
          this.chatService
            .sendNewMessage(action.message)
            .pipe(catchError((error) => of(getOldMessagesFailure({ error }))))
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private chatService: ChatService) {}
}
