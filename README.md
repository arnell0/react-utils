# react-utils
Collection of ui-components, functions, objects and constants used by me in React projects


# lodash
    usage: _.get(obj, path = 'key.subkey')
    returns: value of key at path in object: obj.key.subkey

    usage: _.set(obj, path = 'key.subkey', value)
    sets value of key at path in object: obj.key.subkey = value

    usage: _.has(obj, path = 'key.subkey')
    returns: true if key at path in object: obj.key.subkey exists

    usage: _.unset(obj, path = 'key.subkey')
    deletes key at path in object: delete obj.key.subkey

# handleLocalStorage
    usage: handleLocalStorage.get('key')
    returns: value of key in localStorage || null
    
    usage: handleLocalStorage.set('key', 'value')
    returns: void
    
    usage: handleLocalStorage.remove('key')
    returns: void 
