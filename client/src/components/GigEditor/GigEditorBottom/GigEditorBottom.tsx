import React from "react";


import {
    Delete, DeleteWarn, DeleteSuccess,BottomWrapper
} from "./GigEditorBottom.style";

import {
    SubmitButtonWrapper,
    SubmitButton,
    DoneButton,
} from "./../../GigCreator/GigCreator.style";

const { handleClick, gigDelete } = require("./../GigEditorUtils");

interface Props {
  setDoneUpdate: (e: boolean) => void;
  doneUpdate: boolean;
  selectedGig: any;
  setError: (e: boolean) => void;
  setDeleteFile: (e: any) => void;
  posterSection: boolean;
  setFile: (e: any) => void;
  setSelectedGig: (e: any) => void;
  mapView: boolean;
  date: any;
  venue: any;
  tourName: any;
  city: string;
  lat: string | number;
  lng: string | number;
  selectedPoster: any;
  poster: string;
  deleteSuccess: boolean;
  setSuccess: (e: boolean) => void;
  setDeleteSuccess: (e: boolean) => void;
  setGigsListTimeline: (e: any) => void;
  setGigsList: (e: any) => any;
  setSelectedPoster: (e: any) => void;
  deleteFile: any;
}

export const GigEditorBottom: React.FC<Props> = ({
  selectedGig,
  setDoneUpdate,
  setDeleteFile,
  posterSection,
  setFile,
  setSelectedGig,
  mapView,
  date,
  venue,
  tourName,
  city,
  lat,
  lng,
  poster,
  selectedPoster,
  deleteSuccess,
  doneUpdate,
  setError,
  setGigsList,
  setGigsListTimeline,
  setSuccess,
  setDeleteSuccess,
  deleteFile,
  setSelectedPoster,
}) => {
  return (
      <BottomWrapper>
          {!deleteSuccess && !mapView && selectedGig && (
              <SubmitButtonWrapper doneUpdate={doneUpdate}>
                  {!doneUpdate && (
                      <SubmitButton
                          onClick={() => {
                              if (!doneUpdate) {
                                  handleClick(
                                      date,
                                      venue,
                                      lat,
                                      lng,
                                      tourName,
                                      city,
                                      poster,
                                      selectedGig,
                                      selectedPoster,
                                      setGigsListTimeline,
                                      setError,
                                      setDoneUpdate,
                                      setFile,
                                      setGigsList
                                  );
                              } else {
                                  setSuccess(false);
                                  setDoneUpdate(false);
                              }
                          }}
                      >
                          {!doneUpdate && "Update"}
                          {doneUpdate && "Done"}
                      </SubmitButton>
                  )}

                  {selectedGig.date &&
                      !doneUpdate &&
                      !mapView &&
                      !posterSection && (
                          <Delete onClick={(e) => setDeleteFile(true)}>
                              Delete
                          </Delete>
                      )}

                  {deleteFile && selectedGig.date && !deleteSuccess && (
                      <DeleteWarn
                          onClick={() =>
                              gigDelete(
                                  setDeleteSuccess,
                                  setDeleteFile,
                                  selectedGig,
                                  setGigsListTimeline,
                                  setGigsList,
                                  setSelectedGig,
                                  setSelectedPoster
                              )
                          }
                      >
                          Confirm
                      </DeleteWarn>
                  )}
              </SubmitButtonWrapper>
          )}
          {deleteSuccess && <DeleteSuccess />}
          {doneUpdate && (
              <DoneButton
                  onClick={() => {
                      setDoneUpdate(false);
                  }}
              >
                  Done
              </DoneButton>
          )}
      </BottomWrapper>
  );
};
