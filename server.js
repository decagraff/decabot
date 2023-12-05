const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 5501;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/user', async (req, res) => {
    const accessToken = req.query.access_token;
    const clientId = 'pbkcyhuat521eff96jbagfi9fbel1s';

    try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
                'Client-ID': clientId,
                'Authorization': 'Bearer ' + accessToken
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error al conectar con Twitch.', error);
        res.status(500).send('Error al conectar con Twitch.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.7:${port}/`);
});