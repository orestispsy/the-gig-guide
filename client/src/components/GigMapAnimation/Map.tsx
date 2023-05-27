import React, { Fragment, useEffect, useState } from "react";

import "./map-styles.css";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useGoogleMap,
} from "@react-google-maps/api";

import mapStyles from "../../common/mapStyles";

import { InfoBox } from "./Map.style";

const containerStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: `black`,
};

interface Props {
  gigsList: any[] | undefined;
  selectedMapGig: any;
  center: any;
  setSelectedMapGig: (e: any) => void;
  style: any;
  setStyle: (e: any) => void;
  switcher: number;
  setSwitcher: (e: number) => void;
  setCenter: (e: any) => void;
}
export const GoogleMaps: React.FC<Props> = ({
  gigsList,
  selectedMapGig,
  center,
  setSelectedMapGig,
  style,
  setStyle,
  switcher,
  setSwitcher,
  setCenter,
}) => {
  const [zoom, setZoom] = useState<number>(3);
  let fixedDate;
  if (selectedMapGig) {
    let propsDate = selectedMapGig.date.split("-");
    fixedDate = propsDate[2] + "-" + propsDate[1] + "-" + propsDate[0];
  }

  function switcherHelper(e: number) {
    if (e > mapStyles.styles.length - 1) {
      e = 0;
    }
    setSwitcher(e);
    setStyle(mapStyles.styles[e]);
  }

  let animationItemCounter: number = 0;
  const runAnimation = () => {
    if (gigsList && animationItemCounter < gigsList.length) {
      setSelectedMapGig(gigsList[animationItemCounter]);
      setCenter({
        lat: parseFloat(gigsList[animationItemCounter].lat),
        lng: parseFloat(gigsList[animationItemCounter].lng),
      });
    }
    setTimeout(() => {
      animationItemCounter++;
      runAnimation();
    }, 7500);
  };

  useEffect(() => {
    runAnimation();
    setZoom(10);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={zoom}
      center={center}
      options={{
        styles: style,
        disableDefaultUI: true,
        zoomControl: true,
        restriction: {
          strictBounds: true,
          latLngBounds: {
            north: 85,
            south: -80,
            west: -179,
            east: 185,
          },
        },
      }}
    >
      {gigsList &&
        gigsList.map((gig) => {
          return (
            <Fragment key={gig.id}>
              {selectedMapGig && selectedMapGig.id == gig.id && (
                <Marker
                  position={{
                    lat: parseFloat(gig.lat),
                    lng: parseFloat(gig.lng),
                  }}
                  icon={{
                    url: "pin.png",
                    scaledSize: new window.google.maps.Size(100, 100),
                  }}
                />
              )}
            </Fragment>
          );
        })}
      {selectedMapGig && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedMapGig.lat),
            lng: parseFloat(selectedMapGig.lng),
          }}
        >
          <InfoBox />
        </InfoWindow>
      )}
      <div
        title="Change Map Color"
        className="switch"
        onClick={(e) => switcherHelper(switcher + 1)}
      ></div>
    </GoogleMap>
  );
};

export default GoogleMaps;
