import React from "react";

import styled from "styled-components";

import { border } from "../styles/colors";

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  margin-top: 4rem;
`;

const NavLink = styled.a`
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
  background-color: var(--light-background);
  padding: 1rem 2.55rem;
  margin: 0rem 0.5rem;
  border-radius: ${border.borderRadious};

  :hover {
    background-color: var(--border-color);
  }
`;

const Nav = styled.nav`
  padding: 2rem;
`;

export const Header = () => {
  return (
    <NavContainer>
      <h1>typetypetype</h1>
      <Nav>
        <NavLink href="/">Test</NavLink>
        <NavLink href="/">Profile</NavLink>
      </Nav>
    </NavContainer>
  );
};
