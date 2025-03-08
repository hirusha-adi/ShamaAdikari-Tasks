import { useEffect, useState } from "react";
import { getNaduDatesTodayExpanded, getNaduDatesTomorrowExpanded } from "../../utils/pocketbase";
import { useFetchPocketbase } from "../../hooks/useFetchPocketbase";
import { getFormattedDayWithSuffix } from "../../utils/dates";

const Today = () => {
  const [selectedTab, setSelectedTab] = useState("Today");

  useEffect(() => {
    document.title = selectedTab;
  }, [selectedTab]);

  const {
    data: naduDatesData,
    // loading: naduLoading,
    // error: naduErrors
    // setData: setNaduDatesData
  } = useFetchPocketbase(
    selectedTab === "Today" ? getNaduDatesTodayExpanded : getNaduDatesTomorrowExpanded
  );

  return (
    <div className="container mx-auto min-h-screen">
      <div className="pt-8">
        <div className="flex justify-center items-center">
          <div className="tabs tabs-box">
            <input
              type="radio" name="dateSelection" value="Today" className="tab"
              aria-label={`Today ${new Date().getDate()} [${new Date().toLocaleString('default', { weekday: 'long' })}]`}
              checked={selectedTab === "Today"}
              onChange={() => setSelectedTab("Today")}
            />
            <input
              type="radio" name="dateSelection" value="Tomorrow" className="tab"
              aria-label={`Tomorrow ${new Date(Date.now() + 1000 * 60 * 60 * 24).getDate()} [${new Date(Date.now() + 1000 * 60 * 60 * 24).toLocaleString('default', { weekday: 'long' })}]`}
              checked={selectedTab === "Tomorrow"}
              onChange={() => setSelectedTab("Tomorrow")}
            />
          </div>
        </div>

        <div className="pt-8 mx-auto min-w-xs lg:min-w-md">
          <div className="text-center">
            <div className="text-5xl font-bold">
              Cases {selectedTab}
            </div>
            <div className="mt-2 text-md text-gray-700">
              {getFormattedDayWithSuffix(selectedTab)}
            </div>
          </div>
          <div className="pt-10 px-3">

            {naduDatesData?.length > 0 ? naduDatesData?.map((data, index) => {
              return (
                <div className="mt-2 collapse bg-base-100 border-gray-300 border-2" key={index}>
                  <input type="checkbox" defaultChecked />
                  <div className="collapse-title font-semibold">{data?.case_number}</div>
                  <div className="collapse-content text-sm">
                    {data?.expanded?.details}
                  </div>
                </div>
              );
            }) : "No data"}

          </div>
        </div>

      </div>
    </div>
  );
};

export { Today };
