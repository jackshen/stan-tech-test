import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface SlideProps {
  isLoading: boolean;
  imageSrc?: string;
  isSelected: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

interface StyledSlideProps {
  isSelected: boolean;
}

const SlideSkeleton = styled.div`
  padding-top: 150%; // 2:3 aspect ratio
  background: ${(props) => props.theme.palette.graniteGrey};
  width: 100%;
`;

const StyledSlide = styled.li<StyledSlideProps>`
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  outline: none;
  padding: 10px;
  position: relative;

  ${(props) => {
    if (props.isSelected) {
      return `
        ::after {
          border: 4px solid ${props.theme.palette.vividCerulean};
          border-radius: 3px;
          bottom: 3px;
          content: " ";
          left: 3px;
          position: absolute;
          right: 3px;
          top: 3px;
        }
      `;
    }
  }}

  > img {
    max-height: 100%;
    max-width: 100%;
  }
`;

const Slide = ({
  isLoading,
  imageSrc,
  isSelected,
  onClick: handleClick,
  onMouseEnter: handleMouseEnter,
}: SlideProps) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView();
    }
  }, [isSelected]);

  return (
    <StyledSlide
      aria-selected={isSelected}
      isSelected={isSelected}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      ref={ref}
    >
      {isLoading ? <SlideSkeleton /> : <img draggable={false} src={imageSrc} />}
    </StyledSlide>
  );
};

export default Slide;
