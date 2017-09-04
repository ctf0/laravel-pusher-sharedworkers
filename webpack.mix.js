const { mix } = require('laravel-mix')

const res = 'resources/assets'
const pub = 'public/assets'

// Pusher
mix.js(res + '/js/pusher/shared_worker.js', pub + '/js/pusher')
    .copy(res + '/js/pusher/pusher.worker.min.js', pub + '/js/pusher')
