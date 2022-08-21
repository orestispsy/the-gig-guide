import React from "react";

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
        <option className="chooseGig" value="" onClick={() => inputsReset()}>
          Select Gig
        </option>
        {gigsList &&
          gigsList
            .map((gig: any) => (
              <option
                value={gig.date}
                key={gig.id}
                style={{
                  color: (selectedGig.id == gig.id && `black`) || ``,
                }}
              >
                {gig.date} {gig.venue}
              </option>
            ))
            .reverse()}
      </select>
    </>
  );
};
