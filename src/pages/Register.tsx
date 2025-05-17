// src/pages/Register.tsx
import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-secondary">
      <RegisterForm />
    </div>
  );
};

export default Register;
