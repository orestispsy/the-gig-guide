import React from "react";

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
    <div className="coordinatesEditorBox">
      <div className="inputBack">
        <span>Latitude</span>
        <input
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
      </div>
      <div className="coordinatesMenuFlipper">
        {selectedGig && !deleteSuccess && (
          <div className="coordinatesMenu" onClick={() => setMapView(!mapView)}>
            <div
              className="lngLtdMenu"
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
            </div>

            <div
              title={(!mapView && "Select On Map") || "Close Map"}
              className="editMapTogglerGlobe"
            ></div>
          </div>
        )}
        <div className="inputBack">
          <span>Longitude</span>
          <input
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
        </div>
      </div>
    </div>
  );
};
