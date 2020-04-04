import DOM from "./dom.js";
import Store from "./store.js";

const DomTracker = (function () {
   const targetNode = document;
   const config = { attributes: true, childList: true, subtree: true };
   const callback = function (mutationsList) {
      for (let mutation of mutationsList) {
         Store.get('sessionRecording').push({
            tracker: 'dom',
            type: mutation.type,
            xpath: DOM.getXpath(mutation.target),
            el: DOM.returnEL(mutation.target),
            _ts: new Date().getTime() - Store.get('_TS')
         })
      }
   };
   const observer = new MutationObserver(callback);
   return {
      start: Store.add('domTracker.start', _ => observer.observe(targetNode, config)),
      stop: Store.add('domTracker.stop', _ => observer.disconnect())
   }
})()

export default DomTracker