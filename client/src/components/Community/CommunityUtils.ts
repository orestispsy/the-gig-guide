import axios from "../../common/Axios/axios";

module.exports.axiosGetImages = (setTimelineImages: (e: any) => void) => {
  axios
    .get("/get-images-timeline")
    .then(({ data }) => {
      setTimelineImages(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
