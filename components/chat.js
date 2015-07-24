import websocket from 'websocket-stream'
import through from 'through2'

let Chat = () => {
  let wss = websocket('ws://'+ location.host)
  let name = 'Anonomous Zenster'

  wss.pipe(through(function (buf, enc, next) {
    console.log(buf.toString())
    next()
  }))

  return {
    setName: (name) => {
      name = name
    }

  , send: (message) => {
      wss.write(new Buffer(name +': '+ message))
    }
  }
}

export default Chat