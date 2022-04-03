import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import useSound from "use-sound";

import track1 from "./../../../public/21space.mp3";
import track2 from "./../../../public/supervan.mp3";

interface Props {
  gigsList: any;
  setDarkMode: (e: boolean) => void;
}

export const GigListAnimation: React.FC<Props> = ({
  gigsList,
  setDarkMode,
}) => {
  const [go, setGo] = useState<boolean>(false);
  const [track, setTrack] = useState<any>(track1);

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

  useEffect(function () {
    setTimeout(() => {
      setDarkMode(true);
    }, 300);
  }, []);

  useEffect(
    function () {
      play();
    },
    [go]
  );

  const changeDate = (e: string) => {
    let propsDate = e.split("-");
    var fixedDate = propsDate[2] + "-" + propsDate[1] + "-" + propsDate[0];
    return fixedDate;
  };

  return (
    <div className="pre-wrapper">
      {!go && (
        <div className="go" onClick={() => setGo(true)}>
          GO!
        </div>
      )}
      {go && (
        <div className="wrapper">
          <div className="scroll-text">
            {gigsList &&
              gigsList.map((gig: any) => (
                <div key={gig.id}>
                  <h2>
                    <span>{gig.date && changeDate(gig.date)}</span>

                    <span>{gig.venue}</span>

                    <span>{gig.city}</span>
                  </h2>
                </div>
              ))}
          </div>
        </div>
      )}
      <Link
        to="/gig-list"
        className="backLink"
        onClick={() => {
          stop();
          pause();
        }}
      >
        Back
      </Link>
    </div>
  );
};
