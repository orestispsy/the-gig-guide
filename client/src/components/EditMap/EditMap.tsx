import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import React, { useState } from "react";
import mapStyles from "../../common/mapStyles";

let secrets: any = require("../../../../secrets.json");

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface PropsEditMap {
  selectedGig?: any;
  coordinator: (e: any) => void;
}

interface Props {
  center: any;
  setCenter: (e: any) => void;
  showCoordinates: boolean;
  setShowCoordinates: (e: boolean) => void;
  coordinator: (e: any) => void;
  selectedGig: any;
}

export const GoogleMapComponent: React.FC<Props> = ({
  selectedGig,
  center,
  setCenter,
  showCoordinates,
  setShowCoordinates,
  coordinator,
}) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={(selectedGig && 15) || 3}
      center={{
        lat: (selectedGig && parseFloat(selectedGig.lat)) || center.lat,
        lng: (selectedGig && parseFloat(selectedGig.lng)) || center.lng,
      }}
      options={{
        styles: mapStyles.styles[5],
        disableDefaultUI: false,
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
      onClick={(e: any) => {
        setShowCoordinates(true);
        setCenter({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
        coordinator(e);
      }}
    >
      <Marker
        icon={{
          url: "pin.png",
          scaledSize: new window.google.maps.Size(50, 50),
        }}
        position={{
          lat: (selectedGig && parseFloat(selectedGig.lat)) || center.lat,
          lng: (selectedGig && parseFloat(selectedGig.lng)) || center.lng,
        }}
      />

      {showCoordinates && (
        <InfoWindow
          position={{
            lat: center.lat,
            lng: center.lng,
          }}
          onCloseClick={() => {
            setShowCoordinates(false);
          }}
        >
          <div className="locationEditor">New Location</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export const EditMap: React.FC<PropsEditMap> = ({
  coordinator,
  selectedGig,
}) => {
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [center, setCenter] = useState({
    lat: 35.08702515417141,
    lng: -40.71445657001389,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.KEY || secrets.key,
  });

  return isLoaded ? (
    <div className="google-map-editor">
      <GoogleMapComponent
        center={center}
        setCenter={setCenter}
        showCoordinates={showCoordinates}
        setShowCoordinates={setShowCoordinates}
        coordinator={coordinator}
        selectedGig={selectedGig}
      />
    </div>
  ) : (
    <></>
  );
};

export default EditMap;
