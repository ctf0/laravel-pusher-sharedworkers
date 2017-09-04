<?php

Artisan::command('test', function () {
    $data = [
        'title'  => 'Hello',
        'body'   => 'there',
        'type'   => 'success',
    ];

    event(new \App\Events\Testing($data));
});
