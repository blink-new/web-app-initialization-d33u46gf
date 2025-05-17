// src/pages/Login.tsx
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-secondary">
      <LoginForm />
    </div>
  );
};

export default Login;
