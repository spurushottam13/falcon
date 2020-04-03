import Store from "./store.js";
import DOM from "./dom.js";

const RenderEngine = (function () {
    // function paintDOMEvent(element) {
    //     const host = DOM.getElementByXpath(element.xpath)
    //     const dom = DOM.returnElement(element.dom)
    //     host.replaceWith(dom)
    // }
    // function paintScrollEvent({ scrollLeft, scrollTop }) {
    //     window.scrollTo(scrollLeft, scrollTop)
    // }
    // function handlePaint(element){
    //     const {tracker} = element
    //     if(tracker === 'dom') return paintDOMEvent(element)
    //     if(tracker === 'scroll') return paintScrollEvent(element)
    // }
    // function stopAllTracker(){
    //     const activeTracker = Object.keys(Store).filter(_ => _.includes('.stop'))
    //     activeTracker.forEach(key => Store[key]())
    // }
    return {
        start: () => {
            RenderEngine.stopAllTracker()
            const sessionRecording = Store.get('sessionRecording')
            if (!Array.isArray(sessionRecording)) throw new Error("Session Record Store is empty")
            sessionRecording.forEach(element => {
                setTimeout(_ => RenderEngine.handlePaint(element), element._ts)
            });
        },
        handlePaint: (element) => {
            const {tracker} = element
            if(tracker === 'dom') return RenderEngine.paintDOMEvent(element)
            if(tracker === 'scroll') return RenderEngine.paintScrollEvent(element)
        },
        stopAllTracker: () => {
            const activeTracker = Object.keys(Store).filter(_ => _.includes('.stop'))
            activeTracker.forEach(key => Store[key]())
        },
        paintDOMEvent: ({xpath, dom}) => {
            const host = DOM.getElementByXpath(xpath)
            const newDom = DOM.returnElement(dom)
            host.replaceWith(newDom)
        },
        paintScrollEvent: ({ scrollLeft, scrollTop }) => window.scrollTo(scrollLeft, scrollTop)
    }
})()

export default RenderEngine

/**
 function () {
            Store.get('scroll.stop')()
            const render = ({ scrollLeft, scrollTop }) => window.scrollTo(scrollLeft, scrollTop)
            const data = Store.get('scroll')
            data.forEach(element => {
                setTimeout(_ => render(element), element._ts)
            });
        }
 */