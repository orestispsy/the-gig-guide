import React, { useState, useEffect, useRef } from "react";
import axios from "../../common/Axios/axios";
import { Link } from "react-router-dom";
import { socket } from "../../common/Socket/socket";
import { useSelector } from "react-redux";

interface Props {
  selectedGigId: string;
  myUserId: number | undefined;
  superAdmin: boolean;
  myNickname: string;
  setOpenComments: (e: boolean) => void;
  openComments: boolean;
  guest: boolean;
}

export const Community: React.FC<Props> = ({
  selectedGigId,
  myUserId,
  superAdmin,
  myNickname,
  setOpenComments,
  openComments,
  guest,
}) => {
  const [contribute, setContribute] = useState<boolean>(false);
  const [file, setFile] = useState<any>("");

  const [error, setError] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);

  const elemRef = useRef<HTMLDivElement>(null);

  const images = useSelector((state: any) => state && state.images);

  useEffect(() => {
    if (elemRef.current) {
      const newScrollTop =
        elemRef.current.scrollHeight - elemRef.current.clientHeight;
      elemRef.current.scrollTop = newScrollTop;
    }
  }, [images]);

  useEffect(
    function () {
      if (selectedGigId) {
        setError(false);
        setContribute(false);
        axios
          .post("/get-community-images/", {
            selectedGigId: selectedGigId,
          })
          .then(({ data }) => {
            socket.emit("GET IMAGES", data.rows);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [selectedGigId]
  );

  const imageDelete = (e: any) => {
    axios
      .post("/delete-community-image/", {
        imageId: e.target.id,
      })
      .then(({ data }) => {
        if (data.success) {
          socket.emit("DELETE IMAGE", data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUploaderClick = () => {
    setUpload(true);
    const formData = new FormData();
    let ext = file.name.split(".");
    formData.append(
      "file",
      file,
      `G${selectedGigId}U${myUserId}T.${ext[ext.length - 1]}`
    );
    formData.append("data", JSON.stringify(selectedGigId));
    formData.append("user", JSON.stringify(myUserId));
    formData.append("nickname", myNickname);
    axios
      .post("/upload-community-image", formData)
      .then(({ data }) => {
        if (data.success) {
          socket.emit("ADD IMAGE", data.rows[0]);
          setContribute(false);
          setError(false);
          setFile("");
          setUpload(false);
        } else if (data.error) {
          setError(true);
          setUpload(false);
        }
      })
      .catch((err) => {
        setError(true);
        setUpload(false);
        console.log(err);
      });
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
                    onClick={(e) => imageDelete(e)}
                  ></div>
                ))}
              {img.gig_id == selectedGigId && superAdmin && (
                <div
                  className="deletecommunityPhoto"
                  title="Delete"
                  id={img.id}
                  onClick={(e) => imageDelete(e)}
                ></div>
              )}
              {img.gig_id == selectedGigId && (
                <div className="communityPhotosDetails">
                  <a href={img.img_url} target="_blank">
                    <img src={img.img_url}></img>
                  </a>
                  Uploaded by:{" "}
                  <div>
                    {(img.nickname.includes("Guest") && "Anonymous") ||
                      img.nickname}
                  </div>
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
            Contribute!
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
                onClick={() => handleUploaderClick()}
              ></div>
            )}
            {upload && <div className="uploading"></div>}
          </div>
          {contribute && (
            <div className="communityConfig">
              <div
                className="onlineUsersRedDot"
                id="commentsBack"
                title="Back"
                onClick={() => {
                  setContribute(false);
                  setError(false);
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
