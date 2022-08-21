import React, { useEffect, useState } from "react";

import EditMap from "../EditMap/EditMap";

const { createGigEntry } = require("./GigCreatorUtils");

interface Props {
  admin: boolean;
  darkMode: boolean;
  setGigsList: (e: any) => void;
  setAddMode: (e: boolean) => any;
  setGigsListTimeline: (e: any) => void;
}

export const GigCreator: React.FC<Props> = ({
  admin,
  darkMode,
  setGigsList,
  setAddMode,
  setGigsListTimeline,
}) => {
  const [date, setDate] = useState<any>("");
  const [venue, setVenue] = useState<any>("");
  const [lat, setLat] = useState<string | number>("");
  const [lng, setLng] = useState<string | number>("");
  const [tourName, setTourName] = useState<any>("");
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [mapView, setMapView] = useState<boolean>(false);
  const [taskDone, setTaskDone] = useState<boolean>(false);

  useEffect(function () {
    if (!admin) {
      location.replace("/");
    }
    setAddMode(true);
  }, []);

  const coordinator = (e: any) => {
    setLng(parseFloat(e.latLng.lng()));
    setLat(parseFloat(e.latLng.lat()));
  };

  return (
    <div className="gigCreatorContainer">
      <div
        className="gigCreatorContainerInner"
        id={(darkMode && "logoBoxDarkEdit") || ""}
      >
        {mapView && (
          <div
            title="Back"
            id="editorCloseTab"
            onClick={(e) => {
              setMapView(!mapView);
            }}
          >
            <div className="buttonBack">X</div>
          </div>
        )}
        <form>
          <h1>Add Gig</h1>
          {!mapView && (
            <div className="gigMainDetails">
              <div className="inputBack">
                <span>Date*</span>
                <input
                  value={date || ""}
                  autoComplete="none"
                  name="date"
                  placeholder="date"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  onClick={() => setError(false)}
                />
              </div>

              <div className="inputBack">
                <span>City</span>
                <input
                  value={city || ""}
                  autoComplete="none"
                  name="city"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  onClick={() => setError(false)}
                />
              </div>

              <div className="inputBack">
                <span>Tour</span>
                <input
                  value={tourName || ""}
                  autoComplete="none"
                  name="tourName"
                  placeholder="Tour Name"
                  onChange={(e) => setTourName(e.target.value)}
                  onClick={() => setError(false)}
                />
              </div>

              <div className="inputBack">
                <span>Venue</span>
                <input
                  value={venue || ""}
                  autoComplete="none"
                  name="venue"
                  placeholder="Venue"
                  onChange={(e) => setVenue(e.target.value)}
                  onClick={() => setError(false)}
                />
              </div>
            </div>
          )}
          <div className="coordinatesEditorBox">
            <div className="inputBack">
              <span>Latitude*</span>
              <input
                value={lat || ""}
                autoComplete="none"
                name="lat"
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
                onClick={() => setError(false)}
              />
            </div>
            <div className="coordinatesMenuFlipper">
              <div
                className="coordinatesMenu"
                onClick={() => setMapView(!mapView)}
              >
                <div
                  className="lngLtdMenu"
                  style={{
                    animation:
                      (lat &&
                        lng &&
                        mapView &&
                        "blinkerBan 3s infinite ease-in-out ") ||
                      "",
                  }}
                >
                  {!mapView && "Select On Map"} {mapView && "Close Map"}
                </div>

                <div title="Open Map" className="editMapTogglerGlobe"></div>
              </div>

              <div className="inputBack">
                <span>Longitude*</span>
                <input
                  value={lng || ""}
                  autoComplete="none"
                  name="lng"
                  placeholder="Longitude"
                  onChange={(e) => setLng(e.target.value)}
                  onClick={() => setError(false)}
                />
              </div>
            </div>
          </div>

          <div className="formOptions">
            {!success && !mapView && !taskDone && (
              <div
                className="button"
                onClick={() => {
                  createGigEntry(
                    date,
                    venue,
                    lat,
                    lng,
                    tourName,
                    city,
                    setGigsListTimeline,
                    setGigsList,
                    setSuccess,
                    setTaskDone,
                    setError
                  );
                }}
              >
                Submit
              </div>
            )}
          </div>
          {!success && !error && !mapView && (
            <p className="required">*required</p>
          )}
          {error && (
            <p className="error">
              {"Date, Latitude & Longitude Fields Are Required"}
            </p>
          )}
        </form>
        {mapView && <EditMap coordinator={(e) => coordinator(e)} />}
        {success && !taskDone && (
          <div
            className="uploadSuccess"
            style={{
              marginBottom: `1vmax`,
            }}
          ></div>
        )}
        {taskDone && (
          <div
            className="doneUpdate"
            onClick={(e) => {
              setTaskDone(false);
              setSuccess(false);
              setDate("");
              setCity("");
              setVenue("");
              setTourName("");
              setLng("");
              setLat("");
            }}
          >
            Done
          </div>
        )}
      </div>
    </div>
  );
};
