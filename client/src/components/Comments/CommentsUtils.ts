import axios from "../../common/Axios/axios";

module.exports.axiosGetComments = (setTimelineComments: (e: any) => void) => {
  axios
    .get("/get-comments-timeline")
    .then(({ data }) => {
      setTimelineComments(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
