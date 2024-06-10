import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import AccessPage from "./pages/AccessPage";
import SubscribtionPage from "./pages/SubscribtionPage";
import LegalDocumentPage from "./pages/LegalDocumentPage";
import PasswordSecurityPage from "./pages/PasswordSecurityPage";
import BoInfoPage from "./pages/BoInfoPage";
import WarehousePage from "./pages/WarehousePage";
import ActivityLog from "./pages/ActivityLog";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import FasyankesPage from "./pages/fasyankes/FasyankesPage";
import CreateFasyankesPage from "./pages/fasyankes/CreateFasyankesPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bo-info" element={<BoInfoPage />} />
          <Route path="/password-security" element={<PasswordSecurityPage />} />
          <Route path="/legal-document" element={<LegalDocumentPage />} />
          <Route path="/subscribtion" element={<SubscribtionPage />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/warehouse" element={<WarehousePage />} />
          <Route path="/fasyankes" element={<FasyankesPage />} />
          <Route path="/fasyankes/create" element={<CreateFasyankesPage />} />
          <Route path="/activity-log" element={<ActivityLog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
