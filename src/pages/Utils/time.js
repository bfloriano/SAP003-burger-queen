const time = (item) => {
  let seconds;

  if (((item.timeDateS)) === ((item.timeDateD))) {
    seconds = (item.timeDoneM - item.timeSendM) / 1000
  }
  else {
    seconds = ((item.timeDoneM + 86400) - item.timeSendM) / 1000
  }

  let horas = Math.floor(seconds / (60 * 60));
  let minutos = Math.floor((seconds % (60 * 60)) / 60);
  let segundos = Math.ceil((seconds % (60 * 60)) % 60);

  return [horas + ' h, ', minutos + ' m e ', segundos + ' s.']
}

export default time