import Store from './store';

/**
 * @module reqt
 */

/**
 * Start an HTTP GET query with the given `resource.`
 *
 * @param String resource
 * @return Store
 */
export function find(resource) {
  return new Store(resource);
}

/**
 * Start an HTTP POST query with the given `resource.`
 *
 * @param String resource
 * @return Store
 */
export function create(resource) {
  return new Store(resource, { method: 'post' });
}

/**
 * Start an HTTP PATCH query with the given `resource.`
 *
 * @param String resource
 * @return Store
 */
export function update(resource) {
  return new Store(resource, { method: 'patch' });
}

/**
 * Start an HTTP PUT query with the given `resource.`
 *
 * @param String resource
 * @return Store
 */
export function replace(resource) {
  return new Store(resource, { method: 'put' });
}

/**
 * Start an HTTP DELETE query with the given `resource.`
 *
 * @param String resource
 * @return Store
 */
export function destroy(resource) {
  return new Store(resource, { method: 'delete' });
}

export default { find, create, update, replace, destroy };
