import { Route, Routes } from "react-router-dom"
import { Home, PageNotFound } from "../pages"

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export { AllRoutes }