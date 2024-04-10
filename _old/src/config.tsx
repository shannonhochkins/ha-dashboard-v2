import type { Configuration } from "./typings";
import {
  ButtonCard,
  Row,
  Column,
  ClimateCard,
  MediaPlayerCard,
} from "@hakit/components";
import { Cameras } from "@components";

export const configuration: Configuration = {
  weather: {
    entity: "weather.freesia",
    options: {
      forecastType: "hourly",
    },
  },
  sidebar: {
    menuItems: [
      {
        title: "Weather",
        icon: "mdi:white-balance-sunny",
        hash: "weather",
        active: window.location.hash === "#weather",
        onClick() {
          window.location.hash = "weather";
        },
      },
    ],
  },
  screenSaver: {
    enabled: true,
    duration: 120000,
    blur: 5,
    entity: "weather.freesia",
  },
  featurePanel: [
    {
      children: ({ connection }) => {
        const playYouTubeVideo = async (videoId: string) => {
          await connection.sendMessagePromise({
            type: "execute_script",
            sequence: [
              {
                service: "media_player.turn_on",
                target: {
                  entity_id: "media_player.samsung_tv_living_room",
                },
              },
            ],
          });
          await connection.sendMessagePromise({
            type: "execute_script",
            sequence: [
              {
                service: "media_player.select_source",
                data: {
                  source: "HDMI",
                },
                target: {
                  entity_id: "media_player.samsung_tv_living_room",
                },
              },
            ],
          });
          await connection.sendMessagePromise({
            type: "execute_script",
            sequence: [
              {
                service: "media_player.play_media",
                data: {
                  media_content_id: ` { "app_name": "youtube", "media_id": "${videoId}" }`,
                  media_content_type: "cast",
                },
                target: {
                  entity_id: "media_player.chrome_cast_stream",
                },
              },
            ],
          });
        };
        return (
          <Row
            gap="1rem"
            alignItems="stretch"
            justifyContent="flex-start"
            fullHeight
          >
            <Cameras sm={3} md={6} lg={6} xlg={6} />
            <ButtonCard
              entity="climate.air_conditioner"
              defaultLayout="slim-vertical"
              sm={3}
              md={6}
              lg={6}
              xlg={6}
            />
            <ButtonCard
              title="Play Ms Rachel"
              description={"Hypnotize Child"}
              icon="twemoji:baby"
              sm={3}
              md={6}
              lg={6}
              xlg={6}
              onClick={async () => {
                await playYouTubeVideo("_Z0ZQT0FttM");
              }}
              defaultLayout="slim-vertical"
            />
            <ButtonCard
              title="Play The Wiggles"
              description={"Hypnotize Child"}
              icon="twemoji:baby"
              sm={3}
              md={6}
              lg={6}
              xlg={6}
              onClick={async () => {
                await playYouTubeVideo("MY98CSj3Xdo");
              }}
              defaultLayout="slim-vertical"
            />
          </Row>
        );
      },
    },
    {
      children: () => (
        <Column
          gap="1rem"
          alignItems="stretch"
          justifyContent="flex-start"
          fullHeight
          wrap="nowrap"
        >
          <ClimateCard entity="climate.air_conditioner" disableColumns />
          <Row gap="1rem">
            <ButtonCard
              entity="switch.all_downstairs_light_switchs"
              defaultLayout="slim-vertical"
              sm={3}
              md={6}
              lg={6}
              xlg={6}
              service="toggle"
            />
            <ButtonCard
              entity="switch.all_upstairs_lights"
              defaultLayout="slim-vertical"
              sm={3}
              md={6}
              lg={6}
              xlg={6}
              service="toggle"
            />
          </Row>
        </Column>
      ),
    },
    {
      children: () => (
        <Column
          gap="1rem"
          alignItems="stretch"
          justifyContent="flex-start"
          fullHeight
          wrap="nowrap"
        >
          <MediaPlayerCard
            entity="media_player.all_speakers_2"
            disableColumns
            groupMembers={["media_player.office_display"]}
          />
        </Column>
      ),
    },
  ],
  areas: {
    living_room: {
      card: {
        icon: "mdi:sofa",
      },
    },
    kitchen: {
      card: {
        icon: "mdi:fridge",
      },
    },
    office: {
      card: {
        icon: "mdi:chair",
      },
    },
    outdoor: {
      card: {
        icon: "mdi:pine-tree",
      },
    },
    master_bedroom: {
      card: {
        icon: "mdi:bed",
      },
    },
    dining_room: {
      card: {
        icon: "mdi:silverware-fork-knife",
      },
    },
    garage: {
      card: {
        icon: "mdi:garage",
      },
    },
    outdoor_kitchen: {
      card: {
        icon: "mdi:grill",
      },
    },
  },
};
