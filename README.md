# reqt

An Ajax library for modern JS applications, using the [Fetch API][fetch].

[![Build Status](https://travis-ci.org/tubbo/reqt.svg?branch=master)](https://travis-ci.org/tubbo/reqt)

## Features

- Uses the [WHATWG Fetch][whatwg-fetch] polyfill to ensure native
  compatibility in future browsers.
- Lazily makes requests until data is needed
- Most methods are chainable for composability
- Serializes all objects to [JSON][json]
- Encapsulates responses within a [Promise][promises], just like `fetch()`

## Installation

Install with your favorite package manager:

    npm install reqt

...or...

    yarn add reqt

You can also install from source with the following steps:

    git clone https://github.com/tubbo/reqt.git
    cd reqt
    yarn install
    yarn build

## Usage

Reqt initiates all HTTP requests using the `then()` or `done()` methods
to indicate we want to fulfill the promise. Read further to find out how
to make each kind of HTTP request with Reqt:

### Finding Resources

Import the `find()` function to fetch JSON data from your API:

```javascript
import { find } from 'reqt';

find('users').byID('test').done();
```

### Creating resources

You can also use the `create()` function to create new data from
existing actions:

```javascript
import { create } from 'reqt';

let params = {
  name: 'test',
  password: 'password'
};

create('users').with(params).done();
```

### Updating found resources

After finding a resource, it's possible to mass-assign attributes,
update single attributes, or flat-out replace an entire resource using
the `reqt` DSL.

To update a single or collection of attributes on a single resource
(using the `PATCH` method):

```javascript
import { update } from 'reqt';

update('users').byID(1).with({ password: 'newpassword' }).done();
```

You can also replace entire resources with the `PUT` method and the
`replace` action in Reqt:

```javascript
import { replace } from 'reqt';

let params = {
  id: 1,
  username: 'test',
  password: 'newpassword'
};

replace('users').byID(1).with(params).done();
```

### Destroying Resources

After finding a resource, you may want to issue a `DELETE` request. To
do this, run the following:

```javascript
import { destroy } from 'reqt';

destroy('users').byID(1).done();
```

## How It Works

Reqt is a chainable HTTP request builder, meaning most of its methods
just return the initial `Store` object that was instantiated using
`find()` or `create()`. Data is "lazily" loaded, which is achieved
through the use of [Promises][promises]. Since `fetch()` already returns
promises, developers using Reqt are working with an expected API.

## Development

Contributions are encouraged using GitHub Pull Requests. All
contributions must pass the test suite and are subject to the code of
conduct. We also encourage contributors to add to the documentation if
they change the API.

To run the test suite:

    yarn test

To build documentation locally:

    yarn docs

[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[whatwg-fetch]: https://www.npmjs.com/package/whatwg-fetch
[json]: http://json.org/
[promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

