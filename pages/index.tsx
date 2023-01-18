import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Chat } from "../components/Chat";
import { Nav } from "../components/Nav";
import { AuthModal } from "../components/Modal";
import MeiliSearch from "meilisearch";

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
  public searchClient: MeiliSearch;
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      handleUserNameUpdate: this.handleUserNameUpdate.bind(this),
      termsAccept: this.termsAccept.bind(this),
    };

    this.searchClient = new MeiliSearch({
      host: `${process.env.NEXT_PUBLIC_CLUSTER_IP}:${process.env.NEXT_PUBLIC_CLUSTER_MEILISEARCH_PORT}`,
    });
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
  handleUserNameUpdate(value: string) {
    this.setState({
      userName: value,
    });
    localStorage.setItem("username", value);
  }
  render() {
    if (this.state.loggedIn) {
      return (
        <div className="bg-gray-100 dark:bg-gray-700">
          <Nav user={this.state.user} search={this.searchClient} />
          <div className="my-5 grid h-screen place-items-center">
            <Chat user={this.state.user} search={this.searchClient} />
          </div>
        </div>
      );
    }
    return <AuthModal {...this.state} />;
  }
}

export default function Home() {
  return <Dashboard />;
}
