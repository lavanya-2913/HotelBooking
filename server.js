const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());


let hotels = [
    { id: 1, name: 'Taj Hotel', location: 'Chennai' },
    { id: 2, name: 'Marine Hotel', location: 'Hyderabad' }
];

app.get('/hotels', (req, res) => {
    res.json(hotels);
});

app.get('/hotels/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const hotel = hotels.find(hotel => hotel.id === id);
    if (hotel) {
        res.json(hotel);
    } else {
        res.status(404).send('Hotel not found');
    }
});

app.post('/hotels', (req, res) => {
    const newHotel = req.body;
    const existingHotel = hotels.find(hotel => hotel.id === newHotel.id);
    if (existingHotel) {
        res.status(400).send('Hotel with the same ID already exists');
    } else {
        hotels.push(newHotel);
        res.status(201).json(newHotel);
    }
});

app.put('/hotels/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedHotel = req.body;
    const hotelIndex = hotels.findIndex(hotel => hotel.id === id);
    if (hotelIndex !== -1) {
        hotels[hotelIndex] = { ...hotels[hotelIndex], ...updatedHotel };
        res.json(hotels[hotelIndex]);
    } else {
        res.status(404).send('Hotel not found');
    }
});

app.delete('/hotels/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = hotels.findIndex(hotel => hotel.id === id);
    if (index !== -1) {
        const deletedHotel = hotels.splice(index, 1)[0];
        res.json(deletedHotel);
    } else {
        res.status(404).send('Hotel not found');
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});