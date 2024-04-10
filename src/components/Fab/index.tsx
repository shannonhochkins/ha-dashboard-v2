import { FabCard, FabCardProps } from "@hakit/components";
import { EntityName } from "@hakit/core";

const fabStyles = `
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  padding: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  cursor: pointer;
  background-color: transparent;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  transform: scale(1) translate3d(0, 0, 0);
  transition: var(--ha-transition-duration) var(--ha-easing);
  transition-property: background-color, background-image;
  color: white;
  flex-shrink: 1;
  user-select: none;
  svg {
    color: white;
    transition: color var(--ha-transition-duration) var(--ha-easing);
  }
  &:not(:disabled):hover,
  &:not(.disabled):hover {
    background-color: rgba(0, 0, 0, 0.04);
    color: white;
    svg {
      color: white;
    }
  }
  &:disabled,
  &.disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
  &.active, &:active {
    background-color: rgba(0, 0, 0, 0.12);
    color: white;
    svg {
      color: white;
    }
    &:not(:disabled):hover, &:not(.disabled):hover {
      background-color: rgba(0, 0, 0, 0.22);
      color: white;
    }
  }
`;

export function Fab<E extends EntityName>({
  children,
  cssStyles,
  onlyFunctionality = true,
  ...rest
}: FabCardProps<E>) {
  return (
    <FabCard
      onlyFunctionality={onlyFunctionality}
      cssStyles={`
      ${fabStyles}
      ${cssStyles ?? ""}
    `}
      {...rest}
    >
      {children}
    </FabCard>
  );
}
