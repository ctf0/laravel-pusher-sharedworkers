importScripts('pusher.worker.min.js')

const NS = 'App\\Events\\'

// csrf
// make an ajax call to a url and get the current csrf token
let csrf_token
let xhr = new XMLHttpRequest()
xhr.onload = function(e) {
    csrf_token = JSON.parse(e.target.responseText)
}
xhr.open('GET', '/api/csrf', false)
xhr.send()

// pusher
let clients = []
const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
    authEndpoint: '/broadcasting/auth',
    auth: {
        headers: {
            'X-CSRF-TOKEN': csrf_token
        }
    },
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: process.env.MIX_PUSHER_APP_ENCRYPT
})

// Channels
pubChannels('public-channel', `${NS}Testing`)
priChannels('App.User.1', `${NS}PrivTest`)

function priChannels(channel, event) {
    pusher.subscribe('private-' + channel).bind(event, (evt) => {
        clients.forEach((client) => {
            client.postMessage(evt.data)
        })
    })
}

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
