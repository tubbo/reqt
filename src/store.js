import 'isomorphic-fetch';
import { extend } from 'lodash';
import url from 'url';

/**
 * Basic query object of the `Reqt` API. This also defines the query
 * language used in Reqt requests.
 */
class Store {
  /**
   * @constructor
   * @param String collection - RESTful resource name
   * @param Object request - Override request parameters in `fetch()`.
   */
  constructor(resource, request = { method: 'get' }) {
    this.collection = resource;
    this.path = `/${this.collection}`;
    this.request = request;
    this.query = {};
    this.base = '/';
    this.port = 80;
    this.format = 'json';
    this.errors = [];
  }

  /**
   * Define the base URL of the request
   *
   * @param string url - Base URL to request from
   */
  at(url) {
    this.base = url;
    return this;
  }

  /**
   * Define the format of the request, expressed as a file extension.
   *
   * @param String format - File extension of the resource
   */
  as(format) {
    this.format = format;
    return this;
  }

  /**
   * Send a payload along with the HTTP request. When the `body` passed
   * in is a JS object, it will be converted into JSON, but if it is a
   * String we will just use the raw value as the body.
   *
   * @param Object body - Payload to be sent.
   */
  with(body = {}) {
    if (typeof body === 'string') {
      this.request.body = body;
    } else {
      this.request.body = JSON.stringify(body);
    }

    return this;
  }

  /**
   * Manipulate the `path` of this request to use the ID given in the
   * argument.
   *
   * @param String id - ID of the resource.
   */
  byID(id) {
    this.path = `${this.collection}/${id}`;
    return this;
  }

  /**
   * Pass the given `params` as query parameters to the request.
   *
   * @param Object params - Query parameters
   */
  where(params = {}) {
    extend(this.query, params);
    return this;
  }

  /**
   * Manipulate the query params to use the given `by` and `direction`
   * values in the `sort` param.
   *
   * @param String by - Param to sort by
   * @param String direction - Direction to sort, e.g. "up", "down",
   */
  sort(by, direction) {
    this.query.sort = { by, direction };
    return this;
  }

  /**
   * Invoke the `Promise` returned by `fetch()` and pass the given
   * callback into it.
   *
   * @param Function callback
   * @return Object the return value of the `Promise`.
   */
  then(callback) {
    return this.fetch.catch(this.errors)
                     .then(callback);
  }

  /**
   * Convenience method for invoking the `Promise` returned by
   * `fetch()`, but not needing to actually pass a callback into it.
   *
   * @return Object the return value of the `Promise`.
   */
  done() {
    return this.then();
  }

  /**
   * Attach a `callback` to the error state of the `Promise` returned by
   * `fetch()`. This function will be called whenever the promise is
   * rejected.
   *
   * @param Function callback
   */
  catch(callback) {
    this.errors.push(callback);
    return this;
  }

  /**
   * @private
   */
  serialize(response) {
    return response.json();
  }

  /**
   * @private
   */
  get url() {
    return url.format({
      host: this.base,
      pathname: this.path,
      query: this.query
    });
  }

  /**
   * @private
   */
  get fetch() {
    return fetch(this.url, this.request).then(this.serialize);
  }
}

export default Store;
