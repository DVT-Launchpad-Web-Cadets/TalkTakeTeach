import { createReducer, on } from '@ngrx/store';
import MessageInterface from '../../interfaces/chats';
import { handleNewMessage, getOldMessagesComplete } from './chats.actions';

export const chatFeatureKey = 'Chat';

export interface ChatState {
  messages: MessageInterface[];
}

export const initialState: ChatState = {
  messages: [],
};

export const chatReducer = createReducer(
  initialState,
  on(getOldMessagesComplete, (state, { messages }) => ({
    ...state,
    messages,
  })),
  on(handleNewMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  }))
);
