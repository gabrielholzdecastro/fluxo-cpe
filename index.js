const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const db = require('./queries')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/processos', db.getProcessos)
app.post('/processos', db.createProcesso)
app.put('/adicionarTestador', db.adicionarTestador)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})