import React from "react";

import {
  Container,
  TogglerWrapper,
  TogglerLabel,
  Toggler,
  FileUploaderContainer,
  FileUploaderContent,
  FileUploaderLabel,
  UploadButton,
  InputPoster,
  InputWrapper,
} from "./PosterInputs.style";

import {
  InputLabel,
  Input,
  SubmitSuccess,
} from "./../../GigCreator/GigCreator.style";

const { handleUploaderClick } = require("./../GigEditorUtils");

interface Props {
  selectedPoster: any;
  poster: string;
  setPoster: (e: string) => void;
  setDoneUpdate: (e: boolean) => void;
  doneUpdate: boolean;
  selectedGig: any;
  setError: (e: boolean) => void;
  setError2: (e: boolean) => void;
  setDeleteFile: (e: any) => void;
  posterSection: boolean;
  setPosterSection: (e: boolean) => void;
  setSuccess: (e: boolean) => void;
  success: boolean;
  deleteSuccess: boolean;
  file: any;
  elemRef: any;
  setGigsListTimeline: (e: any) => void;
  setGigsList: (e: any) => any;
  setFile: (e: any) => void;
  setSelectedPoster: (e: any) => void;
  setSelectedGig: (e: any) => void;
}

export const PosterInputs: React.FC<Props> = ({
  selectedPoster,
  poster,
  setPoster,
  selectedGig,
  setDoneUpdate,
  doneUpdate,
  setError,
  setError2,
  setDeleteFile,
  posterSection,
  setPosterSection,
  success,
  deleteSuccess,
  file,
  elemRef,
  setGigsListTimeline,
  setFile,
  setGigsList,
  setSuccess,
  setSelectedPoster,
  setSelectedGig,
}) => {
  return (
    <Container empty={!!selectedGig.id}>
      <InputWrapper>
        <InputLabel>Poster</InputLabel>
        <Input
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
      </InputWrapper>
      {selectedGig.id && (
        <TogglerWrapper
          onClick={(e) => {
            setPosterSection(!posterSection);
            setError(false);
            setError2(false);
            setDeleteFile(false);
            setDoneUpdate(false);
          }}
        >
          <Toggler
            title={
              (!posterSection && "Poster Gallery") ||
              (posterSection && "Close Gallery") ||
              ""
            }
            src={selectedPoster || poster || selectedGig.poster || "na.jpg"}
          ></Toggler>
          {!posterSection && <TogglerLabel>Poster Gallery</TogglerLabel>}
        </TogglerWrapper>
      )}
      {selectedGig.id && !deleteSuccess && !posterSection && (
        <FileUploaderContainer>
          {!success && !doneUpdate && (
            <FileUploaderContent>
              <FileUploaderLabel>
                {(!file && " Upload Poster From File:") || "Finish Upload: "}
              </FileUploaderLabel>
              {file && (
                <UploadButton
                  title="Upload Poster"
                  id="upload"
                  onClick={() =>
                    handleUploaderClick(
                      elemRef,
                      setSuccess,
                      file,
                      selectedGig,
                      setSelectedPoster,
                      setGigsListTimeline,
                      setSelectedGig,
                      setGigsList,
                      setDoneUpdate,
                      setFile,
                      setError2
                    )
                  }
                >
                  Confirm
                </UploadButton>
              )}
            </FileUploaderContent>
          )}
          <InputPoster
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

          {success && <SubmitSuccess />}
        </FileUploaderContainer>
      )}
    </Container>
  );
};
