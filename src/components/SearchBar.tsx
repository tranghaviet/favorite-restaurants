'use client';

interface SearchBarProps {
  onChange: (value: string) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <form className="flex items-center w-full mx-auto">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full border border-[#F9FAFB] rounded-md shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 text-[#98A2B3] block w-full ps-10 p-2.5"
          placeholder="맛집 이름을 검색해보세요"
          required
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </form>
    // <div className="relative w-full mb-4">
    //   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    //     <SearchIcon className="w-5 h-5 text-gray-500" />
    //   </div>
    //   <input
    //     type="text"
    //     className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    //     placeholder="Search"
    //     value={value}
    //     onChange={(e) => onChange(e.target.value)}
    //   />
    // </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    // <svg
    //         className="w-4 h-4 text-gray-500 dark:text-gray-400"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 20 20"
    //       >
    //         <path
    //           stroke="currentColor"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    //         />
    //       </svg>
  );
}
