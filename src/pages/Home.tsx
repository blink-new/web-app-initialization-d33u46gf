// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-background to-secondary">
      <h1 className="text-5xl font-bold mb-6 text-primary">Welcome to Stroflo!</h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
        The intuitive Kanban board to streamline your workflow, manage tasks efficiently, and boost your productivity. 
        Get started in seconds and bring clarity to your projects.
      </p>
      {
        user ? (
          <Link to="/boards">
            <Button size="lg" className="text-lg px-8 py-6">
              Go to Your Boards
            </Button>
          </Link>
        ) : (
          <div className="space-x-4">
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Sign Up
              </Button>
            </Link>
          </div>
        )
      }
      <div className="mt-16 text-muted-foreground">
        <p>Built with ❤️ using React, Supabase, and Tailwind CSS.</p>
      </div>
    </div>
  );
};

export default Home;
