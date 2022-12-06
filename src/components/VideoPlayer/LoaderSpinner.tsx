const borderClassName = '8px solid '
const borderColor = '#FFFFFF'

export default function LoaderSpinner () {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div
        className="w-20 h-20 rounded-full animate-spin"
        style={{
          borderTop: borderClassName + borderColor,
          borderRight: borderClassName + borderColor,
          borderBottom: borderClassName + borderColor,
          borderLeft: borderClassName + 'transparent'
        }}
      >
      </div>
    </div>
  )
}