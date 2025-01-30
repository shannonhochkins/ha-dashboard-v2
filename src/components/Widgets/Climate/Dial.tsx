import {
  EntityName,
  FilterByDomain,
  isUnavailableState,
  useEntity,
  useHass,
} from "@hakit/core";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import { useEffect, useState, useCallback, useRef, CSSProperties } from "react";
import styled from "@emotion/styled";
import { DialLines } from "./DialLines";
import type { HassConfig } from "home-assistant-js-websocket";
import { useDebouncedCallback } from "use-debounce";

const DialParent = styled.div`
  height: 70%;
  aspect-ratio: 1;
  position: relative;
`;

const Outer = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  overflow: hidden;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Center = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// offset to start at 0 degrees at the bottom of the dial
const OFFSET = 90;

export function Dial<E extends EntityName>({
  entity: _entity,
  colors = ["#44e1fd", "#00ff9d"],
  invertDragDirection = false,
}: {
  invertDragDirection?: boolean;
  colors?: [CSSProperties["color"], CSSProperties["color"]];
  entity: FilterByDomain<E, "climate">;
}) {
  const entity = useEntity(_entity);
  const {
    min_temp = 6,
    max_temp = 40,
    temperature = 20,
  } = entity.attributes || {};

  const min = min_temp;
  const max = max_temp;
  const targetValue = useRef<HTMLSpanElement>(null);
  const newValue = useRef<number>(temperature);
  const dragging = useRef(false);
  const { getConfig } = useHass();
  const [config, setConfig] = useState<HassConfig | null>(null);
  // Track the last X position
  const initialXY = useRef([0, 0]);
  // we use the circle to calculate the angle of the drag
  const circleRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(OFFSET); // Start at 180 degrees for bottom center

  const isUnavailable = isUnavailableState(entity.state);

  useEffect(() => {
    getConfig().then((config) => {
      if (config) setConfig(config);
    });
  }, [getConfig]);

  useEffect(() => {
    if (targetValue.current) {
      targetValue.current.innerHTML = `${temperature}${
        config?.unit_system?.temperature ?? ""
      }`;
    }
  }, [temperature, config]);

  // Convert value to angle
  const valueToAngle = useCallback(
    (value: number): number => {
      // Clamping the value within min and max
      const clampedValue = Math.max(min, Math.min(value, max));
      const range = max - min;
      // Convert the value to an angle, considering the offset
      let angle = ((clampedValue - min) / range) * 360 + OFFSET;
      if (angle > 360) angle -= 360;

      return angle;
    },
    [min, max],
  );

  useEffect(() => {
    newValue.current = temperature;
    rotation.set(valueToAngle(temperature));
  }, [valueToAngle, rotation, temperature]);

  // Calculate the angle based on cursor position
  const getAngle = (x1: number, y1: number) => {
    if (circleRef.current) {
      const rect = circleRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const [x2, y2] = initialXY.current;

      const radians1 = Math.atan2(y1 - centerY, x1 - centerX);
      const radians2 = Math.atan2(y2 - centerY, x2 - centerX);

      // Calculate the angle moved relative to the center of the circle
      const angleMoved = radians2 - radians1;

      // Convert the angle from radians to degrees
      const degrees = angleMoved * (180 / Math.PI);

      return degrees;
    }
    return 0;
  };

  // Convert rotation to value
  const angleToValue = useCallback(
    (angle: number): number => {
      let adjustedAngle = angle - OFFSET; // Adjust for the starting point
      if (adjustedAngle < 0) adjustedAngle += 360; // Normalize the angle

      const range = max - min;
      let valueFromAngle = (adjustedAngle / 360) * range + min;
      valueFromAngle = Math.max(min, Math.min(valueFromAngle, max)); // Clamping the value
      return Math.round(valueFromAngle);
    },
    [min, max],
  );

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (isUnavailable) return;
    const newAngle = getAngle(info.point.x, info.point.y);
    let updatedRotation =
      rotation.get() + newAngle * (invertDragDirection ? 1 : -1);
    // Ensuring the rotation stays within 0-360 degrees
    updatedRotation = updatedRotation % 360;
    if (updatedRotation < 0) updatedRotation += 360;

    rotation.set(updatedRotation);
    initialXY.current = [info.point.x, info.point.y]; // Update the initial angle for continuous rotation
  };

  const onMouseDown = (event: React.MouseEvent) => {
    dragging.current = true;
    initialXY.current = [event.pageX, event.pageY];
  };
  const onTouchStart = (event: React.TouchEvent) => {
    // Touch events can have multiple touch points, but we're interested in the first touch
    const touch = event.touches[0];
    dragging.current = true;
    initialXY.current = [touch.pageX, touch.pageY];
  };

  const debounceOnChange = useDebouncedCallback((updatedValue: number) => {
    dragging.current = false;
    entity.service.setTemperature({
      serviceData: {
        temperature: updatedValue,
      },
    });
  }, 100);

  const onMouseUp = () => {
    dragging.current = false;
    debounceOnChange(newValue.current);
  };

  useEffect(() => {
    const unsubscribe = rotation.on("change", (latest) => {
      const value = angleToValue(latest);
      newValue.current = value;
      if (targetValue.current) {
        targetValue.current.innerHTML = `${value}${
          config?.unit_system?.temperature ?? ""
        }`;
      }
    });
    return () => unsubscribe();
  }, [angleToValue, debounceOnChange, config, rotation]);
  return (
    <DialParent>
      <Center>
        <span ref={targetValue} />
      </Center>
      <Outer
        ref={circleRef}
        whileTap={{ scale: 0.9 }}
        style={{ rotate: rotation }}
        drag="x"
        aria-disabled={isUnavailable}
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
        dragElastic={0}
        onMouseUp={onMouseUp}
        onAbort={onMouseUp}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <svg viewBox="0 0 100 100" width="100%">
          <defs>
            <filter id="glow">
              <feGaussianBlur result="coloredBlur" stdDeviation="0.8" />
              <feMerge>
                <feMergeNode in="coloredBlur"></feMergeNode>
                <feMergeNode in="coloredBlur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>
            <linearGradient id="gradient" x1="50%" y1="50%" x2="0%" y2="100%">
              <motion.stop
                offset="0%"
                animate={{
                  stopColor: colors[0],
                }}
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: colors[1],
                }}
              />
            </linearGradient>
            <mask id="circleMask">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <rect x="50" y="50" width="50" height="50" fill="black" />
            </mask>
          </defs>
          <DialLines
            size={90}
            transform="translate(5, 5)"
            ticks={{
              count: 200,
              every: 8,
              main: {
                thickness: 0.5,
                length: 6,
                color: "rgba(255, 255, 255, 0.3)",
                cap: "round",
              },
              sub: {
                thickness: 0.2,
                length: 4,
                color: "rgba(255, 255, 255, 0.3)",
                cap: "round",
              },
            }}
          />
          <motion.g
            transition={{
              ease: "linear",
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            animate={{
              filter: ["contrast(0.5)", "contrast(2)"],
            }}
          >
            <motion.path
              filter="url(#glow)"
              fill="url(#gradient)"
              mask="url(#circleMask)"
              d="M97.9,50C98.12,31,86,12.68,68.38,5.54,36.76-7.67,1.88,15.82,1.85,50c-.22,19.11,12,37.51,29.68,44.69C55.7,105.11,84.92,93,94.7,68.54A49.33,49.33,0,0,0,98.4,50Zm.5,0c.16,34.39-35.19,58.26-67,45C13.51,87.8,1.19,69.28,1.35,50,1.28,15.34,36.61-8.5,68.7,4.79A49.06,49.06,0,0,1,98.9,50Z"
            />
          </motion.g>
          <g
            style={{
              transform: `translate(40%) scale(0.3) rotate(90deg)`,
              transformOrigin: "center center",
            }}
          >
            <polygon
              points="50,70 45,60 55,60" // These points define a triangle pointing downwards
              fill="currentColor" // This sets the triangle color
              // You can add more styling as needed
            />
          </g>
        </svg>
      </Outer>
    </DialParent>
  );
}
