import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Chat } from "../components/Chat";
import { MyModal } from "../components/Modal";

export class User {
  constructor(public userName: string, public id: string) {}
}

type DashboardState = {
  loggedIn: boolean;
  userName?: string;
  userId?: string;
  user?: User;
  handleUserNameUpdate(v: string): void;
  termsAccept(): void;
};
class Dashboard extends React.Component<any, DashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      handleUserNameUpdate: this.handleUserNameUpdate.bind(this),
      termsAccept: this.termsAccept.bind(this),
    };
  }
  componentDidMount() {
    const existingUserName = localStorage.getItem("userName");
    const existingUserId = localStorage.getItem("userId");
    if (existingUserName && existingUserId) {
      this.setState({
        loggedIn: true,
        user: new User(existingUserName, existingUserId),
        userId: existingUserId,
        userName: existingUserName,
      });
    }
  }
  termsAccept() {
    const id = nanoid();
    const user = new User(this.state.userName, id);
    this.setState({
      loggedIn: true,
      user: user,
      userId: user.id,
      userName: user.userName,
    });
    localStorage.setItem("userName", user.userName);
    localStorage.setItem("userId", user.id);
  }
  handleUserNameUpdate(value) {
    this.setState({
      userName: value,
    });
    localStorage.setItem("username", value);
  }
  render() {
    if (this.state.loggedIn) {
      return <Chat user={this.state.user} />;
    }
    return <MyModal {...this.state} />;
  }
}

export default function Home() {
  return (
    <div className="my-5 grid h-screen place-items-center">
      <Dashboard />
    </div>
  );
}
