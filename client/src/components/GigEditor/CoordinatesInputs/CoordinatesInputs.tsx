import React from "react";

import {
  FlipperWrapper,
  CoordinatesRightContent,
  CoordinatesSection,
  InputWrapper,
  InputLabel,
  Input,
  CoordinatesButtonLabel,
  CoordinatesButton,
} from "./../../GigCreator/GigCreator.style";

interface Props {
  lat: string | number;
  newLat: string | number;
  setLat: (e: string | number) => void;
  lng: string | number;
  newLng: string | number;
  setLng: (e: string | number) => void;
  setDoneUpdate: (e: boolean) => void;
  selectedGig: any;
  setError: (e: boolean) => void;
  setError2: (e: boolean) => void;
  setDeleteFile: (e: any) => void;
  deleteSuccess: boolean;
  mapView: boolean;
  setMapView: (e: boolean) => void;
}

export const CoordinatesInputs: React.FC<Props> = ({
  selectedGig,
  setDoneUpdate,
  setError,
  setError2,
  setDeleteFile,
  lat,
  newLat,
  setLat,
  lng,
  newLng,
  setLng,
  deleteSuccess,
  mapView,
  setMapView,
}) => {
  return (
    <CoordinatesSection noButton={selectedGig} editMode>
      <InputWrapper>
        <InputLabel>Latitude</InputLabel>
        <Input
          value={newLat || lat || selectedGig.lat || ""}
          autoComplete="none"
          name="lat"
          placeholder="Latitude"
          onChange={(e) => setLat(e.target.value)}
          onClick={(e) => {
            setError(false);
            setError2(false);
            setDeleteFile(false);
            setDoneUpdate(false);
          }}
        />
      </InputWrapper>
      <FlipperWrapper>
        {selectedGig && !deleteSuccess && (
          <CoordinatesRightContent onClick={() => setMapView(!mapView)}>
            <CoordinatesButtonLabel
              style={{
                animation:
                  (newLat &&
                    newLng &&
                    mapView &&
                    "blinkerBan 3s infinite ease-in-out ") ||
                  "",
              }}
            >
              {!mapView && "Select On Map"} {mapView && "Close Map"}
            </CoordinatesButtonLabel>

            <CoordinatesButton
              title={(!mapView && "Select On Map") || "Close Map"}
            ></CoordinatesButton>
          </CoordinatesRightContent>
        )}
        <InputWrapper>
          <InputLabel>Longitude</InputLabel>
          <Input
            value={newLng || lng || selectedGig.lng || ""}
            autoComplete="none"
            name="lng"
            placeholder="Longitude"
            onChange={(e) => setLng(e.target.value)}
            onClick={(e) => {
              setError(false);
              setError2(false);
              setDeleteFile(false);
              setDoneUpdate(false);
            }}
          />
        </InputWrapper>
      </FlipperWrapper>
    </CoordinatesSection>
  );
};
