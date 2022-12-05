interface IResponse {
  url: string,
  width: number,
  height: number
}

type VideoScreenshot = Promise<IResponse>

const videoScreenshot = ($video: HTMLVideoElement): VideoScreenshot => {
  if (typeof window === 'undefined') return Promise.resolve({ url: '', width: 0, height: 0 })

  const $canvas = document.createElement('canvas')

  $canvas.width = $video.videoWidth
  $canvas.height = $video.videoHeight

  const ctx = $canvas.getContext('2d')
  ctx?.drawImage($video, 0, 0, $canvas.width, $canvas.height)

  const getUrl = new Promise((resolve) => {
    $canvas.toBlob((theBlob) => {
      if (!theBlob) return resolve({
        url: '',
        width: 0,
        height: 0
      })

      const blobToURL = URL.createObjectURL(theBlob)
      resolve({
        url: blobToURL,
        width: $video.videoWidth,
        height: $video.videoHeight
      })
    })
  })

  return getUrl as VideoScreenshot
}

export default videoScreenshot