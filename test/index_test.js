import { find, create, update, replace, destroy } from '../src/index'
import chai, { assert } from 'chai';
import chaiHTTP from 'chai-http';

chai.use(chaiHTTP);

describe('reqt', function() {
  it('finds', function() {
    let { request } = find('artists');
    assert.equal(request.method, 'get');
  });

  it('creates', function() {
    let { request } = create('artists');
    assert.equal(request.method, 'post');
  });

  it('replaces', function() {
    let { request } = replace('artists');
    assert.equal(request.method, 'put');
  });

  it('updates', function() {
    let { request } = update('artists');
    assert.equal(request.method, 'patch');
  });

  it('deletes', function() {
    let { request } = destroy('artists');
    assert.equal(request.method, 'delete');
  });
});
