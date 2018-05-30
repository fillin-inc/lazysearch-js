import LazySearch from './lazysearch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}

window.onload = function() {
  const lz = new LazySearch();
  lz.append();
  lz.setEventListner();
};
