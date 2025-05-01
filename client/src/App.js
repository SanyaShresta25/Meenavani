"use client"

/**
 * Main App Component
 * Handles routing and authentication state
 *
 * This component:
 * 1. Sets up the main application routes
 * 2. Manages authentication state
 * 3. Provides protected routes for authenticated users
 * 4. Handles theme provider for dark/light mode
 */

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"
import { ThemeProvider } from "./components/theme-provider"

// Layout Components
import { DashboardLayout } from "./components/dashboard-layout"

// Page Components
import Dashboard from "./pages/Dashboard"
import WeatherPage from "./pages/Weather"
import FishingForecastPage from "./pages/FishingForecast"
import FishClassifierPage from "./pages/FishClassifier"
import MarketPage from "./pages/Market"
import AlertsPage from "./pages/Alerts"
import FishLibraryPage from "./pages/FishLibrary"
import AnalyticsPage from "./pages/Analytics"

// Auth Components
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, loading }) => {
  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      try {
        // Set default headers for all axios requests
        axios.defaults.headers.common["x-auth-token"] = token

        // Verify token by getting user data
        await axios.get("/api/auth/user")

        setIsAuthenticated(true)
      } catch (err) {
        // If token is invalid, remove it
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["x-auth-token"]
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Set authentication state
  const setAuth = (value) => {
    setIsAuthenticated(value)

    if (!value) {
      localStorage.removeItem("token")
      delete axios.defaults.headers.common["x-auth-token"]
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                <DashboardLayout>
                  <WeatherPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fishing-forecast"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                <DashboardLayout>
                  <FishingForecastPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fish-classifier"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                <DashboardLayout>
                  <FishClassifierPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/market"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                <DashboardLayout>
                  <MarketPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                <DashboardLayout>
                  <AlertsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/fish-library"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                <DashboardLayout>
                  <FishLibraryPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                <DashboardLayout>
                  <AnalyticsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
