import React, { ReactNode } from "react";
import styled from '@emotion/styled';
import {
  angleToPosition,
  positionToAngle,
  AngleDescription,
  valueToAngle,
  angleToValue,
} from "./circularGeometry";
import { arcPathWithRoundedEnds } from "./svgPaths";

const Wrapper = styled.div`
  position: relative;
`;

const INNER_TRACK_SIZE = 1.4;
const Thermometer = styled(ThermometerBase)`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate3d(-50%, -${props => (props.thickness * 2) - (props.thickness / INNER_TRACK_SIZE / 2)}px, 0);
`;

type Props = {
  size: number;
  trackWidth: number;
  shadowWidth: number;
  minValue: number;
  maxValue: number;
  startAngle: number; // 0 - 360 degrees
  endAngle: number; // 0 - 360 degrees
  angleType: AngleDescription;
  handleSize: number;
  handle: {
    value: number;
    onChange?: (value: number) => void;
  };
  onControlFinished?: () => void;
  disabled?: boolean;
  // arcColor: string;
  // arcBackgroundColor: string;
  // trackBackgroundColor: string;
  coerceToInt?: boolean;
  children: ReactNode;
  trackColors: string[];
};

export class CircularSlider extends React.Component<
  React.PropsWithChildren<Props>
> {
  static defaultProps: Partial<Props> = {
    size: 200,
    minValue: 0,
    maxValue: 100,
    startAngle: 0,
    endAngle: 360,
    trackWidth: 20,
    angleType: {
      direction: "cw",
      axis: "-y",
    },
    handleSize: 8,
    trackColors: ['#ec008c', '#fc6767']
  };
  svgRef = React.createRef<SVGSVGElement>();

  onMouseEnter = (ev: React.MouseEvent<SVGSVGElement>) => {
    if (ev.buttons === 1) {
      // The left mouse button is pressed, act as though user clicked us
      this.onMouseDown(ev);
    }
  };

  onMouseDown = (ev: React.MouseEvent<SVGSVGElement>) => {
    const svgRef = this.svgRef.current;
    if (svgRef) {
      svgRef.addEventListener("mousemove", this.processSelection);
      svgRef.addEventListener("mouseleave", this.removeMouseListeners);
      svgRef.addEventListener("mouseup", this.removeMouseListeners);
    }
    this.processSelection(ev);
  };

  removeMouseListeners = () => {
    const svgRef = this.svgRef.current;
    if (svgRef) {
      svgRef.removeEventListener("mousemove", this.processSelection);
      svgRef.removeEventListener("mouseleave", this.removeMouseListeners);
      svgRef.removeEventListener("mouseup", this.removeMouseListeners);
    }
    if (this.props.onControlFinished) {
      this.props.onControlFinished();
    }
  };

  processSelection = (ev: React.MouseEvent<SVGSVGElement> | MouseEvent) => {
    const {
      size,
      maxValue,
      minValue,
      angleType,
      startAngle,
      endAngle,
      handle,
      disabled,
      coerceToInt,
    } = this.props;
    if (!handle.onChange) {
      // Read-only, don't bother doing calculations
      return;
    }
    const svgRef = this.svgRef.current;
    if (!svgRef) {
      return;
    }
    // Find the coordinates with respect to the SVG
    const svgPoint = svgRef.createSVGPoint();
    const x = ev.clientX;
    const y = ev.clientY;
    svgPoint.x = x;
    svgPoint.y = y;
    const coordsInSvg = svgPoint.matrixTransform(
      svgRef.getScreenCTM()!.inverse()
    );

    const angle = positionToAngle(coordsInSvg, size, angleType);
    let value = angleToValue({
      angle,
      minValue,
      maxValue,
      startAngle,
      endAngle,
    });
    if (coerceToInt) {
      value = Math.round(value);
    }

    if (!disabled) {
      handle.onChange(value);
    }
  };

  render() {
    const {
      size,
      handle,
      handleSize,
      maxValue,
      minValue,
      startAngle,
      endAngle,
      angleType,
      disabled,
      trackColors,
      children,
      trackWidth,
    } = this.props;
    const thermoInnerScale = 1.5;
    const trackInnerRadius = size / 2 - trackWidth;
    const handleAngle = valueToAngle({
      value: handle.value,
      minValue,
      maxValue,
      startAngle,
      endAngle,
    });
    const handlePosition = angleToPosition(
      { degree: handleAngle, ...angleType },
      trackInnerRadius + trackWidth / 2,
      size
    );
    const controllable = !disabled && Boolean(handle.onChange);

    return <Wrapper>
      <svg
        width={size}
        height={size}
        ref={this.svgRef}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onClick={
          /* TODO: be smarter about this -- for example, we could run this through our
          calculation and determine how close we are to the arc, and use that to decide
          if we propagate the click. */
          (ev) => controllable && ev.stopPropagation()
        }
      >
        {trackColors && <defs>
          <linearGradient id="gradient" x1="100%" x2="0">
            {trackColors.map((color, index) => <stop key={index} offset={`${index / trackColors.length * 100}%`} stopColor={color}></stop>)}
          </linearGradient>
        </defs>}
        <React.Fragment>
          <path
            d={arcPathWithRoundedEnds({
              startAngle,
              endAngle,
              angleType,
              innerRadius: trackInnerRadius,
              thickness: trackWidth,
              svgSize: size,
              direction: angleType.direction,
            })}
            fill={trackColors.length ? 'url(#gradient)' : '#aaa'}
          />
        </React.Fragment>

        {
          controllable && (
            <React.Fragment>
              <filter
                id="handleShadow"
                x="-50%"
                y="-50%"
                width="16"
                height="16"
              >
                <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                <feColorMatrix
                  result="matrixOut"
                  in="offOut"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feGaussianBlur
                  result="blurOut"
                  in="matrixOut"
                  stdDeviation="5"
                />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
              <circle
                r={handleSize}
                cx={handlePosition.x}
                cy={handlePosition.y}
                fill="#ffffff"
                filter="url(#handleShadow)"
              />
            </React.Fragment>
          )
        }
      </svg>
      {/* <Thermometer value={handle.value} min={minValue} max={maxValue} thickness={trackWidth} size={size} /> */}
    </Wrapper>
  }
}
interface ThermometerProps {
  size: number;
  thickness: number;
  className?: string;
  min: number;
  max: number;
  value: number;
}
function ThermometerBase({
  size,
  thickness,
  className,
  min,
  max,
  value,
}: ThermometerProps) { 
  const height = size * 1.5;
  const center = size / 2;
  // shrink the inner track from the main track, just a design choice here.
  const _thickness = thickness / INNER_TRACK_SIZE;
  // calculate the size of the main bottom circle based on the input size
  const circleSize = (size - (_thickness * 4.5)) / 2;
  const radius = circleSize / 2;
  // input value percentage between min and max
  const percent = ((value - min) * 100) / (max - min);
  // / 100 * percent
  const fullBarHeight = (height - circleSize - radius);
  // the minimum value the growing center should go to
  const growingMinY = fullBarHeight - radius - _thickness;
  // the max height the growing center should go to
  const growingMaxY = radius;
  const innerHeight = fullBarHeight - growingMaxY - growingMinY;

  const scaling = ((growingMaxY - growingMinY) * percent / 100) + growingMinY;
  console.log('min', scaling)
  return(
    <svg className={className} width={size} height={size * 1.5}>
      <mask id="innerMask">
        <rect id="mask-fill" x="0" y="0" width={size} height={size * 1.5} fill="white" />
        <circle id="center-circle-mask" cx={center} cy={height - circleSize} r={circleSize - _thickness}  />
        <circle id="top-cap-mask" cx={center} cy={circleSize - _thickness - ((circleSize - _thickness * 2) / 2)} r={(circleSize - _thickness * 2) / 2} />
        <rect id="inside-thermo-mask" x={center - radius + _thickness} y={radius} width={circleSize - _thickness * 2} height={height - circleSize - radius} mask="url(#innerMask)" />
      </mask>
      <circle id="main-circle" cx={center} cy={height - circleSize} r={circleSize} mask="url(#innerMask)" />
      <circle id="top-cap" fill="green" cx={center} cy={radius} r={radius} mask="url(#innerMask)" />
      <circle id="center-circle" fill="red" cx={center} cy={height - circleSize} r={circleSize - (_thickness * 2)} />
      <rect id="thermo-sides" x={center - radius} y={radius} width={circleSize} height={height - circleSize - radius}  mask="url(#innerMask)" />
      <g>
        <circle id="growing-thermo-cap" fill="green" cx={center} cy={scaling} r={_thickness / 2} />
        <rect fill="purple" id="growing-thermo" x={center - (_thickness / 2)} y={scaling} width={_thickness} height={fullBarHeight - scaling} />
      </g>
      <circle id="debug-circle" fill="blue" cx={center} cy={height - circleSize} r={2}  />
    </svg>
  );
}