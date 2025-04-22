import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      setIsLoading(false);
      return;
    }

    try {
	if (isLogin) {
	  const response = await fetch('http://localhost:5000/login', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({
	      email: formData.email,
	      password: formData.password,
	    }),
	  });

	  const data = await response.json();
	  if (response.ok) {
	    localStorage.setItem('user', JSON.stringify(data.user));
	    navigate("/pdashboard");
	  } else {
	    setError(data.message || 'Invalid email or password.');
	  }
	} else {
	  const response = await fetch('http://localhost:5000/signup', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(formData),
	  });
	
	  const data = await response.json();
	  if (response.ok) {
	    alert('Sign-Up successful!');
	    setIsLogin(true);
	    navigate("/pdashboard");
	  } else {
	    setError(data.message || 'Failed to sign up. Please try again.');
	  }
	}

        // Create new user
        const newUser = {
          email: formData.email,
          password: formData.password,
          name: formData.name
        };

        const postResponse = await fetch('http://localhost:5000/users', {
		method: 'POST', // Using PATCH to merge new user into existing users
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [formData.email]: newUser
          }),
        });

        if (postResponse.ok) {
          console.log('Sign-up successful');
          alert('Sign-Up successful!');
          setIsLogin(true);
          navigate("/pdashboard");
        } else {
          setError('Failed to sign up. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
              className={`flex-1 py-2 text-center ${isLogin ? 'text-blue-700 border-b-2 border-blue-700' : 'text-blue-500'}`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center ${!isLogin ? 'text-blue-700 border-b-2 border-blue-700' : 'text-blue-500'}`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-blue-900 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label className="block text-blue-900 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-blue-900 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {error}
              </p>
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
              {isLoading ? "Processing..." : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-blue-700">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button className="text-blue-600 hover:text-blue-500" onClick={() => setIsLogin(false)}>
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button className="text-blue-600 hover:text-blue-500" onClick={() => setIsLogin(true)}>
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
