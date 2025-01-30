import {
  motion,
  type MotionProps,
  Variants,
  type PanInfo,
} from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Children,
  isValidElement,
  ComponentPropsWithoutRef,
} from "react";
import styled from "@emotion/styled";
import { useResizeDetector } from "react-resize-detector";
import { FabCard } from "@hakit/components";

const CardBase = styled(motion.div)`
  height: 100%;
  max-height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
type Extendable = MotionProps & ComponentPropsWithoutRef<"div">;
interface CardProps extends Extendable {
  index: number;
  onSizeChange: (index: number, width: number, height: number) => void;
  width?: number;
  height?: number;
}

function ResizeCard({ index, onSizeChange, ...rest }: CardProps) {
  const targetRef = useRef(null);
  const { width, height } = useResizeDetector({ targetRef });
  useEffect(() => {
    if (height && width) {
      onSizeChange(index, width, height);
    }
  }, [onSizeChange, index, width, height]);

  return <CardBase ref={targetRef} {...rest} />;
}

const MainWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  .wrapper {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50%;
    pointer-events: none;
    z-index: 3;
    button {
      &:not(:disabled),
      &:not(.disabled) {
        pointer-events: auto;
      }
      top: 0;
      &:first-of-type {
        position: absolute;
        left: 0;
        translate: 50% -50%;
      }
      &:last-of-type {
        position: absolute;
        right: 0;
        translate: -50% -50%;
      }
    }
  }
`;

interface CustomProps {
  activeIndex: number;
  currentIndex: number;
  direction: number;
  x: number;
  inactiveBlur: number;
  inactiveScaleMultiplier: number;
}

const variants: Variants = {
  enter: ({ direction }: CustomProps) => {
    const xInitial = direction < 1 ? 50 : -50; // Adjust this value as needed
    return {
      scale: 0.2, // Or any initial scale based on index
      x: xInitial,
      opacity: 0,
    };
  },
  center: ({
    activeIndex,
    inactiveBlur,
    currentIndex,
    direction,
    x,
    inactiveScaleMultiplier,
  }: CustomProps) => {
    let scale = 1;
    let opacity = 1;
    let blurValue = "0px"; // No blur by default
    if (currentIndex > activeIndex) {
      opacity = 0.9;
    }
    if (currentIndex < activeIndex) {
      // Apply blur effect to items before the active index
      blurValue = `${inactiveBlur}px`; // Adjust this value as needed
      opacity = 0.9;
      // Scale and translate items before the active index
      const scaleDifference =
        inactiveScaleMultiplier * (activeIndex - currentIndex);
      scale = Math.max(0, 1 - scaleDifference);
    }
    return {
      scale: scale,
      filter: `blur(${blurValue})`,
      x,
      zIndex: getZIndex({ activeIndex, currentIndex, direction }),
      opacity: scale === 0 ? 0 : opacity,
    };
  },
  // ... center variant as previously defined ...
  exit: ({ direction }: CustomProps) => {
    const xExit = direction < 1 ? -50 : 50; // Adjust this value as needed
    return {
      scale: 0.2, // Or any exit scale based on index
      x: xExit,
      opacity: 0,
    };
  },
};

function getZIndex({
  activeIndex,
  currentIndex,
  direction,
}: Pick<CustomProps, "activeIndex" | "currentIndex" | "direction">) {
  if (direction < 0) {
    return undefined; // Don't change z-index when moving backwards
  }
  if (currentIndex === activeIndex) {
    return 3; // Highest z-index for the active item
  } else {
    // ensure items after the before the active index are less than the active index
    return 2;
  }
}
// drag distance to check if we should change page
const X_OFFSET_THRESHOLD = 100;
export interface ContextSliderProps extends Omit<Extendable, "children"> {
  /** spacing should be a css spacing in pixels */
  spacing?: number;
  /** the offset of the inactive elements, set this to false to behave like a generic slider @default 150 */
  inactiveOffset?: number | false;
  /** inactive items have a scale multiplier applied based on the active index, tweak this multiplier if need be @default 0.1 */
  inactiveScaleMultiplier?: number;
  /** thew blur to apply the the inactive items in pixels @default 15 */
  inactiveBlur?: number;
  /** the children for the slider */
  items: React.ReactNode[];
}

