import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const New = () => {

  const [naduDetails, setNaduDetails] = useState("");
  const [naduCaseNumber, setNaduCaseNumber] = useState("");
  const [naduDate, setNaduDate] = useState(null);

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
          <button popovertarget="rdp-popover" className="input input-border" style={{ anchorName: "--rdp" }}>
            {naduDate ? naduDate.toLocaleDateString() : "Pick a date"}
          </button>
          <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" }}>
            <DayPicker className="react-day-picker" mode="single" selected={naduDate} onSelect={setNaduDate} />
          </div>

        </div>
      </div>
    </>
  );
};

export { New }