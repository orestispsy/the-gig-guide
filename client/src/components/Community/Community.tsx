import React, { useState, useEffect, useRef } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";
import { socket } from "../../common/Socket/socket";
import { useSelector } from "react-redux";

const {
  axiosGetImages,
  handleUploaderClick,
  axiosGetGallery,
  axiosDeleteImage,
} = require("./CommunityUtils");

const { moveScrollbarToBottom } = require("./../Chat/ChatUtils");

interface Props {
  selectedGigId: string;
  myUserId: number | undefined;
  superAdmin: boolean;
  myNickname: string;
  setOpenComments: (e: boolean) => void;
  openComments: boolean;
  guest: boolean;
  setImagesTimeline: (e: any) => void;
}

export const Community: React.FC<Props> = ({
  selectedGigId,
  myUserId,
  superAdmin,
  myNickname,
  setOpenComments,
  openComments,
  guest,

  setImagesTimeline,
}) => {
  const [contribute, setContribute] = useState<boolean>(false);
  const [file, setFile] = useState<any>("");

  const [error, setError] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);

  const elemRef = useRef<HTMLDivElement>(null);

  const images = useSelector((state: any) => state && state.images);

  useEffect(() => {
    if (elemRef.current) {
      moveScrollbarToBottom(elemRef);
    }
  }, [images]);

  useEffect(
    function () {
      if (selectedGigId) {
        setError(false);
        setContribute(false);
        axiosGetGallery(selectedGigId);
      }
    },
    [selectedGigId]
  );

  const updateFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="communityContainer">
      <div className="gallery">Gallery</div>
      <div className="communityPhotos" ref={elemRef}>
        {images && images.length == 0 && <h1>Nothing here yet .</h1>}

        {images &&
          images.map((img: any) => (
            <div key={img.id}>
              {superAdmin ||
                (myUserId == img.img_sender_id && (
                  <div
                    className="deletecommunityPhoto"
                    title="Delete"
                    id={img.id}
                    onClick={(e) => axiosDeleteImage(e)}
                  ></div>
                ))}
              {img.gig_id == selectedGigId && superAdmin && (
                <div
                  className="deletecommunityPhoto"
                  title="Delete"
                  id={img.id}
                  onClick={(e) => axiosDeleteImage(e)}
                ></div>
              )}
              {img.gig_id == selectedGigId && (
                <div className="communityPhotosDetails">
                  <a href={img.img_url} target="_blank">
                    <img src={img.img_url}></img>
                  </a>
                  Uploaded by: <div>{img.nickname}</div>
                </div>
              )}
            </div>
          ))}
      </div>
      {!contribute && (
        <div className="galleryControls">
          <div
            id="contribute"
            className="mainMenuLink"
            onClick={() => setContribute(true)}
          >
            Contribute
          </div>
          {!guest && (
            <div
              id="commentsButton"
              className="mainMenuLink"
              onClick={() => setOpenComments(!openComments)}
            >
              Comments
            </div>
          )}
        </div>
      )}

      {contribute && (
        <div className="fileUploaderBack">
          <div className="addPhoto"> Add Image</div>
          <div className="fileUploader" id="fileUploader">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => updateFile(e)}
              onClick={() => setError(false)}
            />

            {!upload && file && (
              <div
                title="Upload Image"
                className="upload"
                onClick={() =>
                  handleUploaderClick(
                    setUpload,
                    file,
                    setFile,
                    selectedGigId,
                    myUserId,
                    myNickname,
                    setImagesTimeline,
                    setContribute,
                    setError
                  )
                }
              ></div>
            )}
            {upload && <div className="uploading"></div>}
          </div>
          {contribute && (
            <div className="communityConfig">
              <div
                className="onlineUsersRedDot"
                id="commentsBack"
                title="Close File Uploader"
                onClick={() => {
                  setContribute(false);
                  setError(false);
                  setFile(null);
                }}
              ></div>
            </div>
          )}
        </div>
      )}

      {error && <p className="error">Select an Image [Max Size: 5MB]</p>}
    </div>
  );
};
