import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { useAuth } from './context/useAuth'
import ComplaintPage from './pages/ComplaintPage'
import DashboardPage from './pages/DashboardPage'
import FakeCallPage from './pages/FakeCallPage'
import HelplinesPage from './pages/HelplinesPage'
import LiveTrackingPage from './pages/LiveTrackingPage'
import LoginPage from './pages/LoginPage'
import OtpVerificationPage from './pages/OtpVerificationPage'
import PoliceDashboardPage from './pages/PoliceDashboardPage'
import RegisterPage from './pages/RegisterPage'
import SafetyTipsPage from './pages/SafetyTipsPage'
import TrustedContactsPage from './pages/TrustedContactsPage'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function App() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route path="/verify-otp" element={<OtpVerificationPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="tracking" element={<LiveTrackingPage />} />
        <Route path="contacts" element={<TrustedContactsPage />} />
        <Route path="helplines" element={<HelplinesPage />} />
        <Route path="complaints" element={<ComplaintPage />} />
        <Route path="tips" element={<SafetyTipsPage />} />
        <Route path="fake-call" element={<FakeCallPage />} />
        <Route path="police-dashboard" element={<PoliceDashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
    </Routes>
  )
}

export default App
