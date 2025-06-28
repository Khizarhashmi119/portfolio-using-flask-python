import { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import AddProjectPage from "./pages/AddProjectPage/AddProjectPage";
// import DashboardPage from "./pages/Dashboard";
import Alerts from "./components/Alerts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PageLoader from "./components/shared/PageLoader";
import PageNotFoundPage from "./pages/PageNotFound";
import ProjectDetailPage from "./pages/ProjectDetail";
import ProjectsPage from "./pages/Projects";
// import UpdateProjectPage from "./pages/UpdateProjectPage/UpdateProjectPage";

import { AuthContext } from "./context/Auth";

const App = () => {
  const authContext = useContext(AuthContext);
  const [authState] = authContext || [];
  const { isLoading, isAuthenticated } = authState || {};

  return (
    <Fragment>
      {!isLoading ? (
        <Fragment>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route
              path="/login"
              element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/dashboard"
              element={
                isAuthenticated ? <DashboardPage /> : <Navigate to="/" />
              }
            /> */}
            {/* <Route path="/project/create" element={<AddProjectPage />} /> */}
            {/* <Route path="/project/edit/:id" element={<UpdateProjectPage />} /> */}
            <Route path="*" element={<PageNotFoundPage />} />
          </Routes>
          <Footer />
        </Fragment>
      ) : (
        <PageLoader />
      )}
      <Alerts />
    </Fragment>
  );
};

export default App;
