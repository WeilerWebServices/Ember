import { module, test } from 'qunit';

import Ember from 'ember';

module('Ember.View');

test('does not issue deprecation on create', function(assert){
  assert.expect(1);

  try {
    Ember.View.create();
  } catch(e) {
    assert.ok(false, `An error was thrown unexpectedly: ${e.message}`);
  }

  assert.ok(true, 'No deprecation is thrown');
});

test('does not issue deprecation on reopen', function(assert){
  assert.expect(1);

  try {
    Ember.View.reopen();
  } catch(e) {
    assert.ok(false, `An error was thrown unexpectedly: ${e.message}`);
  }

  assert.ok(true, 'No deprecation is thrown');
});
