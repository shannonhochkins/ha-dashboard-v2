import { FilterByDomain, EntityName, AllDomains } from "@hakit/core";

import { WeatherCardProps } from "./components/WeatherCard";
import { AreaCardProps, SidebarCardProps } from "@hakit/components";
import { ReactNode } from "react";
import { Connection } from "home-assistant-js-websocket";

interface AreaProps {
  [key: string]: {
    card?: Partial<AreaCardProps>;
    modal: {
      featureComponent: ReactNode;
    };
    entities?: {
      automatic?: boolean;
      /** related area entities (custom entities don't have unique ids so they can't be attached to an area), or entities that technically could appear in multiple areas */
      related?: EntityName[];
      domainOrder?: "alphabetical" | AllDomains[];
      domain: {
        whitelist?: string[];
        blacklist?: string[];
        titles?: {
          [key in AllDomains]: string;
        };
      };
      entity: {
        whitelist?: string[];
        blacklist?: string[];
      };
    };
  };
}

interface RenderPanelArgs {
  connection: Connection;
}

interface FeaturePanel {
  children: (args: RenderPanelArgs) => ReactNode;
}

interface ScreenSaverOptions {
  enabled?: boolean;
  /** the entity to use for the screen saver */
  entity: FilterByDomain<EntityName, "weather">;
  /** duration of time that must pass before the screen saver is shown after no activity is detected, default is 2 minutes @default 120000*/
  duration?: number;
  /** the blur amount on the background video @default 5 */
  blur?: number;
}

export interface Configuration {
  weather?: {
    /** used for the primary weather widget on the main dashboard, screen saver and more */
    entity: FilterByDomain<EntityName, "weather">;
    /** the options / props to pass to the weather card */
    options: Omit<WeatherCardProps, "entity">;
  };
  screenSaver?: ScreenSaverOptions;
  featurePanel: FeaturePanel[];
  sidebar?: SidebarCardProps;
  areas?: AreaProps;
}
