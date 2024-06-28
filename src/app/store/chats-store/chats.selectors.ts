import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState, chatFeatureKey } from './chats.reducer';

const selectMessagesState = createFeatureSelector<ChatState>(chatFeatureKey);

export const selectMessages = createSelector(
  selectMessagesState,
  (state) => state.messages
);
