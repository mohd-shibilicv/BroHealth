import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import PatientRegisterPage from "./pages/Patients/RegisterPage";
import DoctorRegisterPage from "./pages/Doctors/RegisterPage";
import PatientLoginPage from "./pages/Patients/LoginPage";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Patients/DashboardPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ForgotPassword from "./components/Patients/ForgotPassword";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import ActivationPage from "./components/Patients/ActivationPage";
import ForgotPasswordReset from "./components/Patients/ForgotPasswordReset";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <AuthenticatedRoute>
                <PatientRegisterPage />
              </AuthenticatedRoute>
            }
          />
          <Route path="/register-doctor" element={<DoctorRegisterPage />} />
          <Route
            path="/login"
            element={
              <AuthenticatedRoute>
                <PatientLoginPage />
              </AuthenticatedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ForgotPasswordReset />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/activate" element={<ActivationPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
