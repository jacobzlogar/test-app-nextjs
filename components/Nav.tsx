import { MeiliSearch } from "meilisearch";
import React from "react";
import { User } from "../pages";
import { Search } from "./Search";

type NavProps = {
  user: User;
  search: MeiliSearch;
};
type NavState = {
  user: User;
};
export class Nav extends React.Component<NavProps, NavState> {
  public client: MeiliSearch;
  constructor(props: NavProps) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  render() {
    return (
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 shadow shadow-b-md shadow-t-none shadow-x-none">
        <div className="container flex flex-wrap items-center mx-auto flex-row grid grid-cols-3">
          <div className="flex items-center justify-self-start">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-6 mr-3 sm:h-9"
                alt="Flowbite Logo"
              />
            </a>
            <div className="flex flex-col">
              <span className="font-mono text-gray-900 dark:text-white">
                {this.state.user.userName}
              </span>
              <span className="font-mono text-gray-500 text-xs">
                {this.state.user.id}
              </span>
            </div>
          </div>
          <div className="flex flex-row mx-auto">
            <form action="#" method="GET" className="hidden lg:block">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <Search client={this.props.search} />
              </div>
            </form>
          </div>
          <div className="inline-flex"></div>
        </div>
      </nav>
    );
  }
}
