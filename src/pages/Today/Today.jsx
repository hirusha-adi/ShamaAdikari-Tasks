import { useEffect } from "react";

const Today = () => {

  useEffect(() => {
    document.title = `Home`
  })

  return (
    <>
      <div className="min-h-screen">
        <div className="pt-8">

          <div className="flex justify-center items-center">

            <div className="tabs tabs-box">
              <input type="radio" name="my_tabs_1" className="tab" aria-label={`Today ${new Date().getDate()} [${new Date().toLocaleString('default', { weekday: 'long' })}]`} defaultChecked />
              <input type="radio" name="my_tabs_1" className="tab" aria-label={`Tomorrow ${new Date(Date.now() + 1000 * 60 * 60 * 24).getDate()} [${new Date(Date.now() + 1000 * 60 * 60 * 24).toLocaleString('default', { weekday: 'long' })}]`} />
            </div>

          </div>


        </div>
      </div>
    </>
  );
};

export { Today }