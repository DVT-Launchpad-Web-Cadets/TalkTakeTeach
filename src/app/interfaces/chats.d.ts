export default interface MessageInterface {
  userId?: string;
  messageText: string;
  timestampSent?: number;
  sessionState?: string;
}
