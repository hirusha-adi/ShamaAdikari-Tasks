import { useEffect, useState } from "react";
import { XLg, Search as SearchIcon } from "react-bootstrap-icons";
import { DayPicker } from "react-day-picker";
import { getNaduByDate, getNaduDataByDetails, getNaduDatesByCaseNumber, getNaduDateByDataId } from "../../utils/pocketbase";
import { formatDateLK, getFormattedDayWithSuffix, getFormattedDayOfWeek } from "../../utils/dates";

const Search = () => {

  const [searchMethod, setSearchMethod] = useState("search_by_details")
  const [searchValueDate, setSearchValueDate] = useState(null)
  const [searchValueText, setSearchValueText] = useState("")
  const [results, setResults] = useState([])
  const [isManyData, setIsManyData] = useState(false)

  useEffect(() => {
    document.title = `Search`
  })

  async function handleSearch(e) {
    e.preventDefault();

    if (searchMethod === "search_by_date" && !searchValueDate) {
      return;
    } else {
      if (!searchValueText) {
        return;
      }
    }

    var results;
    var manyResults;

    if (searchMethod === "search_by_date") {
      manyResults = false;
      results = await getNaduByDate(searchValueDate);
    }

    else if (searchMethod === "search_by_details") {
      const naduUsers = await getNaduDataByDetails(searchValueText);
      if (naduUsers.length > 1) {
        manyResults = true;
      }
      results = []
      for (const user of naduUsers) {
        const naduDate = await getNaduDateByDataId(user.id);
        results.push({ naduData: user, naduDate: naduDate })
      }

      console.log(results)
    }

    else if (searchMethod === "search_by_case_number") {
      results = await getNaduDatesByCaseNumber(searchValueText);
    }

    else {
      console.log("epic bug")
    }

    setIsManyData(manyResults)
    setResults(results)
    console.log(results)
  }

  function resetSearch() {
    setSearchValueDate(null)
    setSearchValueText("")
    setResults([])
    setIsManyData(false)
  }


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
                value={searchValueText}
                onChange={(e) => setSearchValueText(e.target.value)}
              />
            )}

            <div className="flex gap-3">
              <button className="btn btn-primary inline-flex items-center" onClick={(e) => handleSearch(e)}>
                <SearchIcon className="text-lg mr-1" />
                Search
              </button>
              <button className="btn btn-error inline-flex items-center" onClick={resetSearch}>
                <XLg className="text-lg" />
              </button>
            </div>
          </div>
          <div className="container mx-auto">

            {isManyData ? (
              <div className="pt-10 px-3 flex flex-col gap-4">
                {results?.length > 0 ? results.map((item, index) => (
                  <div key={index} className="border border-gray-300 shadow-md p-4 bg-base-100 rounded-lg">
                    <div className="font-semibold text-lg">
                      Case Number: {item.naduData.case_number}
                    </div>
                    <div className="text-sm text-gray-600">
                      Details: <br /> {item.naduData.details}
                    </div>
                    <div className="mt-3">
                      <h3 className="font-semibold">Case Dates:</h3>
                      {item.naduDate?.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {item.naduDate.map((dateItem, dateIndex) => (
                            <li key={dateIndex} className="text-sm text-gray-700">
                              {`${formatDateLK(dateItem.date)} (${getFormattedDayWithSuffix(dateItem.date)}, ${getFormattedDayOfWeek(dateItem.date)})`}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No related dates available.</p>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-700">No results found!</div>
                )}
              </div>
            ) : (
              <div className="pt-10 px-3 flex flex-col gap-4">
                {results?.length > 0 ? results?.map((data, index) => {
                  return (
                    <div className="collapse bg-base-100 border-gray-300 border shadow-md" key={index}>
                      <input type="checkbox" defaultChecked />
                      <div className="collapse-title font-semibold">{data?.case_number}</div>
                      <div className="collapse-content text-sm">
                        {data?.expand?.owner_id?.details}
                      </div>
                    </div>
                  );
                }) : (
                  <>
                    <div className="text-center text-gray-700">No results found!</div>
                  </>
                )}
              </div>
            )}


          </div>
        </div>
      </div>

    </>
  );
};

export { Search }