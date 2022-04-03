module.exports.banCountDown = (
  banTimer: number,
  setSecondsLeft: (e: any) => void
) => {
  let counter = Math.round(banTimer);

  const interval = setInterval(() => {
    if (counter >= 1) {
      counter--;
      setSecondsLeft(counter);
    }
  }, 1000);

  return () => clearTimeout(interval);
};
