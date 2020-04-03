import RenderEngine from "./renderEngine.js"
import Store from "./store.js"
import ScrollTracker from "./scrollTracker.js"
import DomTracker from "./domTracker.js"

const Falcon = (function(){
    return {
        store: Store,
        start:function(){
          Store.add('_TS', new Date().getTime())
          Store.add('sessionRecording', [])
          DomTracker.start()
          ScrollTracker.start()
        },
        render: RenderEngine.start
    }
})()

window.Falcon = Falcon