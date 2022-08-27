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
