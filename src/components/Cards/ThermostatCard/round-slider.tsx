import React, { useState, useRef, ReactNode, DragEvent, MouseEvent, TouchEvent, useEffect } from 'react';
import styled from '@emotion/styled';

interface RoundSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  startAngle?: number;
  arcLength?: number;
  handleSize?: number;
  handleZoom?: number;
  disabled?: boolean;
  dragging?: boolean;
  valueLabel?: string;
  readonly?: boolean;
  rtl?: boolean;
}

interface Rotation {
  handle: SVGPathElement;
  min: number;
  max: number;
  type: string;
  cooldown: number;
};

const RoundSliderContainer = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 200px;
`;

const HandleContainer = styled.g`
  stroke: var(
    --round-slider-handle-color,
    var(--round-slider-bar-color, deepskyblue)
  );
  stroke-linecap: round;
  cursor: var(--round-slider-handle-cursor, pointer);
`;
const Handle = styled.g`
  &:focus {
    outline: unset;
  }
`;

const Path = styled.path`
  transition: stroke 1s ease-out, stroke-width 200ms ease-out;
`;

const Bar = styled.path`
  stroke: var(--round-slider-bar-color, deepskyblue);
`;

const Slider = styled.g`
  fill: none;
  stroke-width: var(--round-slider-path-width, 3);
  stroke-linecap: var(--round-slider-linecap, round);
`;
const Svg = styled.svg`
  overflow: visible;
  display: block;
  &[disabled] {
    ${Bar} {
      stroke: var(--round-slider-disabled-bar-color, darkgray);
    }
    ${HandleContainer} {
      stroke: var(--round-slider-disabled-bar-color, darkgray);
    }
  }

