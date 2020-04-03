import DOM from "./dom.js";
import Store from "./store.js";

const DomTracker = (function () {
   const targetNode = document;
   const config = { attributes: true, childList: true, subtree: true };
   const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
         const result = {
            tracker: 'dom',
            type: mutation.type,
            xpath: DOM.getXpath(mutation.target),
            dom: DOM.returnElementObject(mutation.target),
            _ts: new Date().getTime() - Store.get('_TS')
         }
         Store.get('sessionRecording').push(result)
      }
   };
   const observer = new MutationObserver(callback);
   return {
      start: Store.add('domTracker.start', _ => observer.observe(targetNode, config)),
      stop: Store.add('domTracker.stop', _ => observer.disconnect())
   }
})()

export default DomTracker