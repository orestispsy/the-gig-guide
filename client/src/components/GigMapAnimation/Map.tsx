import React, { Fragment, useEffect, useState } from "react";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

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
  const [zoom, setZoom] = useState<number>(6);
  const [visitedGigs, setVisitedGigs] = useState<any>([]);
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

  let visitedGigsHelper: any = [];
  let animationItemCounter: number = 0;
  const runAnimation = () => {
    if (gigsList && animationItemCounter < gigsList.length) {
      visitedGigsHelper = visitedGigsHelper.concat(
        gigsList[animationItemCounter]
      );
      setVisitedGigs(visitedGigsHelper);

      setSelectedMapGig(gigsList[animationItemCounter]);
      setTimeout(() => {
        setZoom(6);
      }, 500);
      setTimeout(() => {
        setCenter({
          lat: parseFloat(gigsList[animationItemCounter].lat),
          lng: parseFloat(gigsList[animationItemCounter].lng),
        });
        setZoom(9);
      }, 5000);
      setTimeout(() => {
        animationItemCounter++;
        runAnimation();
      }, 7500);
    }
  };

  useEffect(() => {
    runAnimation();
  }, []);

  return (
    <GoogleMap
      id={"googleMap"}
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
      {visitedGigs[0] &&
        visitedGigs.map((gig: any) => {
          return (
            <Fragment key={gig.id}>
              <Marker
                animation={window.google.maps.Animation.DROP}
                visible
                zIndex={666}
                position={{
                  lat: parseFloat(gig.lat),
                  lng: parseFloat(gig.lng),
                }}
                icon={{
                  url:
                    (selectedMapGig &&
                      selectedMapGig.id == gig.id &&
                      "pin.png") ||
                    "greendot.gif",
                  scaledSize: new window.google.maps.Size(
                    (selectedMapGig.id == gig.id && 100) || 15,
                    (selectedMapGig.id == gig.id && 100) || 7.5
                  ),
                }}
              />
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
      <span
        title="Change Map Color"
        className="switch"
        onClick={(e) => switcherHelper(switcher + 1)}
      ></span>
    </GoogleMap>
  );
};

export default GoogleMaps;
