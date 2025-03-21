import {
  EntityName,
  getIconByEntity,
  useWeather,
  FilterByDomain,
  useEntity,
  useHass,
  WeatherEntity,
  HassEntityWithService,
} from "@hakit/core";
import { Modal, Column, Row } from "@hakit/components";
import {
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { FeatureButton, FeatureButtonProps } from "@components/FeatureButton";
import {
  WeatherSvg as _WeatherSvg,
  WeatherState,
} from "weather-icons-animated";
import styled from "@emotion/styled";
import { WeatherOptions, DailyWeather, HourlyWeather } from "../../../config";

const WeatherSvg = styled(_WeatherSvg)`
  width: 100%;
  height: 100%;
`;

export interface WeatherSchema {
  location?: ReactNode;
  lastUpdated?: Date;
  humidity?: number;
  isDaytime?: boolean;
  pressure?: number;
  temperature?: number;
  visibility?: number;
  windBearing?: number | string;
  windSpeed?: number;
  precipitationUnit?: string;
  pressureUnit?: string;
  temperatureUnit?: string;
  visibilityUnit?: string;
  windSpeedUnit?: string;
  apparentTemperature?: number;
  dewPoint?: number;
  cloudCoverage?: number;
  uvIndex?: number;
  daily?: ForecastAttribute[] | DailyWeather[];
  hourly?: ForecastAttribute[] | HourlyWeather[];
}

export type ForecastAttribute = NonNullable<
  WeatherEntity["attributes"]["forecast"]
>[number];

type WeatherData = {
  daily: ForecastAttribute[];
  hourly: ForecastAttribute[];
};

export function Weather<E extends FilterByDomain<EntityName, "weather">>({
  entity,
  config,
  ...props
}: FeatureButtonProps<E> & {
  config?: WeatherOptions;
}) {
  const _id = useId();
  const [weatherInformation, setWeatherInformation] = useState<WeatherSchema>(
    {},
  );
  const [open, setOpen] = useState(false);
  const { getAllEntities } = useHass();
  const entities = getAllEntities();
  const relatedEntities = (config?.related ?? [])
    .map((entityId) => entities[entityId])
    .filter((x) => !!x);
  const weather = useEntity(entity ?? "unknown", {
    returnNullIfNotFound: true,
  }) as HassEntityWithService<"weather">;
  const icon = weather
    ? getIconByEntity("weather", weather)
    : "mdi:weather-fog";

  const onDataChange = useCallback(
    (data: WeatherData) => {
      if (config && config.preFormat) {
        config
          .preFormat({
            entity: weather,
            daily: data.daily,
            hourly: data.hourly,
            related: relatedEntities,
          })
          .then((result) => {
            setWeatherInformation(result);
          });
      } else if (weather) {
        setWeatherInformation({
          location: weather.attributes.friendly_name,
          lastUpdated: new Date(weather.last_updated),
          humidity: weather.attributes.humidity,
          pressure: weather.attributes.pressure,
          temperature: weather.attributes.temperature,
          visibility: weather.attributes.visibility,
          windBearing: weather.attributes.wind_bearing,
          windSpeed: weather.attributes.wind_speed,
          precipitationUnit: weather.attributes.precipitation,
          pressureUnit: weather.attributes.pressure_unit,
          temperatureUnit: weather.attributes.temperature_unit,
          visibilityUnit: weather.attributes.visibility_unit,
          windSpeedUnit: weather.attributes.wind_speed_unit,
          apparentTemperature: weather.attributes.apparent_temperature,
          dewPoint: weather.attributes.dew_point,
          cloudCoverage: weather.attributes.cloud_coverage,
          uvIndex: weather.attributes.uv_index,
          daily: data.daily,
          hourly: data.hourly,
        });
      }
    },
    [config, weather, relatedEntities],
  );
  return (
    <>
      <FeatureButton
        layoutId={_id}
        title="Weather"
        description="Show the weather information"
        icon={icon}
        color1={"#755b00"}
        color2={"#fdff54"}
        layoutType="slim-vertical"
        // @ts-expect-error - ignore, don't need args/overloads
        longPressCallback={() => {
          setOpen(true);
        }}
        {...props}
      >
        <WeatherSvg state={(weather?.state as WeatherState) ?? "sunny"} />
      </FeatureButton>
      <Modal
        id={_id}
        title="Cameras"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        cssStyles={`
          --ha-modal-width: 98vw;
        `}
      >
        <Row fullHeight fullWidth>
          {entity && (
            <WeatherWithEntity entity={entity} onLoad={onDataChange} />
          )}
          {!entity && <WeatherWeatherWithoutEntity onLoad={onDataChange} />}
          <Column>
            {weatherInformation.temperature && (
              <p>
                {weatherInformation.temperature}
                {weatherInformation.temperatureUnit ?? ""}
              </p>
            )}
            {weatherInformation.location && (
              <p>{weatherInformation.location}</p>
            )}
            {weatherInformation.apparentTemperature && (
              <p>Feels Like: {weatherInformation.apparentTemperature}</p>
            )}
            {weatherInformation.lastUpdated && (
              <p>{weatherInformation.lastUpdated.toISOString()}</p>
            )}
            {weatherInformation.humidity && (
              <p>{weatherInformation.humidity}</p>
            )}
            {weatherInformation.pressure && (
              <p>{weatherInformation.pressure}</p>
            )}
            {weatherInformation.visibility && (
              <p>{weatherInformation.visibility}</p>
            )}
            {weatherInformation.windBearing && (
              <p>{weatherInformation.windBearing}</p>
            )}
            {weatherInformation.windSpeed && (
              <p>{weatherInformation.windSpeed}</p>
            )}
            {weatherInformation.precipitationUnit && (
              <p>{weatherInformation.precipitationUnit}</p>
            )}
            {weatherInformation.pressureUnit && (
              <p>{weatherInformation.pressureUnit}</p>
            )}
            {weatherInformation.temperatureUnit && (
              <p>{weatherInformation.temperatureUnit}</p>
            )}
            {weatherInformation.visibilityUnit && (
              <p>{weatherInformation.visibilityUnit}</p>
            )}
            {weatherInformation.windSpeedUnit && (
              <p>{weatherInformation.windSpeedUnit}</p>
            )}
            {weatherInformation.dewPoint && (
              <p>{weatherInformation.dewPoint}</p>
            )}
            {weatherInformation.cloudCoverage && (
              <p>{weatherInformation.cloudCoverage}</p>
            )}
            {weatherInformation.uvIndex && <p>{weatherInformation.uvIndex}</p>}
          </Column>
        </Row>
      </Modal>
    </>
  );
}

function WeatherWithEntity<E extends FilterByDomain<EntityName, "weather">>({
  entity,
  onLoad,
}: Omit<FeatureButtonProps<E>, "entity" | "onLoad"> & {
  entity: E;
  onLoad: (data: {
    daily: ForecastAttribute[];
    hourly: ForecastAttribute[];
  }) => void;
}) {
  const lastRequested = useRef<Date | null>(null);
  const weatherDaily = useWeather(entity, {
    type: "daily",
  });
  const weatherHourly = useWeather(entity, {
    type: "hourly",
  });
  useEffect(() => {
    // if the lastRequested.current value is < 5 minutes ago, don't request again
    if (
      lastRequested.current &&
      lastRequested.current.getTime() > Date.now() - 1000 * 60 * 5
    ) {
      return;
    }
    lastRequested.current = new Date();
    onLoad({
      daily: weatherDaily.forecast?.forecast ?? [],
      hourly: weatherHourly.forecast?.forecast ?? [],
    });
  }, [onLoad, weatherDaily.forecast, weatherHourly.forecast]);
  return null;
}

interface WeatherByApiProps {
  onLoad: (data: {
    daily: ForecastAttribute[];
    hourly: ForecastAttribute[];
  }) => void;
}

function WeatherWeatherWithoutEntity({ onLoad }: WeatherByApiProps) {
  const lastRequested = useRef<Date | null>(null);
  useEffect(() => {
    // if the lastRequested.current value is < 5 minutes ago, don't request again
    if (
      lastRequested.current &&
      lastRequested.current.getTime() > Date.now() - 1000 * 60 * 5
    ) {
      return;
    }
    lastRequested.current = new Date();
    onLoad({
      daily: [],
      hourly: [],
    });
  }, [onLoad]);
  return null;
}
