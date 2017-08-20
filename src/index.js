import Store from './store';

export function find(collection) {
  return new Store(collection);
}

export function create(collection) {
  return new Store(collection, { method: 'post' });
}

export default { find, create };
