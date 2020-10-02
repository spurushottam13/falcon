import Falcon from "../src/index.js";

// Custom temp store to save data and later we use for render
// Ideally it will be sent to backend to store thier with userId
// @params: data-type: must be Array
window.customStore = []

Falcon.init({
    // Beacon will recive the data with timestamp and it 
    // his duty to push the data in store in order they are recived.
    beacon: data => window.customStore.push(data)
})

// for demo we will calling below method from console

window.startRecording = () => {
    //  Before calling Falcon.start() make sure you have called Falcon.init()
    Falcon.start()
}

window.renderRecording = () => {
    // Falcon also export renderEngine 
    Falcon.renderEngine.start(window.customStore)
}
