import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    doctorID: '',
    password: '',
    name: '',
    department: '',
    qualification: '',
    dob: '',
    age: '',
    bloodGroup: '',
    latitude: '',
    longitude: '',
    appointmentCost: '',
    contactNumber: ''
  });
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    console.log('Form submitted:', formData);

    if (isLogin) {
      // Login: send only doctorID and password
      fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorID: formData.doctorID,
          password: formData.password
        })
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.message || 'Invalid credentials');
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log('Login response:', data);
          navigate("/dashboard");
          // Handle login success (clear error, redirect, etc.)
        })
        .catch((error) => {
          setError(error.message);
          console.error('Error during login:', error);
        });
    } else {
      // Sign up: send full form data
      fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.message || 'Signup failed');
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log('Signup response:', data);
          navigate("/dashboard");
          // Handle signup success (clear error, redirect, etc.)
        })
        .catch((error) => {
          setError(error.message);
          console.error('Error during signup:', error);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Activity className="h-8 w-8 text-blue-700 mr-2" />
          <span className="text-xl font-bold text-blue-900">DOC HIVE</span>
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
            {isLogin ? (
              <>
                <div>
                  <label className="block text-blue-900 mb-2">Doctor ID</label>
                  <input
                    type="text"
                    name="doctorID"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter your Doctor ID"
                    value={formData.doctorID}
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
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-blue-900 mb-2">Doctor ID</label>
                  <input
                    type="text"
                    name="doctorID"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter your Doctor ID"
                    value={formData.doctorID}
                    onChange={handleChange}
                  />
                </div>
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
                <div>
                  <label className="block text-blue-900 mb-2">Department</label>
                  <input
                    type="text"
                    name="department"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter your department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter your qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2">Blood Group</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter your blood group"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2">Appointment Cost</label>
                  <input
                    type="text"
                    name="appointmentCost"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter appointment cost"
                    value={formData.appointmentCost}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-blue-900 mb-2">Contact Number</label>
                  <input
                    type="text"
                    name="contactNumber"
                    className="w-full px-4 py-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-400 focus:border-blue-700 focus:outline-none"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DAuthPage;
