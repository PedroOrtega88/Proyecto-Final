const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/config');
const routes = require('./routes/routePeliculas');
require('dotenv').config();



 
const app = express();
const PORT= process.env.PORT || 3000;




app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true 
  }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', routes);


dbConnection()






app.listen(PORT, () => {

    console.log(`Express esta escuchando en el puerto http://localhost:${PORT}`)



})

