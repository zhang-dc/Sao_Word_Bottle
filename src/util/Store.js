import WebSocket from './WS'

const Store = {
    socket: null,
    username: '',
    bottleList: [],
    onBottleListChange: function() {},

    connectSocket(username) {
        this.socket = new WebSocket('ws://localhost:8008/')
        this.socket.onopen = () => {
            this.socket.onmessage = message => {
                this[message.action](message)
            }
            this.validate(username)
        }
    },

    validate(username) {
        this.socket.send({
            action: 'validate',
            username: username
        })
    },

    validateFinished(message) {
        console.log('Valid user: ' + message.username)
        this.username = message.username
    },

    getBottle() {
        this.socket.send({
            action: 'getBottle',
            username: this.username
        })
    },

    throwBottle(content) {
        this.socket.send({
            action: 'throwBottle',
            username: this.username,
            content: content
        })
    },

    sendMessage(to, content, uuid) {
        this.socket.send({
            action: 'sendMessage',
            from: this.username,
            to: to,
            content: content,
            uuid: uuid
        })
    },

    getBottleList() {
        this.socket.send({
            action: 'getBottleList',
            username: this.username
        })
    },

    sendSuccess(message) {
        this.bottles.push(message.bottle)
        this.onBottleListChange && this.onBottleListChange()
    },

    receiveMessage(message) {
        this.bottleList.push(message.bottle)
        this.onBottleListChange && this.onBottleListChange()
    },

    receiveBottleList(message) {
        this.bottleList = message.bottles
        this.onBottleListChange && this.onBottleListChange()
    }
}

export default Store