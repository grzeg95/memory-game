export function timerFormater(elapsed: number) {

  const totalSeconds = Math.floor(elapsed / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let timeString = '';

  if (hours > 0) {
    timeString += String(hours).padStart(2, '0') + ':';
  }

  timeString += String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

  return timeString;
}
