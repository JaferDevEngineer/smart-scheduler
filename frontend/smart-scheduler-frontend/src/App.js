import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import Dashboard from './pages/Dashboard'; 
import Register from './pages/UserRegister';
import HomePage from './pages/HomePage';
import ProviderLogInPage from './pages/ProviderLogInPage';
import ProviderRegisterPage from './pages/ProviderRegisterPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from './layout/DashboardLayout';
import AppointmentPage from './pages/AppointmentPage'
import Providers from './pages/Providers';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/login" element={<LogInPage />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/provider/login" element={<ProviderLogInPage />} />
          <Route path="/provider/register" element={<ProviderRegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AppointmentPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
           <Route
            path="/providers"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Providers />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
