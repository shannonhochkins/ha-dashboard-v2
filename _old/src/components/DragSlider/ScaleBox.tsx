import { useMemo, useContext } from "react";
import styled from "@emotion/styled";
import { IntersectionContext } from "./IntersectionObserver";
import { motion } from "framer-motion";

const MotionBox = styled(motion.div)`
  display: flex;
`;

export interface ScaleBoxProps {
  children: React.ReactNode;
  delayOrder?: number;
  // order of appearance
  duration?: number;
  // [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;
  easing?: [number, number, number, number];
}

export const ScaleBox = ({
  children,
  delayOrder = 0,
  duration = 0.4,
  easing = [0.42, 0, 0.58, 1],
}: ScaleBoxProps) => {
  const { inView } = useContext(IntersectionContext);
  const transition = useMemo(
    () => ({
      duration,
      delay: delayOrder / 5,
      ease: easing,
    }),
    [duration, delayOrder, easing],
  );

  const variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: transition,
    },
  };

  return (
    <MotionBox
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      {children}
    </MotionBox>
  );
};
