import { useEffect, useState } from "react";

const Today = () => {
  const [selectedTab, setSelectedTab] = useState("today");

  useEffect(() => {
    document.title = selectedTab === "today" ? "Today" : "Tomorrow";
  }, [selectedTab]);

  return (
    <div className="min-h-screen">
      <div className="pt-8">
        <div className="flex justify-center items-center">
          <div className="tabs tabs-box">
            <input
              type="radio" name="dateSelection" value="today" className="tab"
              aria-label={`Today ${new Date().getDate()} [${new Date().toLocaleString('default', { weekday: 'long' })}]`}
              checked={selectedTab === "today"}
              onChange={() => setSelectedTab("today")}
            />
            <input
              type="radio" name="dateSelection" value="tomorrow" className="tab"
              aria-label={`Tomorrow ${new Date(Date.now() + 1000 * 60 * 60 * 24).getDate()} [${new Date(Date.now() + 1000 * 60 * 60 * 24).toLocaleString('default', { weekday: 'long' })}]`}
              checked={selectedTab === "tomorrow"}
              onChange={() => setSelectedTab("tomorrow")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Today };
