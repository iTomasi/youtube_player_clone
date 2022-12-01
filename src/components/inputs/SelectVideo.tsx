import type { ChangeEvent } from 'react'

interface Props {
  onFile: (url: string) => void
}

export default function SelectVideo ({ onFile }: Props) {
  const handleFile = (file: File) => {
    if (!file.type.includes('video')) {
      console.log('the file should be a video')
      return
    }

    const blobToURL = URL.createObjectURL(file)

    onFile(blobToURL)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    handleFile(files[0])

    e.target.value = ''
  }

  return (
    <div className="border border-dashed border-gray-300 flex justify-center items-center h-[30rem]">
      <label>
        Click
        <input
          className="hidden"
          type="file"
          onChange={handleOnChange}
          accept="video/*"
        />
      </label>
    </div>
  )
}