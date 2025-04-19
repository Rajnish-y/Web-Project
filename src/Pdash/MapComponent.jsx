import React, { useEffect, useState, useMemo, useCallback } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FHeader from "./FHeader";
import FFooter from "./FFooter";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Single default doctor icon for all departments
const defaultDoctorIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3059/3059518.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const DoctorPopup = ({ doctor }) => (
  <div className="min-w-[200px]">
    <h3 className="font-bold text-blue-600">{doctor.name}</h3>
    <p className="text-sm text-gray-700">{doctor.department}</p>
    <p className="text-xs text-gray-500 mb-2">Specialty: {doctor.specialty || doctor.type}</p>
    <div className="flex justify-between text-xs">
      <span className="text-gray-600">⭐ {doctor.rating || '4.5'}</span>
      <a
        href={`tel:${doctor.phone}`}
        className="text-blue-500 hover:text-blue-700"
      >
        📞 Call
      </a>
    </div>
  </div>
);

const RecenterMap = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center && center.lat && center.lng) {
      map.flyTo(center, map.getZoom());
    }
  }, [center, map]);

  return null;
};

const MapComponent = ({ doctorType }) => {
  const [doctors, setDoctors] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default center (Chennai coordinates)
  const defaultCenter = useMemo(() => ({ lat: 12.9221, lng: 80.1953 }), []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/doctors.json");
        if (!response.ok) throw new Error("Failed to load doctors");
        const data = await response.json();

        // Ensure all doctors have valid locations
        const validDoctors = data.filter(doctor =>
          doctor.location &&
          typeof doctor.location.latitude === 'number' &&
          typeof doctor.location.longitude === 'number'
        );

        setDoctors(validDoctors);
        const uniqueDepartments = [...new Set(validDoctors.map(doctor => doctor.department))];
        setDepartments(uniqueDepartments);
        setSelectedDepartments(uniqueDepartments);
      } catch (err) {
        console.error("Error loading doctors:", err);
        setError("Failed to load doctor data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation(defaultCenter);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setUserLocation(defaultCenter);
    }
  }, [defaultCenter]);

  // Filter doctors
  const filteredDoctors = useMemo(() =>
    doctors.filter(doctor =>
      selectedDepartments.includes(doctor.department) &&
      (doctorType ? doctor.type === doctorType : true)
    ),
    [doctors, selectedDepartments, doctorType]);

  // Toggle department filter
  const toggleDepartment = useCallback((dept) => {
    setSelectedDepartments(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  }, []);

  // Determine center point
  const center = userLocation || defaultCenter;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FHeader />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctor locations...</p>
          </div>
        </div>
        <FFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FHeader />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-6 bg-red-100 rounded-lg max-w-md">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
        <FFooter />
      </div>
    );
  }

  return (
    <>
      <FHeader />

      <main className="flex flex-col items-center p-4 md:p-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-20 pb-16">
        {/* Department filter */}
        <div className="w-full max-w-6xl bg-white p-4 md:p-6 shadow-lg rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
            Find {doctorType ? doctorType : ''} Doctors Near You
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-200 text-sm md:text-base ${selectedDepartments.includes(dept)
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                onClick={() => toggleDepartment(dept)}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Map container */}
        <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden mb-6">
          {center && center.lat && center.lng && (
            <MapContainer
              center={center}
              zoom={13}
              className="h-[500px] w-full"
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {filteredDoctors.map((doctor) => (
                <Marker
                  key={doctor.doctorID}
                  position={[doctor.location.latitude, doctor.location.longitude]}
                  icon={defaultDoctorIcon}
                >
                  <Popup className="min-w-[200px]">
                    <DoctorPopup doctor={doctor} />
                  </Popup>
                </Marker>
              ))}

              {userLocation && (
                <Marker
                  position={[userLocation.lat, userLocation.lng]}
                  icon={new L.Icon({
                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4474/4474280.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                  })}
                >
                  <Popup>Your Location</Popup>
                </Marker>
              )}

              <RecenterMap center={center} />
            </MapContainer>
          )}
        </div>

        {/* Legend */}
        <div className="w-full max-w-6xl bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">Map Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3059/3059518.png"
                alt=""
                className="w-5 h-5 mr-2"
              />
              <span className="text-sm">Doctor</span>
            </div>
            <div className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4474/4474280.png"
                alt=""
                className="w-5 h-5 mr-2"
              />
              <span className="text-sm">Your Location</span>
            </div>
          </div>
        </div>

        {/* Doctor count */}
        <div className="w-full max-w-6xl text-right text-sm text-gray-600 mt-4">
          Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
        </div>
      </main>

      <FFooter />
    </>
  );
};

export default MapComponent;