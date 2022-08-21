import React from "react";

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
        <div
          className="editorGallery"
          onClick={(e) => {
            setPosterSection(!posterSection);
            setError(false);
            setError2(false);
            setDeleteFile(false);
            setDoneUpdate(false);
          }}
        >
          <img
            title={
              (!posterSection && "Poster Gallery") ||
              (posterSection && "Close Gallery") ||
              ""
            }
            className="imgPreview"
            src={selectedPoster || poster || selectedGig.poster || "na.jpg"}
          ></img>
          {!posterSection && <div>Poster Gallery</div>}
        </div>
      )}
      {selectedGig.id && !deleteSuccess && !posterSection && (
        <div className="fileUploader" id="fileUploaderEdit">
          {!success && !doneUpdate && (
            <div className="uploadPosterProps">
              <div className="uploadHead">
                {(!file && " Upload Poster From File:") || "Finish Upload: "}
              </div>
              {file && (
                <div
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
  );
};
