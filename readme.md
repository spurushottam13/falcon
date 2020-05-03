# Falcon : Session recording JS lib

## Session Recording JS Lib. built on DOM mutation API

* Steps: - To record
    * Add/Import the Falcon   
    ```import Falcon from "./src/index.js.js";```
    * Initate the Lib.   
        ```
            Falcon.init({
            beacon: customBeacon
        ```    
        beacon will recive stream of data, developer has to store the data in thier backend in array or in sequnce, which will be used by the render Engine to render the session recording.   
    * Start session recording
        ```
        Falcon.start()
        ```
* Steps: - To render recording.   
    RenderEngine requires in website dom. it can only render inside the loaded website.  
    * Add/Import the Falcon in the recorded website.
    ```import Falcon from "./src/index.js.js";```
    * Play.   
        ```
        // recordingArrayData : Array => it's the data stored by your customBeacon
        Falcon.renderEngine.start(recordingArrayData)
        ```