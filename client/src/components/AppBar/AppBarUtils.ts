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
