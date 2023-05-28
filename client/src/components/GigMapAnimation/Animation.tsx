import React, { useState, useEffect } from "react";

import {
  Gig,
  Section,
  Wrapper,
  Poster,
  Details,
  Container,
  Start,
} from "./Animation.style";

import useSound from "use-sound";

import track1 from "./../../../public/21space.mp3";
import track2 from "./../../../public/supervan.mp3";

interface Props {
  go: boolean;
  setGo: (e: boolean) => void;
  selectedMapGig: any;
  animeMusic: boolean;
}

export const GigListAnimation: React.FC<Props> = ({
  go,
  setGo,
  selectedMapGig,
  animeMusic,
}) => {
  const [track, setTrack] = useState<any>(track1);

  const [animationStarted, setAnimationStarted] = useState<boolean>(false);

  const changeDate = (e: string) => {
    let propsDate = e.split("-");
    var fixedDate = propsDate[2] + ` • ` + propsDate[1] + ` • ` + propsDate[0];
    return fixedDate;
  };

  const onTransitionEnd = (e: any) => {
    setAnimationStarted(false);
  };

  const [play, { stop }] = useSound(track, {
    volume: 0.75,
    onend: (e: any) => {
      setTrack(track2);
    },
  });

  const [playTrack2, { pause }] = useSound(track2, {
    volume: 0.75,
  });

  useEffect(
    function () {
      if (track == track2) {
        playTrack2();
      }
    },
    [track]
  );

  useEffect(
    function () {
      if (!animeMusic) {
        stop();
        pause();
      }
    },
    [animeMusic]
  );

  useEffect(
    function () {
      play();
    },
    [go]
  );

  useEffect(
    function () {
      if (selectedMapGig) {
        setAnimationStarted(true);
      }
    },
    [selectedMapGig]
  );

  return (
    <Container>
      <Wrapper>
        {go && selectedMapGig && (
          <Gig
            city={selectedMapGig.city}
            date={selectedMapGig.date}
            poster={selectedMapGig.poster}
            tour_name={selectedMapGig.tour_name}
            venue={selectedMapGig.venue}
            id={selectedMapGig.date}
            onAnimationEnd={(e) => onTransitionEnd(e)}
            started={animationStarted}
          >
            {selectedMapGig.poster && <Poster poster={selectedMapGig.poster} />}
            <Details>
              <Section>
                {selectedMapGig.date && changeDate(selectedMapGig.date)}
              </Section>
              <Section>{selectedMapGig.venue}</Section>
              <Section>{selectedMapGig.city}</Section>
            </Details>
          </Gig>
        )}
      </Wrapper>

      {!go && <Start onClick={() => setGo(true)}>Click To Start</Start>}
    </Container>
  );
};

export default GigListAnimation;
