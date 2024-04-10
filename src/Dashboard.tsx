import { Background, BackgroundProps } from "@components/Background";
import { Navigation } from "@components/Navigation";
import { ContextSlider } from "@components/ContextSlider";
import { Cameras } from "@components/Widgets/Security";
import { Calendar } from "@components/Widgets/Calendar";
import { Climate } from "@components/Widgets/Climate";
import { Weather } from "@components/Widgets/Weather";
import { Area } from "@components/Widgets/Areas";
import { Column, Row } from "@hakit/components";
import styled from "@emotion/styled";
import { useAreas } from "@hakit/core";
import { chunk } from "lodash";
import { configuration } from "./config";

export interface DashboardProps {
  background?: BackgroundProps;
}

const Header = styled.header`
  width: 100%;
  height: 200px;
`;
const Footer = styled.footer`
  width: 100%;
  height: 200px;
`;

function Dashboard({ background }: DashboardProps) {
  const areas = useAreas();
  return (
    <>
      <Background {...background} />

      <Column fullWidth fullHeight justifyContent="space-between" wrap="nowrap">
        <Header>
          <Navigation />
        </Header>
        <ContextSlider
          spacing={20}
          items={[
            <Column
              fullWidth
              wrap="nowrap"
              fullHeight
              gap="1rem"
              justifyContent="stretch"
              style={{
                minWidth: "50vw",
              }}
            >
              <Row
                gap="1rem"
                fullWidth
                style={{
                  height: "calc(50% - (var(--gap) / 2))",
                }}
                wrap="nowrap"
              >
                {configuration.cameras?.entities && (
                  <Column className="md-6" fullHeight>
                    <Cameras
                      borderRadius={"6rem 2rem 2rem 2rem"}
                      entities={configuration.cameras.entities}
                    />
                  </Column>
                )}
                {configuration.climate?.entity && (
                  <Column className="md-6" fullHeight>
                    <Climate entity={configuration.climate.entity} />
                  </Column>
                )}
              </Row>
              <Row
                gap="1rem"
                fullWidth
                style={{
                  height: "calc(50% - (var(--gap) / 2))",
                }}
                wrap="nowrap"
              >
                {configuration.weather && (
                  <Column className="md-6" fullHeight>
                    <Weather entity={configuration.weather.entity} config={configuration.weather} />
                  </Column>
                )}
                {configuration.calendar?.entities &&
                  configuration.calendar.entities.length > 0 && (
                    <Column className="md-6" fullHeight>
                      <Calendar entities={configuration.calendar?.entities} />
                    </Column>
                  )}
              </Row>
            </Column>,
            ...chunk(
              areas.filter((area) => area.picture),
              2,
            ).map(([area1, area2]) => {
              return (
                <Column
                  key={area1.area_id}
                  fullWidth
                  wrap="nowrap"
                  fullHeight
                  gap="1rem"
                  justifyContent="stretch"
                  style={{
                    minWidth: "30vw",
                  }}
                >
                  <Column
                    fullWidth
                    style={{
                      height: "calc(50% - (var(--gap, 0) / 2))",
                    }}
                  >
                    <Area
                      entityCount={area1.entities.length}
                      deviceCount={area1.devices.length}
                      image={area1.picture as string}
                      title={area1.name}
                      id={area1.area_id}
                    />
                  </Column>
                  {area2 && (
                    <Column
                      fullWidth
                      style={{
                        height: "calc(50% - (var(--gap, 0) / 2))",
                      }}
                    >
                      <Area
                        entityCount={area2.entities.length}
                        deviceCount={area2.devices.length}
                        image={area2.picture as string}
                        title={area2.name}
                        id={area2.area_id}
                      />
                    </Column>
                  )}
                </Column>
              );
            }),
          ]}
        />
        <Footer></Footer>
      </Column>
    </>
  );
}

export default Dashboard;
