import { useLocation } from "react-router-dom";

import React, { useState, useEffect, useRef } from "react";

import {Container, Content, Error} from "./GigEditor.style"
import { Form } from "../GigCreator/GigCreator.style";

const {
  posterSelector,
  gigSelector,
  coordinator,
} = require("./GigEditorUtils");

import EditMap from "../EditMap/EditMap";

import { GigEditorTop } from "./GigEditorTop/GigEditorTop";
import { MainEditInputs } from "./MainEditInputs/MainEditInputs";
import { CoordinatesInputs } from "./CoordinatesInputs/CoordinatesInputs";
import { PosterInputs } from "./PosterInputs/PosterInputs";
import { GigEditorBottom } from "./GigEditorBottom/GigEditorBottom";
import { Posters } from "../Posters/Posters";

type LocationProps = {
  state: {
    gig: {
      date: string;
    };
  };
  pathname: string;
};

interface Props {
  gigsList: any;
  admin: boolean;
  darkMode: boolean;
  setGigsList: (e: any) => any;
  setEditMode: (e: boolean) => any;
  setGigsListTimeline: (e: any) => void;
}

export const GigEditor: React.FC<Props> = ({
  gigsList,
  admin,
  darkMode,
  setGigsList,
  setEditMode,
  setGigsListTimeline,
}) => {
  const [file, setFile] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [deleteFile, setDeleteFile] = useState<any>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [mapView, setMapView] = useState<boolean>(false);
  const [selectedPoster, setSelectedPoster] = useState<any>("");
  const [posterSection, setPosterSection] = useState<boolean>(false);
  const [doneUpdate, setDoneUpdate] = useState<boolean>(false);
  const [date, setDate] = useState<any>("");
  const [venue, setVenue] = useState<any>("");
  const [lat, setLat] = useState<string | number>("");
  const [lng, setLng] = useState<string | number>("");
  const [newLat, setNewLat] = useState<string | number>("");
  const [newLng, setNewLng] = useState<string | number>("");
  const [tourName, setTourName] = useState<any>("");
  const [city, setCity] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [gigToView, setGigToView] = useState<string | number>("");
  const [selectedGig, setSelectedGig] = useState<any>("");

  const elemRef = useRef<any>();

  const currentLocation = useLocation() as unknown as LocationProps;
  const { state } = currentLocation;

  useEffect(function () {
    if (!admin) {
      location.replace("/");
    }
    setEditMode(true);
  }, []);

  useEffect(
    function () {
      if (state && state.gig) {
        setTimeout(() => {
          setGigToView(state.gig.date);
        }, 1500);
      }
    },
    [state]
  );

  useEffect(
    function () {
      gigSelector(gigToView, setSelectedGig);
    },
    [gigToView]
  );

  useEffect(
    function () {
      posterSelector(selectedGig, selectedPoster, setSelectedGig, setPoster);
    },
    [selectedPoster]
  );

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

  return (
      <Container>
          <Content dark={darkMode}>
              <Form>
                  <GigEditorTop
                      setDoneUpdate={(e: boolean) => setDoneUpdate(e)}
                      doneUpdate={doneUpdate}
                      setError={(e: boolean) => setError(e)}
                      setError2={(e: boolean) => setError2(e)}
                      selectedGig={selectedGig}
                      setDeleteFile={(e: any) => setDeleteFile(e)}
                      posterSection={posterSection}
                      setPosterSection={(e: boolean) => setPosterSection(e)}
                      elemRef={elemRef}
                      setSelectedGig={(e: any) => setSelectedGig(e)}
                      setFile={(e: any) => setFile(e)}
                      mapView={mapView}
                      setMapView={(e: boolean) => setMapView(e)}
                      gigToView={gigToView}
                      setGigToView={(e: string | number) => setGigToView(e)}
                      gigsList={gigsList}
                      inputsReset={() => inputsReset()}
                  />
                  {posterSection && (
                      <Posters
                          setSelectedPoster={(e: any) => setSelectedPoster(e)}
                      />
                  )}
                  {!mapView && !posterSection && (
                      <MainEditInputs
                          date={date}
                          venue={venue}
                          tourName={tourName}
                          city={city}
                          selectedGig={selectedGig}
                          setCity={(e: any) => setCity(e)}
                          setDate={(e: any) => setDate(e)}
                          setVenue={(e: any) => setVenue(e)}
                          setTourName={(e: any) => setTourName(e)}
                          setDeleteFile={(e: any) => setDeleteFile(e)}
                          setDoneUpdate={(e: boolean) => setDoneUpdate(e)}
                          setError={(e: boolean) => setError(e)}
                          setError2={(e: boolean) => setError2(e)}
                      />
                  )}
                  {!posterSection && (
                      <CoordinatesInputs
                          lat={lat}
                          newLat={newLat}
                          lng={lng}
                          newLng={newLng}
                          selectedGig={selectedGig}
                          setLat={(e: string | number) => setLat(e)}
                          setLng={(e: string | number) => setLng(e)}
                          setDeleteFile={(e: any) => setDeleteFile(e)}
                          setDoneUpdate={(e: boolean) => setDoneUpdate(e)}
                          setError={(e: boolean) => setError(e)}
                          setError2={(e: boolean) => setError2(e)}
                          mapView={mapView}
                          setMapView={(e: boolean) => setMapView(e)}
                          deleteSuccess={deleteSuccess}
                      />
                  )}
                  {!mapView && !deleteSuccess && (
                      <PosterInputs
                          poster={poster}
                          selectedPoster={selectedPoster}
                          setPoster={(e: string) => setPoster(e)}
                          posterSection={posterSection}
                          setPosterSection={(e: boolean) => setPosterSection(e)}
                          doneUpdate={doneUpdate}
                          selectedGig={selectedGig}
                          deleteSuccess={deleteSuccess}
                          setDoneUpdate={(e: boolean) => setDoneUpdate(e)}
                          setError={(e: boolean) => setError(e)}
                          setError2={(e: boolean) => setError2(e)}
                          setSelectedPoster={(e: any) => setSelectedPoster(e)}
                          file={file}
                          setFile={(e: any) => setFile(e)}
                          elemRef={elemRef}
                          success={success}
                          setSuccess={(e: boolean) => setSuccess(e)}
                          setGigsListTimeline={(e: any) =>
                              setGigsListTimeline(e)
                          }
                          setGigsList={(e: any) => setGigsList(e)}
                          setDeleteFile={(e: any) => setDeleteFile(e)}
                          setSelectedGig={(e: any) => setSelectedGig(e)}
                      />
                  )}
                  {mapView && selectedGig.date && !deleteSuccess && (
                      <EditMap
                          coordinator={(e) =>
                              coordinator(
                                  e,
                                  selectedGig,
                                  setSelectedGig,
                                  setNewLng,
                                  setNewLat
                              )
                          }
                          selectedGig={selectedGig}
                      />
                  )}
                  {error && (
                      <Error>
                          {!selectedGig && "Select A Gig From The List"}{" "}
                          {selectedGig &&
                              "Be Sure That Date, Longitude & Latitude are Filled."}
                      </Error>
                  )}
                  {error2 && <Error>Select an Image [Max Size: 5MB]</Error>}
                  <GigEditorBottom
                      setDoneUpdate={(e: boolean) => setDoneUpdate(e)}
                      setSelectedPoster={(e: any) => setSelectedPoster(e)}
                      posterSection={posterSection}
                      doneUpdate={doneUpdate}
                      selectedGig={selectedGig}
                      deleteSuccess={deleteSuccess}
                      setDeleteSuccess={(e: boolean) => setDeleteSuccess(e)}
                      setSuccess={(e: boolean) => setSuccess(e)}
                      deleteFile={deleteFile}
                      setDeleteFile={(e: any) => setDeleteFile(e)}
                      selectedPoster={selectedPoster}
                      setError={(e: boolean) => setError(e)}
                      setFile={(e: any) => setFile(e)}
                      setSelectedGig={(e: any) => setSelectedGig(e)}
                      mapView={mapView}
                      date={date}
                      venue={venue}
                      tourName={tourName}
                      city={city}
                      lat={lat}
                      lng={lng}
                      poster={poster}
                      setGigsList={(e: any) => setGigsList(e)}
                      setGigsListTimeline={(e: any) => setGigsListTimeline(e)}
                  />
              </Form>
          </Content>
      </Container>
  );
};
