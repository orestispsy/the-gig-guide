module.exports.runDotAnime = (
  loaded: boolean,
  elemRef: any,
  dotCounter: number,
  setDotCounter: (e: number) => void
) => {
  setTimeout(() => {
    if (!loaded && elemRef && elemRef.current && elemRef.current.children) {
      if (dotCounter < elemRef.current.children.length) {
        elemRef.current.children[dotCounter].style = `visibility: visible; ${
          dotCounter == 2 &&
          `  animation: blinkerLoading 1.5s infinite ease-in-out`
        }`;
        setDotCounter(dotCounter + 1);
      }
    }
  }, 500);
};

module.exports.banCountDown = (
  timerRef: any,
  playKickedOut: () => void,
  banTimer: number
) => {
  if (timerRef.current) {
    playKickedOut();
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
