// src/App.jsx
// Router shell — each page is a route for performance
// Placeholder pages will be replaced module by module

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { useApp } from '@/context/AppContext'
import { Navbar, Sidebar } from '@/components/layout'
import SplashScreen from '@/pages/SplashScreen'
import RoleSelection from '@/pages/RoleSelection'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import DoctorDirectory from '@/pages/DoctorDirectory'
import DoctorProfile from '@/pages/DoctorProfile'
import BookAppointment from '@/pages/BookAppointment'
import AISymptomChecker from '@/pages/AISymptomChecker'
import VideoConsultation from '@/pages/VideoConsultation'
import ConsultationsList from '@/pages/ConsultationsList'
import Prescription from '@/pages/Prescription'
import PrescriptionsList from '@/pages/PrescriptionsList'
import Profile from '@/pages/Profile'
import Medicines from '@/pages/Medicines'

// ASHA Pages
import AshaDashboard from '@/pages/asha/AshaDashboard'
import VillagerManagement from '@/pages/asha/VillagerManagement'
import VillagerProfile from '@/pages/asha/VillagerProfile'
import AshaVisits from '@/pages/asha/Visits'
import AshaReports from '@/pages/asha/Reports'
import AshaProfile from '@/pages/asha/AshaProfile'

// Pages — will be replaced with real implementations
const PlaceholderPage = ({ name }) => (
  <PageWrapper className="flex items-center justify-center min-h-[80vh]">
    <div className="text-center">
      <div className="w-16 h-16 bg-brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <span className="text-white font-display font-bold text-xl">SS</span>
      </div>
      <h1 className="text-2xl font-display font-bold text-brand-700 mb-2">Sehat Saathi</h1>
      <p className="text-brand-500 font-medium">{name}</p>
      <p className="text-[var(--color-muted)] text-sm mt-1">Module coming soon...</p>
    </div>
  </PageWrapper>
)

// ── Protected Route ───────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useApp()
  if (!isAuthenticated) return <Navigate to={ROUTES.ROLE_SELECTION} replace />
  return children
}

// ── App ───────────────────────────────────────────────────────────────────────
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.SPLASH} element={<SplashScreen />} />
        <Route path={ROUTES.ROLE_SELECTION} element={<RoleSelection />} />
        <Route path={ROUTES.LOGIN}  element={<Login />} />

        {/* Protected routes */}
        <Route path={ROUTES.DASHBOARD} element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path={ROUTES.DOCTOR_DIRECTORY} element={
          <ProtectedRoute><DoctorDirectory /></ProtectedRoute>
        } />
        <Route path={ROUTES.DOCTOR_PROFILE} element={
          <ProtectedRoute><DoctorProfile /></ProtectedRoute>
        } />
        <Route path={ROUTES.BOOK_APPOINTMENT} element={
          <ProtectedRoute><BookAppointment /></ProtectedRoute>
        } />
        <Route path={ROUTES.AI_SYMPTOM_CHECKER} element={
          <ProtectedRoute><AISymptomChecker /></ProtectedRoute>
        } />
        <Route path={ROUTES.VIDEO_CONSULTATION} element={
          <ProtectedRoute><VideoConsultation /></ProtectedRoute>
        } />
        <Route path={ROUTES.PRESCRIPTION} element={
          <ProtectedRoute><Prescription /></ProtectedRoute>
        } />
        <Route path="/consultations-list" element={
          <ProtectedRoute><ConsultationsList /></ProtectedRoute>
        } />
        <Route path="/prescriptions-list" element={
          <ProtectedRoute><PrescriptionsList /></ProtectedRoute>
        } />
        <Route path={ROUTES.PROFILE} element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
        <Route path={ROUTES.MEDICINES} element={
          <ProtectedRoute><Medicines /></ProtectedRoute>
        } />

        {/* ASHA Protected routes */}
        <Route path={ROUTES.ASHA_DASHBOARD} element={
          <ProtectedRoute><AshaDashboard /></ProtectedRoute>
        } />
        <Route path={ROUTES.ASHA_VILLAGERS} element={
          <ProtectedRoute><VillagerManagement /></ProtectedRoute>
        } />
        <Route path={ROUTES.ASHA_VILLAGER_PROFILE} element={
          <ProtectedRoute><VillagerProfile /></ProtectedRoute>
        } />
        <Route path={ROUTES.ASHA_VISITS} element={
          <ProtectedRoute><AshaVisits /></ProtectedRoute>
        } />
        <Route path={ROUTES.ASHA_REPORTS} element={
          <ProtectedRoute><AshaReports /></ProtectedRoute>
        } />
        <Route path={ROUTES.ASHA_INSIGHTS} element={
          <ProtectedRoute><AISymptomChecker /></ProtectedRoute> // Reuse AI Checker for ASHA
        } />
        <Route path={ROUTES.ASHA_PROFILE} element={
          <ProtectedRoute><AshaProfile /></ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.SPLASH} replace />} />
      </Routes>

      {/* Global bottom navigation — renders on all non-excluded routes */}
      <Navbar />
      <Sidebar />
    </BrowserRouter>
  )
}

export default App

