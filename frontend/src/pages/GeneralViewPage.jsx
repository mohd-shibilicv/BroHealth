import React from "react";
import PatientRegisterPage from "./Patients/RegisterPage";
import DoctorRegisterPage from "./Doctors/RegisterPage";
import PatientLoginPage from "./Patients/LoginPage";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Home from "./Home";
import ForgotPassword from "../components/Patients/ForgotPassword";
import AuthenticatedRoute from "../routes/AuthenticatedRoute";
import ProtectedRoute from "../routes/ProtectedRoute";
import ActivationPage from "../components/Patients/ActivationPage";
import ForgotPasswordReset from "../components/Patients/ForgotPasswordReset";
import Error404Page from "../layouts/Error404Page";

const GeneralViewPage = () => {
  return (
    <>
      <div className="main">
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
          <Route path="/activate" element={<ActivationPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default GeneralViewPage;
