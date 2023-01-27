import { Config } from "../composables/config";
import Pusher from "pusher-js";

const config = new Config();

export const createPusher = () => {
  const pusher = new Pusher("app-key", {
    wsHost: config.url(),
    wsPort: 6001,
    forceTLS: false,
    cluster: "localhost",
    disableStats: true,
    enabledTransports: ["ws", "wss"],
  });
  return pusher;
};
