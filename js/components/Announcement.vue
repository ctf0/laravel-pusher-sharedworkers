<script>
import EchoLib from 'laravel-echo'

window.Pusher = require('pusher-js')
window.Echo = new EchoLib({
    broadcaster: process.env.MIX_BROADCAST_DRIVER,
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: process.env.MIX_PUSHER_APP_ENCRYPT
})

export default {
    created() {
        if (typeof window.SharedWorker === 'undefined') {
            throw 'Your browser doesn\'t support SharedWorkers'
        }

        this.publicChannels()
        this.privateChannels()
    },
    methods: {
        privateChannels() {
            Echo.private('').listen('', ({data}) => {
                this.showNotif(data)
            })
        },

        /*                Shared                */
        publicChannels() {
            let worker = new SharedWorker(process.env.MIX_APP_URL + '/assets/js/pusher/shared_worker.js')

            worker.port.onmessage = ({data}) => {
                this.showNotif(data)
            }

            worker.onerror = ({message}) => {
                if (message !== undefined) {
                    this.showNotif({
                        title: 'Error',
                        body: message,
                        type: 'danger'
                    })
                }

                worker.port.close()
            }

            worker.port.start()
        },

        /*                Util                */
        showNotif(data) {
            EventHub.fire('showNotif', {
                title: data.title,
                body: data.body,
                type: data.type
            })
        }
    },
    render () {}
}
</script>
