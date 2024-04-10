import React, { useEffect, useRef, useState, isValidElement } from "react";
import styled from "@emotion/styled";
import {
  MotionValue,
  useMotionValue,
  motion,
  MotionProps,
} from "framer-motion";

import { ScaleBox } from "./ScaleBox";
import { FadeInUpBox } from "./FadeInUpBox";
import { IntersectionObserver } from "./IntersectionObserver";

const Slider = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

interface SliderWrap extends MotionProps {
  children: React.ReactNode;
  sliderRef: React.MutableRefObject<HTMLDivElement | null>;
  x: MotionValue<number>;
  sliderConstraints: number;
  bounceStiffness: number;
  bounceDamping: number;
}

const SliderWrap = ({
  children,
  sliderRef,
  x,
  sliderConstraints,
  bounceStiffness,
  bounceDamping,
  ...rest
}: SliderWrap) => {
  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <Slider
        ref={sliderRef}
        whileTap={{ cursor: "grabbing" }}
        drag="x"
        initial={{ x: 0 }}
        style={{ x }}
        dragConstraints={{
          left: -sliderConstraints,
          right: 0,
        }}
        dragTransition={{ bounceStiffness, bounceDamping }}
        {...rest}
      >
        {children}
      </Slider>
    </div>
  );
};

interface DragSliderProps extends MotionProps {
  children: React.ReactNode;
  // animation effect
  slideApperance?: "scale" | "fadeIn";
  // Affects the stiffness of the bounce spring. Higher values will create more sudden movement.
  bounceStiffness?: number;
  // affects the damping of the bounce spring. If set to 0, spring will oscillate indefinitely.
  bounceDamping?: number;
}

export const DragSlider = ({
  children,
  slideApperance, // scale | fadeIn
  bounceStiffness = 100,
  bounceDamping = 10,
  ...rest
}: DragSliderProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const calcSliderChildrenWidth = () => {
      setSliderChildrenWidth(ref?.current?.scrollWidth ?? 0);
    };

    calcSliderChildrenWidth();

    const calcSliderWidth = () => {
      setSliderWidth(ref?.current?.clientWidth ?? 0);
    };

    calcSliderWidth();
    window.addEventListener("resize", calcSliderWidth);

    const calcSliderConstraints = () => {
      setSliderConstraints(sliderChildrenWidth - sliderWidth);
    };

    calcSliderConstraints();
    window.addEventListener("resize", calcSliderConstraints);
    return () => {
      window.removeEventListener("resize", calcSliderWidth);
      window.removeEventListener("resize", calcSliderConstraints);
    };
  }, [sliderChildrenWidth, sliderWidth, ref]);

  return (
    <SliderWrap
      sliderRef={ref}
      x={x}
      sliderConstraints={sliderConstraints}
      bounceStiffness={bounceStiffness}
      bounceDamping={bounceDamping}
      {...rest}
    >
      {slideApperance === "scale" ? (
        <>
          {React.Children.map(children, (child: React.ReactNode) => {
            if (isValidElement<"div">(child)) {
              return (
                <IntersectionObserver reset>
                  <ScaleBox>{React.cloneElement(child)}</ScaleBox>
                </IntersectionObserver>
              );
            }
          })}
        </>
      ) : slideApperance === "fadeIn" ? (
        <>
          {React.Children.map(children, (child: React.ReactNode) => {
            if (isValidElement<"div">(child)) {
              return (
                <IntersectionObserver reset>
                  <FadeInUpBox yOffset={0} duration={0.25}>
                    {React.cloneElement(child)}
                  </FadeInUpBox>
                </IntersectionObserver>
              );
            }
          })}
        </>
      ) : (
        <>{children}</>
      )}
    </SliderWrap>
  );
};
