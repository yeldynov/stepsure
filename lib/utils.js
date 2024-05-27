import { icons } from "@/constants";

export const formatTime = (time) => {
  const getMilliseconds = `00${time % 1000}`.slice(-3, -1);
  const seconds = Math.floor(time / 1000);
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = Math.floor(time / 60000);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600000)}`.slice(-2);

  return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
};

export const getIcon = (duration) => {
  if (duration < 600000) {
    // 10 minutes in milliseconds
    return icons.time_green;
  } else if (duration >= 600000 && duration <= 1800000) {
    // 10 to 30 minutes in milliseconds
    return icons.time_blue;
  } else {
    // more than 30 minutes
    return icons.time_red;
  }
};
