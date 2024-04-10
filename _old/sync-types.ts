import { typeSync } from "@hakit/core/sync";
import { config } from "dotenv";
config();

(async function () {
  await typeSync({
    url: process.env.VITE_HA_URL_PROD as string,
    token: process.env.VITE_HA_TOKEN as string,
  });
})();
