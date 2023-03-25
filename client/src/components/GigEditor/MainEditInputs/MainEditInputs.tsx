import React from "react";

import {
    FormContent,
    InputWrapper,
    InputLabel,
    Input,
} from "./../../GigCreator/GigCreator.style";

interface Props {
  date: any;
  venue: any;
  tourName: any;
  city: string;
  setCity: (e: string) => void;
  setDate: (e: any) => void;
  setVenue: (e: any) => void;
  setTourName: (e: any) => void;
  setDoneUpdate: (e: boolean) => void;
  selectedGig: any;
  setError: (e: boolean) => void;
  setError2: (e: boolean) => void;
  setDeleteFile: (e: any) => void;
}

export const MainEditInputs: React.FC<Props> = ({
  date,
  venue,
  city,
  tourName,
  selectedGig,
  setDoneUpdate,
  setError,
  setError2,
  setDeleteFile,
  setCity,
  setDate,
  setTourName,
  setVenue,
}) => {
  return (
      <FormContent>
          <InputWrapper>
              <InputLabel>Date</InputLabel>
              <Input
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
          </InputWrapper>

          <InputWrapper>
              <InputLabel>City</InputLabel>
              <Input
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
          </InputWrapper>

          <InputWrapper>
              <InputLabel>Tour</InputLabel>
              <Input
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
          </InputWrapper>

          <InputWrapper>
              <InputLabel>Venue</InputLabel>
              <Input
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
          </InputWrapper>
      </FormContent>
  );
};
