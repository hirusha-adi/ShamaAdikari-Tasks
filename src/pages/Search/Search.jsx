import { useEffect } from "react";

const Search = () => {

  useEffect(() => {
    document.title = `Search`
  })

  return (
    <>
      <div className="flex justify-center items-center">
        <h1>Search</h1>
      </div>
      <div className="btn">Button</div>
    </>
  );
};

export { Search }