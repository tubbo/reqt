import 'whatwg-fetch';
import queryString from 'query-string';
import { extend } from 'lodash';

export default class Store {
  constructor(collection, request = { method: 'get' }) {
    this.collection = collection;
    this.path = collection;
    this.request = request;
    this.query = {};
  }

  get params() {
    return queryString.stringify(this.query);
  }

  get url() {
    return `/${this.path}.json?${this.params}`;
  }

  get fetch() {
    return fetch(this.url, this.request).then(this.serialize);
  }

  byID(id) {
    this.path = `${this.collection}/${id}`;
    return this;
  }

  where(params = {}) {
    extend(this.query, params);
    return this;
  }

  sort(by, direction) {
    this.query.sort = { by, direction };
    return this;
  }

  then(callback) {
    return this.fetch.then(callback);
  }

  done() {
    return this.fetch.then();
  }

  catch(callback) {
    return this.fetch.catch(callback);
  }

  serialize(response) {
    return response.json();
  }
}
