

export const toTime = (timestamp: number) => {
  const date = new Date(timestamp);
  let hours: any = date.getHours();
  let minutes: any = date.getMinutes();

  if(hours < 10) hours = `0${hours}`;
  if(minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
}