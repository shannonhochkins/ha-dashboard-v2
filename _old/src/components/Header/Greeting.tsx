import { useHass, useEntity } from "@hakit/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { HassUser } from "home-assistant-js-websocket";
import styled from "@emotion/styled";

const Heading = styled.h1`
  color: var(--ha-S50-contrast);
  margin: 0;
`;

function getGreetingBasedOnTime(timeString: string): string {
  // Extract hours from the time string
  const hours = parseInt(timeString.split(":")[0], 10);
  // Define the greeting based on the hours
  if (hours >= 5 && hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

export function Greeting() {
  const [user, setUser] = useState<HassUser | null>(null);
  const requested = useRef(false);
  const { getUser } = useHass();
  const timeSensor = useEntity("sensor.time");
  useEffect(() => {
    if (requested.current) return;
    requested.current = true;
    (async () => {
      const user = await getUser();
      setUser(user);
    })();
  }, [getUser]);

  const greeting = useMemo(() => {
    try {
      return getGreetingBasedOnTime(timeSensor.state);
    } catch (e) {
      return "Hi";
    }
  }, [timeSensor.state]);

  if (!greeting) {
    return null;
  }
  return (
    <Heading>
      {greeting}
      {user ? `, ${user?.name.split(" ").shift()}` : ""}
    </Heading>
  );
}
