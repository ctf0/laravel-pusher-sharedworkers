<template></template>

<script>
export default {
    created() {
        this.run()
    },
    methods: {
        run() {
            if (typeof window.SharedWorker === 'undefined') {
                // todo
                // add fallback
                this.showNotif({
                    title: 'Error',
                    body: 'Your browser doesn\'t support SharedWorkers',
                    type: 'black'
                })
            }

            let worker = new SharedWorker(process.env.MIX_APP_URL + '/assets/js/pusher/shared_worker.js')

            worker.port.onmessage = ({data}) => {
                this.showNotif(data)
            }

            worker.onerror = ({message}) => {
                if (message !== undefined) {
                    this.showNotif({
                        title: 'Error',
                        body: message,
                        type: 'black'
                    })
                }

                worker.port.close()
            }

            worker.port.start()
        },
        showNotif(data) {
            EventHub.fire('showNotif', {
                title: data.title,
                body: data.body,
                type: data.type
            })
        }
    }
}
</script>
