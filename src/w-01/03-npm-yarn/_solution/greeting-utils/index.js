function getExclamationMessage(message) {
  return `${message}!!!`;
}

function exclamate(message) {
  // eslint-disable-next-line no-console
  console.log(
      getExclamationMessage(message)
  );
}

function pow(message, power = 2) {
  return Math.pow(message.length, power);
}

function times(fn, n) {
  for (let i = 0; i < n; i++) {
    fn();
  }
}

module.exports = {
  exclamate: exclamate,
  getExclamationMessage: getExclamationMessage,
  pow: pow,
  times: times,
};
