<script>
if (typeof window.SharedWorker === 'undefined') {
    var head = document.getElementsByTagName('head')[0]
    var js = document.createElement('script')
    js.src = '//cdnjs.cloudflare.com/ajax/libs/pusher/4.1.0/pusher.min.js'
    head.appendChild(js)
}
</script>

<style>
    .notif-container {
        padding: 0 0 4rem;
        position: fixed;
        top: 4rem;
        right: 1rem;
        bottom: 0;
        z-index: 100;
        overflow: scroll;
    }
</style>

<div id="app">
    {{-- announcement --}}
    <my-announcement></my-announcement>

    {{-- notifications --}}
    <div class="notif-container">
        <my-notification></my-notification>
    </div>
</div>
