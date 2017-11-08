/**
  * @class
  * @extends { Array }
*/

class ConfigList extends Array {
  get(key) {
    const index = this.getIndex(key, true)
    return this[index].value
  }

  set(key, value) {
    return this.add({ key, value })
  }

  append(key, value) {
    return this.set(key, value)
  }

  prepend(key, value) {
    return this.add({ key, value }, 'prepend')
  }

  insert(key, value, pos = {}) {
    if (pos.before) {
      const index = this.getIndex(pos.before, true)
      this.insertAtPos(index - 1, { key, value })
    } else if (pos.after) {
      const index = this.getIndex(pos.after, true)
      this.insertAtPos(index + 1, { key, value })
    } else {
      this.set(key, value)
    }

    return this
  }

  insertAtPos(index, item) {
    return this.splice(index, 0, item)
  }

  delete(key) {
    const index = this.getIndex(key, true)
    this.splice(index, 1)
    return this
  }

  getIndex(key, shouldThrow = false) {
    const index = this.findIndex(entry =>
      (
        entry === key ||
        entry.key === key ||
        (entry.constructor && entry.constructor.name === key)
      )
    )

    if (shouldThrow && index < 0) throw new Error(`Item ${key} not found`)
    return index
  }

  add({ key, value }, strategy = 'append') {
    const index = this.getIndex(key)
    if (index >= 0) this.delete(key)

    switch (strategy) {
      case 'prepend':
        this.unshift({ key, value })
        break
      default:
        this.push({ key, value })
    }

    return this
  }

  values() {
    return this.map(item => item.value)
  }

  keys() {
    return this.map(item => item.key)
  }
}

module.exports = ConfigList
