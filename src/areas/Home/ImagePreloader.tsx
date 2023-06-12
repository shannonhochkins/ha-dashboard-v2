import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

interface ImagePreloaderProps {
  className?: string;
  src: string;
}

interface ImageProps {
  loaded?: string;
}

const ImageElement = styled.img<ImageProps>`
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-property: transform, opacity;
	box-shadow: 0.3rem 0.4rem 0.4rem rgba(0, 0, 0, 0.4);
  border-radius: 24px;
  opacity: 0;
  &:hover, &:active, &:focus {
    transform: scale(1.15);
  }
  ${props => props.loaded && `
    opacity: 1;
  `}
`;

export function ImagePreloader({
  className,
  src
}: ImagePreloaderProps) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const preloader = new Image();
    preloader.onload = () => {
      setLoaded(true);
    };
    preloader.src = src;
  }, []);

  return <div className={className}>
    <ImageElement src={src} loaded={loaded ? 'yes' : undefined} />
  </div>

}