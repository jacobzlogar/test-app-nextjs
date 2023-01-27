import { Message } from "./Chat";

type ChatBubbleProps = {
    message: Message;
}

export default function ChatBubble(props: ChatBubbleProps) {
  return (
    <div
      className="border border-gray-300 bg-white shadow rounded-md p-4 max-w-sm w-full mx-auto mb-4"
      key={props.message.id}
    >
      <div className="animate-pulse flex space-x-4">
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-small text-xs text-gray-600 dark:text-gray-300">
            {props.message.user.userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 space-y-6 py-1 text-xs grid row">
          <div>
            from <span className="font-bold">{props.message.user.userName}</span> at{" "}
            {props.message.sentAt}
          </div>
          {props.message.text}
        </div>
      </div>
    </div>
  );
}
