import {
  AllDomains,
  EntityName,
  FilterByDomain,
  HassEntityWithService,
} from "@hakit/core";
import { ReactNode } from "react";
import { Office } from "@components/Areas/Office";
import { OutdoorKitchen } from "@components/Areas/OutdoorKitchen";
import { Living } from "@components/Areas/Living";
import { FrontHouse } from "@components/Areas/FrontHouse";
import { Dining } from "@components/Areas/Dining";
import { Garage } from "@components/Areas/Garage";
import { Kitchen } from "@components/Areas/Kitchen";
import { MasterBedroom } from "@components/Areas/MasterBedroom";
import { WeatherSchema, ForecastAttribute } from "@components/Widgets/Weather";
import { HassEntity } from "home-assistant-js-websocket";

const KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface AreaProps {
  [key: string]: {
    card?: {
      icon: string;
      title?: ReactNode;
      description?: ReactNode;
    };
    modal?: {
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

interface ScreenSaverOptions {
  enabled?: boolean;
  /** the entity to use for the screen saver */
  entity: FilterByDomain<EntityName, "weather">;
  /** duration of time that must pass before the screen saver is shown after no activity is detected, default is 2 minutes @default 120000*/
  duration?: number;
  /** the blur amount on the background video @default 5 */
  blur?: number;
}

interface WeatherData {
  entity: HassEntityWithService<"weather"> | null;
  daily: ForecastAttribute[];
  hourly: ForecastAttribute[];
  related: HassEntity[];
}

export type WeatherOptions = {
  /** used for the primary weather widget on the main dashboard, screen saver and more, icons etc */
  entity?: FilterByDomain<EntityName, "weather">;
  /** any related entities that are directly related to weather can be provided here, they're then passed to the preFormat method, where you can optionally format the data before it's sent to the UI */
  related?: EntityName[];
  /** This method is called before the page renders, it will receive all the related entities as well as the main entity where you can format the data into the required structure
   * NOTE: You can also ignore the entities altogether and make an API call here, just make sure to return the data in the correct format
   *  */
  preFormat?: (data: WeatherData) => Promise<WeatherSchema>;
};

export interface Configuration {
  weather?: WeatherOptions;
  calendar?: {
    /** used for the primary calendar widget on the main dashboard */
    entities: FilterByDomain<EntityName, "calendar">[];
  };
  cameras?: {
    entities: FilterByDomain<EntityName, "camera">[];
  };
  /** used for the primary calendar widget on the main dashboard */
  climate?: {
    entity: FilterByDomain<EntityName, "climate">;
  };
  screenSaver?: ScreenSaverOptions;
  areas?: AreaProps;
}

export type WeatherTypes =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Mist"
  | "Haze"
  | "Smoke"
  | "Dust"
  | "Ash"
  | "Squall"
  | "Tornado"
  | "Fog"
  | "Clear"
  | "Clouds";

interface Shared {
  dt: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  clouds: number;
  dew_point: number;
  uvi: number;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface Weather {
  id: number;
  main: WeatherTypes;
  description: string;
  icon: string;
}

interface CurrentWeather extends Shared {
  feels_like: number;
  temp: number;
  visibility: number;
  weather: Weather[];
}
export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyWeather extends Shared {
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  temp: Temp;
  weather: Weather[];
  moon_phase: number;
  moon_rise: number;
  moonset: number;
  pop: number;
}

export interface HourlyWeather extends Shared {
  weather: Weather[];
  temp: number;
  pop: number;
}

export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  daily: DailyWeather[];
  hourly: HourlyWeather[];
  error: string;
}

export const configuration: Configuration = {
  weather: {
    entity: "weather.freesia",
    async preFormat(data) {
      console.log("data", data);
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=-33.257592&lon=151.482344&appid=${KEY}&units=metric&exclude=minutely`,
      );
      const res = (await response.json()) as WeatherResponse | null;
      if (!res) return {};
      return {
        lastUpdated: new Date(res.current.dt * 1000),
        location: "Hamlyn Terrace",
        humidity: res.current.humidity,
        isDaytime:
          res.current.dt > res.current.sunrise &&
          res.current.dt < res.current.sunset,
        temperature: res.current.temp,
        visibility: res.current.visibility,
        windBearing: res.current.wind_deg,
        windSpeed: res.current.wind_speed,
        precipitationUnit: "mm",
        pressureUnit: "hPa",
        temperatureUnit: "°C",
        visibilityUnit: "km",
        windSpeedUnit: "km/h",
        apparentTemperature: res.current.feels_like,
        dewPoint: res.current.dew_point,
        cloudCoverage: res.current.clouds,
        uvIndex: res.current.uvi,
        daily: res.daily,
        hourly: res.hourly,
      } satisfies WeatherSchema;
    },
  },
  climate: {
    entity: "climate.air_conditioner",
  },
  cameras: {
    entities: ["camera.backyard_sub", "camera.caravan_sub", "camera.side_sub"],
  },
  calendar: {
    entities: [
      "calendar.birthdays",
      "calendar.holidays_in_australia",
      "calendar.leave",
      "calendar.shannon_hochkins_playgroundxyz_com",
    ],
  },
  screenSaver: {
    enabled: true,
    duration: 120000,
    blur: 5,
    entity: "weather.freesia",
  },
  areas: {
    living_room: {
      card: {
        icon: "mdi:sofa",
      },
      modal: {
        featureComponent: <Living />,
      },
    },
    kitchen: {
      card: {
        icon: "mdi:fridge",
      },
      modal: {
        featureComponent: <Kitchen />,
      },
    },
    office: {
      card: {
        icon: "mdi:chair",
      },
      modal: {
        featureComponent: <Office />,
      },
    },
    outdoor: {
      card: {
        icon: "mdi:pine-tree",
      },
      modal: {
        featureComponent: <FrontHouse />,
      },
    },
    master_bedroom: {
      card: {
        icon: "mdi:bed",
      },
      modal: {
        featureComponent: <MasterBedroom />,
      },
    },
    dining_room: {
      card: {
        icon: "mdi:silverware-fork-knife",
      },
      modal: {
        featureComponent: <Dining />,
      },
    },
    garage: {
      card: {
        icon: "mdi:garage",
      },
      modal: {
        featureComponent: <Garage />,
      },
    },
    outdoor_kitchen: {
      card: {
        icon: "mdi:grill",
      },
      modal: {
        featureComponent: <OutdoorKitchen />,
      },
    },
  },
};
