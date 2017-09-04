importScripts('pusher.worker.min.js')

let clients = []
const NS = 'App\\Events\\'
const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: process.env.MIX_PUSHER_APP_ENCRYPT
})

addEventListener('connect', (evt) => {
    let port = evt.ports[0]

    clients.push(port)
    port.start()
})

/*                publicChannel                */
pusher.subscribe('public').bind(NS + 'Testing', (data) => {
    clients.forEach((client) => {
        client.postMessage(data)
    })
})

/*                privateChannel                */
// pusher.subscribe().bind(NS + '', (data) => {
//     clients.forEach((client) => {
//         client.postMessage(data)
//     })
// })
