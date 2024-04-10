import { EntityName, FilterByDomain, useEntity } from "@hakit/core";
// @ts-expect-error - no types available
import VideoPlayer from "react-background-video-player";
import styled from "@emotion/styled";
import { useMemo } from "react";

import cloudy from "../assets/cloudy.mp4";
import fog from "../assets/fog.mp4";
import hail from "../assets/hail.mp4";
import lightning from "../assets/lightning.mp4";
import pouring from "../assets/pouring.mp4";
import rainy from "../assets/rainy.mp4";
import snowy from "../assets/snowy.mp4";
import windy from "../assets/windy.mp4";
import partlycloudy from "../assets/partly-cloudy.mp4";
import clearNight from "../assets/clear-night.mp4";
import sunny from "../assets/sunny.mp4";

const StyledVideoPlayer = styled(VideoPlayer)<{
  blur?: number;
}>`
  filter: blur(${(props) => props.blur || 5}px) saturate(50%);
`;

export interface WeatherBackgroundProps {
  entity: FilterByDomain<EntityName, "weather">;
  blur?: number;
}
export function WeatherBackground({ entity, blur }: WeatherBackgroundProps) {
  const weather = useEntity(entity);
  console.log("weather", weather.state);

  const videoSrc = useMemo(() => {
    switch (weather.state) {
      case "clear-night":
        return clearNight;
      case "partlycloudy":
        return partlycloudy;
      case "cloudy":
        return cloudy;
      case "fog":
        return fog;
      case "hail":
        return hail;
      case "rainy":
        return rainy;
      case "snowy":
        return snowy;
      case "snowy-rainy":
        return snowy;
      case "pouring":
        return pouring;
      case "lightning":
        return lightning;
      case "lightning-rainy":
        return lightning;
      case "sunny":
        return sunny;
      case "windy":
        return windy;
      case "windy-variant":
        return windy;
    }
  }, [weather.state]);

  return (
    <StyledVideoPlayer
      blur={blur}
      className="video"
      src={videoSrc}
      autoPlay={true}
      muted={true}
    />
  );
}
