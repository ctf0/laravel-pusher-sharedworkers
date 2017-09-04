window.Vue = require('vue')
window.EventHub = require('vuemit')

Vue.component('MyAnnouncement', require('./components/Announcement.vue'))
Vue.component('MyNotification', require('./components/Notification.vue'))

new Vue({
    el: '#app'
})
