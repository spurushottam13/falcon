import DOM from "./dom.js"
import Store from "./store.js"

const ClickTracker = (function(){
    function clickEventHandler(event){
        const data = {
            tracker: 'click',
            pageX: event.pageX,
            pageY: event.pageY,
            el : DOM.returnEL(event.target),
            _ts: new Date().getTime() - Store.get('_TS')
        }
        Store.get('beacon')(data)
    }
    return {
        start: Store.add('clickTracker.start', _ => window.addEventListener('click', clickEventHandler)),
        stop: Store.add('clickTracker.stop', _ => window.removeEventListener('click', clickEventHandler))
     }
})()
export default ClickTracker