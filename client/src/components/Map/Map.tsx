import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Loading } from "./../Loading/Loading";

import GoogleMapComponent from "./GoogleMaps";

import mapStyles from "../../common/mapStyles";

let secrets: any = require("../../../../secrets.json");

interface Props {
  gigsList: any[] | undefined;
  mapVisible: (e: boolean) => void;
  selectedGigEntry: number | null;
  setGigEntry: (e: number | null) => void;
  setDarkMode: (e: boolean) => void;
  setMapMode: (e: boolean) => void;
  setGigLocation: (e: string) => void;
}

const MyMap: React.FC<Props> = ({
  gigsList,
  mapVisible,
  selectedGigEntry,
  setGigEntry,
  setDarkMode,
  setMapMode,
  setGigLocation,
}) => {
  const [selectedGig, setSelectedGig] = useState<any>(null);
  const [style, setStyle] = useState(mapStyles.styles[0]);
  const [switcher, setSwitcher] = useState(0);
  const [center, setCenter] = useState({
    lat: 35.08702515417141,
    lng: -40.71445657001389,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.KEY || secrets.key,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    function () {
      if (selectedGigEntry) {
        setGigLocation(`/api/gig/${selectedGigEntry}`);
      }
    },
    [selectedGigEntry]
  );

  useEffect(function () {
    setTimeout(() => {
      setDarkMode(true);
      setMapMode(true);
      if (selectedGig) {
        setGigLocation(`/api/gig/${selectedGig.id}`);
      }
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

  const historyCheck = (e: string) => {
    navigate(`/api/gig/${e}`);
  };

  return isLoaded ? (
    <div className="google-map">
      <GoogleMapComponent
        gigsList={gigsList}
        selectedGig={selectedGig}
        center={center}
        setSelectedGig={setSelectedGig}
        style={style}
        setStyle={setStyle}
        switcher={switcher}
        setSwitcher={setSwitcher}
        selectedGigEntry={selectedGigEntry}
        setGigEntry={setGigEntry}
        historyCheck={(e: string) => historyCheck(e)}
        mapVisible={(e: boolean) => mapVisible(e)}
        setCenter={(e: any) => setCenter(e)}
      />
    </div>
  ) : (
    <Loading />
  );
};

export default MyMap;
