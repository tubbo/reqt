import Store from './store';

export function find(collection) {
  return new Store(collection);
}

export function create(collection) {
  return new Store(collection, { method: 'post' });
}

export function update(collection) {
  return new Store(collection, { method: 'patch' });
}

export function replace(collection) {
  return new Store(collection, { method: 'put' });
}

export function destroy(collection) {
  return new Store(collection, { method: 'delete' });
}

export default { find, create, update, replace, destroy };
