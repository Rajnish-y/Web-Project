const mongoose = require('mongoose');
const mongoURI='mongodb://127.0.0.1:27017/dataset';

async function main(){

	await mongoose.connect(mongoURI);
	
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

	const model = mongoose.model('Doctor',doctorSchema);

	const example = new model({
	    "name": "Dr. Jay Krishna",
	    "doctorID": "DOC4567",
	    "password": "sabala",
	    "department": "Podriatic",
	    "qualification": "MBBS, MD",
	    "dob": "1979-06-20",
	    "age": 44,
	    "bloodGroup": "AB-",
	    "location": {
	      "latitude": 14.845,
	      "longitude": 90.15
	    },
	    "appointmentCost": 1700,
	    "contact": "919076543225"
	  });

	await example.save();
	

}

main().then(() => {
console.log("doctor saved");;
mongoose.disconnect();
}).catch((err) => {
console.error("Error: ",err);
});
