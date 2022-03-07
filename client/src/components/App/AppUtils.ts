import axios from "../../common/Axios/axios";

module.exports.axiosGetUserDetails = (
  setMyUserId: (e: number | undefined) => void,
  setMyNickname: (e: string) => void,
  setAdmin: (e: boolean) => void,
  setSuperAdmin: (e: boolean) => void,
  setMyChatImg: (e: string) => void,
  setMyChatColor: (e: string) => void,
  setGuest: (e: boolean) => void
) => {
  axios
    .get("/user-details")
    .then(({ data }) => {
      if (!data.data) {
        location.replace("/");
      }

      setMyUserId(data.data.id);
      setMyNickname(data.data.nickname);
      setAdmin(data.data.admin);
      setSuperAdmin(data.data.super_admin);
      setMyChatImg(data.data.chat_img);
      setMyChatColor(data.data.chat_color);

      if (data.data.nickname) {
        if (data.data.nickname.includes("Guest")) {
          setGuest(true);
          setAdmin(false);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.axiosGetGigs = (setGigsList: (e: any) => void) => {
  axios
    .get("/get-gigs")
    .then(({ data }) => {
      setGigsList(data.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.axiosGetCounter = (setVisitors: (e: number | null) => void) => {
  axios
    .get("/counter")
    .then(({ data }) => {
      setVisitors(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.setPlayerPosition = (
  x: number,
  y: number,
  setTop: (e: number) => void,
  setLeft: (e: number) => void
) => {
  setTop(x), setLeft(y);
};
