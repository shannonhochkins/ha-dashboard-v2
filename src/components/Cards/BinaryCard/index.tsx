import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import{ Lightbulb, ToggleOff, SpaRounded } from '@mui/icons-material';
import { useHass } from '@hooks';
import { SimpleCard } from '..';

interface BinaryCardProps {
  name?: string;
  /** entity name */
  entity: string;
  /** Custom icon for active state */
  iconActive?: ReactNode;
  /** Custom icon for inactive state */
  iconInactive?: ReactNode;
  /** Custom label for active state */
  labelActive?: string;
  /** Custom label for inactive state */
  labelInactive?: string;
}
export function BinaryCard({
  entity,
  name,
  iconActive = <Lightbulb />,
  iconInactive = <Lightbulb />,
  labelActive = 'On',
  labelInactive = 'Off',
}: BinaryCardProps) {
  const { getEntity, callSwitch } = useHass();
  const $switch = getEntity(entity);
  const isActive = $switch?.state === 'on';
  function onToggle() {
    callSwitch(entity, isActive ? 'turn_off' : 'turn_on');
  }
  return <SimpleCard onClick={onToggle} isActive={isActive}>
    <div>
      {isActive ? iconActive : iconInactive}
      <span>{name || $switch?.attributes?.friendly_name}</span>
    </div>
  </SimpleCard>
}