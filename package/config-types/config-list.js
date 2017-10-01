/**
  * @class
  * @extends { Array }
*/

class ConfigList extends Array {
  set(key, value, pos = 'bottom') {
    const index = this.index(key)
    if (index >= 0) this.delete(key)
    return this.add({ key, value }, pos)
  }

  get(key) {
    const index = this.index(key)
    if (index < 0) throw new Error(`Item ${key} not found`)
    return this[index].value
  }

  delete(key) {
    const index = this.index(key)
    if (index < 0) throw new Error(`Item ${key} not found`)
    this.splice(index, 1)
    return this
  }

  insertAtPos(index, item) {
    return this.splice(index, 0, item)
  }

  index(key) {
    return this.findIndex(entry =>
      (
        entry === key ||
        entry.key === key ||
        (entry.constructor && entry.constructor.name === key)
      )
    )
  }

  values() {
    return this.map(item => item.value)
  }

  keys() {
    return this.map(item => item.key)
  }

  add(item, pos) {
    if (pos === 'top') {
      this.unshift(item)
    } else if (typeof pos === 'number') {
      this.insertAtPos(pos, item)
    } else {
      this.push(item)
    }
    return this
  }
}

module.exports = ConfigList
