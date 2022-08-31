import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import fetchStanTitles, { StanTitle } from "#api/fetchStanTitles";
import ErrorText from "#components/ErrorText";

const ProgramDescription = styled.section`
  height: 100%;
  width: 100%;

  > h2 {
    font-size: 36px;
    font-weight: normal;
    letter-spacing: 2px;
    margin: 0 0 6px;
  }

  > h3 {
    font-size: 18px;
    font-weight: normal;
    letter-spacing: 1px;
    margin: 0 0 32px;
  }

  > p {
    font-size: 20px;
    line-height: 1.5;
    margin: 0;
  }
`;

const ProgramPreview = styled.div`
  margin-right: 64px;

  @media (max-width: ${(props) => props.theme.size.md}) {
    margin: 0 0 32px;
  }

  @media (max-width: ${(props) => props.theme.size.sm}) {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0 0 32px;
  }

  > img {
    width: 216px;
  }
`;

const SkeletonImage = styled.div`
  padding-top: 150%; // 2:3 aspect ratio
  background: ${(props) => props.theme.palette.graniteGrey};
  width: 216px;
`;

const SkeletonH2 = styled.h2`
  background: ${(props) => props.theme.palette.graniteGrey};
  min-height: 1.15em;
  width: 30%;
`;

const SkeletonH3 = styled.h3`
  background: ${(props) => props.theme.palette.graniteGrey};
  min-height: 1.15em;
  width: 60%;
`;

const SkeletonP = styled.p`
  background: ${(props) => props.theme.palette.graniteGrey};
  min-height: 4.6em;
  width: 100%;
`;

const StyledProgram = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${(props) => props.theme.size.md}) {
    flex-direction: column;
  }
`;

const Programs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!location.state);
  const [program, setProgram] = useState<StanTitle>(location.state as StanTitle);

  useEffect(() => {
    if (!program) {
      fetchStanTitles()
        .then((stanTitles) => {
          const [currId] = location.pathname.split("/").slice(-1);
          const currStanTitle = stanTitles.find(({ id }) => id.toString() === currId);

          if (!currStanTitle) {
            throw new Error("Stan title does not exist");
          }

          setIsLoading(false);
          setProgram(currStanTitle);
        })
        .catch(() => {
          setHasError(true);
        });
    }
  }, [program]);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Backspace") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {hasError ? (
        <ErrorText>An unknown error has occurred. Please try again later</ErrorText>
      ) : (
        <StyledProgram>
          <ProgramPreview>
            {isLoading ? <SkeletonImage /> : <img draggable={false} src={program.image} />}
          </ProgramPreview>
          <ProgramDescription>
            {isLoading ? <SkeletonH2 /> : <h2>{program?.title}</h2>}
            {isLoading ? (
              <SkeletonH3 />
            ) : (
              <h3>
                {/* season info doesn't look like it's provided, hardcoded for now for visuals */}
                {program?.rating} | {program?.year} | 1 season | {program?.genre} | {program?.language}
              </h3>
            )}
            {isLoading ? <SkeletonP /> : <p>{program?.description}</p>}
          </ProgramDescription>
        </StyledProgram>
      )}
    </div>
  );
};

export default Programs;
