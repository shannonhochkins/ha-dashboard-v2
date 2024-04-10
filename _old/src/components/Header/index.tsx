import { Row, Column, TimeCard } from "@hakit/components";
import { Greeting } from "./Greeting";
import { LowDevices } from "./LowDevices";
import { EntitySearch } from "./EntitySearch";
import styled from "@emotion/styled";

const StyledTimeCard = styled(TimeCard)`
  .contents {
    > div {
      padding: 0;
    }
  }
`;

export function Header() {
  return (
    <Row
      fullWidth
      justifyContent="space-between"
      style={{
        marginBottom: "1rem",
      }}
    >
      <Column alignItems="flex-start">
        <Row gap="1rem">
          <StyledTimeCard
            disableColumns
            disableScale
            onlyFunctionality
            disableRipples
            disableActiveState
            hideIcon
            hideDate
          />
          <Greeting />
        </Row>
        <StyledTimeCard
          disableColumns
          disableScale
          onlyFunctionality
          disableRipples
          disableActiveState
          hideIcon
          hideTime
        />
      </Column>
      <Row gap="1rem">
        <EntitySearch />
        <LowDevices />
      </Row>
    </Row>
  );
}
