import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes, useLocation } from "react-router-dom";
import GeneralViewPage from "./pages/GeneralViewPage";
import PatientDashboardView from "./pages/PatientDashboardView";
import ProtectedPatientRoutes from "./routes/ProtectedPatientRoutes";
import ProtectedDoctorRoutes from "./routes/ProtectedDoctorRoutes";
import DoctorDashboardView from "./pages/DoctorDashboardView";
import ProtectedAdminRoutes from "./routes/ProtectedAdminRoutes";
import AdminDashboardView from "./pages/AdminDashboardView";
import LoginForm from "./components/Admin/LoginForm";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/*" element={<GeneralViewPage />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedPatientRoutes>
                <PatientDashboardView />
              </ProtectedPatientRoutes>
            }
          />
          <Route
            path="/doctor-dashboard/*"
            element={
              <ProtectedDoctorRoutes>
                <DoctorDashboardView />
              </ProtectedDoctorRoutes>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoutes>
                <AdminDashboardView />
              </ProtectedAdminRoutes>
            }
          />
          <Route path="/admin-login" element={<LoginForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
