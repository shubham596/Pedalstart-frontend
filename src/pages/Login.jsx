import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import MainLayout from '../layouts/MainLayout';

const Login = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <MainLayout>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
          <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h2>
          <LoginForm redirectUrl={redirectUrl} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
