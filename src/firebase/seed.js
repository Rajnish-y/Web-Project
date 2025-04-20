const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyC8ayp5FwqtWhLlfIGdh7WGUjiPnZsLQpI",
    authDomain: "doc-hive.firebaseapp.com",
    projectId: "doc-hive",
    storageBucket: "doc-hive.firebasestorage.app",
    messagingSenderId: "830048191692",
    appId: "1:830048191692:web:6469bdcd119b7b49f9ae69"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedDoctors = async () => {
    try {
        const doctorsCollection = collection(db, "doctors");

        const doctors = [
            {
                name: "Dr. John Smith",
                specialty: "General Practitioner",
                avatar: "https://randomuser.me/api/portraits/men/41.jpg"
            },
            {
                name: "Dr. Emily Johnson",
                specialty: "Cardiologist",
                avatar: "https://randomuser.me/api/portraits/women/22.jpg"
            },
            {
                name: "Dr. Michael Chen",
                specialty: "Dermatologist",
                avatar: "https://randomuser.me/api/portraits/men/56.jpg"
            },
            {
                name: "Dr. Sarah Williams",
                specialty: "Pediatrician",
                avatar: "https://randomuser.me/api/portraits/women/37.jpg"
            }
        ];

        for (const doctor of doctors) {
            await addDoc(doctorsCollection, doctor);
            console.log(`Added doctor: ${doctor.name}`);
        }

        console.log("Doctors seeded successfully!");
    } catch (error) {
        console.error("Error seeding doctors:", error);
    }
};

seedDoctors()
    .then(() => console.log("Seeding complete!"))
    .catch(error => console.error("Seeding failed:", error));