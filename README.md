# Laravel + Vue + Pusher With Shared Workers

- https://laravel.com/docs/5.5/broadcasting#introduction
- https://github.com/pusher-community/pusher-with-shared-workers

[Shared Web Workers](http://caniuse.com/#feat=sharedworkers)

## Test

|                 browser                  |           with          |         without         |
|------------------------------------------|-------------------------|-------------------------|
| 2 browsers "Chrome, FF" with 2 tabs each | 2 + 1 "pusher" messages | 4 + 1 "pusher" messages |


## Exp "maybe"
- check if the browser have tabs of the same origin "window, tab1, tab2, etc.."
- if yes then disable/stop the ws listening to notification from pusher on all but main window
- use https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API to share the data
