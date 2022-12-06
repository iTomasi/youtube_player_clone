import { SearchIcon } from 'components/icons'

export default function Search () {
  return (
    <form className="bg-[#121212] border border-[#303030] rounded-full flex overflow-hidden">
      <input
        className="w-full bg-transparent px-4 py-2"
        type="text"
        placeholder="Search"
      />

      <button className="bg-[#222222] min-w-[4rem] max-w-[4rem] flex justify-center items-center border-l border-[#303030]">
        <SearchIcon
          className="w-6 h-6 text-gray-300"
        />
      </button>
    </form>
  )
}