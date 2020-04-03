const Store = (function(){
    return Object.defineProperties({},{
        add : {
            writable: false,
            configurable: false,
            value: function(key, value){
                return this[key] = value
            }
        },
        get: {
            writable: false,
            configurable: false,
            value: function(key){
                return this[key]
            }
        }
    })
})()

export default Store