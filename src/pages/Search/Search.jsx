import { useEffect, useState } from "react";
import { XLg, Search as SearchIcon } from "react-bootstrap-icons";
import { DayPicker } from "react-day-picker";

const Search = () => {

  const [searchMethod, setSearchMethod] = useState("search_by_details")
  const [searchValueDate, setSearchValueDate] = useState(null)

  useEffect(() => {
    document.title = `Search`
  })

  return (
    <>
      <div className="min-h-screen">
        <div className="p-6">
          <div className="text-center text-4xl font-bold mb-8">
            <h1>Search Cases</h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-3">
            <select
              className="select w-full sm:w-auto"
              value={searchMethod}
              onChange={(e) => setSearchMethod(e.target.value)}
            >
              <option value="search_by_details">by Details</option>
              <option value="search_by_date">by Date</option>
              <option value="search_by_case_number">by Case Number</option>
            </select>

            {searchMethod === "search_by_date" ? (
              <div className="">
                <button popoverTarget="rdp-popover" className="input input-border w-full sm:w-72" style={{ anchorName: "--rdp" }}>
                  {searchValueDate ? searchValueDate.toLocaleDateString() : "Select a date"}
                </button>
                <div popover="auto" id="rdp-popover" className="dropdown shadow-2xl" style={{ positionAnchor: "--rdp" }}>
                  <DayPicker className="react-day-picker" mode="single" selected={searchValueDate} onSelect={setSearchValueDate} />
                </div>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Type here..."
                className="input w-full sm:w-72"
              />
            )}

            <div className="flex gap-3">
              <button className="btn btn-primary inline-flex items-center">
                <SearchIcon className="text-lg mr-1" />
                Search
              </button>
              <button className="btn btn-error inline-flex items-center">
                <XLg className="text-lg" />
              </button>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export { Search }