import React, { useState } from 'react';
import { Activity, Lock, User, Info, Mail, Phone, MapPin, Calendar as CalendarIcon, Droplet, DollarSign, GraduationCap, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Validate login fields
        if (!formData.doctorID || !formData.password) {
          throw new Error('Please fill in all required fields');
        }

        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            doctorID: formData.doctorID,
            password: formData.password
          })
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Invalid credentials');
        }

        const data = await response.json();
        console.log('Login successful:', data);
        navigate("/dashboard");
      } else {
        // Validate signup fields
        const requiredFields = ['doctorID', 'password', 'name', 'department', 'qualification', 'contactNumber'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
          throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        }

        const response = await fetch('http://localhost:4000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Signup failed');
        }

        const data = await response.json();
        console.log('Signup successful:', data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const InputField = ({ name, label, type = 'text', placeholder, icon: Icon }) => (
    <div className="mb-4">
      <label className="flex items-center text-blue-900 mb-2">
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full px-4 py-2 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center bg-blue-100 p-3 rounded-full mb-3">
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-blue-800">DOC HIVE</h1>
          <p className="text-blue-600 mt-1">
            {isLogin ? 'Doctor Login' : 'Doctor Registration'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              type="button"
              className={`flex-1 py-3 text-center font-medium ${isLogin ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-500'}`}
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-center font-medium ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-500'}`}
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                <Info className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            {isLogin ? (
              <>
                <InputField
                  name="doctorID"
                  label="Doctor ID"
                  placeholder="Enter your Doctor ID"
                  icon={User}
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  icon={Lock}
                />
              </>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    name="doctorID"
                    label="Doctor ID"
                    placeholder="DOC12345"
                    icon={User}
                  />
                  <InputField
                    name="name"
                    label="Full Name"
                    placeholder="Dr. John Doe"
                    icon={User}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    name="department"
                    label="Department"
                    placeholder="Cardiology"
                    icon={Stethoscope}
                  />
                  <InputField
                    name="qualification"
                    label="Qualification"
                    placeholder="MD, MBBS"
                    icon={GraduationCap}
                  />
                </div>

                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  icon={Lock}
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    icon={CalendarIcon}
                  />
                  <InputField
                    name="age"
                    label="Age"
                    type="number"
                    placeholder="35"
                    icon={Info}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    name="bloodGroup"
                    label="Blood Group"
                    placeholder="A+"
                    icon={Droplet}
                  />
                  <InputField
                    name="contactNumber"
                    label="Contact Number"
                    placeholder="+1 234 567 890"
                    icon={Phone}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    name="latitude"
                    label="Latitude"
                    placeholder="12.3456"
                    icon={MapPin}
                  />
                  <InputField
                    name="longitude"
                    label="Longitude"
                    placeholder="98.7654"
                    icon={MapPin}
                  />
                </div>

                <InputField
                  name="appointmentCost"
                  label="Appointment Cost ($)"
                  type="number"
                  placeholder="50"
                  icon={DollarSign}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                isLogin ? 'Login' : 'Register'
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default DAuthPage;