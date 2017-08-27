import Store from '../src/store'
import chai, { assert } from 'chai';
import chaiHTTP from 'chai-http';

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

  it('resolves promise from fetch()');
  it('appends callback onto promise chain');
  it('catches promise error');

  it('serializes response into json', function() {
    let response = {
      json() {
        return { foo: 'bar' };
      }
    };

    assert.equal(store.serialize(response).foo, 'bar');
  });
});
