const express = require('express');
const app = express();
const fetch = require('node-fetch');

const clientId = '1199098001294118932';
const clientSecret = 'g-fi86FeRlSk2SnyeVoD5woLHqPQZhbp';
const redirectUri = 'http://localhost:3000';

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    // Exchange authorization code for an access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            scope: 'identify',
        }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;


    res.send('OAuth2 callback handled successfully!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
