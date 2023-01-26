import { Config } from "../composables/config";
type Message = {
  userId: string;
  text: string;
};
export class MessageApi {
  public config: Config;
  public url: string;

  constructor() {
    this.config = new Config();
    this.url = this.config.nest_api_url();
  }
  storeMessage = async (msg: Message) => {
    fetch(`${this.url}/message`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
}
