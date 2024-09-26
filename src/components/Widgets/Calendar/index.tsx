import { EntityName, useEntity, FilterByDomain } from "@hakit/core";
import { useId, useState } from "react";
import { Modal } from "@hakit/components";
import { FeatureButton, FeatureButtonProps } from "@components/FeatureButton";
import calendar from "./calendar.png";
import styled from "@emotion/styled";
import { useResizeDetector } from "react-resize-detector";
import { FullScreenCalendar } from "./fullScreenCal";

const Image = styled.img`
  width: 100%;
  max-width: 50%;
  height: auto;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Inner = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Month = styled.span`
  position: absolute;
  text-transform: uppercase;
  font-size: 100%;
  font-weight: bold;
  color: #ededee;
  top: 18%;
  white-space: nowrap;
  width: 100%;
  left: 0;
  text-align: center;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
`;

const Day = styled.span`
  position: absolute;
  font-size: 100%;
  font-weight: bold;
  color: #2d3b4d;
  top: 40%;
  white-space: nowrap;
  width: 100%;
  left: 0;
  text-align: center;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
`;

function formatDate(dateString: string) {
  // Create a new Date object
  const date = new Date(dateString);
  // Use Intl.DateTimeFormat to format the date
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
  });
  // Format the date
  const month = formatter.format(date);
  // Add the ordinal suffix
  const day = date.getDate();
  return {
    day,
    month,
  };
}

function CalendarPicture() {
  const dateSensor = useEntity("sensor.date", {
    returnNullIfNotFound: true,
  });
  const { width, ref } = useResizeDetector();
  return (
    <Wrapper>
      <Inner>
        <Month
          style={{
            fontSize: width ? width / 9 : "100%",
          }}
        >
          {dateSensor && formatDate(dateSensor.state).month}
        </Month>
        <Day
          style={{
            fontSize: width ? width / 2 : "100%",
          }}
        >
          {dateSensor && formatDate(dateSensor.state).day}
        </Day>
        <Image src={calendar} ref={ref} />
      </Inner>
    </Wrapper>
  );
}

export function Calendar<E extends EntityName>({
  entities,
  ...props
}: Omit<FeatureButtonProps<E>, "entity"> & {
  entities: FilterByDomain<EntityName, "calendar">[];
}) {
  const _id = useId();
  const [open, setOpen] = useState(false);
  return (
    <>
      <FeatureButton
        title="Calendar"
        description="Show the Calendar events"
        icon="mdi:calendar"
        layoutId={_id}
        layoutType="slim-vertical"
        color1={"#850f78"}
        color2={"#ff8be3"}
        // @ts-expect-error - TODO  FIX LATER
        longPressCallback={() => {
          setOpen(true);
        }}
        {...props}
      >
        <CalendarPicture />
      </FeatureButton>
      <Modal
        id={_id}
        title="Cameras"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        cssStyles={`
          --ha-modal-width: 90vw;
        `}
      >
        <FullScreenCalendar entities={entities} />
      </Modal>
    </>
  );
}
