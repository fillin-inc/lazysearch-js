import LazySearch from './LazySearch'
import Promise from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = Promise
}

window.onload = function () {
  LazySearch()
}
