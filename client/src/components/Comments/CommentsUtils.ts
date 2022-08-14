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
    year + "-" + month + "-" + day + " • " + timePreFix + hours + ":" + minutes;

  return fixedDateTime;
};
