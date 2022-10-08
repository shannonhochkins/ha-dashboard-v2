import { useState, useEffect, useMemo } from 'react';

export function useInnerHeight(offset: (height: number) => number = h => h) {
  const [ maxHeight, setNewHeight ] = useState(offset(window.innerHeight));

  useEffect(() => {
    const handler = () => setNewHeight(offset(window.innerHeight));
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return useMemo(() => maxHeight, [maxHeight]);
}