export const ContextSlider = ({
  spacing = 20,
  inactiveOffset = 150,
  inactiveScaleMultiplier = 0.1,
  inactiveBlur = 15,
  items,
  ...rest
}: ContextSliderProps) => {
  const dragDirection = useRef(0);
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const [widths, setWidths] = useState<number[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperOffset, setWrapperOffset] = useState(0);
  // we want the scope to be always to be in the scope of the array so that the slider is endless
  const indexInArrayScope =
    ((activeIndex % items.length) + items.length) % items.length;

  const hasPaginated = useRef(false);
  const changePage = useCallback(
    (newDirection: number) => {
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex[0] + newDirection;
        // Prevent moving past the start or end of the array
        if (newIndex < 0 || newIndex >= items.length) {
          return prevIndex;
        }
        return [newIndex, newDirection];
      });
    },
    [items],
  );

  const detectPaginationGesture = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
      if (hasPaginated.current) return;
      const threshold = X_OFFSET_THRESHOLD / 2;
      const isAtEnd = activeIndex === items.length - 1;
      const isAtStart = activeIndex === 0;
      if (offset.x < -threshold && !isAtEnd) {
        // If we're dragging left, go forward a page
        dragDirection.current = 1;
      } else if (offset.x > threshold && !isAtStart) {
        // If we're dragging right, go backwards a page
        dragDirection.current = -1;
      } else {
        dragDirection.current = 0;
      }
    },
    [items, activeIndex],
  );

  useEffect(() => {
    // Dependency on itemDimensions to re-calculate when items change
    // This will shift the carousel offset so that the active item is centered in the screen
    if (wrapperRef.current && widths.length > 0) {
      const wrapperWidth = wrapperRef.current.clientWidth;
      const firstItemWidth = widths[activeIndex];
      const offset = wrapperWidth / 2 - firstItemWidth / 2;
      setWrapperOffset(offset);
    }
  }, [widths, activeIndex]);

  const calculateXPosition = (activeIndex: number, currentIndex: number) => {
    // move this to a memo for performance
    let xTranslation = 0;

    if (currentIndex < activeIndex) {
      for (let i = 0; i < currentIndex; i++) {
        xTranslation -= widths[i] + spacing; // Add your spacing value
      }
      if (inactiveOffset === false) {
        // Apply the additional offset
        xTranslation -= widths[currentIndex] * (activeIndex - currentIndex);
      } else {
        // Apply the additional offset
        xTranslation -= inactiveOffset * (activeIndex - currentIndex);
      }
    } else {
      for (let i = 0; i < activeIndex; i++) {
        xTranslation -= widths[i] + spacing;
      }
    }
    return xTranslation;
  };

  return (
    <MainWrapper
      dragElastic={0}
      dragMomentum={false}
      drag={items.length > 1 ? "x" : false}
      onDrag={detectPaginationGesture}
      onDragStart={() => (hasPaginated.current = false)}
      onDragEnd={() => {
        hasPaginated.current = true;
        if (dragDirection.current !== 0) {
          changePage(dragDirection.current);
        }
      }}
      // Snap the component back to the center if it hasn't paginated
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      {...rest}
    >
      <div
        className="wrapper"
        ref={wrapperRef}
        style={{
          gap: `${spacing}px`,
        }}
      >
        {/*AnimatePresence is necessary to show the items after they are deleted because only max. 3 are shown*/}
        {Children.map(items, (item, index) => {
          if (!isValidElement(item)) {
            return null;
          }
          // The layout prop makes the elements change its position as soon as a new one is added
          // The key tells framer-motion that the elements changed its position
          return (
            <ResizeCard
              className="card"
              key={index}
              onSizeChange={(index, width) => {
                // only set the widths if they are different
                if (widths[index] !== width) {
                  setWidths((prev) => {
                    const copy = [...prev];
                    copy[index] = width;
                    return copy;
                  });
                }
              }}
              index={index}
              layout
              custom={{
                activeIndex: indexInArrayScope,
                currentIndex: index,
                direction,
                inactiveBlur,
                inactiveScaleMultiplier,
                x: calculateXPosition(activeIndex, index) + wrapperOffset,
              }}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.5,
              }}
            >
              {item}
            </ResizeCard>
          );
        })}
      </div>
      <div className="buttons">
        <FabCard
          disabled={activeIndex === 0}
          whileTap={{ scale: 0.8 }}
          onClick={() => changePage(-1)}
          icon="mdi:chevron-left"
          cssStyles={`
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            backdrop-filter: blur(5px);
            border: 2px solid rgba(255, 255, 255, 0.1);
          `}
        />
        <FabCard
          disabled={activeIndex === items.length - 1}
          icon="mdi:chevron-right"
          cssStyles={`
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            backdrop-filter: blur(5px);
            border: 2px solid rgba(255, 255, 255, 0.1);
          `}
          whileTap={{ scale: 0.8 }}
          onClick={() => changePage(1)}
        />
      </div>
    </MainWrapper>
  );
};
