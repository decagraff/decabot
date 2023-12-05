const express = require('express');
const axios = require('axios');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 5501;

// Certificados SSL
const options = {
    key: fs.readFileSync('C:/Users/antho/Desktop/BotDesde0/Nuevacarpeta/https/localhost.key'),
    cert: fs.readFileSync('C:/Users/antho/Desktop/BotDesde0/Nuevacarpeta/https/localhost.pem'),
    passphrase: 'deca3062'
    
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
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

https.createServer(options, app).listen(port, () => {
    console.log(`Server running at https://127.0.0.7:${port}/`);
});