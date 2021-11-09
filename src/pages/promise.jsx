class MyPromise {
  static padding = 'padding';
  static reslove = 'reslove';
  static reject = 'reject';

  constructor(excal) {
    this.callback = [];
    this.value = undefined;
    this.reason = undefined;
    this.status = MyPromise.padding;
    excal(this._resolve.bind(this), this._reject.bind(this));
  }

  _resolve(value) {
    if (value instanceof MyPromise) {
      value.then(this._resolve.bind(this), this._reject.bind(this));
      return;
    }
    this.value = value;
    this.status = MyPromise.reslove;
    this.callback.forEach((cb) => {
      this._handler(cb);
    });
  }
  _reject(reason) {
    if (reason instanceof MyPromise) {
      reason.then(this._resolve.bind(this), this._reject.bind(this));
      return;
    }
    this.reason = reason;
    this.status = MyPromise.reject;
    this.callback.forEach((cb) => {
      this._handler(cb);
    });
  }
  _handler(callback) {
    const { onReslove, onReject, nextReslove, nextReject } = callback;
    if (this.status === 'padding') {
      this.callback.push(callback);
      return;
    }
    if (this.status === 'reslove') {
      const nextValue = onReslove ? onReslove(this.value) : this.value;
      nextReslove(nextValue);
      return;
    }
    if (this.status === 'reject') {
      const nextReason = onReject ? onReject(this.reason) : this.reason;
      nextReject(nextReason);
      return;
    }
  }
  then(onReslove, onReject) {
    return new MyPromise((nextReslove, nextReject) => {
      this._handler({ onReslove, onReject, nextReslove, nextReject });
    });
  }
}
