import React from "react";
import { Route, Routes } from "react-router-dom";
import Error404Page from "../layouts/Error404Page";
import DashboardPage from "./Doctors/Dashboard/DashboardPage";
import Appointments from "./Doctors/Dashboard/Appointments";
import ChatSection from "./Doctors/Dashboard/ChatSection";
import Notifications from "./Doctors/Dashboard/Notifications";
import DashboardProfile from "./Doctors/Dashboard/DashboardProfile";
import Account from "./Doctors/Dashboard/Account";
import DashboardNavbar from "../components/Doctors/DashboardNavbar";
import Patients from "./Doctors/Dashboard/Patients";
import DoctorAppointmentDetails from "../components/Appointments/DoctorAppointmentDetails";

const DoctorDashboardView = () => {
  return (
    <>
      <DashboardNavbar
        content={
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/:appointmentId" element={<DoctorAppointmentDetails />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/chat" element={<ChatSection />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<DashboardProfile />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        }
      />
    </>
  );
};

export default DoctorDashboardView;
