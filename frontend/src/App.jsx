import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Patients/DashboardPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ForgotPassword from "./components/Patients/ForgotPassword";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";

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
                <RegisterPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthenticatedRoute>
                <LoginPage />
              </AuthenticatedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Other routes */}
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
