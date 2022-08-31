export const _ = {
    /*
        # lodash
        usage: _.get(obj, path = 'key.subkey')
        returns: value of key at path in object: obj.key.subkey

        usage: _.set(obj, path = 'key.subkey', value)
        sets value of key at path in object: obj.key.subkey = value

        usage: _.has(obj, path = 'key.subkey')
        returns: true if key at path in object: obj.key.subkey exists

        usage: _.unset(obj, path = 'key.subkey')
        deletes key at path in object: delete obj.key.subkey

    */
    get: (obj, path, defaultValue) => {
        if (!obj) return defaultValue
        if (!path) return obj
        if (path.indexOf('.') === -1) return obj[path]
        const [key, ...rest] = path.split('.')
        return _.get(obj[key], rest.join('.'), defaultValue)
    },
    set: (obj, path, value) => {
        if (Object(obj) !== obj) return obj
        if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
        path.slice(0,-1).reduce((a, c, i) =>
             Object(a[c]) === a[c] 
                 ? a[c] 
                 : a[c] = Math.abs(path[i+1])>>0 === +path[i+1] 
                       ? [] 
                       : {},
             obj)[path[path.length-1]] = value
        return obj
    },
    has: (obj, path) => {
        if (Object(obj) !== obj) return false
        if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
        return path.slice(0,-1).reduce((a, c, i) =>
             Object(a[c]) === a[c] 
                 ? a[c] 
                 : a[c] = Math.abs(path[i+1])>>0 === +path[i+1] 
                       ? [] 
                       : {},
             obj)[path[path.length-1]] !== undefined
    },
    unset: (obj, path) => {
        if (Object(obj) !== obj) return obj
        if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
        path.slice(0,-1).reduce((a, c, i) =>
             Object(a[c]) === a[c] 
                 ? a[c] 
                 : a[c] = Math.abs(path[i+1])>>0 === +path[i+1] 
                       ? [] 
                       : {},
             obj)[path[path.length-1]] = undefined
        return obj
    },
}

export const handleLocalStorage = {
    /* 
        # handleLocalStorage
        usage: handleLocalStorage.get('key')
        returns: value of key in localStorage || null
        
        usage: handleLocalStorage.set('key', 'value')
        returns: void
        
        usage: handleLocalStorage.remove('key')
        returns: void 
    */
    get: (key) => {
        const itemStr = localStorage.getItem(key)
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key)
            return null
        }
        return item.value
    },
    set: (key, value, hours) => {
        const now = new Date()

        const item = {
            value: value,
            expiry: now.getTime() + hours * 36000,
        }
        localStorage.setItem(key, JSON.stringify(item))
    },
    remove: (key) => {
        localStorage.removeItem(key)
    }
}