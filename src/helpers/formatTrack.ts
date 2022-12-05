interface IToPercentageFirstArg {
  currentTime: number,
  duration: number
}

interface IToCurrentTimeFirstArg {
  percentage: number,
  duration: number
}

export const formatTrackToPercentage = ({
  currentTime,
  duration
}: IToPercentageFirstArg) => {
  const percentage = (currentTime * 100) / duration

  return percentage
}

export const formatTrackToCurrentTime = ({
  percentage,
  duration
}: IToCurrentTimeFirstArg) => {
  const value = duration * (percentage / 100)

  return value
}