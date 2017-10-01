const deepMerge = require('./utils')

/**
  * @class
  * @extends { Object }
*/

class ConfigObject extends Object {
  get(key) {
    if (!this[key]) throw new Error(`Prop ${key} not found`)
    return this[key]
  }

  set(key, value) {
    this[key] = value
    return this
  }

  delete(key) {
    if (!this[key]) throw new Error(`Prop ${key} not found`)
    delete this[key]
    return this
  }

  toObject() {
    const object = {}
    Object.keys(this).forEach(key => (object[key] = this[key]))
    return object
  }

  merge(config) {
    return Object.assign(this, deepMerge(this, config))
  }
}

module.exports = ConfigObject
