import { useEffect } from "react";

const New = () => {

  useEffect(() => {
    document.title = `New`
  })

  return (
    <>
      <div className="flex justify-center items-center">
        <h1>New</h1>
      </div>
      <div className="btn">Button</div>
    </>
  );
};

export { New }