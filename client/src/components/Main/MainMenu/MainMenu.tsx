import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { MenuWrapper, Options, SectionButton, Globe } from "./MainMenu.style";

interface Props {
  darkMode: boolean;
  superAdmin: boolean;
}

export const MainMenu: React.FC<Props> = ({ darkMode, superAdmin }) => {
  useEffect(function () {}, []);

  return (
    <MenuWrapper darkMode={darkMode}>
      {superAdmin && (
        <Options>
          <SectionButton to="/gig-creator">Add</SectionButton>
          <Link to="/map">
            <Globe
              title="Map"
              darkMode={darkMode}
              src={`globe.gif?random=${Math.random()}`}
            />
          </Link>
          <SectionButton to="/gig-editor">Edit</SectionButton>
        </Options>
      )}
      {!superAdmin && (
        <Options>
          <SectionButton to="/gig-list">Gigs</SectionButton>

          <Link to="/map">
            <Globe
              title="Map"
              darkMode={darkMode}
              src={`globe.gif?random=${Math.random()}`}
            />
          </Link>
          <SectionButton to="/chat">Chat</SectionButton>
        </Options>
      )}
      {!superAdmin && <SectionButton to="/about">About</SectionButton>}
      {superAdmin && <SectionButton to="/gig-list">Entries</SectionButton>}
    </MenuWrapper>
  );
};
