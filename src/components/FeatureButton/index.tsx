import { ButtonCard, Row, Column, ButtonCardProps } from "@hakit/components";
import {
  EntityName,
  useIcon,
  useIconByDomain,
  computeDomain,
  useIconByEntity,
} from "@hakit/core";
import styled from "@emotion/styled";

const Title = styled.h4`
  font-size: 1rem;
  margin: 0;
  padding: 0;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 0.9rem;
  margin: 0;
  padding: 0;
`;

export interface FeatureButtonProps<E extends EntityName>
  extends ButtonCardProps<E> {
  image?: string;
  color1?: string;
  color2?: string;
}
export function FeatureButton<E extends EntityName>({
  image,
  title,
  description,
  icon: _icon,
  entity: _entity,
  iconColor,
  cssStyles = "",
  color1 = "#283069",
  color2 = "#4a6aff",
  borderRadius = "2rem",
  ...props
}: FeatureButtonProps<E>) {
  const domain = _entity ? computeDomain(_entity) : null;
  const icon = typeof _icon === "string" ? _icon : null;
  const domainIcon = useIconByDomain(domain === null ? "unknown" : domain, {
    color: iconColor || undefined,
  });
  const entityIcon = useIconByEntity(_entity || "unknown", {
    color: iconColor || undefined,
  });
  const iconElement = useIcon(icon, {
    color: iconColor || undefined,
  });

  return (
    <ButtonCard
      entity={_entity}
      title={title}
      borderRadius={borderRadius}
      description={description}
      onlyFunctionality
      disableColumns
      hideLastUpdated
      hideState
      {...props}
      cssStyles={`
      outline: none;
      padding:0;
      height: 100%;
      width: 100%;
      border: 0;
      box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.25);
      ${
        image
          ? `
        background-image: url(${image}), linear-gradient(0deg, ${color1}, ${color2});
        background-size: 40%, 100%;
        background-position: center 35%, center center;
        background-repeat: no-repeat;
      `
          : `
        background-image: linear-gradient(0deg, ${color1}, ${color2});
        background-repeat: no-repeat;
        background-size: 100%;
      `
      }
      .contents > div > *:not(.children) {
        display: none;
      }
      .children {
        width: 100%;
        height: 100%;
      }
      .content-row {
        padding: 0.5rem;
      }
      ${cssStyles}
  `}
    >
      <Column
        fullHeight
        fullWidth
        justifyContent="flex-end"
        alignItems="flex-start"
        wrap="nowrap"
        className="inner-column"
      >
        {props.children}
        <Row fullWidth className="content-row">
          <Row alignItems="flex-start" justifyContent="space-between" fullWidth>
            <Title>{title}</Title>
            {iconElement ?? domainIcon ?? entityIcon}
          </Row>
          <Row alignItems="flex-start" justifyContent="space-between" fullWidth>
            <Description>{description}</Description>
          </Row>
        </Row>
      </Column>
    </ButtonCard>
  );
}
