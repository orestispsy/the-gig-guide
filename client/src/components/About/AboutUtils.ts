import axios from "../../common/Axios/axios";

module.exports.axiosGetAboutComments = (
  setBlogComments: (e: any[] | undefined) => void
) => {
  axios
    .get("/get-about-comments/")
    .then(({ data }) => {
      setBlogComments(data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.deleteAboutComment = (
  e: number,
  setBlogComments: (e: any[] | undefined) => void
) => {
  axios
    .post("/delete-about-comment/", {
      id: e,
    })
    .then(({ data }) => {
      exports.axiosGetAboutComments(setBlogComments);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.sendComment = (
  comment: string | boolean,
  userName: string | boolean,
  email: string | boolean,
  website: string | boolean,
  replyText: string | boolean,
  reply: boolean,
  selectedComment: any,
  setCommentSection: (e: boolean) => void,
  setBlogComments: (e: any[] | undefined) => void,
  setComment: (e: string | boolean) => void,
  setUserName: (e: string | boolean) => void,
  setEmail: (e: string | boolean) => void,
  setWebsite: (e: string | boolean) => void,
  setReplyText: (e: string | boolean) => void,
  setReply: (e: boolean) => void
) => {
  if (comment && userName && email) {
    axios
      .post("/add-about-comment/", {
        comment: comment,
        userName: userName,
        email: email,
        website: website,
        reply: 0,
      })
      .then(({ data }) => {
        setCommentSection(true);
        exports.axiosGetAboutComments(setBlogComments);
        setComment(false);
        setUserName(false);
        setEmail(false);
        setWebsite("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (replyText && userName && email && reply) {
    axios
      .post("/add-about-comment/", {
        comment: replyText,
        userName: userName,
        email: email,
        website: website,
        reply: selectedComment,
      })
      .then(({ data }) => {
        setReply(false);
        exports.axiosGetAboutComments(setBlogComments);
        setReplyText(false);
        setUserName(false);
        setEmail(false);
        setWebsite("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
