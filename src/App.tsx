// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // useAuth removed as it's used in ProtectedRoute
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BoardsDashboard from './pages/BoardsDashboard';
import BoardDetail from './pages/BoardDetail';
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/Layout/ProtectedRoute'; // Import ProtectedRoute
import { Toaster } from './components/ui/sonner';

// Placeholder for ProtectedRoute - REMOVED
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => { ... };

function AppContent() {
  return (
    <Router>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/boards" 
            element={
              <ProtectedRoute>
                <BoardsDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/boards/:boardId" 
            element={
              <ProtectedRoute>
                <BoardDetail />
              </ProtectedRoute>
            } 
          />
          {/* Add other routes here */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster richColors />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;