import React, { useState, useEffect, useCallback } from "react";
import Pusher from "pusher-js";
import { Config } from "../composables/config";
import { nanoid } from "nanoid";
import { User } from "../pages/index";
import { MessageApi } from "../composables/api";

type ChatProps = {
  user: User;
};

type Message = {
  id: string;
  user: User;
  text?: string;
  indexedAt?: number;
  sentAt?: number;
};

type ChatState = {
  user: User;
  messages?: Message[];
  message?: Message;
};

export default function Chat(props: ChatProps) {
  const [messageApi, setMessageApi] = useState<MessageApi>(new MessageApi());
  const [config, setConfig] = useState<Config>(new Config());
  const [user, setUser] = useState<User>(props.user);
  const [pusher, setPusher] = useState<Pusher>();
  useEffect(() => {
    const pusher = new Pusher("app-key", {
      wsHost: config.url(),
      wsPort: 6001,
      forceTLS: false,
      cluster: "localhost",
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });
    pusher.channels.add("chat-room", pusher);
    setPusher(pusher);
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

  const [messages, setMessages] = useState<Message[]>([]);
  return (
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
                  console.log(message);
                }}
                defaultValue={message?.text}
                value={message?.text ?? ""}
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-3 bg-white dark:bg-gray-300"
                placeholder=""
              />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  submitMessage();
                }}
                className="group mt-2 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-900 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
