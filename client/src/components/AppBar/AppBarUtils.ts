module.exports.chatNewPostNotification = (
  chatNotification: boolean,
  chatMode: boolean,
  chatMessages: any,
  setChatNotification: (e: boolean) => void,
  playSlideFx: () => void
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
      setChatNotification(true);
      playSlideFx();
    }
  }, 1000);
  return () => clearTimeout(timer);
};
