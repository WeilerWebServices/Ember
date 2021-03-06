import { Primitive, TestWaiter, TestWaiterDebugInfo, WaiterName } from 'ember-test-waiters';

import { DEBUG } from '@glimmer/env';
import Token from './token';
import { register } from './waiter-manager';

function getNextToken(): Token {
  return new Token();
}

class TestWaiterImpl<T extends object | Primitive = Token> implements TestWaiter<T> {
  public name: WaiterName;
  private nextToken: () => T;
  private isRegistered = false;

  items = new Map<T, TestWaiterDebugInfo>();
  completedOperationsForTokens = new WeakMap<Token, boolean>();
  completedOperationsForPrimitives = new Map<Primitive, boolean>();

  constructor(name: WaiterName, nextToken?: () => T) {
    this.name = name;
    // @ts-ignore
    this.nextToken = nextToken || getNextToken;
  }

  beginAsync(token: T = this.nextToken(), label?: string): T {
    this._register();

    if (this.items.has(token)) {
      throw new Error(`beginAsync called for ${token} but it is already pending.`);
    }

    let error = new Error();

    this.items.set(token, {
      get stack() {
        return error.stack;
      },
      label,
    });

    return token;
  }

  endAsync(token: T): void {
    if (!this.items.has(token) && !this._getCompletedOperations(token).has(token)) {
      throw new Error(`endAsync called with no preceding beginAsync call.`);
    }

    this.items.delete(token);
    // Mark when a waiter operation has completed so we can distinguish
    // whether endAsync is being called before a prior beginAsync call above.
    this._getCompletedOperations(token).set(token, true);
  }

  waitUntil(): boolean {
    return this.items.size === 0;
  }

  debugInfo(): TestWaiterDebugInfo[] {
    return [...this.items.values()];
  }

  reset(): void {
    this.items.clear();
  }

  private _register(): void {
    if (!this.isRegistered) {
      register(this);
      this.isRegistered = true;
    }
  }

  private _getCompletedOperations(token: T) {
    let type = typeof token;

    return token !== null || (type !== 'function' && type !== 'object')
      ? this.completedOperationsForPrimitives
      : this.completedOperationsForTokens;
  }
}

class NoopTestWaiter implements TestWaiter {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  beginAsync(): Token {
    return this;
  }

  endAsync(): void {}

  waitUntil(): boolean {
    return true;
  }

  debugInfo(): TestWaiterDebugInfo[] {
    return [];
  }

  reset(): void {}
}

/**
 * Builds and returns a test waiter. The type of the
 * returned waiter is dependent on whether the app or
 * addon is in `DEBUG` mode or not.
 *
 * @public
 *
 * @param name {string} The name of the test waiter
 * @returns {TestWaiter}
 *
 * @example
 *
 * import Component from '@ember/component';
 * import { buildWaiter } from 'ember-test-waiters';
 *
 * if (DEBUG) {
 *   let waiter = buildWaiter('friend-waiter');
 * }
 *
 * export default class Friendz extends Component {
 *   didInsertElement() {
 *     let token = waiter.beginAsync(this);
 *
 *     someAsyncWork().then(() => {
 *       waiter.endAsync(token);
 *     });
 *   }
 * }
 */
export default function buildWaiter(name: string): TestWaiter {
  if (DEBUG) {
    return new TestWaiterImpl(name);
  }
  return new NoopTestWaiter(name);
}
