import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    document.title = `Home`
  })

  return (
    <>
      <div className="flex justify-center items-center">
        <h1>Usawi Dina Potha</h1>
      </div>
      <div className="btn">Button</div>
    </>
  );
};

export { Home }