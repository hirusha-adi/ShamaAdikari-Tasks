import { useEffect } from "react";

const Today = () => {

  useEffect(() => {
    document.title = `Home`
  })

  return (
    <>
      <div className="flex justify-center items-center">
        <h1>උසාවි දින පොත</h1>
      </div>
      <div className="btn">Button</div>
    </>
  );
};

export { Today }