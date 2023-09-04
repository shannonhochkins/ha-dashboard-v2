import { typeSync } from '@hakit/core/sync';
import { config } from 'dotenv';
config();

(async function () {
  await typeSync({
    url: import.meta.env.VITE_HA_URL_PROD,
    token: import.meta.env.VITE_HA_TOKEN,
  });
}())