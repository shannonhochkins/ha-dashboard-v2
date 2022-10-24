import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useEntity, useHass, useDelay } from '@hooks';
import { MediaCard, Popup } from '@components';
import camera from '@assets/camera.png';


const Content = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
`;


const CameraCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 396px;
  height: 240px;
  background: black;
`;

const CameraCardContent = styled.div`
  flex-grow: 1;
`;

const CameraImage = styled.img`
  width: 100%;
`;

const Camera = ({
  entity,
}: {
  entity: string;
}) => {
  const camera = useEntity(`camera.${entity}_rtmp_extra`);
  const motion = useEntity(`binary_sensor.${entity}_motion`);
  const focus = useEntity(`number.${entity}_focus`);
  const zoom = useEntity(`number.${entity}_zoom`);
  const hass = useHass();
  const [pic, setPic] = useState<null | string>(null);
  useEffect(() => {
    setTimeout(() => {
      hass.callService('camera', 'snapshot', {
        filename: `/config/www/cameras/${entity}.jpg`,
      }, {
        entity_id: `camera.${entity}_rtmp_extra`,
      })
      setPic(`${hass.base}/local/cameras/${entity}.jpg?d=${Date.now()}`);
    }, 300)
  }, [camera, motion, focus, zoom]);
  return (
    <CameraCardContainer>
      <span>{camera.attributes.friendly_name}</span>
      <CameraCardContent>
        {pic && <CameraImage src={pic} />}
      </CameraCardContent>
    </CameraCardContainer>
  );
};

export function CameraCard() {
  const [open, setOpen] = useState(false);
  return <>
    <MediaCard onClick={() => {
      setOpen(true);
    }} shiftColor={100} color="secondary" background={camera}>
      <Content>
        View Cameras
      </Content>
    </MediaCard>
    <Popup open={open} onClose={() => setOpen(false)}>
      {/* <iframe src="http://homeassistant.local:8123/lovelace/home" width="100%" height="1000px">
      </iframe> */}
      <Camera entity={'reolink_main_driveway'} />
    </Popup>
  </>
}