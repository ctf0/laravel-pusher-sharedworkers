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
