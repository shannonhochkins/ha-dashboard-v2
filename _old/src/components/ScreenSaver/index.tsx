import { MotionProps, motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ScreenSaverProps extends MotionProps {
  duration?: number; // in milliseconds
  children: React.ReactNode;
}

const ScreenSaverElement = styled(motion.div)`
  position: fixed;
  inset: 0;
`;

// Define the animation variants for fading in and out
const screenSaverVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export function ScreenSaver({
  duration = 120000,
  children,
  ...rest
}: ScreenSaverProps) {
  const startTime = useRef<number>(Date.now());
  const [showScreenSaver, setShowScreenSaver] = useState<boolean>(false);

  const resetTimer = () => {
    startTime.current = Date.now();
    setShowScreenSaver(false);
  };

  useEffect(() => {
    const checkForScreenSaverActivation = () => {
      if (Date.now() - startTime.current > duration) {
        setShowScreenSaver(true);
      }
    };
    // Polling interval to check if screen saver should be shown
    const interval = setInterval(checkForScreenSaverActivation, 10000);

    // Event listener for window focus
    const onFocus = () => {
      checkForScreenSaverActivation();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [duration]);

  useEffect(() => {
    // Add event listeners for user interactions
    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("mousemove", resetTimer);

    return () => {
      // Clean up event listeners
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
    };
  }, []);
  return ReactDOM.createPortal(
    <AnimatePresence>
      {showScreenSaver && (
        <ScreenSaverElement
          variants={screenSaverVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          {...rest}
        >
          {children}
        </ScreenSaverElement>
      )}
    </AnimatePresence>,
    document.body,
  );
}
