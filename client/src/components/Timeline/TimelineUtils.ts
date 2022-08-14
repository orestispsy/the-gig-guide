import axios from "../../common/Axios/axios";

module.exports.axiosGetGigs = (
  setGigsListTimeline: (e: any) => void,
  boolean: boolean
) => {
  axios
    .post("/get-gigs-timeline", { boolean: boolean })
    .then(({ data }) => {
      setGigsListTimeline(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

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

module.exports.axiosGetNextImages = (
  timelineImages: any,
  setTimelineImages: (e: any) => void,
  created_at: string
) => {
  axios
    .post("/get-next-images-timeline", { created_at: created_at })
    .then(({ data }) => {
      setTimelineImages(timelineImages.concat(data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

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

module.exports.axiosGetNextComments = (
  timelineComments: any,
  setTimelineComments: (e: any) => void,
  id: string
) => {
  axios
    .post("/get-next-comments-timeline", { id: id })
    .then(({ data }) => {
      setTimelineComments(timelineComments.concat(data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.axiosGetLastOnline = (
  setTimelineLastOnline: (e: any) => void,
  boolean: boolean
) => {
  axios
    .post("/get-last-online-timeline", { boolean: boolean })
    .then(({ data }) => {
      setTimelineLastOnline(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.axiosGetNextUpdatedGigs = (
  gigsListTimeline: any,
  setGigsListTimeline: (e: any) => void,
  updated_at: string
) => {
  axios
    .post("/get-next-gigs-updated-timeline", { updated_at: updated_at })
    .then(({ data }) => {
      setGigsListTimeline(gigsListTimeline.concat(data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.axiosGetNextGigs = (
  gigsListTimeline: any,
  setGigsListTimeline: (e: any) => void,
  id: number
) => {
  axios
    .post("/get-next-gigs-timeline", { id: id })
    .then(({ data }) => {
      setGigsListTimeline(gigsListTimeline.concat(data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.dateTimeHandler = (e: string) => {
  let newDate = new Date(e);
  let day: string | number = newDate.getDate();
  let month: string | number = newDate.getMonth() + 1;
  let year: any = newDate.getFullYear();
  let hours: any = newDate.getHours() + 6;
  //hours + 6 as local configuration for my domain
  let minutes: string | number = newDate.getMinutes();
  let timePreFix: string;
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours == 24) {
    hours = 0;
  }
  if (hours > 24) {
    hours = hours - 24;
  }

  if (hours < 10) {
    timePreFix = `0`;
  } else {
    timePreFix = "";
  }

  let fixedDateTime: string =
    day + "-" + month + "-" + year + " • " + timePreFix + hours + ":" + minutes;

  return fixedDateTime;
};
