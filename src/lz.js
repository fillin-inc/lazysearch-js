import LazySearch from './lazysearch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}

window.onload = function() {
  new LazySearch();
};
