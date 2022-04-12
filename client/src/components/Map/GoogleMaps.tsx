import React from "react";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useGoogleMap,
} from "@react-google-maps/api";

import mapStyles from "../../common/mapStyles";

const containerStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: `black`,
};

interface Props {
  gigsList: any[] | undefined;
  selectedGig: any;
  center: any;
  setSelectedGig: (e: any) => void;
  style: any;
  setStyle: (e: any) => void;
  switcher: number;
  setSwitcher: (e: number) => void;
  selectedGigEntry: any;
  setGigEntry: (e: any) => void;
  historyCheck: (e: any) => void;
  mapVisible: (e: any) => void;
  setCenter: (e: any) => void;
}
export const GoogleMaps: React.FC<Props> = ({
  gigsList,
  selectedGig,
  center,
  setSelectedGig,
  style,
  setStyle,
  switcher,
  setSwitcher,
  selectedGigEntry,
  setGigEntry,
  historyCheck,
  mapVisible,
  setCenter,
}) => {
  let fixedDate;
  var scaleParam: any;
  if (selectedGig) {
    let propsDate = selectedGig.date.split("-");
    fixedDate = propsDate[2] + "-" + propsDate[1] + "-" + propsDate[0];
  }

  function switcherHelper(e: number) {
    if (e > mapStyles.styles.length - 1) {
      e = 0;
    }
    setSwitcher(e);
    setStyle(mapStyles.styles[e]);
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={3}
      center={
        (selectedGigEntry && {
          lat: parseFloat(selectedGigEntry.lat),
          lng: parseFloat(selectedGigEntry.lng),
        }) ||
        center
      }
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
            east: 179,
          },
        },
      }}
    >
      {gigsList &&
        gigsList.map((gig) => {
          var dot = "greendot.gif";
          let dateNow = new Date();
          let dateGig = new Date(gig.date);

          if (dateGig > dateNow) {
            dot = "yellowdot.gif";
            scaleParam = 15;
          }

          if (gig.tour_name === "Life Tour") {
            dot = "redBall.gif";
            scaleParam = 15;
          }

          return (
            <Marker
              key={gig.id}
              position={{
                lat: parseFloat(gig.lat),
                lng: parseFloat(gig.lng),
              }}
              icon={{
                url:
                  (selectedGigEntry &&
                    selectedGigEntry.id == gig.id &&
                    "pin.png") ||
                  dot,
                scaledSize: new window.google.maps.Size(
                  (selectedGigEntry && selectedGigEntry.id == gig.id && 50) ||
                    scaleParam ||
                    30,
                  (selectedGigEntry && selectedGigEntry.id == gig.id && 50) ||
                    15
                ),
              }}
              onClick={() => {
                setSelectedGig(null);
                setSelectedGig(gig);
                setGigEntry(gig);
                setCenter({
                  lat: parseFloat(gig.lat),
                  lng: parseFloat(gig.lng),
                });
              }}
            />
          );
        })}
      {selectedGig && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedGig.lat),
            lng: parseFloat(selectedGig.lng),
          }}
          onCloseClick={() => {
            setGigEntry(null);
          }}
        >
          <div className="mapInfoCard">
            {selectedGig.poster && (
              <div className="mapInfoCardLeft">
                <a href={selectedGig.poster} target="_blank">
                  <img className="infoPoster" src={selectedGig.poster}></img>
                </a>
              </div>
            )}
            <div className="mapInfoCardRight">
              <div className="infoCardDate">{fixedDate}</div>

              {selectedGig.venue && (
                <div className="infoCardCategory">
                  <div className="infoCardDetailTitle">Venue</div>{" "}
                  <span>➤</span>
                  <div className="infoCardDetail"> {selectedGig.venue}</div>
                </div>
              )}
              {selectedGig.city && (
                <div className="infoCardCategory">
                  <div className="infoCardDetailTitle"> Location </div>{" "}
                  <span>➤</span>
                  <div className="infoCardDetail">{selectedGig.city}</div>
                </div>
              )}
              {selectedGig.tour_name && (
                <div className="infoCardCategory">
                  <div className="infoCardDetailTitle"> Tour </div>{" "}
                  <span>➤</span>
                  <div className="infoCardDetail">{selectedGig.tour_name}</div>
                </div>
              )}
              {selectedGig.id && (
                <div
                  id="mapLink"
                  className="mainMenuLink"
                  onClick={(e) => {
                    historyCheck(selectedGig.id);
                    mapVisible(false);
                  }}
                >
                  Community
                </div>
              )}
            </div>
          </div>
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
