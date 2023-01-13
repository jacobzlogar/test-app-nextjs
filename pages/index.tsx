import React from "react";
import Pusher from "pusher-js";
import State from "pusher-js/types/src/core/http/state";

type ChatProps = {
  name: string;
};

type ChatState = {
  name: string;
  messages: string[];
  message: string;
};

class Chat extends React.Component<ChatProps, ChatState> {
  public pusher: Pusher;
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      name: props.name,
      messages: [],
      message: "",
    };
    this.pusher = new Pusher("app-key", {
      appId: "app-id",
      key: "app-key",
      wsHost: "127.0.0.1",
      wsPort: 6001,
      secret: "app-secret",
      forceTLS: false,
      encrypted: true,
      cluster: "localhost",
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });
    this.pusher.channels.add("chat-room", this.pusher);
    //this.pusher.authenticateUser(socketId, userData);
    this.pusher.channel("chat-room").bind(
      "client-message",
      function (data) {
        this.setState({ messages: [data.message] });
      }.bind(this)
    );
  }

  handleMessage(event) {
    this.pusher.channel("chat-room").trigger("client-message", {
      user: "bob",
      message: event.target.value,
    });
    this.setState({ message: event.target.value });
  }
  async foo() {
    const form = new FormData();
    form.append("value", this.state.message);
    await fetch("http://localhost:8080/chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ value: this.state.message }),
    })
      .then((res) => res.text())
      .then((result) => result);
    //this.channel.trigger("client-my-event", this.state.message);
  }
  render() {
    return (
      <div>
        <div>{this.state.messages[0]}</div>
        <div className="flex justify-center place-items-center backdrop-saturate-125">
          <div className="rounded-lg shadow-lg content-center bg-white max-w-sm w-96">
            <div className="m-5">
              <div className="relative mt-1 rounded-md shadow-sm">
                <textarea
                  name="chat"
                  id="chat"
                  rows="6"
                  onChange={this.handleMessage.bind(this)}
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder=""
                />
                <button
                  disabled={true}
                  onClick={this.foo.bind(this)}
                  className="group mt-2 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default function Home() {
  const chatProps = {
    name: "bob",
  };
  return (
    <div className="my-5 grid h-screen place-items-center">
      <Chat {...chatProps} />
    </div>
  );
}
