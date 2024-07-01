import { createAction, props } from '@ngrx/store';
import MessageInterface from '../../interfaces/chats';

export const getOldMessages = createAction('[Chat] Get all messages');

export const getOldMessagesComplete = createAction(
  '[Chat] Get all messages complete',
  props<{ messages: MessageInterface[] }>()
);

export const sendNewMessage = createAction(
  '[Chat] Send new message',
  props<{ message: MessageInterface }>()
);

export const handleNewMessage = createAction(
  '[Chat] Handle new message',
  props<{ message: MessageInterface }>()
);
