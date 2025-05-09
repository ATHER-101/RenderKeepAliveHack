const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Set interval to ping itself every 5 minutes (300000 ms)
setInterval(() => {
    axios
        .get(`http://localhost:${port}/ping`)  // Pings itself
        .then((response) => {
            console.log("Ping sent!");
        })
        .catch((error) => {
            console.error("Error pinging itself:", error);
        });
}, 300000); // 5 minutes in milliseconds

// Endpoint that will ping (to keep itself awake)
app.get("/ping", (req, res) => {
    res.sendStatus(200);
    console.log("Ping received!")
});

app.get("/", (req, res) => {
    res.send("Hello World! This is a service that pings itself every 5 minutes so that Render doesnt spin this down!.");
});

// Start the server
app.listen(port, () => {
    console.log(`Service running on port ${port}`);
});