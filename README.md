# Laravel + Vue + Pusher With Shared Workers

- https://laravel.com/docs/5.5/broadcasting#introduction
- https://github.com/pusher-community/pusher-with-shared-workers

[Shared Web Workers](http://caniuse.com/#feat=sharedworkers)

## Test

|                 browser                  |           with          |         without         |
|------------------------------------------|-------------------------|-------------------------|
| 2 browsers "Chrome, FF" with 2 tabs each | 2 + 1 "pusher" messages | 4 + 1 "pusher" messages |
