import { debounce } from "lodash";
import MeiliSearch from "meilisearch";
import React, { Ref } from "react";
import SearchPopover from "./SearchPopover";

type SearchProps = {
  client: MeiliSearch;
};
type SearchState = {
  query: string;
  hasResults: boolean;
  results: [],
};

export class Search extends React.Component<SearchProps, SearchState> {
  public client: MeiliSearch;
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: null,
      hasResults: false,
      results: [],
    };
    this.client = props.client;
  }

  debouncedSearch = debounce(() => {
    this.searchMessages();
  }, 600);

  handleInput(event) {
    this.setState({
      query: event.target.value,
    });
    this.debouncedSearch();
  }
  async searchMessages() {
    await this.client
      .index("messages")
      .search(this.state.query)
      .catch((e) => {
        console.log(e);
      })
      .then((res: any) => {
        this.setState({
          hasResults: res.nbHits > 0 ? true : false,
          results: res.hits,
        });
      });
  }

  render() {
    return (
      <span>
        <div>
          <input
            type="text"
            onInput={this.handleInput.bind(this)}
            name="email"
            id="topbar-search"
            className="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search"
          />
        </div>
        <div>
        {this.state.hasResults && this.state.results.length > 0 && <SearchPopover />}
        </div>
      </span>
    );
  }
}
