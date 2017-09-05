<script>
export default {
    created() {
        if (typeof window.SharedWorker === 'undefined') {
            this.fallBack()
        } else {
            this.shared_workers()
        }
    },
    methods: {
        /*                FallBack                */
        fallBack() {
            const NS = 'App\\Events\\'
            const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
                cluster: process.env.MIX_PUSHER_APP_CLUSTER,
                encrypted: process.env.MIX_PUSHER_APP_ENCRYPT
            })

            pusher.subscribe('public-channel').bind(NS + 'Testing', ({data}) => {
                this.showNotif(data)
            })
        },

        /*                Shared                */
        shared_workers() {
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
