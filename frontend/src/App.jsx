import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes, useLocation } from "react-router-dom";
import GeneralViewPage from "./pages/GeneralViewPage";
import PatientDashboardView from "./pages/PatientDashboardView";


function App() {
  const location = useLocation();

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/*" element={<GeneralViewPage />} />
          <Route  path="/dashboard/*" element={<PatientDashboardView />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
