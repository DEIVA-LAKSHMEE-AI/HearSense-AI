import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Patients from "../pages/Patients/Patients";
import Audiogram from "../pages/Audiogram/Audiogram";
import Reports from "../pages/Reports/Reports";
import Analytics from "../pages/Analytics/Analytics";
import About from "../pages/about/About";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/patients" element={<Patients />} />

        <Route path="/audiogram" element={<Audiogram />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}
