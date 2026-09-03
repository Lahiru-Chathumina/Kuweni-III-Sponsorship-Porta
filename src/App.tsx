import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SponsorshipLots from "./pages/SponsorshipLots";
import LotDetails from "./pages/LotDetails";
import LiveBidding from "./pages/LiveBidding";
import BidHistory from "./pages/BidHistory";
import AntiSniping from "./pages/AntiSniping";
import ExecutivePreviewRoom from "./pages/ExecutivePreviewRoom";
import AuditLog from "./pages/AuditLog";
import WinningBid from "./pages/WinningBid";
import TermSheet from "./pages/TermSheet";
import Notifications from "./pages/Notifications";
import SystemArchitecture from "./pages/SystemArchitecture";
import Roadmap from "./pages/Roadmap";
import FuturePayment from "./pages/FuturePayment";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CorporateVerification from "./pages/admin/CorporateVerification";
import LotManagement from "./pages/admin/LotManagement";

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, isAdmin } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/architecture" element={<SystemArchitecture />} />
      <Route path="/roadmap" element={<Roadmap />} />

      {/* Protected buyer routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/lots" element={<ProtectedRoute><SponsorshipLots /></ProtectedRoute>} />
      <Route path="/lots/:id" element={<ProtectedRoute><LotDetails /></ProtectedRoute>} />
      <Route path="/lots/:id/bid" element={<ProtectedRoute><LiveBidding /></ProtectedRoute>} />
      <Route path="/bid-history" element={<ProtectedRoute><BidHistory /></ProtectedRoute>} />
      <Route path="/my-bids" element={<ProtectedRoute><BidHistory /></ProtectedRoute>} />
      <Route path="/anti-sniping" element={<ProtectedRoute><AntiSniping /></ProtectedRoute>} />
      <Route path="/preview-room" element={<ProtectedRoute><ExecutivePreviewRoom /></ProtectedRoute>} />
      <Route path="/audit-log" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
      <Route path="/winning-bids" element={<ProtectedRoute><WinningBid /></ProtectedRoute>} />
      <Route path="/contracts" element={<ProtectedRoute><TermSheet /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/future-payment" element={<ProtectedRoute><FuturePayment /></ProtectedRoute>} />

      {/* Admin routes */}
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/companies" element={<ProtectedRoute adminOnly><CorporateVerification /></ProtectedRoute>} />
      <Route path="/admin/verification" element={<ProtectedRoute adminOnly><CorporateVerification /></ProtectedRoute>} />
      <Route path="/admin/lots" element={<ProtectedRoute adminOnly><LotManagement /></ProtectedRoute>} />
      <Route path="/admin/auctions" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/bids" element={<ProtectedRoute adminOnly><BidHistory /></ProtectedRoute>} />
      <Route path="/admin/preview-room" element={<ProtectedRoute adminOnly><ExecutivePreviewRoom /></ProtectedRoute>} />
      <Route path="/admin/contracts" element={<ProtectedRoute adminOnly><TermSheet /></ProtectedRoute>} />
      <Route path="/admin/audit" element={<ProtectedRoute adminOnly><AuditLog /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
