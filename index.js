const express = require('express')
const app = express()
PORT = 3000



app.get ('/', (req,res) => (res.send ('PROYECTO FINAL')))


app.listen(PORT, () => {
    console.log(`Express esta escuchando en el puerto http://localhost:${PORT}`)
})