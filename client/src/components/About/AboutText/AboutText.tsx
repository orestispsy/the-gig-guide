import React, { Fragment } from "react";

import {
  TextHeadline,
  TextWrapper,
  Text,
  GoTo,
  Paragraph,
  Author,
} from "./AboutText.style";

interface Props {}

export const AboutText: React.FC<Props> = ({}) => {
  return (
    <Fragment>
      <TextHeadline> About</TextHeadline>
      <TextWrapper>
        <Text className="aboutText">
          <Paragraph>
            Friend, fan and brother soul of The Almighty{" "}
            <GoTo href="https://www.1000mods.com" target="_blank">
              1000mods
            </GoTo>
            . We met back in the early daze, when the universe joined lines and
            brought things together.
          </Paragraph>
          <Paragraph>
            Some time ago I asked them if there is a concert archive for all
            these years on stage. The answer was: " Yes, the first 500 concerts
            are stored in documents or hand-written in lists. As for the rest,
            nowadays they can be found ! ".
          </Paragraph>
          <Paragraph>
            Lately, after summoning some super-tech-powers up, I started
            building an "archive" website for 1000mods, their fans and all these
            nights of sweat on stage and the floor.
          </Paragraph>
          <Paragraph>
            The "Thousand Gigs Guide" is a tool for the band to create, manage
            and maintain their own concert history. On the same time, it is an
            online concert agenda for fans to get the past & future band's
            Touring Info, contribute in it and interact with each other.
          </Paragraph>
        </Text>
      </TextWrapper>
      <TextHeadline> The Author</TextHeadline>
      <TextWrapper>
        <Author />
        <Text author={true}>
          <Paragraph author={true} wider={true}>
            Can be found hitch-hiking the Super Van when on tour, letting the
            dates decide for the day back home...
          </Paragraph>
        </Text>
      </TextWrapper>
      <TextHeadline> Thoughts</TextHeadline>
    </Fragment>
  );
};
