const express = require('express');
const app = express();
const redis = require('redis');

const client = redis.createClient({
    socket:{
        host: 'redis-server',
        port: 6379
    },
    legacyMode: true,
});
client.connect().catch(console.error)
client.set('visits', 0);


app.get('/', async (req, res) => {
    await client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});