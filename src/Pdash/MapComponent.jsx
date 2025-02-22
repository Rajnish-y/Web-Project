import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FHeader from "./FHeader";
import FFooter from "./FFooter";

const MapComponent = ({ doctorType }) => {
  const [doctors, setDoctors] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  useEffect(() => {
    fetch("/doctors.json")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        const uniqueDepartments = [
          ...new Set(data.map((doctor) => doctor.department)),
        ];
        setDepartments(uniqueDepartments);
        setSelectedDepartments(uniqueDepartments);
      })
      .catch((err) => console.error("Error loading doctors:", err));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setUserLocation({ latitude: 12.9221, longitude: 80.1953 });
      }
    );
  }, []);

  const doctorIcon = new L.Icon.Default();
  const userIcon = new L.Icon({
    iconUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC_vmA3Q2n2Hq4jyHqi0Jlg03NRYRZ4zYo3g&s",
    iconSize: [50, 50],
    iconAnchor: [25, 40],
    popupAnchor: [0, -30],
  });

  const toggleDepartment = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      selectedDepartments.includes(doctor.department) &&
      (doctorType ? doctor.type === doctorType : true)
  );

  return (
    <>
      {/* Header */}
      <FHeader />

      {/* Main content */}
      <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 mt-16">
        {/* Department filter */}
        <div className="w-full max-w-4xl bg-white p-4 shadow-md rounded-lg mb-6 ">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Filter Doctors by Department
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`px-4 py-2 rounded-lg transition duration-300 ${
                  selectedDepartments.includes(dept)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => toggleDepartment(dept)}
              >
                {selectedDepartments.includes(dept)
                  ? `Hide ${dept}`
                  : `Show ${dept}`}
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <MapContainer
            center={[12.9221, 80.1953]}
            zoom={13}
            className="h-[500px] w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filteredDoctors.map((doctor) =>
              doctor.location && doctor.location.latitude && doctor.location.longitude ? (
                <Marker
                  key={doctor.doctorID}
                  position={[
                    doctor.location.latitude,
                    doctor.location.longitude,
                  ]}
                  icon={doctorIcon}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{doctor.name}</h3>
                      <p>{doctor.department}</p>
                      <p className="text-sm text-gray-500">Type: {doctor.type}</p>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}
            {userLocation && userLocation.latitude && userLocation.longitude && (
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={userIcon}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      {/* Footer */}
      <FFooter />
    </>
  );
};

export default MapComponent;
