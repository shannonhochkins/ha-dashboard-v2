import {
  CardBase,
  Row,
  Column,
  useBreakpoint,
  ButtonBar,
  ButtonBarButton,
  getAdditionalWeatherInformation,
  type CardBaseProps,
} from "@hakit/components";
import {
  EntityName,
  FilterByDomain,
  ModernForecastType,
  getSupportedForecastTypes,
  useHass,
  useWeather,
} from "@hakit/core";
import { WeatherSvg, type WeatherState } from "weather-icons-animated";
import { useResizeDetector } from "react-resize-detector";
import styled from "@emotion/styled";
import { useEffect, useState, useMemo, ReactNode } from "react";
import type { HassConfig } from "home-assistant-js-websocket";

import Chart from "./chart";

const Temperature = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 3rem;
  font-weight: bold;
  margin-top: -1rem;
  span {
    position: relative;
    margin-top: 0.25rem;
    font-size: 1rem;
    align-items: flex-start;
    color: var(--ha-S400-contrast);
  }
  .bp-xs &,
  .bp-sm &,
  .bp-xxs & {
    font-size: 1.5rem;
    width: 100px;
    height: 100px;
  }
`;

const State = styled(Row)`
  font-size: 1rem;
  text-transform: capitalize;
  white-space: nowrap;
  .bp-xs &,
  .bp-sm &,
  .bp-xxs & {
    font-size: 0.8rem;
    white-space: wrap;
  }
`;

const WeatherIconToday = styled(WeatherSvg)`
  width: 160px;
  height: 160px;
  margin-top: -1rem;
  .bp-xs &,
  .bp-sm &,
  .bp-xxs & {
    width: 100px;
    height: 100px;
  }
`;

const Contents = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

function convertDateTime(datetime: string, timezone: string) {
  const options = {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    hour12: true,
  } satisfies Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat("en-US", options).format(new Date(datetime));
}

export interface WeatherCardProps extends CardBaseProps {
  /** The name of your entity */
  entity: FilterByDomain<EntityName, "weather">;
  /** override the temperature suffix that's pulled from the entity, will retrieve the temperature_unit from entity by default"  */
  temperatureSuffix?: ReactNode;
  /** the forecast type to display @default "daily" */
  forecastType?: ModernForecastType;
  /** property on the weather entity attributes that returns the "feels like" temperature or "apparent temperature" @default "apparent_temperature" */
  apparentTemperatureAttribute?: string;
}

export function WeatherCard({
  entity,
  temperatureSuffix,
  apparentTemperatureAttribute = "apparent_temperature",
  forecastType = "daily",
  ...rest
}: WeatherCardProps) {
  const [config, setConfig] = useState<HassConfig | null>(null);
  const [type, setType] = useState<ModernForecastType>(forecastType);
  const bp = useBreakpoint();
  const { width, ref } = useResizeDetector({
    refreshMode: "throttle",
    refreshRate: 50,
  });
  const { getConfig } = useHass();
  const weather = useWeather(entity, {
    type,
  });
  useEffect(() => {
    setType(forecastType);
  }, [forecastType]);
  const supportedForecasts = useMemo(
    () => getSupportedForecastTypes(weather),
    [weather],
  );
  const smallDevice = bp.xxs || bp.xs || bp.sm;
  // we always trim the first item, as it's the same data displayed next to the chart
  const forecast = useMemo(
    () => (weather.forecast?.forecast ?? []).slice(1, (width ?? 0) / 60),
    [weather.forecast?.forecast, width],
  );
  useEffect(() => {
    getConfig().then(setConfig);
  }, [getConfig]);

  const {
    attributes: {
      friendly_name,
      temperature,
      unit_of_measurement,
      temperature_unit,
    },
  } = weather;
  const unit =
    temperatureSuffix ??
    unit_of_measurement ??
    temperature_unit ??
    config?.unit_system.temperature;

  const weatherDetails = useMemo(() => {
    const {
      humidity,
      temperature,
      wind_speed,
      wind_speed_unit,
      temperature_unit,
    } = weather.attributes;
    const additional = getAdditionalWeatherInformation(
      temperature,
      temperature_unit,
      wind_speed,
      wind_speed_unit,
      humidity,
    );
    const apparentTemperature = weather.attributes[
      apparentTemperatureAttribute
    ] as number | null | undefined;
    return {
      apparent_temperature: apparentTemperature ?? null,
      ...weather.attributes,
      ...(additional ?? {}),
    };
  }, [weather.attributes, apparentTemperatureAttribute]);

  const feelsLikeBase =
    weatherDetails.apparent_temperature ?? weatherDetails.feelsLike;
  const feelsLike = feelsLikeBase === temperature ? null : feelsLikeBase;

  return (
    <CardBase
      disableActiveState
      {...rest}
      cssStyles={`
    height: 100%;
    .bp-xs &, .bp-sm &, .bp-xxs & {
      max-height: 250px;
    }
  `}
    >
      <Contents ref={ref}>
        <Row
          fullWidth
          fullHeight
          justifyContent="space-between"
          wrap="nowrap"
          gap="1rem"
        >
          {!smallDevice && (
            <Column
              fullHeight
              justifyContent="space-around"
              className="large-weather-icon-column"
            >
              {supportedForecasts.length > 1 && (
                <ButtonBar
                  cssStyles={`
            margin-bottom: 1rem;
          `}
                >
                  {supportedForecasts.map((forecastType, index) => {
                    const icon =
                      forecastType === "daily"
                        ? "mdi:view-day"
                        : forecastType === "twice_daily"
                          ? "mdi:hours-12"
                          : "mdi:hourglass";
                    return (
                      <ButtonBarButton
                        key={index}
                        onClick={() => {
                          setType(forecastType);
                        }}
                        icon={icon}
                        noIcon={false}
                        title={forecastType}
                        active={type === forecastType}
                        rippleProps={{
                          preventPropagation: true,
                        }}
                      />
                    );
                  })}
                </ButtonBar>
              )}
              <WeatherIconToday state={weather.state as WeatherState} />
              <Temperature>
                <Row alignItems="flex-start">
                  {Math.round(temperature ?? 0)}
                  <span>{unit}</span>
                </Row>
                {feelsLike && (
                  <State>{`Feels like: ${feelsLike}${unit}`}</State>
                )}
                <State wrap="nowrap">
                  {friendly_name} - {weather.state}
                </State>
              </Temperature>
            </Column>
          )}
          <Row fullWidth fullHeight>
            <Chart
              data={{
                values: forecast.map((forecast) =>
                  Math.round(forecast.temperature),
                ),
                textBottom: forecast.map((forecast) => {
                  const low = forecast.templow
                    ? `${forecast.templow}${unit}`
                    : "";
                  if (low) {
                    return [
                      `${Math.round(forecast.temperature ?? 0)}${unit}`,
                      low,
                    ];
                  }
                  return `${Math.round(forecast.temperature ?? 0)}${unit}`;
                }),
                textTop: forecast.map((forecast) => {
                  const dateFormatted = convertDateTime(
                    forecast.datetime,
                    config?.time_zone ?? "UTC",
                  );
                  const [day, , hour] = dateFormatted.split(",");
                  return `${type === "hourly" ? hour : day}`;
                }),
                iconTop: forecast.map((forecast) => `${forecast.condition}`),
              }}
            />
          </Row>
        </Row>
      </Contents>
    </CardBase>
  );
}
