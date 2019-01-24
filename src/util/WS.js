var WS
if (typeof window === 'undefined') {
  WS = require('ws')
  WS.prototype.on = new Proxy(WS.prototype.on, {
    apply: function(target, thisArg, args) {
      if (args[0] === 'message') {
        let wrapped = function(message) {
          Reflect.apply(args[1], thisArg, [JSON.parse(message)])
        }
        Reflect.apply(target, thisArg, [args[0], wrapped])
      } else {
        Reflect.apply(...arguments)
      }
    }
  })
  WS.prototype.send = new Proxy(WS.prototype.send, {
    apply: function(target, thisArg, args) {
      let payload = JSON.stringify(args[0])
      Reflect.apply(target, thisArg, [payload])
    }
  })
} else {
  let nativeSocket = WebSocket || MozWebSocket || window.WebSocket || window.MozWebSocket
  WS = function(addr){
    this.socket = new nativeSocket(addr)
  }
  WS.prototype.send = function(data) {
    let payload = JSON.stringify(data)
    this.socket.send(payload)
  }
  WS.prototype.close = function(code, reason) {
    this.socket.close(code, reason)
  }
  WS.prototype = new Proxy(WS.prototype, {
    set: function(target, prop, value){
      if (prop === 'socket') {
        Reflect.set(target, prop, value)
        return true
      } else if (prop === 'onmessage') {
        let wrapped = function(messageEvent) {
          if(typeof messageEvent.data === 'string')
            value(JSON.parse(messageEvent.data))
          else
            value(messageEvent.data)
        }
        Reflect.set(target.socket, prop, wrapped)
        return true
      } else {
        Reflect.set(target.socket, prop, value)
        return true
      }
    },
    get: function(target, name) {
      if (name in target || name === 'socket') {
        return Reflect.get(target, name)
      } else {
        return Reflect.get(target.socket, name)
      }
    }
  })
}

export default WS