import RenderEngine from "./renderEngine.js"
import Store from "./store.js"
import ScrollTracker from "./scrollTracker.js"
import DomTracker from "./domTracker.js"
import ClickTracker from "./clickTracker.js"

const Falcon = (function(){
    return {
        init: function({beacon}){
          if(!beacon) throw new Error('[Falcon.js] (init) : beacon is required prop')
          Store.add('beacon', beacon)
        },
        start:function(){
          if(!Store.get('beacon')) throw new Error('[Falcon.js] (start) : start method called without init')
          Store.add('_TS', new Date().getTime())
          Store.add('sessionRecording', [])
          DomTracker.start()
          ScrollTracker.start()
          ClickTracker.start()
        },
        stopAllTracker: RenderEngine.stopAllTracker,
        renderEngine: RenderEngine
    }
})()

export default Falcon

if(!window.Falcon){
  window.Falcon = Falcon
}
