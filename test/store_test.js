import Store from '../src/store'
import chai, { assert } from 'chai';
import chaiHTTP from 'chai-http';
import 'isomorphic-fetch';

chai.use(chaiHTTP);
const store = new Store('test');

describe('Store', function() {
  it('sets base url', function() {
    store.at('http://localhost')

    assert.equal(store.base, 'http://localhost');
  });

  it('sets format', function() {
    store.as('xml');

    assert.equal(store.format, 'xml');
  });

  it('builds url', function() {
    assert.equal(store.url, 'http://localhost/test');

    store.at('http://test.host')
    assert.equal(store.url, 'http://test.host/test');

    store.at('https://test.host')
    assert.equal(store.url, 'https://test.host/test');

    store.at('https://test.host:1337')
    assert.equal(store.url, 'https://test.host:1337/test');
  });

  it('sets request body', function() {
    let body = { foo: 'bar' };
    let json = JSON.stringify(body);

    store.with(body);
    assert.equal(store.request.body, json);

    store.with('somestring');
    assert.equal(store.request.body, 'somestring');
  });

  it('finds by id', function() {
    store.byID(1);
    assert.equal(store.path, 'test/1');
  });

  it('finds by query params', function() {
    store.where({ foo: 'bar'});

    assert.equal(store.query.foo, 'bar');
  });

  it('sorts with query params', function() {
    store.sort('foo', 'descending');

    assert.equal(store.query.sort.by, 'foo');
    assert.equal(store.query.sort.direction, 'descending');
  });

  it('resolves promise from fetch()', function() {
    assert.isEmpty(store.done());
  });

  it('appends callback onto promise chain', function() {
    assert.isEmpty(store.then());
  });

  it('catches promise error', function() {
    store.catch(function() { console.log('caught error'); });
    assert.isEmpty(store.then());
  });

  it('serializes response into json', function() {
    let response = {
      json() {
        return { foo: 'bar' };
      }
    };

    assert.equal(store.serialize(response).foo, 'bar');
  });
});
