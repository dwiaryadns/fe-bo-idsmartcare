import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import AccessPage from "./pages/AccessPage";
import SubscribtionPage from "./pages/SubscribtionPage";
import LegalDocumentPage from "./pages/LegalDocumentPage";
import PasswordSecurityPage from "./pages/PasswordSecurityPage";
import BoInfoPage from "./pages/BoInfoPage";
import ActivityLog from "./pages/ActivityLog";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import FasyankesPage from "./pages/fasyankes/FasyankesPage";
import CreateFasyankesPage from "./pages/fasyankes/CreateFasyankesPage";
import WarehousePage from "./pages/warehouse/WarehousePage";
import { CreateWarehousePage } from "./pages/warehouse/CreateWarehousePage";
import { ProfilePage } from "./pages/ProfilePage";
import { PrivateRoute } from "./route/PrivateRoute";
import { PublicRoute } from "./route/PublicRoute";
import { VerifyOtpPage } from "./pages/auth/VerifyOtpPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import { PurchasePage } from "./pages/purchase/PurchasePage";
import { ReceiptionPage } from "./pages/receiption/ReceiptionPage";
import { InventoryPage } from "./pages/inventory/InventoryPage";
import { CreateReceiptPage } from "./pages/receiption/CreateReceiptPage";
import { CreatePurchasePage } from "./pages/purchase/CreatePurchasePage";
import { SupplierPage } from "./pages/supplier/SupplierPage";
import { CreateSupplierPage } from "./pages/supplier/CreateSupplierPage";
import { CreateBarangPage } from "./pages/inventory/CreateBarangPage";
import NotFound from "./components/404Page";
import { StockWarehousePage } from "./pages/warehouse/StockWarehousePage";
import { DistribusiPage } from "./pages/distribusi/DistribusiPage";
import { CreateDistribusiPage } from "./pages/distribusi/CreateDistribusiPage";
import { StockFasyankesPage } from "./pages/fasyankes/StockFasyankesPage";
import StockOpnamePage from "./pages/opname/StockOpnamePage";
import { ImportBarangPage } from "./pages/inventory/ImportBarangPage";
import { HistoryStockOpname } from "./pages/opname/HistoryStockOpname";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="/verify-otp/:register_id"
            element={
              <PublicRoute>
                <VerifyOtpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/bo-info"
            element={
              <PrivateRoute>
                <BoInfoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/password-security"
            element={
              <PrivateRoute>
                <PasswordSecurityPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/legal-document"
            element={
              <PrivateRoute>
                <LegalDocumentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <PrivateRoute>
                <SubscribtionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/access"
            element={
              <PrivateRoute>
                <AccessPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/warehouse"
            element={
              <PrivateRoute>
                <WarehousePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/warehouse/create"
            element={
              <PrivateRoute>
                <CreateWarehousePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/warehouse/stok"
            element={
              <PrivateRoute>
                <StockWarehousePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/fasyankes"
            element={
              <PrivateRoute>
                <FasyankesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/fasyankes/create"
            element={
              <PrivateRoute>
                <CreateFasyankesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchase"
            element={
              <PrivateRoute>
                <PurchasePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/purchase/create"
            element={
              <PrivateRoute>
                <CreatePurchasePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier"
            element={
              <PrivateRoute>
                <SupplierPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/supplier/create"
            element={
              <PrivateRoute>
                <CreateSupplierPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/good-receipt"
            element={
              <PrivateRoute>
                <ReceiptionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/good-receipt/create"
            element={
              <PrivateRoute>
                <CreateReceiptPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/distribusi"
            element={
              <PrivateRoute>
                <DistribusiPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/distribusi/create"
            element={
              <PrivateRoute>
                <CreateDistribusiPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/fasyankes/stok"
            element={
              <PrivateRoute>
                <StockFasyankesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/daftar-produk"
            element={
              <PrivateRoute>
                <InventoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/stok-opname"
            element={
              <PrivateRoute>
                <StockOpnamePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/stok-opname/histori"
            element={
              <PrivateRoute>
                <HistoryStockOpname />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/create"
            element={
              <PrivateRoute>
                <CreateBarangPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/import"
            element={
              <PrivateRoute>
                <ImportBarangPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/syarat-dan-ketentuan"
            element={
              <PrivateRoute>
                <TermsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/kebijakan-privasi"
            element={
              <PrivateRoute>
                <PrivacyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/activity-log"
            element={
              <PrivateRoute>
                <ActivityLog />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
