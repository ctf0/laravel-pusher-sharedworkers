importScripts('pusher.worker.min.js')

let clients = []
const NS = 'App\\Events\\'
const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: process.env.MIX_PUSHER_APP_ENCRYPT
})

function pubChannels() {
    pusher.subscribe('public-channel').bind(NS + 'PublicChannel', (evt) => {
        clients.forEach((client) => {
            client.postMessage(evt.data)
        })
    })
}

function priChannels() {
    // pusher.subscribe().bind(NS + '', (evt) => {
    //     clients.forEach((client) => {
    //         client.postMessage(evt.data)
    //     })
    // })
}

pubChannels()
priChannels()

addEventListener('connect', (evt) => {
    let port = evt.ports[0]

    clients.push(port)
    port.start()
})
