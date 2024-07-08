import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState, chatFeatureKey } from './chats.reducer';

const selectMessagesState = createFeatureSelector<ChatState>(chatFeatureKey);

export const selectMessages = createSelector(selectMessagesState, (state) => {
  return state.messages.map((message) => {
    let date: Date;
    if (message.timestampSent) {
      date = new Date(message.timestampSent);
    } else {
      date = new Date();
    }

    const time = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    return {
      ...message,
      timeSent: time,
      userId: 'user_' + message.userId.substring(0, 8),
    };
  });
});
