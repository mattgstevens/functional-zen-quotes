import http from 'http'
import path from 'path'
import express from 'express'
import websocket from 'websocket-stream'

const app = express()

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

let port = process.env.PORT || 3000
let server = http.createServer(app).listen(port, () => {
  console.log('Server listening on port %s', port)
})

const wss = websocket.createServer({ server: server }, function (stream) {

  // would remove client from channels here
  stream.on('close', function () {
    console.log('INFO :: stream closing');
  })

  stream.on('data', function (data) {
    console.log('INFO :: stream message ', data.toString())
    wss.clients.forEach(function each(client) {
      client.send(data)
    })
  })

})

export default app