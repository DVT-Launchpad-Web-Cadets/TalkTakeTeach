import { createAction, props } from '@ngrx/store';
import MessageInterface from '../../interfaces/chats';

export const getOldMessages = createAction('[Chat Component] Get all messages');

export const getOldMessagesComplete = createAction(
  '[Chat Component] Get all messages complete',
  props<{ messages: MessageInterface[] }>()
);

export const getOldMessagesFailure = createAction(
  '[Chat Componenent] Get all messages failed',
  props<{ error: string }>()
);

export const sendNewMessage = createAction(
  '[Chat Component] Send new message',
  props<{ message: MessageInterface }>()
);

export const handleNewMessage = createAction(
  '[Chat Component] Handle new message',
  props<{ message: MessageInterface }>()
);
