import { Route, Routes, Navigate } from "react-router-dom"
import { Today, PageNotFound, Login, New, Search } from "../pages"
import { isUserLoggedIn } from "../utils/pocketbase";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Main */}
        <Route path="/" element={isUserLoggedIn ? <Navigate to={"/cases"} /> : <Login />} />

        {/* protected */}
        <Route path="/cases" element={isUserLoggedIn ? <Today /> : <Navigate to={"/404"} />} />
        <Route path="/new" element={isUserLoggedIn ? <New /> : <Navigate to={"/404"} />} />
        <Route path="/search" element={isUserLoggedIn ? <Search /> : <Navigate to={"/404"} />} />

        {/* Errors */}
        <Route path="*" element={<Navigate to={"/404"} />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export { AllRoutes }