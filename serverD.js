const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const port = 4000; // Updated port

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI =  'mongodb://127.0.0.1:27017/dataset';


// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  doctorID: {
    type: String,
    required: true,
    unique: true, // Ensure doctorID is unique
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: String,
  qualification: String,
  dob: Date,
  age: Number,
  bloodGroup: String,
  appointmentCost: Number,
  location: {
    latitude: Number,
    longitude: Number,
  },
  contact: String,
});

// Create the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

// Endpoint to fetch all doctors
app.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: 'Failed to fetch doctors.' });
  }
});

// Login endpoint for doctors
app.post('/login', async (req, res) => {
  const { doctorID, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ doctorID, password });
    if (doctor) {
      res.json({ message: 'Login successful', doctor });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Login failed.' });
  }
});

// Signup endpoint for doctors
app.post('/signup', async (req, res) => {
  let newDoctor = req.body;

  try {
    const exists = await Doctor.findOne({ doctorID: newDoctor.doctorID });
    if (exists) {
      return res.status(400).json({ message: 'Doctor already exists with this ID.' });
    }

    // Handle contactNumber and location formatting
    if (newDoctor.latitude && newDoctor.longitude) {
      newDoctor.location = {
        latitude: parseFloat(newDoctor.latitude),
        longitude: parseFloat(newDoctor.longitude)
      };
      delete newDoctor.latitude;
      delete newDoctor.longitude;
    }

    if (newDoctor.contactNumber) {
      newDoctor.contact = newDoctor.contactNumber;
      delete newDoctor.contactNumber;
    }

    newDoctor.age = parseInt(newDoctor.age, 10);
    newDoctor.appointmentCost = parseFloat(newDoctor.appointmentCost);
    
	console.log("new doc obj: ",newDoctor);

    const doctor = new Doctor(newDoctor);
    console.log("doc obj: ",doctor);
    const result = await doctor.save();
    console.log(result);
    res.status(201).json({ message: 'Doctor created successfully.' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Signup failed.' });
  }
});

// Start the server
async function startServer() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

startServer().then(() => {
console.log("server started");
}).catch((err) => {
console.error("Error: ",err);
});

