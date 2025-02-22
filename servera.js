const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3500;

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON request body
app.use(express.json());

// File path for appointments.json
const APPOINTMENT_FILE = path.join(__dirname, "appointments.json");

// Endpoint to get all appointments
app.get("/appointments", (req, res) => {
  fs.readFile(APPOINTMENT_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Failed to load appointments." });
    }
    try {
      const appointments = JSON.parse(data);
      res.json(appointments);
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return res.status(500).json({ message: "Failed to parse appointments data." });
    }
  });
});

// Endpoint to handle new appointment submissions (POST)
app.post("/appointments", (req, res) => {
  const newAppointment = req.body; // Expecting { name, email, phone, doctor, date, time }

  fs.readFile(APPOINTMENT_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Failed to read appointments data." });
    }

    try {
      const appointments = JSON.parse(data);
      newAppointment.id = Date.now(); // Generate a unique ID based on timestamp
      appointments.push(newAppointment);

      fs.writeFile(APPOINTMENT_FILE, JSON.stringify(appointments, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).json({ message: "Failed to save new appointment." });
        }
        res.status(201).json(newAppointment); // Return the new appointment as a response
      });
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return res.status(500).json({ message: "Failed to parse or update appointment data." });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
