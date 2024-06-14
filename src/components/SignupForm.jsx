import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields('signup', formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: '/auth/signup', method: 'post', data: formData };
    fetchData(config).then(() => {
      navigate('/login');
    });
  };

  const fieldError = field => (
    <p className={`mt-1 text-red-500 text-sm ${formErrors[field] ? 'block' : 'hidden'}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
      <form className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Sign Up</h2>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 font-semibold mb-2'>
                Name
              
              </label>
              <Input
                type='text'
                name='name'
                id='name'
                value={formData.name}
                placeholder='Your name'
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              {fieldError('name')}
            </div>

            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
                Email
               
              </label>
              <Input
                type='email'
                name='email'
                id='email'
                value={formData.email}
                placeholder='youremail@domain.com'
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              {fieldError('email')}
            </div>

            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
                Password
              
              </label>
              <Input
                type='password'
                name='password'
                id='password'
                value={formData.password}
                placeholder='Your password..'
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              {fieldError('password')}
            </div>

            <button
              className='w-full bg-purple-600 text-white p-2 rounded-md font-medium hover:bg-purple-700 transition duration-200'
              onClick={handleSubmit}
            >
              Sign Up
            </button>

            <div className='text-center pt-4'>
              <Link to='/login' className='text-purple-500 hover:underline'>
                Already have an account? Login here
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
