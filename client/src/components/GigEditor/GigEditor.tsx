import { Link } from "react-router-dom";
import axios from "../../common/Axios/axios";
import React, { useState, useEffect, useRef } from "react";

import EditMap from "../EditMap/EditMap";

import { Posters } from "../Posters/Posters";

interface Props {
  gigsList: any;
  admin: boolean;
  darkMode: boolean;
  setGigsList: (e: any) => any;
}

export const GigEditor: React.FC<Props> = ({
  gigsList,
  admin,
  darkMode,
  setGigsList,
}) => {
  const [file, setFile] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [deleteFile, setDeleteFile] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [mapView, setMapView] = useState<boolean>(false);
  const [selectedPoster, setSelectedPoster] = useState("");
  const [posterSection, setPosterSection] = useState<boolean>(false);
  const [doneUpdate, setDoneUpdate] = useState<boolean>(false);
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [lat, setLat] = useState<string | number>("");
  const [lng, setLng] = useState<string | number>("");
  const [newLat, setNewLat] = useState<string | number>("");
  const [newLng, setNewLng] = useState<string | number>("");
  const [tourName, setTourName] = useState("");
  const [city, setCity] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [gigToView, setGigToView] = useState("");
  const [selectedGig, setSelectedGig] = useState<any>("");

  const elemRef = useRef<any>();

  useEffect(function () {
    if (!admin) {
      location.replace("/");
    }
  }, []);

  useEffect(
    function () {
      gigSelector();
    },
    [gigToView]
  );

  useEffect(
    function () {
      posterSelector();
    },
    [selectedPoster]
  );

  const handleClick = () => {
    axios
      .post("/gig-update", {
        selectedGig: selectedGig,
        date: date,
        venue: venue,
        lat: lat,
        lng: lng,
        tourName: tourName,
        city: city,
        poster: poster,
        selectedPoster: selectedPoster,
      })
      .then(({ data }) => {
        if (data.data) {
          updateDatabase();
          setDoneUpdate(true);
        } else {
          setError(true);
          setFile(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploaderClick = () => {
    setSuccess(true);
    const formData = new FormData();
    let ext = file.name.split(".");
    formData.append(
      "file",
      file,
      `${selectedGig.date}G${selectedGig.id}T.${ext[ext.length - 1]}`
    );
    formData.append("data", JSON.stringify(selectedGig));
    axios
      .post("/upload", formData)
      .then(({ data }) => {
        if (data.success) {
          setSelectedPoster(data.data[0].poster);

          selectedGigUpdater(data.data);
          setSelectedGig(selectedGigHelper);

          updateDatabase();
          setDoneUpdate(true);
          setSuccess(false);
          setFile(null);
          elemRef.current.value = "";
        } else {
          setError2(true);
        }
      })
      .catch((err) => {
        setError2(true);
        setSuccess(false);
      });
  };
  let selectedGigHelper: any;
  const selectedGigUpdater = (e: any) => {
    selectedGigHelper = selectedGig;
    if (selectedGigHelper.poster) {
      selectedGigHelper.poster = e[0].poster;
    }
  };

  const inputsReset = () => {
    setDate("");
    setVenue("");
    setLat("");
    setLng("");
    setTourName("");
    setCity("");
    setPoster("");
    setSelectedPoster("");
  };

  const gigSelector = () => {
    axios
      .post("/get-gig-to-edit", { selectedGig: gigToView })
      .then(({ data }) => {
        if (data.data) {
          setSelectedGig(data.data);
          data = data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const posterSelector = () => {
    let selectedGigHelper: any = selectedGig;
    if (selectedGigHelper.poster) {
      selectedGigHelper.poster = selectedPoster;

      setSelectedGig(selectedGigHelper);
      setPoster(selectedPoster);
    }
  };

  const gigDelete = () => {
    setDeleteSuccess(true);
    setDeleteFile(false);

    axios
      .post("/gig-delete", { selectedGig: selectedGig })
      .then(({ data }) => {
        if (data.deleteSuccess) {
          updateDatabase();
          setSelectedGig(false);
          setSelectedPoster("");
          const timer = setTimeout(() => {
            setDeleteSuccess(false);
          }, 2000);
          return () => clearTimeout(timer);
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const coordinator = (e: any) => {
    let selectedGigHelper: any = selectedGig;

    selectedGigHelper.lng = parseFloat(e.latLng.lng());
    selectedGigHelper.lat = parseFloat(e.latLng.lat());
    setSelectedGig(selectedGigHelper);
    setNewLng(parseFloat(e.latLng.lng()));
    setNewLat(parseFloat(e.latLng.lat()));
  };

  const updateDatabase = () => {
    axios
      .get("/get-gigs")
      .then(({ data }) => {
        setGigsList(data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="gigEditorContainer">
      <div
        className="gigEditorContainerInner"
        id={(darkMode && "logoBoxDarkEdit") || ""}
      >
        <form>
          {!posterSection && !mapView && (
            <div id="editorCloseTab">
              <Link to="/" className="buttonBack">
                X
              </Link>
            </div>
          )}
          {posterSection && (
            <div
              title="Back"
              id="editorCloseTab"
              onClick={(e) => {
                setPosterSection(false);
              }}
            >
              <div className="buttonBack">X</div>
            </div>
          )}
          {!posterSection && mapView && (
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
          <select
            size={1}
            name="selectedGig"
            className="selectGig"
            onChange={(e) => {
              setGigToView(e.target.value);
              gigSelector();
              setFile(null);
              if (elemRef.current) {
                elemRef.current.value = "";
              }
            }}
            onClick={(e) => {
              inputsReset();
              setError(false);
              setError2(false);
              setDeleteFile(false);
              setDoneUpdate(false);
            }}
          >
            <option
              className="chooseGig"
              value=""
              onClick={() => inputsReset()}
            >
              Select Gig
            </option>
            {gigsList &&
              gigsList
                .map((gig: any) => (
                  <option value={gig.date} key={gig.id}>
                    {gig.date} {gig.venue}
                  </option>
                ))
                .reverse()}
          </select>{" "}
          {posterSection && (
            <Posters setSelectedPoster={(e: any) => setSelectedPoster(e)} />
          )}
          {!mapView && !posterSection && (
            <div className="gigMainDetails">
              <div className="inputBack">
                <span>Date</span>
                <input
                  value={date || selectedGig.date || ""}
                  autoComplete="none"
                  name="date"
                  placeholder="Date"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  onClick={(e) => {
                    setError(false);
                    setError2(false);
                    setDeleteFile(false);
                    setDoneUpdate(false);
                  }}
                />
              </div>

              <div className="inputBack">
                <span>City</span>
                <input
                  value={city || selectedGig.city || ""}
                  autoComplete="none"
                  name="city"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  onClick={(e) => {
                    setError(false);
                    setError2(false);
                    setDeleteFile(false);
                    setDoneUpdate(false);
                  }}
                />
              </div>

              <div className="inputBack">
                <span>Tour</span>
                <input
                  value={tourName || selectedGig.tour_name || ""}
                  autoComplete="none"
                  name="tour_name"
                  placeholder="Tour Name"
                  onChange={(e) => setTourName(e.target.value)}
                  onClick={(e) => {
                    setError(false);
                    setError2(false);
                    setDeleteFile(false);
                    setDoneUpdate(false);
                  }}
                />
              </div>

              <div className="inputBack">
                <span>Venue</span>
                <input
                  value={venue || selectedGig.venue || ""}
                  autoComplete="none"
                  name="venue"
                  placeholder="Venue"
                  onChange={(e) => setVenue(e.target.value)}
                  onClick={(e) => {
                    setError(false);
                    setError2(false);
                    setDeleteFile(false);
                    setDoneUpdate(false);
                  }}
                />
              </div>
            </div>
          )}
          {!posterSection && (
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
                  <div className="coordinatesMenu">
                    <div className="lngLtdMenu">
                      {!mapView && "Select On Map"} {mapView && "Close"}
                    </div>

                    <div
                      title="Open Map"
                      className="editMapTogglerGlobe"
                      onClick={() => setMapView(!mapView)}
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
          )}
          {!mapView && !deleteSuccess && (
            <div className="posterEditBox">
              <div className="inputBack">
                <span>Poster</span>
                <input
                  value={selectedPoster || poster || selectedGig.poster || ""}
                  autoComplete="none"
                  name="poster"
                  placeholder="Poster"
                  onChange={(e) => setPoster(e.target.value)}
                  onClick={(e) => {
                    setError(false);
                    setError2(false);
                    setDeleteFile(false);
                    setDoneUpdate(false);
                  }}
                />
              </div>
              {selectedGig.id && (
                <div className="editorGallery">
                  <img
                    title={
                      (!posterSection && "Poster Gallery") ||
                      (posterSection && "Close Gallery") ||
                      ""
                    }
                    className="imgPreview"
                    src={
                      selectedPoster || poster || selectedGig.poster || "na.jpg"
                    }
                    onClick={(e) => {
                      setPosterSection(!posterSection);
                      setError(false);
                      setError2(false);
                      setDeleteFile(false);
                      setDoneUpdate(false);
                    }}
                  ></img>
                  {!posterSection && <div>Poster Gallery</div>}
                </div>
              )}
              {selectedGig.id && !deleteSuccess && !posterSection && (
                <div className="fileUploader" id="fileUploaderEdit">
                  {!success && !doneUpdate && (
                    <div className="uploadPosterProps">
                      <div className="uploadHead">
                        {(!file && " Upload Poster From File:") ||
                          "Finish Upload: "}
                      </div>
                      {file && (
                        <div
                          title="Upload Poster"
                          id="upload"
                          onClick={() => handleUploaderClick()}
                        >
                          Confirm
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    ref={elemRef}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(e.target.files[0]);
                      }
                    }}
                    onClick={(e) => {
                      setError(false);
                      setError2(false);
                      setDeleteFile(false);
                      setDoneUpdate(false);
                    }}
                  />

                  {success && <div className="uploadSuccess"></div>}
                </div>
              )}
            </div>
          )}
          {mapView && selectedGig.date && !deleteSuccess && (
            <EditMap
              coordinator={(e) => coordinator(e)}
              selectedGig={selectedGig}
            />
          )}
          {error && (
            <p className="error" id="errorEdit">
              {!selectedGig && "Select A Gig From The List"}{" "}
              {selectedGig &&
                "Be Sure That Date, Longitude & Latitude are Filled."}
            </p>
          )}
          {error2 && (
            <p className="error" id="errorEdit">
              Select an Image [Max Size: 5MB]
            </p>
          )}
        </form>
        {!deleteSuccess && !mapView && selectedGig && (
          <div className="formOptions">
            {!doneUpdate && (
              <div
                className="button"
                onClick={() => {
                  if (!doneUpdate) {
                    handleClick();
                  } else {
                    setSuccess(false);
                    setDoneUpdate(false);
                  }
                }}
              >
                {!doneUpdate && "Update"}
                {doneUpdate && "Done"}
              </div>
            )}

            {selectedGig.date && !doneUpdate && !mapView && !posterSection && (
              <div className="delete" onClick={(e) => setDeleteFile(true)}>
                Delete
              </div>
            )}

            {deleteFile && selectedGig.date && !deleteSuccess && (
              <div className="deleteWarn" onClick={() => gigDelete()}>
                Confirm
              </div>
            )}
          </div>
        )}
        {deleteSuccess && <div className="deleteSuccess"></div>}
        {doneUpdate && (
          <div
            className={doneUpdate && "doneUpdate"}
            onClick={() => {
              setDoneUpdate(false);
            }}
          >
            Done
          </div>
        )}
      </div>
    </div>
  );
};
