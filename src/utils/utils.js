function convertMinutes(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration) - hours * 60;
  const formated = `${hours.toString()}ч ${minutes.toString().padStart(2, '0')}м`;
  return formated;
}
export default convertMinutes;
