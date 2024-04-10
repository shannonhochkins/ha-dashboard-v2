import { ReactNode } from "react";
import styled from "@emotion/styled";
import { mq } from "@hakit/components";

const AreaBaseStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  > div {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    > * {
      max-height: 100%;
    }
  }
  ${mq(
    ["md", "lg", "xlg"],
    `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > * {
      display: flex;
      flex-shrink: 0;
    }
  `,
  )}
`;

export interface AreaBaseProps {
  className?: string;
  children?: ReactNode;
}
export function AreaBase({ children, className }: AreaBaseProps) {
  return (
    <AreaBaseStyled className={className}>
      <div>{children && children}</div>
    </AreaBaseStyled>
  );
}
