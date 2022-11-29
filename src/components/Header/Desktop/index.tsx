// Components
import Left from './Left'
import Center from './Center'
import Right from './Right'

export default function Desktop () {
  return (
    <header className="flex h-14 items-center px-8">
      <Left/>
      <Center/>
      <Right/>
    </header>
  )
}