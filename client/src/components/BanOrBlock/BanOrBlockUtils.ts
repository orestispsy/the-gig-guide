
module.exports.banCountDown = (
  timerRef: any,
  banTimer: number
) => {
  if (timerRef.current) {
    let counter = banTimer;

    const interval = setInterval(() => {
      if (timerRef.current) {
        counter--;
        timerRef.current.innerHTML = counter;
        if (counter < 0) {
          timerRef.current.innerHTML = "B O O M !";
        }
      }
    }, 1000);

    const clientReset = setTimeout(() => {
      location.replace("/");
    }, banTimer * 1000 + 2000);

    return () => clearTimeout(clientReset);
  } else {
    return;
  }
};
