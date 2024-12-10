const express = require('express')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')

const app = express()

const dbConnectionUri = "mongodb+srv://ameicib:yCXUFzJovU1PDGD2@cluster.qrxe0.mongodb.net/?retryWrites=true&w=majority&appName=cluster";
const dbName = "srbc";

const statusSchema = new mongoose.Schema({
    capacity: Number,
    day: String,
    hours: Number,
    minutes: Number,
    seconds: Number
});

const Status = mongoose.model('Status', statusSchema);

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/status', asyncHandler(async (req, res) => {
    const status = await Status.find();
    res.json(status)
}));

app.post('/status', asyncHandler(async (req, res) => {
    const capacity = req.body.capacity;
    const day = req.body.day;
    const hours = req.body.hours;
    const minutes = req.body.minutes;
    const seconds = req.body.seconds;

    const newStatus = new Status({capacity, day, hours, minutes, seconds });
    await newStatus.save()

    res.status(201).json(newStatus)
}))

async function connectToDB() {
    await mongoose.connect(dbConnectionUri, { dbName });
    
    app.listen(3000, () => {
        console.log('Server listening on port 3000')
    })
}

connectToDB();