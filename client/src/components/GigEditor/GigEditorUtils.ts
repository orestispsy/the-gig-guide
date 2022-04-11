import axios from "../../common/Axios/axios";

module.exports.axiosGetGigs = (setGigsListTimeline: (e: any) => void) => {
  axios
    .get("/get-gigs-timeline")
    .then(({ data }) => {
      setGigsListTimeline(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
