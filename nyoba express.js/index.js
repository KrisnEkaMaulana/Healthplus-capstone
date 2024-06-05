const express = require('express')
const dotenv = require('dotenv')
const endpoint = require('./router/endpoint')

const app = express()
dotenv.config()
app.use(endpoint)

app.get('/', (req, res) => {
    res.send("hallo world")
})

const host = process.env.HOST
const port = process.env.PORT 

app.listen(port, host, () => {
    console.log(`server up and running at http://${host}:${port}`);
})
