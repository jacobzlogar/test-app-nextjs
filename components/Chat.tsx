import React from "react";
import Pusher from "pusher-js";
import State from "pusher-js/types/src/core/http/state";
import { nanoid } from "nanoid";
import { User } from "../pages/index";

type ChatProps = {
  user: User;
};

type Message = {
  id: string;
  user: User;
  text: string;
  sentAt?: number;
};

type ChatState = {
  user: User;
  messages?: Message[];
  message?: Message;
};

export class Chat extends React.Component<ChatProps, ChatState> {
  public pusher: Pusher;
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      user: props.user,
      messages: [],
      message: {
        user: props.user,
        id: nanoid(),
        text: "",
      },
    };
    this.pusher = new Pusher("app-key", {
      wsHost: "soketi-test-app-headless.default.svc.cluster.local",
      wsPort: 6001,
      forceTLS: false,
      cluster: "localhost",
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });
    this.pusher.channels.add("chat-room", this.pusher);
    //this.pusher.authenticateUser(socketId, userData);
    this.pusher.channel("chat-room").bind(
      "client-message",
      function (data: Message) {
        let msgs = this.state.messages;
        let messages = msgs.map((m: Message) => {
          if (m.id === data.id) {
            return data;
          } else {
            return m;
          }
        });
        let existing = messages.find((m: Message) => m.id === data.id);
        if (!existing) {
          messages.push(data);
        }
        this.setState({ messages: messages });
      }.bind(this)
    );
  }

  handleMessage(event) {
    let message = this.state.message;
    message.text = event.target.value;
    if (!message.sentAt) {
      message.sentAt = Date.now();
    }
    this.pusher.channel("chat-room").trigger("client-message", { ...message });
    this.setState({ message: message });
  }
  render() {
    return (
      <div>
        {this.state.messages && this.state.messages.length > 0 && (
          <span>
            {this.state.messages.map(function (message: Message) {
              return (
                <div
                  className="border border-gray-300 bg-white shadow rounded-md p-4 max-w-sm w-full mx-auto mb-4"
                  key={message.id}
                >
                  <div className="animate-pulse flex space-x-4">
                    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="font-small text-xs text-gray-600 dark:text-gray-300">
                        {message.user.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 space-y-6 py-1 text-xs grid row">
                      <div>
                        from{" "}
                        <span className="font-bold">
                          {message.user.userName}
                        </span>{" "}
                        at {message.sentAt}
                      </div>
                      {message.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </span>
        )}
        <div className="flex justify-center place-items-center backdrop-saturate-125">
          <div className="rounded-lg shadow-lg content-center bg-white max-w-sm w-96">
            <div className="m-5">
              <div className="relative rounded-md shadow-sm">
                <div className="relative">
                  <div className="grid grid-row mb-4">
                    <span className="font-small text-xs text-black">
                      <span className="font-bold">name: </span>
                      {this.state.user.userName}
                    </span>
                    <span className="font-small text-xs text-black">
                      <span className="font-bold">id: </span>
                      {this.state.user.id}
                    </span>
                  </div>
                </div>
                <textarea
                  name="chat"
                  id="chat"
                  onChange={this.handleMessage.bind(this)}
                  value={this.state.message.text}
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-3"
                  placeholder=""
                />
                <button className="group mt-2 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