`;

export function RoundSlider({
  value,
  readonly = false,
  min = 0,
  max = 100,
  step = 1,
  startAngle = 135,
  arcLength = 270,
  handleSize = 6,
  handleZoom = 1.5,
  valueLabel = '',
  disabled = false,
  rtl = false,
}: RoundSliderProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState<Rotation>(undefined);
  const [handleValue, setHandleValue] = useState(value);
  const svgRef = useRef(null);
  const handleRef = useRef(null);
  const [ready, setReady] = useState(false);

  const start = (startAngle * Math.PI) / 180;
  const len =  Math.min((arcLength * Math.PI) / 180, 2 * Math.PI - 0.01);
  const end = start + len;
  const showHandle = readonly ? false : value == null ? false : true;
  console.log('rotation', rotation);
  useEffect(() => {
    if (value !== handleValue) {
      setHandleValue(value);
    }
  }, [value])

  useEffect(() => {
    document.addEventListener("mouseup", e => dragEnd(e));
    document.addEventListener("touchend", e => dragEnd(e), {
      passive: false,
    });
    document.addEventListener("mousemove", e => drag(e));
    document.addEventListener("touchmove", e => drag(e), {
      passive: false,
    });
    setReady(true);
    return () => {
      // document.removeEventListener("mouseup", e => dragEnd(e));
      // document.removeEventListener("touchend", e => dragEnd(e));
      // document.removeEventListener("mousemove", e => drag(e));
      // document.removeEventListener("touchmove", e => drag(e));
    }
  }, []);

  useEffect(() => {
    if (!svgRef || !svgRef.current) return;
    // Adjust margin in the bar slider stroke width is greater than the handle size
    if (svgRef.current.querySelector(".slider")) {
      const styles = window.getComputedStyle(
        svgRef.current.querySelector(".slider")
      );
      if (styles && styles["strokeWidth"]) {
        const stroke = parseFloat(styles["strokeWidth"]);
        if (stroke > handleSize * handleZoom) {
          const view = boundaries();
          const margin = `
          ${(stroke / 2) * Math.abs(view.up)}px
          ${(stroke / 2) * Math.abs(view.right)}px
          ${(stroke / 2) * Math.abs(view.down)}px
          ${(stroke / 2) * Math.abs(view.left)}px`;
          svgRef.current.style.margin = margin;
        }
      }
    }

    // Workaround for vector-effect not working in IE and pre-Chromium Edge
    // That's also why the _scale property exists
    // if (
    //   svgRef.current &&
    //   svgRef.current.style.vectorEffect === undefined
    // ) {
    //   if (scale != 1) {
    //     svgRef.current
    //       .querySelectorAll("path")
    //       .forEach((e) => {
    //         if (e.getAttribute("stroke-width")) return;
    //         const orig = parseFloat(
    //           getComputedStyle(e).getPropertyValue("stroke-width")
    //         );
    //         // e.style.strokeWidth = `${orig * scale}px`;
    //       });
    //   }
    //   const rect = svgRef.current.getBoundingClientRect();
    //   const $scale = Math.max(rect.width, rect.height);
    //   // setScale(2 / $scale);
    // }
  }, [scale, handleSize, handleZoom])

  function angleInside(angle: number): boolean {
    // Check if an angle is on the arc
    let a = ((startAngle + arcLength / 2 - angle + 180 + 360) % 360) - 180;
    return a < arcLength / 2 && a > -arcLength / 2;
  }

  function angle2xy(angle: number): { x: number; y: number } {
    if (rtl) return { x: -Math.cos(angle), y: Math.sin(angle) };
    return { x: Math.cos(angle), y: Math.sin(angle) };
  }

  function xy2angle(x: number, y: number): number {
    if (rtl) x = -x;
    return (Math.atan2(y, x) - start + 2 * Math.PI) % (2 * Math.PI);
  }

  function value2angle(value: number): number {
    value = Math.min(max, Math.max(min, value));
    const fraction = (value - min) / (max - min);
    return start + fraction * len;
  }

  function angle2value(angle: number): number {
    return (
      Math.round(
        ((angle / len) * (max - min) + min) / step
      ) * step
    );
  }

  function boundaries() {
    // Get the maximum extents of the bar arc
    const _start = angle2xy(start);
    const _end = angle2xy(end);

    let up = 1;
    if (!angleInside(270)) up = Math.max(-_start.y, -_end.y);

    let down = 1;
    if (!angleInside(90)) down = Math.max(_start.y, _end.y);

    let left = 1;
    if (!angleInside(180)) left = Math.max(-_start.x, -_end.x);

    let right = 1;
    if (!angleInside(0)) right = Math.max(_start.x, _end.x);

    return {
      up,
      down,
      left,
      right,
      height: up + down,
      width: left + right,
    };
  }

  function mouse2value(ev: TouchEvent | MouseEvent) {
    const mouseX = ev.type.startsWith("touch")
      ? (ev as TouchEvent).touches[0].clientX
      : (ev as MouseEvent).clientX;
    const mouseY = ev.type.startsWith("touch")
      ? (ev as TouchEvent).touches[0].clientY
      : (ev as MouseEvent).clientY;
    // TODO get react reg for svg
    const rect = svgRef.current.getBoundingClientRect();
    const $boundaries = boundaries();
    const x =
      mouseX - (rect.left + ($boundaries.left * rect.width) / $boundaries.width);
    const y =
      mouseY - (rect.top + ($boundaries.up * rect.height) / $boundaries.height);

    const angle = xy2angle(x, y);
    const pos = angle2value(angle);
    return pos;
  }

  function dragStart(ev: DragEvent<SVGPathElement | SVGSVGElement> | TouchEvent<SVGPathElement | SVGSVGElement> | MouseEvent<SVGPathElement | SVGSVGElement>, type: 'shadow' | 'handle'): void {
    if (!showHandle || disabled) return;
    let handle = ev.target as SVGPathElement;
    let cooldown = undefined;

    // Avoid double events mouseDown->focus
    if (rotation && rotation.type !== "focus") return;

    // If the bar was touched, find the nearest handle and drag from that
    // if (handle.classList.contains("shadowpath")) {
    //   if (ev.type === "touchstart")
    //     cooldown = window.setTimeout(() => {
    //       if (rotation) rotation.cooldown = undefined;
    //     }, 200);
    //   handle = svgRef.current.querySelector("#value") as SVGPathElement;
    // }

    // // If an invisible handle was clicked, switch to the visible counterpart
    // if (handle.classList.contains("overflow"))
    //   handle = handle.nextElementSibling as SVGPathElement;

    // if (!handle.classList.contains("handle")) return;

    // handle.setAttribute(
    //   "stroke-width",
    //   String(2 * handleSize * handleZoom * scale)
    // );
    console.log('setting rotation');

    setRotation({
      handle,
      min,
      max,
      type: ev.type,
      cooldown,
    });
    
    const pos = mouse2value(ev);
    dragpos(pos);
  }

  function cleanupRotation(): void {
    const handle = rotation.handle;
    // handle.setAttribute(
    //   "stroke-width",
    //   String(2 * handleSize * scale)
    // );
    console.log('cleaning up rotation');
    setRotation(undefined);

    handle.blur();
  }

  function dragEnd(_ev: DragEvent<SVGPathElement> | TouchEvent<SVGPathElement> | MouseEvent<SVGPathElement>): void {
    if (!showHandle || disabled) return;
    if (!rotation) return;

    const handle = rotation.handle;
    // cleanupRotation();
  }

  function drag(ev: TouchEvent | MouseEvent): void {
    if (!showHandle || disabled) return;
    if (!rotation) return;
    

    
    // if (rotation.cooldown) {
    //   window.clearTimeout(rotation.cooldown);
    //   cleanupRotation();
    //   return;
    // }
    if (rotation.type === "focus") return;

    

    ev.preventDefault();

    const pos = mouse2value(ev);

    dragpos(pos);
  }

  function dragpos(pos: number): void {
    if (pos < min || pos > max) return;
    setHandleValue(pos);
  }

  function renderArc(start: number, end: number) {
    const diff = end - start;
    const startXY = angle2xy(start);
    const endXY = angle2xy(end + 0.001); // Safari doesn't like arcs with no length
    return `
      M ${startXY.x} ${startXY.y}
      A 1 1,
        0,
        ${diff > Math.PI ? "1" : "0"} ${rtl ? "0" : "1"},
        ${endXY.x} ${endXY.y}
    `;
  }

  function renderHandle(): ReactNode {
    const theta = value2angle(handleValue);
    const pos = angle2xy(theta);
    console.log('theta', theta, pos, handleValue);
    const label = this.valueLabel || "";
    // Two handles are drawn. One visible, and one invisible that's twice as
    // big. Makes it easier to click.
    return <Handle className={`value handle`}>
      <Path
        id="value"
        className="overflow"
        d={`M ${pos.x} ${pos.y}L ${pos.x + 0.001} ${pos.y + 0.001}`}
        vectorEffect="non-scaling-stroke"
        stroke="rgba(0,0,0,0)"
        // strokeWidth={`${4 * handleSize * scale}`}
        />
      <Path
        id="value"
        className="handle"
        d={`M ${pos.x} ${pos.y} L ${pos.x + 0.001} ${pos.y + 0.001}`}
        vectorEffect="non-scaling-stroke"
        strokeWidth={12}
        tabIndex={0}
        ref={handleRef}
        onFocus={e => dragStart(e)}
        onBlur={e => dragEnd(e)}
        role="slider"
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        aria-valuenow={handleValue}
        aria-disabled={this.disabled}
        aria-label={label || ""}
        />
    </Handle>
  }

  const view = boundaries();
  return ready ? <RoundSliderContainer>
    <Svg
      ref={svgRef}
      xmln="http://www.w3.org/2000/svg"
      viewBox={`${-view.left} ${-view.up} ${view.width} ${view.height}`}
      style={{
        margin: handleSize * handleZoom
      }}
      focusable="false"
    >
      <Slider className="slider">
        <Path
          className="path"
          d={renderArc(start, end)}
          vectorEffect="non-scaling-stroke"
        />
        <Bar
          className="bar"
          vectorEffect="non-scaling-stroke"
          d={renderArc(
            value2angle(min),
            value2angle(value)
          )}
        />
        <Path
          className="shadowpath"
          d={renderArc(start, end)}
          vectorEffect="non-scaling-stroke"
          onClick={e => dragStart(e)}
          stroke="rgba(0,0,0,0)"
          strokeWidth={18}
          strokeLinecap="butt"
        />
      </Slider>

      <HandleContainer className="handles">
        {showHandle ? renderHandle() : null}
      </HandleContainer>
    </Svg>
  </RoundSliderContainer> : null;
}