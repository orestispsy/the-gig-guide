import { NavigateFunction } from "react-router-dom";

module.exports.chatNewPostNotification = (
  chatNotification: boolean,
  chatMode: boolean,
  chatMessages: any,
  setChatNotification: (e: boolean) => void,
  setPrivateMsgNotification: (e: boolean) => void,
  playSlideFx: () => void,
  mute: boolean
) => {
  const timer = setTimeout(() => {
    if (!chatNotification && !chatMode && chatMessages.length > 10) {
      if (
        chatMessages[chatMessages.length - 1].chat_msg ==
          "--##--entered--##--" ||
        chatMessages[chatMessages.length - 1].chat_msg == "--##--left--##--"
      ) {
        return;
      }
      setPrivateMsgNotification(false);
      setChatNotification(true);
      if (!mute) {
        playSlideFx();
      }
    }
  }, 1000);
  return () => clearTimeout(timer);
};

module.exports.appNavigate = (
  setGigEntry: (e: number | null) => void,
  mapVisible: (e: boolean) => void,
  setAboutMode: (e: boolean) => void,
  timelineGigsMode: boolean,
  gigUpdatedMode: boolean,
  setGigUpdatedMode: (e: boolean) => void,
  timelineGalleriesMode: boolean,
  timelineCommentsMode: boolean,
  timelineMode: boolean,
  maps: boolean,
  adminControls: boolean,
  editMode: boolean,
  animeMode: boolean,
  animeMusic: boolean,
  setAnimeMusic: (e: boolean) => void,
  gigEntryMode: boolean,
  privateMode: boolean,
  setPrivateMode: (e: boolean) => void,
  chatMode: boolean,
  setChatModeClosed: (e: boolean) => void,
  chatModeClosed: boolean,
  addMode: boolean,
  gigListOpen: boolean,
  gigLocation: string,
  aboutMode: boolean,
  navigate: NavigateFunction,
  pathname: string
) => {
  setGigEntry(null);
  mapVisible(false);
  setAboutMode(false);
  if (timelineGigsMode && location.pathname !== "/timeline") {
    navigate("/timeline", {
      state: {
        previousPath: location.pathname,
        gigs: true,
        latest: gigUpdatedMode,
      },
    });
    setGigUpdatedMode(false);
  } else if (timelineGalleriesMode && location.pathname !== "/timeline") {
    navigate("/timeline", {
      state: {
        previousPath: location.pathname,
        galleries: true,
      },
    });
  } else if (timelineCommentsMode && location.pathname !== "/timeline") {
    navigate("/timeline", {
      state: {
        previousPath: location.pathname,
        comments: true,
      },
    });
  } else if (timelineMode) {
    navigate("/");
  } else if (maps) {
    if (animeMode && animeMusic) {
      setAnimeMusic(false);
      setTimeout(() => {
        navigate("/gig-list");
      }, 300);
    } else {
      navigate(-1);
    }
  } else if (adminControls) {
    navigate(-1);
  } else if (editMode) {
    navigate(-1);
  } else if (animeMode) {
    if (animeMusic) {
      setAnimeMusic(false);
    }
    setTimeout(() => {
      navigate("/gig-list");
    }, 300);
  } else if (gigEntryMode) {
    navigate("/gig-list");
  } else if (chatMode) {
    if (privateMode) {
      setPrivateMode(false);
    } else if (!privateMode && chatModeClosed) {
      setChatModeClosed(false);
      setTimeout(() => {
        navigate("/");
      }, 300);
    }
  } else if (addMode || gigListOpen || aboutMode || adminControls) {
    navigate("/");
  } else if (gigLocation !== "" && gigLocation !== pathname) {
    navigate(gigLocation.toString());
  } else {
    navigate("/");
  }
};

module.exports.chatNavigate = (
  mapVisible: (e: boolean) => void,
  setAboutMode: (e: boolean) => void,
  setChatModeClosed: (e: boolean) => void,
  chatModeClosed: boolean,
  setPrivateMode: (e: boolean) => void,
  animeMusic: boolean,
  setAnimeMusic: (e: boolean) => void,
  navigate: NavigateFunction,
  pathname: string
) => {
  mapVisible(false);
  setAboutMode(false);

  if (pathname === "/chat") {
    if (chatModeClosed) {
      setChatModeClosed(false);
      setPrivateMode(false);
    }
    setTimeout(() => {
      navigate("/");
    }, 300);
  } else if (pathname === "/gig-list-animation") {
    if (animeMusic) {
      setAnimeMusic(false);
    }
    setTimeout(() => {
      navigate("/chat");
    }, 300);
  } else {
    navigate("/chat");
  }
};

module.exports.mainPageNavigate = (
  setAboutMode: (e: boolean) => void,
  mapVisible: (e: boolean) => void,
  animeMusic: boolean,
  setAnimeMusic: (e: boolean) => void,
  setChatModeClosed: (e: boolean) => void,
  chatModeClosed: boolean,
  navigate: NavigateFunction,
  pathname: string
) => {
  mapVisible(false);
  setAboutMode(false);

  if (pathname === "/gig-list-animation") {
    if (animeMusic) {
      setAnimeMusic(false);
    }
    setTimeout(() => {
      navigate("/");
    }, 300);
  } else if (pathname === "/chat") {
    if (chatModeClosed) {
      setChatModeClosed(false);
    }
    setTimeout(() => {
      navigate("/");
    }, 300);
  } else {
    navigate("/");
  }
};
