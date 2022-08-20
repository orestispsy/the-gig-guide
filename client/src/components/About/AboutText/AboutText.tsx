import React, { Fragment } from "react";

interface Props {}

export const AboutText: React.FC<Props> = ({}) => {
  return (
    <Fragment>
      <div className="about"> About</div>
      <div className="authWrapper">
        <div className="aboutText">
          <div>
            Friend, fan and brother soul of The Almighty{" "}
            <a href="https://www.1000mods.com" target="_blank">
              1000mods
            </a>
            . We met back in the early daze, when the universe joined lines and
            brought things together.
          </div>
          <div>
            Some time ago I asked them if there is a concert archive for all
            these years on stage. The answer was: " Yes, the first 500 concerts
            are stored in documents or hand-written in lists. As for the rest,
            nowadays they can be found ! ".
          </div>
          <div>
            Lately, after summoning some super-tech-powers up, I started
            building an "archive" website for 1000mods, their fans and all these
            nights of sweat on stage and the floor.
          </div>
          <div>
            The "Thousand Gigs Guide" is a tool for the band to create, manage
            and maintain their own concert history. On the same time, it is an
            online concert agenda for fans to get the past & future band's
            Touring Info, contribute in it and interact with each other.
          </div>
        </div>
      </div>
      <div className="author"> The Author</div>
      <div className="authWrapper">
        <div className="authPic"></div>
        <div className="authorText">
          <div>
            Full-Stack Web Developer, Electronic Engineer, Musician, Web-Radio
            Broadcaster, Story Teller from Outer Space.
          </div>

          <div>
            Can be found hitch-hiking the Super Van when on tour, letting the
            dates decide for the day back home...
          </div>
        </div>
      </div>
      <div className="author"> Thoughts</div>
    </Fragment>
  );
};
