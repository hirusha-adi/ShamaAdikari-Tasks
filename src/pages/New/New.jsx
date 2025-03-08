import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { PlusCircle, XLg } from "react-bootstrap-icons";
import CreatableSelect from 'react-select/creatable';

import { useFetchPocketbase } from "../../hooks/useFetchPocketbase";
import { getSelectNaduCaseNumbers, getNaduData, newNaduData, newNaduDate, updateNaduData } from "../../utils/pocketbase";

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
        setNaduDetails(naduDetails?.details);
      }

    }
    runOnChange()

  }, [naduCaseNumber]);

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto min-h-screen">
          <div className="px-12 pt-8 flex text-center justify-center">
            <h1 className="text-3xl font-bold">New</h1>
          </div>
          <div className="px-12 pt-12 flex justify-center">
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
                          isClearable
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
            {isNewCase && (
              "New Case"
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export { New }