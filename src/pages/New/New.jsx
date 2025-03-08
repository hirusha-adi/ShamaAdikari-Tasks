import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { PlusCircle, XLg, ClockHistory } from "react-bootstrap-icons";
import CreatableSelect from 'react-select/creatable';

import { useFetchPocketbase } from "../../hooks/useFetchPocketbase";
import { getSelectNaduCaseNumbers, getNaduData, newNaduData, newNaduDate, updateNaduData, getNaduDatesFromCaseNumber } from "../../utils/pocketbase";
import { getDateOrdinalSuffix } from "../../utils/dates";

const New = () => {

  // form data
  const [naduDetails, setNaduDetails] = useState("");
  const [naduCaseNumber, setNaduCaseNumber] = useState(null);
  const [naduDate, setNaduDate] = useState(new Date());

  // other stuff
  const [isNewCase, setIsNewCase] = useState(null);
  const [existingNaduData, setExistingNaduData] = useState(null);
  const [existingNaduDates, setExistingNaduDates] = useState(null);


  useEffect(() => {
    document.title = `New`
  })


  async function handleSubmit(e) {
    e.preventDefault();

    if (isNewCase) {
      await newNaduData(naduCaseNumber.value, naduDetails);
      await newNaduDate(naduCaseNumber.value, naduDate);
    }
    else {
      if (!existingNaduData) {
        alert("big bug!")
      }
      await newNaduDate(naduCaseNumber.value, naduDate);
      await updateNaduData(existingNaduData.id, naduDetails);
    }

  }

  async function resetForms() {
    setNaduCaseNumber(null);
    setNaduDetails("");
    setNaduDate(new Date());
    setIsNewCase(null);
    setExistingNaduData(null);
    setExistingNaduDates(null);
  }

  const {
    data: formListCaseNumbersData,
    formListCaseNumbersLoading,
    formListCaseNumbersError,
  } = useFetchPocketbase(getSelectNaduCaseNumbers);

  useEffect(() => {
    async function runOnChange() {
      if (!naduCaseNumber) {
        setNaduDetails("");
        return "";
      }

      console.log("naduCaseNumber: ", naduCaseNumber)

      if (naduCaseNumber?.__isNew__) {
        setIsNewCase(true);
        setNaduDetails("");
      }
      else {
        setIsNewCase(false);
        const naduDetails = await getNaduData(naduCaseNumber.value);
        console.log(naduDetails)
        setExistingNaduData(naduDetails);
        const naduDates = await getNaduDatesFromCaseNumber(naduCaseNumber.value);
        console.log(naduDates)
        setExistingNaduDates(naduDates);
        setNaduDetails(naduDetails?.details);
      }

    }

    runOnChange()

  }, [naduCaseNumber]);

  return (
    <>
      <div className="">
        <div className="container mx-auto min-h-screen">
          <div className="px-12 pt-8 flex text-center justify-center">
            <h1 className="text-3xl font-bold">Create new Record</h1>
          </div>
          <div className="px-12 pt-12 pb-16 flex justify-center">
            <div className="flex flex-row gap-6">
              <div>
                {/* maye change this later: https://daisyui.com/components/calendar/#react-day-picker-example */}
                <DayPicker className="react-day-picker" mode="single" selected={naduDate} onSelect={setNaduDate} />
              </div>
              <div className="flex flex-col gap-4 w-md">
                <div>
                  <label className="label">Case Number</label>
                  {formListCaseNumbersLoading ? (
                    <p>Loading...</p>
                  ) : (
                    formListCaseNumbersError ? <p>Error: {formListCaseNumbersError}</p> :
                      (
                        <CreatableSelect
                          // isClearable // because i want to clear everything
                          isSearchable
                          placeholder="Select..."
                          options={formListCaseNumbersData}
                          value={naduCaseNumber}
                          onChange={(e) => setNaduCaseNumber(e)}
                        />
                      )
                  )}

                </div>
                <div>
                  <label className="label">Details</label>
                  <textarea
                    className="textarea textarea-bordered w-full h-48"
                    value={naduDetails}
                    onChange={(e) => setNaduDetails(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 btn btn-primary flex items-center justify-center" onClick={handleSubmit}>
                    <PlusCircle className="text-lg" /> Enter
                  </button>
                  <button className="btn btn-error flex items-center justify-center" onClick={resetForms}>
                    <XLg className="text-lg" /> Clear
                  </button>
                </div>

              </div>
            </div>
          </div>

          <div className="">
            {isNewCase ? (
              <>
                <div className="flex justify-center items-center">
                  <div className="text-xl font-bold">New entry! No previous days recorded!</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-xl font-bold">
                    <ClockHistory className="text-2xl inline-block mr-2" /> Previous dates:
                  </div>
                  <div>

                    <ul className="list bg-base-100 rounded-box shadow-md">
                      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">{existingNaduDates?.length} hearings</li>
                      {existingNaduDates?.map((date, index) => {
                        const dateObj = new Date(date.date);
                        const formattedDate = dateObj.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
                        const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" }); // Get day name

                        const dayOfMonth = dateObj.getDate();
                        const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
                        const formattedDateWithSuffix = `${getDateOrdinalSuffix(dayOfMonth)} of ${monthName} ${dateObj.getFullYear()}`;

                        return (
                          <li key={index} className="list-row">
                            <div>
                              <div>{formattedDate} </div>
                              <div className="text-xs font-semibold opacity-60">{formattedDateWithSuffix} ({dayOfWeek})</div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <ul className="timeline timeline-vertical">
                      {existingNaduDates?.map((date, index) => {
                        const dateObj = new Date(date.date);
                        const formattedDate = dateObj.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
                        const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" }); // Get day name

                        const dayOfMonth = dateObj.getDate();
                        const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
                        const formattedDateWithSuffix = `${getDateOrdinalSuffix(dayOfMonth)} of ${monthName} ${dateObj.getFullYear()}`;

                        return (
                          <li key={index}>
                            <hr />
                            <div className="timeline-middle">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                  clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="timeline-start timeline-box">{formattedDate}</div>
                            <div className="timeline-end timeline-box">{formattedDateWithSuffix} ({dayOfWeek})</div>
                            <hr />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </>

            )}
          </div>


        </div>
      </div>
    </>
  );
};

export { New }