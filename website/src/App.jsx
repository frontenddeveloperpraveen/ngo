import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Login from "./component/dashboard/auth/Login";
import Donation from "./pages/Donation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Redirect home page to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/donation" element={<Donation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
