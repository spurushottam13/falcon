import Store from "./store.js";
import DOM from "./dom.js";

const RenderEngine = (function () {
    return Object.defineProperties({}, {
        start: {
            writable: false,
            configurable: false,
            enumerable: true,
            value: (sessionRecording) => {
                RenderEngine.stopAllTracker()
                RenderEngine.setClickReflector()
                if (!Array.isArray(sessionRecording)) throw new Error("Session Record Store is empty")
                sessionRecording.forEach(element => {
                    setTimeout(_ => RenderEngine.handlePaint(element), element._ts)
                });
            }
        },
        setClickReflector: {
            writable: false,
            configurable: false,
            enumerable: true,
            value: function () {
                const clickReflector = document.createElement('div')
                clickReflector.id = "sp13-CF"
                clickReflector.style = "height: 30px; width: 30px; display: none; background: red; position: absolute; top: 104px; left: 250px; z-index: 99999999999; border-radius: 40px; background: radial-gradient(circle, rgba(27, 36, 0, 0) 0%, rgba(177,208,30,0) 35%, rgb(216, 255, 0) 100%);"
                document.body.append(clickReflector)
                Store.add('clickReflector', clickReflector)
            }
        },
        handleClickReflector: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: (isClickEvent, element) => {
                if (isClickEvent) {
                    const clickReflector = Store.get('clickReflector')
                    clickReflector.style.display = 'block'
                    clickReflector.style.top = element.pageY + "px"
                    clickReflector.style.left = element.pageX + "px"
                    Store.add('isClickReflectorVisible', true)
                } else {
                    const status = Store.get('isClickReflectorVisible') || false
                    if (status) {
                        const clickReflector = Store.get('clickReflector')
                        clickReflector.style.display = 'none'
                    }

                }
            }
        },
        handlePaint: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: (element) => {
                const { tracker } = element
                RenderEngine.handleClickReflector(tracker === 'click', element)
                if (tracker === 'dom') return RenderEngine.paintDOMEvent(element)
                if (tracker === 'scroll') return RenderEngine.paintScrollEvent(element)
            }
        },
        stopAllTracker: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: () => {
                const activeTracker = Object.keys(Store).filter(_ => _.includes('.stop'))
                activeTracker.forEach(key => Store[key]())
            }
        },
        paintDOMEvent: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: ({ xpath, el }) => {
                const host = DOM.getElementByXpath(xpath)
                const newDom = DOM.returnElement(el)
                host.replaceWith(newDom)
            }
        },
        paintScrollEvent: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: ({ scrollLeft, scrollTop }) => window.scrollTo(scrollLeft, scrollTop)
        }

    })
})()

export default RenderEngine