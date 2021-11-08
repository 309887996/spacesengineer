import React from "react"


class MyPromise {
  static padding = "padding"
  static resolve = "resolve"
  static reject = "reject"

  constructor(executor) {
    this.value = undefined
    this.resaon = undefined
    this.status = MyPromise.padding
    this.callback = []
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    if (value instanceof MyPromise) {
      value.then(this._resolve.bind(this), this._reject.bind(this))
      return
    }
    this.value = value
    this.status = MyPromise.resolve
    this.callback.forEach(cb => {
      this._handler(cb)
    });
  }
  _reject(resaon) {
    if (resaon instanceof MyPromise) {
      resaon.then(this._resolve.bind(this), this._reject.bind(this))
      return
    }
    this.resaon = resaon
    this.status = MyPromise.reject
    this.callback.forEach(cb => {
      this._handler(cb)
    })
  }
  _handler(callback) {
    const { onResolve, onReject, nextResolve, nextReject } = callback
    if (this.status === MyPromise.padding) {
      this.callback.push(callback)
      return
    }
    if (this.status === MyPromise.resolve) {
      const nextValue = onResolve ? onResolve(this.value) : this.value
      nextResolve(nextValue)
      return
    }
    if (this.status === MyPromise.reject) {
      const nextResaon = onReject ? onReject(this.resaon) : this.resaon
      nextReject(nextResaon)
      return
    }
  }

  then(onResolve, onReject) {
    return new MyPromise((nextResolve, nextReject) => {
      this._handler({
        onResolve, onReject, nextResolve, nextReject
      })
    })
  }
}