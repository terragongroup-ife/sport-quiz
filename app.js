const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(router);

const PORT = 5000;
app.listen(PORT, () =>{
    console.log('listening on port 5000');
})

