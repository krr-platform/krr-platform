/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable no-console */
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.post('/api/compute/anti-unification-fol', async (req, res) => {
    try {
        // Replace 'http://localhost:5000/compute' with your Flask service URL
        const response = await axios.post('http://localhost:5000/compute/anti-unification-fol', req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error during computation');
    }
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
