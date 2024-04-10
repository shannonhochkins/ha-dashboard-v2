import { useContext, useMemo, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { IntersectionContext } from "./IntersectionObserver";
const MotionBox = styled(motion.div)`
  display: flex;
  width: 100%;
`;

export interface FadeInUpBoxProps {
  children: React.ReactNode;
  // y initial possition
  yOffset?: number;
  // animation duration
  duration?: number;
  // [number, number, number, number] | "linear" | "easeIn" |
  //  "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" |
  // "backInOut" | "anticipate" | EasingFunction;
  easing?: [number, number, number, number];
  delayOrder?: number; // order of appearance
}

export const FadeInUpBox = ({
  children,
  yOffset = 24,
  duration = 0.4,
  easing = [0.42, 0, 0.58, 1],
  delayOrder, // order of appearance
}: FadeInUpBoxProps) => {
  const { inView } = useContext(IntersectionContext);
  const [delay, setDelay] = useState(0.25);

  const offset = 0.4;

  useEffect(() => {
    if (delayOrder) return setDelay(delayOrder * offset);
  }, [delayOrder, offset]);

  const transition = useMemo(
    () => ({
      duration,
      delay,
      ease: easing,
    }),
    [delay, duration, easing],
  );

  const variants = {
    hidden: { y: yOffset, opacity: 0, transition },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition,
    },
  };

  return (
    <MotionBox
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      {children} {inView}
    </MotionBox>
  );
};
