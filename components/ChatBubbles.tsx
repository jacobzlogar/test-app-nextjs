import { useContext } from "react";
import { Message, MessageContext } from "./Chat";
import ChatBubble from "./ChatBubble";

export default function ChatBubbles() {
  const messages = useContext(MessageContext);
  return (
    <>
      {messages.map(function (m: Message) {
          return <ChatBubble message={m} />
      })}
    </>
  );
}
