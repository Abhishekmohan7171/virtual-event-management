const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    attendees:{
        type: Array
    }
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

// {
//     "_id": "673b91cb782e6ae1d4c3fc6e",
//     "name": "Coldplay Music of Spheres",
//     "date": "04-10-2022",
//     "time": "10:00:00",
//     "location": "Mumbai",
//     "description": "Best concert in India till date.",
//     "attendees": [],
//     "__v": 0
// }

// {
//     "name":"Motoverse",
//     "date": "23-11-2024 to 25-11-2024",
//     "time":"10:00",
//     "location":"Goa",
//     "description":"Bikers getogether"
// }