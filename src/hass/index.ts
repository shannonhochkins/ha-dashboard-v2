import { useEffect, ReactElement } from 'react'
import {
  getAuth,
  createConnection,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED,
  Auth,
  getAuthOptions as AuthOptions,
  UnsubscribeFunc,
} from "home-assistant-js-websocket";
import { useHass } from '@hooks';

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.HA_URL_PROD : process.env.HA_URL_DEV;

const getAuthOptions = (): AuthOptions => ({
  hassUrl: BASE_URL,
  async loadTokens() {
    try {
      return JSON.parse(localStorage.hassTokens);
    } catch (err) {
      return undefined;
    }
  },
  saveTokens: (tokens) => {
    localStorage.hassTokens = JSON.stringify(tokens);
  },
});

interface HassProps {
  children: ReactElement;
}

export const Hass = ({
  children
}: HassProps): ReactElement => {
  const { setEntities, setConnection, ready } = useHass();  
  let auth: Auth | null = null;
  let unsubscribe: UnsubscribeFunc;


  useEffect(() => {
    async function authenticate() {
      try {
        auth = await getAuth(getAuthOptions());
        if (auth.expired) {
          auth.refreshAccessToken();
        }
      } catch (err) {
        if (err === ERR_HASS_HOST_REQUIRED) {
          auth = await getAuth(getAuthOptions());
        } else {
          console.error(`Unknown error: ${err}`);
          return;
        }
      }
    
      const connection = await createConnection({ auth });
    
      unsubscribe = subscribeEntities(connection, 
      $entities => {
        setEntities($entities);
      });
    
      if (location.search.includes('auth_callback=1')) {
        history.replaceState(null, "", location.pathname);
      }
      setConnection(connection);
    }
    if (!ready) {
      authenticate();
    }
    if (unsubscribe) {
      return () => unsubscribe();
    }
  }, []);

  
  return ready ? children : null;
}
