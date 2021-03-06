importScripts('pusher.worker.min.js')

const NS = 'App\\Events\\'

// pusher
let clients = []
const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: process.env.MIX_PUSHER_APP_ENCRYPT
})

// Channels
pubChannels('public-channel', `${NS}Testing`)

function pubChannels(channel, event) {
    pusher.subscribe(channel).bind(event, (evt) => {
        clients.forEach((client) => {
            client.postMessage(evt.data)
        })
    })
}

// Connect
self.addEventListener('connect', (evt) => {
    let port = evt.ports[0]

    clients.push(port)
    port.start()
})
