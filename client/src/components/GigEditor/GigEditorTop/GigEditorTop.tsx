import React from "react";

import {
  Select,
  Option,
  CloseButton,
  CloseButtonWrapper,
} from "./GigEditorTop.style";

const { gigSelector } = require("./../GigEditorUtils");

interface Props {
  setDoneUpdate: (e: boolean) => void;
  doneUpdate: boolean;
  selectedGig: any;
  setError: (e: boolean) => void;
  setError2: (e: boolean) => void;
  setDeleteFile: (e: any) => void;
  posterSection: boolean;
  setPosterSection: (e: boolean) => void;
  elemRef: any;
  setFile: (e: any) => void;
  setSelectedGig: (e: any) => void;
  mapView: boolean;
  setMapView: (e: boolean) => void;
  gigToView: string | number;
  setGigToView: (e: string | number) => void;
  gigsList: any;
  inputsReset: () => void;
}

export const GigEditorTop: React.FC<Props> = ({
  selectedGig,
  setDoneUpdate,
  setError,
  setError2,
  setDeleteFile,
  posterSection,
  setPosterSection,
  elemRef,
  setFile,
  setSelectedGig,
  mapView,
  setMapView,
  gigToView,
  setGigToView,
  gigsList,
  inputsReset,
}) => {
  return (
    <>
      {posterSection && (
        <CloseButtonWrapper
          title="Back"
          onClick={(e: any) => {
            setPosterSection(false);
          }}
        >
          <CloseButton>X</CloseButton>
        </CloseButtonWrapper>
      )}
      {!posterSection && mapView && (
        <CloseButtonWrapper
          title="Back"
          onClick={(e: any) => {
            setMapView(!mapView);
          }}
        >
          <CloseButton>X</CloseButton>
        </CloseButtonWrapper>
      )}
      <Select
        size={1}
        name="selectedGig"
        onChange={(e) => {
          setGigToView(e.target.value);
          gigSelector(gigToView, setSelectedGig);
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
        <Option value="" onClick={() => inputsReset()}>
          Select Gig
        </Option>
        {gigsList &&
          gigsList
            .map((gig: any) => (
              <Option
                value={gig.date}
                key={gig.id}
                style={{
                  color: (selectedGig.id == gig.id && `black`) || ``,
                }}
              >
                {gig.date} {gig.venue}
              </Option>
            ))
            .reverse()}
      </Select>
    </>
  );
};
