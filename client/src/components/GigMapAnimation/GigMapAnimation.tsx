import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Loading } from "../Loading/Loading";
import Animation from "./Animation";

import GoogleMapComponent from "./Map";

import mapStyles from "../../common/mapStyles";

let secrets: any = require("../../../../secrets.json");

interface Props {
  gigsList: any[] | undefined;
  mapVisible: (e: boolean) => void;

  setDarkMode: (e: boolean) => void;
  setMapMode: (e: boolean) => void;
  setAnimeMode: (e: boolean) => void;
  setGigListOpen: (e: boolean) => void;
  animeMusic: boolean;
  setAnimeMusic: (e: boolean) => void;
}

const GigMapAnimation: React.FC<Props> = ({
  gigsList,
  mapVisible,
  animeMusic,
  setDarkMode,
  setMapMode,
  setAnimeMode,
  setAnimeMusic,
  setGigListOpen,
}) => {
  const [selectedMapGig, setSelectedMapGig] = useState<any>(null);
  const [go, setGo] = useState<boolean>(false);
  const [style, setStyle] = useState(mapStyles.styles[2]);
  const [switcher, setSwitcher] = useState(0);
  const [center, setCenter] = useState({
    lat: 35.08702515417141,
    lng: -40.71445657001389,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.KEY || secrets.key,
  });

  useEffect(function () {
    setTimeout(() => {
      setDarkMode(true);
      setMapMode(false);
      setAnimeMode(true);
      setGigListOpen(false);
      setAnimeMusic(true);
    }, 250);
  }, []);

  useEffect(
    function () {
      if (isLoaded) {
        mapVisible(true);
      }
    },
    [isLoaded]
  );

  return (
    <>
      <Animation
        selectedMapGig={selectedMapGig}
        go={go}
        setGo={(e: boolean) => setGo(e)}
        animeMusic={animeMusic}
      />
      {go && (
        <>
          {(isLoaded && (
            <div className="google-map">
              <GoogleMapComponent
                gigsList={gigsList}
                selectedMapGig={selectedMapGig}
                center={center}
                setSelectedMapGig={setSelectedMapGig}
                style={style}
                setStyle={setStyle}
                switcher={switcher}
                setSwitcher={setSwitcher}
                setCenter={(e: any) => setCenter(e)}
              />
            </div>
          )) || <Loading />}
        </>
      )}
    </>
  );
};

export default GigMapAnimation;
