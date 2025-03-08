import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const New = () => {

  const [naduDetails, setNaduDetails] = useState("");
  const [naduCaseNumber, setNaduCaseNumber] = useState("");
  const [naduDate, setNaduDate] = useState(new Date());

  useEffect(() => {
    document.title = `New`
  })

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto min-h-screen">
          <div className="px-12 pt-8 flex text-center justify-center">
            <h1 className="text-3xl font-bold">New</h1>
          </div>
          <div className="px-12 pt-12">
            <div className="flex flex-row gap-6">
              <div>
                {/* maye change this later: https://daisyui.com/components/calendar/#react-day-picker-example */}
                <DayPicker className="react-day-picker" mode="single" selected={naduDate} onSelect={setNaduDate} />
              </div>
              <div className="flex flex-col">
                <div>
                  <label className="label">Case Number</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={naduCaseNumber}
                    onChange={(e) => setNaduCaseNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">Details</label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={naduDetails}
                    onChange={(e) => setNaduDetails(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export { New }