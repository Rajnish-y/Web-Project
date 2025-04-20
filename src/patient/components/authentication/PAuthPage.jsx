import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const PAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Email and password are required.');
      setIsLoading(false);
      return;
    }

    if (!isLogin && !name) {
      setError('Full name is required for registration.');
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting patient auth with:", email, password);

      if (isLogin) {
        // Login with Firebase Auth only (no Firestore)
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log('Patient login successful:', userCredential.user);
        navigate("/pdashboard");
      } else {
        // Sign-up with Firebase Auth only (no Firestore for now)
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log('Patient registration successful:', userCredential.user);
        alert('Registration successful!');
        navigate("/pdashboard");
      }
    } catch (error) {
      console.error("Auth error:", error.code, error.message);

      // Handle Firebase specific errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(error.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-blue-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Activity className="h-8 w-8 text-blue-700 mr-2" />
          <span className="text-xl font-bold text-blue-900">DocHive</span>
        </div>

        <div className="bg-blue-100 rounded-lg shadow-xl p-8">
          <div className="flex mb-8">
            <button
              type="button"
              className={`flex-1 py-2 text-center ${isLogin ? 'text-blue-700 border-b-2 border-blue-700' : 'text-blue-500'}`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-center ${!isLogin ? 'text-blue-700 border-b-2 border-blue-700' : 'text-blue-500'}`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-blue-900 mb-2">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-blue-900 mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-blue-900 mb-2">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                <Info className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-blue-700 hover:text-blue-600">
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Login' : 'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-blue-700">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-500"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-500"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PAuthPage;