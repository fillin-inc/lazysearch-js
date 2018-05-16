import modal from './templates/modal.html'
import result from './templates/result.html'

export default class Template {
  constructor () {
    this._setModal()
    this._setResult()
  }

  modal () {
    return this._modal
  }

  result () {
    return this._result
  }

  _setModal () {
    const el = document.createElement('div')
    el.innerHTML = modal
    this._modal = el.querySelector('[data-lz-modal]')
  }

  _setResult () {
    const el = document.createElement('div')
    el.innerHTML = result
    this._result = el.querySelector('.lz-result')
  }
}
