import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, PanInfo } from "framer-motion";
import { wrap } from "../../utils";
import { Column } from "@hakit/components";
import styled from "@emotion/styled";

const SliderContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 200px;
  min-width: 200px;
  overflow: hidden;
`;

const Child = styled(motion.div)``;

const StyledDot = styled.div`
  width: 10px;
  height: 10px;
  background: var(--ha-S200);
  border-radius: 50%;
  position: relative;
`;

const StyledDots = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background: var(--ha-S300);
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

const DotHighlight = styled(motion.div)`
  background: var(--ha-A400);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  position: absolute;
  top: -2px;
  left: -2px;
`;

const DotContainer = styled.div`
  cursor: pointer;
  padding: 0.5rem;
`;

/**
 * Using AnimatePresence and drag for a slideshow and layoutId
 * for a pagination indicator.
 *
 * Add and remove pages from the array to checkout how the gestures
 * and pagination animations are fully data and layout-driven.
 */

interface PaginatedWidgetProps {
  pages: Page[];
  currentPage?: number;
}

export function PaginatedWidget({
  pages,
  currentPage: _currentPage = 0,
}: PaginatedWidgetProps) {
  /*
   * We keep track of the pagination direction as well as current page, this way we
   * can dynamically generate different animations depending on the direction of travel
   */
  const [[currentPage, direction], setCurrentPage] = useState([
    _currentPage,
    0,
  ]);

  function setPage(newPage: number, newDirection?: number) {
    if (!newDirection) newDirection = newPage - currentPage;
    setCurrentPage([newPage, newDirection]);
  }

  useEffect(() => {
    setCurrentPage([_currentPage, 0]);
  }, [_currentPage]);

  return (
    <Column
      fullWidth
      fullHeight
      wrap="nowrap"
      gap="1rem"
      style={{
        position: "relative",
      }}
    >
      <Slides
        pages={pages}
        currentPage={currentPage}
        direction={direction}
        setPage={setPage}
      />
      {pages.length > 1 && (
        <Pagination pages={pages} currentPage={currentPage} setPage={setPage} />
      )}
    </Column>
  );
}

/**
 * Variants define visual states that a motion component can be in at any given time.
 * These can be dynamic - here the enter and exit variants are functions that return
 * different values based on the current direction.
 */
const xOffset = 100;
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? xOffset : -xOffset,
    height: 0,
    opacity: 0,
  }),
  active: {
    x: 0,
    height: "auto",
    opacity: 1,
    transition: { delay: 0.2 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -xOffset : xOffset,
    opacity: 0,
    height: 0,
    position: "absolute",
  }),
};

export interface Page {
  children: React.ReactNode;
}

interface SlidesProps {
  currentPage: number;
  setPage: (newPage: number, newDirection?: number) => void;
  direction: number;
  pages: Page[];
}

function Slides({ currentPage, setPage, direction, pages }: SlidesProps) {
  const hasPaginated = useRef(false);

  function detectPaginationGesture(
    _: MouseEvent | TouchEvent | PointerEvent,
    { offset }: PanInfo,
  ) {
    if (hasPaginated.current) return;
    let newPage = currentPage;
    const threshold = xOffset / 2;

    if (offset.x < -threshold) {
      // If we're dragging left, go forward a page
      newPage = currentPage + 1;
    } else if (offset.x > threshold) {
      // If we're dragging right, go backwards a page
      newPage = currentPage - 1;
    }

    if (newPage !== currentPage) {
      hasPaginated.current = true;
      // Wrap the page index to within the permitted page range
      newPage = wrap(0, pages.length, newPage);
      setPage(newPage, offset.x < 0 ? 1 : -1);
    }
  }

  return (
    <SliderContainer layout className="slider-container">
      <AnimatePresence
        // Disable entry animations when AnimatePresence mounts, but allow
        // them when new children enter.
        initial={false}
        // This will be used for components to resolve exit variants. It's neccessary
        // as removed components won't rerender with the latest state (as they've been removed)
        custom={direction}
      >
        <Child
          // Changing the key of the component remounts it - we are creating a new slide
          // per page. This is why we see multiple slides at once despite only rendering
          // one component at a time.
          key={currentPage}
          className="slide"
          data-page={currentPage}
          // @ts-expect-error - FIX LATER
          variants={variants}
          initial="enter"
          animate="active"
          exit="exit"
          drag={pages.length > 1 ? "x" : false}
          onDrag={detectPaginationGesture}
          onDragStart={() => (hasPaginated.current = false)}
          onDragEnd={() => (hasPaginated.current = true)}
          // Snap the component back to the center if it hasn't paginated
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          // This will be used for components to resolve all other variants, in
          // this case initial and animate.
          custom={direction}
        >
          {pages[currentPage].children}
        </Child>
      </AnimatePresence>
    </SliderContainer>
  );
}

interface PaginationProps {
  currentPage: number;
  setPage: (newPage: number) => void;
  pages: Page[];
}

function Pagination({ currentPage, setPage, pages }: PaginationProps) {
  // Wrap all the pagination dots with AnimateSharedPresence so we can detect
  // when dots with a layoutId are removed/added
  return (
    <LayoutGroup>
      <StyledDots className="dots">
        {pages.map((_, index) => (
          <Dot
            key={index}
            onClick={() => setPage(index)}
            isSelected={index === currentPage}
          />
        ))}
      </StyledDots>
    </LayoutGroup>
  );
}

interface DotProps {
  isSelected: boolean;
  onClick: () => void;
}

function Dot({ isSelected, onClick }: DotProps) {
  return (
    <DotContainer className="dot-container" onClick={onClick}>
      <StyledDot className="dot">
        {isSelected && (
          // By setting layoutId, when this component is removed and a new one
          // is added elsewhere, the new component will animate out from the old one.
          <DotHighlight className="dot-highlight" layoutId="highlight" />
        )}
      </StyledDot>
    </DotContainer>
  );
}
