import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Slide from "./Slide";

const DEFAULT_MAX_SLIDES = 6;

interface CarouselProps {
  isLoading: boolean;
  maxSlides?: number;
  responsiveOptions?: Record<string, number>;
  slides: { id: number | string; imageSrc?: string; onClick?: () => void }[];
}

interface TrackProps {
  maxSlides: number;
  responsiveOptions?: Record<string, number>;
}

const Track = styled.ul<TrackProps>`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  max-height: 358px;
  max-width: 1450px;
  overflow-x: scroll;
  padding: 4px 0;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }

  > li {
    min-width: calc(100% / ${(props) => props.maxSlides});
    width: calc(100% / ${(props) => props.maxSlides});

    ${(props) => {
      if (props.responsiveOptions) {
        const responsiveOptionStyles = Object.entries(props.responsiveOptions).map(
          ([breakpoint, numSlides]) => `
            @media (max-width: ${breakpoint}) {
            min-width: calc(100% / ${numSlides});
            width: calc(100% / ${numSlides});
        `
        );

        return responsiveOptionStyles.join("\n");
      }
    }}
  }
`;

const Carousel = ({ isLoading, maxSlides = DEFAULT_MAX_SLIDES, responsiveOptions, slides }: CarouselProps) => {
  const [selectedSlide, setSelectedSlide] = useState<number>();

  useEffect(() => {
    if (!isLoading) {
      const handleKeyDown = (evt: KeyboardEvent) => {
        switch (evt.key) {
          case "ArrowLeft":
            setSelectedSlide((currSelectedSlide) =>
              currSelectedSlide !== undefined && currSelectedSlide > 0 ? currSelectedSlide - 1 : currSelectedSlide
            );
            break;

          case "ArrowRight":
            setSelectedSlide((currSelectedSlide) =>
              currSelectedSlide !== undefined && currSelectedSlide < slides.length - 1
                ? currSelectedSlide + 1
                : currSelectedSlide
            );
            break;

          case "Enter":
            if (selectedSlide !== undefined) {
              slides[selectedSlide].onClick?.();
            }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isLoading, selectedSlide]);

  const loadingSlides = Array.from({ length: maxSlides }).map((_, index) => ({
    id: index,
    imageSrc: undefined,
    onClick: undefined,
  }));

  const handleMouseEnter = (index: number) => {
    if (!isLoading) {
      setSelectedSlide(index);
    }
  };

  return (
    <Track aria-label="Carousel" maxSlides={maxSlides} responsiveOptions={responsiveOptions}>
      {(isLoading ? loadingSlides : slides).map(({ id, imageSrc, onClick: handleClick }, index) => (
        <Slide
          isLoading={isLoading}
          imageSrc={imageSrc}
          isSelected={index === selectedSlide}
          key={id}
          onClick={handleClick}
          onMouseEnter={() => handleMouseEnter(index)}
        />
      ))}
    </Track>
  );
};

export default Carousel;
