import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

import fetchStanTitles from "#api/fetchStanTitles";
import Carousel from "#components/Carousel";
import ErrorText from "#components/ErrorText";

interface SlideProps {
  id: number | string;
  imageSrc?: string;
  onClick?: () => void;
}

const Home = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<SlideProps[]>([]);

  const navigate = useNavigate();

  const theme = useTheme() as Record<string, Record<string, string>>;

  useEffect(() => {
    fetchStanTitles()
      .then((stanTitles) => {
        const newSlides = stanTitles.map((stanTitle) => ({
          id: stanTitle.id,
          imageSrc: stanTitle.image,
          onClick: () => {
            navigate(`programs/${stanTitle.id}`, { state: stanTitle });
          },
        }));

        setIsLoading(false);
        setSlides(newSlides);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  const carouselResponsiveOptions = {
    [theme.size.xl]: 6,
    [theme.size.lg]: 4,
    [theme.size.md]: 3,
    [theme.size.sm]: 2,
  };

  return (
    <div>
      {hasError ? (
        <ErrorText>An unknown error has occurred. Please try again later</ErrorText>
      ) : (
        <Carousel isLoading={isLoading} responsiveOptions={carouselResponsiveOptions} slides={slides} />
      )}
    </div>
  );
};

export default Home;
