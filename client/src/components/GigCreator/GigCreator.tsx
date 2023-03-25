import React, { useEffect, useState } from "react";

import EditMap from "../EditMap/EditMap";

import {
    Container,
    Content,
    CloseButtonWrapper,
    CloseButton,
    Form,
    Title,
    FormContent,
    InputWrapper,
    InputLabel,
    Input,
    CoordinatesSection,
    FlipperWrapper,
    CoordinatesRightContent,
    CoordinatesButtonLabel,
    CoordinatesButton,
    SubmitButtonWrapper,
    SubmitButton,
    Required,
    DoneButton,
    SubmitSuccess,
    Error,
} from "./GigCreator.style";

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
      <Container>
          <Content
          dark={darkMode}
          >
              {mapView && (
                  <CloseButtonWrapper
                      title="Back"
                      onClick={(e:any) => {
                          setMapView(!mapView);
                      }}
                  >
                      <CloseButton>X</CloseButton>
                  </CloseButtonWrapper>
              )}
              <Form>
                  <Title>Add Gig</Title>
                  {!mapView && (
                      <FormContent>
                          <InputWrapper>
                              <InputLabel>Date*</InputLabel>
                              <Input
                                  value={date || ""}
                                  autoComplete="none"
                                  name="date"
                                  placeholder="date"
                                  type="date"
                                  onChange={(e) => setDate(e.target.value)}
                                  onClick={() => setError(false)}
                              />
                          </InputWrapper>

                          <InputWrapper>
                              <InputLabel>City</InputLabel>
                              <Input
                                  value={city || ""}
                                  autoComplete="none"
                                  name="city"
                                  placeholder="City"
                                  onChange={(e) => setCity(e.target.value)}
                                  onClick={() => setError(false)}
                              />
                          </InputWrapper>

                          <InputWrapper>
                              <InputLabel>Tour</InputLabel>
                              <Input
                                  value={tourName || ""}
                                  autoComplete="none"
                                  name="tourName"
                                  placeholder="Tour Name"
                                  onChange={(e) => setTourName(e.target.value)}
                                  onClick={() => setError(false)}
                              />
                          </InputWrapper>

                          <InputWrapper>
                              <InputLabel>Venue</InputLabel>
                              <Input
                                  value={venue || ""}
                                  autoComplete="none"
                                  name="venue"
                                  placeholder="Venue"
                                  onChange={(e) => setVenue(e.target.value)}
                                  onClick={() => setError(false)}
                              />
                          </InputWrapper>
                      </FormContent>
                  )}
                  <CoordinatesSection>
                      <InputWrapper>
                          <InputLabel>Latitude*</InputLabel>
                          <Input
                              value={lat || ""}
                              autoComplete="none"
                              name="lat"
                              placeholder="Latitude"
                              onChange={(e) => setLat(e.target.value)}
                              onClick={() => setError(false)}
                          />
                      </InputWrapper>
                      <FlipperWrapper>
                          <CoordinatesRightContent
                              onClick={() => setMapView(!mapView)}
                          >
                              <CoordinatesButtonLabel
                                  style={{
                                      animation:
                                          (lat &&
                                              lng &&
                                              mapView &&
                                              "blinkerBan 3s infinite ease-in-out ") ||
                                          "",
                                  }}
                              >
                                  {!mapView && "Select On Map"}{" "}
                                  {mapView && "Close Map"}
                              </CoordinatesButtonLabel>

                              <CoordinatesButton title="Open Map"></CoordinatesButton>
                          </CoordinatesRightContent>

                          <InputWrapper>
                              <InputLabel>Longitude*</InputLabel>
                              <Input
                                  value={lng || ""}
                                  autoComplete="none"
                                  name="lng"
                                  placeholder="Longitude"
                                  onChange={(e) => setLng(e.target.value)}
                                  onClick={() => setError(false)}
                              />
                          </InputWrapper>
                      </FlipperWrapper>
                  </CoordinatesSection>

                  <SubmitButtonWrapper>
                      {!success && !mapView && !taskDone && (
                          <SubmitButton
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
                          </SubmitButton>
                      )}
                  </SubmitButtonWrapper>
                  {!success && !error && !mapView && (
                      <Required>*required</Required>
                  )}
                  {error && (
                      <Error>
                          {"Date, Latitude & Longitude Fields Are Required"}
                      </Error>
                  )}
              </Form>
              {mapView && <EditMap coordinator={(e) => coordinator(e)} />}
              {success && !taskDone && (
                  <SubmitSuccess
                      style={{
                          marginBottom: `1vmax`,
                      }}
                  ></SubmitSuccess>
              )}
              {taskDone && (
                  <DoneButton
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
                  </DoneButton>
              )}
          </Content>
      </Container>
  );
};
