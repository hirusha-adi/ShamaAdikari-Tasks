import { Route, Routes, Navigate } from "react-router-dom"
import { Home, PageNotFound, Login } from "../pages"
import { isUserLoggedIn } from "../utils/pocketbase";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        {/* Main */}
        <Route path="/" element={isUserLoggedIn ? <Navigate to={"/today"} /> : <Login />} />

        {/* protected */}
        <Route path="/today" element={isUserLoggedIn ? <Home /> : <Navigate to={"/404"} />} />

        {/* Errors */}
        <Route path="*" element={<Navigate to={"/404"} />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export { AllRoutes }