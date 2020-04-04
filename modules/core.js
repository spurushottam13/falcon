import RenderEngine from "./renderEngine.js"
import Store from "./store.js"
import ScrollTracker from "./scrollTracker.js"
import DomTracker from "./domTracker.js"
import ClickTracker from "./clickTracker.js"

const Falcon = (function(){
    return {
        store: Store,
        start:function(){
          Store.add('_TS', new Date().getTime())
          Store.add('sessionRecording', [])
          Store.add('heatmap.click', [])
          DomTracker.start()
          ScrollTracker.start()
          ClickTracker.start()
        },
        render: RenderEngine.start
    }
})()

window.Falcon = Falcon
