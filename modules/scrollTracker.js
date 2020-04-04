import Store from "./store.js"

const ScrollTracker = (function () {
    function scrollEventhandler() {
        Store.get('sessionRecording').push({
            tracker: 'scroll',
            type: 'scroll',
            _ts: new Date().getTime() - Store.get('_TS'),
            scrollLeft: (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
            scrollTop: (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
        })
    }
    return {
        start: Store.add('scrollTracker.start', _ => window.addEventListener('scroll', scrollEventhandler)),
        stop: Store.add('scrollTracker.stop', _ => window.removeEventListener('scroll', scrollEventhandler))
    }
})()

export default ScrollTracker