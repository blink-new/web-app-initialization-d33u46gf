// src/components/Layout/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { LogOut, LayoutDashboard, UserCircle, Loader2 } from 'lucide-react'; // Icons

const Navbar: React.FC = () => {
  const { user, profile, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logout();
    if (error) {
      console.error('Logout failed:', error.message);
      // Potentially show a toast notification for error
    } else {
      navigate('/login');
      // Potentially show a toast notification for success
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Stroflo</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : user ? (
              <>
                <Link to="/boards">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                    <LayoutDashboard className="h-5 w-5 mr-2" />
                    Boards
                  </Button>
                </Link>
                <span className="text-sm text-muted-foreground">
                  {profile?.name || user.email}
                </span>
                <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
