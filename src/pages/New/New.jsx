import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { PlusCircle, XLg, ClockHistory } from "react-bootstrap-icons";
import CreatableSelect from 'react-select/creatable';

import { useFetchPocketbase } from "../../hooks/useFetchPocketbase";
import { getSelectNaduCaseNumbers, getNaduData, newNaduData, newNaduDate, updateNaduData, getNaduDatesFromCaseNumber } from "../../utils/pocketbase";
import { getDateOrdinalSuffix } from "../../utils/dates";
import { showError, showLoad, showSuccess } from "../../utils/alerts";
import { toastConfig } from "../../utils/consts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    document.title = `New Record`
  })


  async function handleSubmit(e) {
    e.preventDefault();
    const loadingPopup = showLoad();

    try {
      if (isNewCase) {
        const resNaduData = await newNaduData(naduCaseNumber.value, naduDetails);
        if (!resNaduData) {
          throw new Error("BIG ERROR! Failed to create new Nadu Data");
        }

        const resNaduDate = await newNaduDate(naduCaseNumber.value, naduDate, resNaduData.id);
        if (!resNaduDate) {
          throw new Error("Failed to create new Nadu Date");
        }

        loadingPopup.close()
        showSuccess();
      }
      else {
        if (!existingNaduData) {
          throw new Error("BIG ERROR! Failed to get existing Nadu Data");
        }

        const resNaduDate = await newNaduDate(naduCaseNumber.value, naduDate, existingNaduData.id);
        if (!resNaduDate) {
          throw new Error("Failed to create new Nadu Date");
        }

        if (!(existingNaduData.details === naduDetails)) {
          // only update if detailed have changed
          const resNaduData = await updateNaduData(existingNaduData.id, naduDetails);
          if (!resNaduData) {
            throw new Error("Failed to update existing Nadu Data");
          }
        }

        loadingPopup.close()
      }
    } catch (error) {
      loadingPopup.close()
      showError(error?.message || error);
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
        setExistingNaduData(naduDetails);
        setNaduDetails(naduDetails?.details);

        const naduDates = await getNaduDatesFromCaseNumber(naduCaseNumber.value);
        setExistingNaduDates(naduDates);
      }

    }

    runOnChange()

  }, [naduCaseNumber]);

  return (
    <>
      <div className="">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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

          <div className="pb-16">
            {isNewCase ? (
              <>
                <div className="flex justify-center items-center">
                  <div className="text-xl font-bold">New entry! No previous days recorded!</div>
                </div>
              </>
            ) : (
              existingNaduDates?.length > 0 ?
                <>
                  <div>
                    <div className="text-xl font-bold">
                      <ClockHistory className="text-2xl inline-block mr-2" /> {existingNaduDates?.length} Previous dates:
                    </div>
                    <div>
                      <ul className="list bg-base-100 rounded-box shadow-md">
                        <div className="px-2 pt-4">
                          {existingNaduDates?.map((date, index) => {
                            const dateObj = new Date(date.date);
                            const formattedDate = dateObj.toLocaleDateString("en-US"); // Format as DD/MM/YYYY
                            const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" }); // Get day name

                            const dayOfMonth = dateObj.getDate();
                            const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
                            const formattedDateWithSuffix = `${getDateOrdinalSuffix(dayOfMonth)} of ${monthName} ${dateObj.getFullYear()}`;

                            return (
                              <li key={index} className="list-row">
                                <div>
                                  <div>{formattedDate}</div>
                                  <div className="text-xs font-semibold opacity-60">{formattedDateWithSuffix} ({dayOfWeek})</div>
                                </div>
                              </li>
                            );
                          })}
                        </div>
                      </ul>
                    </div>
                  </div>
                </> : (
                  <>
                    <div className="flex justify-center items-center">
                      <div className="text-xl font-bold">No previous days recorded!</div>
                    </div>
                  </>
                )
            )}
          </div>


        </div>
      </div>
    </>
  );
};

export { New }