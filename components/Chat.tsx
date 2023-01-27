import React, { useState, useEffect, useCallback, createContext } from "react";
import { nanoid } from "nanoid";
import { User } from "../pages/index";
import { MessageApi } from "../composables/api";
import { createPusher } from "../composables/pusher";
import Pusher from "pusher";
import ChatBubble from "./ChatBubble";
import ChatBubbles from "./ChatBubbles";

type ChatProps = {
  user: User;
};

export type Message = {
  id: string;
  user: User;
  text?: string;
  indexedAt?: number;
  sentAt?: number;
};

export const MessageContext = createContext([]);
export default function Chat(props: ChatProps) {
  const [messageApi, setMessageApi] = useState<MessageApi>(new MessageApi());
  const [user, setUser] = useState<User>(props.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pusher, setPusher] = useState(createPusher());
  useEffect(() => {
    pusher.channels.add("chat-room", pusher);
    pusher
      .channel("chat-room")
      .bind("client-message", function (data: Message) {
        const msgs = [...messages];
        const exists = msgs.find((m) => m.id === data.id);
        if (exists) {
          exists.text = data.text;
        } else {
          msgs.push(data);
        }
        setMessages(msgs);
      });
  }, []);

  const [message, setMessage] = useState<Message>({
    user: props.user,
    id: nanoid(8),
  });

  const resetMessage = async () => {
    const update = { ...message, text: null, id: nanoid(8) };
    setMessage((message) => ({
      ...message,
      ...update,
    }));
  };

  const submitMessage = async () => {
    messageApi.storeMessage({
      userId: user.id,
      text: message.text,
    });
    await resetMessage();
  };

  const handleChange = async (e) => {
    const update = { ...message, text: e.target.value };
    setMessage((message) => ({
      ...message,
      ...update,
    }));
    pusher.channel("chat-room").trigger("client-message", { ...message });
  };
  return (
    <>
      <MessageContext.Provider value={messages}>
        <ChatBubbles />
      </MessageContext.Provider>
      <div className="flex justify-center place-items-center backdrop-saturate-125">
        <div className="rounded-lg shadow-lg content-center bg-white dark:bg-gray-900 max-w-sm w-96">
          <div className="m-5">
            <div className="relative rounded-md shadow-sm">
              <form onSubmit={resetMessage}>
                <textarea
                  name="chat"
                  id="chat"
                  onInput={(event) => {
                    handleChange(event);
                  }}
                  defaultValue={message?.text}
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-3 bg-white dark:bg-gray-300"
                  placeholder=""
                />
                <button
                  disabled={true}
                  onClick={(event) => {
                    event.preventDefault();
                    submitMessage();
                  }}
                  className="cursor-not-allowed group mt-2 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-900 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
