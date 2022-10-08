import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';

export interface FullScreenHandle {
  active: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  node: React.MutableRefObject<HTMLDivElement | null>;
}

export interface FullScreenProps {
  handle: FullScreenHandle;
  children: any;
  onChange?: (state: boolean, handle: FullScreenHandle) => void;
  className?: string;
}

export function useFullScreen(): FullScreenHandle {
  const [active, setActive] = useState<boolean>(false);
  const node = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleChange = () => {
      setActive(document.fullscreenElement === node.current);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const enter = useCallback(() => {
    if (document.fullscreenElement) {
      return document.exitFullscreen().then(() => {
        return node.current.requestFullscreen();
      });
    } else if (node.current) {
      return node.current.requestFullscreen();
    }
  }, []);

  const exit = useCallback(() => {
    if (document.fullscreenElement === node.current) {
      return document.exitFullscreen();
    }
    return Promise.resolve();
  }, []);

  return useMemo(
    () => ({
      active,
      enter,
      exit,
      node,
    }),
    [active, enter, exit],
  );
}

export const FullScreen: React.FC<FullScreenProps> = ({
  handle,
  onChange,
  children,
}) => {

  useEffect(() => {
    if (onChange) {
      onChange(handle.active, handle);
    }
  }, [handle.active]);

  return (
    <div
      ref={handle.node}
      style={handle.active ? { height: '100%', width: '100%' } : undefined}
    >
      {children}
    </div>
  );
};