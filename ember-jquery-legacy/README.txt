ember-jquery-legacy
==============================================================================

Provides a helper function as specified in [RFC294](https://github.com/emberjs/rfcs/blob/master/text/0294-optional-jquery.md#introducing-ember-jquery-legacy-and-deprecating-jqueryevent-usage),
that receives either a [jQuery.Event API](https://api.jquery.com/category/events/event-object/) instance 
(when Ember is running with its jQuery integration enabled) or a native event (no jQuery), and will return a 
native event without triggering any deprecations. 

Installation
------------------------------------------------------------------------------

```
ember install ember-jquery-legacy
```


Usage
------------------------------------------------------------------------------

As part of the effort to decouple Ember from jQuery, using event object APIs that are specific to `jQuery.Event` such as
`originalEvent` are deprecated. Especially addons are urged to not use any jQuery specific APIs, so they are able to
work in a world without jQuery.

Unfortunatly not all native event properties are available directly on an `jQuery.Event` instance. See the
[jQuery.Event API](https://api.jquery.com/category/events/event-object/) for details.

For those other properties it was necessary to get access to the native event object through `originalEvent`. 
To prevent your code from being coupled to jQuery in this way, use the `normalizeEvent` function provided by this addon, 
which will work with our without jQuery to provide the native event without triggering any deprecations.

Before:

```javascript
// your event handler:
click(event) {
  let nativeEvent = event.originalEvent;
  ...
}
```

After:

```javascript
import { normalizeEvent } from 'ember-jquery-legacy';

// your event handler:
click(event) {
  let nativeEvent = normalizeEvent(event);
  ...
}
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-jquery-legacy`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
