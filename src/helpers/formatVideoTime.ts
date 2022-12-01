const formatVideoTime = (time: number) => {
  const floor = Math.floor(time)

  const minutes = Math.floor(floor / 60)
  const seconds = ('0' + floor % 60).slice(-2)

  return `${minutes}:${seconds}`
}

export default formatVideoTime