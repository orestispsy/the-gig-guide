import axios from "../../common/Axios/axios";
import { socket } from "../../common/Socket/socket";

const axiosGetImages = (setTimelineImages: (e: any) => void) => {
  axios
    .get("/get-images-timeline")
    .then(({ data }) => {
      setTimelineImages(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const axiosGetGallery = (selectedGigId: string) => {
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
};

const axiosDeleteImage = (e: any, setImagesTimeline: (e: any) => void) => {
  axios
    .post("/delete-community-image/", {
      imageId: e.target.id,
    })
    .then(({ data }) => {
      if (data.success) {
        socket.emit("DELETE IMAGE", data.data);
        axiosGetImages(setImagesTimeline);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleUploaderClick = (
  setUpload: (e: boolean) => void,
  file: any,
  setFile: (e: any) => void,
  selectedGigId: string,
  myUserId: number | undefined,
  myNickname: string,
  setImagesTimeline: (e: any) => void,
  setContribute: (e: boolean) => void,
  setError: (e: boolean) => void
) => {
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
        axiosGetImages(setImagesTimeline);
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

module.exports = {
  axiosDeleteImage,
  axiosGetGallery,
  handleUploaderClick,
  axiosGetImages,
};
