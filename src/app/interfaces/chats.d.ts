export default interface MessageInterface {
  userId?: string;
  messageText: string;
  timestampSent?: Date;
  sessionState?: string;
}
