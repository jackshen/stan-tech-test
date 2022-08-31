import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import Logo from "#assets/logo.svg";

const StanLogo = styled(Link).attrs({
  to: "",
})`
  margin-right: 92px;

  @media (max-width: ${(props) => props.theme.size.sm}) {
    margin-right: 40px;
  }

  @media (max-width: ${(props) => props.theme.size.xs}) {
    display: none;
  }

  > img {
    color: ${(props) => props.theme.palette.white};
    height: 48px;

    @media (max-width: ${(props) => props.theme.size.md}) {
      height: 36px;
    }
  }
`;

const StyledTopbar = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 48px;

  @media (max-width: ${(props) => props.theme.size.xs}) {
    align-items: center;
    justify-content: center;
  }
`;

const TopbarLink = styled(NavLink)`
  color: ${(props) => props.theme.palette.taupeGrey};
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;

  :not(:last-of-type) {
    margin-right: 44px;

    @media (max-width: ${(props) => props.theme.size.md}) {
      margin-right: 20px;
    }
  }

  @media (max-width: ${(props) => props.theme.size.md}) {
    font-size: 16px;
  }

  &.active {
    color: ${(props) => props.theme.palette.white};
  }
`;

const TopbarNav = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Topbar = () => {
  return (
    <StyledTopbar>
      <StanLogo>
        <img src={Logo} />
      </StanLogo>
      <TopbarNav>
        <TopbarLink to="">Home</TopbarLink>
        <TopbarLink to="tv-shows">TV Shows</TopbarLink>
        <TopbarLink to="movies">Movies</TopbarLink>
      </TopbarNav>
    </StyledTopbar>
  );
};

export default Topbar;
