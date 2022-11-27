import { Link } from "react-router-dom";
import React, { useState, useEffect, useMemo, useRef } from "react";

import {
  Gig,
  Section,
  Wrapper,
  Poster,
  Details,
  Container,
  Start,
} from "./GigListAnimation.style";

import useSound from "use-sound";

import track1 from "./../../../public/21space.mp3";
import track2 from "./../../../public/supervan.mp3";

interface Props {
  gigsList: any;
  setDarkMode: (e: boolean) => void;
  setAnimeMode: (e: boolean) => void;
  setGigListOpen: (e: boolean) => void;
  animeMusic: boolean;
  setAnimeMusic: (e: boolean) => void;
}

export const GigListAnimation: React.FC<Props> = ({
  gigsList,
  setDarkMode,
  setAnimeMode,
  setGigListOpen,
  animeMusic,
  setAnimeMusic,
}) => {
  const [go, setGo] = useState<boolean>(false);
  const [track, setTrack] = useState<any>(track1);
  const [loadMap, setLoadMap] = useState<any>();
  const [after, setAfter] = useState<React.ReactElement[]>([]);

  let refs = useRef<React.RefObject<any>[]>([
    React.createRef(),
    React.createRef(),
  ]);

  const updateRefs = () => {
    refs.current = refs.current.map((item) => React.createRef());
  };

  const createLoadMap = () => {
    let children = gigsList;
    for (let i = 0; i < gigsList.length; i++) {
      children[i].ref = refs.current[i];
    }
    setLoadMap(children);
  };

  const changeDate = (e: string) => {
    let propsDate = e.split("-");
    var fixedDate = propsDate[2] + ` • ` + propsDate[1] + ` • ` + propsDate[0];
    return fixedDate;
  };

  const onTransitionEnd = (e: any) => {
    e.target.remove();
  };

  const componenents2render = useCreateGigs(
    loadMap,
    changeDate,
    onTransitionEnd
  );

  let gigOnScreen: number = 0;

  const runAnimation = () => {
    if (gigsList && componenents2render && gigOnScreen < gigsList.length) {
      setTimeout(() => {
        setAfter((after) => [...after, componenents2render[gigOnScreen]]);
        gigOnScreen++;
        runAnimation();
      }, 2000);
    }
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
      if (gigsList) {
        updateRefs();
        createLoadMap();
      }
    },
    [gigsList]
  );

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
      runAnimation();
    },
    [go]
  );

  useEffect(function () {
    setTimeout(() => {
      setDarkMode(true);
      setAnimeMode(true);
      setGigListOpen(false);
      setAnimeMusic(true);
    }, 300);
  }, []);

  return (
    <Container>
      <Wrapper> {go && after.map((item) => item)}</Wrapper>

      {!go && <Start onClick={() => setGo(true)}>Click To Start</Start>}
    </Container>
  );
};

const useCreateGigs = (
  gigs: any,
  changeDate: (e: string) => void,
  onTransitionEnd: (e: any) => void
) => {
  return useMemo(
    () =>
      gigs &&
      gigs?.map((val: any, index: number) => (
        <Gig
          city={val.city}
          date={val.date}
          poster={val.poster}
          tour_name={val.tour_name}
          venue={val.venue}
          id={val.date}
          key={index}
          ref={val.ref}
          delayed={index}
          onAnimationEnd={(e) => onTransitionEnd(e)}
        >
          {/* {val.poster && <Poster poster={val.poster} />} */}
          <Details>
            <Section>{val.date && changeDate(val.date)}</Section>
            <Section>{val.venue}</Section>
            <Section>{val.city}</Section>
          </Details>
        </Gig>
      )),
    [gigs]
  );
};
