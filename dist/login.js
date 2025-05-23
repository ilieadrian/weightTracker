/*! For license information please see login.js.LICENSE.txt */
(() => {
  "use strict";
  var e = {};
  e.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })();
  const t = function (e) {
      const t = [];
      let n = 0;
      for (let r = 0; r < e.length; r++) {
        let i = e.charCodeAt(r);
        i < 128
          ? (t[n++] = i)
          : i < 2048
            ? ((t[n++] = (i >> 6) | 192), (t[n++] = (63 & i) | 128))
            : 55296 == (64512 & i) &&
                r + 1 < e.length &&
                56320 == (64512 & e.charCodeAt(r + 1))
              ? ((i = 65536 + ((1023 & i) << 10) + (1023 & e.charCodeAt(++r))),
                (t[n++] = (i >> 18) | 240),
                (t[n++] = ((i >> 12) & 63) | 128),
                (t[n++] = ((i >> 6) & 63) | 128),
                (t[n++] = (63 & i) | 128))
              : ((t[n++] = (i >> 12) | 224),
                (t[n++] = ((i >> 6) & 63) | 128),
                (t[n++] = (63 & i) | 128));
      }
      return t;
    },
    n = {
      byteToCharMap_: null,
      charToByteMap_: null,
      byteToCharMapWebSafe_: null,
      charToByteMapWebSafe_: null,
      ENCODED_VALS_BASE:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + "+/=";
      },
      get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + "-_.";
      },
      HAS_NATIVE_SUPPORT: "function" == typeof atob,
      encodeByteArray(e, t) {
        if (!Array.isArray(e))
          throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
          r = [];
        for (let t = 0; t < e.length; t += 3) {
          const i = e[t],
            s = t + 1 < e.length,
            o = s ? e[t + 1] : 0,
            a = t + 2 < e.length,
            c = a ? e[t + 2] : 0,
            u = i >> 2,
            l = ((3 & i) << 4) | (o >> 4);
          let h = ((15 & o) << 2) | (c >> 6),
            d = 63 & c;
          a || ((d = 64), s || (h = 64)), r.push(n[u], n[l], n[h], n[d]);
        }
        return r.join("");
      },
      encodeString(e, n) {
        return this.HAS_NATIVE_SUPPORT && !n
          ? btoa(e)
          : this.encodeByteArray(t(e), n);
      },
      decodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? atob(e)
          : (function (e) {
              const t = [];
              let n = 0,
                r = 0;
              for (; n < e.length; ) {
                const i = e[n++];
                if (i < 128) t[r++] = String.fromCharCode(i);
                else if (i > 191 && i < 224) {
                  const s = e[n++];
                  t[r++] = String.fromCharCode(((31 & i) << 6) | (63 & s));
                } else if (i > 239 && i < 365) {
                  const s =
                    (((7 & i) << 18) |
                      ((63 & e[n++]) << 12) |
                      ((63 & e[n++]) << 6) |
                      (63 & e[n++])) -
                    65536;
                  (t[r++] = String.fromCharCode(55296 + (s >> 10))),
                    (t[r++] = String.fromCharCode(56320 + (1023 & s)));
                } else {
                  const s = e[n++],
                    o = e[n++];
                  t[r++] = String.fromCharCode(
                    ((15 & i) << 12) | ((63 & s) << 6) | (63 & o),
                  );
                }
              }
              return t.join("");
            })(this.decodeStringToByteArray(e, t));
      },
      decodeStringToByteArray(e, t) {
        this.init_();
        const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
          i = [];
        for (let t = 0; t < e.length; ) {
          const s = n[e.charAt(t++)],
            o = t < e.length ? n[e.charAt(t)] : 0;
          ++t;
          const a = t < e.length ? n[e.charAt(t)] : 64;
          ++t;
          const c = t < e.length ? n[e.charAt(t)] : 64;
          if ((++t, null == s || null == o || null == a || null == c))
            throw new r();
          const u = (s << 2) | (o >> 4);
          if ((i.push(u), 64 !== a)) {
            const e = ((o << 4) & 240) | (a >> 2);
            if ((i.push(e), 64 !== c)) {
              const e = ((a << 6) & 192) | c;
              i.push(e);
            }
          }
        }
        return i;
      },
      init_() {
        if (!this.byteToCharMap_) {
          (this.byteToCharMap_ = {}),
            (this.charToByteMap_ = {}),
            (this.byteToCharMapWebSafe_ = {}),
            (this.charToByteMapWebSafe_ = {});
          for (let e = 0; e < this.ENCODED_VALS.length; e++)
            (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
              (this.charToByteMap_[this.byteToCharMap_[e]] = e),
              (this.byteToCharMapWebSafe_[e] =
                this.ENCODED_VALS_WEBSAFE.charAt(e)),
              (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
              e >= this.ENCODED_VALS_BASE.length &&
                ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
                (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
        }
      },
    };
  class r extends Error {
    constructor() {
      super(...arguments), (this.name = "DecodeBase64StringError");
    }
  }
  const i = function (e) {
      return (function (e) {
        const r = t(e);
        return n.encodeByteArray(r, !0);
      })(e).replace(/\./g, "");
    },
    s = function (e) {
      try {
        return n.decodeString(e, !0);
      } catch (e) {
        console.error("base64Decode failed: ", e);
      }
      return null;
    },
    o = () => {
      try {
        return (
          (function () {
            if ("undefined" != typeof self) return self;
            if ("undefined" != typeof window) return window;
            if (void 0 !== e.g) return e.g;
            throw new Error("Unable to locate global object.");
          })().__FIREBASE_DEFAULTS__ ||
          (() => {
            if ("undefined" == typeof process || void 0 === process.env) return;
            const e = process.env.__FIREBASE_DEFAULTS__;
            return e ? JSON.parse(e) : void 0;
          })() ||
          (() => {
            if ("undefined" == typeof document) return;
            let e;
            try {
              e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
            } catch (e) {
              return;
            }
            const t = e && s(e[1]);
            return t && JSON.parse(t);
          })()
        );
      } catch (e) {
        return void console.info(
          `Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`,
        );
      }
    },
    a = (e) => {
      var t, n;
      return null ===
        (n = null === (t = o()) || void 0 === t ? void 0 : t.emulatorHosts) ||
        void 0 === n
        ? void 0
        : n[e];
    },
    c = () => {
      var e;
      return null === (e = o()) || void 0 === e ? void 0 : e.config;
    },
    u = (e) => {
      var t;
      return null === (t = o()) || void 0 === t ? void 0 : t[`_${e}`];
    };
  class l {
    constructor() {
      (this.reject = () => {}),
        (this.resolve = () => {}),
        (this.promise = new Promise((e, t) => {
          (this.resolve = e), (this.reject = t);
        }));
    }
    wrapCallback(e) {
      return (t, n) => {
        t ? this.reject(t) : this.resolve(n),
          "function" == typeof e &&
            (this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, n));
      };
    }
  }
  function h() {
    return "undefined" != typeof navigator &&
      "string" == typeof navigator.userAgent
      ? navigator.userAgent
      : "";
  }
  class d extends Error {
    constructor(e, t, n) {
      super(t),
        (this.code = e),
        (this.customData = n),
        (this.name = "FirebaseError"),
        Object.setPrototypeOf(this, d.prototype),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, f.prototype.create);
    }
  }
  class f {
    constructor(e, t, n) {
      (this.service = e), (this.serviceName = t), (this.errors = n);
    }
    create(e, ...t) {
      const n = t[0] || {},
        r = `${this.service}/${e}`,
        i = this.errors[e],
        s = i
          ? (function (e, t) {
              return e.replace(p, (e, n) => {
                const r = t[n];
                return null != r ? String(r) : `<${n}?>`;
              });
            })(i, n)
          : "Error",
        o = `${this.serviceName}: ${s} (${r}).`;
      return new d(r, o, n);
    }
  }
  const p = /\{\$([^}]+)}/g;
  function g(e, t) {
    if (e === t) return !0;
    const n = Object.keys(e),
      r = Object.keys(t);
    for (const i of n) {
      if (!r.includes(i)) return !1;
      const n = e[i],
        s = t[i];
      if (m(n) && m(s)) {
        if (!g(n, s)) return !1;
      } else if (n !== s) return !1;
    }
    for (const e of r) if (!n.includes(e)) return !1;
    return !0;
  }
  function m(e) {
    return null !== e && "object" == typeof e;
  }
  function y(e) {
    const t = [];
    for (const [n, r] of Object.entries(e))
      Array.isArray(r)
        ? r.forEach((e) => {
            t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e));
          })
        : t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
    return t.length ? "&" + t.join("&") : "";
  }
  function v(e) {
    const t = {};
    return (
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((e) => {
          if (e) {
            const [n, r] = e.split("=");
            t[decodeURIComponent(n)] = decodeURIComponent(r);
          }
        }),
      t
    );
  }
  function w(e) {
    const t = e.indexOf("?");
    if (!t) return "";
    const n = e.indexOf("#", t);
    return e.substring(t, n > 0 ? n : void 0);
  }
  class _ {
    constructor(e, t) {
      (this.observers = []),
        (this.unsubscribes = []),
        (this.observerCount = 0),
        (this.task = Promise.resolve()),
        (this.finalized = !1),
        (this.onNoObservers = t),
        this.task
          .then(() => {
            e(this);
          })
          .catch((e) => {
            this.error(e);
          });
    }
    next(e) {
      this.forEachObserver((t) => {
        t.next(e);
      });
    }
    error(e) {
      this.forEachObserver((t) => {
        t.error(e);
      }),
        this.close(e);
    }
    complete() {
      this.forEachObserver((e) => {
        e.complete();
      }),
        this.close();
    }
    subscribe(e, t, n) {
      let r;
      if (void 0 === e && void 0 === t && void 0 === n)
        throw new Error("Missing Observer.");
      (r = (function (e) {
        if ("object" != typeof e || null === e) return !1;
        for (const t of ["next", "error", "complete"])
          if (t in e && "function" == typeof e[t]) return !0;
        return !1;
      })(e)
        ? e
        : { next: e, error: t, complete: n }),
        void 0 === r.next && (r.next = E),
        void 0 === r.error && (r.error = E),
        void 0 === r.complete && (r.complete = E);
      const i = this.unsubscribeOne.bind(this, this.observers.length);
      return (
        this.finalized &&
          this.task.then(() => {
            try {
              this.finalError ? r.error(this.finalError) : r.complete();
            } catch (e) {}
          }),
        this.observers.push(r),
        i
      );
    }
    unsubscribeOne(e) {
      void 0 !== this.observers &&
        void 0 !== this.observers[e] &&
        (delete this.observers[e],
        (this.observerCount -= 1),
        0 === this.observerCount &&
          void 0 !== this.onNoObservers &&
          this.onNoObservers(this));
    }
    forEachObserver(e) {
      if (!this.finalized)
        for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
    }
    sendOne(e, t) {
      this.task.then(() => {
        if (void 0 !== this.observers && void 0 !== this.observers[e])
          try {
            t(this.observers[e]);
          } catch (e) {
            "undefined" != typeof console && console.error && console.error(e);
          }
      });
    }
    close(e) {
      this.finalized ||
        ((this.finalized = !0),
        void 0 !== e && (this.finalError = e),
        this.task.then(() => {
          (this.observers = void 0), (this.onNoObservers = void 0);
        }));
    }
  }
  function E() {}
  function b(e) {
    return e && e._delegate ? e._delegate : e;
  }
  class I {
    constructor(e, t, n) {
      (this.name = e),
        (this.instanceFactory = t),
        (this.type = n),
        (this.multipleInstances = !1),
        (this.serviceProps = {}),
        (this.instantiationMode = "LAZY"),
        (this.onInstanceCreated = null);
    }
    setInstantiationMode(e) {
      return (this.instantiationMode = e), this;
    }
    setMultipleInstances(e) {
      return (this.multipleInstances = e), this;
    }
    setServiceProps(e) {
      return (this.serviceProps = e), this;
    }
    setInstanceCreatedCallback(e) {
      return (this.onInstanceCreated = e), this;
    }
  }
  const T = "[DEFAULT]";
  class S {
    constructor(e, t) {
      (this.name = e),
        (this.container = t),
        (this.component = null),
        (this.instances = new Map()),
        (this.instancesDeferred = new Map()),
        (this.instancesOptions = new Map()),
        (this.onInitCallbacks = new Map());
    }
    get(e) {
      const t = this.normalizeInstanceIdentifier(e);
      if (!this.instancesDeferred.has(t)) {
        const e = new l();
        if (
          (this.instancesDeferred.set(t, e),
          this.isInitialized(t) || this.shouldAutoInitialize())
        )
          try {
            const n = this.getOrInitializeService({ instanceIdentifier: t });
            n && e.resolve(n);
          } catch (e) {}
      }
      return this.instancesDeferred.get(t).promise;
    }
    getImmediate(e) {
      var t;
      const n = this.normalizeInstanceIdentifier(
          null == e ? void 0 : e.identifier,
        ),
        r = null !== (t = null == e ? void 0 : e.optional) && void 0 !== t && t;
      if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
        if (r) return null;
        throw Error(`Service ${this.name} is not available`);
      }
      try {
        return this.getOrInitializeService({ instanceIdentifier: n });
      } catch (e) {
        if (r) return null;
        throw e;
      }
    }
    getComponent() {
      return this.component;
    }
    setComponent(e) {
      if (e.name !== this.name)
        throw Error(
          `Mismatching Component ${e.name} for Provider ${this.name}.`,
        );
      if (this.component)
        throw Error(`Component for ${this.name} has already been provided`);
      if (((this.component = e), this.shouldAutoInitialize())) {
        if (
          (function (e) {
            return "EAGER" === e.instantiationMode;
          })(e)
        )
          try {
            this.getOrInitializeService({ instanceIdentifier: T });
          } catch (e) {}
        for (const [e, t] of this.instancesDeferred.entries()) {
          const n = this.normalizeInstanceIdentifier(e);
          try {
            const e = this.getOrInitializeService({ instanceIdentifier: n });
            t.resolve(e);
          } catch (e) {}
        }
      }
    }
    clearInstance(e = T) {
      this.instancesDeferred.delete(e),
        this.instancesOptions.delete(e),
        this.instances.delete(e);
    }
    async delete() {
      const e = Array.from(this.instances.values());
      await Promise.all([
        ...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
        ...e.filter((e) => "_delete" in e).map((e) => e._delete()),
      ]);
    }
    isComponentSet() {
      return null != this.component;
    }
    isInitialized(e = T) {
      return this.instances.has(e);
    }
    getOptions(e = T) {
      return this.instancesOptions.get(e) || {};
    }
    initialize(e = {}) {
      const { options: t = {} } = e,
        n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
      if (this.isInitialized(n))
        throw Error(`${this.name}(${n}) has already been initialized`);
      if (!this.isComponentSet())
        throw Error(`Component ${this.name} has not been registered yet`);
      const r = this.getOrInitializeService({
        instanceIdentifier: n,
        options: t,
      });
      for (const [e, t] of this.instancesDeferred.entries())
        n === this.normalizeInstanceIdentifier(e) && t.resolve(r);
      return r;
    }
    onInit(e, t) {
      var n;
      const r = this.normalizeInstanceIdentifier(t),
        i =
          null !== (n = this.onInitCallbacks.get(r)) && void 0 !== n
            ? n
            : new Set();
      i.add(e), this.onInitCallbacks.set(r, i);
      const s = this.instances.get(r);
      return (
        s && e(s, r),
        () => {
          i.delete(e);
        }
      );
    }
    invokeOnInitCallbacks(e, t) {
      const n = this.onInitCallbacks.get(t);
      if (n)
        for (const r of n)
          try {
            r(e, t);
          } catch (e) {}
    }
    getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
      let n = this.instances.get(e);
      if (
        !n &&
        this.component &&
        ((n = this.component.instanceFactory(this.container, {
          instanceIdentifier: ((r = e), r === T ? void 0 : r),
          options: t,
        })),
        this.instances.set(e, n),
        this.instancesOptions.set(e, t),
        this.invokeOnInitCallbacks(n, e),
        this.component.onInstanceCreated)
      )
        try {
          this.component.onInstanceCreated(this.container, e, n);
        } catch (e) {}
      var r;
      return n || null;
    }
    normalizeInstanceIdentifier(e = T) {
      return this.component ? (this.component.multipleInstances ? e : T) : e;
    }
    shouldAutoInitialize() {
      return (
        !!this.component && "EXPLICIT" !== this.component.instantiationMode
      );
    }
  }
  class C {
    constructor(e) {
      (this.name = e), (this.providers = new Map());
    }
    addComponent(e) {
      const t = this.getProvider(e.name);
      if (t.isComponentSet())
        throw new Error(
          `Component ${e.name} has already been registered with ${this.name}`,
        );
      t.setComponent(e);
    }
    addOrOverwriteComponent(e) {
      this.getProvider(e.name).isComponentSet() &&
        this.providers.delete(e.name),
        this.addComponent(e);
    }
    getProvider(e) {
      if (this.providers.has(e)) return this.providers.get(e);
      const t = new S(e, this);
      return this.providers.set(e, t), t;
    }
    getProviders() {
      return Array.from(this.providers.values());
    }
  }
  const A = [];
  var k;
  !(function (e) {
    (e[(e.DEBUG = 0)] = "DEBUG"),
      (e[(e.VERBOSE = 1)] = "VERBOSE"),
      (e[(e.INFO = 2)] = "INFO"),
      (e[(e.WARN = 3)] = "WARN"),
      (e[(e.ERROR = 4)] = "ERROR"),
      (e[(e.SILENT = 5)] = "SILENT");
  })(k || (k = {}));
  const N = {
      debug: k.DEBUG,
      verbose: k.VERBOSE,
      info: k.INFO,
      warn: k.WARN,
      error: k.ERROR,
      silent: k.SILENT,
    },
    R = k.INFO,
    O = {
      [k.DEBUG]: "log",
      [k.VERBOSE]: "log",
      [k.INFO]: "info",
      [k.WARN]: "warn",
      [k.ERROR]: "error",
    },
    P = (e, t, ...n) => {
      if (t < e.logLevel) return;
      const r = new Date().toISOString(),
        i = O[t];
      if (!i)
        throw new Error(
          `Attempted to log a message with an invalid logType (value: ${t})`,
        );
      console[i](`[${r}]  ${e.name}:`, ...n);
    };
  class D {
    constructor(e) {
      (this.name = e),
        (this._logLevel = R),
        (this._logHandler = P),
        (this._userLogHandler = null),
        A.push(this);
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(e) {
      if (!(e in k))
        throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
      this._logLevel = e;
    }
    setLogLevel(e) {
      this._logLevel = "string" == typeof e ? N[e] : e;
    }
    get logHandler() {
      return this._logHandler;
    }
    set logHandler(e) {
      if ("function" != typeof e)
        throw new TypeError(
          "Value assigned to `logHandler` must be a function",
        );
      this._logHandler = e;
    }
    get userLogHandler() {
      return this._userLogHandler;
    }
    set userLogHandler(e) {
      this._userLogHandler = e;
    }
    debug(...e) {
      this._userLogHandler && this._userLogHandler(this, k.DEBUG, ...e),
        this._logHandler(this, k.DEBUG, ...e);
    }
    log(...e) {
      this._userLogHandler && this._userLogHandler(this, k.VERBOSE, ...e),
        this._logHandler(this, k.VERBOSE, ...e);
    }
    info(...e) {
      this._userLogHandler && this._userLogHandler(this, k.INFO, ...e),
        this._logHandler(this, k.INFO, ...e);
    }
    warn(...e) {
      this._userLogHandler && this._userLogHandler(this, k.WARN, ...e),
        this._logHandler(this, k.WARN, ...e);
    }
    error(...e) {
      this._userLogHandler && this._userLogHandler(this, k.ERROR, ...e),
        this._logHandler(this, k.ERROR, ...e);
    }
  }
  let L, x;
  const M = new WeakMap(),
    U = new WeakMap(),
    V = new WeakMap(),
    F = new WeakMap(),
    j = new WeakMap();
  let B = {
    get(e, t, n) {
      if (e instanceof IDBTransaction) {
        if ("done" === t) return U.get(e);
        if ("objectStoreNames" === t) return e.objectStoreNames || V.get(e);
        if ("store" === t)
          return n.objectStoreNames[1]
            ? void 0
            : n.objectStore(n.objectStoreNames[0]);
      }
      return H(e[t]);
    },
    set: (e, t, n) => ((e[t] = n), !0),
    has: (e, t) =>
      (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
      t in e,
  };
  function $(e) {
    return "function" == typeof e
      ? (t = e) !== IDBDatabase.prototype.transaction ||
        "objectStoreNames" in IDBTransaction.prototype
        ? (
            x ||
            (x = [
              IDBCursor.prototype.advance,
              IDBCursor.prototype.continue,
              IDBCursor.prototype.continuePrimaryKey,
            ])
          ).includes(t)
          ? function (...e) {
              return t.apply(z(this), e), H(M.get(this));
            }
          : function (...e) {
              return H(t.apply(z(this), e));
            }
        : function (e, ...n) {
            const r = t.call(z(this), e, ...n);
            return V.set(r, e.sort ? e.sort() : [e]), H(r);
          }
      : (e instanceof IDBTransaction &&
          (function (e) {
            if (U.has(e)) return;
            const t = new Promise((t, n) => {
              const r = () => {
                  e.removeEventListener("complete", i),
                    e.removeEventListener("error", s),
                    e.removeEventListener("abort", s);
                },
                i = () => {
                  t(), r();
                },
                s = () => {
                  n(e.error || new DOMException("AbortError", "AbortError")),
                    r();
                };
              e.addEventListener("complete", i),
                e.addEventListener("error", s),
                e.addEventListener("abort", s);
            });
            U.set(e, t);
          })(e),
        (n = e),
        (
          L ||
          (L = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
          ])
        ).some((e) => n instanceof e)
          ? new Proxy(e, B)
          : e);
    var t, n;
  }
  function H(e) {
    if (e instanceof IDBRequest)
      return (function (e) {
        const t = new Promise((t, n) => {
          const r = () => {
              e.removeEventListener("success", i),
                e.removeEventListener("error", s);
            },
            i = () => {
              t(H(e.result)), r();
            },
            s = () => {
              n(e.error), r();
            };
          e.addEventListener("success", i), e.addEventListener("error", s);
        });
        return (
          t
            .then((t) => {
              t instanceof IDBCursor && M.set(t, e);
            })
            .catch(() => {}),
          j.set(t, e),
          t
        );
      })(e);
    if (F.has(e)) return F.get(e);
    const t = $(e);
    return t !== e && (F.set(e, t), j.set(t, e)), t;
  }
  const z = (e) => j.get(e),
    q = ["get", "getKey", "getAll", "getAllKeys", "count"],
    G = ["put", "add", "delete", "clear"],
    K = new Map();
  function W(e, t) {
    if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
    if (K.get(t)) return K.get(t);
    const n = t.replace(/FromIndex$/, ""),
      r = t !== n,
      i = G.includes(n);
    if (
      !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
      (!i && !q.includes(n))
    )
      return;
    const s = async function (e, ...t) {
      const s = this.transaction(e, i ? "readwrite" : "readonly");
      let o = s.store;
      return (
        r && (o = o.index(t.shift())),
        (await Promise.all([o[n](...t), i && s.done]))[0]
      );
    };
    return K.set(t, s), s;
  }
  var Q;
  (Q = B),
    (B = {
      ...Q,
      get: (e, t, n) => W(e, t) || Q.get(e, t, n),
      has: (e, t) => !!W(e, t) || Q.has(e, t),
    });
  class X {
    constructor(e) {
      this.container = e;
    }
    getPlatformInfoString() {
      return this.container
        .getProviders()
        .map((e) => {
          if (
            (function (e) {
              const t = e.getComponent();
              return "VERSION" === (null == t ? void 0 : t.type);
            })(e)
          ) {
            const t = e.getImmediate();
            return `${t.library}/${t.version}`;
          }
          return null;
        })
        .filter((e) => e)
        .join(" ");
    }
  }
  const J = "@firebase/app",
    Y = "0.11.3",
    Z = new D("@firebase/app"),
    ee = "@firebase/app-compat",
    te = "@firebase/analytics-compat",
    ne = "@firebase/analytics",
    re = "@firebase/app-check-compat",
    ie = "@firebase/app-check",
    se = "@firebase/auth",
    oe = "@firebase/auth-compat",
    ae = "@firebase/database",
    ce = "@firebase/data-connect",
    ue = "@firebase/database-compat",
    le = "@firebase/functions",
    he = "@firebase/functions-compat",
    de = "@firebase/installations",
    fe = "@firebase/installations-compat",
    pe = "@firebase/messaging",
    ge = "@firebase/messaging-compat",
    me = "@firebase/performance",
    ye = "@firebase/performance-compat",
    ve = "@firebase/remote-config",
    we = "@firebase/remote-config-compat",
    _e = "@firebase/storage",
    Ee = "@firebase/storage-compat",
    be = "@firebase/firestore",
    Ie = "@firebase/vertexai",
    Te = "@firebase/firestore-compat",
    Se = "firebase",
    Ce = "[DEFAULT]",
    Ae = {
      [J]: "fire-core",
      [ee]: "fire-core-compat",
      [ne]: "fire-analytics",
      [te]: "fire-analytics-compat",
      [ie]: "fire-app-check",
      [re]: "fire-app-check-compat",
      [se]: "fire-auth",
      [oe]: "fire-auth-compat",
      [ae]: "fire-rtdb",
      [ce]: "fire-data-connect",
      [ue]: "fire-rtdb-compat",
      [le]: "fire-fn",
      [he]: "fire-fn-compat",
      [de]: "fire-iid",
      [fe]: "fire-iid-compat",
      [pe]: "fire-fcm",
      [ge]: "fire-fcm-compat",
      [me]: "fire-perf",
      [ye]: "fire-perf-compat",
      [ve]: "fire-rc",
      [we]: "fire-rc-compat",
      [_e]: "fire-gcs",
      [Ee]: "fire-gcs-compat",
      [be]: "fire-fst",
      [Te]: "fire-fst-compat",
      [Ie]: "fire-vertex",
      "fire-js": "fire-js",
      [Se]: "fire-js-all",
    },
    ke = new Map(),
    Ne = new Map(),
    Re = new Map();
  function Oe(e, t) {
    try {
      e.container.addComponent(t);
    } catch (n) {
      Z.debug(
        `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
        n,
      );
    }
  }
  function Pe(e) {
    const t = e.name;
    if (Re.has(t))
      return (
        Z.debug(`There were multiple attempts to register component ${t}.`), !1
      );
    Re.set(t, e);
    for (const t of ke.values()) Oe(t, e);
    for (const t of Ne.values()) Oe(t, e);
    return !0;
  }
  function De(e, t) {
    const n = e.container
      .getProvider("heartbeat")
      .getImmediate({ optional: !0 });
    return n && n.triggerHeartbeat(), e.container.getProvider(t);
  }
  function Le(e) {
    return null != e && void 0 !== e.settings;
  }
  const xe = new f("app", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported":
      "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment":
      "FirebaseServerApp is not for use in browser environments.",
  });
  class Me {
    constructor(e, t, n) {
      (this._isDeleted = !1),
        (this._options = Object.assign({}, e)),
        (this._config = Object.assign({}, t)),
        (this._name = t.name),
        (this._automaticDataCollectionEnabled =
          t.automaticDataCollectionEnabled),
        (this._container = n),
        this.container.addComponent(new I("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
      return this.checkDestroyed(), this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
    }
    get name() {
      return this.checkDestroyed(), this._name;
    }
    get options() {
      return this.checkDestroyed(), this._options;
    }
    get config() {
      return this.checkDestroyed(), this._config;
    }
    get container() {
      return this._container;
    }
    get isDeleted() {
      return this._isDeleted;
    }
    set isDeleted(e) {
      this._isDeleted = e;
    }
    checkDestroyed() {
      if (this.isDeleted)
        throw xe.create("app-deleted", { appName: this._name });
    }
  }
  const Ue = "11.5.0";
  function Ve(e, t = {}) {
    let n = e;
    "object" != typeof t && (t = { name: t });
    const r = Object.assign(
        { name: Ce, automaticDataCollectionEnabled: !1 },
        t,
      ),
      i = r.name;
    if ("string" != typeof i || !i)
      throw xe.create("bad-app-name", { appName: String(i) });
    if ((n || (n = c()), !n)) throw xe.create("no-options");
    const s = ke.get(i);
    if (s) {
      if (g(n, s.options) && g(r, s.config)) return s;
      throw xe.create("duplicate-app", { appName: i });
    }
    const o = new C(i);
    for (const e of Re.values()) o.addComponent(e);
    const a = new Me(n, r, o);
    return ke.set(i, a), a;
  }
  function Fe(e = Ce) {
    const t = ke.get(e);
    if (!t && e === Ce && c()) return Ve();
    if (!t) throw xe.create("no-app", { appName: e });
    return t;
  }
  function je(e, t, n) {
    var r;
    let i = null !== (r = Ae[e]) && void 0 !== r ? r : e;
    n && (i += `-${n}`);
    const s = i.match(/\s|\//),
      o = t.match(/\s|\//);
    if (s || o) {
      const e = [`Unable to register library "${i}" with version "${t}":`];
      return (
        s &&
          e.push(
            `library name "${i}" contains illegal characters (whitespace or "/")`,
          ),
        s && o && e.push("and"),
        o &&
          e.push(
            `version name "${t}" contains illegal characters (whitespace or "/")`,
          ),
        void Z.warn(e.join(" "))
      );
    }
    Pe(new I(`${i}-version`, () => ({ library: i, version: t }), "VERSION"));
  }
  const Be = "firebase-heartbeat-store";
  let $e = null;
  function He() {
    return (
      $e ||
        ($e = (function (
          e,
          t,
          { blocked: n, upgrade: r, blocking: i, terminated: s } = {},
        ) {
          const o = indexedDB.open(e, t),
            a = H(o);
          return (
            r &&
              o.addEventListener("upgradeneeded", (e) => {
                r(H(o.result), e.oldVersion, e.newVersion, H(o.transaction), e);
              }),
            n &&
              o.addEventListener("blocked", (e) =>
                n(e.oldVersion, e.newVersion, e),
              ),
            a
              .then((e) => {
                s && e.addEventListener("close", () => s()),
                  i &&
                    e.addEventListener("versionchange", (e) =>
                      i(e.oldVersion, e.newVersion, e),
                    );
              })
              .catch(() => {}),
            a
          );
        })("firebase-heartbeat-database", 1, {
          upgrade: (e, t) => {
            if (0 === t)
              try {
                e.createObjectStore(Be);
              } catch (e) {
                console.warn(e);
              }
          },
        }).catch((e) => {
          throw xe.create("idb-open", { originalErrorMessage: e.message });
        })),
      $e
    );
  }
  async function ze(e, t) {
    try {
      const n = (await He()).transaction(Be, "readwrite"),
        r = n.objectStore(Be);
      await r.put(t, qe(e)), await n.done;
    } catch (e) {
      if (e instanceof d) Z.warn(e.message);
      else {
        const t = xe.create("idb-set", {
          originalErrorMessage: null == e ? void 0 : e.message,
        });
        Z.warn(t.message);
      }
    }
  }
  function qe(e) {
    return `${e.name}!${e.options.appId}`;
  }
  class Ge {
    constructor(e) {
      (this.container = e), (this._heartbeatsCache = null);
      const t = this.container.getProvider("app").getImmediate();
      (this._storage = new We(t)),
        (this._heartbeatsCachePromise = this._storage
          .read()
          .then((e) => ((this._heartbeatsCache = e), e)));
    }
    async triggerHeartbeat() {
      var e, t;
      try {
        const n = this.container
            .getProvider("platform-logger")
            .getImmediate()
            .getPlatformInfoString(),
          r = Ke();
        if (
          null ==
            (null === (e = this._heartbeatsCache) || void 0 === e
              ? void 0
              : e.heartbeats) &&
          ((this._heartbeatsCache = await this._heartbeatsCachePromise),
          null ==
            (null === (t = this._heartbeatsCache) || void 0 === t
              ? void 0
              : t.heartbeats))
        )
          return;
        if (
          this._heartbeatsCache.lastSentHeartbeatDate === r ||
          this._heartbeatsCache.heartbeats.some((e) => e.date === r)
        )
          return;
        if (
          (this._heartbeatsCache.heartbeats.push({ date: r, agent: n }),
          this._heartbeatsCache.heartbeats.length > 30)
        ) {
          const e = (function (e) {
            if (0 === e.length) return -1;
            let t = 0,
              n = e[0].date;
            for (let r = 1; r < e.length; r++)
              e[r].date < n && ((n = e[r].date), (t = r));
            return t;
          })(this._heartbeatsCache.heartbeats);
          this._heartbeatsCache.heartbeats.splice(e, 1);
        }
        return this._storage.overwrite(this._heartbeatsCache);
      } catch (e) {
        Z.warn(e);
      }
    }
    async getHeartbeatsHeader() {
      var e;
      try {
        if (
          (null === this._heartbeatsCache &&
            (await this._heartbeatsCachePromise),
          null ==
            (null === (e = this._heartbeatsCache) || void 0 === e
              ? void 0
              : e.heartbeats) || 0 === this._heartbeatsCache.heartbeats.length)
        )
          return "";
        const t = Ke(),
          { heartbeatsToSend: n, unsentEntries: r } = (function (e, t = 1024) {
            const n = [];
            let r = e.slice();
            for (const i of e) {
              const e = n.find((e) => e.agent === i.agent);
              if (e) {
                if ((e.dates.push(i.date), Qe(n) > t)) {
                  e.dates.pop();
                  break;
                }
              } else if (
                (n.push({ agent: i.agent, dates: [i.date] }), Qe(n) > t)
              ) {
                n.pop();
                break;
              }
              r = r.slice(1);
            }
            return { heartbeatsToSend: n, unsentEntries: r };
          })(this._heartbeatsCache.heartbeats),
          s = i(JSON.stringify({ version: 2, heartbeats: n }));
        return (
          (this._heartbeatsCache.lastSentHeartbeatDate = t),
          r.length > 0
            ? ((this._heartbeatsCache.heartbeats = r),
              await this._storage.overwrite(this._heartbeatsCache))
            : ((this._heartbeatsCache.heartbeats = []),
              this._storage.overwrite(this._heartbeatsCache)),
          s
        );
      } catch (e) {
        return Z.warn(e), "";
      }
    }
  }
  function Ke() {
    return new Date().toISOString().substring(0, 10);
  }
  class We {
    constructor(e) {
      (this.app = e),
        (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
    }
    async runIndexedDBEnvironmentCheck() {
      return (
        !!(function () {
          try {
            return "object" == typeof indexedDB;
          } catch (e) {
            return !1;
          }
        })() &&
        new Promise((e, t) => {
          try {
            let n = !0;
            const r = "validate-browser-context-for-indexeddb-analytics-module",
              i = self.indexedDB.open(r);
            (i.onsuccess = () => {
              i.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
            }),
              (i.onupgradeneeded = () => {
                n = !1;
              }),
              (i.onerror = () => {
                var e;
                t(
                  (null === (e = i.error) || void 0 === e
                    ? void 0
                    : e.message) || "",
                );
              });
          } catch (e) {
            t(e);
          }
        })
          .then(() => !0)
          .catch(() => !1)
      );
    }
    async read() {
      if (await this._canUseIndexedDBPromise) {
        const e = await (async function (e) {
          try {
            const t = (await He()).transaction(Be),
              n = await t.objectStore(Be).get(qe(e));
            return await t.done, n;
          } catch (e) {
            if (e instanceof d) Z.warn(e.message);
            else {
              const t = xe.create("idb-get", {
                originalErrorMessage: null == e ? void 0 : e.message,
              });
              Z.warn(t.message);
            }
          }
        })(this.app);
        return (null == e ? void 0 : e.heartbeats) ? e : { heartbeats: [] };
      }
      return { heartbeats: [] };
    }
    async overwrite(e) {
      var t;
      if (await this._canUseIndexedDBPromise) {
        const n = await this.read();
        return ze(this.app, {
          lastSentHeartbeatDate:
            null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
              ? t
              : n.lastSentHeartbeatDate,
          heartbeats: e.heartbeats,
        });
      }
    }
    async add(e) {
      var t;
      if (await this._canUseIndexedDBPromise) {
        const n = await this.read();
        return ze(this.app, {
          lastSentHeartbeatDate:
            null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
              ? t
              : n.lastSentHeartbeatDate,
          heartbeats: [...n.heartbeats, ...e.heartbeats],
        });
      }
    }
  }
  function Qe(e) {
    return i(JSON.stringify({ version: 2, heartbeats: e })).length;
  }
  function Xe(e, t) {
    var n = {};
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
      var i = 0;
      for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
        t.indexOf(r[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
          (n[r[i]] = e[r[i]]);
    }
    return n;
  }
  Pe(new I("platform-logger", (e) => new X(e), "PRIVATE")),
    Pe(new I("heartbeat", (e) => new Ge(e), "PRIVATE")),
    je(J, Y, ""),
    je(J, Y, "esm2017"),
    je("fire-js", ""),
    je("firebase", "11.5.0", "app"),
    Object.create,
    Object.create,
    "function" == typeof SuppressedError && SuppressedError;
  const Je = function () {
      return {
        "dependent-sdk-initialized-before-auth":
          "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
      };
    },
    Ye = new f("auth", "Firebase", {
      "dependent-sdk-initialized-before-auth":
        "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
    }),
    Ze = new D("@firebase/auth");
  function et(e, ...t) {
    Ze.logLevel <= k.ERROR && Ze.error(`Auth (${Ue}): ${e}`, ...t);
  }
  function tt(e, ...t) {
    throw st(e, ...t);
  }
  function nt(e, ...t) {
    return st(e, ...t);
  }
  function rt(e, t, n) {
    const r = Object.assign(Object.assign({}, Je()), { [t]: n });
    return new f("auth", "Firebase", r).create(t, { appName: e.name });
  }
  function it(e) {
    return rt(
      e,
      "operation-not-supported-in-this-environment",
      "Operations that alter the current user are not supported in conjunction with FirebaseServerApp",
    );
  }
  function st(e, ...t) {
    if ("string" != typeof e) {
      const n = t[0],
        r = [...t.slice(1)];
      return r[0] && (r[0].appName = e.name), e._errorFactory.create(n, ...r);
    }
    return Ye.create(e, ...t);
  }
  function ot(e, t, ...n) {
    if (!e) throw st(t, ...n);
  }
  function at(e) {
    const t = "INTERNAL ASSERTION FAILED: " + e;
    throw (et(t), new Error(t));
  }
  function ct(e, t) {
    e || at(t);
  }
  function ut() {
    var e;
    return (
      ("undefined" != typeof self &&
        (null === (e = self.location) || void 0 === e ? void 0 : e.href)) ||
      ""
    );
  }
  function lt() {
    var e;
    return (
      ("undefined" != typeof self &&
        (null === (e = self.location) || void 0 === e ? void 0 : e.protocol)) ||
      null
    );
  }
  function ht() {
    return (
      !(
        "undefined" != typeof navigator &&
        navigator &&
        "onLine" in navigator &&
        "boolean" == typeof navigator.onLine &&
        ("http:" === lt() ||
          "https:" === lt() ||
          (function () {
            const e =
              "object" == typeof chrome
                ? chrome.runtime
                : "object" == typeof browser
                  ? browser.runtime
                  : void 0;
            return "object" == typeof e && void 0 !== e.id;
          })() ||
          "connection" in navigator)
      ) || navigator.onLine
    );
  }
  class dt {
    constructor(e, t) {
      (this.shortDelay = e),
        (this.longDelay = t),
        ct(t > e, "Short delay should be less than long delay!"),
        (this.isMobile =
          ("undefined" != typeof window &&
            !!(window.cordova || window.phonegap || window.PhoneGap) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(h())) ||
          ("object" == typeof navigator &&
            "ReactNative" === navigator.product));
    }
    get() {
      return ht()
        ? this.isMobile
          ? this.longDelay
          : this.shortDelay
        : Math.min(5e3, this.shortDelay);
    }
  }
  function ft(e, t) {
    ct(e.emulator, "Emulator should always be set here");
    const { url: n } = e.emulator;
    return t ? `${n}${t.startsWith("/") ? t.slice(1) : t}` : n;
  }
  class pt {
    static initialize(e, t, n) {
      (this.fetchImpl = e),
        t && (this.headersImpl = t),
        n && (this.responseImpl = n);
    }
    static fetch() {
      return this.fetchImpl
        ? this.fetchImpl
        : "undefined" != typeof self && "fetch" in self
          ? self.fetch
          : "undefined" != typeof globalThis && globalThis.fetch
            ? globalThis.fetch
            : "undefined" != typeof fetch
              ? fetch
              : void at(
                  "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
                );
    }
    static headers() {
      return this.headersImpl
        ? this.headersImpl
        : "undefined" != typeof self && "Headers" in self
          ? self.Headers
          : "undefined" != typeof globalThis && globalThis.Headers
            ? globalThis.Headers
            : "undefined" != typeof Headers
              ? Headers
              : void at(
                  "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
                );
    }
    static response() {
      return this.responseImpl
        ? this.responseImpl
        : "undefined" != typeof self && "Response" in self
          ? self.Response
          : "undefined" != typeof globalThis && globalThis.Response
            ? globalThis.Response
            : "undefined" != typeof Response
              ? Response
              : void at(
                  "Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
                );
    }
  }
  const gt = {
      CREDENTIAL_MISMATCH: "custom-token-mismatch",
      MISSING_CUSTOM_TOKEN: "internal-error",
      INVALID_IDENTIFIER: "invalid-email",
      MISSING_CONTINUE_URI: "internal-error",
      INVALID_PASSWORD: "wrong-password",
      MISSING_PASSWORD: "missing-password",
      INVALID_LOGIN_CREDENTIALS: "invalid-credential",
      EMAIL_EXISTS: "email-already-in-use",
      PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
      INVALID_IDP_RESPONSE: "invalid-credential",
      INVALID_PENDING_TOKEN: "invalid-credential",
      FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
      MISSING_REQ_TYPE: "internal-error",
      EMAIL_NOT_FOUND: "user-not-found",
      RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
      EXPIRED_OOB_CODE: "expired-action-code",
      INVALID_OOB_CODE: "invalid-action-code",
      MISSING_OOB_CODE: "internal-error",
      CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
      INVALID_ID_TOKEN: "invalid-user-token",
      TOKEN_EXPIRED: "user-token-expired",
      USER_NOT_FOUND: "user-token-expired",
      TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
      PASSWORD_DOES_NOT_MEET_REQUIREMENTS:
        "password-does-not-meet-requirements",
      INVALID_CODE: "invalid-verification-code",
      INVALID_SESSION_INFO: "invalid-verification-id",
      INVALID_TEMPORARY_PROOF: "invalid-credential",
      MISSING_SESSION_INFO: "missing-verification-id",
      SESSION_EXPIRED: "code-expired",
      MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
      UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
      INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
      ADMIN_ONLY_OPERATION: "admin-restricted-operation",
      INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
      MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
      MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
      MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
      SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
      SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
      BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
      RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
      MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
      INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
      INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
      MISSING_CLIENT_TYPE: "missing-client-type",
      MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
      INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
      INVALID_REQ_TYPE: "invalid-req-type",
    },
    mt = new dt(3e4, 6e4);
  function yt(e, t) {
    return e.tenantId && !t.tenantId
      ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
      : t;
  }
  async function vt(e, t, n, r, i = {}) {
    return wt(e, i, async () => {
      let i = {},
        s = {};
      r && ("GET" === t ? (s = r) : (i = { body: JSON.stringify(r) }));
      const o = y(Object.assign({ key: e.config.apiKey }, s)).slice(1),
        a = await e._getAdditionalHeaders();
      (a["Content-Type"] = "application/json"),
        e.languageCode && (a["X-Firebase-Locale"] = e.languageCode);
      const c = Object.assign({ method: t, headers: a }, i);
      return (
        ("undefined" != typeof navigator &&
          "Cloudflare-Workers" === navigator.userAgent) ||
          (c.referrerPolicy = "no-referrer"),
        pt.fetch()(Et(e, e.config.apiHost, n, o), c)
      );
    });
  }
  async function wt(e, t, n) {
    e._canInitEmulator = !1;
    const r = Object.assign(Object.assign({}, gt), t);
    try {
      const t = new It(e),
        i = await Promise.race([n(), t.promise]);
      t.clearNetworkTimeout();
      const s = await i.json();
      if ("needConfirmation" in s)
        throw Tt(e, "account-exists-with-different-credential", s);
      if (i.ok && !("errorMessage" in s)) return s;
      {
        const t = i.ok ? s.errorMessage : s.error.message,
          [n, o] = t.split(" : ");
        if ("FEDERATED_USER_ID_ALREADY_LINKED" === n)
          throw Tt(e, "credential-already-in-use", s);
        if ("EMAIL_EXISTS" === n) throw Tt(e, "email-already-in-use", s);
        if ("USER_DISABLED" === n) throw Tt(e, "user-disabled", s);
        const a = r[n] || n.toLowerCase().replace(/[_\s]+/g, "-");
        if (o) throw rt(e, a, o);
        tt(e, a);
      }
    } catch (t) {
      if (t instanceof d) throw t;
      tt(e, "network-request-failed", { message: String(t) });
    }
  }
  async function _t(e, t, n, r, i = {}) {
    const s = await vt(e, t, n, r, i);
    return (
      "mfaPendingCredential" in s &&
        tt(e, "multi-factor-auth-required", { _serverResponse: s }),
      s
    );
  }
  function Et(e, t, n, r) {
    const i = `${t}${n}?${r}`;
    return e.config.emulator ? ft(e.config, i) : `${e.config.apiScheme}://${i}`;
  }
  function bt(e) {
    switch (e) {
      case "ENFORCE":
        return "ENFORCE";
      case "AUDIT":
        return "AUDIT";
      case "OFF":
        return "OFF";
      default:
        return "ENFORCEMENT_STATE_UNSPECIFIED";
    }
  }
  class It {
    clearNetworkTimeout() {
      clearTimeout(this.timer);
    }
    constructor(e) {
      (this.auth = e),
        (this.timer = null),
        (this.promise = new Promise((e, t) => {
          this.timer = setTimeout(
            () => t(nt(this.auth, "network-request-failed")),
            mt.get(),
          );
        }));
    }
  }
  function Tt(e, t, n) {
    const r = { appName: e.name };
    n.email && (r.email = n.email),
      n.phoneNumber && (r.phoneNumber = n.phoneNumber);
    const i = nt(e, t, r);
    return (i.customData._tokenResponse = n), i;
  }
  function St(e) {
    return void 0 !== e && void 0 !== e.enterprise;
  }
  class Ct {
    constructor(e) {
      if (
        ((this.siteKey = ""),
        (this.recaptchaEnforcementState = []),
        void 0 === e.recaptchaKey)
      )
        throw new Error("recaptchaKey undefined");
      (this.siteKey = e.recaptchaKey.split("/")[3]),
        (this.recaptchaEnforcementState = e.recaptchaEnforcementState);
    }
    getProviderEnforcementState(e) {
      if (
        !this.recaptchaEnforcementState ||
        0 === this.recaptchaEnforcementState.length
      )
        return null;
      for (const t of this.recaptchaEnforcementState)
        if (t.provider && t.provider === e) return bt(t.enforcementState);
      return null;
    }
    isProviderEnabled(e) {
      return (
        "ENFORCE" === this.getProviderEnforcementState(e) ||
        "AUDIT" === this.getProviderEnforcementState(e)
      );
    }
    isAnyProviderEnabled() {
      return (
        this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") ||
        this.isProviderEnabled("PHONE_PROVIDER")
      );
    }
  }
  async function At(e, t) {
    return vt(e, "GET", "/v2/recaptchaConfig", yt(e, t));
  }
  async function kt(e, t) {
    return vt(e, "POST", "/v1/accounts:lookup", t);
  }
  function Nt(e) {
    if (e)
      try {
        const t = new Date(Number(e));
        if (!isNaN(t.getTime())) return t.toUTCString();
      } catch (e) {}
  }
  function Rt(e) {
    return 1e3 * Number(e);
  }
  function Ot(e) {
    const [t, n, r] = e.split(".");
    if (void 0 === t || void 0 === n || void 0 === r)
      return et("JWT malformed, contained fewer than 3 sections"), null;
    try {
      const e = s(n);
      return e
        ? JSON.parse(e)
        : (et("Failed to decode base64 JWT payload"), null);
    } catch (e) {
      return (
        et(
          "Caught error parsing JWT payload as JSON",
          null == e ? void 0 : e.toString(),
        ),
        null
      );
    }
  }
  function Pt(e) {
    const t = Ot(e);
    return (
      ot(t, "internal-error"),
      ot(void 0 !== t.exp, "internal-error"),
      ot(void 0 !== t.iat, "internal-error"),
      Number(t.exp) - Number(t.iat)
    );
  }
  async function Dt(e, t, n = !1) {
    if (n) return t;
    try {
      return await t;
    } catch (t) {
      throw (
        (t instanceof d &&
          (function ({ code: e }) {
            return (
              "auth/user-disabled" === e || "auth/user-token-expired" === e
            );
          })(t) &&
          e.auth.currentUser === e &&
          (await e.auth.signOut()),
        t)
      );
    }
  }
  class Lt {
    constructor(e) {
      (this.user = e),
        (this.isRunning = !1),
        (this.timerId = null),
        (this.errorBackoff = 3e4);
    }
    _start() {
      this.isRunning || ((this.isRunning = !0), this.schedule());
    }
    _stop() {
      this.isRunning &&
        ((this.isRunning = !1),
        null !== this.timerId && clearTimeout(this.timerId));
    }
    getInterval(e) {
      var t;
      if (e) {
        const e = this.errorBackoff;
        return (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), e;
      }
      {
        this.errorBackoff = 3e4;
        const e =
          (null !== (t = this.user.stsTokenManager.expirationTime) &&
          void 0 !== t
            ? t
            : 0) -
          Date.now() -
          3e5;
        return Math.max(0, e);
      }
    }
    schedule(e = !1) {
      if (!this.isRunning) return;
      const t = this.getInterval(e);
      this.timerId = setTimeout(async () => {
        await this.iteration();
      }, t);
    }
    async iteration() {
      try {
        await this.user.getIdToken(!0);
      } catch (e) {
        return void (
          "auth/network-request-failed" === (null == e ? void 0 : e.code) &&
          this.schedule(!0)
        );
      }
      this.schedule();
    }
  }
  class xt {
    constructor(e, t) {
      (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
    }
    _initializeTime() {
      (this.lastSignInTime = Nt(this.lastLoginAt)),
        (this.creationTime = Nt(this.createdAt));
    }
    _copy(e) {
      (this.createdAt = e.createdAt),
        (this.lastLoginAt = e.lastLoginAt),
        this._initializeTime();
    }
    toJSON() {
      return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
    }
  }
  async function Mt(e) {
    var t;
    const n = e.auth,
      r = await e.getIdToken(),
      i = await Dt(e, kt(n, { idToken: r }));
    ot(null == i ? void 0 : i.users.length, n, "internal-error");
    const s = i.users[0];
    e._notifyReloadListener(s);
    const o = (
        null === (t = s.providerUserInfo) || void 0 === t ? void 0 : t.length
      )
        ? Ut(s.providerUserInfo)
        : [],
      a =
        ((c = e.providerData),
        (u = o),
        [
          ...c.filter((e) => !u.some((t) => t.providerId === e.providerId)),
          ...u,
        ]);
    var c, u;
    const l = e.isAnonymous,
      h = !((e.email && s.passwordHash) || (null == a ? void 0 : a.length)),
      d = !!l && h,
      f = {
        uid: s.localId,
        displayName: s.displayName || null,
        photoURL: s.photoUrl || null,
        email: s.email || null,
        emailVerified: s.emailVerified || !1,
        phoneNumber: s.phoneNumber || null,
        tenantId: s.tenantId || null,
        providerData: a,
        metadata: new xt(s.createdAt, s.lastLoginAt),
        isAnonymous: d,
      };
    Object.assign(e, f);
  }
  function Ut(e) {
    return e.map((e) => {
      var { providerId: t } = e,
        n = Xe(e, ["providerId"]);
      return {
        providerId: t,
        uid: n.rawId || "",
        displayName: n.displayName || null,
        email: n.email || null,
        phoneNumber: n.phoneNumber || null,
        photoURL: n.photoUrl || null,
      };
    });
  }
  class Vt {
    constructor() {
      (this.refreshToken = null),
        (this.accessToken = null),
        (this.expirationTime = null);
    }
    get isExpired() {
      return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
    }
    updateFromServerResponse(e) {
      ot(e.idToken, "internal-error"),
        ot(void 0 !== e.idToken, "internal-error"),
        ot(void 0 !== e.refreshToken, "internal-error");
      const t =
        "expiresIn" in e && void 0 !== e.expiresIn
          ? Number(e.expiresIn)
          : Pt(e.idToken);
      this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
    }
    updateFromIdToken(e) {
      ot(0 !== e.length, "internal-error");
      const t = Pt(e);
      this.updateTokensAndExpiration(e, null, t);
    }
    async getToken(e, t = !1) {
      return t || !this.accessToken || this.isExpired
        ? (ot(this.refreshToken, e, "user-token-expired"),
          this.refreshToken
            ? (await this.refresh(e, this.refreshToken), this.accessToken)
            : null)
        : this.accessToken;
    }
    clearRefreshToken() {
      this.refreshToken = null;
    }
    async refresh(e, t) {
      const {
        accessToken: n,
        refreshToken: r,
        expiresIn: i,
      } = await (async function (e, t) {
        const n = await wt(e, {}, async () => {
          const n = y({ grant_type: "refresh_token", refresh_token: t }).slice(
              1,
            ),
            { tokenApiHost: r, apiKey: i } = e.config,
            s = Et(e, r, "/v1/token", `key=${i}`),
            o = await e._getAdditionalHeaders();
          return (
            (o["Content-Type"] = "application/x-www-form-urlencoded"),
            pt.fetch()(s, { method: "POST", headers: o, body: n })
          );
        });
        return {
          accessToken: n.access_token,
          expiresIn: n.expires_in,
          refreshToken: n.refresh_token,
        };
      })(e, t);
      this.updateTokensAndExpiration(n, r, Number(i));
    }
    updateTokensAndExpiration(e, t, n) {
      (this.refreshToken = t || null),
        (this.accessToken = e || null),
        (this.expirationTime = Date.now() + 1e3 * n);
    }
    static fromJSON(e, t) {
      const { refreshToken: n, accessToken: r, expirationTime: i } = t,
        s = new Vt();
      return (
        n &&
          (ot("string" == typeof n, "internal-error", { appName: e }),
          (s.refreshToken = n)),
        r &&
          (ot("string" == typeof r, "internal-error", { appName: e }),
          (s.accessToken = r)),
        i &&
          (ot("number" == typeof i, "internal-error", { appName: e }),
          (s.expirationTime = i)),
        s
      );
    }
    toJSON() {
      return {
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
        expirationTime: this.expirationTime,
      };
    }
    _assign(e) {
      (this.accessToken = e.accessToken),
        (this.refreshToken = e.refreshToken),
        (this.expirationTime = e.expirationTime);
    }
    _clone() {
      return Object.assign(new Vt(), this.toJSON());
    }
    _performRefresh() {
      return at("not implemented");
    }
  }
  function Ft(e, t) {
    ot("string" == typeof e || void 0 === e, "internal-error", { appName: t });
  }
  class jt {
    constructor(e) {
      var { uid: t, auth: n, stsTokenManager: r } = e,
        i = Xe(e, ["uid", "auth", "stsTokenManager"]);
      (this.providerId = "firebase"),
        (this.proactiveRefresh = new Lt(this)),
        (this.reloadUserInfo = null),
        (this.reloadListener = null),
        (this.uid = t),
        (this.auth = n),
        (this.stsTokenManager = r),
        (this.accessToken = r.accessToken),
        (this.displayName = i.displayName || null),
        (this.email = i.email || null),
        (this.emailVerified = i.emailVerified || !1),
        (this.phoneNumber = i.phoneNumber || null),
        (this.photoURL = i.photoURL || null),
        (this.isAnonymous = i.isAnonymous || !1),
        (this.tenantId = i.tenantId || null),
        (this.providerData = i.providerData ? [...i.providerData] : []),
        (this.metadata = new xt(
          i.createdAt || void 0,
          i.lastLoginAt || void 0,
        ));
    }
    async getIdToken(e) {
      const t = await Dt(this, this.stsTokenManager.getToken(this.auth, e));
      return (
        ot(t, this.auth, "internal-error"),
        this.accessToken !== t &&
          ((this.accessToken = t),
          await this.auth._persistUserIfCurrent(this),
          this.auth._notifyListenersIfCurrent(this)),
        t
      );
    }
    getIdTokenResult(e) {
      return (async function (e, t = !1) {
        const n = b(e),
          r = await n.getIdToken(t),
          i = Ot(r);
        ot(i && i.exp && i.auth_time && i.iat, n.auth, "internal-error");
        const s = "object" == typeof i.firebase ? i.firebase : void 0,
          o = null == s ? void 0 : s.sign_in_provider;
        return {
          claims: i,
          token: r,
          authTime: Nt(Rt(i.auth_time)),
          issuedAtTime: Nt(Rt(i.iat)),
          expirationTime: Nt(Rt(i.exp)),
          signInProvider: o || null,
          signInSecondFactor:
            (null == s ? void 0 : s.sign_in_second_factor) || null,
        };
      })(this, e);
    }
    reload() {
      return (async function (e) {
        const t = b(e);
        await Mt(t),
          await t.auth._persistUserIfCurrent(t),
          t.auth._notifyListenersIfCurrent(t);
      })(this);
    }
    _assign(e) {
      this !== e &&
        (ot(this.uid === e.uid, this.auth, "internal-error"),
        (this.displayName = e.displayName),
        (this.photoURL = e.photoURL),
        (this.email = e.email),
        (this.emailVerified = e.emailVerified),
        (this.phoneNumber = e.phoneNumber),
        (this.isAnonymous = e.isAnonymous),
        (this.tenantId = e.tenantId),
        (this.providerData = e.providerData.map((e) => Object.assign({}, e))),
        this.metadata._copy(e.metadata),
        this.stsTokenManager._assign(e.stsTokenManager));
    }
    _clone(e) {
      const t = new jt(
        Object.assign(Object.assign({}, this), {
          auth: e,
          stsTokenManager: this.stsTokenManager._clone(),
        }),
      );
      return t.metadata._copy(this.metadata), t;
    }
    _onReload(e) {
      ot(!this.reloadListener, this.auth, "internal-error"),
        (this.reloadListener = e),
        this.reloadUserInfo &&
          (this._notifyReloadListener(this.reloadUserInfo),
          (this.reloadUserInfo = null));
    }
    _notifyReloadListener(e) {
      this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
    }
    _startProactiveRefresh() {
      this.proactiveRefresh._start();
    }
    _stopProactiveRefresh() {
      this.proactiveRefresh._stop();
    }
    async _updateTokensIfNecessary(e, t = !1) {
      let n = !1;
      e.idToken &&
        e.idToken !== this.stsTokenManager.accessToken &&
        (this.stsTokenManager.updateFromServerResponse(e), (n = !0)),
        t && (await Mt(this)),
        await this.auth._persistUserIfCurrent(this),
        n && this.auth._notifyListenersIfCurrent(this);
    }
    async delete() {
      if (Le(this.auth.app)) return Promise.reject(it(this.auth));
      const e = await this.getIdToken();
      return (
        await Dt(
          this,
          (async function (e, t) {
            return vt(e, "POST", "/v1/accounts:delete", t);
          })(this.auth, { idToken: e }),
        ),
        this.stsTokenManager.clearRefreshToken(),
        this.auth.signOut()
      );
    }
    toJSON() {
      return Object.assign(
        Object.assign(
          {
            uid: this.uid,
            email: this.email || void 0,
            emailVerified: this.emailVerified,
            displayName: this.displayName || void 0,
            isAnonymous: this.isAnonymous,
            photoURL: this.photoURL || void 0,
            phoneNumber: this.phoneNumber || void 0,
            tenantId: this.tenantId || void 0,
            providerData: this.providerData.map((e) => Object.assign({}, e)),
            stsTokenManager: this.stsTokenManager.toJSON(),
            _redirectEventId: this._redirectEventId,
          },
          this.metadata.toJSON(),
        ),
        { apiKey: this.auth.config.apiKey, appName: this.auth.name },
      );
    }
    get refreshToken() {
      return this.stsTokenManager.refreshToken || "";
    }
    static _fromJSON(e, t) {
      var n, r, i, s, o, a, c, u;
      const l = null !== (n = t.displayName) && void 0 !== n ? n : void 0,
        h = null !== (r = t.email) && void 0 !== r ? r : void 0,
        d = null !== (i = t.phoneNumber) && void 0 !== i ? i : void 0,
        f = null !== (s = t.photoURL) && void 0 !== s ? s : void 0,
        p = null !== (o = t.tenantId) && void 0 !== o ? o : void 0,
        g = null !== (a = t._redirectEventId) && void 0 !== a ? a : void 0,
        m = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
        y = null !== (u = t.lastLoginAt) && void 0 !== u ? u : void 0,
        {
          uid: v,
          emailVerified: w,
          isAnonymous: _,
          providerData: E,
          stsTokenManager: b,
        } = t;
      ot(v && b, e, "internal-error");
      const I = Vt.fromJSON(this.name, b);
      ot("string" == typeof v, e, "internal-error"),
        Ft(l, e.name),
        Ft(h, e.name),
        ot("boolean" == typeof w, e, "internal-error"),
        ot("boolean" == typeof _, e, "internal-error"),
        Ft(d, e.name),
        Ft(f, e.name),
        Ft(p, e.name),
        Ft(g, e.name),
        Ft(m, e.name),
        Ft(y, e.name);
      const T = new jt({
        uid: v,
        auth: e,
        email: h,
        emailVerified: w,
        displayName: l,
        isAnonymous: _,
        photoURL: f,
        phoneNumber: d,
        tenantId: p,
        stsTokenManager: I,
        createdAt: m,
        lastLoginAt: y,
      });
      return (
        E &&
          Array.isArray(E) &&
          (T.providerData = E.map((e) => Object.assign({}, e))),
        g && (T._redirectEventId = g),
        T
      );
    }
    static async _fromIdTokenResponse(e, t, n = !1) {
      const r = new Vt();
      r.updateFromServerResponse(t);
      const i = new jt({
        uid: t.localId,
        auth: e,
        stsTokenManager: r,
        isAnonymous: n,
      });
      return await Mt(i), i;
    }
    static async _fromGetAccountInfoResponse(e, t, n) {
      const r = t.users[0];
      ot(void 0 !== r.localId, "internal-error");
      const i = void 0 !== r.providerUserInfo ? Ut(r.providerUserInfo) : [],
        s = !((r.email && r.passwordHash) || (null == i ? void 0 : i.length)),
        o = new Vt();
      o.updateFromIdToken(n);
      const a = new jt({
          uid: r.localId,
          auth: e,
          stsTokenManager: o,
          isAnonymous: s,
        }),
        c = {
          uid: r.localId,
          displayName: r.displayName || null,
          photoURL: r.photoUrl || null,
          email: r.email || null,
          emailVerified: r.emailVerified || !1,
          phoneNumber: r.phoneNumber || null,
          tenantId: r.tenantId || null,
          providerData: i,
          metadata: new xt(r.createdAt, r.lastLoginAt),
          isAnonymous: !(
            (r.email && r.passwordHash) ||
            (null == i ? void 0 : i.length)
          ),
        };
      return Object.assign(a, c), a;
    }
  }
  const Bt = new Map();
  function $t(e) {
    ct(e instanceof Function, "Expected a class definition");
    let t = Bt.get(e);
    return t
      ? (ct(t instanceof e, "Instance stored in cache mismatched with class"),
        t)
      : ((t = new e()), Bt.set(e, t), t);
  }
  class Ht {
    constructor() {
      (this.type = "NONE"), (this.storage = {});
    }
    async _isAvailable() {
      return !0;
    }
    async _set(e, t) {
      this.storage[e] = t;
    }
    async _get(e) {
      const t = this.storage[e];
      return void 0 === t ? null : t;
    }
    async _remove(e) {
      delete this.storage[e];
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
  }
  Ht.type = "NONE";
  const zt = Ht;
  function qt(e, t, n) {
    return `firebase:${e}:${t}:${n}`;
  }
  class Gt {
    constructor(e, t, n) {
      (this.persistence = e), (this.auth = t), (this.userKey = n);
      const { config: r, name: i } = this.auth;
      (this.fullUserKey = qt(this.userKey, r.apiKey, i)),
        (this.fullPersistenceKey = qt("persistence", r.apiKey, i)),
        (this.boundEventHandler = t._onStorageEvent.bind(t)),
        this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
    }
    setCurrentUser(e) {
      return this.persistence._set(this.fullUserKey, e.toJSON());
    }
    async getCurrentUser() {
      const e = await this.persistence._get(this.fullUserKey);
      return e ? jt._fromJSON(this.auth, e) : null;
    }
    removeCurrentUser() {
      return this.persistence._remove(this.fullUserKey);
    }
    savePersistenceForRedirect() {
      return this.persistence._set(
        this.fullPersistenceKey,
        this.persistence.type,
      );
    }
    async setPersistence(e) {
      if (this.persistence === e) return;
      const t = await this.getCurrentUser();
      return (
        await this.removeCurrentUser(),
        (this.persistence = e),
        t ? this.setCurrentUser(t) : void 0
      );
    }
    delete() {
      this.persistence._removeListener(
        this.fullUserKey,
        this.boundEventHandler,
      );
    }
    static async create(e, t, n = "authUser") {
      if (!t.length) return new Gt($t(zt), e, n);
      const r = (
        await Promise.all(
          t.map(async (e) => {
            if (await e._isAvailable()) return e;
          }),
        )
      ).filter((e) => e);
      let i = r[0] || $t(zt);
      const s = qt(n, e.config.apiKey, e.name);
      let o = null;
      for (const n of t)
        try {
          const t = await n._get(s);
          if (t) {
            const r = jt._fromJSON(e, t);
            n !== i && (o = r), (i = n);
            break;
          }
        } catch (e) {}
      const a = r.filter((e) => e._shouldAllowMigration);
      return i._shouldAllowMigration && a.length
        ? ((i = a[0]),
          o && (await i._set(s, o.toJSON())),
          await Promise.all(
            t.map(async (e) => {
              if (e !== i)
                try {
                  await e._remove(s);
                } catch (e) {}
            }),
          ),
          new Gt(i, e, n))
        : new Gt(i, e, n);
    }
  }
  function Kt(e) {
    const t = e.toLowerCase();
    if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/"))
      return "Opera";
    if (Jt(t)) return "IEMobile";
    if (t.includes("msie") || t.includes("trident/")) return "IE";
    if (t.includes("edge/")) return "Edge";
    if (Wt(t)) return "Firefox";
    if (t.includes("silk/")) return "Silk";
    if (Zt(t)) return "Blackberry";
    if (en(t)) return "Webos";
    if (Qt(t)) return "Safari";
    if ((t.includes("chrome/") || Xt(t)) && !t.includes("edge/"))
      return "Chrome";
    if (Yt(t)) return "Android";
    {
      const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
        n = e.match(t);
      if (2 === (null == n ? void 0 : n.length)) return n[1];
    }
    return "Other";
  }
  function Wt(e = h()) {
    return /firefox\//i.test(e);
  }
  function Qt(e = h()) {
    const t = e.toLowerCase();
    return (
      t.includes("safari/") &&
      !t.includes("chrome/") &&
      !t.includes("crios/") &&
      !t.includes("android")
    );
  }
  function Xt(e = h()) {
    return /crios\//i.test(e);
  }
  function Jt(e = h()) {
    return /iemobile/i.test(e);
  }
  function Yt(e = h()) {
    return /android/i.test(e);
  }
  function Zt(e = h()) {
    return /blackberry/i.test(e);
  }
  function en(e = h()) {
    return /webos/i.test(e);
  }
  function tn(e = h()) {
    return (
      /iphone|ipad|ipod/i.test(e) || (/macintosh/i.test(e) && /mobile/i.test(e))
    );
  }
  function nn(e = h()) {
    return (
      tn(e) || Yt(e) || en(e) || Zt(e) || /windows phone/i.test(e) || Jt(e)
    );
  }
  function rn(e, t = []) {
    let n;
    switch (e) {
      case "Browser":
        n = Kt(h());
        break;
      case "Worker":
        n = `${Kt(h())}-${e}`;
        break;
      default:
        n = e;
    }
    const r = t.length ? t.join(",") : "FirebaseCore-web";
    return `${n}/JsCore/${Ue}/${r}`;
  }
  class sn {
    constructor(e) {
      (this.auth = e), (this.queue = []);
    }
    pushCallback(e, t) {
      const n = (t) =>
        new Promise((n, r) => {
          try {
            n(e(t));
          } catch (e) {
            r(e);
          }
        });
      (n.onAbort = t), this.queue.push(n);
      const r = this.queue.length - 1;
      return () => {
        this.queue[r] = () => Promise.resolve();
      };
    }
    async runMiddleware(e) {
      if (this.auth.currentUser === e) return;
      const t = [];
      try {
        for (const n of this.queue) await n(e), n.onAbort && t.push(n.onAbort);
      } catch (e) {
        t.reverse();
        for (const e of t)
          try {
            e();
          } catch (e) {}
        throw this.auth._errorFactory.create("login-blocked", {
          originalMessage: null == e ? void 0 : e.message,
        });
      }
    }
  }
  class on {
    constructor(e) {
      var t, n, r, i;
      const s = e.customStrengthOptions;
      (this.customStrengthOptions = {}),
        (this.customStrengthOptions.minPasswordLength =
          null !== (t = s.minPasswordLength) && void 0 !== t ? t : 6),
        s.maxPasswordLength &&
          (this.customStrengthOptions.maxPasswordLength = s.maxPasswordLength),
        void 0 !== s.containsLowercaseCharacter &&
          (this.customStrengthOptions.containsLowercaseLetter =
            s.containsLowercaseCharacter),
        void 0 !== s.containsUppercaseCharacter &&
          (this.customStrengthOptions.containsUppercaseLetter =
            s.containsUppercaseCharacter),
        void 0 !== s.containsNumericCharacter &&
          (this.customStrengthOptions.containsNumericCharacter =
            s.containsNumericCharacter),
        void 0 !== s.containsNonAlphanumericCharacter &&
          (this.customStrengthOptions.containsNonAlphanumericCharacter =
            s.containsNonAlphanumericCharacter),
        (this.enforcementState = e.enforcementState),
        "ENFORCEMENT_STATE_UNSPECIFIED" === this.enforcementState &&
          (this.enforcementState = "OFF"),
        (this.allowedNonAlphanumericCharacters =
          null !==
            (r =
              null === (n = e.allowedNonAlphanumericCharacters) || void 0 === n
                ? void 0
                : n.join("")) && void 0 !== r
            ? r
            : ""),
        (this.forceUpgradeOnSignin =
          null !== (i = e.forceUpgradeOnSignin) && void 0 !== i && i),
        (this.schemaVersion = e.schemaVersion);
    }
    validatePassword(e) {
      var t, n, r, i, s, o;
      const a = { isValid: !0, passwordPolicy: this };
      return (
        this.validatePasswordLengthOptions(e, a),
        this.validatePasswordCharacterOptions(e, a),
        a.isValid &&
          (a.isValid =
            null === (t = a.meetsMinPasswordLength) || void 0 === t || t),
        a.isValid &&
          (a.isValid =
            null === (n = a.meetsMaxPasswordLength) || void 0 === n || n),
        a.isValid &&
          (a.isValid =
            null === (r = a.containsLowercaseLetter) || void 0 === r || r),
        a.isValid &&
          (a.isValid =
            null === (i = a.containsUppercaseLetter) || void 0 === i || i),
        a.isValid &&
          (a.isValid =
            null === (s = a.containsNumericCharacter) || void 0 === s || s),
        a.isValid &&
          (a.isValid =
            null === (o = a.containsNonAlphanumericCharacter) ||
            void 0 === o ||
            o),
        a
      );
    }
    validatePasswordLengthOptions(e, t) {
      const n = this.customStrengthOptions.minPasswordLength,
        r = this.customStrengthOptions.maxPasswordLength;
      n && (t.meetsMinPasswordLength = e.length >= n),
        r && (t.meetsMaxPasswordLength = e.length <= r);
    }
    validatePasswordCharacterOptions(e, t) {
      let n;
      this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
      for (let r = 0; r < e.length; r++)
        (n = e.charAt(r)),
          this.updatePasswordCharacterOptionsStatuses(
            t,
            n >= "a" && n <= "z",
            n >= "A" && n <= "Z",
            n >= "0" && n <= "9",
            this.allowedNonAlphanumericCharacters.includes(n),
          );
    }
    updatePasswordCharacterOptionsStatuses(e, t, n, r, i) {
      this.customStrengthOptions.containsLowercaseLetter &&
        (e.containsLowercaseLetter || (e.containsLowercaseLetter = t)),
        this.customStrengthOptions.containsUppercaseLetter &&
          (e.containsUppercaseLetter || (e.containsUppercaseLetter = n)),
        this.customStrengthOptions.containsNumericCharacter &&
          (e.containsNumericCharacter || (e.containsNumericCharacter = r)),
        this.customStrengthOptions.containsNonAlphanumericCharacter &&
          (e.containsNonAlphanumericCharacter ||
            (e.containsNonAlphanumericCharacter = i));
    }
  }
  class an {
    constructor(e, t, n, r) {
      (this.app = e),
        (this.heartbeatServiceProvider = t),
        (this.appCheckServiceProvider = n),
        (this.config = r),
        (this.currentUser = null),
        (this.emulatorConfig = null),
        (this.operations = Promise.resolve()),
        (this.authStateSubscription = new un(this)),
        (this.idTokenSubscription = new un(this)),
        (this.beforeStateQueue = new sn(this)),
        (this.redirectUser = null),
        (this.isProactiveRefreshEnabled = !1),
        (this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
        (this._canInitEmulator = !0),
        (this._isInitialized = !1),
        (this._deleted = !1),
        (this._initializationPromise = null),
        (this._popupRedirectResolver = null),
        (this._errorFactory = Ye),
        (this._agentRecaptchaConfig = null),
        (this._tenantRecaptchaConfigs = {}),
        (this._projectPasswordPolicy = null),
        (this._tenantPasswordPolicies = {}),
        (this.lastNotifiedUid = void 0),
        (this.languageCode = null),
        (this.tenantId = null),
        (this.settings = { appVerificationDisabledForTesting: !1 }),
        (this.frameworks = []),
        (this.name = e.name),
        (this.clientVersion = r.sdkClientVersion);
    }
    _initializeWithPersistence(e, t) {
      return (
        t && (this._popupRedirectResolver = $t(t)),
        (this._initializationPromise = this.queue(async () => {
          var n, r;
          if (
            !this._deleted &&
            ((this.persistenceManager = await Gt.create(this, e)),
            !this._deleted)
          ) {
            if (
              null === (n = this._popupRedirectResolver) || void 0 === n
                ? void 0
                : n._shouldInitProactively
            )
              try {
                await this._popupRedirectResolver._initialize(this);
              } catch (e) {}
            await this.initializeCurrentUser(t),
              (this.lastNotifiedUid =
                (null === (r = this.currentUser) || void 0 === r
                  ? void 0
                  : r.uid) || null),
              this._deleted || (this._isInitialized = !0);
          }
        })),
        this._initializationPromise
      );
    }
    async _onStorageEvent() {
      if (this._deleted) return;
      const e = await this.assertedPersistence.getCurrentUser();
      return this.currentUser || e
        ? this.currentUser && e && this.currentUser.uid === e.uid
          ? (this._currentUser._assign(e),
            void (await this.currentUser.getIdToken()))
          : void (await this._updateCurrentUser(e, !0))
        : void 0;
    }
    async initializeCurrentUserFromIdToken(e) {
      try {
        const t = await kt(this, { idToken: e }),
          n = await jt._fromGetAccountInfoResponse(this, t, e);
        await this.directlySetCurrentUser(n);
      } catch (e) {
        console.warn(
          "FirebaseServerApp could not login user with provided authIdToken: ",
          e,
        ),
          await this.directlySetCurrentUser(null);
      }
    }
    async initializeCurrentUser(e) {
      var t;
      if (Le(this.app)) {
        const e = this.app.settings.authIdToken;
        return e
          ? new Promise((t) => {
              setTimeout(() =>
                this.initializeCurrentUserFromIdToken(e).then(t, t),
              );
            })
          : this.directlySetCurrentUser(null);
      }
      const n = await this.assertedPersistence.getCurrentUser();
      let r = n,
        i = !1;
      if (e && this.config.authDomain) {
        await this.getOrInitRedirectPersistenceManager();
        const n =
            null === (t = this.redirectUser) || void 0 === t
              ? void 0
              : t._redirectEventId,
          s = null == r ? void 0 : r._redirectEventId,
          o = await this.tryRedirectSignIn(e);
        (n && n !== s) ||
          !(null == o ? void 0 : o.user) ||
          ((r = o.user), (i = !0));
      }
      if (!r) return this.directlySetCurrentUser(null);
      if (!r._redirectEventId) {
        if (i)
          try {
            await this.beforeStateQueue.runMiddleware(r);
          } catch (e) {
            (r = n),
              this._popupRedirectResolver._overrideRedirectResult(this, () =>
                Promise.reject(e),
              );
          }
        return r
          ? this.reloadAndSetCurrentUserOrClear(r)
          : this.directlySetCurrentUser(null);
      }
      return (
        ot(this._popupRedirectResolver, this, "argument-error"),
        await this.getOrInitRedirectPersistenceManager(),
        this.redirectUser &&
        this.redirectUser._redirectEventId === r._redirectEventId
          ? this.directlySetCurrentUser(r)
          : this.reloadAndSetCurrentUserOrClear(r)
      );
    }
    async tryRedirectSignIn(e) {
      let t = null;
      try {
        t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
      } catch (e) {
        await this._setRedirectUser(null);
      }
      return t;
    }
    async reloadAndSetCurrentUserOrClear(e) {
      try {
        await Mt(e);
      } catch (e) {
        if ("auth/network-request-failed" !== (null == e ? void 0 : e.code))
          return this.directlySetCurrentUser(null);
      }
      return this.directlySetCurrentUser(e);
    }
    useDeviceLanguage() {
      this.languageCode = (function () {
        if ("undefined" == typeof navigator) return null;
        const e = navigator;
        return (e.languages && e.languages[0]) || e.language || null;
      })();
    }
    async _delete() {
      this._deleted = !0;
    }
    async updateCurrentUser(e) {
      if (Le(this.app)) return Promise.reject(it(this));
      const t = e ? b(e) : null;
      return (
        t &&
          ot(
            t.auth.config.apiKey === this.config.apiKey,
            this,
            "invalid-user-token",
          ),
        this._updateCurrentUser(t && t._clone(this))
      );
    }
    async _updateCurrentUser(e, t = !1) {
      if (!this._deleted)
        return (
          e && ot(this.tenantId === e.tenantId, this, "tenant-id-mismatch"),
          t || (await this.beforeStateQueue.runMiddleware(e)),
          this.queue(async () => {
            await this.directlySetCurrentUser(e), this.notifyAuthListeners();
          })
        );
    }
    async signOut() {
      return Le(this.app)
        ? Promise.reject(it(this))
        : (await this.beforeStateQueue.runMiddleware(null),
          (this.redirectPersistenceManager || this._popupRedirectResolver) &&
            (await this._setRedirectUser(null)),
          this._updateCurrentUser(null, !0));
    }
    setPersistence(e) {
      return Le(this.app)
        ? Promise.reject(it(this))
        : this.queue(async () => {
            await this.assertedPersistence.setPersistence($t(e));
          });
    }
    _getRecaptchaConfig() {
      return null == this.tenantId
        ? this._agentRecaptchaConfig
        : this._tenantRecaptchaConfigs[this.tenantId];
    }
    async validatePassword(e) {
      this._getPasswordPolicyInternal() || (await this._updatePasswordPolicy());
      const t = this._getPasswordPolicyInternal();
      return t.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
        ? Promise.reject(
            this._errorFactory.create(
              "unsupported-password-policy-schema-version",
              {},
            ),
          )
        : t.validatePassword(e);
    }
    _getPasswordPolicyInternal() {
      return null === this.tenantId
        ? this._projectPasswordPolicy
        : this._tenantPasswordPolicies[this.tenantId];
    }
    async _updatePasswordPolicy() {
      const e = await (async function (e, t = {}) {
          return vt(e, "GET", "/v2/passwordPolicy", yt(e, t));
        })(this),
        t = new on(e);
      null === this.tenantId
        ? (this._projectPasswordPolicy = t)
        : (this._tenantPasswordPolicies[this.tenantId] = t);
    }
    _getPersistence() {
      return this.assertedPersistence.persistence.type;
    }
    _updateErrorMap(e) {
      this._errorFactory = new f("auth", "Firebase", e());
    }
    onAuthStateChanged(e, t, n) {
      return this.registerStateListener(this.authStateSubscription, e, t, n);
    }
    beforeAuthStateChanged(e, t) {
      return this.beforeStateQueue.pushCallback(e, t);
    }
    onIdTokenChanged(e, t, n) {
      return this.registerStateListener(this.idTokenSubscription, e, t, n);
    }
    authStateReady() {
      return new Promise((e, t) => {
        if (this.currentUser) e();
        else {
          const n = this.onAuthStateChanged(() => {
            n(), e();
          }, t);
        }
      });
    }
    async revokeAccessToken(e) {
      if (this.currentUser) {
        const t = {
          providerId: "apple.com",
          tokenType: "ACCESS_TOKEN",
          token: e,
          idToken: await this.currentUser.getIdToken(),
        };
        null != this.tenantId && (t.tenantId = this.tenantId),
          await (async function (e, t) {
            return vt(e, "POST", "/v2/accounts:revokeToken", yt(e, t));
          })(this, t);
      }
    }
    toJSON() {
      var e;
      return {
        apiKey: this.config.apiKey,
        authDomain: this.config.authDomain,
        appName: this.name,
        currentUser:
          null === (e = this._currentUser) || void 0 === e
            ? void 0
            : e.toJSON(),
      };
    }
    async _setRedirectUser(e, t) {
      const n = await this.getOrInitRedirectPersistenceManager(t);
      return null === e ? n.removeCurrentUser() : n.setCurrentUser(e);
    }
    async getOrInitRedirectPersistenceManager(e) {
      if (!this.redirectPersistenceManager) {
        const t = (e && $t(e)) || this._popupRedirectResolver;
        ot(t, this, "argument-error"),
          (this.redirectPersistenceManager = await Gt.create(
            this,
            [$t(t._redirectPersistence)],
            "redirectUser",
          )),
          (this.redirectUser =
            await this.redirectPersistenceManager.getCurrentUser());
      }
      return this.redirectPersistenceManager;
    }
    async _redirectUserForId(e) {
      var t, n;
      return (
        this._isInitialized && (await this.queue(async () => {})),
        (null === (t = this._currentUser) || void 0 === t
          ? void 0
          : t._redirectEventId) === e
          ? this._currentUser
          : (null === (n = this.redirectUser) || void 0 === n
                ? void 0
                : n._redirectEventId) === e
            ? this.redirectUser
            : null
      );
    }
    async _persistUserIfCurrent(e) {
      if (e === this.currentUser)
        return this.queue(async () => this.directlySetCurrentUser(e));
    }
    _notifyListenersIfCurrent(e) {
      e === this.currentUser && this.notifyAuthListeners();
    }
    _key() {
      return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
    }
    _startProactiveRefresh() {
      (this.isProactiveRefreshEnabled = !0),
        this.currentUser && this._currentUser._startProactiveRefresh();
    }
    _stopProactiveRefresh() {
      (this.isProactiveRefreshEnabled = !1),
        this.currentUser && this._currentUser._stopProactiveRefresh();
    }
    get _currentUser() {
      return this.currentUser;
    }
    notifyAuthListeners() {
      var e, t;
      if (!this._isInitialized) return;
      this.idTokenSubscription.next(this.currentUser);
      const n =
        null !==
          (t =
            null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) &&
        void 0 !== t
          ? t
          : null;
      this.lastNotifiedUid !== n &&
        ((this.lastNotifiedUid = n),
        this.authStateSubscription.next(this.currentUser));
    }
    registerStateListener(e, t, n, r) {
      if (this._deleted) return () => {};
      const i = "function" == typeof t ? t : t.next.bind(t);
      let s = !1;
      const o = this._isInitialized
        ? Promise.resolve()
        : this._initializationPromise;
      if (
        (ot(o, this, "internal-error"),
        o.then(() => {
          s || i(this.currentUser);
        }),
        "function" == typeof t)
      ) {
        const i = e.addObserver(t, n, r);
        return () => {
          (s = !0), i();
        };
      }
      {
        const n = e.addObserver(t);
        return () => {
          (s = !0), n();
        };
      }
    }
    async directlySetCurrentUser(e) {
      this.currentUser &&
        this.currentUser !== e &&
        this._currentUser._stopProactiveRefresh(),
        e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
        (this.currentUser = e),
        e
          ? await this.assertedPersistence.setCurrentUser(e)
          : await this.assertedPersistence.removeCurrentUser();
    }
    queue(e) {
      return (this.operations = this.operations.then(e, e)), this.operations;
    }
    get assertedPersistence() {
      return (
        ot(this.persistenceManager, this, "internal-error"),
        this.persistenceManager
      );
    }
    _logFramework(e) {
      e &&
        !this.frameworks.includes(e) &&
        (this.frameworks.push(e),
        this.frameworks.sort(),
        (this.clientVersion = rn(
          this.config.clientPlatform,
          this._getFrameworks(),
        )));
    }
    _getFrameworks() {
      return this.frameworks;
    }
    async _getAdditionalHeaders() {
      var e;
      const t = { "X-Client-Version": this.clientVersion };
      this.app.options.appId &&
        (t["X-Firebase-gmpid"] = this.app.options.appId);
      const n = await (null ===
        (e = this.heartbeatServiceProvider.getImmediate({ optional: !0 })) ||
      void 0 === e
        ? void 0
        : e.getHeartbeatsHeader());
      n && (t["X-Firebase-Client"] = n);
      const r = await this._getAppCheckToken();
      return r && (t["X-Firebase-AppCheck"] = r), t;
    }
    async _getAppCheckToken() {
      var e;
      if (Le(this.app) && this.app.settings.appCheckToken)
        return this.app.settings.appCheckToken;
      const t = await (null ===
        (e = this.appCheckServiceProvider.getImmediate({ optional: !0 })) ||
      void 0 === e
        ? void 0
        : e.getToken());
      return (
        (null == t ? void 0 : t.error) &&
          (function (e, ...t) {
            Ze.logLevel <= k.WARN && Ze.warn(`Auth (${Ue}): ${e}`, ...t);
          })(`Error while retrieving App Check token: ${t.error}`),
        null == t ? void 0 : t.token
      );
    }
  }
  function cn(e) {
    return b(e);
  }
  class un {
    constructor(e) {
      (this.auth = e),
        (this.observer = null),
        (this.addObserver = (function (e) {
          const t = new _(e, void 0);
          return t.subscribe.bind(t);
        })((e) => (this.observer = e)));
    }
    get next() {
      return (
        ot(this.observer, this.auth, "internal-error"),
        this.observer.next.bind(this.observer)
      );
    }
  }
  let ln = {
    async loadJS() {
      throw new Error("Unable to load external scripts");
    },
    recaptchaV2Script: "",
    recaptchaEnterpriseScript: "",
    gapiScript: "",
  };
  function hn(e) {
    return ln.loadJS(e);
  }
  function dn(e) {
    return `__${e}${Math.floor(1e6 * Math.random())}`;
  }
  class fn {
    constructor() {
      this.enterprise = new pn();
    }
    ready(e) {
      e();
    }
    execute(e, t) {
      return Promise.resolve("token");
    }
    render(e, t) {
      return "";
    }
  }
  class pn {
    ready(e) {
      e();
    }
    execute(e, t) {
      return Promise.resolve("token");
    }
    render(e, t) {
      return "";
    }
  }
  const gn = "NO_RECAPTCHA";
  class mn {
    constructor(e) {
      (this.type = "recaptcha-enterprise"), (this.auth = cn(e));
    }
    async verify(e = "verify", t = !1) {
      function n(t, n, r) {
        const i = window.grecaptcha;
        St(i)
          ? i.enterprise.ready(() => {
              i.enterprise
                .execute(t, { action: e })
                .then((e) => {
                  n(e);
                })
                .catch(() => {
                  n(gn);
                });
            })
          : r(Error("No reCAPTCHA enterprise script loaded."));
      }
      return this.auth.settings.appVerificationDisabledForTesting
        ? new fn().execute("siteKey", { action: "verify" })
        : new Promise((e, r) => {
            (async function (e) {
              if (!t) {
                if (null == e.tenantId && null != e._agentRecaptchaConfig)
                  return e._agentRecaptchaConfig.siteKey;
                if (
                  null != e.tenantId &&
                  void 0 !== e._tenantRecaptchaConfigs[e.tenantId]
                )
                  return e._tenantRecaptchaConfigs[e.tenantId].siteKey;
              }
              return new Promise(async (t, n) => {
                At(e, {
                  clientType: "CLIENT_TYPE_WEB",
                  version: "RECAPTCHA_ENTERPRISE",
                })
                  .then((r) => {
                    if (void 0 !== r.recaptchaKey) {
                      const n = new Ct(r);
                      return (
                        null == e.tenantId
                          ? (e._agentRecaptchaConfig = n)
                          : (e._tenantRecaptchaConfigs[e.tenantId] = n),
                        t(n.siteKey)
                      );
                    }
                    n(new Error("recaptcha Enterprise site key undefined"));
                  })
                  .catch((e) => {
                    n(e);
                  });
              });
            })(this.auth)
              .then((i) => {
                if (!t && St(window.grecaptcha)) n(i, e, r);
                else {
                  if ("undefined" == typeof window)
                    return void r(
                      new Error(
                        "RecaptchaVerifier is only supported in browser",
                      ),
                    );
                  let t = ln.recaptchaEnterpriseScript;
                  0 !== t.length && (t += i),
                    hn(t)
                      .then(() => {
                        n(i, e, r);
                      })
                      .catch((e) => {
                        r(e);
                      });
                }
              })
              .catch((e) => {
                r(e);
              });
          });
    }
  }
  async function yn(e, t, n, r = !1, i = !1) {
    const s = new mn(e);
    let o;
    if (i) o = gn;
    else
      try {
        o = await s.verify(n);
      } catch (e) {
        o = await s.verify(n, !0);
      }
    const a = Object.assign({}, t);
    if ("mfaSmsEnrollment" === n || "mfaSmsSignIn" === n) {
      if ("phoneEnrollmentInfo" in a) {
        const e = a.phoneEnrollmentInfo.phoneNumber,
          t = a.phoneEnrollmentInfo.recaptchaToken;
        Object.assign(a, {
          phoneEnrollmentInfo: {
            phoneNumber: e,
            recaptchaToken: t,
            captchaResponse: o,
            clientType: "CLIENT_TYPE_WEB",
            recaptchaVersion: "RECAPTCHA_ENTERPRISE",
          },
        });
      } else if ("phoneSignInInfo" in a) {
        const e = a.phoneSignInInfo.recaptchaToken;
        Object.assign(a, {
          phoneSignInInfo: {
            recaptchaToken: e,
            captchaResponse: o,
            clientType: "CLIENT_TYPE_WEB",
            recaptchaVersion: "RECAPTCHA_ENTERPRISE",
          },
        });
      }
      return a;
    }
    return (
      r
        ? Object.assign(a, { captchaResp: o })
        : Object.assign(a, { captchaResponse: o }),
      Object.assign(a, { clientType: "CLIENT_TYPE_WEB" }),
      Object.assign(a, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" }),
      a
    );
  }
  async function vn(e, t, n, r, i) {
    var s, o;
    if ("EMAIL_PASSWORD_PROVIDER" === i) {
      if (
        null === (s = e._getRecaptchaConfig()) || void 0 === s
          ? void 0
          : s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")
      ) {
        const i = await yn(e, t, n, "getOobCode" === n);
        return r(e, i);
      }
      return r(e, t).catch(async (i) => {
        if ("auth/missing-recaptcha-token" === i.code) {
          console.log(
            `${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`,
          );
          const i = await yn(e, t, n, "getOobCode" === n);
          return r(e, i);
        }
        return Promise.reject(i);
      });
    }
    if ("PHONE_PROVIDER" === i) {
      if (
        null === (o = e._getRecaptchaConfig()) || void 0 === o
          ? void 0
          : o.isProviderEnabled("PHONE_PROVIDER")
      ) {
        const i = await yn(e, t, n);
        return r(e, i).catch(async (i) => {
          var s;
          if (
            "AUDIT" ===
              (null === (s = e._getRecaptchaConfig()) || void 0 === s
                ? void 0
                : s.getProviderEnforcementState("PHONE_PROVIDER")) &&
            ("auth/missing-recaptcha-token" === i.code ||
              "auth/invalid-app-credential" === i.code)
          ) {
            console.log(
              `Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`,
            );
            const i = await yn(e, t, n, !1, !0);
            return r(e, i);
          }
          return Promise.reject(i);
        });
      }
      {
        const i = await yn(e, t, n, !1, !0);
        return r(e, i);
      }
    }
    return Promise.reject(i + " provider is not supported.");
  }
  function wn(e) {
    const t = e.indexOf(":");
    return t < 0 ? "" : e.substr(0, t + 1);
  }
  function _n(e) {
    if (!e) return null;
    const t = Number(e);
    return isNaN(t) ? null : t;
  }
  class En {
    constructor(e, t) {
      (this.providerId = e), (this.signInMethod = t);
    }
    toJSON() {
      return at("not implemented");
    }
    _getIdTokenResponse(e) {
      return at("not implemented");
    }
    _linkToIdToken(e, t) {
      return at("not implemented");
    }
    _getReauthenticationResolver(e) {
      return at("not implemented");
    }
  }
  async function bn(e, t) {
    return vt(e, "POST", "/v1/accounts:signUp", t);
  }
  async function In(e, t) {
    return _t(e, "POST", "/v1/accounts:signInWithPassword", yt(e, t));
  }
  class Tn extends En {
    constructor(e, t, n, r = null) {
      super("password", n),
        (this._email = e),
        (this._password = t),
        (this._tenantId = r);
    }
    static _fromEmailAndPassword(e, t) {
      return new Tn(e, t, "password");
    }
    static _fromEmailAndCode(e, t, n = null) {
      return new Tn(e, t, "emailLink", n);
    }
    toJSON() {
      return {
        email: this._email,
        password: this._password,
        signInMethod: this.signInMethod,
        tenantId: this._tenantId,
      };
    }
    static fromJSON(e) {
      const t = "string" == typeof e ? JSON.parse(e) : e;
      if ((null == t ? void 0 : t.email) && (null == t ? void 0 : t.password)) {
        if ("password" === t.signInMethod)
          return this._fromEmailAndPassword(t.email, t.password);
        if ("emailLink" === t.signInMethod)
          return this._fromEmailAndCode(t.email, t.password, t.tenantId);
      }
      return null;
    }
    async _getIdTokenResponse(e) {
      switch (this.signInMethod) {
        case "password":
          return vn(
            e,
            {
              returnSecureToken: !0,
              email: this._email,
              password: this._password,
              clientType: "CLIENT_TYPE_WEB",
            },
            "signInWithPassword",
            In,
            "EMAIL_PASSWORD_PROVIDER",
          );
        case "emailLink":
          return (async function (e, t) {
            return _t(e, "POST", "/v1/accounts:signInWithEmailLink", yt(e, t));
          })(e, { email: this._email, oobCode: this._password });
        default:
          tt(e, "internal-error");
      }
    }
    async _linkToIdToken(e, t) {
      switch (this.signInMethod) {
        case "password":
          return vn(
            e,
            {
              idToken: t,
              returnSecureToken: !0,
              email: this._email,
              password: this._password,
              clientType: "CLIENT_TYPE_WEB",
            },
            "signUpPassword",
            bn,
            "EMAIL_PASSWORD_PROVIDER",
          );
        case "emailLink":
          return (async function (e, t) {
            return _t(e, "POST", "/v1/accounts:signInWithEmailLink", yt(e, t));
          })(e, { idToken: t, email: this._email, oobCode: this._password });
        default:
          tt(e, "internal-error");
      }
    }
    _getReauthenticationResolver(e) {
      return this._getIdTokenResponse(e);
    }
  }
  async function Sn(e, t) {
    return _t(e, "POST", "/v1/accounts:signInWithIdp", yt(e, t));
  }
  class Cn extends En {
    constructor() {
      super(...arguments), (this.pendingToken = null);
    }
    static _fromParams(e) {
      const t = new Cn(e.providerId, e.signInMethod);
      return (
        e.idToken || e.accessToken
          ? (e.idToken && (t.idToken = e.idToken),
            e.accessToken && (t.accessToken = e.accessToken),
            e.nonce && !e.pendingToken && (t.nonce = e.nonce),
            e.pendingToken && (t.pendingToken = e.pendingToken))
          : e.oauthToken && e.oauthTokenSecret
            ? ((t.accessToken = e.oauthToken), (t.secret = e.oauthTokenSecret))
            : tt("argument-error"),
        t
      );
    }
    toJSON() {
      return {
        idToken: this.idToken,
        accessToken: this.accessToken,
        secret: this.secret,
        nonce: this.nonce,
        pendingToken: this.pendingToken,
        providerId: this.providerId,
        signInMethod: this.signInMethod,
      };
    }
    static fromJSON(e) {
      const t = "string" == typeof e ? JSON.parse(e) : e,
        { providerId: n, signInMethod: r } = t,
        i = Xe(t, ["providerId", "signInMethod"]);
      if (!n || !r) return null;
      const s = new Cn(n, r);
      return (
        (s.idToken = i.idToken || void 0),
        (s.accessToken = i.accessToken || void 0),
        (s.secret = i.secret),
        (s.nonce = i.nonce),
        (s.pendingToken = i.pendingToken || null),
        s
      );
    }
    _getIdTokenResponse(e) {
      return Sn(e, this.buildRequest());
    }
    _linkToIdToken(e, t) {
      const n = this.buildRequest();
      return (n.idToken = t), Sn(e, n);
    }
    _getReauthenticationResolver(e) {
      const t = this.buildRequest();
      return (t.autoCreate = !1), Sn(e, t);
    }
    buildRequest() {
      const e = { requestUri: "http://localhost", returnSecureToken: !0 };
      if (this.pendingToken) e.pendingToken = this.pendingToken;
      else {
        const t = {};
        this.idToken && (t.id_token = this.idToken),
          this.accessToken && (t.access_token = this.accessToken),
          this.secret && (t.oauth_token_secret = this.secret),
          (t.providerId = this.providerId),
          this.nonce && !this.pendingToken && (t.nonce = this.nonce),
          (e.postBody = y(t));
      }
      return e;
    }
  }
  async function An(e, t) {
    return vt(e, "POST", "/v1/accounts:sendVerificationCode", yt(e, t));
  }
  const kn = { USER_NOT_FOUND: "user-not-found" };
  class Nn extends En {
    constructor(e) {
      super("phone", "phone"), (this.params = e);
    }
    static _fromVerification(e, t) {
      return new Nn({ verificationId: e, verificationCode: t });
    }
    static _fromTokenResponse(e, t) {
      return new Nn({ phoneNumber: e, temporaryProof: t });
    }
    _getIdTokenResponse(e) {
      return (async function (e, t) {
        return _t(e, "POST", "/v1/accounts:signInWithPhoneNumber", yt(e, t));
      })(e, this._makeVerificationRequest());
    }
    _linkToIdToken(e, t) {
      return (async function (e, t) {
        const n = await _t(
          e,
          "POST",
          "/v1/accounts:signInWithPhoneNumber",
          yt(e, t),
        );
        if (n.temporaryProof)
          throw Tt(e, "account-exists-with-different-credential", n);
        return n;
      })(e, Object.assign({ idToken: t }, this._makeVerificationRequest()));
    }
    _getReauthenticationResolver(e) {
      return (async function (e, t) {
        return _t(
          e,
          "POST",
          "/v1/accounts:signInWithPhoneNumber",
          yt(e, Object.assign(Object.assign({}, t), { operation: "REAUTH" })),
          kn,
        );
      })(e, this._makeVerificationRequest());
    }
    _makeVerificationRequest() {
      const {
        temporaryProof: e,
        phoneNumber: t,
        verificationId: n,
        verificationCode: r,
      } = this.params;
      return e && t
        ? { temporaryProof: e, phoneNumber: t }
        : { sessionInfo: n, code: r };
    }
    toJSON() {
      const e = { providerId: this.providerId };
      return (
        this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber),
        this.params.temporaryProof &&
          (e.temporaryProof = this.params.temporaryProof),
        this.params.verificationCode &&
          (e.verificationCode = this.params.verificationCode),
        this.params.verificationId &&
          (e.verificationId = this.params.verificationId),
        e
      );
    }
    static fromJSON(e) {
      "string" == typeof e && (e = JSON.parse(e));
      const {
        verificationId: t,
        verificationCode: n,
        phoneNumber: r,
        temporaryProof: i,
      } = e;
      return n || t || r || i
        ? new Nn({
            verificationId: t,
            verificationCode: n,
            phoneNumber: r,
            temporaryProof: i,
          })
        : null;
    }
  }
  class Rn {
    constructor(e) {
      var t, n, r, i, s, o;
      const a = v(w(e)),
        c = null !== (t = a.apiKey) && void 0 !== t ? t : null,
        u = null !== (n = a.oobCode) && void 0 !== n ? n : null,
        l = (function (e) {
          switch (e) {
            case "recoverEmail":
              return "RECOVER_EMAIL";
            case "resetPassword":
              return "PASSWORD_RESET";
            case "signIn":
              return "EMAIL_SIGNIN";
            case "verifyEmail":
              return "VERIFY_EMAIL";
            case "verifyAndChangeEmail":
              return "VERIFY_AND_CHANGE_EMAIL";
            case "revertSecondFactorAddition":
              return "REVERT_SECOND_FACTOR_ADDITION";
            default:
              return null;
          }
        })(null !== (r = a.mode) && void 0 !== r ? r : null);
      ot(c && u && l, "argument-error"),
        (this.apiKey = c),
        (this.operation = l),
        (this.code = u),
        (this.continueUrl =
          null !== (i = a.continueUrl) && void 0 !== i ? i : null),
        (this.languageCode =
          null !== (s = a.languageCode) && void 0 !== s ? s : null),
        (this.tenantId = null !== (o = a.tenantId) && void 0 !== o ? o : null);
    }
    static parseLink(e) {
      const t = (function (e) {
        const t = v(w(e)).link,
          n = t ? v(w(t)).deep_link_id : null,
          r = v(w(e)).deep_link_id;
        return (r ? v(w(r)).link : null) || r || n || t || e;
      })(e);
      try {
        return new Rn(t);
      } catch (e) {
        return null;
      }
    }
  }
  class On {
    constructor() {
      this.providerId = On.PROVIDER_ID;
    }
    static credential(e, t) {
      return Tn._fromEmailAndPassword(e, t);
    }
    static credentialWithLink(e, t) {
      const n = Rn.parseLink(t);
      return (
        ot(n, "argument-error"), Tn._fromEmailAndCode(e, n.code, n.tenantId)
      );
    }
  }
  (On.PROVIDER_ID = "password"),
    (On.EMAIL_PASSWORD_SIGN_IN_METHOD = "password"),
    (On.EMAIL_LINK_SIGN_IN_METHOD = "emailLink");
  class Pn {
    constructor(e) {
      (this.providerId = e),
        (this.defaultLanguageCode = null),
        (this.customParameters = {});
    }
    setDefaultLanguage(e) {
      this.defaultLanguageCode = e;
    }
    setCustomParameters(e) {
      return (this.customParameters = e), this;
    }
    getCustomParameters() {
      return this.customParameters;
    }
  }
  class Dn extends Pn {
    constructor() {
      super(...arguments), (this.scopes = []);
    }
    addScope(e) {
      return this.scopes.includes(e) || this.scopes.push(e), this;
    }
    getScopes() {
      return [...this.scopes];
    }
  }
  class Ln extends Dn {
    constructor() {
      super("facebook.com");
    }
    static credential(e) {
      return Cn._fromParams({
        providerId: Ln.PROVIDER_ID,
        signInMethod: Ln.FACEBOOK_SIGN_IN_METHOD,
        accessToken: e,
      });
    }
    static credentialFromResult(e) {
      return Ln.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
      return Ln.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e || !("oauthAccessToken" in e)) return null;
      if (!e.oauthAccessToken) return null;
      try {
        return Ln.credential(e.oauthAccessToken);
      } catch (e) {
        return null;
      }
    }
  }
  (Ln.FACEBOOK_SIGN_IN_METHOD = "facebook.com"),
    (Ln.PROVIDER_ID = "facebook.com");
  class xn extends Dn {
    constructor() {
      super("google.com"), this.addScope("profile");
    }
    static credential(e, t) {
      return Cn._fromParams({
        providerId: xn.PROVIDER_ID,
        signInMethod: xn.GOOGLE_SIGN_IN_METHOD,
        idToken: e,
        accessToken: t,
      });
    }
    static credentialFromResult(e) {
      return xn.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
      return xn.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e) return null;
      const { oauthIdToken: t, oauthAccessToken: n } = e;
      if (!t && !n) return null;
      try {
        return xn.credential(t, n);
      } catch (e) {
        return null;
      }
    }
  }
  (xn.GOOGLE_SIGN_IN_METHOD = "google.com"), (xn.PROVIDER_ID = "google.com");
  class Mn extends Dn {
    constructor() {
      super("github.com");
    }
    static credential(e) {
      return Cn._fromParams({
        providerId: Mn.PROVIDER_ID,
        signInMethod: Mn.GITHUB_SIGN_IN_METHOD,
        accessToken: e,
      });
    }
    static credentialFromResult(e) {
      return Mn.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
      return Mn.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e || !("oauthAccessToken" in e)) return null;
      if (!e.oauthAccessToken) return null;
      try {
        return Mn.credential(e.oauthAccessToken);
      } catch (e) {
        return null;
      }
    }
  }
  (Mn.GITHUB_SIGN_IN_METHOD = "github.com"), (Mn.PROVIDER_ID = "github.com");
  class Un extends Dn {
    constructor() {
      super("twitter.com");
    }
    static credential(e, t) {
      return Cn._fromParams({
        providerId: Un.PROVIDER_ID,
        signInMethod: Un.TWITTER_SIGN_IN_METHOD,
        oauthToken: e,
        oauthTokenSecret: t,
      });
    }
    static credentialFromResult(e) {
      return Un.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
      return Un.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e) return null;
      const { oauthAccessToken: t, oauthTokenSecret: n } = e;
      if (!t || !n) return null;
      try {
        return Un.credential(t, n);
      } catch (e) {
        return null;
      }
    }
  }
  async function Vn(e, t) {
    return _t(e, "POST", "/v1/accounts:signUp", yt(e, t));
  }
  (Un.TWITTER_SIGN_IN_METHOD = "twitter.com"), (Un.PROVIDER_ID = "twitter.com");
  class Fn {
    constructor(e) {
      (this.user = e.user),
        (this.providerId = e.providerId),
        (this._tokenResponse = e._tokenResponse),
        (this.operationType = e.operationType);
    }
    static async _fromIdTokenResponse(e, t, n, r = !1) {
      const i = await jt._fromIdTokenResponse(e, n, r),
        s = jn(n);
      return new Fn({
        user: i,
        providerId: s,
        _tokenResponse: n,
        operationType: t,
      });
    }
    static async _forOperation(e, t, n) {
      await e._updateTokensIfNecessary(n, !0);
      const r = jn(n);
      return new Fn({
        user: e,
        providerId: r,
        _tokenResponse: n,
        operationType: t,
      });
    }
  }
  function jn(e) {
    return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null;
  }
  class Bn extends d {
    constructor(e, t, n, r) {
      var i;
      super(t.code, t.message),
        (this.operationType = n),
        (this.user = r),
        Object.setPrototypeOf(this, Bn.prototype),
        (this.customData = {
          appName: e.name,
          tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
          _serverResponse: t.customData._serverResponse,
          operationType: n,
        });
    }
    static _fromErrorAndOperation(e, t, n, r) {
      return new Bn(e, t, n, r);
    }
  }
  function $n(e, t, n, r) {
    return (
      "reauthenticate" === t
        ? n._getReauthenticationResolver(e)
        : n._getIdTokenResponse(e)
    ).catch((n) => {
      if ("auth/multi-factor-auth-required" === n.code)
        throw Bn._fromErrorAndOperation(e, n, t, r);
      throw n;
    });
  }
  async function Hn(e, t, n = !1) {
    if (Le(e.app)) return Promise.reject(it(e));
    const r = "signIn",
      i = await $n(e, r, t),
      s = await Fn._fromIdTokenResponse(e, r, i);
    return n || (await e._updateCurrentUser(s.user)), s;
  }
  async function zn(e) {
    const t = cn(e);
    t._getPasswordPolicyInternal() && (await t._updatePasswordPolicy());
  }
  async function qn(e, t, n) {
    if (Le(e.app)) return Promise.reject(it(e));
    const r = cn(e),
      i = vn(
        r,
        {
          returnSecureToken: !0,
          email: t,
          password: n,
          clientType: "CLIENT_TYPE_WEB",
        },
        "signUpPassword",
        Vn,
        "EMAIL_PASSWORD_PROVIDER",
      ),
      s = await i.catch((t) => {
        throw (
          ("auth/password-does-not-meet-requirements" === t.code && zn(e), t)
        );
      }),
      o = await Fn._fromIdTokenResponse(r, "signIn", s);
    return await r._updateCurrentUser(o.user), o;
  }
  function Gn(e, t, n) {
    return Le(e.app)
      ? Promise.reject(it(e))
      : (async function (e, t) {
          return Hn(cn(e), t);
        })(b(e), On.credential(t, n)).catch(async (t) => {
          throw (
            ("auth/password-does-not-meet-requirements" === t.code && zn(e), t)
          );
        });
  }
  function Kn(e, t) {
    return vt(e, "POST", "/v2/accounts/mfaEnrollment:start", yt(e, t));
  }
  new WeakMap();
  const Wn = "__sak";
  class Qn {
    constructor(e, t) {
      (this.storageRetriever = e), (this.type = t);
    }
    _isAvailable() {
      try {
        return this.storage
          ? (this.storage.setItem(Wn, "1"),
            this.storage.removeItem(Wn),
            Promise.resolve(!0))
          : Promise.resolve(!1);
      } catch (e) {
        return Promise.resolve(!1);
      }
    }
    _set(e, t) {
      return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
    }
    _get(e) {
      const t = this.storage.getItem(e);
      return Promise.resolve(t ? JSON.parse(t) : null);
    }
    _remove(e) {
      return this.storage.removeItem(e), Promise.resolve();
    }
    get storage() {
      return this.storageRetriever();
    }
  }
  class Xn extends Qn {
    constructor() {
      super(() => window.localStorage, "LOCAL"),
        (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.fallbackToPolling = nn()),
        (this._shouldAllowMigration = !0);
    }
    forAllChangedKeys(e) {
      for (const t of Object.keys(this.listeners)) {
        const n = this.storage.getItem(t),
          r = this.localCache[t];
        n !== r && e(t, r, n);
      }
    }
    onStorageEvent(e, t = !1) {
      if (!e.key)
        return void this.forAllChangedKeys((e, t, n) => {
          this.notifyListeners(e, n);
        });
      const n = e.key;
      t ? this.detachListener() : this.stopPolling();
      const r = () => {
          const e = this.storage.getItem(n);
          (t || this.localCache[n] !== e) && this.notifyListeners(n, e);
        },
        i = this.storage.getItem(n);
      !(function () {
        const e = h();
        return e.indexOf("MSIE ") >= 0 || e.indexOf("Trident/") >= 0;
      })() ||
      10 !== document.documentMode ||
      i === e.newValue ||
      e.newValue === e.oldValue
        ? r()
        : setTimeout(r, 10);
    }
    notifyListeners(e, t) {
      this.localCache[e] = t;
      const n = this.listeners[e];
      if (n) for (const e of Array.from(n)) e(t ? JSON.parse(t) : t);
    }
    startPolling() {
      this.stopPolling(),
        (this.pollTimer = setInterval(() => {
          this.forAllChangedKeys((e, t, n) => {
            this.onStorageEvent(
              new StorageEvent("storage", { key: e, oldValue: t, newValue: n }),
              !0,
            );
          });
        }, 1e3));
    }
    stopPolling() {
      this.pollTimer &&
        (clearInterval(this.pollTimer), (this.pollTimer = null));
    }
    attachListener() {
      window.addEventListener("storage", this.boundEventHandler);
    }
    detachListener() {
      window.removeEventListener("storage", this.boundEventHandler);
    }
    _addListener(e, t) {
      0 === Object.keys(this.listeners).length &&
        (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
        this.listeners[e] ||
          ((this.listeners[e] = new Set()),
          (this.localCache[e] = this.storage.getItem(e))),
        this.listeners[e].add(t);
    }
    _removeListener(e, t) {
      this.listeners[e] &&
        (this.listeners[e].delete(t),
        0 === this.listeners[e].size && delete this.listeners[e]),
        0 === Object.keys(this.listeners).length &&
          (this.detachListener(), this.stopPolling());
    }
    async _set(e, t) {
      await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
    }
    async _get(e) {
      const t = await super._get(e);
      return (this.localCache[e] = JSON.stringify(t)), t;
    }
    async _remove(e) {
      await super._remove(e), delete this.localCache[e];
    }
  }
  Xn.type = "LOCAL";
  const Jn = Xn;
  class Yn extends Qn {
    constructor() {
      super(() => window.sessionStorage, "SESSION");
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
  }
  Yn.type = "SESSION";
  const Zn = Yn;
  class er {
    constructor(e) {
      (this.eventTarget = e),
        (this.handlersMap = {}),
        (this.boundEventHandler = this.handleEvent.bind(this));
    }
    static _getInstance(e) {
      const t = this.receivers.find((t) => t.isListeningto(e));
      if (t) return t;
      const n = new er(e);
      return this.receivers.push(n), n;
    }
    isListeningto(e) {
      return this.eventTarget === e;
    }
    async handleEvent(e) {
      const t = e,
        { eventId: n, eventType: r, data: i } = t.data,
        s = this.handlersMap[r];
      if (!(null == s ? void 0 : s.size)) return;
      t.ports[0].postMessage({ status: "ack", eventId: n, eventType: r });
      const o = Array.from(s).map(async (e) => e(t.origin, i)),
        a = await (function (e) {
          return Promise.all(
            e.map(async (e) => {
              try {
                return { fulfilled: !0, value: await e };
              } catch (e) {
                return { fulfilled: !1, reason: e };
              }
            }),
          );
        })(o);
      t.ports[0].postMessage({
        status: "done",
        eventId: n,
        eventType: r,
        response: a,
      });
    }
    _subscribe(e, t) {
      0 === Object.keys(this.handlersMap).length &&
        this.eventTarget.addEventListener("message", this.boundEventHandler),
        this.handlersMap[e] || (this.handlersMap[e] = new Set()),
        this.handlersMap[e].add(t);
    }
    _unsubscribe(e, t) {
      this.handlersMap[e] && t && this.handlersMap[e].delete(t),
        (t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
        0 === Object.keys(this.handlersMap).length &&
          this.eventTarget.removeEventListener(
            "message",
            this.boundEventHandler,
          );
    }
  }
  function tr(e = "", t = 10) {
    let n = "";
    for (let e = 0; e < t; e++) n += Math.floor(10 * Math.random());
    return e + n;
  }
  er.receivers = [];
  class nr {
    constructor(e) {
      (this.target = e), (this.handlers = new Set());
    }
    removeMessageHandler(e) {
      e.messageChannel &&
        (e.messageChannel.port1.removeEventListener("message", e.onMessage),
        e.messageChannel.port1.close()),
        this.handlers.delete(e);
    }
    async _send(e, t, n = 50) {
      const r =
        "undefined" != typeof MessageChannel ? new MessageChannel() : null;
      if (!r) throw new Error("connection_unavailable");
      let i, s;
      return new Promise((o, a) => {
        const c = tr("", 20);
        r.port1.start();
        const u = setTimeout(() => {
          a(new Error("unsupported_event"));
        }, n);
        (s = {
          messageChannel: r,
          onMessage(e) {
            const t = e;
            if (t.data.eventId === c)
              switch (t.data.status) {
                case "ack":
                  clearTimeout(u),
                    (i = setTimeout(() => {
                      a(new Error("timeout"));
                    }, 3e3));
                  break;
                case "done":
                  clearTimeout(i), o(t.data.response);
                  break;
                default:
                  clearTimeout(u),
                    clearTimeout(i),
                    a(new Error("invalid_response"));
              }
          },
        }),
          this.handlers.add(s),
          r.port1.addEventListener("message", s.onMessage),
          this.target.postMessage({ eventType: e, eventId: c, data: t }, [
            r.port2,
          ]);
      }).finally(() => {
        s && this.removeMessageHandler(s);
      });
    }
  }
  function rr() {
    return window;
  }
  function ir() {
    return (
      void 0 !== rr().WorkerGlobalScope &&
      "function" == typeof rr().importScripts
    );
  }
  const sr = "firebaseLocalStorageDb",
    or = "firebaseLocalStorage",
    ar = "fbase_key";
  class cr {
    constructor(e) {
      this.request = e;
    }
    toPromise() {
      return new Promise((e, t) => {
        this.request.addEventListener("success", () => {
          e(this.request.result);
        }),
          this.request.addEventListener("error", () => {
            t(this.request.error);
          });
      });
    }
  }
  function ur(e, t) {
    return e.transaction([or], t ? "readwrite" : "readonly").objectStore(or);
  }
  function lr() {
    const e = indexedDB.open(sr, 1);
    return new Promise((t, n) => {
      e.addEventListener("error", () => {
        n(e.error);
      }),
        e.addEventListener("upgradeneeded", () => {
          const t = e.result;
          try {
            t.createObjectStore(or, { keyPath: ar });
          } catch (e) {
            n(e);
          }
        }),
        e.addEventListener("success", async () => {
          const n = e.result;
          n.objectStoreNames.contains(or)
            ? t(n)
            : (n.close(),
              await (function () {
                const e = indexedDB.deleteDatabase(sr);
                return new cr(e).toPromise();
              })(),
              t(await lr()));
        });
    });
  }
  async function hr(e, t, n) {
    const r = ur(e, !0).put({ [ar]: t, value: n });
    return new cr(r).toPromise();
  }
  function dr(e, t) {
    const n = ur(e, !0).delete(t);
    return new cr(n).toPromise();
  }
  class fr {
    constructor() {
      (this.type = "LOCAL"),
        (this._shouldAllowMigration = !0),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.pendingWrites = 0),
        (this.receiver = null),
        (this.sender = null),
        (this.serviceWorkerReceiverAvailable = !1),
        (this.activeServiceWorker = null),
        (this._workerInitializationPromise =
          this.initializeServiceWorkerMessaging().then(
            () => {},
            () => {},
          ));
    }
    async _openDb() {
      return this.db || (this.db = await lr()), this.db;
    }
    async _withRetries(e) {
      let t = 0;
      for (;;)
        try {
          const t = await this._openDb();
          return await e(t);
        } catch (e) {
          if (t++ > 3) throw e;
          this.db && (this.db.close(), (this.db = void 0));
        }
    }
    async initializeServiceWorkerMessaging() {
      return ir() ? this.initializeReceiver() : this.initializeSender();
    }
    async initializeReceiver() {
      (this.receiver = er._getInstance(ir() ? self : null)),
        this.receiver._subscribe("keyChanged", async (e, t) => ({
          keyProcessed: (await this._poll()).includes(t.key),
        })),
        this.receiver._subscribe("ping", async (e, t) => ["keyChanged"]);
    }
    async initializeSender() {
      var e, t;
      if (
        ((this.activeServiceWorker = await (async function () {
          if (
            !(null === navigator || void 0 === navigator
              ? void 0
              : navigator.serviceWorker)
          )
            return null;
          try {
            return (await navigator.serviceWorker.ready).active;
          } catch (e) {
            return null;
          }
        })()),
        !this.activeServiceWorker)
      )
        return;
      this.sender = new nr(this.activeServiceWorker);
      const n = await this.sender._send("ping", {}, 800);
      n &&
        (null === (e = n[0]) || void 0 === e ? void 0 : e.fulfilled) &&
        (null === (t = n[0]) || void 0 === t
          ? void 0
          : t.value.includes("keyChanged")) &&
        (this.serviceWorkerReceiverAvailable = !0);
    }
    async notifyServiceWorker(e) {
      var t;
      if (
        this.sender &&
        this.activeServiceWorker &&
        ((null ===
          (t =
            null === navigator || void 0 === navigator
              ? void 0
              : navigator.serviceWorker) || void 0 === t
          ? void 0
          : t.controller) || null) === this.activeServiceWorker
      )
        try {
          await this.sender._send(
            "keyChanged",
            { key: e },
            this.serviceWorkerReceiverAvailable ? 800 : 50,
          );
        } catch (t) {}
    }
    async _isAvailable() {
      try {
        if (!indexedDB) return !1;
        const e = await lr();
        return await hr(e, Wn, "1"), await dr(e, Wn), !0;
      } catch (e) {}
      return !1;
    }
    async _withPendingWrite(e) {
      this.pendingWrites++;
      try {
        await e();
      } finally {
        this.pendingWrites--;
      }
    }
    async _set(e, t) {
      return this._withPendingWrite(
        async () => (
          await this._withRetries((n) => hr(n, e, t)),
          (this.localCache[e] = t),
          this.notifyServiceWorker(e)
        ),
      );
    }
    async _get(e) {
      const t = await this._withRetries((t) =>
        (async function (e, t) {
          const n = ur(e, !1).get(t),
            r = await new cr(n).toPromise();
          return void 0 === r ? null : r.value;
        })(t, e),
      );
      return (this.localCache[e] = t), t;
    }
    async _remove(e) {
      return this._withPendingWrite(
        async () => (
          await this._withRetries((t) => dr(t, e)),
          delete this.localCache[e],
          this.notifyServiceWorker(e)
        ),
      );
    }
    async _poll() {
      const e = await this._withRetries((e) => {
        const t = ur(e, !1).getAll();
        return new cr(t).toPromise();
      });
      if (!e) return [];
      if (0 !== this.pendingWrites) return [];
      const t = [],
        n = new Set();
      if (0 !== e.length)
        for (const { fbase_key: r, value: i } of e)
          n.add(r),
            JSON.stringify(this.localCache[r]) !== JSON.stringify(i) &&
              (this.notifyListeners(r, i), t.push(r));
      for (const e of Object.keys(this.localCache))
        this.localCache[e] &&
          !n.has(e) &&
          (this.notifyListeners(e, null), t.push(e));
      return t;
    }
    notifyListeners(e, t) {
      this.localCache[e] = t;
      const n = this.listeners[e];
      if (n) for (const e of Array.from(n)) e(t);
    }
    startPolling() {
      this.stopPolling(),
        (this.pollTimer = setInterval(async () => this._poll(), 800));
    }
    stopPolling() {
      this.pollTimer &&
        (clearInterval(this.pollTimer), (this.pollTimer = null));
    }
    _addListener(e, t) {
      0 === Object.keys(this.listeners).length && this.startPolling(),
        this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
        this.listeners[e].add(t);
    }
    _removeListener(e, t) {
      this.listeners[e] &&
        (this.listeners[e].delete(t),
        0 === this.listeners[e].size && delete this.listeners[e]),
        0 === Object.keys(this.listeners).length && this.stopPolling();
    }
  }
  fr.type = "LOCAL";
  const pr = fr;
  function gr(e, t) {
    return vt(e, "POST", "/v2/accounts/mfaSignIn:start", yt(e, t));
  }
  dn("rcb"), new dt(3e4, 6e4);
  const mr = "recaptcha";
  async function yr(e, t, n) {
    var r;
    if (!e._getRecaptchaConfig())
      try {
        await (async function (e) {
          const t = cn(e),
            n = await At(t, {
              clientType: "CLIENT_TYPE_WEB",
              version: "RECAPTCHA_ENTERPRISE",
            }),
            r = new Ct(n);
          null == t.tenantId
            ? (t._agentRecaptchaConfig = r)
            : (t._tenantRecaptchaConfigs[t.tenantId] = r),
            r.isAnyProviderEnabled() && new mn(t).verify();
        })(e);
      } catch (e) {
        console.log(
          "Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.",
        );
      }
    try {
      let i;
      if (
        ((i = "string" == typeof t ? { phoneNumber: t } : t), "session" in i)
      ) {
        const t = i.session;
        if ("phoneNumber" in i) {
          ot("enroll" === t.type, e, "internal-error");
          const r = vn(
            e,
            {
              idToken: t.credential,
              phoneEnrollmentInfo: {
                phoneNumber: i.phoneNumber,
                clientType: "CLIENT_TYPE_WEB",
              },
            },
            "mfaSmsEnrollment",
            async (e, t) =>
              t.phoneEnrollmentInfo.captchaResponse === gn
                ? (ot(
                    (null == n ? void 0 : n.type) === mr,
                    e,
                    "argument-error",
                  ),
                  Kn(e, await vr(e, t, n)))
                : Kn(e, t),
            "PHONE_PROVIDER",
          );
          return (await r.catch((e) => Promise.reject(e))).phoneSessionInfo
            .sessionInfo;
        }
        {
          ot("signin" === t.type, e, "internal-error");
          const s =
            (null === (r = i.multiFactorHint) || void 0 === r
              ? void 0
              : r.uid) || i.multiFactorUid;
          ot(s, e, "missing-multi-factor-info");
          const o = vn(
            e,
            {
              mfaPendingCredential: t.credential,
              mfaEnrollmentId: s,
              phoneSignInInfo: { clientType: "CLIENT_TYPE_WEB" },
            },
            "mfaSmsSignIn",
            async (e, t) =>
              t.phoneSignInInfo.captchaResponse === gn
                ? (ot(
                    (null == n ? void 0 : n.type) === mr,
                    e,
                    "argument-error",
                  ),
                  gr(e, await vr(e, t, n)))
                : gr(e, t),
            "PHONE_PROVIDER",
          );
          return (await o.catch((e) => Promise.reject(e))).phoneResponseInfo
            .sessionInfo;
        }
      }
      {
        const t = vn(
          e,
          { phoneNumber: i.phoneNumber, clientType: "CLIENT_TYPE_WEB" },
          "sendVerificationCode",
          async (e, t) =>
            t.captchaResponse === gn
              ? (ot((null == n ? void 0 : n.type) === mr, e, "argument-error"),
                An(e, await vr(e, t, n)))
              : An(e, t),
          "PHONE_PROVIDER",
        );
        return (await t.catch((e) => Promise.reject(e))).sessionInfo;
      }
    } finally {
      null == n || n._reset();
    }
  }
  async function vr(e, t, n) {
    ot(n.type === mr, e, "argument-error");
    const r = await n.verify();
    ot("string" == typeof r, e, "argument-error");
    const i = Object.assign({}, t);
    if ("phoneEnrollmentInfo" in i) {
      const e = i.phoneEnrollmentInfo.phoneNumber,
        t = i.phoneEnrollmentInfo.captchaResponse,
        n = i.phoneEnrollmentInfo.clientType,
        s = i.phoneEnrollmentInfo.recaptchaVersion;
      return (
        Object.assign(i, {
          phoneEnrollmentInfo: {
            phoneNumber: e,
            recaptchaToken: r,
            captchaResponse: t,
            clientType: n,
            recaptchaVersion: s,
          },
        }),
        i
      );
    }
    if ("phoneSignInInfo" in i) {
      const e = i.phoneSignInInfo.captchaResponse,
        t = i.phoneSignInInfo.clientType,
        n = i.phoneSignInInfo.recaptchaVersion;
      return (
        Object.assign(i, {
          phoneSignInInfo: {
            recaptchaToken: r,
            captchaResponse: e,
            clientType: t,
            recaptchaVersion: n,
          },
        }),
        i
      );
    }
    return Object.assign(i, { recaptchaToken: r }), i;
  }
  class wr {
    constructor(e) {
      (this.providerId = wr.PROVIDER_ID), (this.auth = cn(e));
    }
    verifyPhoneNumber(e, t) {
      return yr(this.auth, e, b(t));
    }
    static credential(e, t) {
      return Nn._fromVerification(e, t);
    }
    static credentialFromResult(e) {
      const t = e;
      return wr.credentialFromTaggedObject(t);
    }
    static credentialFromError(e) {
      return wr.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e) return null;
      const { phoneNumber: t, temporaryProof: n } = e;
      return t && n ? Nn._fromTokenResponse(t, n) : null;
    }
  }
  (wr.PROVIDER_ID = "phone"), (wr.PHONE_SIGN_IN_METHOD = "phone");
  class _r extends En {
    constructor(e) {
      super("custom", "custom"), (this.params = e);
    }
    _getIdTokenResponse(e) {
      return Sn(e, this._buildIdpRequest());
    }
    _linkToIdToken(e, t) {
      return Sn(e, this._buildIdpRequest(t));
    }
    _getReauthenticationResolver(e) {
      return Sn(e, this._buildIdpRequest());
    }
    _buildIdpRequest(e) {
      const t = {
        requestUri: this.params.requestUri,
        sessionId: this.params.sessionId,
        postBody: this.params.postBody,
        tenantId: this.params.tenantId,
        pendingToken: this.params.pendingToken,
        returnSecureToken: !0,
        returnIdpCredential: !0,
      };
      return e && (t.idToken = e), t;
    }
  }
  function Er(e) {
    return Hn(e.auth, new _r(e), e.bypassAuthState);
  }
  function br(e) {
    const { auth: t, user: n } = e;
    return (
      ot(n, t, "internal-error"),
      (async function (e, t, n = !1) {
        const { auth: r } = e;
        if (Le(r.app)) return Promise.reject(it(r));
        const i = "reauthenticate";
        try {
          const s = await Dt(e, $n(r, i, t, e), n);
          ot(s.idToken, r, "internal-error");
          const o = Ot(s.idToken);
          ot(o, r, "internal-error");
          const { sub: a } = o;
          return ot(e.uid === a, r, "user-mismatch"), Fn._forOperation(e, i, s);
        } catch (e) {
          throw (
            ("auth/user-not-found" === (null == e ? void 0 : e.code) &&
              tt(r, "user-mismatch"),
            e)
          );
        }
      })(n, new _r(e), e.bypassAuthState)
    );
  }
  async function Ir(e) {
    const { auth: t, user: n } = e;
    return (
      ot(n, t, "internal-error"),
      (async function (e, t, n = !1) {
        const r = await Dt(
          e,
          t._linkToIdToken(e.auth, await e.getIdToken()),
          n,
        );
        return Fn._forOperation(e, "link", r);
      })(n, new _r(e), e.bypassAuthState)
    );
  }
  class Tr {
    constructor(e, t, n, r, i = !1) {
      (this.auth = e),
        (this.resolver = n),
        (this.user = r),
        (this.bypassAuthState = i),
        (this.pendingPromise = null),
        (this.eventManager = null),
        (this.filter = Array.isArray(t) ? t : [t]);
    }
    execute() {
      return new Promise(async (e, t) => {
        this.pendingPromise = { resolve: e, reject: t };
        try {
          (this.eventManager = await this.resolver._initialize(this.auth)),
            await this.onExecution(),
            this.eventManager.registerConsumer(this);
        } catch (e) {
          this.reject(e);
        }
      });
    }
    async onAuthEvent(e) {
      const {
        urlResponse: t,
        sessionId: n,
        postBody: r,
        tenantId: i,
        error: s,
        type: o,
      } = e;
      if (s) return void this.reject(s);
      const a = {
        auth: this.auth,
        requestUri: t,
        sessionId: n,
        tenantId: i || void 0,
        postBody: r || void 0,
        user: this.user,
        bypassAuthState: this.bypassAuthState,
      };
      try {
        this.resolve(await this.getIdpTask(o)(a));
      } catch (e) {
        this.reject(e);
      }
    }
    onError(e) {
      this.reject(e);
    }
    getIdpTask(e) {
      switch (e) {
        case "signInViaPopup":
        case "signInViaRedirect":
          return Er;
        case "linkViaPopup":
        case "linkViaRedirect":
          return Ir;
        case "reauthViaPopup":
        case "reauthViaRedirect":
          return br;
        default:
          tt(this.auth, "internal-error");
      }
    }
    resolve(e) {
      ct(this.pendingPromise, "Pending promise was never set"),
        this.pendingPromise.resolve(e),
        this.unregisterAndCleanUp();
    }
    reject(e) {
      ct(this.pendingPromise, "Pending promise was never set"),
        this.pendingPromise.reject(e),
        this.unregisterAndCleanUp();
    }
    unregisterAndCleanUp() {
      this.eventManager && this.eventManager.unregisterConsumer(this),
        (this.pendingPromise = null),
        this.cleanUp();
    }
  }
  const Sr = new dt(2e3, 1e4);
  class Cr extends Tr {
    constructor(e, t, n, r, i) {
      super(e, t, r, i),
        (this.provider = n),
        (this.authWindow = null),
        (this.pollId = null),
        Cr.currentPopupAction && Cr.currentPopupAction.cancel(),
        (Cr.currentPopupAction = this);
    }
    async executeNotNull() {
      const e = await this.execute();
      return ot(e, this.auth, "internal-error"), e;
    }
    async onExecution() {
      ct(1 === this.filter.length, "Popup operations only handle one event");
      const e = tr();
      (this.authWindow = await this.resolver._openPopup(
        this.auth,
        this.provider,
        this.filter[0],
        e,
      )),
        (this.authWindow.associatedEvent = e),
        this.resolver._originValidation(this.auth).catch((e) => {
          this.reject(e);
        }),
        this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
          e || this.reject(nt(this.auth, "web-storage-unsupported"));
        }),
        this.pollUserCancellation();
    }
    get eventId() {
      var e;
      return (
        (null === (e = this.authWindow) || void 0 === e
          ? void 0
          : e.associatedEvent) || null
      );
    }
    cancel() {
      this.reject(nt(this.auth, "cancelled-popup-request"));
    }
    cleanUp() {
      this.authWindow && this.authWindow.close(),
        this.pollId && window.clearTimeout(this.pollId),
        (this.authWindow = null),
        (this.pollId = null),
        (Cr.currentPopupAction = null);
    }
    pollUserCancellation() {
      const e = () => {
        var t, n;
        (
          null ===
            (n =
              null === (t = this.authWindow) || void 0 === t
                ? void 0
                : t.window) || void 0 === n
            ? void 0
            : n.closed
        )
          ? (this.pollId = window.setTimeout(() => {
              (this.pollId = null),
                this.reject(nt(this.auth, "popup-closed-by-user"));
            }, 8e3))
          : (this.pollId = window.setTimeout(e, Sr.get()));
      };
      e();
    }
  }
  Cr.currentPopupAction = null;
  const Ar = new Map();
  class kr extends Tr {
    constructor(e, t, n = !1) {
      super(
        e,
        [
          "signInViaRedirect",
          "linkViaRedirect",
          "reauthViaRedirect",
          "unknown",
        ],
        t,
        void 0,
        n,
      ),
        (this.eventId = null);
    }
    async execute() {
      let e = Ar.get(this.auth._key());
      if (!e) {
        try {
          const t = await (async function (e, t) {
              const n = (function (e) {
                  return qt("pendingRedirect", e.config.apiKey, e.name);
                })(t),
                r = (function (e) {
                  return $t(e._redirectPersistence);
                })(e);
              if (!(await r._isAvailable())) return !1;
              const i = "true" === (await r._get(n));
              return await r._remove(n), i;
            })(this.resolver, this.auth),
            n = t ? await super.execute() : null;
          e = () => Promise.resolve(n);
        } catch (t) {
          e = () => Promise.reject(t);
        }
        Ar.set(this.auth._key(), e);
      }
      return (
        this.bypassAuthState ||
          Ar.set(this.auth._key(), () => Promise.resolve(null)),
        e()
      );
    }
    async onAuthEvent(e) {
      if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
      if ("unknown" !== e.type) {
        if (e.eventId) {
          const t = await this.auth._redirectUserForId(e.eventId);
          if (t) return (this.user = t), super.onAuthEvent(e);
          this.resolve(null);
        }
      } else this.resolve(null);
    }
    async onExecution() {}
    cleanUp() {}
  }
  function Nr(e, t) {
    Ar.set(e._key(), t);
  }
  async function Rr(e, t, n = !1) {
    if (Le(e.app)) return Promise.reject(it(e));
    const r = cn(e),
      i = (function (e, t) {
        return t
          ? $t(t)
          : (ot(e._popupRedirectResolver, e, "argument-error"),
            e._popupRedirectResolver);
      })(r, t),
      s = new kr(r, i, n),
      o = await s.execute();
    return (
      o &&
        !n &&
        (delete o.user._redirectEventId,
        await r._persistUserIfCurrent(o.user),
        await r._setRedirectUser(null, t)),
      o
    );
  }
  class Or {
    constructor(e) {
      (this.auth = e),
        (this.cachedEventUids = new Set()),
        (this.consumers = new Set()),
        (this.queuedRedirectEvent = null),
        (this.hasHandledPotentialRedirect = !1),
        (this.lastProcessedEventTime = Date.now());
    }
    registerConsumer(e) {
      this.consumers.add(e),
        this.queuedRedirectEvent &&
          this.isEventForConsumer(this.queuedRedirectEvent, e) &&
          (this.sendToConsumer(this.queuedRedirectEvent, e),
          this.saveEventToCache(this.queuedRedirectEvent),
          (this.queuedRedirectEvent = null));
    }
    unregisterConsumer(e) {
      this.consumers.delete(e);
    }
    onEvent(e) {
      if (this.hasEventBeenHandled(e)) return !1;
      let t = !1;
      return (
        this.consumers.forEach((n) => {
          this.isEventForConsumer(e, n) &&
            ((t = !0), this.sendToConsumer(e, n), this.saveEventToCache(e));
        }),
        this.hasHandledPotentialRedirect ||
          !(function (e) {
            switch (e.type) {
              case "signInViaRedirect":
              case "linkViaRedirect":
              case "reauthViaRedirect":
                return !0;
              case "unknown":
                return Dr(e);
              default:
                return !1;
            }
          })(e) ||
          ((this.hasHandledPotentialRedirect = !0),
          t || ((this.queuedRedirectEvent = e), (t = !0))),
        t
      );
    }
    sendToConsumer(e, t) {
      var n;
      if (e.error && !Dr(e)) {
        const r =
          (null === (n = e.error.code) || void 0 === n
            ? void 0
            : n.split("auth/")[1]) || "internal-error";
        t.onError(nt(this.auth, r));
      } else t.onAuthEvent(e);
    }
    isEventForConsumer(e, t) {
      const n = null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
      return t.filter.includes(e.type) && n;
    }
    hasEventBeenHandled(e) {
      return (
        Date.now() - this.lastProcessedEventTime >= 6e5 &&
          this.cachedEventUids.clear(),
        this.cachedEventUids.has(Pr(e))
      );
    }
    saveEventToCache(e) {
      this.cachedEventUids.add(Pr(e)),
        (this.lastProcessedEventTime = Date.now());
    }
  }
  function Pr(e) {
    return [e.type, e.eventId, e.sessionId, e.tenantId]
      .filter((e) => e)
      .join("-");
  }
  function Dr({ type: e, error: t }) {
    return (
      "unknown" === e && "auth/no-auth-event" === (null == t ? void 0 : t.code)
    );
  }
  const Lr = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    xr = /^https?/;
  function Mr(e) {
    const t = ut(),
      { protocol: n, hostname: r } = new URL(t);
    if (e.startsWith("chrome-extension://")) {
      const i = new URL(e);
      return "" === i.hostname && "" === r
        ? "chrome-extension:" === n &&
            e.replace("chrome-extension://", "") ===
              t.replace("chrome-extension://", "")
        : "chrome-extension:" === n && i.hostname === r;
    }
    if (!xr.test(n)) return !1;
    if (Lr.test(e)) return r === e;
    const i = e.replace(/\./g, "\\.");
    return new RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(r);
  }
  const Ur = new dt(3e4, 6e4);
  function Vr() {
    const e = rr().___jsl;
    if (null == e ? void 0 : e.H)
      for (const t of Object.keys(e.H))
        if (
          ((e.H[t].r = e.H[t].r || []),
          (e.H[t].L = e.H[t].L || []),
          (e.H[t].r = [...e.H[t].L]),
          e.CP)
        )
          for (let t = 0; t < e.CP.length; t++) e.CP[t] = null;
  }
  function Fr(e) {
    return new Promise((t, n) => {
      var r, i, s;
      function o() {
        Vr(),
          gapi.load("gapi.iframes", {
            callback: () => {
              t(gapi.iframes.getContext());
            },
            ontimeout: () => {
              Vr(), n(nt(e, "network-request-failed"));
            },
            timeout: Ur.get(),
          });
      }
      if (
        null ===
          (i = null === (r = rr().gapi) || void 0 === r ? void 0 : r.iframes) ||
        void 0 === i
          ? void 0
          : i.Iframe
      )
        t(gapi.iframes.getContext());
      else {
        if (!(null === (s = rr().gapi) || void 0 === s ? void 0 : s.load)) {
          const t = dn("iframefcb");
          return (
            (rr()[t] = () => {
              gapi.load ? o() : n(nt(e, "network-request-failed"));
            }),
            hn(`${ln.gapiScript}?onload=${t}`).catch((e) => n(e))
          );
        }
        o();
      }
    }).catch((e) => {
      throw ((jr = null), e);
    });
  }
  let jr = null;
  const Br = new dt(5e3, 15e3),
    $r = {
      style: {
        position: "absolute",
        top: "-100px",
        width: "1px",
        height: "1px",
      },
      "aria-hidden": "true",
      tabindex: "-1",
    },
    Hr = new Map([
      ["identitytoolkit.googleapis.com", "p"],
      ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
      ["test-identitytoolkit.sandbox.googleapis.com", "t"],
    ]);
  function zr(e) {
    const t = e.config;
    ot(t.authDomain, e, "auth-domain-config-required");
    const n = t.emulator
        ? ft(t, "emulator/auth/iframe")
        : `https://${e.config.authDomain}/__/auth/iframe`,
      r = { apiKey: t.apiKey, appName: e.name, v: Ue },
      i = Hr.get(e.config.apiHost);
    i && (r.eid = i);
    const s = e._getFrameworks();
    return s.length && (r.fw = s.join(",")), `${n}?${y(r).slice(1)}`;
  }
  const qr = {
    location: "yes",
    resizable: "yes",
    statusbar: "yes",
    toolbar: "no",
  };
  class Gr {
    constructor(e) {
      (this.window = e), (this.associatedEvent = null);
    }
    close() {
      if (this.window)
        try {
          this.window.close();
        } catch (e) {}
    }
  }
  const Kr = encodeURIComponent("fac");
  async function Wr(e, t, n, r, i, s) {
    ot(e.config.authDomain, e, "auth-domain-config-required"),
      ot(e.config.apiKey, e, "invalid-api-key");
    const o = {
      apiKey: e.config.apiKey,
      appName: e.name,
      authType: n,
      redirectUrl: r,
      v: Ue,
      eventId: i,
    };
    if (t instanceof Pn) {
      t.setDefaultLanguage(e.languageCode),
        (o.providerId = t.providerId || ""),
        (function (e) {
          for (const t in e)
            if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
          return !0;
        })(t.getCustomParameters()) ||
          (o.customParameters = JSON.stringify(t.getCustomParameters()));
      for (const [e, t] of Object.entries(s || {})) o[e] = t;
    }
    if (t instanceof Dn) {
      const e = t.getScopes().filter((e) => "" !== e);
      e.length > 0 && (o.scopes = e.join(","));
    }
    e.tenantId && (o.tid = e.tenantId);
    const a = o;
    for (const e of Object.keys(a)) void 0 === a[e] && delete a[e];
    const c = await e._getAppCheckToken(),
      u = c ? `#${Kr}=${encodeURIComponent(c)}` : "";
    return `${(function ({ config: e }) {
      return e.emulator
        ? ft(e, "emulator/auth/handler")
        : `https://${e.authDomain}/__/auth/handler`;
    })(e)}?${y(a).slice(1)}${u}`;
  }
  const Qr = "webStorageSupport",
    Xr = class {
      constructor() {
        (this.eventManagers = {}),
          (this.iframes = {}),
          (this.originValidationPromises = {}),
          (this._redirectPersistence = Zn),
          (this._completeRedirectFn = Rr),
          (this._overrideRedirectResult = Nr);
      }
      async _openPopup(e, t, n, r) {
        var i;
        return (
          ct(
            null === (i = this.eventManagers[e._key()]) || void 0 === i
              ? void 0
              : i.manager,
            "_initialize() not called before _openPopup()",
          ),
          (function (e, t, n, r = 500, i = 600) {
            const s = Math.max(
                (window.screen.availHeight - i) / 2,
                0,
              ).toString(),
              o = Math.max((window.screen.availWidth - r) / 2, 0).toString();
            let a = "";
            const c = Object.assign(Object.assign({}, qr), {
                width: r.toString(),
                height: i.toString(),
                top: s,
                left: o,
              }),
              u = h().toLowerCase();
            n && (a = Xt(u) ? "_blank" : n),
              Wt(u) && ((t = t || "http://localhost"), (c.scrollbars = "yes"));
            const l = Object.entries(c).reduce(
              (e, [t, n]) => `${e}${t}=${n},`,
              "",
            );
            if (
              (function (e = h()) {
                var t;
                return (
                  tn(e) &&
                  !!(null === (t = window.navigator) || void 0 === t
                    ? void 0
                    : t.standalone)
                );
              })(u) &&
              "_self" !== a
            )
              return (
                (function (e, t) {
                  const n = document.createElement("a");
                  (n.href = e), (n.target = t);
                  const r = document.createEvent("MouseEvent");
                  r.initMouseEvent(
                    "click",
                    !0,
                    !0,
                    window,
                    1,
                    0,
                    0,
                    0,
                    0,
                    !1,
                    !1,
                    !1,
                    !1,
                    1,
                    null,
                  ),
                    n.dispatchEvent(r);
                })(t || "", a),
                new Gr(null)
              );
            const d = window.open(t || "", a, l);
            ot(d, e, "popup-blocked");
            try {
              d.focus();
            } catch (e) {}
            return new Gr(d);
          })(e, await Wr(e, t, n, ut(), r), tr())
        );
      }
      async _openRedirect(e, t, n, r) {
        return (
          await this._originValidation(e),
          (i = await Wr(e, t, n, ut(), r)),
          (rr().location.href = i),
          new Promise(() => {})
        );
        var i;
      }
      _initialize(e) {
        const t = e._key();
        if (this.eventManagers[t]) {
          const { manager: e, promise: n } = this.eventManagers[t];
          return e
            ? Promise.resolve(e)
            : (ct(n, "If manager is not set, promise should be"), n);
        }
        const n = this.initAndGetManager(e);
        return (
          (this.eventManagers[t] = { promise: n }),
          n.catch(() => {
            delete this.eventManagers[t];
          }),
          n
        );
      }
      async initAndGetManager(e) {
        const t = await (async function (e) {
            const t = await (function (e) {
                return (jr = jr || Fr(e)), jr;
              })(e),
              n = rr().gapi;
            return (
              ot(n, e, "internal-error"),
              t.open(
                {
                  where: document.body,
                  url: zr(e),
                  messageHandlersFilter: n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                  attributes: $r,
                  dontclear: !0,
                },
                (t) =>
                  new Promise(async (n, r) => {
                    await t.restyle({ setHideOnLeave: !1 });
                    const i = nt(e, "network-request-failed"),
                      s = rr().setTimeout(() => {
                        r(i);
                      }, Br.get());
                    function o() {
                      rr().clearTimeout(s), n(t);
                    }
                    t.ping(o).then(o, () => {
                      r(i);
                    });
                  }),
              )
            );
          })(e),
          n = new Or(e);
        return (
          t.register(
            "authEvent",
            (t) => (
              ot(null == t ? void 0 : t.authEvent, e, "invalid-auth-event"),
              { status: n.onEvent(t.authEvent) ? "ACK" : "ERROR" }
            ),
            gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
          ),
          (this.eventManagers[e._key()] = { manager: n }),
          (this.iframes[e._key()] = t),
          n
        );
      }
      _isIframeWebStorageSupported(e, t) {
        this.iframes[e._key()].send(
          Qr,
          { type: Qr },
          (n) => {
            var r;
            const i =
              null === (r = null == n ? void 0 : n[0]) || void 0 === r
                ? void 0
                : r[Qr];
            void 0 !== i && t(!!i), tt(e, "internal-error");
          },
          gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
        );
      }
      _originValidation(e) {
        const t = e._key();
        return (
          this.originValidationPromises[t] ||
            (this.originValidationPromises[t] = (async function (e) {
              if (e.config.emulator) return;
              const { authorizedDomains: t } = await (async function (
                e,
                t = {},
              ) {
                return vt(e, "GET", "/v1/projects", t);
              })(e);
              for (const e of t)
                try {
                  if (Mr(e)) return;
                } catch (e) {}
              tt(e, "unauthorized-domain");
            })(e)),
          this.originValidationPromises[t]
        );
      }
      get _shouldInitProactively() {
        return nn() || Qt() || tn();
      }
    };
  var Jr = "@firebase/auth",
    Yr = "1.9.1";
  class Zr {
    constructor(e) {
      (this.auth = e), (this.internalListeners = new Map());
    }
    getUid() {
      var e;
      return (
        this.assertAuthConfigured(),
        (null === (e = this.auth.currentUser) || void 0 === e
          ? void 0
          : e.uid) || null
      );
    }
    async getToken(e) {
      return (
        this.assertAuthConfigured(),
        await this.auth._initializationPromise,
        this.auth.currentUser
          ? { accessToken: await this.auth.currentUser.getIdToken(e) }
          : null
      );
    }
    addAuthTokenListener(e) {
      if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
      const t = this.auth.onIdTokenChanged((t) => {
        e((null == t ? void 0 : t.stsTokenManager.accessToken) || null);
      });
      this.internalListeners.set(e, t), this.updateProactiveRefresh();
    }
    removeAuthTokenListener(e) {
      this.assertAuthConfigured();
      const t = this.internalListeners.get(e);
      t &&
        (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
    }
    assertAuthConfigured() {
      ot(
        this.auth._initializationPromise,
        "dependent-sdk-initialized-before-auth",
      );
    }
    updateProactiveRefresh() {
      this.internalListeners.size > 0
        ? this.auth._startProactiveRefresh()
        : this.auth._stopProactiveRefresh();
    }
  }
  const ei = u("authIdTokenMaxAge") || 300;
  let ti = null;
  var ni;
  (ln = {
    loadJS: (e) =>
      new Promise((t, n) => {
        const r = document.createElement("script");
        var i, s;
        r.setAttribute("src", e),
          (r.onload = t),
          (r.onerror = (e) => {
            const t = nt("internal-error");
            (t.customData = e), n(t);
          }),
          (r.type = "text/javascript"),
          (r.charset = "UTF-8"),
          (null !==
            (s =
              null === (i = document.getElementsByTagName("head")) ||
              void 0 === i
                ? void 0
                : i[0]) && void 0 !== s
            ? s
            : document
          ).appendChild(r);
      }),
    gapiScript: "https://apis.google.com/js/api.js",
    recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
    recaptchaEnterpriseScript:
      "https://www.google.com/recaptcha/enterprise.js?render=",
  }),
    (ni = "Browser"),
    Pe(
      new I(
        "auth",
        (e, { options: t }) => {
          const n = e.getProvider("app").getImmediate(),
            r = e.getProvider("heartbeat"),
            i = e.getProvider("app-check-internal"),
            { apiKey: s, authDomain: o } = n.options;
          ot(s && !s.includes(":"), "invalid-api-key", { appName: n.name });
          const a = {
              apiKey: s,
              authDomain: o,
              clientPlatform: ni,
              apiHost: "identitytoolkit.googleapis.com",
              tokenApiHost: "securetoken.googleapis.com",
              apiScheme: "https",
              sdkClientVersion: rn(ni),
            },
            c = new an(n, r, i, a);
          return (
            (function (e, t) {
              const n = (null == t ? void 0 : t.persistence) || [],
                r = (Array.isArray(n) ? n : [n]).map($t);
              (null == t ? void 0 : t.errorMap) &&
                e._updateErrorMap(t.errorMap),
                e._initializeWithPersistence(
                  r,
                  null == t ? void 0 : t.popupRedirectResolver,
                );
            })(c, t),
            c
          );
        },
        "PUBLIC",
      )
        .setInstantiationMode("EXPLICIT")
        .setInstanceCreatedCallback((e, t, n) => {
          e.getProvider("auth-internal").initialize();
        }),
    ),
    Pe(
      new I(
        "auth-internal",
        (e) => ((e) => new Zr(e))(cn(e.getProvider("auth").getImmediate())),
        "PRIVATE",
      ).setInstantiationMode("EXPLICIT"),
    ),
    je(
      Jr,
      Yr,
      (function (e) {
        switch (e) {
          case "Node":
            return "node";
          case "ReactNative":
            return "rn";
          case "Worker":
            return "webworker";
          case "Cordova":
            return "cordova";
          case "WebExtension":
            return "web-extension";
          default:
            return;
        }
      })(ni),
    ),
    je(Jr, Yr, "esm2017");
  var ri,
    ii =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : {},
    si = {};
  (function () {
    var e;
    function t() {
      (this.blockSize = -1),
        (this.blockSize = 64),
        (this.g = Array(4)),
        (this.B = Array(this.blockSize)),
        (this.o = this.h = 0),
        this.s();
    }
    function n(e, t, n) {
      n || (n = 0);
      var r = Array(16);
      if ("string" == typeof t)
        for (var i = 0; 16 > i; ++i)
          r[i] =
            t.charCodeAt(n++) |
            (t.charCodeAt(n++) << 8) |
            (t.charCodeAt(n++) << 16) |
            (t.charCodeAt(n++) << 24);
      else
        for (i = 0; 16 > i; ++i)
          r[i] = t[n++] | (t[n++] << 8) | (t[n++] << 16) | (t[n++] << 24);
      (t = e.g[0]), (n = e.g[1]), (i = e.g[2]);
      var s = e.g[3],
        o = (t + (s ^ (n & (i ^ s))) + r[0] + 3614090360) & 4294967295;
      (o =
        ((n =
          (i =
            (s =
              (t =
                (n =
                  (i =
                    (s =
                      (t =
                        (n =
                          (i =
                            (s =
                              (t =
                                (n =
                                  (i =
                                    (s =
                                      (t =
                                        (n =
                                          (i =
                                            (s =
                                              (t =
                                                (n =
                                                  (i =
                                                    (s =
                                                      (t =
                                                        (n =
                                                          (i =
                                                            (s =
                                                              (t =
                                                                (n =
                                                                  (i =
                                                                    (s =
                                                                      (t =
                                                                        (n =
                                                                          (i =
                                                                            (s =
                                                                              (t =
                                                                                (n =
                                                                                  (i =
                                                                                    (s =
                                                                                      (t =
                                                                                        (n =
                                                                                          (i =
                                                                                            (s =
                                                                                              (t =
                                                                                                (n =
                                                                                                  (i =
                                                                                                    (s =
                                                                                                      (t =
                                                                                                        (n =
                                                                                                          (i =
                                                                                                            (s =
                                                                                                              (t =
                                                                                                                (n =
                                                                                                                  (i =
                                                                                                                    (s =
                                                                                                                      (t =
                                                                                                                        (n =
                                                                                                                          (i =
                                                                                                                            (s =
                                                                                                                              (t =
                                                                                                                                n +
                                                                                                                                (((o <<
                                                                                                                                  7) &
                                                                                                                                  4294967295) |
                                                                                                                                  (o >>>
                                                                                                                                    25))) +
                                                                                                                              ((((o =
                                                                                                                                (s +
                                                                                                                                  (i ^
                                                                                                                                    (t &
                                                                                                                                      (n ^
                                                                                                                                        i))) +
                                                                                                                                  r[1] +
                                                                                                                                  3905402710) &
                                                                                                                                4294967295) <<
                                                                                                                                12) &
                                                                                                                                4294967295) |
                                                                                                                                (o >>>
                                                                                                                                  20))) +
                                                                                                                            ((((o =
                                                                                                                              (i +
                                                                                                                                (n ^
                                                                                                                                  (s &
                                                                                                                                    (t ^
                                                                                                                                      n))) +
                                                                                                                                r[2] +
                                                                                                                                606105819) &
                                                                                                                              4294967295) <<
                                                                                                                              17) &
                                                                                                                              4294967295) |
                                                                                                                              (o >>>
                                                                                                                                15))) +
                                                                                                                          ((((o =
                                                                                                                            (n +
                                                                                                                              (t ^
                                                                                                                                (i &
                                                                                                                                  (s ^
                                                                                                                                    t))) +
                                                                                                                              r[3] +
                                                                                                                              3250441966) &
                                                                                                                            4294967295) <<
                                                                                                                            22) &
                                                                                                                            4294967295) |
                                                                                                                            (o >>>
                                                                                                                              10))) +
                                                                                                                        ((((o =
                                                                                                                          (t +
                                                                                                                            (s ^
                                                                                                                              (n &
                                                                                                                                (i ^
                                                                                                                                  s))) +
                                                                                                                            r[4] +
                                                                                                                            4118548399) &
                                                                                                                          4294967295) <<
                                                                                                                          7) &
                                                                                                                          4294967295) |
                                                                                                                          (o >>>
                                                                                                                            25))) +
                                                                                                                      ((((o =
                                                                                                                        (s +
                                                                                                                          (i ^
                                                                                                                            (t &
                                                                                                                              (n ^
                                                                                                                                i))) +
                                                                                                                          r[5] +
                                                                                                                          1200080426) &
                                                                                                                        4294967295) <<
                                                                                                                        12) &
                                                                                                                        4294967295) |
                                                                                                                        (o >>>
                                                                                                                          20))) +
                                                                                                                    ((((o =
                                                                                                                      (i +
                                                                                                                        (n ^
                                                                                                                          (s &
                                                                                                                            (t ^
                                                                                                                              n))) +
                                                                                                                        r[6] +
                                                                                                                        2821735955) &
                                                                                                                      4294967295) <<
                                                                                                                      17) &
                                                                                                                      4294967295) |
                                                                                                                      (o >>>
                                                                                                                        15))) +
                                                                                                                  ((((o =
                                                                                                                    (n +
                                                                                                                      (t ^
                                                                                                                        (i &
                                                                                                                          (s ^
                                                                                                                            t))) +
                                                                                                                      r[7] +
                                                                                                                      4249261313) &
                                                                                                                    4294967295) <<
                                                                                                                    22) &
                                                                                                                    4294967295) |
                                                                                                                    (o >>>
                                                                                                                      10))) +
                                                                                                                ((((o =
                                                                                                                  (t +
                                                                                                                    (s ^
                                                                                                                      (n &
                                                                                                                        (i ^
                                                                                                                          s))) +
                                                                                                                    r[8] +
                                                                                                                    1770035416) &
                                                                                                                  4294967295) <<
                                                                                                                  7) &
                                                                                                                  4294967295) |
                                                                                                                  (o >>>
                                                                                                                    25))) +
                                                                                                              ((((o =
                                                                                                                (s +
                                                                                                                  (i ^
                                                                                                                    (t &
                                                                                                                      (n ^
                                                                                                                        i))) +
                                                                                                                  r[9] +
                                                                                                                  2336552879) &
                                                                                                                4294967295) <<
                                                                                                                12) &
                                                                                                                4294967295) |
                                                                                                                (o >>>
                                                                                                                  20))) +
                                                                                                            ((((o =
                                                                                                              (i +
                                                                                                                (n ^
                                                                                                                  (s &
                                                                                                                    (t ^
                                                                                                                      n))) +
                                                                                                                r[10] +
                                                                                                                4294925233) &
                                                                                                              4294967295) <<
                                                                                                              17) &
                                                                                                              4294967295) |
                                                                                                              (o >>>
                                                                                                                15))) +
                                                                                                          ((((o =
                                                                                                            (n +
                                                                                                              (t ^
                                                                                                                (i &
                                                                                                                  (s ^
                                                                                                                    t))) +
                                                                                                              r[11] +
                                                                                                              2304563134) &
                                                                                                            4294967295) <<
                                                                                                            22) &
                                                                                                            4294967295) |
                                                                                                            (o >>>
                                                                                                              10))) +
                                                                                                        ((((o =
                                                                                                          (t +
                                                                                                            (s ^
                                                                                                              (n &
                                                                                                                (i ^
                                                                                                                  s))) +
                                                                                                            r[12] +
                                                                                                            1804603682) &
                                                                                                          4294967295) <<
                                                                                                          7) &
                                                                                                          4294967295) |
                                                                                                          (o >>>
                                                                                                            25))) +
                                                                                                      ((((o =
                                                                                                        (s +
                                                                                                          (i ^
                                                                                                            (t &
                                                                                                              (n ^
                                                                                                                i))) +
                                                                                                          r[13] +
                                                                                                          4254626195) &
                                                                                                        4294967295) <<
                                                                                                        12) &
                                                                                                        4294967295) |
                                                                                                        (o >>>
                                                                                                          20))) +
                                                                                                    ((((o =
                                                                                                      (i +
                                                                                                        (n ^
                                                                                                          (s &
                                                                                                            (t ^
                                                                                                              n))) +
                                                                                                        r[14] +
                                                                                                        2792965006) &
                                                                                                      4294967295) <<
                                                                                                      17) &
                                                                                                      4294967295) |
                                                                                                      (o >>>
                                                                                                        15))) +
                                                                                                  ((((o =
                                                                                                    (n +
                                                                                                      (t ^
                                                                                                        (i &
                                                                                                          (s ^
                                                                                                            t))) +
                                                                                                      r[15] +
                                                                                                      1236535329) &
                                                                                                    4294967295) <<
                                                                                                    22) &
                                                                                                    4294967295) |
                                                                                                    (o >>>
                                                                                                      10))) +
                                                                                                ((((o =
                                                                                                  (t +
                                                                                                    (i ^
                                                                                                      (s &
                                                                                                        (n ^
                                                                                                          i))) +
                                                                                                    r[1] +
                                                                                                    4129170786) &
                                                                                                  4294967295) <<
                                                                                                  5) &
                                                                                                  4294967295) |
                                                                                                  (o >>>
                                                                                                    27))) +
                                                                                              ((((o =
                                                                                                (s +
                                                                                                  (n ^
                                                                                                    (i &
                                                                                                      (t ^
                                                                                                        n))) +
                                                                                                  r[6] +
                                                                                                  3225465664) &
                                                                                                4294967295) <<
                                                                                                9) &
                                                                                                4294967295) |
                                                                                                (o >>>
                                                                                                  23))) +
                                                                                            ((((o =
                                                                                              (i +
                                                                                                (t ^
                                                                                                  (n &
                                                                                                    (s ^
                                                                                                      t))) +
                                                                                                r[11] +
                                                                                                643717713) &
                                                                                              4294967295) <<
                                                                                              14) &
                                                                                              4294967295) |
                                                                                              (o >>>
                                                                                                18))) +
                                                                                          ((((o =
                                                                                            (n +
                                                                                              (s ^
                                                                                                (t &
                                                                                                  (i ^
                                                                                                    s))) +
                                                                                              r[0] +
                                                                                              3921069994) &
                                                                                            4294967295) <<
                                                                                            20) &
                                                                                            4294967295) |
                                                                                            (o >>>
                                                                                              12))) +
                                                                                        ((((o =
                                                                                          (t +
                                                                                            (i ^
                                                                                              (s &
                                                                                                (n ^
                                                                                                  i))) +
                                                                                            r[5] +
                                                                                            3593408605) &
                                                                                          4294967295) <<
                                                                                          5) &
                                                                                          4294967295) |
                                                                                          (o >>>
                                                                                            27))) +
                                                                                      ((((o =
                                                                                        (s +
                                                                                          (n ^
                                                                                            (i &
                                                                                              (t ^
                                                                                                n))) +
                                                                                          r[10] +
                                                                                          38016083) &
                                                                                        4294967295) <<
                                                                                        9) &
                                                                                        4294967295) |
                                                                                        (o >>>
                                                                                          23))) +
                                                                                    ((((o =
                                                                                      (i +
                                                                                        (t ^
                                                                                          (n &
                                                                                            (s ^
                                                                                              t))) +
                                                                                        r[15] +
                                                                                        3634488961) &
                                                                                      4294967295) <<
                                                                                      14) &
                                                                                      4294967295) |
                                                                                      (o >>>
                                                                                        18))) +
                                                                                  ((((o =
                                                                                    (n +
                                                                                      (s ^
                                                                                        (t &
                                                                                          (i ^
                                                                                            s))) +
                                                                                      r[4] +
                                                                                      3889429448) &
                                                                                    4294967295) <<
                                                                                    20) &
                                                                                    4294967295) |
                                                                                    (o >>>
                                                                                      12))) +
                                                                                ((((o =
                                                                                  (t +
                                                                                    (i ^
                                                                                      (s &
                                                                                        (n ^
                                                                                          i))) +
                                                                                    r[9] +
                                                                                    568446438) &
                                                                                  4294967295) <<
                                                                                  5) &
                                                                                  4294967295) |
                                                                                  (o >>>
                                                                                    27))) +
                                                                              ((((o =
                                                                                (s +
                                                                                  (n ^
                                                                                    (i &
                                                                                      (t ^
                                                                                        n))) +
                                                                                  r[14] +
                                                                                  3275163606) &
                                                                                4294967295) <<
                                                                                9) &
                                                                                4294967295) |
                                                                                (o >>>
                                                                                  23))) +
                                                                            ((((o =
                                                                              (i +
                                                                                (t ^
                                                                                  (n &
                                                                                    (s ^
                                                                                      t))) +
                                                                                r[3] +
                                                                                4107603335) &
                                                                              4294967295) <<
                                                                              14) &
                                                                              4294967295) |
                                                                              (o >>>
                                                                                18))) +
                                                                          ((((o =
                                                                            (n +
                                                                              (s ^
                                                                                (t &
                                                                                  (i ^
                                                                                    s))) +
                                                                              r[8] +
                                                                              1163531501) &
                                                                            4294967295) <<
                                                                            20) &
                                                                            4294967295) |
                                                                            (o >>>
                                                                              12))) +
                                                                        ((((o =
                                                                          (t +
                                                                            (i ^
                                                                              (s &
                                                                                (n ^
                                                                                  i))) +
                                                                            r[13] +
                                                                            2850285829) &
                                                                          4294967295) <<
                                                                          5) &
                                                                          4294967295) |
                                                                          (o >>>
                                                                            27))) +
                                                                      ((((o =
                                                                        (s +
                                                                          (n ^
                                                                            (i &
                                                                              (t ^
                                                                                n))) +
                                                                          r[2] +
                                                                          4243563512) &
                                                                        4294967295) <<
                                                                        9) &
                                                                        4294967295) |
                                                                        (o >>>
                                                                          23))) +
                                                                    ((((o =
                                                                      (i +
                                                                        (t ^
                                                                          (n &
                                                                            (s ^
                                                                              t))) +
                                                                        r[7] +
                                                                        1735328473) &
                                                                      4294967295) <<
                                                                      14) &
                                                                      4294967295) |
                                                                      (o >>>
                                                                        18))) +
                                                                  ((((o =
                                                                    (n +
                                                                      (s ^
                                                                        (t &
                                                                          (i ^
                                                                            s))) +
                                                                      r[12] +
                                                                      2368359562) &
                                                                    4294967295) <<
                                                                    20) &
                                                                    4294967295) |
                                                                    (o >>>
                                                                      12))) +
                                                                ((((o =
                                                                  (t +
                                                                    (n ^
                                                                      i ^
                                                                      s) +
                                                                    r[5] +
                                                                    4294588738) &
                                                                  4294967295) <<
                                                                  4) &
                                                                  4294967295) |
                                                                  (o >>> 28))) +
                                                              ((((o =
                                                                (s +
                                                                  (t ^ n ^ i) +
                                                                  r[8] +
                                                                  2272392833) &
                                                                4294967295) <<
                                                                11) &
                                                                4294967295) |
                                                                (o >>> 21))) +
                                                            ((((o =
                                                              (i +
                                                                (s ^ t ^ n) +
                                                                r[11] +
                                                                1839030562) &
                                                              4294967295) <<
                                                              16) &
                                                              4294967295) |
                                                              (o >>> 16))) +
                                                          ((((o =
                                                            (n +
                                                              (i ^ s ^ t) +
                                                              r[14] +
                                                              4259657740) &
                                                            4294967295) <<
                                                            23) &
                                                            4294967295) |
                                                            (o >>> 9))) +
                                                        ((((o =
                                                          (t +
                                                            (n ^ i ^ s) +
                                                            r[1] +
                                                            2763975236) &
                                                          4294967295) <<
                                                          4) &
                                                          4294967295) |
                                                          (o >>> 28))) +
                                                      ((((o =
                                                        (s +
                                                          (t ^ n ^ i) +
                                                          r[4] +
                                                          1272893353) &
                                                        4294967295) <<
                                                        11) &
                                                        4294967295) |
                                                        (o >>> 21))) +
                                                    ((((o =
                                                      (i +
                                                        (s ^ t ^ n) +
                                                        r[7] +
                                                        4139469664) &
                                                      4294967295) <<
                                                      16) &
                                                      4294967295) |
                                                      (o >>> 16))) +
                                                  ((((o =
                                                    (n +
                                                      (i ^ s ^ t) +
                                                      r[10] +
                                                      3200236656) &
                                                    4294967295) <<
                                                    23) &
                                                    4294967295) |
                                                    (o >>> 9))) +
                                                ((((o =
                                                  (t +
                                                    (n ^ i ^ s) +
                                                    r[13] +
                                                    681279174) &
                                                  4294967295) <<
                                                  4) &
                                                  4294967295) |
                                                  (o >>> 28))) +
                                              ((((o =
                                                (s +
                                                  (t ^ n ^ i) +
                                                  r[0] +
                                                  3936430074) &
                                                4294967295) <<
                                                11) &
                                                4294967295) |
                                                (o >>> 21))) +
                                            ((((o =
                                              (i +
                                                (s ^ t ^ n) +
                                                r[3] +
                                                3572445317) &
                                              4294967295) <<
                                              16) &
                                              4294967295) |
                                              (o >>> 16))) +
                                          ((((o =
                                            (n +
                                              (i ^ s ^ t) +
                                              r[6] +
                                              76029189) &
                                            4294967295) <<
                                            23) &
                                            4294967295) |
                                            (o >>> 9))) +
                                        ((((o =
                                          (t +
                                            (n ^ i ^ s) +
                                            r[9] +
                                            3654602809) &
                                          4294967295) <<
                                          4) &
                                          4294967295) |
                                          (o >>> 28))) +
                                      ((((o =
                                        (s + (t ^ n ^ i) + r[12] + 3873151461) &
                                        4294967295) <<
                                        11) &
                                        4294967295) |
                                        (o >>> 21))) +
                                    ((((o =
                                      (i + (s ^ t ^ n) + r[15] + 530742520) &
                                      4294967295) <<
                                      16) &
                                      4294967295) |
                                      (o >>> 16))) +
                                  ((((o =
                                    (n + (i ^ s ^ t) + r[2] + 3299628645) &
                                    4294967295) <<
                                    23) &
                                    4294967295) |
                                    (o >>> 9))) +
                                ((((o =
                                  (t + (i ^ (n | ~s)) + r[0] + 4096336452) &
                                  4294967295) <<
                                  6) &
                                  4294967295) |
                                  (o >>> 26))) +
                              ((((o =
                                (s + (n ^ (t | ~i)) + r[7] + 1126891415) &
                                4294967295) <<
                                10) &
                                4294967295) |
                                (o >>> 22))) +
                            ((((o =
                              (i + (t ^ (s | ~n)) + r[14] + 2878612391) &
                              4294967295) <<
                              15) &
                              4294967295) |
                              (o >>> 17))) +
                          ((((o =
                            (n + (s ^ (i | ~t)) + r[5] + 4237533241) &
                            4294967295) <<
                            21) &
                            4294967295) |
                            (o >>> 11))) +
                        ((((o =
                          (t + (i ^ (n | ~s)) + r[12] + 1700485571) &
                          4294967295) <<
                          6) &
                          4294967295) |
                          (o >>> 26))) +
                      ((((o =
                        (s + (n ^ (t | ~i)) + r[3] + 2399980690) &
                        4294967295) <<
                        10) &
                        4294967295) |
                        (o >>> 22))) +
                    ((((o =
                      (i + (t ^ (s | ~n)) + r[10] + 4293915773) & 4294967295) <<
                      15) &
                      4294967295) |
                      (o >>> 17))) +
                  ((((o =
                    (n + (s ^ (i | ~t)) + r[1] + 2240044497) & 4294967295) <<
                    21) &
                    4294967295) |
                    (o >>> 11))) +
                ((((o =
                  (t + (i ^ (n | ~s)) + r[8] + 1873313359) & 4294967295) <<
                  6) &
                  4294967295) |
                  (o >>> 26))) +
              ((((o = (s + (n ^ (t | ~i)) + r[15] + 4264355552) & 4294967295) <<
                10) &
                4294967295) |
                (o >>> 22))) +
            ((((o = (i + (t ^ (s | ~n)) + r[6] + 2734768916) & 4294967295) <<
              15) &
              4294967295) |
              (o >>> 17))) +
          ((((o = (n + (s ^ (i | ~t)) + r[13] + 1309151649) & 4294967295) <<
            21) &
            4294967295) |
            (o >>> 11))) +
          ((s =
            (t =
              n +
              ((((o = (t + (i ^ (n | ~s)) + r[4] + 4149444226) & 4294967295) <<
                6) &
                4294967295) |
                (o >>> 26))) +
            ((((o = (s + (n ^ (t | ~i)) + r[11] + 3174756917) & 4294967295) <<
              10) &
              4294967295) |
              (o >>> 22))) ^
            ((i =
              s +
              ((((o = (i + (t ^ (s | ~n)) + r[2] + 718787259) & 4294967295) <<
                15) &
                4294967295) |
                (o >>> 17))) |
              ~t)) +
          r[9] +
          3951481745) &
        4294967295),
        (e.g[0] = (e.g[0] + t) & 4294967295),
        (e.g[1] =
          (e.g[1] + (i + (((o << 21) & 4294967295) | (o >>> 11)))) &
          4294967295),
        (e.g[2] = (e.g[2] + i) & 4294967295),
        (e.g[3] = (e.g[3] + s) & 4294967295);
    }
    function r(e, t) {
      this.h = t;
      for (var n = [], r = !0, i = e.length - 1; 0 <= i; i--) {
        var s = 0 | e[i];
        (r && s == t) || ((n[i] = s), (r = !1));
      }
      this.g = n;
    }
    !(function (e, t) {
      function n() {}
      (n.prototype = t.prototype),
        (e.D = t.prototype),
        (e.prototype = new n()),
        (e.prototype.constructor = e),
        (e.C = function (e, n, r) {
          for (
            var i = Array(arguments.length - 2), s = 2;
            s < arguments.length;
            s++
          )
            i[s - 2] = arguments[s];
          return t.prototype[n].apply(e, i);
        });
    })(t, function () {
      this.blockSize = -1;
    }),
      (t.prototype.s = function () {
        (this.g[0] = 1732584193),
          (this.g[1] = 4023233417),
          (this.g[2] = 2562383102),
          (this.g[3] = 271733878),
          (this.o = this.h = 0);
      }),
      (t.prototype.u = function (e, t) {
        void 0 === t && (t = e.length);
        for (
          var r = t - this.blockSize, i = this.B, s = this.h, o = 0;
          o < t;

        ) {
          if (0 == s) for (; o <= r; ) n(this, e, o), (o += this.blockSize);
          if ("string" == typeof e) {
            for (; o < t; )
              if (((i[s++] = e.charCodeAt(o++)), s == this.blockSize)) {
                n(this, i), (s = 0);
                break;
              }
          } else
            for (; o < t; )
              if (((i[s++] = e[o++]), s == this.blockSize)) {
                n(this, i), (s = 0);
                break;
              }
        }
        (this.h = s), (this.o += t);
      }),
      (t.prototype.v = function () {
        var e = Array(
          (56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h,
        );
        e[0] = 128;
        for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
        var n = 8 * this.o;
        for (t = e.length - 8; t < e.length; ++t) (e[t] = 255 & n), (n /= 256);
        for (this.u(e), e = Array(16), t = n = 0; 4 > t; ++t)
          for (var r = 0; 32 > r; r += 8) e[n++] = (this.g[t] >>> r) & 255;
        return e;
      });
    var i = {};
    function s(e) {
      return -128 <= e && 128 > e
        ? (function (e) {
            var t = i;
            return Object.prototype.hasOwnProperty.call(t, e)
              ? t[e]
              : (t[e] = (function (e) {
                  return new r([0 | e], 0 > e ? -1 : 0);
                })(e));
          })(e)
        : new r([0 | e], 0 > e ? -1 : 0);
    }
    function o(e) {
      if (isNaN(e) || !isFinite(e)) return a;
      if (0 > e) return d(o(-e));
      for (var t = [], n = 1, i = 0; e >= n; i++)
        (t[i] = (e / n) | 0), (n *= 4294967296);
      return new r(t, 0);
    }
    var a = s(0),
      c = s(1),
      u = s(16777216);
    function l(e) {
      if (0 != e.h) return !1;
      for (var t = 0; t < e.g.length; t++) if (0 != e.g[t]) return !1;
      return !0;
    }
    function h(e) {
      return -1 == e.h;
    }
    function d(e) {
      for (var t = e.g.length, n = [], i = 0; i < t; i++) n[i] = ~e.g[i];
      return new r(n, ~e.h).add(c);
    }
    function f(e, t) {
      return e.add(d(t));
    }
    function p(e, t) {
      for (; (65535 & e[t]) != e[t]; )
        (e[t + 1] += e[t] >>> 16), (e[t] &= 65535), t++;
    }
    function g(e, t) {
      (this.g = e), (this.h = t);
    }
    function m(e, t) {
      if (l(t)) throw Error("division by zero");
      if (l(e)) return new g(a, a);
      if (h(e)) return (t = m(d(e), t)), new g(d(t.g), d(t.h));
      if (h(t)) return (t = m(e, d(t))), new g(d(t.g), t.h);
      if (30 < e.g.length) {
        if (h(e) || h(t))
          throw Error("slowDivide_ only works with positive integers.");
        for (var n = c, r = t; 0 >= r.l(e); ) (n = y(n)), (r = y(r));
        var i = v(n, 1),
          s = v(r, 1);
        for (r = v(r, 2), n = v(n, 2); !l(r); ) {
          var u = s.add(r);
          0 >= u.l(e) && ((i = i.add(n)), (s = u)),
            (r = v(r, 1)),
            (n = v(n, 1));
        }
        return (t = f(e, i.j(t))), new g(i, t);
      }
      for (i = a; 0 <= e.l(t); ) {
        for (
          n = Math.max(1, Math.floor(e.m() / t.m())),
            r =
              48 >= (r = Math.ceil(Math.log(n) / Math.LN2))
                ? 1
                : Math.pow(2, r - 48),
            u = (s = o(n)).j(t);
          h(u) || 0 < u.l(e);

        )
          u = (s = o((n -= r))).j(t);
        l(s) && (s = c), (i = i.add(s)), (e = f(e, u));
      }
      return new g(i, e);
    }
    function y(e) {
      for (var t = e.g.length + 1, n = [], i = 0; i < t; i++)
        n[i] = (e.i(i) << 1) | (e.i(i - 1) >>> 31);
      return new r(n, e.h);
    }
    function v(e, t) {
      var n = t >> 5;
      t %= 32;
      for (var i = e.g.length - n, s = [], o = 0; o < i; o++)
        s[o] =
          0 < t
            ? (e.i(o + n) >>> t) | (e.i(o + n + 1) << (32 - t))
            : e.i(o + n);
      return new r(s, e.h);
    }
    ((e = r.prototype).m = function () {
      if (h(this)) return -d(this).m();
      for (var e = 0, t = 1, n = 0; n < this.g.length; n++) {
        var r = this.i(n);
        (e += (0 <= r ? r : 4294967296 + r) * t), (t *= 4294967296);
      }
      return e;
    }),
      (e.toString = function (e) {
        if (2 > (e = e || 10) || 36 < e)
          throw Error("radix out of range: " + e);
        if (l(this)) return "0";
        if (h(this)) return "-" + d(this).toString(e);
        for (var t = o(Math.pow(e, 6)), n = this, r = ""; ; ) {
          var i = m(n, t).g,
            s = (
              (0 < (n = f(n, i.j(t))).g.length ? n.g[0] : n.h) >>> 0
            ).toString(e);
          if (l((n = i))) return s + r;
          for (; 6 > s.length; ) s = "0" + s;
          r = s + r;
        }
      }),
      (e.i = function (e) {
        return 0 > e ? 0 : e < this.g.length ? this.g[e] : this.h;
      }),
      (e.l = function (e) {
        return h((e = f(this, e))) ? -1 : l(e) ? 0 : 1;
      }),
      (e.abs = function () {
        return h(this) ? d(this) : this;
      }),
      (e.add = function (e) {
        for (
          var t = Math.max(this.g.length, e.g.length), n = [], i = 0, s = 0;
          s <= t;
          s++
        ) {
          var o = i + (65535 & this.i(s)) + (65535 & e.i(s)),
            a = (o >>> 16) + (this.i(s) >>> 16) + (e.i(s) >>> 16);
          (i = a >>> 16), (o &= 65535), (a &= 65535), (n[s] = (a << 16) | o);
        }
        return new r(n, -2147483648 & n[n.length - 1] ? -1 : 0);
      }),
      (e.j = function (e) {
        if (l(this) || l(e)) return a;
        if (h(this)) return h(e) ? d(this).j(d(e)) : d(d(this).j(e));
        if (h(e)) return d(this.j(d(e)));
        if (0 > this.l(u) && 0 > e.l(u)) return o(this.m() * e.m());
        for (var t = this.g.length + e.g.length, n = [], i = 0; i < 2 * t; i++)
          n[i] = 0;
        for (i = 0; i < this.g.length; i++)
          for (var s = 0; s < e.g.length; s++) {
            var c = this.i(i) >>> 16,
              f = 65535 & this.i(i),
              g = e.i(s) >>> 16,
              m = 65535 & e.i(s);
            (n[2 * i + 2 * s] += f * m),
              p(n, 2 * i + 2 * s),
              (n[2 * i + 2 * s + 1] += c * m),
              p(n, 2 * i + 2 * s + 1),
              (n[2 * i + 2 * s + 1] += f * g),
              p(n, 2 * i + 2 * s + 1),
              (n[2 * i + 2 * s + 2] += c * g),
              p(n, 2 * i + 2 * s + 2);
          }
        for (i = 0; i < t; i++) n[i] = (n[2 * i + 1] << 16) | n[2 * i];
        for (i = t; i < 2 * t; i++) n[i] = 0;
        return new r(n, 0);
      }),
      (e.A = function (e) {
        return m(this, e).h;
      }),
      (e.and = function (e) {
        for (
          var t = Math.max(this.g.length, e.g.length), n = [], i = 0;
          i < t;
          i++
        )
          n[i] = this.i(i) & e.i(i);
        return new r(n, this.h & e.h);
      }),
      (e.or = function (e) {
        for (
          var t = Math.max(this.g.length, e.g.length), n = [], i = 0;
          i < t;
          i++
        )
          n[i] = this.i(i) | e.i(i);
        return new r(n, this.h | e.h);
      }),
      (e.xor = function (e) {
        for (
          var t = Math.max(this.g.length, e.g.length), n = [], i = 0;
          i < t;
          i++
        )
          n[i] = this.i(i) ^ e.i(i);
        return new r(n, this.h ^ e.h);
      }),
      (t.prototype.digest = t.prototype.v),
      (t.prototype.reset = t.prototype.s),
      (t.prototype.update = t.prototype.u),
      (si.Md5 = t),
      (r.prototype.add = r.prototype.add),
      (r.prototype.multiply = r.prototype.j),
      (r.prototype.modulo = r.prototype.A),
      (r.prototype.compare = r.prototype.l),
      (r.prototype.toNumber = r.prototype.m),
      (r.prototype.toString = r.prototype.toString),
      (r.prototype.getBits = r.prototype.i),
      (r.fromNumber = o),
      (r.fromString = function e(t, n) {
        if (0 == t.length) throw Error("number format error: empty string");
        if (2 > (n = n || 10) || 36 < n)
          throw Error("radix out of range: " + n);
        if ("-" == t.charAt(0)) return d(e(t.substring(1), n));
        if (0 <= t.indexOf("-"))
          throw Error('number format error: interior "-" character');
        for (var r = o(Math.pow(n, 8)), i = a, s = 0; s < t.length; s += 8) {
          var c = Math.min(8, t.length - s),
            u = parseInt(t.substring(s, s + c), n);
          8 > c
            ? ((c = o(Math.pow(n, c))), (i = i.j(c).add(o(u))))
            : (i = (i = i.j(r)).add(o(u)));
        }
        return i;
      }),
      (ri = si.Integer = r);
  }).apply(
    void 0 !== ii
      ? ii
      : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
          ? window
          : {},
  );
  var oi,
    ai,
    ci,
    ui,
    li,
    hi,
    di,
    fi,
    pi =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : {},
    gi = {};
  (function () {
    var e,
      t =
        "function" == typeof Object.defineProperties
          ? Object.defineProperty
          : function (e, t, n) {
              return (
                e == Array.prototype ||
                  e == Object.prototype ||
                  (e[t] = n.value),
                e
              );
            },
      n = (function (e) {
        e = [
          "object" == typeof globalThis && globalThis,
          e,
          "object" == typeof window && window,
          "object" == typeof self && self,
          "object" == typeof pi && pi,
        ];
        for (var t = 0; t < e.length; ++t) {
          var n = e[t];
          if (n && n.Math == Math) return n;
        }
        throw Error("Cannot find global object");
      })(this);
    !(function (e, r) {
      if (r)
        e: {
          var i = n;
          e = e.split(".");
          for (var s = 0; s < e.length - 1; s++) {
            var o = e[s];
            if (!(o in i)) break e;
            i = i[o];
          }
          (r = r((s = i[(e = e[e.length - 1])]))) != s &&
            null != r &&
            t(i, e, { configurable: !0, writable: !0, value: r });
        }
    })("Array.prototype.values", function (e) {
      return (
        e ||
        function () {
          return (function (e, t) {
            e instanceof String && (e += "");
            var n = 0,
              r = !1,
              i = {
                next: function () {
                  if (!r && n < e.length) {
                    var i = n++;
                    return { value: t(0, e[i]), done: !1 };
                  }
                  return (r = !0), { done: !0, value: void 0 };
                },
              };
            return (
              (i[Symbol.iterator] = function () {
                return i;
              }),
              i
            );
          })(this, function (e, t) {
            return t;
          });
        }
      );
    });
    var r = r || {},
      i = this || self;
    function s(e) {
      var t = typeof e;
      return (
        "array" ==
          (t =
            "object" != t
              ? t
              : e
                ? Array.isArray(e)
                  ? "array"
                  : t
                : "null") ||
        ("object" == t && "number" == typeof e.length)
      );
    }
    function o(e) {
      var t = typeof e;
      return ("object" == t && null != e) || "function" == t;
    }
    function a(e, t, n) {
      return e.call.apply(e.bind, arguments);
    }
    function c(e, t, n) {
      if (!e) throw Error();
      if (2 < arguments.length) {
        var r = Array.prototype.slice.call(arguments, 2);
        return function () {
          var n = Array.prototype.slice.call(arguments);
          return Array.prototype.unshift.apply(n, r), e.apply(t, n);
        };
      }
      return function () {
        return e.apply(t, arguments);
      };
    }
    function u(e, t, n) {
      return (u =
        Function.prototype.bind &&
        -1 != Function.prototype.bind.toString().indexOf("native code")
          ? a
          : c).apply(null, arguments);
    }
    function l(e, t) {
      var n = Array.prototype.slice.call(arguments, 1);
      return function () {
        var t = n.slice();
        return t.push.apply(t, arguments), e.apply(this, t);
      };
    }
    function h(e, t) {
      function n() {}
      (n.prototype = t.prototype),
        (e.aa = t.prototype),
        (e.prototype = new n()),
        (e.prototype.constructor = e),
        (e.Qb = function (e, n, r) {
          for (
            var i = Array(arguments.length - 2), s = 2;
            s < arguments.length;
            s++
          )
            i[s - 2] = arguments[s];
          return t.prototype[n].apply(e, i);
        });
    }
    function d(e) {
      const t = e.length;
      if (0 < t) {
        const n = Array(t);
        for (let r = 0; r < t; r++) n[r] = e[r];
        return n;
      }
      return [];
    }
    function f(e, t) {
      for (let t = 1; t < arguments.length; t++) {
        const n = arguments[t];
        if (s(n)) {
          const t = e.length || 0,
            r = n.length || 0;
          e.length = t + r;
          for (let i = 0; i < r; i++) e[t + i] = n[i];
        } else e.push(n);
      }
    }
    function p(e) {
      return /^[\s\xa0]*$/.test(e);
    }
    function g() {
      var e = i.navigator;
      return e && (e = e.userAgent) ? e : "";
    }
    function m(e) {
      return m[" "](e), e;
    }
    m[" "] = function () {};
    var y = !(
      -1 == g().indexOf("Gecko") ||
      (-1 != g().toLowerCase().indexOf("webkit") &&
        -1 == g().indexOf("Edge")) ||
      -1 != g().indexOf("Trident") ||
      -1 != g().indexOf("MSIE") ||
      -1 != g().indexOf("Edge")
    );
    function v(e, t, n) {
      for (const r in e) t.call(n, e[r], r, e);
    }
    function w(e) {
      const t = {};
      for (const n in e) t[n] = e[n];
      return t;
    }
    const _ =
      "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
        " ",
      );
    function E(e, t) {
      let n, r;
      for (let t = 1; t < arguments.length; t++) {
        for (n in ((r = arguments[t]), r)) e[n] = r[n];
        for (let t = 0; t < _.length; t++)
          (n = _[t]),
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
    }
    function b(e) {
      var t = 1;
      e = e.split(":");
      const n = [];
      for (; 0 < t && e.length; ) n.push(e.shift()), t--;
      return e.length && n.push(e.join(":")), n;
    }
    function I(e) {
      i.setTimeout(() => {
        throw e;
      }, 0);
    }
    function T() {
      var e = N;
      let t = null;
      return (
        e.g &&
          ((t = e.g), (e.g = e.g.next), e.g || (e.h = null), (t.next = null)),
        t
      );
    }
    var S = new (class {
      constructor(e, t) {
        (this.i = e), (this.j = t), (this.h = 0), (this.g = null);
      }
      get() {
        let e;
        return (
          0 < this.h
            ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null))
            : (e = this.i()),
          e
        );
      }
    })(
      () => new C(),
      (e) => e.reset(),
    );
    class C {
      constructor() {
        this.next = this.g = this.h = null;
      }
      set(e, t) {
        (this.h = e), (this.g = t), (this.next = null);
      }
      reset() {
        this.next = this.g = this.h = null;
      }
    }
    let A,
      k = !1,
      N = new (class {
        constructor() {
          this.h = this.g = null;
        }
        add(e, t) {
          const n = S.get();
          n.set(e, t), this.h ? (this.h.next = n) : (this.g = n), (this.h = n);
        }
      })(),
      R = () => {
        const e = i.Promise.resolve(void 0);
        A = () => {
          e.then(O);
        };
      };
    var O = () => {
      for (var e; (e = T()); ) {
        try {
          e.h.call(e.g);
        } catch (e) {
          I(e);
        }
        var t = S;
        t.j(e), 100 > t.h && (t.h++, (e.next = t.g), (t.g = e));
      }
      k = !1;
    };
    function P() {
      (this.s = this.s), (this.C = this.C);
    }
    function D(e, t) {
      (this.type = e), (this.g = this.target = t), (this.defaultPrevented = !1);
    }
    (P.prototype.s = !1),
      (P.prototype.ma = function () {
        this.s || ((this.s = !0), this.N());
      }),
      (P.prototype.N = function () {
        if (this.C) for (; this.C.length; ) this.C.shift()();
      }),
      (D.prototype.h = function () {
        this.defaultPrevented = !0;
      });
    var L = (function () {
      if (!i.addEventListener || !Object.defineProperty) return !1;
      var e = !1,
        t = Object.defineProperty({}, "passive", {
          get: function () {
            e = !0;
          },
        });
      try {
        const e = () => {};
        i.addEventListener("test", e, t), i.removeEventListener("test", e, t);
      } catch (e) {}
      return e;
    })();
    function x(e, t) {
      if (
        (D.call(this, e ? e.type : ""),
        (this.relatedTarget = this.g = this.target = null),
        (this.button =
          this.screenY =
          this.screenX =
          this.clientY =
          this.clientX =
            0),
        (this.key = ""),
        (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
        (this.state = null),
        (this.pointerId = 0),
        (this.pointerType = ""),
        (this.i = null),
        e)
      ) {
        var n = (this.type = e.type),
          r =
            e.changedTouches && e.changedTouches.length
              ? e.changedTouches[0]
              : null;
        if (
          ((this.target = e.target || e.srcElement),
          (this.g = t),
          (t = e.relatedTarget))
        ) {
          if (y) {
            e: {
              try {
                m(t.nodeName);
                var i = !0;
                break e;
              } catch (e) {}
              i = !1;
            }
            i || (t = null);
          }
        } else
          "mouseover" == n
            ? (t = e.fromElement)
            : "mouseout" == n && (t = e.toElement);
        (this.relatedTarget = t),
          r
            ? ((this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX),
              (this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY),
              (this.screenX = r.screenX || 0),
              (this.screenY = r.screenY || 0))
            : ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
              (this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
              (this.screenX = e.screenX || 0),
              (this.screenY = e.screenY || 0)),
          (this.button = e.button),
          (this.key = e.key || ""),
          (this.ctrlKey = e.ctrlKey),
          (this.altKey = e.altKey),
          (this.shiftKey = e.shiftKey),
          (this.metaKey = e.metaKey),
          (this.pointerId = e.pointerId || 0),
          (this.pointerType =
            "string" == typeof e.pointerType
              ? e.pointerType
              : M[e.pointerType] || ""),
          (this.state = e.state),
          (this.i = e),
          e.defaultPrevented && x.aa.h.call(this);
      }
    }
    h(x, D);
    var M = { 2: "touch", 3: "pen", 4: "mouse" };
    x.prototype.h = function () {
      x.aa.h.call(this);
      var e = this.i;
      e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
    };
    var U = "closure_listenable_" + ((1e6 * Math.random()) | 0),
      V = 0;
    function F(e, t, n, r, i) {
      (this.listener = e),
        (this.proxy = null),
        (this.src = t),
        (this.type = n),
        (this.capture = !!r),
        (this.ha = i),
        (this.key = ++V),
        (this.da = this.fa = !1);
    }
    function j(e) {
      (e.da = !0),
        (e.listener = null),
        (e.proxy = null),
        (e.src = null),
        (e.ha = null);
    }
    function B(e) {
      (this.src = e), (this.g = {}), (this.h = 0);
    }
    function $(e, t) {
      var n = t.type;
      if (n in e.g) {
        var r,
          i = e.g[n],
          s = Array.prototype.indexOf.call(i, t, void 0);
        (r = 0 <= s) && Array.prototype.splice.call(i, s, 1),
          r && (j(t), 0 == e.g[n].length && (delete e.g[n], e.h--));
      }
    }
    function H(e, t, n, r) {
      for (var i = 0; i < e.length; ++i) {
        var s = e[i];
        if (!s.da && s.listener == t && s.capture == !!n && s.ha == r) return i;
      }
      return -1;
    }
    B.prototype.add = function (e, t, n, r, i) {
      var s = e.toString();
      (e = this.g[s]) || ((e = this.g[s] = []), this.h++);
      var o = H(e, t, r, i);
      return (
        -1 < o
          ? ((t = e[o]), n || (t.fa = !1))
          : (((t = new F(t, this.src, s, !!r, i)).fa = n), e.push(t)),
        t
      );
    };
    var z = "closure_lm_" + ((1e6 * Math.random()) | 0),
      q = {};
    function G(e, t, n, r, i) {
      if (r && r.once) return W(e, t, n, r, i);
      if (Array.isArray(t)) {
        for (var s = 0; s < t.length; s++) G(e, t[s], n, r, i);
        return null;
      }
      return (
        (n = te(n)),
        e && e[U]
          ? e.K(t, n, o(r) ? !!r.capture : !!r, i)
          : K(e, t, n, !1, r, i)
      );
    }
    function K(e, t, n, r, i, s) {
      if (!t) throw Error("Invalid event type");
      var a = o(i) ? !!i.capture : !!i,
        c = Z(e);
      if ((c || (e[z] = c = new B(e)), (n = c.add(t, n, r, a, s)).proxy))
        return n;
      if (
        ((r = (function () {
          const e = Y;
          return function t(n) {
            return e.call(t.src, t.listener, n);
          };
        })()),
        (n.proxy = r),
        (r.src = e),
        (r.listener = n),
        e.addEventListener)
      )
        L || (i = a),
          void 0 === i && (i = !1),
          e.addEventListener(t.toString(), r, i);
      else if (e.attachEvent) e.attachEvent(J(t.toString()), r);
      else {
        if (!e.addListener || !e.removeListener)
          throw Error("addEventListener and attachEvent are unavailable.");
        e.addListener(r);
      }
      return n;
    }
    function W(e, t, n, r, i) {
      if (Array.isArray(t)) {
        for (var s = 0; s < t.length; s++) W(e, t[s], n, r, i);
        return null;
      }
      return (
        (n = te(n)),
        e && e[U]
          ? e.L(t, n, o(r) ? !!r.capture : !!r, i)
          : K(e, t, n, !0, r, i)
      );
    }
    function Q(e, t, n, r, i) {
      if (Array.isArray(t))
        for (var s = 0; s < t.length; s++) Q(e, t[s], n, r, i);
      else
        (r = o(r) ? !!r.capture : !!r),
          (n = te(n)),
          e && e[U]
            ? ((e = e.i),
              (t = String(t).toString()) in e.g &&
                -1 < (n = H((s = e.g[t]), n, r, i)) &&
                (j(s[n]),
                Array.prototype.splice.call(s, n, 1),
                0 == s.length && (delete e.g[t], e.h--)))
            : e &&
              (e = Z(e)) &&
              ((t = e.g[t.toString()]),
              (e = -1),
              t && (e = H(t, n, r, i)),
              (n = -1 < e ? t[e] : null) && X(n));
    }
    function X(e) {
      if ("number" != typeof e && e && !e.da) {
        var t = e.src;
        if (t && t[U]) $(t.i, e);
        else {
          var n = e.type,
            r = e.proxy;
          t.removeEventListener
            ? t.removeEventListener(n, r, e.capture)
            : t.detachEvent
              ? t.detachEvent(J(n), r)
              : t.addListener && t.removeListener && t.removeListener(r),
            (n = Z(t))
              ? ($(n, e), 0 == n.h && ((n.src = null), (t[z] = null)))
              : j(e);
        }
      }
    }
    function J(e) {
      return e in q ? q[e] : (q[e] = "on" + e);
    }
    function Y(e, t) {
      if (e.da) e = !0;
      else {
        t = new x(t, this);
        var n = e.listener,
          r = e.ha || e.src;
        e.fa && X(e), (e = n.call(r, t));
      }
      return e;
    }
    function Z(e) {
      return (e = e[z]) instanceof B ? e : null;
    }
    var ee = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
    function te(e) {
      return "function" == typeof e
        ? e
        : (e[ee] ||
            (e[ee] = function (t) {
              return e.handleEvent(t);
            }),
          e[ee]);
    }
    function ne() {
      P.call(this), (this.i = new B(this)), (this.M = this), (this.F = null);
    }
    function re(e, t) {
      var n,
        r = e.F;
      if (r) for (n = []; r; r = r.F) n.push(r);
      if (((e = e.M), (r = t.type || t), "string" == typeof t)) t = new D(t, e);
      else if (t instanceof D) t.target = t.target || e;
      else {
        var i = t;
        E((t = new D(r, e)), i);
      }
      if (((i = !0), n))
        for (var s = n.length - 1; 0 <= s; s--) {
          var o = (t.g = n[s]);
          i = ie(o, r, !0, t) && i;
        }
      if (
        ((i = ie((o = t.g = e), r, !0, t) && i), (i = ie(o, r, !1, t) && i), n)
      )
        for (s = 0; s < n.length; s++) i = ie((o = t.g = n[s]), r, !1, t) && i;
    }
    function ie(e, t, n, r) {
      if (!(t = e.i.g[String(t)])) return !0;
      t = t.concat();
      for (var i = !0, s = 0; s < t.length; ++s) {
        var o = t[s];
        if (o && !o.da && o.capture == n) {
          var a = o.listener,
            c = o.ha || o.src;
          o.fa && $(e.i, o), (i = !1 !== a.call(c, r) && i);
        }
      }
      return i && !r.defaultPrevented;
    }
    function se(e, t, n) {
      if ("function" == typeof e) n && (e = u(e, n));
      else {
        if (!e || "function" != typeof e.handleEvent)
          throw Error("Invalid listener argument");
        e = u(e.handleEvent, e);
      }
      return 2147483647 < Number(t) ? -1 : i.setTimeout(e, t || 0);
    }
    function oe(e) {
      e.g = se(() => {
        (e.g = null), e.i && ((e.i = !1), oe(e));
      }, e.l);
      const t = e.h;
      (e.h = null), e.m.apply(null, t);
    }
    h(ne, P),
      (ne.prototype[U] = !0),
      (ne.prototype.removeEventListener = function (e, t, n, r) {
        Q(this, e, t, n, r);
      }),
      (ne.prototype.N = function () {
        if ((ne.aa.N.call(this), this.i)) {
          var e,
            t = this.i;
          for (e in t.g) {
            for (var n = t.g[e], r = 0; r < n.length; r++) j(n[r]);
            delete t.g[e], t.h--;
          }
        }
        this.F = null;
      }),
      (ne.prototype.K = function (e, t, n, r) {
        return this.i.add(String(e), t, !1, n, r);
      }),
      (ne.prototype.L = function (e, t, n, r) {
        return this.i.add(String(e), t, !0, n, r);
      });
    class ae extends P {
      constructor(e, t) {
        super(),
          (this.m = e),
          (this.l = t),
          (this.h = null),
          (this.i = !1),
          (this.g = null);
      }
      j(e) {
        (this.h = arguments), this.g ? (this.i = !0) : oe(this);
      }
      N() {
        super.N(),
          this.g &&
            (i.clearTimeout(this.g),
            (this.g = null),
            (this.i = !1),
            (this.h = null));
      }
    }
    function ce(e) {
      P.call(this), (this.h = e), (this.g = {});
    }
    h(ce, P);
    var ue = [];
    function le(e) {
      v(
        e.g,
        function (e, t) {
          this.g.hasOwnProperty(t) && X(e);
        },
        e,
      ),
        (e.g = {});
    }
    (ce.prototype.N = function () {
      ce.aa.N.call(this), le(this);
    }),
      (ce.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
      });
    var he = i.JSON.stringify,
      de = i.JSON.parse,
      fe = class {
        stringify(e) {
          return i.JSON.stringify(e, void 0);
        }
        parse(e) {
          return i.JSON.parse(e, void 0);
        }
      };
    function pe() {}
    function ge(e) {
      return e.h || (e.h = e.i());
    }
    function me() {}
    pe.prototype.h = null;
    var ye = { OPEN: "a", kb: "b", Ja: "c", wb: "d" };
    function ve() {
      D.call(this, "d");
    }
    function we() {
      D.call(this, "c");
    }
    h(ve, D), h(we, D);
    var _e = {},
      Ee = null;
    function be() {
      return (Ee = Ee || new ne());
    }
    function Ie(e) {
      D.call(this, _e.La, e);
    }
    function Te(e) {
      const t = be();
      re(t, new Ie(t));
    }
    function Se(e, t) {
      D.call(this, _e.STAT_EVENT, e), (this.stat = t);
    }
    function Ce(e) {
      const t = be();
      re(t, new Se(t, e));
    }
    function Ae(e, t) {
      D.call(this, _e.Ma, e), (this.size = t);
    }
    function ke(e, t) {
      if ("function" != typeof e)
        throw Error("Fn must not be null and must be a function");
      return i.setTimeout(function () {
        e();
      }, t);
    }
    function Ne() {
      this.g = !0;
    }
    function Re(e, t, n, r) {
      e.info(function () {
        return (
          "XMLHTTP TEXT (" +
          t +
          "): " +
          (function (e, t) {
            if (!e.g) return t;
            if (!t) return null;
            try {
              var n = JSON.parse(t);
              if (n)
                for (e = 0; e < n.length; e++)
                  if (Array.isArray(n[e])) {
                    var r = n[e];
                    if (!(2 > r.length)) {
                      var i = r[1];
                      if (Array.isArray(i) && !(1 > i.length)) {
                        var s = i[0];
                        if ("noop" != s && "stop" != s && "close" != s)
                          for (var o = 1; o < i.length; o++) i[o] = "";
                      }
                    }
                  }
              return he(n);
            } catch (e) {
              return t;
            }
          })(e, n) +
          (r ? " " + r : "")
        );
      });
    }
    (_e.La = "serverreachability"),
      h(Ie, D),
      (_e.STAT_EVENT = "statevent"),
      h(Se, D),
      (_e.Ma = "timingevent"),
      h(Ae, D),
      (Ne.prototype.xa = function () {
        this.g = !1;
      }),
      (Ne.prototype.info = function () {});
    var Oe,
      Pe = {
        NO_ERROR: 0,
        gb: 1,
        tb: 2,
        sb: 3,
        nb: 4,
        rb: 5,
        ub: 6,
        Ia: 7,
        TIMEOUT: 8,
        xb: 9,
      },
      De = {
        lb: "complete",
        Hb: "success",
        Ja: "error",
        Ia: "abort",
        zb: "ready",
        Ab: "readystatechange",
        TIMEOUT: "timeout",
        vb: "incrementaldata",
        yb: "progress",
        ob: "downloadprogress",
        Pb: "uploadprogress",
      };
    function Le() {}
    function xe(e, t, n, r) {
      (this.j = e),
        (this.i = t),
        (this.l = n),
        (this.R = r || 1),
        (this.U = new ce(this)),
        (this.I = 45e3),
        (this.H = null),
        (this.o = !1),
        (this.m = this.A = this.v = this.L = this.F = this.S = this.B = null),
        (this.D = []),
        (this.g = null),
        (this.C = 0),
        (this.s = this.u = null),
        (this.X = -1),
        (this.J = !1),
        (this.O = 0),
        (this.M = null),
        (this.W = this.K = this.T = this.P = !1),
        (this.h = new Me());
    }
    function Me() {
      (this.i = null), (this.g = ""), (this.h = !1);
    }
    h(Le, pe),
      (Le.prototype.g = function () {
        return new XMLHttpRequest();
      }),
      (Le.prototype.i = function () {
        return {};
      }),
      (Oe = new Le());
    var Ue = {},
      Ve = {};
    function Fe(e, t, n) {
      (e.L = 1), (e.v = ht(ot(t))), (e.m = n), (e.P = !0), je(e, null);
    }
    function je(e, t) {
      (e.F = Date.now()), He(e), (e.A = ot(e.v));
      var n = e.A,
        r = e.R;
      Array.isArray(r) || (r = [String(r)]),
        St(n.i, "t", r),
        (e.C = 0),
        (n = e.j.J),
        (e.h = new Me()),
        (e.g = fn(e.j, n ? t : null, !e.m)),
        0 < e.O && (e.M = new ae(u(e.Y, e, e.g), e.O)),
        (t = e.U),
        (n = e.g),
        (r = e.ca);
      var i = "readystatechange";
      Array.isArray(i) || (i && (ue[0] = i.toString()), (i = ue));
      for (var s = 0; s < i.length; s++) {
        var o = G(n, i[s], r || t.handleEvent, !1, t.h || t);
        if (!o) break;
        t.g[o.key] = o;
      }
      (t = e.H ? w(e.H) : {}),
        e.m
          ? (e.u || (e.u = "POST"),
            (t["Content-Type"] = "application/x-www-form-urlencoded"),
            e.g.ea(e.A, e.u, e.m, t))
          : ((e.u = "GET"), e.g.ea(e.A, e.u, null, t)),
        Te(),
        (function (e, t, n, r, i, s) {
          e.info(function () {
            if (e.g)
              if (s)
                for (var o = "", a = s.split("&"), c = 0; c < a.length; c++) {
                  var u = a[c].split("=");
                  if (1 < u.length) {
                    var l = u[0];
                    u = u[1];
                    var h = l.split("_");
                    o =
                      2 <= h.length && "type" == h[1]
                        ? o + (l + "=") + u + "&"
                        : o + (l + "=redacted&");
                  }
                }
              else o = null;
            else o = s;
            return (
              "XMLHTTP REQ (" +
              r +
              ") [attempt " +
              i +
              "]: " +
              t +
              "\n" +
              n +
              "\n" +
              o
            );
          });
        })(e.i, e.u, e.A, e.l, e.R, e.m);
    }
    function Be(e) {
      return !!e.g && "GET" == e.u && 2 != e.L && e.j.Ca;
    }
    function $e(e, t) {
      var n = e.C,
        r = t.indexOf("\n", n);
      return -1 == r
        ? Ve
        : ((n = Number(t.substring(n, r))),
          isNaN(n)
            ? Ue
            : (r += 1) + n > t.length
              ? Ve
              : ((t = t.slice(r, r + n)), (e.C = r + n), t));
    }
    function He(e) {
      (e.S = Date.now() + e.I), ze(e, e.I);
    }
    function ze(e, t) {
      if (null != e.B) throw Error("WatchDog timer not null");
      e.B = ke(u(e.ba, e), t);
    }
    function qe(e) {
      e.B && (i.clearTimeout(e.B), (e.B = null));
    }
    function Ge(e) {
      0 == e.j.G || e.J || cn(e.j, e);
    }
    function Ke(e) {
      qe(e);
      var t = e.M;
      t && "function" == typeof t.ma && t.ma(),
        (e.M = null),
        le(e.U),
        e.g && ((t = e.g), (e.g = null), t.abort(), t.ma());
    }
    function We(e, t) {
      try {
        var n = e.j;
        if (0 != n.G && (n.g == e || Ze(n.h, e)))
          if (!e.K && Ze(n.h, e) && 3 == n.G) {
            try {
              var r = n.Da.g.parse(t);
            } catch (e) {
              r = null;
            }
            if (Array.isArray(r) && 3 == r.length) {
              var i = r;
              if (0 == i[0]) {
                e: if (!n.u) {
                  if (n.g) {
                    if (!(n.g.F + 3e3 < e.F)) break e;
                    an(n), Xt(n);
                  }
                  rn(n), Ce(18);
                }
              } else
                (n.za = i[1]),
                  0 < n.za - n.T &&
                    37500 > i[2] &&
                    n.F &&
                    0 == n.v &&
                    !n.C &&
                    (n.C = ke(u(n.Za, n), 6e3));
              if (1 >= Ye(n.h) && n.ca) {
                try {
                  n.ca();
                } catch (e) {}
                n.ca = void 0;
              }
            } else ln(n, 11);
          } else if (((e.K || n.g == e) && an(n), !p(t)))
            for (i = n.Da.g.parse(t), t = 0; t < i.length; t++) {
              let u = i[t];
              if (((n.T = u[0]), (u = u[1]), 2 == n.G))
                if ("c" == u[0]) {
                  (n.K = u[1]), (n.ia = u[2]);
                  const t = u[3];
                  null != t && ((n.la = t), n.j.info("VER=" + n.la));
                  const i = u[4];
                  null != i && ((n.Aa = i), n.j.info("SVER=" + n.Aa));
                  const l = u[5];
                  null != l &&
                    "number" == typeof l &&
                    0 < l &&
                    ((r = 1.5 * l),
                    (n.L = r),
                    n.j.info("backChannelRequestTimeoutMs_=" + r)),
                    (r = n);
                  const h = e.g;
                  if (h) {
                    const e = h.g
                      ? h.g.getResponseHeader("X-Client-Wire-Protocol")
                      : null;
                    if (e) {
                      var s = r.h;
                      s.g ||
                        (-1 == e.indexOf("spdy") &&
                          -1 == e.indexOf("quic") &&
                          -1 == e.indexOf("h2")) ||
                        ((s.j = s.l),
                        (s.g = new Set()),
                        s.h && (et(s, s.h), (s.h = null)));
                    }
                    if (r.D) {
                      const e = h.g
                        ? h.g.getResponseHeader("X-HTTP-Session-Id")
                        : null;
                      e && ((r.ya = e), lt(r.I, r.D, e));
                    }
                  }
                  (n.G = 3),
                    n.l && n.l.ua(),
                    n.ba &&
                      ((n.R = Date.now() - e.F),
                      n.j.info("Handshake RTT: " + n.R + "ms"));
                  var o = e;
                  if ((((r = n).qa = dn(r, r.J ? r.ia : null, r.W)), o.K)) {
                    tt(r.h, o);
                    var a = o,
                      c = r.L;
                    c && (a.I = c), a.B && (qe(a), He(a)), (r.g = o);
                  } else nn(r);
                  0 < n.i.length && Yt(n);
                } else ("stop" != u[0] && "close" != u[0]) || ln(n, 7);
              else
                3 == n.G &&
                  ("stop" == u[0] || "close" == u[0]
                    ? "stop" == u[0]
                      ? ln(n, 7)
                      : Qt(n)
                    : "noop" != u[0] && n.l && n.l.ta(u),
                  (n.v = 0));
            }
        Te();
      } catch (e) {}
    }
    (xe.prototype.ca = function (e) {
      e = e.target;
      const t = this.M;
      t && 3 == qt(e) ? t.j() : this.Y(e);
    }),
      (xe.prototype.Y = function (e) {
        try {
          if (e == this.g)
            e: {
              const d = qt(this.g);
              var t = this.g.Ba();
              if (
                (this.g.Z(),
                !(3 > d) &&
                  (3 != d ||
                    (this.g && (this.h.h || this.g.oa() || Gt(this.g)))))
              ) {
                this.J || 4 != d || 7 == t || Te(), qe(this);
                var n = this.g.Z();
                this.X = n;
                t: if (Be(this)) {
                  var r = Gt(this.g);
                  e = "";
                  var s = r.length,
                    o = 4 == qt(this.g);
                  if (!this.h.i) {
                    if ("undefined" == typeof TextDecoder) {
                      Ke(this), Ge(this);
                      var a = "";
                      break t;
                    }
                    this.h.i = new i.TextDecoder();
                  }
                  for (t = 0; t < s; t++)
                    (this.h.h = !0),
                      (e += this.h.i.decode(r[t], {
                        stream: !(o && t == s - 1),
                      }));
                  (r.length = 0), (this.h.g += e), (this.C = 0), (a = this.h.g);
                } else a = this.g.oa();
                if (
                  ((this.o = 200 == n),
                  (function (e, t, n, r, i, s, o) {
                    e.info(function () {
                      return (
                        "XMLHTTP RESP (" +
                        r +
                        ") [ attempt " +
                        i +
                        "]: " +
                        t +
                        "\n" +
                        n +
                        "\n" +
                        s +
                        " " +
                        o
                      );
                    });
                  })(this.i, this.u, this.A, this.l, this.R, d, n),
                  this.o)
                ) {
                  if (this.T && !this.K) {
                    t: {
                      if (this.g) {
                        var c,
                          u = this.g;
                        if (
                          (c = u.g
                            ? u.g.getResponseHeader("X-HTTP-Initial-Response")
                            : null) &&
                          !p(c)
                        ) {
                          var l = c;
                          break t;
                        }
                      }
                      l = null;
                    }
                    if (!(n = l)) {
                      (this.o = !1), (this.s = 3), Ce(12), Ke(this), Ge(this);
                      break e;
                    }
                    Re(
                      this.i,
                      this.l,
                      n,
                      "Initial handshake response via X-HTTP-Initial-Response",
                    ),
                      (this.K = !0),
                      We(this, n);
                  }
                  if (this.P) {
                    let e;
                    for (n = !0; !this.J && this.C < a.length; ) {
                      if (((e = $e(this, a)), e == Ve)) {
                        4 == d && ((this.s = 4), Ce(14), (n = !1)),
                          Re(this.i, this.l, null, "[Incomplete Response]");
                        break;
                      }
                      if (e == Ue) {
                        (this.s = 4),
                          Ce(15),
                          Re(this.i, this.l, a, "[Invalid Chunk]"),
                          (n = !1);
                        break;
                      }
                      Re(this.i, this.l, e, null), We(this, e);
                    }
                    if (
                      (Be(this) &&
                        0 != this.C &&
                        ((this.h.g = this.h.g.slice(this.C)), (this.C = 0)),
                      4 != d ||
                        0 != a.length ||
                        this.h.h ||
                        ((this.s = 1), Ce(16), (n = !1)),
                      (this.o = this.o && n),
                      n)
                    ) {
                      if (0 < a.length && !this.W) {
                        this.W = !0;
                        var h = this.j;
                        h.g == this &&
                          h.ba &&
                          !h.M &&
                          (h.j.info(
                            "Great, no buffering proxy detected. Bytes received: " +
                              a.length,
                          ),
                          sn(h),
                          (h.M = !0),
                          Ce(11));
                      }
                    } else
                      Re(this.i, this.l, a, "[Invalid Chunked Response]"),
                        Ke(this),
                        Ge(this);
                  } else Re(this.i, this.l, a, null), We(this, a);
                  4 == d && Ke(this),
                    this.o &&
                      !this.J &&
                      (4 == d ? cn(this.j, this) : ((this.o = !1), He(this)));
                } else
                  (function (e) {
                    const t = {};
                    e = (
                      (e.g && 2 <= qt(e) && e.g.getAllResponseHeaders()) ||
                      ""
                    ).split("\r\n");
                    for (let r = 0; r < e.length; r++) {
                      if (p(e[r])) continue;
                      var n = b(e[r]);
                      const i = n[0];
                      if ("string" != typeof (n = n[1])) continue;
                      n = n.trim();
                      const s = t[i] || [];
                      (t[i] = s), s.push(n);
                    }
                    !(function (e, t) {
                      for (const n in e) t.call(void 0, e[n], n, e);
                    })(t, function (e) {
                      return e.join(", ");
                    });
                  })(this.g),
                    400 == n && 0 < a.indexOf("Unknown SID")
                      ? ((this.s = 3), Ce(12))
                      : ((this.s = 0), Ce(13)),
                    Ke(this),
                    Ge(this);
              }
            }
        } catch (e) {}
      }),
      (xe.prototype.cancel = function () {
        (this.J = !0), Ke(this);
      }),
      (xe.prototype.ba = function () {
        this.B = null;
        const e = Date.now();
        0 <= e - this.S
          ? ((function (e, t) {
              e.info(function () {
                return "TIMEOUT: " + t;
              });
            })(this.i, this.A),
            2 != this.L && (Te(), Ce(17)),
            Ke(this),
            (this.s = 2),
            Ge(this))
          : ze(this, this.S - e);
      });
    var Qe = class {
      constructor(e, t) {
        (this.g = e), (this.map = t);
      }
    };
    function Xe(e) {
      (this.l = e || 10),
        (e = i.PerformanceNavigationTiming
          ? 0 < (e = i.performance.getEntriesByType("navigation")).length &&
            ("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol)
          : !!(
              i.chrome &&
              i.chrome.loadTimes &&
              i.chrome.loadTimes() &&
              i.chrome.loadTimes().wasFetchedViaSpdy
            )),
        (this.j = e ? this.l : 1),
        (this.g = null),
        1 < this.j && (this.g = new Set()),
        (this.h = null),
        (this.i = []);
    }
    function Je(e) {
      return !!e.h || (!!e.g && e.g.size >= e.j);
    }
    function Ye(e) {
      return e.h ? 1 : e.g ? e.g.size : 0;
    }
    function Ze(e, t) {
      return e.h ? e.h == t : !!e.g && e.g.has(t);
    }
    function et(e, t) {
      e.g ? e.g.add(t) : (e.h = t);
    }
    function tt(e, t) {
      e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t);
    }
    function nt(e) {
      if (null != e.h) return e.i.concat(e.h.D);
      if (null != e.g && 0 !== e.g.size) {
        let t = e.i;
        for (const n of e.g.values()) t = t.concat(n.D);
        return t;
      }
      return d(e.i);
    }
    function rt(e, t) {
      if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
      else if (s(e) || "string" == typeof e)
        Array.prototype.forEach.call(e, t, void 0);
      else
        for (
          var n = (function (e) {
              if (e.na && "function" == typeof e.na) return e.na();
              if (!e.V || "function" != typeof e.V) {
                if ("undefined" != typeof Map && e instanceof Map)
                  return Array.from(e.keys());
                if (!("undefined" != typeof Set && e instanceof Set)) {
                  if (s(e) || "string" == typeof e) {
                    var t = [];
                    e = e.length;
                    for (var n = 0; n < e; n++) t.push(n);
                    return t;
                  }
                  (t = []), (n = 0);
                  for (const r in e) t[n++] = r;
                  return t;
                }
              }
            })(e),
            r = (function (e) {
              if (e.V && "function" == typeof e.V) return e.V();
              if (
                ("undefined" != typeof Map && e instanceof Map) ||
                ("undefined" != typeof Set && e instanceof Set)
              )
                return Array.from(e.values());
              if ("string" == typeof e) return e.split("");
              if (s(e)) {
                for (var t = [], n = e.length, r = 0; r < n; r++) t.push(e[r]);
                return t;
              }
              for (r in ((t = []), (n = 0), e)) t[n++] = e[r];
              return t;
            })(e),
            i = r.length,
            o = 0;
          o < i;
          o++
        )
          t.call(void 0, r[o], n && n[o], e);
    }
    Xe.prototype.cancel = function () {
      if (((this.i = nt(this)), this.h)) this.h.cancel(), (this.h = null);
      else if (this.g && 0 !== this.g.size) {
        for (const e of this.g.values()) e.cancel();
        this.g.clear();
      }
    };
    var it = RegExp(
      "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$",
    );
    function st(e) {
      if (
        ((this.g = this.o = this.j = ""),
        (this.s = null),
        (this.m = this.l = ""),
        (this.h = !1),
        e instanceof st)
      ) {
        (this.h = e.h),
          at(this, e.j),
          (this.o = e.o),
          (this.g = e.g),
          ct(this, e.s),
          (this.l = e.l);
        var t = e.i,
          n = new Et();
        (n.i = t.i),
          t.g && ((n.g = new Map(t.g)), (n.h = t.h)),
          ut(this, n),
          (this.m = e.m);
      } else
        e && (t = String(e).match(it))
          ? ((this.h = !1),
            at(this, t[1] || "", !0),
            (this.o = dt(t[2] || "")),
            (this.g = dt(t[3] || "", !0)),
            ct(this, t[4]),
            (this.l = dt(t[5] || "", !0)),
            ut(this, t[6] || "", !0),
            (this.m = dt(t[7] || "")))
          : ((this.h = !1), (this.i = new Et(null, this.h)));
    }
    function ot(e) {
      return new st(e);
    }
    function at(e, t, n) {
      (e.j = n ? dt(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ""));
    }
    function ct(e, t) {
      if (t) {
        if (((t = Number(t)), isNaN(t) || 0 > t))
          throw Error("Bad port number " + t);
        e.s = t;
      } else e.s = null;
    }
    function ut(e, t, n) {
      t instanceof Et
        ? ((e.i = t),
          (function (e, t) {
            t &&
              !e.j &&
              (bt(e),
              (e.i = null),
              e.g.forEach(function (e, t) {
                var n = t.toLowerCase();
                t != n && (It(this, t), St(this, n, e));
              }, e)),
              (e.j = t);
          })(e.i, e.h))
        : (n || (t = ft(t, wt)), (e.i = new Et(t, e.h)));
    }
    function lt(e, t, n) {
      e.i.set(t, n);
    }
    function ht(e) {
      return (
        lt(
          e,
          "zx",
          Math.floor(2147483648 * Math.random()).toString(36) +
            Math.abs(
              Math.floor(2147483648 * Math.random()) ^ Date.now(),
            ).toString(36),
        ),
        e
      );
    }
    function dt(e, t) {
      return e
        ? t
          ? decodeURI(e.replace(/%25/g, "%2525"))
          : decodeURIComponent(e)
        : "";
    }
    function ft(e, t, n) {
      return "string" == typeof e
        ? ((e = encodeURI(e).replace(t, pt)),
          n && (e = e.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
          e)
        : null;
    }
    function pt(e) {
      return (
        "%" +
        (((e = e.charCodeAt(0)) >> 4) & 15).toString(16) +
        (15 & e).toString(16)
      );
    }
    st.prototype.toString = function () {
      var e = [],
        t = this.j;
      t && e.push(ft(t, mt, !0), ":");
      var n = this.g;
      return (
        (n || "file" == t) &&
          (e.push("//"),
          (t = this.o) && e.push(ft(t, mt, !0), "@"),
          e.push(
            encodeURIComponent(String(n)).replace(
              /%25([0-9a-fA-F]{2})/g,
              "%$1",
            ),
          ),
          null != (n = this.s) && e.push(":", String(n))),
        (n = this.l) &&
          (this.g && "/" != n.charAt(0) && e.push("/"),
          e.push(ft(n, "/" == n.charAt(0) ? vt : yt, !0))),
        (n = this.i.toString()) && e.push("?", n),
        (n = this.m) && e.push("#", ft(n, _t)),
        e.join("")
      );
    };
    var gt,
      mt = /[#\/\?@]/g,
      yt = /[#\?:]/g,
      vt = /[#\?]/g,
      wt = /[#\?@]/g,
      _t = /#/g;
    function Et(e, t) {
      (this.h = this.g = null), (this.i = e || null), (this.j = !!t);
    }
    function bt(e) {
      e.g ||
        ((e.g = new Map()),
        (e.h = 0),
        e.i &&
          (function (e, t) {
            if (e) {
              e = e.split("&");
              for (var n = 0; n < e.length; n++) {
                var r = e[n].indexOf("="),
                  i = null;
                if (0 <= r) {
                  var s = e[n].substring(0, r);
                  i = e[n].substring(r + 1);
                } else s = e[n];
                t(s, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "");
              }
            }
          })(e.i, function (t, n) {
            e.add(decodeURIComponent(t.replace(/\+/g, " ")), n);
          }));
    }
    function It(e, t) {
      bt(e),
        (t = Ct(e, t)),
        e.g.has(t) && ((e.i = null), (e.h -= e.g.get(t).length), e.g.delete(t));
    }
    function Tt(e, t) {
      return bt(e), (t = Ct(e, t)), e.g.has(t);
    }
    function St(e, t, n) {
      It(e, t),
        0 < n.length &&
          ((e.i = null), e.g.set(Ct(e, t), d(n)), (e.h += n.length));
    }
    function Ct(e, t) {
      return (t = String(t)), e.j && (t = t.toLowerCase()), t;
    }
    function At(e, t, n, r, i) {
      try {
        i &&
          ((i.onload = null),
          (i.onerror = null),
          (i.onabort = null),
          (i.ontimeout = null)),
          r(n);
      } catch (e) {}
    }
    function kt() {
      this.g = new fe();
    }
    function Nt(e, t, n) {
      const r = n || "";
      try {
        rt(e, function (e, n) {
          let i = e;
          o(e) && (i = he(e)), t.push(r + n + "=" + encodeURIComponent(i));
        });
      } catch (e) {
        throw (t.push(r + "type=" + encodeURIComponent("_badmap")), e);
      }
    }
    function Rt(e) {
      (this.l = e.Ub || null), (this.j = e.eb || !1);
    }
    function Ot(e, t) {
      ne.call(this),
        (this.D = e),
        (this.o = t),
        (this.m = void 0),
        (this.status = this.readyState = 0),
        (this.responseType =
          this.responseText =
          this.response =
          this.statusText =
            ""),
        (this.onreadystatechange = null),
        (this.u = new Headers()),
        (this.h = null),
        (this.B = "GET"),
        (this.A = ""),
        (this.g = !1),
        (this.v = this.j = this.l = null);
    }
    function Pt(e) {
      e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e));
    }
    function Dt(e) {
      (e.readyState = 4), (e.l = null), (e.j = null), (e.v = null), Lt(e);
    }
    function Lt(e) {
      e.onreadystatechange && e.onreadystatechange.call(e);
    }
    function xt(e) {
      let t = "";
      return (
        v(e, function (e, n) {
          (t += n), (t += ":"), (t += e), (t += "\r\n");
        }),
        t
      );
    }
    function Mt(e, t, n) {
      e: {
        for (r in n) {
          var r = !1;
          break e;
        }
        r = !0;
      }
      r ||
        ((n = xt(n)),
        "string" == typeof e
          ? null != n && encodeURIComponent(String(n))
          : lt(e, t, n));
    }
    function Ut(e) {
      ne.call(this),
        (this.headers = new Map()),
        (this.o = e || null),
        (this.h = !1),
        (this.v = this.g = null),
        (this.D = ""),
        (this.m = 0),
        (this.l = ""),
        (this.j = this.B = this.u = this.A = !1),
        (this.I = null),
        (this.H = ""),
        (this.J = !1);
    }
    ((e = Et.prototype).add = function (e, t) {
      bt(this), (this.i = null), (e = Ct(this, e));
      var n = this.g.get(e);
      return n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this;
    }),
      (e.forEach = function (e, t) {
        bt(this),
          this.g.forEach(function (n, r) {
            n.forEach(function (n) {
              e.call(t, n, r, this);
            }, this);
          }, this);
      }),
      (e.na = function () {
        bt(this);
        const e = Array.from(this.g.values()),
          t = Array.from(this.g.keys()),
          n = [];
        for (let r = 0; r < t.length; r++) {
          const i = e[r];
          for (let e = 0; e < i.length; e++) n.push(t[r]);
        }
        return n;
      }),
      (e.V = function (e) {
        bt(this);
        let t = [];
        if ("string" == typeof e)
          Tt(this, e) && (t = t.concat(this.g.get(Ct(this, e))));
        else {
          e = Array.from(this.g.values());
          for (let n = 0; n < e.length; n++) t = t.concat(e[n]);
        }
        return t;
      }),
      (e.set = function (e, t) {
        return (
          bt(this),
          (this.i = null),
          Tt(this, (e = Ct(this, e))) && (this.h -= this.g.get(e).length),
          this.g.set(e, [t]),
          (this.h += 1),
          this
        );
      }),
      (e.get = function (e, t) {
        return e && 0 < (e = this.V(e)).length ? String(e[0]) : t;
      }),
      (e.toString = function () {
        if (this.i) return this.i;
        if (!this.g) return "";
        const e = [],
          t = Array.from(this.g.keys());
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          const s = encodeURIComponent(String(r)),
            o = this.V(r);
          for (r = 0; r < o.length; r++) {
            var i = s;
            "" !== o[r] && (i += "=" + encodeURIComponent(String(o[r]))),
              e.push(i);
          }
        }
        return (this.i = e.join("&"));
      }),
      h(Rt, pe),
      (Rt.prototype.g = function () {
        return new Ot(this.l, this.j);
      }),
      (Rt.prototype.i =
        ((gt = {}),
        function () {
          return gt;
        })),
      h(Ot, ne),
      ((e = Ot.prototype).open = function (e, t) {
        if (0 != this.readyState)
          throw (this.abort(), Error("Error reopening a connection"));
        (this.B = e), (this.A = t), (this.readyState = 1), Lt(this);
      }),
      (e.send = function (e) {
        if (1 != this.readyState)
          throw (this.abort(), Error("need to call open() first. "));
        this.g = !0;
        const t = {
          headers: this.u,
          method: this.B,
          credentials: this.m,
          cache: void 0,
        };
        e && (t.body = e),
          (this.D || i)
            .fetch(new Request(this.A, t))
            .then(this.Sa.bind(this), this.ga.bind(this));
      }),
      (e.abort = function () {
        (this.response = this.responseText = ""),
          (this.u = new Headers()),
          (this.status = 0),
          this.j && this.j.cancel("Request was aborted.").catch(() => {}),
          1 <= this.readyState &&
            this.g &&
            4 != this.readyState &&
            ((this.g = !1), Dt(this)),
          (this.readyState = 0);
      }),
      (e.Sa = function (e) {
        if (
          this.g &&
          ((this.l = e),
          this.h ||
            ((this.status = this.l.status),
            (this.statusText = this.l.statusText),
            (this.h = e.headers),
            (this.readyState = 2),
            Lt(this)),
          this.g && ((this.readyState = 3), Lt(this), this.g))
        )
          if ("arraybuffer" === this.responseType)
            e.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this));
          else if (void 0 !== i.ReadableStream && "body" in e) {
            if (((this.j = e.body.getReader()), this.o)) {
              if (this.responseType)
                throw Error(
                  'responseType must be empty for "streamBinaryChunks" mode responses.',
                );
              this.response = [];
            } else
              (this.response = this.responseText = ""),
                (this.v = new TextDecoder());
            Pt(this);
          } else e.text().then(this.Ra.bind(this), this.ga.bind(this));
      }),
      (e.Pa = function (e) {
        if (this.g) {
          if (this.o && e.value) this.response.push(e.value);
          else if (!this.o) {
            var t = e.value ? e.value : new Uint8Array(0);
            (t = this.v.decode(t, { stream: !e.done })) &&
              (this.response = this.responseText += t);
          }
          e.done ? Dt(this) : Lt(this), 3 == this.readyState && Pt(this);
        }
      }),
      (e.Ra = function (e) {
        this.g && ((this.response = this.responseText = e), Dt(this));
      }),
      (e.Qa = function (e) {
        this.g && ((this.response = e), Dt(this));
      }),
      (e.ga = function () {
        this.g && Dt(this);
      }),
      (e.setRequestHeader = function (e, t) {
        this.u.append(e, t);
      }),
      (e.getResponseHeader = function (e) {
        return (this.h && this.h.get(e.toLowerCase())) || "";
      }),
      (e.getAllResponseHeaders = function () {
        if (!this.h) return "";
        const e = [],
          t = this.h.entries();
        for (var n = t.next(); !n.done; )
          (n = n.value), e.push(n[0] + ": " + n[1]), (n = t.next());
        return e.join("\r\n");
      }),
      Object.defineProperty(Ot.prototype, "withCredentials", {
        get: function () {
          return "include" === this.m;
        },
        set: function (e) {
          this.m = e ? "include" : "same-origin";
        },
      }),
      h(Ut, ne);
    var Vt = /^https?$/i,
      Ft = ["POST", "PUT"];
    function jt(e, t) {
      (e.h = !1),
        e.g && ((e.j = !0), e.g.abort(), (e.j = !1)),
        (e.l = t),
        (e.m = 5),
        Bt(e),
        Ht(e);
    }
    function Bt(e) {
      e.A || ((e.A = !0), re(e, "complete"), re(e, "error"));
    }
    function $t(e) {
      if (e.h && void 0 !== r && (!e.v[1] || 4 != qt(e) || 2 != e.Z()))
        if (e.u && 4 == qt(e)) se(e.Ea, 0, e);
        else if ((re(e, "readystatechange"), 4 == qt(e))) {
          e.h = !1;
          try {
            const r = e.Z();
            e: switch (r) {
              case 200:
              case 201:
              case 202:
              case 204:
              case 206:
              case 304:
              case 1223:
                var t = !0;
                break e;
              default:
                t = !1;
            }
            var n;
            if (!(n = t)) {
              var s;
              if ((s = 0 === r)) {
                var o = String(e.D).match(it)[1] || null;
                !o &&
                  i.self &&
                  i.self.location &&
                  (o = i.self.location.protocol.slice(0, -1)),
                  (s = !Vt.test(o ? o.toLowerCase() : ""));
              }
              n = s;
            }
            if (n) re(e, "complete"), re(e, "success");
            else {
              e.m = 6;
              try {
                var a = 2 < qt(e) ? e.g.statusText : "";
              } catch (e) {
                a = "";
              }
              (e.l = a + " [" + e.Z() + "]"), Bt(e);
            }
          } finally {
            Ht(e);
          }
        }
    }
    function Ht(e, t) {
      if (e.g) {
        zt(e);
        const n = e.g,
          r = e.v[0] ? () => {} : null;
        (e.g = null), (e.v = null), t || re(e, "ready");
        try {
          n.onreadystatechange = r;
        } catch (e) {}
      }
    }
    function zt(e) {
      e.I && (i.clearTimeout(e.I), (e.I = null));
    }
    function qt(e) {
      return e.g ? e.g.readyState : 0;
    }
    function Gt(e) {
      try {
        if (!e.g) return null;
        if ("response" in e.g) return e.g.response;
        switch (e.H) {
          case "":
          case "text":
            return e.g.responseText;
          case "arraybuffer":
            if ("mozResponseArrayBuffer" in e.g)
              return e.g.mozResponseArrayBuffer;
        }
        return null;
      } catch (e) {
        return null;
      }
    }
    function Kt(e, t, n) {
      return (n && n.internalChannelParams && n.internalChannelParams[e]) || t;
    }
    function Wt(e) {
      (this.Aa = 0),
        (this.i = []),
        (this.j = new Ne()),
        (this.ia =
          this.qa =
          this.I =
          this.W =
          this.g =
          this.ya =
          this.D =
          this.H =
          this.m =
          this.S =
          this.o =
            null),
        (this.Ya = this.U = 0),
        (this.Va = Kt("failFast", !1, e)),
        (this.F = this.C = this.u = this.s = this.l = null),
        (this.X = !0),
        (this.za = this.T = -1),
        (this.Y = this.v = this.B = 0),
        (this.Ta = Kt("baseRetryDelayMs", 5e3, e)),
        (this.cb = Kt("retryDelaySeedMs", 1e4, e)),
        (this.Wa = Kt("forwardChannelMaxRetries", 2, e)),
        (this.wa = Kt("forwardChannelRequestTimeoutMs", 2e4, e)),
        (this.pa = (e && e.xmlHttpFactory) || void 0),
        (this.Xa = (e && e.Tb) || void 0),
        (this.Ca = (e && e.useFetchStreams) || !1),
        (this.L = void 0),
        (this.J = (e && e.supportsCrossDomainXhr) || !1),
        (this.K = ""),
        (this.h = new Xe(e && e.concurrentRequestLimit)),
        (this.Da = new kt()),
        (this.P = (e && e.fastHandshake) || !1),
        (this.O = (e && e.encodeInitMessageHeaders) || !1),
        this.P && this.O && (this.O = !1),
        (this.Ua = (e && e.Rb) || !1),
        e && e.xa && this.j.xa(),
        e && e.forceLongPolling && (this.X = !1),
        (this.ba = (!this.P && this.X && e && e.detectBufferingProxy) || !1),
        (this.ja = void 0),
        e &&
          e.longPollingTimeout &&
          0 < e.longPollingTimeout &&
          (this.ja = e.longPollingTimeout),
        (this.ca = void 0),
        (this.R = 0),
        (this.M = !1),
        (this.ka = this.A = null);
    }
    function Qt(e) {
      if ((Jt(e), 3 == e.G)) {
        var t = e.U++,
          n = ot(e.I);
        if (
          (lt(n, "SID", e.K),
          lt(n, "RID", t),
          lt(n, "TYPE", "terminate"),
          en(e, n),
          ((t = new xe(e, e.j, t)).L = 2),
          (t.v = ht(ot(n))),
          (n = !1),
          i.navigator && i.navigator.sendBeacon)
        )
          try {
            n = i.navigator.sendBeacon(t.v.toString(), "");
          } catch (e) {}
        !n && i.Image && ((new Image().src = t.v), (n = !0)),
          n || ((t.g = fn(t.j, null)), t.g.ea(t.v)),
          (t.F = Date.now()),
          He(t);
      }
      hn(e);
    }
    function Xt(e) {
      e.g && (sn(e), e.g.cancel(), (e.g = null));
    }
    function Jt(e) {
      Xt(e),
        e.u && (i.clearTimeout(e.u), (e.u = null)),
        an(e),
        e.h.cancel(),
        e.s && ("number" == typeof e.s && i.clearTimeout(e.s), (e.s = null));
    }
    function Yt(e) {
      if (!Je(e.h) && !e.s) {
        e.s = !0;
        var t = e.Ga;
        A || R(), k || (A(), (k = !0)), N.add(t, e), (e.B = 0);
      }
    }
    function Zt(e, t) {
      var n;
      n = t ? t.l : e.U++;
      const r = ot(e.I);
      lt(r, "SID", e.K),
        lt(r, "RID", n),
        lt(r, "AID", e.T),
        en(e, r),
        e.m && e.o && Mt(r, e.m, e.o),
        (n = new xe(e, e.j, n, e.B + 1)),
        null === e.m && (n.H = e.o),
        t && (e.i = t.D.concat(e.i)),
        (t = tn(e, n, 1e3)),
        (n.I = Math.round(0.5 * e.wa) + Math.round(0.5 * e.wa * Math.random())),
        et(e.h, n),
        Fe(n, r, t);
    }
    function en(e, t) {
      e.H &&
        v(e.H, function (e, n) {
          lt(t, n, e);
        }),
        e.l &&
          rt({}, function (e, n) {
            lt(t, n, e);
          });
    }
    function tn(e, t, n) {
      n = Math.min(e.i.length, n);
      var r = e.l ? u(e.l.Na, e.l, e) : null;
      e: {
        var i = e.i;
        let t = -1;
        for (;;) {
          const e = ["count=" + n];
          -1 == t
            ? 0 < n
              ? ((t = i[0].g), e.push("ofs=" + t))
              : (t = 0)
            : e.push("ofs=" + t);
          let s = !0;
          for (let o = 0; o < n; o++) {
            let n = i[o].g;
            const a = i[o].map;
            if (((n -= t), 0 > n)) (t = Math.max(0, i[o].g - 100)), (s = !1);
            else
              try {
                Nt(a, e, "req" + n + "_");
              } catch (e) {
                r && r(a);
              }
          }
          if (s) {
            r = e.join("&");
            break e;
          }
        }
      }
      return (e = e.i.splice(0, n)), (t.D = e), r;
    }
    function nn(e) {
      if (!e.g && !e.u) {
        e.Y = 1;
        var t = e.Fa;
        A || R(), k || (A(), (k = !0)), N.add(t, e), (e.v = 0);
      }
    }
    function rn(e) {
      return !(
        e.g ||
        e.u ||
        3 <= e.v ||
        (e.Y++, (e.u = ke(u(e.Fa, e), un(e, e.v))), e.v++, 0)
      );
    }
    function sn(e) {
      null != e.A && (i.clearTimeout(e.A), (e.A = null));
    }
    function on(e) {
      (e.g = new xe(e, e.j, "rpc", e.Y)),
        null === e.m && (e.g.H = e.o),
        (e.g.O = 0);
      var t = ot(e.qa);
      lt(t, "RID", "rpc"),
        lt(t, "SID", e.K),
        lt(t, "AID", e.T),
        lt(t, "CI", e.F ? "0" : "1"),
        !e.F && e.ja && lt(t, "TO", e.ja),
        lt(t, "TYPE", "xmlhttp"),
        en(e, t),
        e.m && e.o && Mt(t, e.m, e.o),
        e.L && (e.g.I = e.L);
      var n = e.g;
      (e = e.ia),
        (n.L = 1),
        (n.v = ht(ot(t))),
        (n.m = null),
        (n.P = !0),
        je(n, e);
    }
    function an(e) {
      null != e.C && (i.clearTimeout(e.C), (e.C = null));
    }
    function cn(e, t) {
      var n = null;
      if (e.g == t) {
        an(e), sn(e), (e.g = null);
        var r = 2;
      } else {
        if (!Ze(e.h, t)) return;
        (n = t.D), tt(e.h, t), (r = 1);
      }
      if (0 != e.G)
        if (t.o)
          if (1 == r) {
            (n = t.m ? t.m.length : 0), (t = Date.now() - t.F);
            var i = e.B;
            re((r = be()), new Ae(r, n)), Yt(e);
          } else nn(e);
        else if (
          3 == (i = t.s) ||
          (0 == i && 0 < t.X) ||
          !(
            (1 == r &&
              (function (e, t) {
                return !(
                  Ye(e.h) >= e.h.j - (e.s ? 1 : 0) ||
                  (e.s
                    ? ((e.i = t.D.concat(e.i)), 0)
                    : 1 == e.G ||
                      2 == e.G ||
                      e.B >= (e.Va ? 0 : e.Wa) ||
                      ((e.s = ke(u(e.Ga, e, t), un(e, e.B))), e.B++, 0))
                );
              })(e, t)) ||
            (2 == r && rn(e))
          )
        )
          switch (
            (n && 0 < n.length && ((t = e.h), (t.i = t.i.concat(n))), i)
          ) {
            case 1:
              ln(e, 5);
              break;
            case 4:
              ln(e, 10);
              break;
            case 3:
              ln(e, 6);
              break;
            default:
              ln(e, 2);
          }
    }
    function un(e, t) {
      let n = e.Ta + Math.floor(Math.random() * e.cb);
      return e.isActive() || (n *= 2), n * t;
    }
    function ln(e, t) {
      if ((e.j.info("Error code " + t), 2 == t)) {
        var n = u(e.fb, e),
          r = e.Xa;
        const t = !r;
        (r = new st(r || "//www.google.com/images/cleardot.gif")),
          (i.location && "http" == i.location.protocol) || at(r, "https"),
          ht(r),
          t
            ? (function (e, t) {
                const n = new Ne();
                if (i.Image) {
                  const r = new Image();
                  (r.onload = l(At, n, "TestLoadImage: loaded", !0, t, r)),
                    (r.onerror = l(At, n, "TestLoadImage: error", !1, t, r)),
                    (r.onabort = l(At, n, "TestLoadImage: abort", !1, t, r)),
                    (r.ontimeout = l(
                      At,
                      n,
                      "TestLoadImage: timeout",
                      !1,
                      t,
                      r,
                    )),
                    i.setTimeout(function () {
                      r.ontimeout && r.ontimeout();
                    }, 1e4),
                    (r.src = e);
                } else t(!1);
              })(r.toString(), n)
            : (function (e, t) {
                new Ne();
                const n = new AbortController(),
                  r = setTimeout(() => {
                    n.abort(), At(0, 0, !1, t);
                  }, 1e4);
                fetch(e, { signal: n.signal })
                  .then((e) => {
                    clearTimeout(r), e.ok ? At(0, 0, !0, t) : At(0, 0, !1, t);
                  })
                  .catch(() => {
                    clearTimeout(r), At(0, 0, !1, t);
                  });
              })(r.toString(), n);
      } else Ce(2);
      (e.G = 0), e.l && e.l.sa(t), hn(e), Jt(e);
    }
    function hn(e) {
      if (((e.G = 0), (e.ka = []), e.l)) {
        const t = nt(e.h);
        (0 == t.length && 0 == e.i.length) ||
          (f(e.ka, t),
          f(e.ka, e.i),
          (e.h.i.length = 0),
          d(e.i),
          (e.i.length = 0)),
          e.l.ra();
      }
    }
    function dn(e, t, n) {
      var r = n instanceof st ? ot(n) : new st(n);
      if ("" != r.g) t && (r.g = t + "." + r.g), ct(r, r.s);
      else {
        var s = i.location;
        (r = s.protocol),
          (t = t ? t + "." + s.hostname : s.hostname),
          (s = +s.port);
        var o = new st(null);
        r && at(o, r), t && (o.g = t), s && ct(o, s), n && (o.l = n), (r = o);
      }
      return (
        (n = e.D),
        (t = e.ya),
        n && t && lt(r, n, t),
        lt(r, "VER", e.la),
        en(e, r),
        r
      );
    }
    function fn(e, t, n) {
      if (t && !e.J)
        throw Error("Can't create secondary domain capable XhrIo object.");
      return (
        (t = e.Ca && !e.pa ? new Ut(new Rt({ eb: n })) : new Ut(e.pa)).Ha(e.J),
        t
      );
    }
    function pn() {}
    function gn() {}
    function mn(e, t) {
      ne.call(this),
        (this.g = new Wt(t)),
        (this.l = e),
        (this.h = (t && t.messageUrlParams) || null),
        (e = (t && t.messageHeaders) || null),
        t &&
          t.clientProtocolHeaderRequired &&
          (e
            ? (e["X-Client-Protocol"] = "webchannel")
            : (e = { "X-Client-Protocol": "webchannel" })),
        (this.g.o = e),
        (e = (t && t.initMessageHeaders) || null),
        t &&
          t.messageContentType &&
          (e
            ? (e["X-WebChannel-Content-Type"] = t.messageContentType)
            : (e = { "X-WebChannel-Content-Type": t.messageContentType })),
        t &&
          t.va &&
          (e
            ? (e["X-WebChannel-Client-Profile"] = t.va)
            : (e = { "X-WebChannel-Client-Profile": t.va })),
        (this.g.S = e),
        (e = t && t.Sb) && !p(e) && (this.g.m = e),
        (this.v = (t && t.supportsCrossDomainXhr) || !1),
        (this.u = (t && t.sendRawJson) || !1),
        (t = t && t.httpSessionIdParam) &&
          !p(t) &&
          ((this.g.D = t),
          null !== (e = this.h) && t in e && t in (e = this.h) && delete e[t]),
        (this.j = new wn(this));
    }
    function yn(e) {
      ve.call(this),
        e.__headers__ &&
          ((this.headers = e.__headers__),
          (this.statusCode = e.__status__),
          delete e.__headers__,
          delete e.__status__);
      var t = e.__sm__;
      if (t) {
        e: {
          for (const n in t) {
            e = n;
            break e;
          }
          e = void 0;
        }
        (this.i = e) &&
          ((e = this.i), (t = null !== t && e in t ? t[e] : void 0)),
          (this.data = t);
      } else this.data = e;
    }
    function vn() {
      we.call(this), (this.status = 1);
    }
    function wn(e) {
      this.g = e;
    }
    ((e = Ut.prototype).Ha = function (e) {
      this.J = e;
    }),
      (e.ea = function (e, t, n, r) {
        if (this.g)
          throw Error(
            "[goog.net.XhrIo] Object is active with another request=" +
              this.D +
              "; newUri=" +
              e,
          );
        (t = t ? t.toUpperCase() : "GET"),
          (this.D = e),
          (this.l = ""),
          (this.m = 0),
          (this.A = !1),
          (this.h = !0),
          (this.g = this.o ? this.o.g() : Oe.g()),
          (this.v = this.o ? ge(this.o) : ge(Oe)),
          (this.g.onreadystatechange = u(this.Ea, this));
        try {
          (this.B = !0), this.g.open(t, String(e), !0), (this.B = !1);
        } catch (e) {
          return void jt(this, e);
        }
        if (((e = n || ""), (n = new Map(this.headers)), r))
          if (Object.getPrototypeOf(r) === Object.prototype)
            for (var s in r) n.set(s, r[s]);
          else {
            if ("function" != typeof r.keys || "function" != typeof r.get)
              throw Error("Unknown input type for opt_headers: " + String(r));
            for (const e of r.keys()) n.set(e, r.get(e));
          }
        (r = Array.from(n.keys()).find(
          (e) => "content-type" == e.toLowerCase(),
        )),
          (s = i.FormData && e instanceof i.FormData),
          !(0 <= Array.prototype.indexOf.call(Ft, t, void 0)) ||
            r ||
            s ||
            n.set(
              "Content-Type",
              "application/x-www-form-urlencoded;charset=utf-8",
            );
        for (const [e, t] of n) this.g.setRequestHeader(e, t);
        this.H && (this.g.responseType = this.H),
          "withCredentials" in this.g &&
            this.g.withCredentials !== this.J &&
            (this.g.withCredentials = this.J);
        try {
          zt(this), (this.u = !0), this.g.send(e), (this.u = !1);
        } catch (e) {
          jt(this, e);
        }
      }),
      (e.abort = function (e) {
        this.g &&
          this.h &&
          ((this.h = !1),
          (this.j = !0),
          this.g.abort(),
          (this.j = !1),
          (this.m = e || 7),
          re(this, "complete"),
          re(this, "abort"),
          Ht(this));
      }),
      (e.N = function () {
        this.g &&
          (this.h &&
            ((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1)),
          Ht(this, !0)),
          Ut.aa.N.call(this);
      }),
      (e.Ea = function () {
        this.s || (this.B || this.u || this.j ? $t(this) : this.bb());
      }),
      (e.bb = function () {
        $t(this);
      }),
      (e.isActive = function () {
        return !!this.g;
      }),
      (e.Z = function () {
        try {
          return 2 < qt(this) ? this.g.status : -1;
        } catch (e) {
          return -1;
        }
      }),
      (e.oa = function () {
        try {
          return this.g ? this.g.responseText : "";
        } catch (e) {
          return "";
        }
      }),
      (e.Oa = function (e) {
        if (this.g) {
          var t = this.g.responseText;
          return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), de(t);
        }
      }),
      (e.Ba = function () {
        return this.m;
      }),
      (e.Ka = function () {
        return "string" == typeof this.l ? this.l : String(this.l);
      }),
      ((e = Wt.prototype).la = 8),
      (e.G = 1),
      (e.connect = function (e, t, n, r) {
        Ce(0),
          (this.W = e),
          (this.H = t || {}),
          n && void 0 !== r && ((this.H.OSID = n), (this.H.OAID = r)),
          (this.F = this.X),
          (this.I = dn(this, null, this.W)),
          Yt(this);
      }),
      (e.Ga = function (e) {
        if (this.s)
          if (((this.s = null), 1 == this.G)) {
            if (!e) {
              (this.U = Math.floor(1e5 * Math.random())), (e = this.U++);
              const i = new xe(this, this.j, e);
              let s = this.o;
              if (
                (this.S && (s ? ((s = w(s)), E(s, this.S)) : (s = this.S)),
                null !== this.m || this.O || ((i.H = s), (s = null)),
                this.P)
              )
                e: {
                  for (var t = 0, n = 0; n < this.i.length; n++) {
                    var r = this.i[n];
                    if (
                      void 0 ===
                      (r =
                        "__data__" in r.map &&
                        "string" == typeof (r = r.map.__data__)
                          ? r.length
                          : void 0)
                    )
                      break;
                    if (4096 < (t += r)) {
                      t = n;
                      break e;
                    }
                    if (4096 === t || n === this.i.length - 1) {
                      t = n + 1;
                      break e;
                    }
                  }
                  t = 1e3;
                }
              else t = 1e3;
              (t = tn(this, i, t)),
                lt((n = ot(this.I)), "RID", e),
                lt(n, "CVER", 22),
                this.D && lt(n, "X-HTTP-Session-Id", this.D),
                en(this, n),
                s &&
                  (this.O
                    ? (t =
                        "headers=" +
                        encodeURIComponent(String(xt(s))) +
                        "&" +
                        t)
                    : this.m && Mt(n, this.m, s)),
                et(this.h, i),
                this.Ua && lt(n, "TYPE", "init"),
                this.P
                  ? (lt(n, "$req", t),
                    lt(n, "SID", "null"),
                    (i.T = !0),
                    Fe(i, n, null))
                  : Fe(i, n, t),
                (this.G = 2);
            }
          } else
            3 == this.G &&
              (e ? Zt(this, e) : 0 == this.i.length || Je(this.h) || Zt(this));
      }),
      (e.Fa = function () {
        if (
          ((this.u = null),
          on(this),
          this.ba && !(this.M || null == this.g || 0 >= this.R))
        ) {
          var e = 2 * this.R;
          this.j.info("BP detection timer enabled: " + e),
            (this.A = ke(u(this.ab, this), e));
        }
      }),
      (e.ab = function () {
        this.A &&
          ((this.A = null),
          this.j.info("BP detection timeout reached."),
          this.j.info("Buffering proxy detected and switch to long-polling!"),
          (this.F = !1),
          (this.M = !0),
          Ce(10),
          Xt(this),
          on(this));
      }),
      (e.Za = function () {
        null != this.C && ((this.C = null), Xt(this), rn(this), Ce(19));
      }),
      (e.fb = function (e) {
        e
          ? (this.j.info("Successfully pinged google.com"), Ce(2))
          : (this.j.info("Failed to ping google.com"), Ce(1));
      }),
      (e.isActive = function () {
        return !!this.l && this.l.isActive(this);
      }),
      ((e = pn.prototype).ua = function () {}),
      (e.ta = function () {}),
      (e.sa = function () {}),
      (e.ra = function () {}),
      (e.isActive = function () {
        return !0;
      }),
      (e.Na = function () {}),
      (gn.prototype.g = function (e, t) {
        return new mn(e, t);
      }),
      h(mn, ne),
      (mn.prototype.m = function () {
        (this.g.l = this.j),
          this.v && (this.g.J = !0),
          this.g.connect(this.l, this.h || void 0);
      }),
      (mn.prototype.close = function () {
        Qt(this.g);
      }),
      (mn.prototype.o = function (e) {
        var t = this.g;
        if ("string" == typeof e) {
          var n = {};
          (n.__data__ = e), (e = n);
        } else this.u && (((n = {}).__data__ = he(e)), (e = n));
        t.i.push(new Qe(t.Ya++, e)), 3 == t.G && Yt(t);
      }),
      (mn.prototype.N = function () {
        (this.g.l = null),
          delete this.j,
          Qt(this.g),
          delete this.g,
          mn.aa.N.call(this);
      }),
      h(yn, ve),
      h(vn, we),
      h(wn, pn),
      (wn.prototype.ua = function () {
        re(this.g, "a");
      }),
      (wn.prototype.ta = function (e) {
        re(this.g, new yn(e));
      }),
      (wn.prototype.sa = function (e) {
        re(this.g, new vn());
      }),
      (wn.prototype.ra = function () {
        re(this.g, "b");
      }),
      (gn.prototype.createWebChannel = gn.prototype.g),
      (mn.prototype.send = mn.prototype.o),
      (mn.prototype.open = mn.prototype.m),
      (mn.prototype.close = mn.prototype.close),
      (fi = gi.createWebChannelTransport =
        function () {
          return new gn();
        }),
      (di = gi.getStatEventTarget =
        function () {
          return be();
        }),
      (hi = gi.Event = _e),
      (li = gi.Stat =
        {
          mb: 0,
          pb: 1,
          qb: 2,
          Jb: 3,
          Ob: 4,
          Lb: 5,
          Mb: 6,
          Kb: 7,
          Ib: 8,
          Nb: 9,
          PROXY: 10,
          NOPROXY: 11,
          Gb: 12,
          Cb: 13,
          Db: 14,
          Bb: 15,
          Eb: 16,
          Fb: 17,
          ib: 18,
          hb: 19,
          jb: 20,
        }),
      (Pe.NO_ERROR = 0),
      (Pe.TIMEOUT = 8),
      (Pe.HTTP_ERROR = 6),
      (ui = gi.ErrorCode = Pe),
      (De.COMPLETE = "complete"),
      (ci = gi.EventType = De),
      (me.EventType = ye),
      (ye.OPEN = "a"),
      (ye.CLOSE = "b"),
      (ye.ERROR = "c"),
      (ye.MESSAGE = "d"),
      (ne.prototype.listen = ne.prototype.K),
      (ai = gi.WebChannel = me),
      (gi.FetchXmlHttpFactory = Rt),
      (Ut.prototype.listenOnce = Ut.prototype.L),
      (Ut.prototype.getLastError = Ut.prototype.Ka),
      (Ut.prototype.getLastErrorCode = Ut.prototype.Ba),
      (Ut.prototype.getStatus = Ut.prototype.Z),
      (Ut.prototype.getResponseJson = Ut.prototype.Oa),
      (Ut.prototype.getResponseText = Ut.prototype.oa),
      (Ut.prototype.send = Ut.prototype.ea),
      (Ut.prototype.setWithCredentials = Ut.prototype.Ha),
      (oi = gi.XhrIo = Ut);
  }).apply(
    void 0 !== pi
      ? pi
      : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
          ? window
          : {},
  );
  const mi = "@firebase/firestore",
    yi = "4.7.10";
  class vi {
    constructor(e) {
      this.uid = e;
    }
    isAuthenticated() {
      return null != this.uid;
    }
    toKey() {
      return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }
    isEqual(e) {
      return e.uid === this.uid;
    }
  }
  (vi.UNAUTHENTICATED = new vi(null)),
    (vi.GOOGLE_CREDENTIALS = new vi("google-credentials-uid")),
    (vi.FIRST_PARTY = new vi("first-party-uid")),
    (vi.MOCK_USER = new vi("mock-user"));
  let wi = "11.5.0";
  const _i = new D("@firebase/firestore");
  function Ei() {
    return _i.logLevel;
  }
  function bi(e, ...t) {
    if (_i.logLevel <= k.DEBUG) {
      const n = t.map(Si);
      _i.debug(`Firestore (${wi}): ${e}`, ...n);
    }
  }
  function Ii(e, ...t) {
    if (_i.logLevel <= k.ERROR) {
      const n = t.map(Si);
      _i.error(`Firestore (${wi}): ${e}`, ...n);
    }
  }
  function Ti(e, ...t) {
    if (_i.logLevel <= k.WARN) {
      const n = t.map(Si);
      _i.warn(`Firestore (${wi}): ${e}`, ...n);
    }
  }
  function Si(e) {
    if ("string" == typeof e) return e;
    try {
      return (function (e) {
        return JSON.stringify(e);
      })(e);
    } catch (t) {
      return e;
    }
  }
  function Ci(e = "Unexpected state") {
    const t = `FIRESTORE (${wi}) INTERNAL ASSERTION FAILED: ` + e;
    throw (Ii(t), new Error(t));
  }
  function Ai(e, t) {
    e || Ci();
  }
  function ki(e, t) {
    return e;
  }
  const Ni = {
    OK: "ok",
    CANCELLED: "cancelled",
    UNKNOWN: "unknown",
    INVALID_ARGUMENT: "invalid-argument",
    DEADLINE_EXCEEDED: "deadline-exceeded",
    NOT_FOUND: "not-found",
    ALREADY_EXISTS: "already-exists",
    PERMISSION_DENIED: "permission-denied",
    UNAUTHENTICATED: "unauthenticated",
    RESOURCE_EXHAUSTED: "resource-exhausted",
    FAILED_PRECONDITION: "failed-precondition",
    ABORTED: "aborted",
    OUT_OF_RANGE: "out-of-range",
    UNIMPLEMENTED: "unimplemented",
    INTERNAL: "internal",
    UNAVAILABLE: "unavailable",
    DATA_LOSS: "data-loss",
  };
  class Ri extends d {
    constructor(e, t) {
      super(e, t),
        (this.code = e),
        (this.message = t),
        (this.toString = () =>
          `${this.name}: [code=${this.code}]: ${this.message}`);
    }
  }
  class Oi {
    constructor() {
      this.promise = new Promise((e, t) => {
        (this.resolve = e), (this.reject = t);
      });
    }
  }
  class Pi {
    constructor(e, t) {
      (this.user = t),
        (this.type = "OAuth"),
        (this.headers = new Map()),
        this.headers.set("Authorization", `Bearer ${e}`);
    }
  }
  class Di {
    getToken() {
      return Promise.resolve(null);
    }
    invalidateToken() {}
    start(e, t) {
      e.enqueueRetryable(() => t(vi.UNAUTHENTICATED));
    }
    shutdown() {}
  }
  class Li {
    constructor(e) {
      (this.token = e), (this.changeListener = null);
    }
    getToken() {
      return Promise.resolve(this.token);
    }
    invalidateToken() {}
    start(e, t) {
      (this.changeListener = t), e.enqueueRetryable(() => t(this.token.user));
    }
    shutdown() {
      this.changeListener = null;
    }
  }
  class xi {
    constructor(e) {
      (this.t = e),
        (this.currentUser = vi.UNAUTHENTICATED),
        (this.i = 0),
        (this.forceRefresh = !1),
        (this.auth = null);
    }
    start(e, t) {
      Ai(void 0 === this.o);
      let n = this.i;
      const r = (e) =>
        this.i !== n ? ((n = this.i), t(e)) : Promise.resolve();
      let i = new Oi();
      this.o = () => {
        this.i++,
          (this.currentUser = this.u()),
          i.resolve(),
          (i = new Oi()),
          e.enqueueRetryable(() => r(this.currentUser));
      };
      const s = () => {
          const t = i;
          e.enqueueRetryable(async () => {
            await t.promise, await r(this.currentUser);
          });
        },
        o = (e) => {
          bi("FirebaseAuthCredentialsProvider", "Auth detected"),
            (this.auth = e),
            this.o && (this.auth.addAuthTokenListener(this.o), s());
        };
      this.t.onInit((e) => o(e)),
        setTimeout(() => {
          if (!this.auth) {
            const e = this.t.getImmediate({ optional: !0 });
            e
              ? o(e)
              : (bi("FirebaseAuthCredentialsProvider", "Auth not yet detected"),
                i.resolve(),
                (i = new Oi()));
          }
        }, 0),
        s();
    }
    getToken() {
      const e = this.i,
        t = this.forceRefresh;
      return (
        (this.forceRefresh = !1),
        this.auth
          ? this.auth
              .getToken(t)
              .then((t) =>
                this.i !== e
                  ? (bi(
                      "FirebaseAuthCredentialsProvider",
                      "getToken aborted due to token change.",
                    ),
                    this.getToken())
                  : t
                    ? (Ai("string" == typeof t.accessToken),
                      new Pi(t.accessToken, this.currentUser))
                    : null,
              )
          : Promise.resolve(null)
      );
    }
    invalidateToken() {
      this.forceRefresh = !0;
    }
    shutdown() {
      this.auth && this.o && this.auth.removeAuthTokenListener(this.o),
        (this.o = void 0);
    }
    u() {
      const e = this.auth && this.auth.getUid();
      return Ai(null === e || "string" == typeof e), new vi(e);
    }
  }
  class Mi {
    constructor(e, t, n) {
      (this.l = e),
        (this.h = t),
        (this.P = n),
        (this.type = "FirstParty"),
        (this.user = vi.FIRST_PARTY),
        (this.T = new Map());
    }
    I() {
      return this.P ? this.P() : null;
    }
    get headers() {
      this.T.set("X-Goog-AuthUser", this.l);
      const e = this.I();
      return (
        e && this.T.set("Authorization", e),
        this.h && this.T.set("X-Goog-Iam-Authorization-Token", this.h),
        this.T
      );
    }
  }
  class Ui {
    constructor(e, t, n) {
      (this.l = e), (this.h = t), (this.P = n);
    }
    getToken() {
      return Promise.resolve(new Mi(this.l, this.h, this.P));
    }
    start(e, t) {
      e.enqueueRetryable(() => t(vi.FIRST_PARTY));
    }
    shutdown() {}
    invalidateToken() {}
  }
  class Vi {
    constructor(e) {
      (this.value = e),
        (this.type = "AppCheck"),
        (this.headers = new Map()),
        e &&
          e.length > 0 &&
          this.headers.set("x-firebase-appcheck", this.value);
    }
  }
  class Fi {
    constructor(e, t) {
      (this.A = t),
        (this.forceRefresh = !1),
        (this.appCheck = null),
        (this.R = null),
        (this.V = null),
        Le(e) &&
          e.settings.appCheckToken &&
          (this.V = e.settings.appCheckToken);
    }
    start(e, t) {
      Ai(void 0 === this.o);
      const n = (e) => {
        null != e.error &&
          bi(
            "FirebaseAppCheckTokenProvider",
            `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`,
          );
        const n = e.token !== this.R;
        return (
          (this.R = e.token),
          bi(
            "FirebaseAppCheckTokenProvider",
            `Received ${n ? "new" : "existing"} token.`,
          ),
          n ? t(e.token) : Promise.resolve()
        );
      };
      this.o = (t) => {
        e.enqueueRetryable(() => n(t));
      };
      const r = (e) => {
        bi("FirebaseAppCheckTokenProvider", "AppCheck detected"),
          (this.appCheck = e),
          this.o && this.appCheck.addTokenListener(this.o);
      };
      this.A.onInit((e) => r(e)),
        setTimeout(() => {
          if (!this.appCheck) {
            const e = this.A.getImmediate({ optional: !0 });
            e
              ? r(e)
              : bi(
                  "FirebaseAppCheckTokenProvider",
                  "AppCheck not yet detected",
                );
          }
        }, 0);
    }
    getToken() {
      if (this.V) return Promise.resolve(new Vi(this.V));
      const e = this.forceRefresh;
      return (
        (this.forceRefresh = !1),
        this.appCheck
          ? this.appCheck
              .getToken(e)
              .then((e) =>
                e
                  ? (Ai("string" == typeof e.token),
                    (this.R = e.token),
                    new Vi(e.token))
                  : null,
              )
          : Promise.resolve(null)
      );
    }
    invalidateToken() {
      this.forceRefresh = !0;
    }
    shutdown() {
      this.appCheck && this.o && this.appCheck.removeTokenListener(this.o),
        (this.o = void 0);
    }
  }
  function ji(e) {
    const t = "undefined" != typeof self && (self.crypto || self.msCrypto),
      n = new Uint8Array(e);
    if (t && "function" == typeof t.getRandomValues) t.getRandomValues(n);
    else for (let t = 0; t < e; t++) n[t] = Math.floor(256 * Math.random());
    return n;
  }
  class Bi {
    static newId() {
      const e = 62 * Math.floor(256 / 62);
      let t = "";
      for (; t.length < 20; ) {
        const n = ji(40);
        for (let r = 0; r < n.length; ++r)
          t.length < 20 &&
            n[r] < e &&
            (t +=
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
                n[r] % 62,
              ));
      }
      return t;
    }
  }
  function $i(e, t) {
    return e < t ? -1 : e > t ? 1 : 0;
  }
  function Hi(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
      const r = e.codePointAt(n),
        i = t.codePointAt(n);
      if (r !== i) {
        if (r < 128 && i < 128) return $i(r, i);
        {
          const s = new TextEncoder(),
            o = qi(s.encode(zi(e, n)), s.encode(zi(t, n)));
          return 0 !== o ? o : $i(r, i);
        }
      }
      n += r > 65535 ? 2 : 1;
    }
    return $i(e.length, t.length);
  }
  function zi(e, t) {
    return e.codePointAt(t) > 65535
      ? e.substring(t, t + 2)
      : e.substring(t, t + 1);
  }
  function qi(e, t) {
    for (let n = 0; n < e.length && n < t.length; ++n)
      if (e[n] !== t[n]) return $i(e[n], t[n]);
    return $i(e.length, t.length);
  }
  function Gi(e, t, n) {
    return e.length === t.length && e.every((e, r) => n(e, t[r]));
  }
  const Ki = -62135596800,
    Wi = 1e6;
  class Qi {
    static now() {
      return Qi.fromMillis(Date.now());
    }
    static fromDate(e) {
      return Qi.fromMillis(e.getTime());
    }
    static fromMillis(e) {
      const t = Math.floor(e / 1e3),
        n = Math.floor((e - 1e3 * t) * Wi);
      return new Qi(t, n);
    }
    constructor(e, t) {
      if (((this.seconds = e), (this.nanoseconds = t), t < 0))
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Timestamp nanoseconds out of range: " + t,
        );
      if (t >= 1e9)
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Timestamp nanoseconds out of range: " + t,
        );
      if (e < Ki)
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Timestamp seconds out of range: " + e,
        );
      if (e >= 253402300800)
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Timestamp seconds out of range: " + e,
        );
    }
    toDate() {
      return new Date(this.toMillis());
    }
    toMillis() {
      return 1e3 * this.seconds + this.nanoseconds / Wi;
    }
    _compareTo(e) {
      return this.seconds === e.seconds
        ? $i(this.nanoseconds, e.nanoseconds)
        : $i(this.seconds, e.seconds);
    }
    isEqual(e) {
      return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
    }
    toString() {
      return (
        "Timestamp(seconds=" +
        this.seconds +
        ", nanoseconds=" +
        this.nanoseconds +
        ")"
      );
    }
    toJSON() {
      return { seconds: this.seconds, nanoseconds: this.nanoseconds };
    }
    valueOf() {
      const e = this.seconds - Ki;
      return (
        String(e).padStart(12, "0") +
        "." +
        String(this.nanoseconds).padStart(9, "0")
      );
    }
  }
  class Xi {
    static fromTimestamp(e) {
      return new Xi(e);
    }
    static min() {
      return new Xi(new Qi(0, 0));
    }
    static max() {
      return new Xi(new Qi(253402300799, 999999999));
    }
    constructor(e) {
      this.timestamp = e;
    }
    compareTo(e) {
      return this.timestamp._compareTo(e.timestamp);
    }
    isEqual(e) {
      return this.timestamp.isEqual(e.timestamp);
    }
    toMicroseconds() {
      return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }
    toString() {
      return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }
    toTimestamp() {
      return this.timestamp;
    }
  }
  const Ji = "__name__";
  class Yi {
    constructor(e, t, n) {
      void 0 === t ? (t = 0) : t > e.length && Ci(),
        void 0 === n ? (n = e.length - t) : n > e.length - t && Ci(),
        (this.segments = e),
        (this.offset = t),
        (this.len = n);
    }
    get length() {
      return this.len;
    }
    isEqual(e) {
      return 0 === Yi.comparator(this, e);
    }
    child(e) {
      const t = this.segments.slice(this.offset, this.limit());
      return (
        e instanceof Yi
          ? e.forEach((e) => {
              t.push(e);
            })
          : t.push(e),
        this.construct(t)
      );
    }
    limit() {
      return this.offset + this.length;
    }
    popFirst(e) {
      return (
        (e = void 0 === e ? 1 : e),
        this.construct(this.segments, this.offset + e, this.length - e)
      );
    }
    popLast() {
      return this.construct(this.segments, this.offset, this.length - 1);
    }
    firstSegment() {
      return this.segments[this.offset];
    }
    lastSegment() {
      return this.get(this.length - 1);
    }
    get(e) {
      return this.segments[this.offset + e];
    }
    isEmpty() {
      return 0 === this.length;
    }
    isPrefixOf(e) {
      if (e.length < this.length) return !1;
      for (let t = 0; t < this.length; t++)
        if (this.get(t) !== e.get(t)) return !1;
      return !0;
    }
    isImmediateParentOf(e) {
      if (this.length + 1 !== e.length) return !1;
      for (let t = 0; t < this.length; t++)
        if (this.get(t) !== e.get(t)) return !1;
      return !0;
    }
    forEach(e) {
      for (let t = this.offset, n = this.limit(); t < n; t++)
        e(this.segments[t]);
    }
    toArray() {
      return this.segments.slice(this.offset, this.limit());
    }
    static comparator(e, t) {
      const n = Math.min(e.length, t.length);
      for (let r = 0; r < n; r++) {
        const n = Yi.compareSegments(e.get(r), t.get(r));
        if (0 !== n) return n;
      }
      return $i(e.length, t.length);
    }
    static compareSegments(e, t) {
      const n = Yi.isNumericId(e),
        r = Yi.isNumericId(t);
      return n && !r
        ? -1
        : !n && r
          ? 1
          : n && r
            ? Yi.extractNumericId(e).compare(Yi.extractNumericId(t))
            : Hi(e, t);
    }
    static isNumericId(e) {
      return e.startsWith("__id") && e.endsWith("__");
    }
    static extractNumericId(e) {
      return ri.fromString(e.substring(4, e.length - 2));
    }
  }
  class Zi extends Yi {
    construct(e, t, n) {
      return new Zi(e, t, n);
    }
    canonicalString() {
      return this.toArray().join("/");
    }
    toString() {
      return this.canonicalString();
    }
    toUriEncodedString() {
      return this.toArray().map(encodeURIComponent).join("/");
    }
    static fromString(...e) {
      const t = [];
      for (const n of e) {
        if (n.indexOf("//") >= 0)
          throw new Ri(
            Ni.INVALID_ARGUMENT,
            `Invalid segment (${n}). Paths must not contain // in them.`,
          );
        t.push(...n.split("/").filter((e) => e.length > 0));
      }
      return new Zi(t);
    }
    static emptyPath() {
      return new Zi([]);
    }
  }
  const es = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
  class ts extends Yi {
    construct(e, t, n) {
      return new ts(e, t, n);
    }
    static isValidIdentifier(e) {
      return es.test(e);
    }
    canonicalString() {
      return this.toArray()
        .map(
          (e) => (
            (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
            ts.isValidIdentifier(e) || (e = "`" + e + "`"),
            e
          ),
        )
        .join(".");
    }
    toString() {
      return this.canonicalString();
    }
    isKeyField() {
      return 1 === this.length && this.get(0) === Ji;
    }
    static keyField() {
      return new ts([Ji]);
    }
    static fromServerFormat(e) {
      const t = [];
      let n = "",
        r = 0;
      const i = () => {
        if (0 === n.length)
          throw new Ri(
            Ni.INVALID_ARGUMENT,
            `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
          );
        t.push(n), (n = "");
      };
      let s = !1;
      for (; r < e.length; ) {
        const t = e[r];
        if ("\\" === t) {
          if (r + 1 === e.length)
            throw new Ri(
              Ni.INVALID_ARGUMENT,
              "Path has trailing escape character: " + e,
            );
          const t = e[r + 1];
          if ("\\" !== t && "." !== t && "`" !== t)
            throw new Ri(
              Ni.INVALID_ARGUMENT,
              "Path has invalid escape sequence: " + e,
            );
          (n += t), (r += 2);
        } else
          "`" === t
            ? ((s = !s), r++)
            : "." !== t || s
              ? ((n += t), r++)
              : (i(), r++);
      }
      if ((i(), s))
        throw new Ri(Ni.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
      return new ts(t);
    }
    static emptyPath() {
      return new ts([]);
    }
  }
  class ns {
    constructor(e) {
      this.path = e;
    }
    static fromPath(e) {
      return new ns(Zi.fromString(e));
    }
    static fromName(e) {
      return new ns(Zi.fromString(e).popFirst(5));
    }
    static empty() {
      return new ns(Zi.emptyPath());
    }
    get collectionGroup() {
      return this.path.popLast().lastSegment();
    }
    hasCollectionId(e) {
      return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
    }
    getCollectionGroup() {
      return this.path.get(this.path.length - 2);
    }
    getCollectionPath() {
      return this.path.popLast();
    }
    isEqual(e) {
      return null !== e && 0 === Zi.comparator(this.path, e.path);
    }
    toString() {
      return this.path.toString();
    }
    static comparator(e, t) {
      return Zi.comparator(e.path, t.path);
    }
    static isDocumentKey(e) {
      return e.length % 2 == 0;
    }
    static fromSegments(e) {
      return new ns(new Zi(e.slice()));
    }
  }
  function rs(e) {
    return new is(e.readTime, e.key, -1);
  }
  class is {
    constructor(e, t, n) {
      (this.readTime = e), (this.documentKey = t), (this.largestBatchId = n);
    }
    static min() {
      return new is(Xi.min(), ns.empty(), -1);
    }
    static max() {
      return new is(Xi.max(), ns.empty(), -1);
    }
  }
  function ss(e, t) {
    let n = e.readTime.compareTo(t.readTime);
    return 0 !== n
      ? n
      : ((n = ns.comparator(e.documentKey, t.documentKey)),
        0 !== n ? n : $i(e.largestBatchId, t.largestBatchId));
  }
  class os {
    constructor() {
      this.onCommittedListeners = [];
    }
    addOnCommittedListener(e) {
      this.onCommittedListeners.push(e);
    }
    raiseOnCommittedEvent() {
      this.onCommittedListeners.forEach((e) => e());
    }
  }
  async function as(e) {
    if (
      e.code !== Ni.FAILED_PRECONDITION ||
      "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab." !==
        e.message
    )
      throw e;
    bi("LocalStore", "Unexpectedly lost primary lease");
  }
  class cs {
    constructor(e) {
      (this.nextCallback = null),
        (this.catchCallback = null),
        (this.result = void 0),
        (this.error = void 0),
        (this.isDone = !1),
        (this.callbackAttached = !1),
        e(
          (e) => {
            (this.isDone = !0),
              (this.result = e),
              this.nextCallback && this.nextCallback(e);
          },
          (e) => {
            (this.isDone = !0),
              (this.error = e),
              this.catchCallback && this.catchCallback(e);
          },
        );
    }
    catch(e) {
      return this.next(void 0, e);
    }
    next(e, t) {
      return (
        this.callbackAttached && Ci(),
        (this.callbackAttached = !0),
        this.isDone
          ? this.error
            ? this.wrapFailure(t, this.error)
            : this.wrapSuccess(e, this.result)
          : new cs((n, r) => {
              (this.nextCallback = (t) => {
                this.wrapSuccess(e, t).next(n, r);
              }),
                (this.catchCallback = (e) => {
                  this.wrapFailure(t, e).next(n, r);
                });
            })
      );
    }
    toPromise() {
      return new Promise((e, t) => {
        this.next(e, t);
      });
    }
    wrapUserFunction(e) {
      try {
        const t = e();
        return t instanceof cs ? t : cs.resolve(t);
      } catch (e) {
        return cs.reject(e);
      }
    }
    wrapSuccess(e, t) {
      return e ? this.wrapUserFunction(() => e(t)) : cs.resolve(t);
    }
    wrapFailure(e, t) {
      return e ? this.wrapUserFunction(() => e(t)) : cs.reject(t);
    }
    static resolve(e) {
      return new cs((t, n) => {
        t(e);
      });
    }
    static reject(e) {
      return new cs((t, n) => {
        n(e);
      });
    }
    static waitFor(e) {
      return new cs((t, n) => {
        let r = 0,
          i = 0,
          s = !1;
        e.forEach((e) => {
          ++r,
            e.next(
              () => {
                ++i, s && i === r && t();
              },
              (e) => n(e),
            );
        }),
          (s = !0),
          i === r && t();
      });
    }
    static or(e) {
      let t = cs.resolve(!1);
      for (const n of e) t = t.next((e) => (e ? cs.resolve(e) : n()));
      return t;
    }
    static forEach(e, t) {
      const n = [];
      return (
        e.forEach((e, r) => {
          n.push(t.call(this, e, r));
        }),
        this.waitFor(n)
      );
    }
    static mapArray(e, t) {
      return new cs((n, r) => {
        const i = e.length,
          s = new Array(i);
        let o = 0;
        for (let a = 0; a < i; a++) {
          const c = a;
          t(e[c]).next(
            (e) => {
              (s[c] = e), ++o, o === i && n(s);
            },
            (e) => r(e),
          );
        }
      });
    }
    static doWhile(e, t) {
      return new cs((n, r) => {
        const i = () => {
          !0 === e()
            ? t().next(() => {
                i();
              }, r)
            : n();
        };
        i();
      });
    }
  }
  function us(e) {
    return "IndexedDbTransactionError" === e.name;
  }
  class ls {
    constructor(e, t) {
      (this.previousValue = e),
        t &&
          ((t.sequenceNumberHandler = (e) => this.oe(e)),
          (this._e = (e) => t.writeSequenceNumber(e)));
    }
    oe(e) {
      return (
        (this.previousValue = Math.max(e, this.previousValue)),
        this.previousValue
      );
    }
    next() {
      const e = ++this.previousValue;
      return this._e && this._e(e), e;
    }
  }
  ls.ae = -1;
  function hs(e) {
    return null == e;
  }
  function ds(e) {
    return 0 === e && 1 / e == -1 / 0;
  }
  function fs(e, t) {
    let n = t;
    const r = e.length;
    for (let t = 0; t < r; t++) {
      const r = e.charAt(t);
      switch (r) {
        case "\0":
          n += "";
          break;
        case "":
          n += "";
          break;
        default:
          n += r;
      }
    }
    return n;
  }
  function ps(e) {
    return e + "";
  }
  const gs = "owner",
    ms = "mutationQueues",
    ys = "mutations",
    vs = "documentMutations",
    ws = "remoteDocumentGlobal",
    _s = "targets",
    Es = "targetDocuments",
    bs = "targetGlobal",
    Is = "collectionParents",
    Ts = "clientMetadata",
    Ss = "bundles",
    Cs = "namedQueries";
  function As(e) {
    let t = 0;
    for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
    return t;
  }
  function ks(e, t) {
    for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
  }
  function Ns(e) {
    for (const t in e)
      if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
    return !0;
  }
  class Rs {
    constructor(e, t) {
      (this.comparator = e), (this.root = t || Ps.EMPTY);
    }
    insert(e, t) {
      return new Rs(
        this.comparator,
        this.root
          .insert(e, t, this.comparator)
          .copy(null, null, Ps.BLACK, null, null),
      );
    }
    remove(e) {
      return new Rs(
        this.comparator,
        this.root
          .remove(e, this.comparator)
          .copy(null, null, Ps.BLACK, null, null),
      );
    }
    get(e) {
      let t = this.root;
      for (; !t.isEmpty(); ) {
        const n = this.comparator(e, t.key);
        if (0 === n) return t.value;
        n < 0 ? (t = t.left) : n > 0 && (t = t.right);
      }
      return null;
    }
    indexOf(e) {
      let t = 0,
        n = this.root;
      for (; !n.isEmpty(); ) {
        const r = this.comparator(e, n.key);
        if (0 === r) return t + n.left.size;
        r < 0 ? (n = n.left) : ((t += n.left.size + 1), (n = n.right));
      }
      return -1;
    }
    isEmpty() {
      return this.root.isEmpty();
    }
    get size() {
      return this.root.size;
    }
    minKey() {
      return this.root.minKey();
    }
    maxKey() {
      return this.root.maxKey();
    }
    inorderTraversal(e) {
      return this.root.inorderTraversal(e);
    }
    forEach(e) {
      this.inorderTraversal((t, n) => (e(t, n), !1));
    }
    toString() {
      const e = [];
      return (
        this.inorderTraversal((t, n) => (e.push(`${t}:${n}`), !1)),
        `{${e.join(", ")}}`
      );
    }
    reverseTraversal(e) {
      return this.root.reverseTraversal(e);
    }
    getIterator() {
      return new Os(this.root, null, this.comparator, !1);
    }
    getIteratorFrom(e) {
      return new Os(this.root, e, this.comparator, !1);
    }
    getReverseIterator() {
      return new Os(this.root, null, this.comparator, !0);
    }
    getReverseIteratorFrom(e) {
      return new Os(this.root, e, this.comparator, !0);
    }
  }
  class Os {
    constructor(e, t, n, r) {
      (this.isReverse = r), (this.nodeStack = []);
      let i = 1;
      for (; !e.isEmpty(); )
        if (((i = t ? n(e.key, t) : 1), t && r && (i *= -1), i < 0))
          e = this.isReverse ? e.left : e.right;
        else {
          if (0 === i) {
            this.nodeStack.push(e);
            break;
          }
          this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
        }
    }
    getNext() {
      let e = this.nodeStack.pop();
      const t = { key: e.key, value: e.value };
      if (this.isReverse)
        for (e = e.left; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.right);
      else
        for (e = e.right; !e.isEmpty(); ) this.nodeStack.push(e), (e = e.left);
      return t;
    }
    hasNext() {
      return this.nodeStack.length > 0;
    }
    peek() {
      if (0 === this.nodeStack.length) return null;
      const e = this.nodeStack[this.nodeStack.length - 1];
      return { key: e.key, value: e.value };
    }
  }
  class Ps {
    constructor(e, t, n, r, i) {
      (this.key = e),
        (this.value = t),
        (this.color = null != n ? n : Ps.RED),
        (this.left = null != r ? r : Ps.EMPTY),
        (this.right = null != i ? i : Ps.EMPTY),
        (this.size = this.left.size + 1 + this.right.size);
    }
    copy(e, t, n, r, i) {
      return new Ps(
        null != e ? e : this.key,
        null != t ? t : this.value,
        null != n ? n : this.color,
        null != r ? r : this.left,
        null != i ? i : this.right,
      );
    }
    isEmpty() {
      return !1;
    }
    inorderTraversal(e) {
      return (
        this.left.inorderTraversal(e) ||
        e(this.key, this.value) ||
        this.right.inorderTraversal(e)
      );
    }
    reverseTraversal(e) {
      return (
        this.right.reverseTraversal(e) ||
        e(this.key, this.value) ||
        this.left.reverseTraversal(e)
      );
    }
    min() {
      return this.left.isEmpty() ? this : this.left.min();
    }
    minKey() {
      return this.min().key;
    }
    maxKey() {
      return this.right.isEmpty() ? this.key : this.right.maxKey();
    }
    insert(e, t, n) {
      let r = this;
      const i = n(e, r.key);
      return (
        (r =
          i < 0
            ? r.copy(null, null, null, r.left.insert(e, t, n), null)
            : 0 === i
              ? r.copy(null, t, null, null, null)
              : r.copy(null, null, null, null, r.right.insert(e, t, n))),
        r.fixUp()
      );
    }
    removeMin() {
      if (this.left.isEmpty()) return Ps.EMPTY;
      let e = this;
      return (
        e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
        (e = e.copy(null, null, null, e.left.removeMin(), null)),
        e.fixUp()
      );
    }
    remove(e, t) {
      let n,
        r = this;
      if (t(e, r.key) < 0)
        r.left.isEmpty() ||
          r.left.isRed() ||
          r.left.left.isRed() ||
          (r = r.moveRedLeft()),
          (r = r.copy(null, null, null, r.left.remove(e, t), null));
      else {
        if (
          (r.left.isRed() && (r = r.rotateRight()),
          r.right.isEmpty() ||
            r.right.isRed() ||
            r.right.left.isRed() ||
            (r = r.moveRedRight()),
          0 === t(e, r.key))
        ) {
          if (r.right.isEmpty()) return Ps.EMPTY;
          (n = r.right.min()),
            (r = r.copy(n.key, n.value, null, null, r.right.removeMin()));
        }
        r = r.copy(null, null, null, null, r.right.remove(e, t));
      }
      return r.fixUp();
    }
    isRed() {
      return this.color;
    }
    fixUp() {
      let e = this;
      return (
        e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
        e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
        e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
        e
      );
    }
    moveRedLeft() {
      let e = this.colorFlip();
      return (
        e.right.left.isRed() &&
          ((e = e.copy(null, null, null, null, e.right.rotateRight())),
          (e = e.rotateLeft()),
          (e = e.colorFlip())),
        e
      );
    }
    moveRedRight() {
      let e = this.colorFlip();
      return (
        e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())), e
      );
    }
    rotateLeft() {
      const e = this.copy(null, null, Ps.RED, null, this.right.left);
      return this.right.copy(null, null, this.color, e, null);
    }
    rotateRight() {
      const e = this.copy(null, null, Ps.RED, this.left.right, null);
      return this.left.copy(null, null, this.color, null, e);
    }
    colorFlip() {
      const e = this.left.copy(null, null, !this.left.color, null, null),
        t = this.right.copy(null, null, !this.right.color, null, null);
      return this.copy(null, null, !this.color, e, t);
    }
    checkMaxDepth() {
      const e = this.check();
      return Math.pow(2, e) <= this.size + 1;
    }
    check() {
      if (this.isRed() && this.left.isRed()) throw Ci();
      if (this.right.isRed()) throw Ci();
      const e = this.left.check();
      if (e !== this.right.check()) throw Ci();
      return e + (this.isRed() ? 0 : 1);
    }
  }
  (Ps.EMPTY = null),
    (Ps.RED = !0),
    (Ps.BLACK = !1),
    (Ps.EMPTY = new (class {
      constructor() {
        this.size = 0;
      }
      get key() {
        throw Ci();
      }
      get value() {
        throw Ci();
      }
      get color() {
        throw Ci();
      }
      get left() {
        throw Ci();
      }
      get right() {
        throw Ci();
      }
      copy(e, t, n, r, i) {
        return this;
      }
      insert(e, t, n) {
        return new Ps(e, t);
      }
      remove(e, t) {
        return this;
      }
      isEmpty() {
        return !0;
      }
      inorderTraversal(e) {
        return !1;
      }
      reverseTraversal(e) {
        return !1;
      }
      minKey() {
        return null;
      }
      maxKey() {
        return null;
      }
      isRed() {
        return !1;
      }
      checkMaxDepth() {
        return !0;
      }
      check() {
        return 0;
      }
    })());
  class Ds {
    constructor(e) {
      (this.comparator = e), (this.data = new Rs(this.comparator));
    }
    has(e) {
      return null !== this.data.get(e);
    }
    first() {
      return this.data.minKey();
    }
    last() {
      return this.data.maxKey();
    }
    get size() {
      return this.data.size;
    }
    indexOf(e) {
      return this.data.indexOf(e);
    }
    forEach(e) {
      this.data.inorderTraversal((t, n) => (e(t), !1));
    }
    forEachInRange(e, t) {
      const n = this.data.getIteratorFrom(e[0]);
      for (; n.hasNext(); ) {
        const r = n.getNext();
        if (this.comparator(r.key, e[1]) >= 0) return;
        t(r.key);
      }
    }
    forEachWhile(e, t) {
      let n;
      for (
        n =
          void 0 !== t ? this.data.getIteratorFrom(t) : this.data.getIterator();
        n.hasNext();

      )
        if (!e(n.getNext().key)) return;
    }
    firstAfterOrEqual(e) {
      const t = this.data.getIteratorFrom(e);
      return t.hasNext() ? t.getNext().key : null;
    }
    getIterator() {
      return new Ls(this.data.getIterator());
    }
    getIteratorFrom(e) {
      return new Ls(this.data.getIteratorFrom(e));
    }
    add(e) {
      return this.copy(this.data.remove(e).insert(e, !0));
    }
    delete(e) {
      return this.has(e) ? this.copy(this.data.remove(e)) : this;
    }
    isEmpty() {
      return this.data.isEmpty();
    }
    unionWith(e) {
      let t = this;
      return (
        t.size < e.size && ((t = e), (e = this)),
        e.forEach((e) => {
          t = t.add(e);
        }),
        t
      );
    }
    isEqual(e) {
      if (!(e instanceof Ds)) return !1;
      if (this.size !== e.size) return !1;
      const t = this.data.getIterator(),
        n = e.data.getIterator();
      for (; t.hasNext(); ) {
        const e = t.getNext().key,
          r = n.getNext().key;
        if (0 !== this.comparator(e, r)) return !1;
      }
      return !0;
    }
    toArray() {
      const e = [];
      return (
        this.forEach((t) => {
          e.push(t);
        }),
        e
      );
    }
    toString() {
      const e = [];
      return this.forEach((t) => e.push(t)), "SortedSet(" + e.toString() + ")";
    }
    copy(e) {
      const t = new Ds(this.comparator);
      return (t.data = e), t;
    }
  }
  class Ls {
    constructor(e) {
      this.iter = e;
    }
    getNext() {
      return this.iter.getNext().key;
    }
    hasNext() {
      return this.iter.hasNext();
    }
  }
  class xs {
    constructor(e) {
      (this.fields = e), e.sort(ts.comparator);
    }
    static empty() {
      return new xs([]);
    }
    unionWith(e) {
      let t = new Ds(ts.comparator);
      for (const e of this.fields) t = t.add(e);
      for (const n of e) t = t.add(n);
      return new xs(t.toArray());
    }
    covers(e) {
      for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
      return !1;
    }
    isEqual(e) {
      return Gi(this.fields, e.fields, (e, t) => e.isEqual(t));
    }
  }
  class Ms extends Error {
    constructor() {
      super(...arguments), (this.name = "Base64DecodeError");
    }
  }
  class Us {
    constructor(e) {
      this.binaryString = e;
    }
    static fromBase64String(e) {
      const t = (function (e) {
        try {
          return atob(e);
        } catch (e) {
          throw "undefined" != typeof DOMException && e instanceof DOMException
            ? new Ms("Invalid base64 string: " + e)
            : e;
        }
      })(e);
      return new Us(t);
    }
    static fromUint8Array(e) {
      const t = (function (e) {
        let t = "";
        for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
        return t;
      })(e);
      return new Us(t);
    }
    [Symbol.iterator]() {
      let e = 0;
      return {
        next: () =>
          e < this.binaryString.length
            ? { value: this.binaryString.charCodeAt(e++), done: !1 }
            : { value: void 0, done: !0 },
      };
    }
    toBase64() {
      return (e = this.binaryString), btoa(e);
      var e;
    }
    toUint8Array() {
      return (function (e) {
        const t = new Uint8Array(e.length);
        for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
        return t;
      })(this.binaryString);
    }
    approximateByteSize() {
      return 2 * this.binaryString.length;
    }
    compareTo(e) {
      return $i(this.binaryString, e.binaryString);
    }
    isEqual(e) {
      return this.binaryString === e.binaryString;
    }
  }
  Us.EMPTY_BYTE_STRING = new Us("");
  const Vs = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
  function Fs(e) {
    if ((Ai(!!e), "string" == typeof e)) {
      let t = 0;
      const n = Vs.exec(e);
      if ((Ai(!!n), n[1])) {
        let e = n[1];
        (e = (e + "000000000").substr(0, 9)), (t = Number(e));
      }
      const r = new Date(e);
      return { seconds: Math.floor(r.getTime() / 1e3), nanos: t };
    }
    return { seconds: js(e.seconds), nanos: js(e.nanos) };
  }
  function js(e) {
    return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
  }
  function Bs(e) {
    return "string" == typeof e ? Us.fromBase64String(e) : Us.fromUint8Array(e);
  }
  const $s = "server_timestamp",
    Hs = "__type__",
    zs = "__previous_value__",
    qs = "__local_write_time__";
  function Gs(e) {
    var t, n;
    return (
      (null ===
        (n = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t
          ? void 0
          : t.fields) || {})[Hs]) || void 0 === n
        ? void 0
        : n.stringValue) === $s
    );
  }
  function Ks(e) {
    const t = e.mapValue.fields[zs];
    return Gs(t) ? Ks(t) : t;
  }
  function Ws(e) {
    const t = Fs(e.mapValue.fields[qs].timestampValue);
    return new Qi(t.seconds, t.nanos);
  }
  class Qs {
    constructor(e, t, n, r, i, s, o, a, c) {
      (this.databaseId = e),
        (this.appId = t),
        (this.persistenceKey = n),
        (this.host = r),
        (this.ssl = i),
        (this.forceLongPolling = s),
        (this.autoDetectLongPolling = o),
        (this.longPollingOptions = a),
        (this.useFetchStreams = c);
    }
  }
  const Xs = "(default)";
  class Js {
    constructor(e, t) {
      (this.projectId = e), (this.database = t || Xs);
    }
    static empty() {
      return new Js("", "");
    }
    get isDefaultDatabase() {
      return this.database === Xs;
    }
    isEqual(e) {
      return (
        e instanceof Js &&
        e.projectId === this.projectId &&
        e.database === this.database
      );
    }
  }
  const Ys = "__type__",
    Zs = "__max__",
    eo = { fields: { __type__: { stringValue: Zs } } },
    to = "__vector__",
    no = "value";
  function ro(e) {
    return "nullValue" in e
      ? 0
      : "booleanValue" in e
        ? 1
        : "integerValue" in e || "doubleValue" in e
          ? 2
          : "timestampValue" in e
            ? 3
            : "stringValue" in e
              ? 5
              : "bytesValue" in e
                ? 6
                : "referenceValue" in e
                  ? 7
                  : "geoPointValue" in e
                    ? 8
                    : "arrayValue" in e
                      ? 9
                      : "mapValue" in e
                        ? Gs(e)
                          ? 4
                          : vo(e)
                            ? 9007199254740991
                            : mo(e)
                              ? 10
                              : 11
                        : Ci();
  }
  function io(e, t) {
    if (e === t) return !0;
    const n = ro(e);
    if (n !== ro(t)) return !1;
    switch (n) {
      case 0:
      case 9007199254740991:
        return !0;
      case 1:
        return e.booleanValue === t.booleanValue;
      case 4:
        return Ws(e).isEqual(Ws(t));
      case 3:
        return (function (e, t) {
          if (
            "string" == typeof e.timestampValue &&
            "string" == typeof t.timestampValue &&
            e.timestampValue.length === t.timestampValue.length
          )
            return e.timestampValue === t.timestampValue;
          const n = Fs(e.timestampValue),
            r = Fs(t.timestampValue);
          return n.seconds === r.seconds && n.nanos === r.nanos;
        })(e, t);
      case 5:
        return e.stringValue === t.stringValue;
      case 6:
        return (function (e, t) {
          return Bs(e.bytesValue).isEqual(Bs(t.bytesValue));
        })(e, t);
      case 7:
        return e.referenceValue === t.referenceValue;
      case 8:
        return (function (e, t) {
          return (
            js(e.geoPointValue.latitude) === js(t.geoPointValue.latitude) &&
            js(e.geoPointValue.longitude) === js(t.geoPointValue.longitude)
          );
        })(e, t);
      case 2:
        return (function (e, t) {
          if ("integerValue" in e && "integerValue" in t)
            return js(e.integerValue) === js(t.integerValue);
          if ("doubleValue" in e && "doubleValue" in t) {
            const n = js(e.doubleValue),
              r = js(t.doubleValue);
            return n === r ? ds(n) === ds(r) : isNaN(n) && isNaN(r);
          }
          return !1;
        })(e, t);
      case 9:
        return Gi(e.arrayValue.values || [], t.arrayValue.values || [], io);
      case 10:
      case 11:
        return (function (e, t) {
          const n = e.mapValue.fields || {},
            r = t.mapValue.fields || {};
          if (As(n) !== As(r)) return !1;
          for (const e in n)
            if (n.hasOwnProperty(e) && (void 0 === r[e] || !io(n[e], r[e])))
              return !1;
          return !0;
        })(e, t);
      default:
        return Ci();
    }
  }
  function so(e, t) {
    return void 0 !== (e.values || []).find((e) => io(e, t));
  }
  function oo(e, t) {
    if (e === t) return 0;
    const n = ro(e),
      r = ro(t);
    if (n !== r) return $i(n, r);
    switch (n) {
      case 0:
      case 9007199254740991:
        return 0;
      case 1:
        return $i(e.booleanValue, t.booleanValue);
      case 2:
        return (function (e, t) {
          const n = js(e.integerValue || e.doubleValue),
            r = js(t.integerValue || t.doubleValue);
          return n < r
            ? -1
            : n > r
              ? 1
              : n === r
                ? 0
                : isNaN(n)
                  ? isNaN(r)
                    ? 0
                    : -1
                  : 1;
        })(e, t);
      case 3:
        return ao(e.timestampValue, t.timestampValue);
      case 4:
        return ao(Ws(e), Ws(t));
      case 5:
        return Hi(e.stringValue, t.stringValue);
      case 6:
        return (function (e, t) {
          const n = Bs(e),
            r = Bs(t);
          return n.compareTo(r);
        })(e.bytesValue, t.bytesValue);
      case 7:
        return (function (e, t) {
          const n = e.split("/"),
            r = t.split("/");
          for (let e = 0; e < n.length && e < r.length; e++) {
            const t = $i(n[e], r[e]);
            if (0 !== t) return t;
          }
          return $i(n.length, r.length);
        })(e.referenceValue, t.referenceValue);
      case 8:
        return (function (e, t) {
          const n = $i(js(e.latitude), js(t.latitude));
          return 0 !== n ? n : $i(js(e.longitude), js(t.longitude));
        })(e.geoPointValue, t.geoPointValue);
      case 9:
        return co(e.arrayValue, t.arrayValue);
      case 10:
        return (function (e, t) {
          var n, r, i, s;
          const o = e.fields || {},
            a = t.fields || {},
            c = null === (n = o[no]) || void 0 === n ? void 0 : n.arrayValue,
            u = null === (r = a[no]) || void 0 === r ? void 0 : r.arrayValue,
            l = $i(
              (null === (i = null == c ? void 0 : c.values) || void 0 === i
                ? void 0
                : i.length) || 0,
              (null === (s = null == u ? void 0 : u.values) || void 0 === s
                ? void 0
                : s.length) || 0,
            );
          return 0 !== l ? l : co(c, u);
        })(e.mapValue, t.mapValue);
      case 11:
        return (function (e, t) {
          if (e === eo && t === eo) return 0;
          if (e === eo) return 1;
          if (t === eo) return -1;
          const n = e.fields || {},
            r = Object.keys(n),
            i = t.fields || {},
            s = Object.keys(i);
          r.sort(), s.sort();
          for (let e = 0; e < r.length && e < s.length; ++e) {
            const t = Hi(r[e], s[e]);
            if (0 !== t) return t;
            const o = oo(n[r[e]], i[s[e]]);
            if (0 !== o) return o;
          }
          return $i(r.length, s.length);
        })(e.mapValue, t.mapValue);
      default:
        throw Ci();
    }
  }
  function ao(e, t) {
    if ("string" == typeof e && "string" == typeof t && e.length === t.length)
      return $i(e, t);
    const n = Fs(e),
      r = Fs(t),
      i = $i(n.seconds, r.seconds);
    return 0 !== i ? i : $i(n.nanos, r.nanos);
  }
  function co(e, t) {
    const n = e.values || [],
      r = t.values || [];
    for (let e = 0; e < n.length && e < r.length; ++e) {
      const t = oo(n[e], r[e]);
      if (t) return t;
    }
    return $i(n.length, r.length);
  }
  function uo(e) {
    return lo(e);
  }
  function lo(e) {
    return "nullValue" in e
      ? "null"
      : "booleanValue" in e
        ? "" + e.booleanValue
        : "integerValue" in e
          ? "" + e.integerValue
          : "doubleValue" in e
            ? "" + e.doubleValue
            : "timestampValue" in e
              ? (function (e) {
                  const t = Fs(e);
                  return `time(${t.seconds},${t.nanos})`;
                })(e.timestampValue)
              : "stringValue" in e
                ? e.stringValue
                : "bytesValue" in e
                  ? (function (e) {
                      return Bs(e).toBase64();
                    })(e.bytesValue)
                  : "referenceValue" in e
                    ? (function (e) {
                        return ns.fromName(e).toString();
                      })(e.referenceValue)
                    : "geoPointValue" in e
                      ? (function (e) {
                          return `geo(${e.latitude},${e.longitude})`;
                        })(e.geoPointValue)
                      : "arrayValue" in e
                        ? (function (e) {
                            let t = "[",
                              n = !0;
                            for (const r of e.values || [])
                              n ? (n = !1) : (t += ","), (t += lo(r));
                            return t + "]";
                          })(e.arrayValue)
                        : "mapValue" in e
                          ? (function (e) {
                              const t = Object.keys(e.fields || {}).sort();
                              let n = "{",
                                r = !0;
                              for (const i of t)
                                r ? (r = !1) : (n += ","),
                                  (n += `${i}:${lo(e.fields[i])}`);
                              return n + "}";
                            })(e.mapValue)
                          : Ci();
  }
  function ho(e) {
    switch (ro(e)) {
      case 0:
      case 1:
        return 4;
      case 2:
        return 8;
      case 3:
      case 8:
        return 16;
      case 4:
        const t = Ks(e);
        return t ? 16 + ho(t) : 16;
      case 5:
        return 2 * e.stringValue.length;
      case 6:
        return Bs(e.bytesValue).approximateByteSize();
      case 7:
        return e.referenceValue.length;
      case 9:
        return (function (e) {
          return (e.values || []).reduce((e, t) => e + ho(t), 0);
        })(e.arrayValue);
      case 10:
      case 11:
        return (function (e) {
          let t = 0;
          return (
            ks(e.fields, (e, n) => {
              t += e.length + ho(n);
            }),
            t
          );
        })(e.mapValue);
      default:
        throw Ci();
    }
  }
  function fo(e) {
    return !!e && "integerValue" in e;
  }
  function po(e) {
    return !!e && "arrayValue" in e;
  }
  function go(e) {
    return !!e && "mapValue" in e;
  }
  function mo(e) {
    var t, n;
    return (
      (null ===
        (n = ((null === (t = null == e ? void 0 : e.mapValue) || void 0 === t
          ? void 0
          : t.fields) || {})[Ys]) || void 0 === n
        ? void 0
        : n.stringValue) === to
    );
  }
  function yo(e) {
    if (e.geoPointValue)
      return { geoPointValue: Object.assign({}, e.geoPointValue) };
    if (e.timestampValue && "object" == typeof e.timestampValue)
      return { timestampValue: Object.assign({}, e.timestampValue) };
    if (e.mapValue) {
      const t = { mapValue: { fields: {} } };
      return ks(e.mapValue.fields, (e, n) => (t.mapValue.fields[e] = yo(n))), t;
    }
    if (e.arrayValue) {
      const t = { arrayValue: { values: [] } };
      for (let n = 0; n < (e.arrayValue.values || []).length; ++n)
        t.arrayValue.values[n] = yo(e.arrayValue.values[n]);
      return t;
    }
    return Object.assign({}, e);
  }
  function vo(e) {
    return (
      (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue === Zs
    );
  }
  class wo {
    constructor(e) {
      this.value = e;
    }
    static empty() {
      return new wo({ mapValue: {} });
    }
    field(e) {
      if (e.isEmpty()) return this.value;
      {
        let t = this.value;
        for (let n = 0; n < e.length - 1; ++n)
          if (((t = (t.mapValue.fields || {})[e.get(n)]), !go(t))) return null;
        return (t = (t.mapValue.fields || {})[e.lastSegment()]), t || null;
      }
    }
    set(e, t) {
      this.getFieldsMap(e.popLast())[e.lastSegment()] = yo(t);
    }
    setAll(e) {
      let t = ts.emptyPath(),
        n = {},
        r = [];
      e.forEach((e, i) => {
        if (!t.isImmediateParentOf(i)) {
          const e = this.getFieldsMap(t);
          this.applyChanges(e, n, r), (n = {}), (r = []), (t = i.popLast());
        }
        e ? (n[i.lastSegment()] = yo(e)) : r.push(i.lastSegment());
      });
      const i = this.getFieldsMap(t);
      this.applyChanges(i, n, r);
    }
    delete(e) {
      const t = this.field(e.popLast());
      go(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
    }
    isEqual(e) {
      return io(this.value, e.value);
    }
    getFieldsMap(e) {
      let t = this.value;
      t.mapValue.fields || (t.mapValue = { fields: {} });
      for (let n = 0; n < e.length; ++n) {
        let r = t.mapValue.fields[e.get(n)];
        (go(r) && r.mapValue.fields) ||
          ((r = { mapValue: { fields: {} } }),
          (t.mapValue.fields[e.get(n)] = r)),
          (t = r);
      }
      return t.mapValue.fields;
    }
    applyChanges(e, t, n) {
      ks(t, (t, n) => (e[t] = n));
      for (const t of n) delete e[t];
    }
    clone() {
      return new wo(yo(this.value));
    }
  }
  function _o(e) {
    const t = [];
    return (
      ks(e.fields, (e, n) => {
        const r = new ts([e]);
        if (go(n)) {
          const e = _o(n.mapValue).fields;
          if (0 === e.length) t.push(r);
          else for (const n of e) t.push(r.child(n));
        } else t.push(r);
      }),
      new xs(t)
    );
  }
  class Eo {
    constructor(e, t, n, r, i, s, o) {
      (this.key = e),
        (this.documentType = t),
        (this.version = n),
        (this.readTime = r),
        (this.createTime = i),
        (this.data = s),
        (this.documentState = o);
    }
    static newInvalidDocument(e) {
      return new Eo(e, 0, Xi.min(), Xi.min(), Xi.min(), wo.empty(), 0);
    }
    static newFoundDocument(e, t, n, r) {
      return new Eo(e, 1, t, Xi.min(), n, r, 0);
    }
    static newNoDocument(e, t) {
      return new Eo(e, 2, t, Xi.min(), Xi.min(), wo.empty(), 0);
    }
    static newUnknownDocument(e, t) {
      return new Eo(e, 3, t, Xi.min(), Xi.min(), wo.empty(), 2);
    }
    convertToFoundDocument(e, t) {
      return (
        !this.createTime.isEqual(Xi.min()) ||
          (2 !== this.documentType && 0 !== this.documentType) ||
          (this.createTime = e),
        (this.version = e),
        (this.documentType = 1),
        (this.data = t),
        (this.documentState = 0),
        this
      );
    }
    convertToNoDocument(e) {
      return (
        (this.version = e),
        (this.documentType = 2),
        (this.data = wo.empty()),
        (this.documentState = 0),
        this
      );
    }
    convertToUnknownDocument(e) {
      return (
        (this.version = e),
        (this.documentType = 3),
        (this.data = wo.empty()),
        (this.documentState = 2),
        this
      );
    }
    setHasCommittedMutations() {
      return (this.documentState = 2), this;
    }
    setHasLocalMutations() {
      return (this.documentState = 1), (this.version = Xi.min()), this;
    }
    setReadTime(e) {
      return (this.readTime = e), this;
    }
    get hasLocalMutations() {
      return 1 === this.documentState;
    }
    get hasCommittedMutations() {
      return 2 === this.documentState;
    }
    get hasPendingWrites() {
      return this.hasLocalMutations || this.hasCommittedMutations;
    }
    isValidDocument() {
      return 0 !== this.documentType;
    }
    isFoundDocument() {
      return 1 === this.documentType;
    }
    isNoDocument() {
      return 2 === this.documentType;
    }
    isUnknownDocument() {
      return 3 === this.documentType;
    }
    isEqual(e) {
      return (
        e instanceof Eo &&
        this.key.isEqual(e.key) &&
        this.version.isEqual(e.version) &&
        this.documentType === e.documentType &&
        this.documentState === e.documentState &&
        this.data.isEqual(e.data)
      );
    }
    mutableCopy() {
      return new Eo(
        this.key,
        this.documentType,
        this.version,
        this.readTime,
        this.createTime,
        this.data.clone(),
        this.documentState,
      );
    }
    toString() {
      return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
    }
  }
  class bo {
    constructor(e, t) {
      (this.position = e), (this.inclusive = t);
    }
  }
  function Io(e, t, n) {
    let r = 0;
    for (let i = 0; i < e.position.length; i++) {
      const s = t[i],
        o = e.position[i];
      if (
        ((r = s.field.isKeyField()
          ? ns.comparator(ns.fromName(o.referenceValue), n.key)
          : oo(o, n.data.field(s.field))),
        "desc" === s.dir && (r *= -1),
        0 !== r)
      )
        break;
    }
    return r;
  }
  function To(e, t) {
    if (null === e) return null === t;
    if (null === t) return !1;
    if (e.inclusive !== t.inclusive || e.position.length !== t.position.length)
      return !1;
    for (let n = 0; n < e.position.length; n++)
      if (!io(e.position[n], t.position[n])) return !1;
    return !0;
  }
  class So {
    constructor(e, t = "asc") {
      (this.field = e), (this.dir = t);
    }
  }
  function Co(e, t) {
    return e.dir === t.dir && e.field.isEqual(t.field);
  }
  class Ao {}
  class ko extends Ao {
    constructor(e, t, n) {
      super(), (this.field = e), (this.op = t), (this.value = n);
    }
    static create(e, t, n) {
      return e.isKeyField()
        ? "in" === t || "not-in" === t
          ? this.createKeyFieldInFilter(e, t, n)
          : new xo(e, t, n)
        : "array-contains" === t
          ? new Fo(e, n)
          : "in" === t
            ? new jo(e, n)
            : "not-in" === t
              ? new Bo(e, n)
              : "array-contains-any" === t
                ? new $o(e, n)
                : new ko(e, t, n);
    }
    static createKeyFieldInFilter(e, t, n) {
      return "in" === t ? new Mo(e, n) : new Uo(e, n);
    }
    matches(e) {
      const t = e.data.field(this.field);
      return "!=" === this.op
        ? null !== t && this.matchesComparison(oo(t, this.value))
        : null !== t &&
            ro(this.value) === ro(t) &&
            this.matchesComparison(oo(t, this.value));
    }
    matchesComparison(e) {
      switch (this.op) {
        case "<":
          return e < 0;
        case "<=":
          return e <= 0;
        case "==":
          return 0 === e;
        case "!=":
          return 0 !== e;
        case ">":
          return e > 0;
        case ">=":
          return e >= 0;
        default:
          return Ci();
      }
    }
    isInequality() {
      return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0;
    }
    getFlattenedFilters() {
      return [this];
    }
    getFilters() {
      return [this];
    }
  }
  class No extends Ao {
    constructor(e, t) {
      super(), (this.filters = e), (this.op = t), (this.ce = null);
    }
    static create(e, t) {
      return new No(e, t);
    }
    matches(e) {
      return Ro(this)
        ? void 0 === this.filters.find((t) => !t.matches(e))
        : void 0 !== this.filters.find((t) => t.matches(e));
    }
    getFlattenedFilters() {
      return (
        null !== this.ce ||
          (this.ce = this.filters.reduce(
            (e, t) => e.concat(t.getFlattenedFilters()),
            [],
          )),
        this.ce
      );
    }
    getFilters() {
      return Object.assign([], this.filters);
    }
  }
  function Ro(e) {
    return "and" === e.op;
  }
  function Oo(e) {
    return (
      (function (e) {
        for (const t of e.filters) if (t instanceof No) return !1;
        return !0;
      })(e) && Ro(e)
    );
  }
  function Po(e) {
    if (e instanceof ko)
      return e.field.canonicalString() + e.op.toString() + uo(e.value);
    if (Oo(e)) return e.filters.map((e) => Po(e)).join(",");
    {
      const t = e.filters.map((e) => Po(e)).join(",");
      return `${e.op}(${t})`;
    }
  }
  function Do(e, t) {
    return e instanceof ko
      ? (function (e, t) {
          return (
            t instanceof ko &&
            e.op === t.op &&
            e.field.isEqual(t.field) &&
            io(e.value, t.value)
          );
        })(e, t)
      : e instanceof No
        ? (function (e, t) {
            return (
              t instanceof No &&
              e.op === t.op &&
              e.filters.length === t.filters.length &&
              e.filters.reduce((e, n, r) => e && Do(n, t.filters[r]), !0)
            );
          })(e, t)
        : void Ci();
  }
  function Lo(e) {
    return e instanceof ko
      ? (function (e) {
          return `${e.field.canonicalString()} ${e.op} ${uo(e.value)}`;
        })(e)
      : e instanceof No
        ? (function (e) {
            return (
              e.op.toString() + " {" + e.getFilters().map(Lo).join(" ,") + "}"
            );
          })(e)
        : "Filter";
  }
  class xo extends ko {
    constructor(e, t, n) {
      super(e, t, n), (this.key = ns.fromName(n.referenceValue));
    }
    matches(e) {
      const t = ns.comparator(e.key, this.key);
      return this.matchesComparison(t);
    }
  }
  class Mo extends ko {
    constructor(e, t) {
      super(e, "in", t), (this.keys = Vo(0, t));
    }
    matches(e) {
      return this.keys.some((t) => t.isEqual(e.key));
    }
  }
  class Uo extends ko {
    constructor(e, t) {
      super(e, "not-in", t), (this.keys = Vo(0, t));
    }
    matches(e) {
      return !this.keys.some((t) => t.isEqual(e.key));
    }
  }
  function Vo(e, t) {
    var n;
    return (
      (null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) || []
    ).map((e) => ns.fromName(e.referenceValue));
  }
  class Fo extends ko {
    constructor(e, t) {
      super(e, "array-contains", t);
    }
    matches(e) {
      const t = e.data.field(this.field);
      return po(t) && so(t.arrayValue, this.value);
    }
  }
  class jo extends ko {
    constructor(e, t) {
      super(e, "in", t);
    }
    matches(e) {
      const t = e.data.field(this.field);
      return null !== t && so(this.value.arrayValue, t);
    }
  }
  class Bo extends ko {
    constructor(e, t) {
      super(e, "not-in", t);
    }
    matches(e) {
      if (so(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
      const t = e.data.field(this.field);
      return null !== t && !so(this.value.arrayValue, t);
    }
  }
  class $o extends ko {
    constructor(e, t) {
      super(e, "array-contains-any", t);
    }
    matches(e) {
      const t = e.data.field(this.field);
      return (
        !(!po(t) || !t.arrayValue.values) &&
        t.arrayValue.values.some((e) => so(this.value.arrayValue, e))
      );
    }
  }
  class Ho {
    constructor(e, t = null, n = [], r = [], i = null, s = null, o = null) {
      (this.path = e),
        (this.collectionGroup = t),
        (this.orderBy = n),
        (this.filters = r),
        (this.limit = i),
        (this.startAt = s),
        (this.endAt = o),
        (this.le = null);
    }
  }
  function zo(e, t = null, n = [], r = [], i = null, s = null, o = null) {
    return new Ho(e, t, n, r, i, s, o);
  }
  function qo(e) {
    const t = ki(e);
    if (null === t.le) {
      let e = t.path.canonicalString();
      null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup),
        (e += "|f:"),
        (e += t.filters.map((e) => Po(e)).join(",")),
        (e += "|ob:"),
        (e += t.orderBy
          .map((e) =>
            (function (e) {
              return e.field.canonicalString() + e.dir;
            })(e),
          )
          .join(",")),
        hs(t.limit) || ((e += "|l:"), (e += t.limit)),
        t.startAt &&
          ((e += "|lb:"),
          (e += t.startAt.inclusive ? "b:" : "a:"),
          (e += t.startAt.position.map((e) => uo(e)).join(","))),
        t.endAt &&
          ((e += "|ub:"),
          (e += t.endAt.inclusive ? "a:" : "b:"),
          (e += t.endAt.position.map((e) => uo(e)).join(","))),
        (t.le = e);
    }
    return t.le;
  }
  function Go(e, t) {
    if (e.limit !== t.limit) return !1;
    if (e.orderBy.length !== t.orderBy.length) return !1;
    for (let n = 0; n < e.orderBy.length; n++)
      if (!Co(e.orderBy[n], t.orderBy[n])) return !1;
    if (e.filters.length !== t.filters.length) return !1;
    for (let n = 0; n < e.filters.length; n++)
      if (!Do(e.filters[n], t.filters[n])) return !1;
    return (
      e.collectionGroup === t.collectionGroup &&
      !!e.path.isEqual(t.path) &&
      !!To(e.startAt, t.startAt) &&
      To(e.endAt, t.endAt)
    );
  }
  class Ko {
    constructor(
      e,
      t = null,
      n = [],
      r = [],
      i = null,
      s = "F",
      o = null,
      a = null,
    ) {
      (this.path = e),
        (this.collectionGroup = t),
        (this.explicitOrderBy = n),
        (this.filters = r),
        (this.limit = i),
        (this.limitType = s),
        (this.startAt = o),
        (this.endAt = a),
        (this.he = null),
        (this.Pe = null),
        (this.Te = null),
        this.startAt,
        this.endAt;
    }
  }
  function Wo(e) {
    return (
      0 === e.filters.length &&
      null === e.limit &&
      null == e.startAt &&
      null == e.endAt &&
      (0 === e.explicitOrderBy.length ||
        (1 === e.explicitOrderBy.length &&
          e.explicitOrderBy[0].field.isKeyField()))
    );
  }
  function Qo(e) {
    const t = ki(e);
    if (null === t.he) {
      t.he = [];
      const e = new Set();
      for (const n of t.explicitOrderBy)
        t.he.push(n), e.add(n.field.canonicalString());
      const n =
          t.explicitOrderBy.length > 0
            ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir
            : "asc",
        r = (function (e) {
          let t = new Ds(ts.comparator);
          return (
            e.filters.forEach((e) => {
              e.getFlattenedFilters().forEach((e) => {
                e.isInequality() && (t = t.add(e.field));
              });
            }),
            t
          );
        })(t);
      r.forEach((r) => {
        e.has(r.canonicalString()) || r.isKeyField() || t.he.push(new So(r, n));
      }),
        e.has(ts.keyField().canonicalString()) ||
          t.he.push(new So(ts.keyField(), n));
    }
    return t.he;
  }
  function Xo(e) {
    const t = ki(e);
    return (
      t.Pe ||
        (t.Pe = (function (e, t) {
          if ("F" === e.limitType)
            return zo(
              e.path,
              e.collectionGroup,
              t,
              e.filters,
              e.limit,
              e.startAt,
              e.endAt,
            );
          {
            t = t.map((e) => {
              const t = "desc" === e.dir ? "asc" : "desc";
              return new So(e.field, t);
            });
            const n = e.endAt
                ? new bo(e.endAt.position, e.endAt.inclusive)
                : null,
              r = e.startAt
                ? new bo(e.startAt.position, e.startAt.inclusive)
                : null;
            return zo(e.path, e.collectionGroup, t, e.filters, e.limit, n, r);
          }
        })(t, Qo(e))),
      t.Pe
    );
  }
  function Jo(e, t, n) {
    return new Ko(
      e.path,
      e.collectionGroup,
      e.explicitOrderBy.slice(),
      e.filters.slice(),
      t,
      n,
      e.startAt,
      e.endAt,
    );
  }
  function Yo(e, t) {
    return Go(Xo(e), Xo(t)) && e.limitType === t.limitType;
  }
  function Zo(e) {
    return `${qo(Xo(e))}|lt:${e.limitType}`;
  }
  function ea(e) {
    return `Query(target=${(function (e) {
      let t = e.path.canonicalString();
      return (
        null !== e.collectionGroup &&
          (t += " collectionGroup=" + e.collectionGroup),
        e.filters.length > 0 &&
          (t += `, filters: [${e.filters.map((e) => Lo(e)).join(", ")}]`),
        hs(e.limit) || (t += ", limit: " + e.limit),
        e.orderBy.length > 0 &&
          (t += `, orderBy: [${e.orderBy
            .map((e) =>
              (function (e) {
                return `${e.field.canonicalString()} (${e.dir})`;
              })(e),
            )
            .join(", ")}]`),
        e.startAt &&
          ((t += ", startAt: "),
          (t += e.startAt.inclusive ? "b:" : "a:"),
          (t += e.startAt.position.map((e) => uo(e)).join(","))),
        e.endAt &&
          ((t += ", endAt: "),
          (t += e.endAt.inclusive ? "a:" : "b:"),
          (t += e.endAt.position.map((e) => uo(e)).join(","))),
        `Target(${t})`
      );
    })(Xo(e))}; limitType=${e.limitType})`;
  }
  function ta(e, t) {
    return (
      t.isFoundDocument() &&
      (function (e, t) {
        const n = t.key.path;
        return null !== e.collectionGroup
          ? t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(n)
          : ns.isDocumentKey(e.path)
            ? e.path.isEqual(n)
            : e.path.isImmediateParentOf(n);
      })(e, t) &&
      (function (e, t) {
        for (const n of Qo(e))
          if (!n.field.isKeyField() && null === t.data.field(n.field))
            return !1;
        return !0;
      })(e, t) &&
      (function (e, t) {
        for (const n of e.filters) if (!n.matches(t)) return !1;
        return !0;
      })(e, t) &&
      (function (e, t) {
        return !(
          (e.startAt &&
            !(function (e, t, n) {
              const r = Io(e, t, n);
              return e.inclusive ? r <= 0 : r < 0;
            })(e.startAt, Qo(e), t)) ||
          (e.endAt &&
            !(function (e, t, n) {
              const r = Io(e, t, n);
              return e.inclusive ? r >= 0 : r > 0;
            })(e.endAt, Qo(e), t))
        );
      })(e, t)
    );
  }
  function na(e, t, n) {
    const r = e.field.isKeyField()
      ? ns.comparator(t.key, n.key)
      : (function (e, t, n) {
          const r = t.data.field(e),
            i = n.data.field(e);
          return null !== r && null !== i ? oo(r, i) : Ci();
        })(e.field, t, n);
    switch (e.dir) {
      case "asc":
        return r;
      case "desc":
        return -1 * r;
      default:
        return Ci();
    }
  }
  class ra {
    constructor(e, t) {
      (this.mapKeyFn = e),
        (this.equalsFn = t),
        (this.inner = {}),
        (this.innerSize = 0);
    }
    get(e) {
      const t = this.mapKeyFn(e),
        n = this.inner[t];
      if (void 0 !== n)
        for (const [t, r] of n) if (this.equalsFn(t, e)) return r;
    }
    has(e) {
      return void 0 !== this.get(e);
    }
    set(e, t) {
      const n = this.mapKeyFn(e),
        r = this.inner[n];
      if (void 0 === r)
        return (this.inner[n] = [[e, t]]), void this.innerSize++;
      for (let n = 0; n < r.length; n++)
        if (this.equalsFn(r[n][0], e)) return void (r[n] = [e, t]);
      r.push([e, t]), this.innerSize++;
    }
    delete(e) {
      const t = this.mapKeyFn(e),
        n = this.inner[t];
      if (void 0 === n) return !1;
      for (let r = 0; r < n.length; r++)
        if (this.equalsFn(n[r][0], e))
          return (
            1 === n.length ? delete this.inner[t] : n.splice(r, 1),
            this.innerSize--,
            !0
          );
      return !1;
    }
    forEach(e) {
      ks(this.inner, (t, n) => {
        for (const [t, r] of n) e(t, r);
      });
    }
    isEmpty() {
      return Ns(this.inner);
    }
    size() {
      return this.innerSize;
    }
  }
  const ia = new Rs(ns.comparator);
  function sa() {
    return ia;
  }
  const oa = new Rs(ns.comparator);
  function aa(...e) {
    let t = oa;
    for (const n of e) t = t.insert(n.key, n);
    return t;
  }
  function ca(e) {
    let t = oa;
    return e.forEach((e, n) => (t = t.insert(e, n.overlayedDocument))), t;
  }
  function ua() {
    return ha();
  }
  function la() {
    return ha();
  }
  function ha() {
    return new ra(
      (e) => e.toString(),
      (e, t) => e.isEqual(t),
    );
  }
  const da = new Rs(ns.comparator),
    fa = new Ds(ns.comparator);
  function pa(...e) {
    let t = fa;
    for (const n of e) t = t.add(n);
    return t;
  }
  const ga = new Ds($i);
  function ma(e, t) {
    if (e.useProto3Json) {
      if (isNaN(t)) return { doubleValue: "NaN" };
      if (t === 1 / 0) return { doubleValue: "Infinity" };
      if (t === -1 / 0) return { doubleValue: "-Infinity" };
    }
    return { doubleValue: ds(t) ? "-0" : t };
  }
  function ya(e) {
    return { integerValue: "" + e };
  }
  function va(e, t) {
    return (function (e) {
      return (
        "number" == typeof e &&
        Number.isInteger(e) &&
        !ds(e) &&
        e <= Number.MAX_SAFE_INTEGER &&
        e >= Number.MIN_SAFE_INTEGER
      );
    })(t)
      ? ya(t)
      : ma(e, t);
  }
  class wa {
    constructor() {
      this._ = void 0;
    }
  }
  function _a(e, t, n) {
    return e instanceof Ia
      ? (function (e, t) {
          const n = {
            fields: {
              [Hs]: { stringValue: $s },
              [qs]: {
                timestampValue: { seconds: e.seconds, nanos: e.nanoseconds },
              },
            },
          };
          return (
            t && Gs(t) && (t = Ks(t)), t && (n.fields[zs] = t), { mapValue: n }
          );
        })(n, t)
      : e instanceof Ta
        ? Sa(e, t)
        : e instanceof Ca
          ? Aa(e, t)
          : (function (e, t) {
              const n = ba(e, t),
                r = Na(n) + Na(e.Ie);
              return fo(n) && fo(e.Ie) ? ya(r) : ma(e.serializer, r);
            })(e, t);
  }
  function Ea(e, t, n) {
    return e instanceof Ta ? Sa(e, t) : e instanceof Ca ? Aa(e, t) : n;
  }
  function ba(e, t) {
    return e instanceof ka
      ? (function (e) {
          return (
            fo(e) ||
            (function (e) {
              return !!e && "doubleValue" in e;
            })(e)
          );
        })(t)
        ? t
        : { integerValue: 0 }
      : null;
  }
  class Ia extends wa {}
  class Ta extends wa {
    constructor(e) {
      super(), (this.elements = e);
    }
  }
  function Sa(e, t) {
    const n = Ra(t);
    for (const t of e.elements) n.some((e) => io(e, t)) || n.push(t);
    return { arrayValue: { values: n } };
  }
  class Ca extends wa {
    constructor(e) {
      super(), (this.elements = e);
    }
  }
  function Aa(e, t) {
    let n = Ra(t);
    for (const t of e.elements) n = n.filter((e) => !io(e, t));
    return { arrayValue: { values: n } };
  }
  class ka extends wa {
    constructor(e, t) {
      super(), (this.serializer = e), (this.Ie = t);
    }
  }
  function Na(e) {
    return js(e.integerValue || e.doubleValue);
  }
  function Ra(e) {
    return po(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
  }
  class Oa {
    constructor(e, t) {
      (this.version = e), (this.transformResults = t);
    }
  }
  class Pa {
    constructor(e, t) {
      (this.updateTime = e), (this.exists = t);
    }
    static none() {
      return new Pa();
    }
    static exists(e) {
      return new Pa(void 0, e);
    }
    static updateTime(e) {
      return new Pa(e);
    }
    get isNone() {
      return void 0 === this.updateTime && void 0 === this.exists;
    }
    isEqual(e) {
      return (
        this.exists === e.exists &&
        (this.updateTime
          ? !!e.updateTime && this.updateTime.isEqual(e.updateTime)
          : !e.updateTime)
      );
    }
  }
  function Da(e, t) {
    return void 0 !== e.updateTime
      ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
      : void 0 === e.exists || e.exists === t.isFoundDocument();
  }
  class La {}
  function xa(e, t) {
    if (!e.hasLocalMutations || (t && 0 === t.fields.length)) return null;
    if (null === t)
      return e.isNoDocument()
        ? new qa(e.key, Pa.none())
        : new ja(e.key, e.data, Pa.none());
    {
      const n = e.data,
        r = wo.empty();
      let i = new Ds(ts.comparator);
      for (let e of t.fields)
        if (!i.has(e)) {
          let t = n.field(e);
          null === t && e.length > 1 && ((e = e.popLast()), (t = n.field(e))),
            null === t ? r.delete(e) : r.set(e, t),
            (i = i.add(e));
        }
      return new Ba(e.key, r, new xs(i.toArray()), Pa.none());
    }
  }
  function Ma(e, t, n) {
    e instanceof ja
      ? (function (e, t, n) {
          const r = e.value.clone(),
            i = Ha(e.fieldTransforms, t, n.transformResults);
          r.setAll(i),
            t.convertToFoundDocument(n.version, r).setHasCommittedMutations();
        })(e, t, n)
      : e instanceof Ba
        ? (function (e, t, n) {
            if (!Da(e.precondition, t))
              return void t.convertToUnknownDocument(n.version);
            const r = Ha(e.fieldTransforms, t, n.transformResults),
              i = t.data;
            i.setAll($a(e)),
              i.setAll(r),
              t.convertToFoundDocument(n.version, i).setHasCommittedMutations();
          })(e, t, n)
        : (function (e, t, n) {
            t.convertToNoDocument(n.version).setHasCommittedMutations();
          })(0, t, n);
  }
  function Ua(e, t, n, r) {
    return e instanceof ja
      ? (function (e, t, n, r) {
          if (!Da(e.precondition, t)) return n;
          const i = e.value.clone(),
            s = za(e.fieldTransforms, r, t);
          return (
            i.setAll(s),
            t.convertToFoundDocument(t.version, i).setHasLocalMutations(),
            null
          );
        })(e, t, n, r)
      : e instanceof Ba
        ? (function (e, t, n, r) {
            if (!Da(e.precondition, t)) return n;
            const i = za(e.fieldTransforms, r, t),
              s = t.data;
            return (
              s.setAll($a(e)),
              s.setAll(i),
              t.convertToFoundDocument(t.version, s).setHasLocalMutations(),
              null === n
                ? null
                : n
                    .unionWith(e.fieldMask.fields)
                    .unionWith(e.fieldTransforms.map((e) => e.field))
            );
          })(e, t, n, r)
        : (function (e, t, n) {
            return Da(e.precondition, t)
              ? (t.convertToNoDocument(t.version).setHasLocalMutations(), null)
              : n;
          })(e, t, n);
  }
  function Va(e, t) {
    let n = null;
    for (const r of e.fieldTransforms) {
      const e = t.data.field(r.field),
        i = ba(r.transform, e || null);
      null != i && (null === n && (n = wo.empty()), n.set(r.field, i));
    }
    return n || null;
  }
  function Fa(e, t) {
    return (
      e.type === t.type &&
      !!e.key.isEqual(t.key) &&
      !!e.precondition.isEqual(t.precondition) &&
      !!(function (e, t) {
        return (
          (void 0 === e && void 0 === t) ||
          (!(!e || !t) &&
            Gi(e, t, (e, t) =>
              (function (e, t) {
                return (
                  e.field.isEqual(t.field) &&
                  (function (e, t) {
                    return (e instanceof Ta && t instanceof Ta) ||
                      (e instanceof Ca && t instanceof Ca)
                      ? Gi(e.elements, t.elements, io)
                      : e instanceof ka && t instanceof ka
                        ? io(e.Ie, t.Ie)
                        : e instanceof Ia && t instanceof Ia;
                  })(e.transform, t.transform)
                );
              })(e, t),
            ))
        );
      })(e.fieldTransforms, t.fieldTransforms) &&
      (0 === e.type
        ? e.value.isEqual(t.value)
        : 1 !== e.type ||
          (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))
    );
  }
  class ja extends La {
    constructor(e, t, n, r = []) {
      super(),
        (this.key = e),
        (this.value = t),
        (this.precondition = n),
        (this.fieldTransforms = r),
        (this.type = 0);
    }
    getFieldMask() {
      return null;
    }
  }
  class Ba extends La {
    constructor(e, t, n, r, i = []) {
      super(),
        (this.key = e),
        (this.data = t),
        (this.fieldMask = n),
        (this.precondition = r),
        (this.fieldTransforms = i),
        (this.type = 1);
    }
    getFieldMask() {
      return this.fieldMask;
    }
  }
  function $a(e) {
    const t = new Map();
    return (
      e.fieldMask.fields.forEach((n) => {
        if (!n.isEmpty()) {
          const r = e.data.field(n);
          t.set(n, r);
        }
      }),
      t
    );
  }
  function Ha(e, t, n) {
    const r = new Map();
    Ai(e.length === n.length);
    for (let i = 0; i < n.length; i++) {
      const s = e[i],
        o = s.transform,
        a = t.data.field(s.field);
      r.set(s.field, Ea(o, a, n[i]));
    }
    return r;
  }
  function za(e, t, n) {
    const r = new Map();
    for (const i of e) {
      const e = i.transform,
        s = n.data.field(i.field);
      r.set(i.field, _a(e, s, t));
    }
    return r;
  }
  class qa extends La {
    constructor(e, t) {
      super(),
        (this.key = e),
        (this.precondition = t),
        (this.type = 2),
        (this.fieldTransforms = []);
    }
    getFieldMask() {
      return null;
    }
  }
  class Ga extends La {
    constructor(e, t) {
      super(),
        (this.key = e),
        (this.precondition = t),
        (this.type = 3),
        (this.fieldTransforms = []);
    }
    getFieldMask() {
      return null;
    }
  }
  class Ka {
    constructor(e, t, n, r) {
      (this.batchId = e),
        (this.localWriteTime = t),
        (this.baseMutations = n),
        (this.mutations = r);
    }
    applyToRemoteDocument(e, t) {
      const n = t.mutationResults;
      for (let t = 0; t < this.mutations.length; t++) {
        const r = this.mutations[t];
        r.key.isEqual(e.key) && Ma(r, e, n[t]);
      }
    }
    applyToLocalView(e, t) {
      for (const n of this.baseMutations)
        n.key.isEqual(e.key) && (t = Ua(n, e, t, this.localWriteTime));
      for (const n of this.mutations)
        n.key.isEqual(e.key) && (t = Ua(n, e, t, this.localWriteTime));
      return t;
    }
    applyToLocalDocumentSet(e, t) {
      const n = la();
      return (
        this.mutations.forEach((r) => {
          const i = e.get(r.key),
            s = i.overlayedDocument;
          let o = this.applyToLocalView(s, i.mutatedFields);
          o = t.has(r.key) ? null : o;
          const a = xa(s, o);
          null !== a && n.set(r.key, a),
            s.isValidDocument() || s.convertToNoDocument(Xi.min());
        }),
        n
      );
    }
    keys() {
      return this.mutations.reduce((e, t) => e.add(t.key), pa());
    }
    isEqual(e) {
      return (
        this.batchId === e.batchId &&
        Gi(this.mutations, e.mutations, (e, t) => Fa(e, t)) &&
        Gi(this.baseMutations, e.baseMutations, (e, t) => Fa(e, t))
      );
    }
  }
  class Wa {
    constructor(e, t, n, r) {
      (this.batch = e),
        (this.commitVersion = t),
        (this.mutationResults = n),
        (this.docVersions = r);
    }
    static from(e, t, n) {
      Ai(e.mutations.length === n.length);
      let r = da;
      const i = e.mutations;
      for (let e = 0; e < i.length; e++) r = r.insert(i[e].key, n[e].version);
      return new Wa(e, t, n, r);
    }
  }
  class Qa {
    constructor(e, t) {
      (this.largestBatchId = e), (this.mutation = t);
    }
    getKey() {
      return this.mutation.key;
    }
    isEqual(e) {
      return null !== e && this.mutation === e.mutation;
    }
    toString() {
      return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`;
    }
  }
  var Xa, Ja;
  ((Ja = Xa || (Xa = {}))[(Ja.OK = 0)] = "OK"),
    (Ja[(Ja.CANCELLED = 1)] = "CANCELLED"),
    (Ja[(Ja.UNKNOWN = 2)] = "UNKNOWN"),
    (Ja[(Ja.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
    (Ja[(Ja.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
    (Ja[(Ja.NOT_FOUND = 5)] = "NOT_FOUND"),
    (Ja[(Ja.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
    (Ja[(Ja.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
    (Ja[(Ja.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
    (Ja[(Ja.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
    (Ja[(Ja.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
    (Ja[(Ja.ABORTED = 10)] = "ABORTED"),
    (Ja[(Ja.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
    (Ja[(Ja.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
    (Ja[(Ja.INTERNAL = 13)] = "INTERNAL"),
    (Ja[(Ja.UNAVAILABLE = 14)] = "UNAVAILABLE"),
    (Ja[(Ja.DATA_LOSS = 15)] = "DATA_LOSS"),
    new ri([4294967295, 4294967295], 0),
    Error;
  class Ya {
    constructor(e, t) {
      (this.databaseId = e), (this.useProto3Json = t);
    }
  }
  function Za(e, t) {
    return e.useProto3Json
      ? `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`
      : { seconds: "" + t.seconds, nanos: t.nanoseconds };
  }
  function ec(e, t) {
    return e.useProto3Json ? t.toBase64() : t.toUint8Array();
  }
  function tc(e, t) {
    return Za(e, t.toTimestamp());
  }
  function nc(e) {
    return (
      Ai(!!e),
      Xi.fromTimestamp(
        (function (e) {
          const t = Fs(e);
          return new Qi(t.seconds, t.nanos);
        })(e),
      )
    );
  }
  function rc(e, t) {
    return ic(e, t).canonicalString();
  }
  function ic(e, t) {
    const n = (function (e) {
      return new Zi(["projects", e.projectId, "databases", e.database]);
    })(e).child("documents");
    return void 0 === t ? n : n.child(t);
  }
  function sc(e, t) {
    return rc(e.databaseId, t.path);
  }
  function oc(e) {
    const t = (function (e) {
      const t = Zi.fromString(e);
      return (
        Ai(
          (function (e) {
            return (
              e.length >= 4 &&
              "projects" === e.get(0) &&
              "databases" === e.get(2)
            );
          })(t),
        ),
        t
      );
    })(e);
    return 4 === t.length
      ? Zi.emptyPath()
      : (function (e) {
          return Ai(e.length > 4 && "documents" === e.get(4)), e.popFirst(5);
        })(t);
  }
  function ac(e, t, n) {
    return { name: sc(e, t), fields: n.value.mapValue.fields };
  }
  function cc(e) {
    let t = oc(e.parent);
    const n = e.structuredQuery,
      r = n.from ? n.from.length : 0;
    let i = null;
    if (r > 0) {
      Ai(1 === r);
      const e = n.from[0];
      e.allDescendants ? (i = e.collectionId) : (t = t.child(e.collectionId));
    }
    let s = [];
    n.where &&
      (s = (function (e) {
        const t = uc(e);
        return t instanceof No && Oo(t) ? t.getFilters() : [t];
      })(n.where));
    let o = [];
    n.orderBy &&
      (o = (function (e) {
        return e.map((e) =>
          (function (e) {
            return new So(
              lc(e.field),
              (function (e) {
                switch (e) {
                  case "ASCENDING":
                    return "asc";
                  case "DESCENDING":
                    return "desc";
                  default:
                    return;
                }
              })(e.direction),
            );
          })(e),
        );
      })(n.orderBy));
    let a = null;
    n.limit &&
      (a = (function (e) {
        let t;
        return (t = "object" == typeof e ? e.value : e), hs(t) ? null : t;
      })(n.limit));
    let c = null;
    n.startAt &&
      (c = (function (e) {
        const t = !!e.before,
          n = e.values || [];
        return new bo(n, t);
      })(n.startAt));
    let u = null;
    return (
      n.endAt &&
        (u = (function (e) {
          const t = !e.before,
            n = e.values || [];
          return new bo(n, t);
        })(n.endAt)),
      (function (e, t, n, r, i, s, o, a) {
        return new Ko(e, t, n, r, i, s, o, a);
      })(t, i, o, s, a, "F", c, u)
    );
  }
  function uc(e) {
    return void 0 !== e.unaryFilter
      ? (function (e) {
          switch (e.unaryFilter.op) {
            case "IS_NAN":
              const t = lc(e.unaryFilter.field);
              return ko.create(t, "==", { doubleValue: NaN });
            case "IS_NULL":
              const n = lc(e.unaryFilter.field);
              return ko.create(n, "==", { nullValue: "NULL_VALUE" });
            case "IS_NOT_NAN":
              const r = lc(e.unaryFilter.field);
              return ko.create(r, "!=", { doubleValue: NaN });
            case "IS_NOT_NULL":
              const i = lc(e.unaryFilter.field);
              return ko.create(i, "!=", { nullValue: "NULL_VALUE" });
            default:
              return Ci();
          }
        })(e)
      : void 0 !== e.fieldFilter
        ? (function (e) {
            return ko.create(
              lc(e.fieldFilter.field),
              (function (e) {
                switch (e) {
                  case "EQUAL":
                    return "==";
                  case "NOT_EQUAL":
                    return "!=";
                  case "GREATER_THAN":
                    return ">";
                  case "GREATER_THAN_OR_EQUAL":
                    return ">=";
                  case "LESS_THAN":
                    return "<";
                  case "LESS_THAN_OR_EQUAL":
                    return "<=";
                  case "ARRAY_CONTAINS":
                    return "array-contains";
                  case "IN":
                    return "in";
                  case "NOT_IN":
                    return "not-in";
                  case "ARRAY_CONTAINS_ANY":
                    return "array-contains-any";
                  default:
                    return Ci();
                }
              })(e.fieldFilter.op),
              e.fieldFilter.value,
            );
          })(e)
        : void 0 !== e.compositeFilter
          ? (function (e) {
              return No.create(
                e.compositeFilter.filters.map((e) => uc(e)),
                (function (e) {
                  switch (e) {
                    case "AND":
                      return "and";
                    case "OR":
                      return "or";
                    default:
                      return Ci();
                  }
                })(e.compositeFilter.op),
              );
            })(e)
          : Ci();
  }
  function lc(e) {
    return ts.fromServerFormat(e.fieldPath);
  }
  function hc(e) {
    const t = [];
    return (
      e.fields.forEach((e) => t.push(e.canonicalString())), { fieldPaths: t }
    );
  }
  class dc {
    constructor(e) {
      this.Tt = e;
    }
  }
  function fc(e) {
    const t = cc({ parent: e.parent, structuredQuery: e.structuredQuery });
    return "LAST" === e.limitType ? Jo(t, t.limit, "L") : t;
  }
  class pc {
    constructor() {}
    At(e, t) {
      this.Rt(e, t), t.Vt();
    }
    Rt(e, t) {
      if ("nullValue" in e) this.ft(t, 5);
      else if ("booleanValue" in e)
        this.ft(t, 10), t.gt(e.booleanValue ? 1 : 0);
      else if ("integerValue" in e) this.ft(t, 15), t.gt(js(e.integerValue));
      else if ("doubleValue" in e) {
        const n = js(e.doubleValue);
        isNaN(n) ? this.ft(t, 13) : (this.ft(t, 15), ds(n) ? t.gt(0) : t.gt(n));
      } else if ("timestampValue" in e) {
        let n = e.timestampValue;
        this.ft(t, 20),
          "string" == typeof n && (n = Fs(n)),
          t.yt(`${n.seconds || ""}`),
          t.gt(n.nanos || 0);
      } else if ("stringValue" in e) this.wt(e.stringValue, t), this.St(t);
      else if ("bytesValue" in e)
        this.ft(t, 30), t.bt(Bs(e.bytesValue)), this.St(t);
      else if ("referenceValue" in e) this.Dt(e.referenceValue, t);
      else if ("geoPointValue" in e) {
        const n = e.geoPointValue;
        this.ft(t, 45), t.gt(n.latitude || 0), t.gt(n.longitude || 0);
      } else
        "mapValue" in e
          ? vo(e)
            ? this.ft(t, Number.MAX_SAFE_INTEGER)
            : mo(e)
              ? this.vt(e.mapValue, t)
              : (this.Ct(e.mapValue, t), this.St(t))
          : "arrayValue" in e
            ? (this.Ft(e.arrayValue, t), this.St(t))
            : Ci();
    }
    wt(e, t) {
      this.ft(t, 25), this.Mt(e, t);
    }
    Mt(e, t) {
      t.yt(e);
    }
    Ct(e, t) {
      const n = e.fields || {};
      this.ft(t, 55);
      for (const e of Object.keys(n)) this.wt(e, t), this.Rt(n[e], t);
    }
    vt(e, t) {
      var n, r;
      const i = e.fields || {};
      this.ft(t, 53);
      const s = no,
        o =
          (null ===
            (r =
              null === (n = i[s].arrayValue) || void 0 === n
                ? void 0
                : n.values) || void 0 === r
            ? void 0
            : r.length) || 0;
      this.ft(t, 15), t.gt(js(o)), this.wt(s, t), this.Rt(i[s], t);
    }
    Ft(e, t) {
      const n = e.values || [];
      this.ft(t, 50);
      for (const e of n) this.Rt(e, t);
    }
    Dt(e, t) {
      this.ft(t, 37),
        ns.fromName(e).path.forEach((e) => {
          this.ft(t, 60), this.Mt(e, t);
        });
    }
    ft(e, t) {
      e.gt(t);
    }
    St(e) {
      e.gt(2);
    }
  }
  pc.xt = new pc();
  class gc {
    constructor() {
      this.Tn = new mc();
    }
    addToCollectionParentIndex(e, t) {
      return this.Tn.add(t), cs.resolve();
    }
    getCollectionParents(e, t) {
      return cs.resolve(this.Tn.getEntries(t));
    }
    addFieldIndex(e, t) {
      return cs.resolve();
    }
    deleteFieldIndex(e, t) {
      return cs.resolve();
    }
    deleteAllFieldIndexes(e) {
      return cs.resolve();
    }
    createTargetIndexes(e, t) {
      return cs.resolve();
    }
    getDocumentsMatchingTarget(e, t) {
      return cs.resolve(null);
    }
    getIndexType(e, t) {
      return cs.resolve(0);
    }
    getFieldIndexes(e, t) {
      return cs.resolve([]);
    }
    getNextCollectionGroupToUpdate(e) {
      return cs.resolve(null);
    }
    getMinOffset(e, t) {
      return cs.resolve(is.min());
    }
    getMinOffsetFromCollectionGroup(e, t) {
      return cs.resolve(is.min());
    }
    updateCollectionGroup(e, t, n) {
      return cs.resolve();
    }
    updateIndexEntries(e, t) {
      return cs.resolve();
    }
  }
  class mc {
    constructor() {
      this.index = {};
    }
    add(e) {
      const t = e.lastSegment(),
        n = e.popLast(),
        r = this.index[t] || new Ds(Zi.comparator),
        i = !r.has(n);
      return (this.index[t] = r.add(n)), i;
    }
    has(e) {
      const t = e.lastSegment(),
        n = e.popLast(),
        r = this.index[t];
      return r && r.has(n);
    }
    getEntries(e) {
      return (this.index[e] || new Ds(Zi.comparator)).toArray();
    }
  }
  new Uint8Array(0);
  const yc = {
      didRun: !1,
      sequenceNumbersCollected: 0,
      targetsRemoved: 0,
      documentsRemoved: 0,
    },
    vc = 41943040;
  class wc {
    static withCacheSize(e) {
      return new wc(
        e,
        wc.DEFAULT_COLLECTION_PERCENTILE,
        wc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT,
      );
    }
    constructor(e, t, n) {
      (this.cacheSizeCollectionThreshold = e),
        (this.percentileToCollect = t),
        (this.maximumSequenceNumbersToCollect = n);
    }
  }
  (wc.DEFAULT_COLLECTION_PERCENTILE = 10),
    (wc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
    (wc.DEFAULT = new wc(
      vc,
      wc.DEFAULT_COLLECTION_PERCENTILE,
      wc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT,
    )),
    (wc.DISABLED = new wc(-1, 0, 0));
  class _c {
    constructor(e) {
      this.$n = e;
    }
    next() {
      return (this.$n += 2), this.$n;
    }
    static Un() {
      return new _c(0);
    }
    static Kn() {
      return new _c(-1);
    }
  }
  const Ec = "LruGarbageCollector";
  function bc([e, t], [n, r]) {
    const i = $i(e, n);
    return 0 === i ? $i(t, r) : i;
  }
  class Ic {
    constructor(e) {
      (this.Hn = e), (this.buffer = new Ds(bc)), (this.Jn = 0);
    }
    Yn() {
      return ++this.Jn;
    }
    Zn(e) {
      const t = [e, this.Yn()];
      if (this.buffer.size < this.Hn) this.buffer = this.buffer.add(t);
      else {
        const e = this.buffer.last();
        bc(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t));
      }
    }
    get maxValue() {
      return this.buffer.last()[0];
    }
  }
  class Tc {
    constructor(e, t, n) {
      (this.garbageCollector = e),
        (this.asyncQueue = t),
        (this.localStore = n),
        (this.Xn = null);
    }
    start() {
      -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold &&
        this.er(6e4);
    }
    stop() {
      this.Xn && (this.Xn.cancel(), (this.Xn = null));
    }
    get started() {
      return null !== this.Xn;
    }
    er(e) {
      bi(Ec, `Garbage collection scheduled in ${e}ms`),
        (this.Xn = this.asyncQueue.enqueueAfterDelay(
          "lru_garbage_collection",
          e,
          async () => {
            this.Xn = null;
            try {
              await this.localStore.collectGarbage(this.garbageCollector);
            } catch (e) {
              us(e)
                ? bi(
                    Ec,
                    "Ignoring IndexedDB error during garbage collection: ",
                    e,
                  )
                : await as(e);
            }
            await this.er(3e5);
          },
        ));
    }
  }
  class Sc {
    constructor(e, t) {
      (this.tr = e), (this.params = t);
    }
    calculateTargetCount(e, t) {
      return this.tr.nr(e).next((e) => Math.floor((t / 100) * e));
    }
    nthSequenceNumber(e, t) {
      if (0 === t) return cs.resolve(ls.ae);
      const n = new Ic(t);
      return this.tr
        .forEachTarget(e, (e) => n.Zn(e.sequenceNumber))
        .next(() => this.tr.rr(e, (e) => n.Zn(e)))
        .next(() => n.maxValue);
    }
    removeTargets(e, t, n) {
      return this.tr.removeTargets(e, t, n);
    }
    removeOrphanedDocuments(e, t) {
      return this.tr.removeOrphanedDocuments(e, t);
    }
    collect(e, t) {
      return -1 === this.params.cacheSizeCollectionThreshold
        ? (bi("LruGarbageCollector", "Garbage collection skipped; disabled"),
          cs.resolve(yc))
        : this.getCacheSize(e).next((n) =>
            n < this.params.cacheSizeCollectionThreshold
              ? (bi(
                  "LruGarbageCollector",
                  `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`,
                ),
                yc)
              : this.ir(e, t),
          );
    }
    getCacheSize(e) {
      return this.tr.getCacheSize(e);
    }
    ir(e, t) {
      let n, r, i, s, o, a, c;
      const u = Date.now();
      return this.calculateTargetCount(e, this.params.percentileToCollect)
        .next(
          (t) => (
            t > this.params.maximumSequenceNumbersToCollect
              ? (bi(
                  "LruGarbageCollector",
                  `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`,
                ),
                (r = this.params.maximumSequenceNumbersToCollect))
              : (r = t),
            (s = Date.now()),
            this.nthSequenceNumber(e, r)
          ),
        )
        .next((r) => ((n = r), (o = Date.now()), this.removeTargets(e, n, t)))
        .next(
          (t) => (
            (i = t), (a = Date.now()), this.removeOrphanedDocuments(e, n)
          ),
        )
        .next(
          (e) => (
            (c = Date.now()),
            Ei() <= k.DEBUG &&
              bi(
                "LruGarbageCollector",
                `LRU Garbage Collection\n\tCounted targets in ${s - u}ms\n\tDetermined least recently used ${r} in ` +
                  (o - s) +
                  "ms\n" +
                  `\tRemoved ${i} targets in ` +
                  (a - o) +
                  "ms\n" +
                  `\tRemoved ${e} documents in ` +
                  (c - a) +
                  "ms\n" +
                  `Total Duration: ${c - u}ms`,
              ),
            cs.resolve({
              didRun: !0,
              sequenceNumbersCollected: r,
              targetsRemoved: i,
              documentsRemoved: e,
            })
          ),
        );
    }
  }
  class Cc {
    constructor() {
      (this.changes = new ra(
        (e) => e.toString(),
        (e, t) => e.isEqual(t),
      )),
        (this.changesApplied = !1);
    }
    addEntry(e) {
      this.assertNotApplied(), this.changes.set(e.key, e);
    }
    removeEntry(e, t) {
      this.assertNotApplied(),
        this.changes.set(e, Eo.newInvalidDocument(e).setReadTime(t));
    }
    getEntry(e, t) {
      this.assertNotApplied();
      const n = this.changes.get(t);
      return void 0 !== n ? cs.resolve(n) : this.getFromCache(e, t);
    }
    getEntries(e, t) {
      return this.getAllFromCache(e, t);
    }
    apply(e) {
      return (
        this.assertNotApplied(),
        (this.changesApplied = !0),
        this.applyChanges(e)
      );
    }
    assertNotApplied() {}
  }
  class Ac {
    constructor(e, t) {
      (this.overlayedDocument = e), (this.mutatedFields = t);
    }
  }
  class kc {
    constructor(e, t, n, r) {
      (this.remoteDocumentCache = e),
        (this.mutationQueue = t),
        (this.documentOverlayCache = n),
        (this.indexManager = r);
    }
    getDocument(e, t) {
      let n = null;
      return this.documentOverlayCache
        .getOverlay(e, t)
        .next((r) => ((n = r), this.remoteDocumentCache.getEntry(e, t)))
        .next(
          (e) => (null !== n && Ua(n.mutation, e, xs.empty(), Qi.now()), e),
        );
    }
    getDocuments(e, t) {
      return this.remoteDocumentCache
        .getEntries(e, t)
        .next((t) => this.getLocalViewOfDocuments(e, t, pa()).next(() => t));
    }
    getLocalViewOfDocuments(e, t, n = pa()) {
      const r = ua();
      return this.populateOverlays(e, r, t).next(() =>
        this.computeViews(e, t, r, n).next((e) => {
          let t = aa();
          return (
            e.forEach((e, n) => {
              t = t.insert(e, n.overlayedDocument);
            }),
            t
          );
        }),
      );
    }
    getOverlayedDocuments(e, t) {
      const n = ua();
      return this.populateOverlays(e, n, t).next(() =>
        this.computeViews(e, t, n, pa()),
      );
    }
    populateOverlays(e, t, n) {
      const r = [];
      return (
        n.forEach((e) => {
          t.has(e) || r.push(e);
        }),
        this.documentOverlayCache.getOverlays(e, r).next((e) => {
          e.forEach((e, n) => {
            t.set(e, n);
          });
        })
      );
    }
    computeViews(e, t, n, r) {
      let i = sa();
      const s = ha(),
        o = ha();
      return (
        t.forEach((e, t) => {
          const o = n.get(t.key);
          r.has(t.key) && (void 0 === o || o.mutation instanceof Ba)
            ? (i = i.insert(t.key, t))
            : void 0 !== o
              ? (s.set(t.key, o.mutation.getFieldMask()),
                Ua(o.mutation, t, o.mutation.getFieldMask(), Qi.now()))
              : s.set(t.key, xs.empty());
        }),
        this.recalculateAndSaveOverlays(e, i).next(
          (e) => (
            e.forEach((e, t) => s.set(e, t)),
            t.forEach((e, t) => {
              var n;
              return o.set(
                e,
                new Ac(t, null !== (n = s.get(e)) && void 0 !== n ? n : null),
              );
            }),
            o
          ),
        )
      );
    }
    recalculateAndSaveOverlays(e, t) {
      const n = ha();
      let r = new Rs((e, t) => e - t),
        i = pa();
      return this.mutationQueue
        .getAllMutationBatchesAffectingDocumentKeys(e, t)
        .next((e) => {
          for (const i of e)
            i.keys().forEach((e) => {
              const s = t.get(e);
              if (null === s) return;
              let o = n.get(e) || xs.empty();
              (o = i.applyToLocalView(s, o)), n.set(e, o);
              const a = (r.get(i.batchId) || pa()).add(e);
              r = r.insert(i.batchId, a);
            });
        })
        .next(() => {
          const s = [],
            o = r.getReverseIterator();
          for (; o.hasNext(); ) {
            const r = o.getNext(),
              a = r.key,
              c = r.value,
              u = la();
            c.forEach((e) => {
              if (!i.has(e)) {
                const r = xa(t.get(e), n.get(e));
                null !== r && u.set(e, r), (i = i.add(e));
              }
            }),
              s.push(this.documentOverlayCache.saveOverlays(e, a, u));
          }
          return cs.waitFor(s);
        })
        .next(() => n);
    }
    recalculateAndSaveOverlaysForDocumentKeys(e, t) {
      return this.remoteDocumentCache
        .getEntries(e, t)
        .next((t) => this.recalculateAndSaveOverlays(e, t));
    }
    getDocumentsMatchingQuery(e, t, n, r) {
      return (function (e) {
        return (
          ns.isDocumentKey(e.path) &&
          null === e.collectionGroup &&
          0 === e.filters.length
        );
      })(t)
        ? this.getDocumentsMatchingDocumentQuery(e, t.path)
        : (function (e) {
              return null !== e.collectionGroup;
            })(t)
          ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, r)
          : this.getDocumentsMatchingCollectionQuery(e, t, n, r);
    }
    getNextDocuments(e, t, n, r) {
      return this.remoteDocumentCache
        .getAllFromCollectionGroup(e, t, n, r)
        .next((i) => {
          const s =
            r - i.size > 0
              ? this.documentOverlayCache.getOverlaysForCollectionGroup(
                  e,
                  t,
                  n.largestBatchId,
                  r - i.size,
                )
              : cs.resolve(ua());
          let o = -1,
            a = i;
          return s.next((t) =>
            cs
              .forEach(
                t,
                (t, n) => (
                  o < n.largestBatchId && (o = n.largestBatchId),
                  i.get(t)
                    ? cs.resolve()
                    : this.remoteDocumentCache.getEntry(e, t).next((e) => {
                        a = a.insert(t, e);
                      })
                ),
              )
              .next(() => this.populateOverlays(e, t, i))
              .next(() => this.computeViews(e, a, t, pa()))
              .next((e) => ({ batchId: o, changes: ca(e) })),
          );
        });
    }
    getDocumentsMatchingDocumentQuery(e, t) {
      return this.getDocument(e, new ns(t)).next((e) => {
        let t = aa();
        return e.isFoundDocument() && (t = t.insert(e.key, e)), t;
      });
    }
    getDocumentsMatchingCollectionGroupQuery(e, t, n, r) {
      const i = t.collectionGroup;
      let s = aa();
      return this.indexManager.getCollectionParents(e, i).next((o) =>
        cs
          .forEach(o, (o) => {
            const a = (function (e, t) {
              return new Ko(
                t,
                null,
                e.explicitOrderBy.slice(),
                e.filters.slice(),
                e.limit,
                e.limitType,
                e.startAt,
                e.endAt,
              );
            })(t, o.child(i));
            return this.getDocumentsMatchingCollectionQuery(e, a, n, r).next(
              (e) => {
                e.forEach((e, t) => {
                  s = s.insert(e, t);
                });
              },
            );
          })
          .next(() => s),
      );
    }
    getDocumentsMatchingCollectionQuery(e, t, n, r) {
      let i;
      return this.documentOverlayCache
        .getOverlaysForCollection(e, t.path, n.largestBatchId)
        .next(
          (s) => (
            (i = s),
            this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, r)
          ),
        )
        .next((e) => {
          i.forEach((t, n) => {
            const r = n.getKey();
            null === e.get(r) && (e = e.insert(r, Eo.newInvalidDocument(r)));
          });
          let n = aa();
          return (
            e.forEach((e, r) => {
              const s = i.get(e);
              void 0 !== s && Ua(s.mutation, r, xs.empty(), Qi.now()),
                ta(t, r) && (n = n.insert(e, r));
            }),
            n
          );
        });
    }
  }
  class Nc {
    constructor(e) {
      (this.serializer = e), (this.dr = new Map()), (this.Ar = new Map());
    }
    getBundleMetadata(e, t) {
      return cs.resolve(this.dr.get(t));
    }
    saveBundleMetadata(e, t) {
      return (
        this.dr.set(
          t.id,
          (function (e) {
            return {
              id: e.id,
              version: e.version,
              createTime: nc(e.createTime),
            };
          })(t),
        ),
        cs.resolve()
      );
    }
    getNamedQuery(e, t) {
      return cs.resolve(this.Ar.get(t));
    }
    saveNamedQuery(e, t) {
      return (
        this.Ar.set(
          t.name,
          (function (e) {
            return {
              name: e.name,
              query: fc(e.bundledQuery),
              readTime: nc(e.readTime),
            };
          })(t),
        ),
        cs.resolve()
      );
    }
  }
  class Rc {
    constructor() {
      (this.overlays = new Rs(ns.comparator)), (this.Rr = new Map());
    }
    getOverlay(e, t) {
      return cs.resolve(this.overlays.get(t));
    }
    getOverlays(e, t) {
      const n = ua();
      return cs
        .forEach(t, (t) =>
          this.getOverlay(e, t).next((e) => {
            null !== e && n.set(t, e);
          }),
        )
        .next(() => n);
    }
    saveOverlays(e, t, n) {
      return (
        n.forEach((n, r) => {
          this.Et(e, t, r);
        }),
        cs.resolve()
      );
    }
    removeOverlaysForBatchId(e, t, n) {
      const r = this.Rr.get(n);
      return (
        void 0 !== r &&
          (r.forEach((e) => (this.overlays = this.overlays.remove(e))),
          this.Rr.delete(n)),
        cs.resolve()
      );
    }
    getOverlaysForCollection(e, t, n) {
      const r = ua(),
        i = t.length + 1,
        s = new ns(t.child("")),
        o = this.overlays.getIteratorFrom(s);
      for (; o.hasNext(); ) {
        const e = o.getNext().value,
          s = e.getKey();
        if (!t.isPrefixOf(s.path)) break;
        s.path.length === i && e.largestBatchId > n && r.set(e.getKey(), e);
      }
      return cs.resolve(r);
    }
    getOverlaysForCollectionGroup(e, t, n, r) {
      let i = new Rs((e, t) => e - t);
      const s = this.overlays.getIterator();
      for (; s.hasNext(); ) {
        const e = s.getNext().value;
        if (e.getKey().getCollectionGroup() === t && e.largestBatchId > n) {
          let t = i.get(e.largestBatchId);
          null === t && ((t = ua()), (i = i.insert(e.largestBatchId, t))),
            t.set(e.getKey(), e);
        }
      }
      const o = ua(),
        a = i.getIterator();
      for (
        ;
        a.hasNext() &&
        (a.getNext().value.forEach((e, t) => o.set(e, t)), !(o.size() >= r));

      );
      return cs.resolve(o);
    }
    Et(e, t, n) {
      const r = this.overlays.get(n.key);
      if (null !== r) {
        const e = this.Rr.get(r.largestBatchId).delete(n.key);
        this.Rr.set(r.largestBatchId, e);
      }
      this.overlays = this.overlays.insert(n.key, new Qa(t, n));
      let i = this.Rr.get(t);
      void 0 === i && ((i = pa()), this.Rr.set(t, i)),
        this.Rr.set(t, i.add(n.key));
    }
  }
  class Oc {
    constructor() {
      this.sessionToken = Us.EMPTY_BYTE_STRING;
    }
    getSessionToken(e) {
      return cs.resolve(this.sessionToken);
    }
    setSessionToken(e, t) {
      return (this.sessionToken = t), cs.resolve();
    }
  }
  class Pc {
    constructor() {
      (this.Vr = new Ds(Dc.mr)), (this.gr = new Ds(Dc.pr));
    }
    isEmpty() {
      return this.Vr.isEmpty();
    }
    addReference(e, t) {
      const n = new Dc(e, t);
      (this.Vr = this.Vr.add(n)), (this.gr = this.gr.add(n));
    }
    yr(e, t) {
      e.forEach((e) => this.addReference(e, t));
    }
    removeReference(e, t) {
      this.wr(new Dc(e, t));
    }
    Sr(e, t) {
      e.forEach((e) => this.removeReference(e, t));
    }
    br(e) {
      const t = new ns(new Zi([])),
        n = new Dc(t, e),
        r = new Dc(t, e + 1),
        i = [];
      return (
        this.gr.forEachInRange([n, r], (e) => {
          this.wr(e), i.push(e.key);
        }),
        i
      );
    }
    Dr() {
      this.Vr.forEach((e) => this.wr(e));
    }
    wr(e) {
      (this.Vr = this.Vr.delete(e)), (this.gr = this.gr.delete(e));
    }
    vr(e) {
      const t = new ns(new Zi([])),
        n = new Dc(t, e),
        r = new Dc(t, e + 1);
      let i = pa();
      return (
        this.gr.forEachInRange([n, r], (e) => {
          i = i.add(e.key);
        }),
        i
      );
    }
    containsKey(e) {
      const t = new Dc(e, 0),
        n = this.Vr.firstAfterOrEqual(t);
      return null !== n && e.isEqual(n.key);
    }
  }
  class Dc {
    constructor(e, t) {
      (this.key = e), (this.Cr = t);
    }
    static mr(e, t) {
      return ns.comparator(e.key, t.key) || $i(e.Cr, t.Cr);
    }
    static pr(e, t) {
      return $i(e.Cr, t.Cr) || ns.comparator(e.key, t.key);
    }
  }
  class Lc {
    constructor(e, t) {
      (this.indexManager = e),
        (this.referenceDelegate = t),
        (this.mutationQueue = []),
        (this.Fr = 1),
        (this.Mr = new Ds(Dc.mr));
    }
    checkEmpty(e) {
      return cs.resolve(0 === this.mutationQueue.length);
    }
    addMutationBatch(e, t, n, r) {
      const i = this.Fr;
      this.Fr++,
        this.mutationQueue.length > 0 &&
          this.mutationQueue[this.mutationQueue.length - 1];
      const s = new Ka(i, t, n, r);
      this.mutationQueue.push(s);
      for (const t of r)
        (this.Mr = this.Mr.add(new Dc(t.key, i))),
          this.indexManager.addToCollectionParentIndex(e, t.key.path.popLast());
      return cs.resolve(s);
    }
    lookupMutationBatch(e, t) {
      return cs.resolve(this.Or(t));
    }
    getNextMutationBatchAfterBatchId(e, t) {
      const n = t + 1,
        r = this.Nr(n),
        i = r < 0 ? 0 : r;
      return cs.resolve(
        this.mutationQueue.length > i ? this.mutationQueue[i] : null,
      );
    }
    getHighestUnacknowledgedBatchId() {
      return cs.resolve(0 === this.mutationQueue.length ? -1 : this.Fr - 1);
    }
    getAllMutationBatches(e) {
      return cs.resolve(this.mutationQueue.slice());
    }
    getAllMutationBatchesAffectingDocumentKey(e, t) {
      const n = new Dc(t, 0),
        r = new Dc(t, Number.POSITIVE_INFINITY),
        i = [];
      return (
        this.Mr.forEachInRange([n, r], (e) => {
          const t = this.Or(e.Cr);
          i.push(t);
        }),
        cs.resolve(i)
      );
    }
    getAllMutationBatchesAffectingDocumentKeys(e, t) {
      let n = new Ds($i);
      return (
        t.forEach((e) => {
          const t = new Dc(e, 0),
            r = new Dc(e, Number.POSITIVE_INFINITY);
          this.Mr.forEachInRange([t, r], (e) => {
            n = n.add(e.Cr);
          });
        }),
        cs.resolve(this.Br(n))
      );
    }
    getAllMutationBatchesAffectingQuery(e, t) {
      const n = t.path,
        r = n.length + 1;
      let i = n;
      ns.isDocumentKey(i) || (i = i.child(""));
      const s = new Dc(new ns(i), 0);
      let o = new Ds($i);
      return (
        this.Mr.forEachWhile((e) => {
          const t = e.key.path;
          return !!n.isPrefixOf(t) && (t.length === r && (o = o.add(e.Cr)), !0);
        }, s),
        cs.resolve(this.Br(o))
      );
    }
    Br(e) {
      const t = [];
      return (
        e.forEach((e) => {
          const n = this.Or(e);
          null !== n && t.push(n);
        }),
        t
      );
    }
    removeMutationBatch(e, t) {
      Ai(0 === this.Lr(t.batchId, "removed")), this.mutationQueue.shift();
      let n = this.Mr;
      return cs
        .forEach(t.mutations, (r) => {
          const i = new Dc(r.key, t.batchId);
          return (
            (n = n.delete(i)),
            this.referenceDelegate.markPotentiallyOrphaned(e, r.key)
          );
        })
        .next(() => {
          this.Mr = n;
        });
    }
    qn(e) {}
    containsKey(e, t) {
      const n = new Dc(t, 0),
        r = this.Mr.firstAfterOrEqual(n);
      return cs.resolve(t.isEqual(r && r.key));
    }
    performConsistencyCheck(e) {
      return this.mutationQueue.length, cs.resolve();
    }
    Lr(e, t) {
      return this.Nr(e);
    }
    Nr(e) {
      return 0 === this.mutationQueue.length
        ? 0
        : e - this.mutationQueue[0].batchId;
    }
    Or(e) {
      const t = this.Nr(e);
      return t < 0 || t >= this.mutationQueue.length
        ? null
        : this.mutationQueue[t];
    }
  }
  class xc {
    constructor(e) {
      (this.kr = e), (this.docs = new Rs(ns.comparator)), (this.size = 0);
    }
    setIndexManager(e) {
      this.indexManager = e;
    }
    addEntry(e, t) {
      const n = t.key,
        r = this.docs.get(n),
        i = r ? r.size : 0,
        s = this.kr(t);
      return (
        (this.docs = this.docs.insert(n, {
          document: t.mutableCopy(),
          size: s,
        })),
        (this.size += s - i),
        this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
      );
    }
    removeEntry(e) {
      const t = this.docs.get(e);
      t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
    }
    getEntry(e, t) {
      const n = this.docs.get(t);
      return cs.resolve(
        n ? n.document.mutableCopy() : Eo.newInvalidDocument(t),
      );
    }
    getEntries(e, t) {
      let n = sa();
      return (
        t.forEach((e) => {
          const t = this.docs.get(e);
          n = n.insert(
            e,
            t ? t.document.mutableCopy() : Eo.newInvalidDocument(e),
          );
        }),
        cs.resolve(n)
      );
    }
    getDocumentsMatchingQuery(e, t, n, r) {
      let i = sa();
      const s = t.path,
        o = new ns(s.child("__id-9223372036854775808__")),
        a = this.docs.getIteratorFrom(o);
      for (; a.hasNext(); ) {
        const {
          key: e,
          value: { document: o },
        } = a.getNext();
        if (!s.isPrefixOf(e.path)) break;
        e.path.length > s.length + 1 ||
          ss(rs(o), n) <= 0 ||
          ((r.has(o.key) || ta(t, o)) &&
            (i = i.insert(o.key, o.mutableCopy())));
      }
      return cs.resolve(i);
    }
    getAllFromCollectionGroup(e, t, n, r) {
      Ci();
    }
    qr(e, t) {
      return cs.forEach(this.docs, (e) => t(e));
    }
    newChangeBuffer(e) {
      return new Mc(this);
    }
    getSize(e) {
      return cs.resolve(this.size);
    }
  }
  class Mc extends Cc {
    constructor(e) {
      super(), (this.Ir = e);
    }
    applyChanges(e) {
      const t = [];
      return (
        this.changes.forEach((n, r) => {
          r.isValidDocument()
            ? t.push(this.Ir.addEntry(e, r))
            : this.Ir.removeEntry(n);
        }),
        cs.waitFor(t)
      );
    }
    getFromCache(e, t) {
      return this.Ir.getEntry(e, t);
    }
    getAllFromCache(e, t) {
      return this.Ir.getEntries(e, t);
    }
  }
  class Uc {
    constructor(e) {
      (this.persistence = e),
        (this.Qr = new ra((e) => qo(e), Go)),
        (this.lastRemoteSnapshotVersion = Xi.min()),
        (this.highestTargetId = 0),
        (this.$r = 0),
        (this.Ur = new Pc()),
        (this.targetCount = 0),
        (this.Kr = _c.Un());
    }
    forEachTarget(e, t) {
      return this.Qr.forEach((e, n) => t(n)), cs.resolve();
    }
    getLastRemoteSnapshotVersion(e) {
      return cs.resolve(this.lastRemoteSnapshotVersion);
    }
    getHighestSequenceNumber(e) {
      return cs.resolve(this.$r);
    }
    allocateTargetId(e) {
      return (
        (this.highestTargetId = this.Kr.next()),
        cs.resolve(this.highestTargetId)
      );
    }
    setTargetsMetadata(e, t, n) {
      return (
        n && (this.lastRemoteSnapshotVersion = n),
        t > this.$r && (this.$r = t),
        cs.resolve()
      );
    }
    zn(e) {
      this.Qr.set(e.target, e);
      const t = e.targetId;
      t > this.highestTargetId &&
        ((this.Kr = new _c(t)), (this.highestTargetId = t)),
        e.sequenceNumber > this.$r && (this.$r = e.sequenceNumber);
    }
    addTargetData(e, t) {
      return this.zn(t), (this.targetCount += 1), cs.resolve();
    }
    updateTargetData(e, t) {
      return this.zn(t), cs.resolve();
    }
    removeTargetData(e, t) {
      return (
        this.Qr.delete(t.target),
        this.Ur.br(t.targetId),
        (this.targetCount -= 1),
        cs.resolve()
      );
    }
    removeTargets(e, t, n) {
      let r = 0;
      const i = [];
      return (
        this.Qr.forEach((s, o) => {
          o.sequenceNumber <= t &&
            null === n.get(o.targetId) &&
            (this.Qr.delete(s),
            i.push(this.removeMatchingKeysForTargetId(e, o.targetId)),
            r++);
        }),
        cs.waitFor(i).next(() => r)
      );
    }
    getTargetCount(e) {
      return cs.resolve(this.targetCount);
    }
    getTargetData(e, t) {
      const n = this.Qr.get(t) || null;
      return cs.resolve(n);
    }
    addMatchingKeys(e, t, n) {
      return this.Ur.yr(t, n), cs.resolve();
    }
    removeMatchingKeys(e, t, n) {
      this.Ur.Sr(t, n);
      const r = this.persistence.referenceDelegate,
        i = [];
      return (
        r &&
          t.forEach((t) => {
            i.push(r.markPotentiallyOrphaned(e, t));
          }),
        cs.waitFor(i)
      );
    }
    removeMatchingKeysForTargetId(e, t) {
      return this.Ur.br(t), cs.resolve();
    }
    getMatchingKeysForTargetId(e, t) {
      const n = this.Ur.vr(t);
      return cs.resolve(n);
    }
    containsKey(e, t) {
      return cs.resolve(this.Ur.containsKey(t));
    }
  }
  class Vc {
    constructor(e, t) {
      (this.Wr = {}),
        (this.overlays = {}),
        (this.Gr = new ls(0)),
        (this.zr = !1),
        (this.zr = !0),
        (this.jr = new Oc()),
        (this.referenceDelegate = e(this)),
        (this.Hr = new Uc(this)),
        (this.indexManager = new gc()),
        (this.remoteDocumentCache = (function (e) {
          return new xc(e);
        })((e) => this.referenceDelegate.Jr(e))),
        (this.serializer = new dc(t)),
        (this.Yr = new Nc(this.serializer));
    }
    start() {
      return Promise.resolve();
    }
    shutdown() {
      return (this.zr = !1), Promise.resolve();
    }
    get started() {
      return this.zr;
    }
    setDatabaseDeletedListener() {}
    setNetworkEnabled() {}
    getIndexManager(e) {
      return this.indexManager;
    }
    getDocumentOverlayCache(e) {
      let t = this.overlays[e.toKey()];
      return t || ((t = new Rc()), (this.overlays[e.toKey()] = t)), t;
    }
    getMutationQueue(e, t) {
      let n = this.Wr[e.toKey()];
      return (
        n ||
          ((n = new Lc(t, this.referenceDelegate)), (this.Wr[e.toKey()] = n)),
        n
      );
    }
    getGlobalsCache() {
      return this.jr;
    }
    getTargetCache() {
      return this.Hr;
    }
    getRemoteDocumentCache() {
      return this.remoteDocumentCache;
    }
    getBundleCache() {
      return this.Yr;
    }
    runTransaction(e, t, n) {
      bi("MemoryPersistence", "Starting transaction:", e);
      const r = new Fc(this.Gr.next());
      return (
        this.referenceDelegate.Zr(),
        n(r)
          .next((e) => this.referenceDelegate.Xr(r).next(() => e))
          .toPromise()
          .then((e) => (r.raiseOnCommittedEvent(), e))
      );
    }
    ei(e, t) {
      return cs.or(
        Object.values(this.Wr).map((n) => () => n.containsKey(e, t)),
      );
    }
  }
  class Fc extends os {
    constructor(e) {
      super(), (this.currentSequenceNumber = e);
    }
  }
  class jc {
    constructor(e) {
      (this.persistence = e), (this.ti = new Pc()), (this.ni = null);
    }
    static ri(e) {
      return new jc(e);
    }
    get ii() {
      if (this.ni) return this.ni;
      throw Ci();
    }
    addReference(e, t, n) {
      return (
        this.ti.addReference(n, t), this.ii.delete(n.toString()), cs.resolve()
      );
    }
    removeReference(e, t, n) {
      return (
        this.ti.removeReference(n, t), this.ii.add(n.toString()), cs.resolve()
      );
    }
    markPotentiallyOrphaned(e, t) {
      return this.ii.add(t.toString()), cs.resolve();
    }
    removeTarget(e, t) {
      this.ti.br(t.targetId).forEach((e) => this.ii.add(e.toString()));
      const n = this.persistence.getTargetCache();
      return n
        .getMatchingKeysForTargetId(e, t.targetId)
        .next((e) => {
          e.forEach((e) => this.ii.add(e.toString()));
        })
        .next(() => n.removeTargetData(e, t));
    }
    Zr() {
      this.ni = new Set();
    }
    Xr(e) {
      const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
      return cs
        .forEach(this.ii, (n) => {
          const r = ns.fromPath(n);
          return this.si(e, r).next((e) => {
            e || t.removeEntry(r, Xi.min());
          });
        })
        .next(() => ((this.ni = null), t.apply(e)));
    }
    updateLimboDocument(e, t) {
      return this.si(e, t).next((e) => {
        e ? this.ii.delete(t.toString()) : this.ii.add(t.toString());
      });
    }
    Jr(e) {
      return 0;
    }
    si(e, t) {
      return cs.or([
        () => cs.resolve(this.ti.containsKey(t)),
        () => this.persistence.getTargetCache().containsKey(e, t),
        () => this.persistence.ei(e, t),
      ]);
    }
  }
  class Bc {
    constructor(e, t) {
      (this.persistence = e),
        (this.oi = new ra(
          (e) =>
            (function (e) {
              let t = "";
              for (let n = 0; n < e.length; n++)
                t.length > 0 && (t = ps(t)), (t = fs(e.get(n), t));
              return ps(t);
            })(e.path),
          (e, t) => e.isEqual(t),
        )),
        (this.garbageCollector = (function (e, t) {
          return new Sc(e, t);
        })(this, t));
    }
    static ri(e, t) {
      return new Bc(e, t);
    }
    Zr() {}
    Xr(e) {
      return cs.resolve();
    }
    forEachTarget(e, t) {
      return this.persistence.getTargetCache().forEachTarget(e, t);
    }
    nr(e) {
      const t = this.sr(e);
      return this.persistence
        .getTargetCache()
        .getTargetCount(e)
        .next((e) => t.next((t) => e + t));
    }
    sr(e) {
      let t = 0;
      return this.rr(e, (e) => {
        t++;
      }).next(() => t);
    }
    rr(e, t) {
      return cs.forEach(this.oi, (n, r) =>
        this.ar(e, n, r).next((e) => (e ? cs.resolve() : t(r))),
      );
    }
    removeTargets(e, t, n) {
      return this.persistence.getTargetCache().removeTargets(e, t, n);
    }
    removeOrphanedDocuments(e, t) {
      let n = 0;
      const r = this.persistence.getRemoteDocumentCache(),
        i = r.newChangeBuffer();
      return r
        .qr(e, (r) =>
          this.ar(e, r, t).next((e) => {
            e || (n++, i.removeEntry(r, Xi.min()));
          }),
        )
        .next(() => i.apply(e))
        .next(() => n);
    }
    markPotentiallyOrphaned(e, t) {
      return this.oi.set(t, e.currentSequenceNumber), cs.resolve();
    }
    removeTarget(e, t) {
      const n = t.withSequenceNumber(e.currentSequenceNumber);
      return this.persistence.getTargetCache().updateTargetData(e, n);
    }
    addReference(e, t, n) {
      return this.oi.set(n, e.currentSequenceNumber), cs.resolve();
    }
    removeReference(e, t, n) {
      return this.oi.set(n, e.currentSequenceNumber), cs.resolve();
    }
    updateLimboDocument(e, t) {
      return this.oi.set(t, e.currentSequenceNumber), cs.resolve();
    }
    Jr(e) {
      let t = e.key.toString().length;
      return e.isFoundDocument() && (t += ho(e.data.value)), t;
    }
    ar(e, t, n) {
      return cs.or([
        () => this.persistence.ei(e, t),
        () => this.persistence.getTargetCache().containsKey(e, t),
        () => {
          const e = this.oi.get(t);
          return cs.resolve(void 0 !== e && e > n);
        },
      ]);
    }
    getCacheSize(e) {
      return this.persistence.getRemoteDocumentCache().getSize(e);
    }
  }
  class $c {
    constructor(e, t, n, r) {
      (this.targetId = e), (this.fromCache = t), (this.Hi = n), (this.Ji = r);
    }
    static Yi(e, t) {
      let n = pa(),
        r = pa();
      for (const e of t.docChanges)
        switch (e.type) {
          case 0:
            n = n.add(e.doc.key);
            break;
          case 1:
            r = r.add(e.doc.key);
        }
      return new $c(e, t.fromCache, n, r);
    }
  }
  class Hc {
    constructor() {
      this._documentReadCount = 0;
    }
    get documentReadCount() {
      return this._documentReadCount;
    }
    incrementDocumentReadCount(e) {
      this._documentReadCount += e;
    }
  }
  class zc {
    constructor() {
      (this.Zi = !1),
        (this.Xi = !1),
        (this.es = 100),
        (this.ts =
          !(function () {
            var t;
            const n =
              null === (t = o()) || void 0 === t ? void 0 : t.forceEnvironment;
            if ("node" === n) return !0;
            if ("browser" === n) return !1;
            try {
              return (
                "[object process]" ===
                Object.prototype.toString.call(e.g.process)
              );
            } catch (e) {
              return !1;
            }
          })() &&
          navigator.userAgent &&
          navigator.userAgent.includes("Safari") &&
          !navigator.userAgent.includes("Chrome")
            ? 8
            : (function (e) {
                  const t = e.match(/Android ([\d.]+)/i),
                    n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
                  return Number(n);
                })(h()) > 0
              ? 6
              : 4);
    }
    initialize(e, t) {
      (this.ns = e), (this.indexManager = t), (this.Zi = !0);
    }
    getDocumentsMatchingQuery(e, t, n, r) {
      const i = { result: null };
      return this.rs(e, t)
        .next((e) => {
          i.result = e;
        })
        .next(() => {
          if (!i.result)
            return this.ss(e, t, r, n).next((e) => {
              i.result = e;
            });
        })
        .next(() => {
          if (i.result) return;
          const n = new Hc();
          return this._s(e, t, n).next((r) => {
            if (((i.result = r), this.Xi)) return this.us(e, t, n, r.size);
          });
        })
        .next(() => i.result);
    }
    us(e, t, n, r) {
      return n.documentReadCount < this.es
        ? (Ei() <= k.DEBUG &&
            bi(
              "QueryEngine",
              "SDK will not create cache indexes for query:",
              ea(t),
              "since it only creates cache indexes for collection contains",
              "more than or equal to",
              this.es,
              "documents",
            ),
          cs.resolve())
        : (Ei() <= k.DEBUG &&
            bi(
              "QueryEngine",
              "Query:",
              ea(t),
              "scans",
              n.documentReadCount,
              "local documents and returns",
              r,
              "documents as results.",
            ),
          n.documentReadCount > this.ts * r
            ? (Ei() <= k.DEBUG &&
                bi(
                  "QueryEngine",
                  "The SDK decides to create cache indexes for query:",
                  ea(t),
                  "as using cache indexes may help improve performance.",
                ),
              this.indexManager.createTargetIndexes(e, Xo(t)))
            : cs.resolve());
    }
    rs(e, t) {
      if (Wo(t)) return cs.resolve(null);
      let n = Xo(t);
      return this.indexManager.getIndexType(e, n).next((r) =>
        0 === r
          ? null
          : (null !== t.limit &&
              1 === r &&
              ((t = Jo(t, null, "F")), (n = Xo(t))),
            this.indexManager.getDocumentsMatchingTarget(e, n).next((r) => {
              const i = pa(...r);
              return this.ns.getDocuments(e, i).next((r) =>
                this.indexManager.getMinOffset(e, n).next((n) => {
                  const s = this.cs(t, r);
                  return this.ls(t, s, i, n.readTime)
                    ? this.rs(e, Jo(t, null, "F"))
                    : this.hs(e, s, t, n);
                }),
              );
            })),
      );
    }
    ss(e, t, n, r) {
      return Wo(t) || r.isEqual(Xi.min())
        ? cs.resolve(null)
        : this.ns.getDocuments(e, n).next((i) => {
            const s = this.cs(t, i);
            return this.ls(t, s, n, r)
              ? cs.resolve(null)
              : (Ei() <= k.DEBUG &&
                  bi(
                    "QueryEngine",
                    "Re-using previous result from %s to execute query: %s",
                    r.toString(),
                    ea(t),
                  ),
                this.hs(
                  e,
                  s,
                  t,
                  (function (e, t) {
                    const n = e.toTimestamp().seconds,
                      r = e.toTimestamp().nanoseconds + 1,
                      i = Xi.fromTimestamp(
                        1e9 === r ? new Qi(n + 1, 0) : new Qi(n, r),
                      );
                    return new is(i, ns.empty(), t);
                  })(r, -1),
                ).next((e) => e));
          });
    }
    cs(e, t) {
      let n = new Ds(
        (function (e) {
          return (t, n) => {
            let r = !1;
            for (const i of Qo(e)) {
              const e = na(i, t, n);
              if (0 !== e) return e;
              r = r || i.field.isKeyField();
            }
            return 0;
          };
        })(e),
      );
      return (
        t.forEach((t, r) => {
          ta(e, r) && (n = n.add(r));
        }),
        n
      );
    }
    ls(e, t, n, r) {
      if (null === e.limit) return !1;
      if (n.size !== t.size) return !0;
      const i = "F" === e.limitType ? t.last() : t.first();
      return !!i && (i.hasPendingWrites || i.version.compareTo(r) > 0);
    }
    _s(e, t, n) {
      return (
        Ei() <= k.DEBUG &&
          bi(
            "QueryEngine",
            "Using full collection scan to execute query:",
            ea(t),
          ),
        this.ns.getDocumentsMatchingQuery(e, t, is.min(), n)
      );
    }
    hs(e, t, n, r) {
      return this.ns.getDocumentsMatchingQuery(e, n, r).next(
        (e) => (
          t.forEach((t) => {
            e = e.insert(t.key, t);
          }),
          e
        ),
      );
    }
  }
  class qc {
    constructor(e, t, n, r) {
      (this.persistence = e),
        (this.Ps = t),
        (this.serializer = r),
        (this.Ts = new Rs($i)),
        (this.Is = new ra((e) => qo(e), Go)),
        (this.Es = new Map()),
        (this.ds = e.getRemoteDocumentCache()),
        (this.Hr = e.getTargetCache()),
        (this.Yr = e.getBundleCache()),
        this.As(n);
    }
    As(e) {
      (this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e)),
        (this.indexManager = this.persistence.getIndexManager(e)),
        (this.mutationQueue = this.persistence.getMutationQueue(
          e,
          this.indexManager,
        )),
        (this.localDocuments = new kc(
          this.ds,
          this.mutationQueue,
          this.documentOverlayCache,
          this.indexManager,
        )),
        this.ds.setIndexManager(this.indexManager),
        this.Ps.initialize(this.localDocuments, this.indexManager);
    }
    collectGarbage(e) {
      return this.persistence.runTransaction(
        "Collect garbage",
        "readwrite-primary",
        (t) => e.collect(t, this.Ts),
      );
    }
  }
  async function Gc(e, t) {
    const n = ki(e);
    return await n.persistence.runTransaction(
      "Handle user change",
      "readonly",
      (e) => {
        let r;
        return n.mutationQueue
          .getAllMutationBatches(e)
          .next(
            (i) => ((r = i), n.As(t), n.mutationQueue.getAllMutationBatches(e)),
          )
          .next((t) => {
            const i = [],
              s = [];
            let o = pa();
            for (const e of r) {
              i.push(e.batchId);
              for (const t of e.mutations) o = o.add(t.key);
            }
            for (const e of t) {
              s.push(e.batchId);
              for (const t of e.mutations) o = o.add(t.key);
            }
            return n.localDocuments
              .getDocuments(e, o)
              .next((e) => ({ Rs: e, removedBatchIds: i, addedBatchIds: s }));
          });
      },
    );
  }
  function Kc(e, t) {
    const n = ki(e);
    return n.persistence.runTransaction(
      "Get next mutation batch",
      "readonly",
      (e) => (
        void 0 === t && (t = -1),
        n.mutationQueue.getNextMutationBatchAfterBatchId(e, t)
      ),
    );
  }
  class Wc {
    constructor() {
      this.activeTargetIds = ga;
    }
    Ds(e) {
      this.activeTargetIds = this.activeTargetIds.add(e);
    }
    vs(e) {
      this.activeTargetIds = this.activeTargetIds.delete(e);
    }
    bs() {
      const e = {
        activeTargetIds: this.activeTargetIds.toArray(),
        updateTimeMs: Date.now(),
      };
      return JSON.stringify(e);
    }
  }
  class Qc {
    constructor() {
      (this.ho = new Wc()),
        (this.Po = {}),
        (this.onlineStateHandler = null),
        (this.sequenceNumberHandler = null);
    }
    addPendingMutation(e) {}
    updateMutationState(e, t, n) {}
    addLocalQueryTarget(e, t = !0) {
      return t && this.ho.Ds(e), this.Po[e] || "not-current";
    }
    updateQueryState(e, t, n) {
      this.Po[e] = t;
    }
    removeLocalQueryTarget(e) {
      this.ho.vs(e);
    }
    isLocalQueryTarget(e) {
      return this.ho.activeTargetIds.has(e);
    }
    clearQueryState(e) {
      delete this.Po[e];
    }
    getAllActiveQueryTargets() {
      return this.ho.activeTargetIds;
    }
    isActiveQueryTarget(e) {
      return this.ho.activeTargetIds.has(e);
    }
    start() {
      return (this.ho = new Wc()), Promise.resolve();
    }
    handleUserChange(e, t, n) {}
    setOnlineState(e) {}
    shutdown() {}
    writeSequenceNumber(e) {}
    notifyBundleLoaded(e) {}
  }
  class Xc {
    To(e) {}
    shutdown() {}
  }
  const Jc = "ConnectivityMonitor";
  class Yc {
    constructor() {
      (this.Io = () => this.Eo()),
        (this.Ao = () => this.Ro()),
        (this.Vo = []),
        this.mo();
    }
    To(e) {
      this.Vo.push(e);
    }
    shutdown() {
      window.removeEventListener("online", this.Io),
        window.removeEventListener("offline", this.Ao);
    }
    mo() {
      window.addEventListener("online", this.Io),
        window.addEventListener("offline", this.Ao);
    }
    Eo() {
      bi(Jc, "Network connectivity changed: AVAILABLE");
      for (const e of this.Vo) e(0);
    }
    Ro() {
      bi(Jc, "Network connectivity changed: UNAVAILABLE");
      for (const e of this.Vo) e(1);
    }
    static D() {
      return (
        "undefined" != typeof window &&
        void 0 !== window.addEventListener &&
        void 0 !== window.removeEventListener
      );
    }
  }
  let Zc = null;
  function eu() {
    return (
      null === Zc
        ? (Zc = 268435456 + Math.round(2147483648 * Math.random()))
        : Zc++,
      "0x" + Zc.toString(16)
    );
  }
  const tu = "RestConnection",
    nu = {
      BatchGetDocuments: "batchGet",
      Commit: "commit",
      RunQuery: "runQuery",
      RunAggregationQuery: "runAggregationQuery",
    };
  class ru {
    get fo() {
      return !1;
    }
    constructor(e) {
      (this.databaseInfo = e), (this.databaseId = e.databaseId);
      const t = e.ssl ? "https" : "http",
        n = encodeURIComponent(this.databaseId.projectId),
        r = encodeURIComponent(this.databaseId.database);
      (this.po = t + "://" + e.host),
        (this.yo = `projects/${n}/databases/${r}`),
        (this.wo =
          this.databaseId.database === Xs
            ? `project_id=${n}`
            : `project_id=${n}&database_id=${r}`);
    }
    So(e, t, n, r, i) {
      const s = eu(),
        o = this.bo(e, t.toUriEncodedString());
      bi(tu, `Sending RPC '${e}' ${s}:`, o, n);
      const a = {
        "google-cloud-resource-prefix": this.yo,
        "x-goog-request-params": this.wo,
      };
      return (
        this.Do(a, r, i),
        this.vo(e, o, a, n).then(
          (t) => (bi(tu, `Received RPC '${e}' ${s}: `, t), t),
          (t) => {
            throw (
              (Ti(
                tu,
                `RPC '${e}' ${s} failed with error: `,
                t,
                "url: ",
                o,
                "request:",
                n,
              ),
              t)
            );
          },
        )
      );
    }
    Co(e, t, n, r, i, s) {
      return this.So(e, t, n, r, i);
    }
    Do(e, t, n) {
      (e["X-Goog-Api-Client"] = "gl-js/ fire/" + wi),
        (e["Content-Type"] = "text/plain"),
        this.databaseInfo.appId &&
          (e["X-Firebase-GMPID"] = this.databaseInfo.appId),
        t && t.headers.forEach((t, n) => (e[n] = t)),
        n && n.headers.forEach((t, n) => (e[n] = t));
    }
    bo(e, t) {
      const n = nu[e];
      return `${this.po}/v1/${t}:${n}`;
    }
    terminate() {}
  }
  class iu {
    constructor(e) {
      (this.Fo = e.Fo), (this.Mo = e.Mo);
    }
    xo(e) {
      this.Oo = e;
    }
    No(e) {
      this.Bo = e;
    }
    Lo(e) {
      this.ko = e;
    }
    onMessage(e) {
      this.qo = e;
    }
    close() {
      this.Mo();
    }
    send(e) {
      this.Fo(e);
    }
    Qo() {
      this.Oo();
    }
    $o() {
      this.Bo();
    }
    Uo(e) {
      this.ko(e);
    }
    Ko(e) {
      this.qo(e);
    }
  }
  const su = "WebChannelConnection";
  class ou extends ru {
    constructor(e) {
      super(e),
        (this.forceLongPolling = e.forceLongPolling),
        (this.autoDetectLongPolling = e.autoDetectLongPolling),
        (this.useFetchStreams = e.useFetchStreams),
        (this.longPollingOptions = e.longPollingOptions);
    }
    vo(e, t, n, r) {
      const i = eu();
      return new Promise((s, o) => {
        const a = new oi();
        a.setWithCredentials(!0),
          a.listenOnce(ci.COMPLETE, () => {
            try {
              switch (a.getLastErrorCode()) {
                case ui.NO_ERROR:
                  const t = a.getResponseJson();
                  bi(
                    su,
                    `XHR for RPC '${e}' ${i} received:`,
                    JSON.stringify(t),
                  ),
                    s(t);
                  break;
                case ui.TIMEOUT:
                  bi(su, `RPC '${e}' ${i} timed out`),
                    o(new Ri(Ni.DEADLINE_EXCEEDED, "Request time out"));
                  break;
                case ui.HTTP_ERROR:
                  const n = a.getStatus();
                  if (
                    (bi(
                      su,
                      `RPC '${e}' ${i} failed with status:`,
                      n,
                      "response text:",
                      a.getResponseText(),
                    ),
                    n > 0)
                  ) {
                    let e = a.getResponseJson();
                    Array.isArray(e) && (e = e[0]);
                    const t = null == e ? void 0 : e.error;
                    if (t && t.status && t.message) {
                      const e = (function (e) {
                        const t = e.toLowerCase().replace(/_/g, "-");
                        return Object.values(Ni).indexOf(t) >= 0
                          ? t
                          : Ni.UNKNOWN;
                      })(t.status);
                      o(new Ri(e, t.message));
                    } else
                      o(
                        new Ri(
                          Ni.UNKNOWN,
                          "Server responded with status " + a.getStatus(),
                        ),
                      );
                  } else o(new Ri(Ni.UNAVAILABLE, "Connection failed."));
                  break;
                default:
                  Ci();
              }
            } finally {
              bi(su, `RPC '${e}' ${i} completed.`);
            }
          });
        const c = JSON.stringify(r);
        bi(su, `RPC '${e}' ${i} sending request:`, r),
          a.send(t, "POST", c, n, 15);
      });
    }
    Wo(e, t, n) {
      const r = eu(),
        i = [this.po, "/", "google.firestore.v1.Firestore", "/", e, "/channel"],
        s = fi(),
        o = di(),
        a = {
          httpSessionIdParam: "gsessionid",
          initMessageHeaders: {},
          messageUrlParams: {
            database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
          },
          sendRawJson: !0,
          supportsCrossDomainXhr: !0,
          internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
          forceLongPolling: this.forceLongPolling,
          detectBufferingProxy: this.autoDetectLongPolling,
        },
        c = this.longPollingOptions.timeoutSeconds;
      void 0 !== c && (a.longPollingTimeout = Math.round(1e3 * c)),
        this.useFetchStreams && (a.useFetchStreams = !0),
        this.Do(a.initMessageHeaders, t, n),
        (a.encodeInitMessageHeaders = !0);
      const u = i.join("");
      bi(su, `Creating RPC '${e}' stream ${r}: ${u}`, a);
      const l = s.createWebChannel(u, a);
      let h = !1,
        d = !1;
      const f = new iu({
          Fo: (t) => {
            d
              ? bi(
                  su,
                  `Not sending because RPC '${e}' stream ${r} is closed:`,
                  t,
                )
              : (h ||
                  (bi(su, `Opening RPC '${e}' stream ${r} transport.`),
                  l.open(),
                  (h = !0)),
                bi(su, `RPC '${e}' stream ${r} sending:`, t),
                l.send(t));
          },
          Mo: () => l.close(),
        }),
        p = (e, t, n) => {
          e.listen(t, (e) => {
            try {
              n(e);
            } catch (e) {
              setTimeout(() => {
                throw e;
              }, 0);
            }
          });
        };
      return (
        p(l, ai.EventType.OPEN, () => {
          d || (bi(su, `RPC '${e}' stream ${r} transport opened.`), f.Qo());
        }),
        p(l, ai.EventType.CLOSE, () => {
          d ||
            ((d = !0),
            bi(su, `RPC '${e}' stream ${r} transport closed`),
            f.Uo());
        }),
        p(l, ai.EventType.ERROR, (t) => {
          d ||
            ((d = !0),
            Ti(su, `RPC '${e}' stream ${r} transport errored:`, t),
            f.Uo(
              new Ri(Ni.UNAVAILABLE, "The operation could not be completed"),
            ));
        }),
        p(l, ai.EventType.MESSAGE, (t) => {
          var n;
          if (!d) {
            const i = t.data[0];
            Ai(!!i);
            const s = i,
              o =
                (null == s ? void 0 : s.error) ||
                (null === (n = s[0]) || void 0 === n ? void 0 : n.error);
            if (o) {
              bi(su, `RPC '${e}' stream ${r} received error:`, o);
              const t = o.status;
              let n = (function (e) {
                  const t = Xa[e];
                  if (void 0 !== t)
                    return (function (e) {
                      if (void 0 === e)
                        return Ii("GRPC error has no .code"), Ni.UNKNOWN;
                      switch (e) {
                        case Xa.OK:
                          return Ni.OK;
                        case Xa.CANCELLED:
                          return Ni.CANCELLED;
                        case Xa.UNKNOWN:
                          return Ni.UNKNOWN;
                        case Xa.DEADLINE_EXCEEDED:
                          return Ni.DEADLINE_EXCEEDED;
                        case Xa.RESOURCE_EXHAUSTED:
                          return Ni.RESOURCE_EXHAUSTED;
                        case Xa.INTERNAL:
                          return Ni.INTERNAL;
                        case Xa.UNAVAILABLE:
                          return Ni.UNAVAILABLE;
                        case Xa.UNAUTHENTICATED:
                          return Ni.UNAUTHENTICATED;
                        case Xa.INVALID_ARGUMENT:
                          return Ni.INVALID_ARGUMENT;
                        case Xa.NOT_FOUND:
                          return Ni.NOT_FOUND;
                        case Xa.ALREADY_EXISTS:
                          return Ni.ALREADY_EXISTS;
                        case Xa.PERMISSION_DENIED:
                          return Ni.PERMISSION_DENIED;
                        case Xa.FAILED_PRECONDITION:
                          return Ni.FAILED_PRECONDITION;
                        case Xa.ABORTED:
                          return Ni.ABORTED;
                        case Xa.OUT_OF_RANGE:
                          return Ni.OUT_OF_RANGE;
                        case Xa.UNIMPLEMENTED:
                          return Ni.UNIMPLEMENTED;
                        case Xa.DATA_LOSS:
                          return Ni.DATA_LOSS;
                        default:
                          return Ci();
                      }
                    })(t);
                })(t),
                i = o.message;
              void 0 === n &&
                ((n = Ni.INTERNAL),
                (i =
                  "Unknown error status: " + t + " with message " + o.message)),
                (d = !0),
                f.Uo(new Ri(n, i)),
                l.close();
            } else bi(su, `RPC '${e}' stream ${r} received:`, i), f.Ko(i);
          }
        }),
        p(o, hi.STAT_EVENT, (t) => {
          t.stat === li.PROXY
            ? bi(su, `RPC '${e}' stream ${r} detected buffering proxy`)
            : t.stat === li.NOPROXY &&
              bi(su, `RPC '${e}' stream ${r} detected no buffering proxy`);
        }),
        setTimeout(() => {
          f.$o();
        }, 0),
        f
      );
    }
  }
  function au() {
    return "undefined" != typeof document ? document : null;
  }
  function cu(e) {
    return new Ya(e, !0);
  }
  class uu {
    constructor(e, t, n = 1e3, r = 1.5, i = 6e4) {
      (this.Ti = e),
        (this.timerId = t),
        (this.Go = n),
        (this.zo = r),
        (this.jo = i),
        (this.Ho = 0),
        (this.Jo = null),
        (this.Yo = Date.now()),
        this.reset();
    }
    reset() {
      this.Ho = 0;
    }
    Zo() {
      this.Ho = this.jo;
    }
    Xo(e) {
      this.cancel();
      const t = Math.floor(this.Ho + this.e_()),
        n = Math.max(0, Date.now() - this.Yo),
        r = Math.max(0, t - n);
      r > 0 &&
        bi(
          "ExponentialBackoff",
          `Backing off for ${r} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`,
        ),
        (this.Jo = this.Ti.enqueueAfterDelay(
          this.timerId,
          r,
          () => ((this.Yo = Date.now()), e()),
        )),
        (this.Ho *= this.zo),
        this.Ho < this.Go && (this.Ho = this.Go),
        this.Ho > this.jo && (this.Ho = this.jo);
    }
    t_() {
      null !== this.Jo && (this.Jo.skipDelay(), (this.Jo = null));
    }
    cancel() {
      null !== this.Jo && (this.Jo.cancel(), (this.Jo = null));
    }
    e_() {
      return (Math.random() - 0.5) * this.Ho;
    }
  }
  const lu = "PersistentStream";
  class hu {
    constructor(e, t, n, r, i, s, o, a) {
      (this.Ti = e),
        (this.n_ = n),
        (this.r_ = r),
        (this.connection = i),
        (this.authCredentialsProvider = s),
        (this.appCheckCredentialsProvider = o),
        (this.listener = a),
        (this.state = 0),
        (this.i_ = 0),
        (this.s_ = null),
        (this.o_ = null),
        (this.stream = null),
        (this.__ = 0),
        (this.a_ = new uu(e, t));
    }
    u_() {
      return 1 === this.state || 5 === this.state || this.c_();
    }
    c_() {
      return 2 === this.state || 3 === this.state;
    }
    start() {
      (this.__ = 0), 4 !== this.state ? this.auth() : this.l_();
    }
    async stop() {
      this.u_() && (await this.close(0));
    }
    h_() {
      (this.state = 0), this.a_.reset();
    }
    P_() {
      this.c_() &&
        null === this.s_ &&
        (this.s_ = this.Ti.enqueueAfterDelay(this.n_, 6e4, () => this.T_()));
    }
    I_(e) {
      this.E_(), this.stream.send(e);
    }
    async T_() {
      if (this.c_()) return this.close(0);
    }
    E_() {
      this.s_ && (this.s_.cancel(), (this.s_ = null));
    }
    d_() {
      this.o_ && (this.o_.cancel(), (this.o_ = null));
    }
    async close(e, t) {
      this.E_(),
        this.d_(),
        this.a_.cancel(),
        this.i_++,
        4 !== e
          ? this.a_.reset()
          : t && t.code === Ni.RESOURCE_EXHAUSTED
            ? (Ii(t.toString()),
              Ii(
                "Using maximum backoff delay to prevent overloading the backend.",
              ),
              this.a_.Zo())
            : t &&
              t.code === Ni.UNAUTHENTICATED &&
              3 !== this.state &&
              (this.authCredentialsProvider.invalidateToken(),
              this.appCheckCredentialsProvider.invalidateToken()),
        null !== this.stream &&
          (this.A_(), this.stream.close(), (this.stream = null)),
        (this.state = e),
        await this.listener.Lo(t);
    }
    A_() {}
    auth() {
      this.state = 1;
      const e = this.R_(this.i_),
        t = this.i_;
      Promise.all([
        this.authCredentialsProvider.getToken(),
        this.appCheckCredentialsProvider.getToken(),
      ]).then(
        ([e, n]) => {
          this.i_ === t && this.V_(e, n);
        },
        (t) => {
          e(() => {
            const e = new Ri(
              Ni.UNKNOWN,
              "Fetching auth token failed: " + t.message,
            );
            return this.m_(e);
          });
        },
      );
    }
    V_(e, t) {
      const n = this.R_(this.i_);
      (this.stream = this.f_(e, t)),
        this.stream.xo(() => {
          n(() => this.listener.xo());
        }),
        this.stream.No(() => {
          n(
            () => (
              (this.state = 2),
              (this.o_ = this.Ti.enqueueAfterDelay(
                this.r_,
                1e4,
                () => (this.c_() && (this.state = 3), Promise.resolve()),
              )),
              this.listener.No()
            ),
          );
        }),
        this.stream.Lo((e) => {
          n(() => this.m_(e));
        }),
        this.stream.onMessage((e) => {
          n(() => (1 == ++this.__ ? this.g_(e) : this.onNext(e)));
        });
    }
    l_() {
      (this.state = 5),
        this.a_.Xo(async () => {
          (this.state = 0), this.start();
        });
    }
    m_(e) {
      return (
        bi(lu, `close with error: ${e}`), (this.stream = null), this.close(4, e)
      );
    }
    R_(e) {
      return (t) => {
        this.Ti.enqueueAndForget(() =>
          this.i_ === e
            ? t()
            : (bi(lu, "stream callback skipped by getCloseGuardedDispatcher."),
              Promise.resolve()),
        );
      };
    }
  }
  class du extends hu {
    constructor(e, t, n, r, i, s) {
      super(
        e,
        "write_stream_connection_backoff",
        "write_stream_idle",
        "health_check_timeout",
        t,
        n,
        r,
        s,
      ),
        (this.serializer = i);
    }
    get S_() {
      return this.__ > 0;
    }
    start() {
      (this.lastStreamToken = void 0), super.start();
    }
    A_() {
      this.S_ && this.b_([]);
    }
    f_(e, t) {
      return this.connection.Wo("Write", e, t);
    }
    g_(e) {
      return (
        Ai(!!e.streamToken),
        (this.lastStreamToken = e.streamToken),
        Ai(!e.writeResults || 0 === e.writeResults.length),
        this.listener.D_()
      );
    }
    onNext(e) {
      Ai(!!e.streamToken),
        (this.lastStreamToken = e.streamToken),
        this.a_.reset();
      const t = (function (e, t) {
          return e && e.length > 0
            ? (Ai(void 0 !== t),
              e.map((e) =>
                (function (e, t) {
                  let n = e.updateTime ? nc(e.updateTime) : nc(t);
                  return (
                    n.isEqual(Xi.min()) && (n = nc(t)),
                    new Oa(n, e.transformResults || [])
                  );
                })(e, t),
              ))
            : [];
        })(e.writeResults, e.commitTime),
        n = nc(e.commitTime);
      return this.listener.v_(n, t);
    }
    C_() {
      const e = {};
      (e.database = (function (e) {
        return new Zi([
          "projects",
          e.databaseId.projectId,
          "databases",
          e.databaseId.database,
        ]).canonicalString();
      })(this.serializer)),
        this.I_(e);
    }
    b_(e) {
      const t = {
        streamToken: this.lastStreamToken,
        writes: e.map((e) =>
          (function (e, t) {
            let n;
            if (t instanceof ja) n = { update: ac(e, t.key, t.value) };
            else if (t instanceof qa) n = { delete: sc(e, t.key) };
            else if (t instanceof Ba)
              n = { update: ac(e, t.key, t.data), updateMask: hc(t.fieldMask) };
            else {
              if (!(t instanceof Ga)) return Ci();
              n = { verify: sc(e, t.key) };
            }
            return (
              t.fieldTransforms.length > 0 &&
                (n.updateTransforms = t.fieldTransforms.map((e) =>
                  (function (e, t) {
                    const n = t.transform;
                    if (n instanceof Ia)
                      return {
                        fieldPath: t.field.canonicalString(),
                        setToServerValue: "REQUEST_TIME",
                      };
                    if (n instanceof Ta)
                      return {
                        fieldPath: t.field.canonicalString(),
                        appendMissingElements: { values: n.elements },
                      };
                    if (n instanceof Ca)
                      return {
                        fieldPath: t.field.canonicalString(),
                        removeAllFromArray: { values: n.elements },
                      };
                    if (n instanceof ka)
                      return {
                        fieldPath: t.field.canonicalString(),
                        increment: n.Ie,
                      };
                    throw Ci();
                  })(0, e),
                )),
              t.precondition.isNone ||
                (n.currentDocument = (function (e, t) {
                  return void 0 !== t.updateTime
                    ? { updateTime: tc(e, t.updateTime) }
                    : void 0 !== t.exists
                      ? { exists: t.exists }
                      : Ci();
                })(e, t.precondition)),
              n
            );
          })(this.serializer, e),
        ),
      };
      this.I_(t);
    }
  }
  class fu {}
  class pu extends fu {
    constructor(e, t, n, r) {
      super(),
        (this.authCredentials = e),
        (this.appCheckCredentials = t),
        (this.connection = n),
        (this.serializer = r),
        (this.F_ = !1);
    }
    M_() {
      if (this.F_)
        throw new Ri(
          Ni.FAILED_PRECONDITION,
          "The client has already been terminated.",
        );
    }
    So(e, t, n, r) {
      return (
        this.M_(),
        Promise.all([
          this.authCredentials.getToken(),
          this.appCheckCredentials.getToken(),
        ])
          .then(([i, s]) => this.connection.So(e, ic(t, n), r, i, s))
          .catch((e) => {
            throw "FirebaseError" === e.name
              ? (e.code === Ni.UNAUTHENTICATED &&
                  (this.authCredentials.invalidateToken(),
                  this.appCheckCredentials.invalidateToken()),
                e)
              : new Ri(Ni.UNKNOWN, e.toString());
          })
      );
    }
    Co(e, t, n, r, i) {
      return (
        this.M_(),
        Promise.all([
          this.authCredentials.getToken(),
          this.appCheckCredentials.getToken(),
        ])
          .then(([s, o]) => this.connection.Co(e, ic(t, n), r, s, o, i))
          .catch((e) => {
            throw "FirebaseError" === e.name
              ? (e.code === Ni.UNAUTHENTICATED &&
                  (this.authCredentials.invalidateToken(),
                  this.appCheckCredentials.invalidateToken()),
                e)
              : new Ri(Ni.UNKNOWN, e.toString());
          })
      );
    }
    terminate() {
      (this.F_ = !0), this.connection.terminate();
    }
  }
  class gu {
    constructor(e, t) {
      (this.asyncQueue = e),
        (this.onlineStateHandler = t),
        (this.state = "Unknown"),
        (this.x_ = 0),
        (this.O_ = null),
        (this.N_ = !0);
    }
    B_() {
      0 === this.x_ &&
        (this.L_("Unknown"),
        (this.O_ = this.asyncQueue.enqueueAfterDelay(
          "online_state_timeout",
          1e4,
          () => (
            (this.O_ = null),
            this.k_("Backend didn't respond within 10 seconds."),
            this.L_("Offline"),
            Promise.resolve()
          ),
        )));
    }
    q_(e) {
      "Online" === this.state
        ? this.L_("Unknown")
        : (this.x_++,
          this.x_ >= 1 &&
            (this.Q_(),
            this.k_(
              `Connection failed 1 times. Most recent error: ${e.toString()}`,
            ),
            this.L_("Offline")));
    }
    set(e) {
      this.Q_(), (this.x_ = 0), "Online" === e && (this.N_ = !1), this.L_(e);
    }
    L_(e) {
      e !== this.state && ((this.state = e), this.onlineStateHandler(e));
    }
    k_(e) {
      const t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
      this.N_ ? (Ii(t), (this.N_ = !1)) : bi("OnlineStateTracker", t);
    }
    Q_() {
      null !== this.O_ && (this.O_.cancel(), (this.O_ = null));
    }
  }
  const mu = "RemoteStore";
  class yu {
    constructor(e, t, n, r, i) {
      (this.localStore = e),
        (this.datastore = t),
        (this.asyncQueue = n),
        (this.remoteSyncer = {}),
        (this.U_ = []),
        (this.K_ = new Map()),
        (this.W_ = new Set()),
        (this.G_ = []),
        (this.z_ = i),
        this.z_.To((e) => {
          n.enqueueAndForget(async () => {
            _u(this) &&
              (bi(mu, "Restarting streams for network reachability change."),
              await (async function (e) {
                const t = ki(e);
                t.W_.add(4),
                  await wu(t),
                  t.j_.set("Unknown"),
                  t.W_.delete(4),
                  await vu(t);
              })(this));
          });
        }),
        (this.j_ = new gu(n, r));
    }
  }
  async function vu(e) {
    if (_u(e)) for (const t of e.G_) await t(!0);
  }
  async function wu(e) {
    for (const t of e.G_) await t(!1);
  }
  function _u(e) {
    return 0 === ki(e).W_.size;
  }
  async function Eu(e, t, n) {
    if (!us(t)) throw t;
    e.W_.add(1),
      await wu(e),
      e.j_.set("Offline"),
      n ||
        (n = () =>
          (function (e) {
            const t = ki(e);
            return t.persistence.runTransaction(
              "Get last remote snapshot version",
              "readonly",
              (e) => t.Hr.getLastRemoteSnapshotVersion(e),
            );
          })(e.localStore)),
      e.asyncQueue.enqueueRetryable(async () => {
        bi(mu, "Retrying IndexedDB access"),
          await n(),
          e.W_.delete(1),
          await vu(e);
      });
  }
  function bu(e, t) {
    return t().catch((n) => Eu(e, n, t));
  }
  async function Iu(e) {
    const t = ki(e),
      n = Du(t);
    let r = t.U_.length > 0 ? t.U_[t.U_.length - 1].batchId : -1;
    for (; Tu(t); )
      try {
        const e = await Kc(t.localStore, r);
        if (null === e) {
          0 === t.U_.length && n.P_();
          break;
        }
        (r = e.batchId), Su(t, e);
      } catch (e) {
        await Eu(t, e);
      }
    Cu(t) && Au(t);
  }
  function Tu(e) {
    return _u(e) && e.U_.length < 10;
  }
  function Su(e, t) {
    e.U_.push(t);
    const n = Du(e);
    n.c_() && n.S_ && n.b_(t.mutations);
  }
  function Cu(e) {
    return _u(e) && !Du(e).u_() && e.U_.length > 0;
  }
  function Au(e) {
    Du(e).start();
  }
  async function ku(e) {
    Du(e).C_();
  }
  async function Nu(e) {
    const t = Du(e);
    for (const n of e.U_) t.b_(n.mutations);
  }
  async function Ru(e, t, n) {
    const r = e.U_.shift(),
      i = Wa.from(r, t, n);
    await bu(e, () => e.remoteSyncer.applySuccessfulWrite(i)), await Iu(e);
  }
  async function Ou(e, t) {
    t &&
      Du(e).S_ &&
      (await (async function (e, t) {
        if (
          (function (e) {
            return (
              (function (e) {
                switch (e) {
                  case Ni.OK:
                    return Ci();
                  case Ni.CANCELLED:
                  case Ni.UNKNOWN:
                  case Ni.DEADLINE_EXCEEDED:
                  case Ni.RESOURCE_EXHAUSTED:
                  case Ni.INTERNAL:
                  case Ni.UNAVAILABLE:
                  case Ni.UNAUTHENTICATED:
                    return !1;
                  case Ni.INVALID_ARGUMENT:
                  case Ni.NOT_FOUND:
                  case Ni.ALREADY_EXISTS:
                  case Ni.PERMISSION_DENIED:
                  case Ni.FAILED_PRECONDITION:
                  case Ni.ABORTED:
                  case Ni.OUT_OF_RANGE:
                  case Ni.UNIMPLEMENTED:
                  case Ni.DATA_LOSS:
                    return !0;
                  default:
                    return Ci();
                }
              })(e) && e !== Ni.ABORTED
            );
          })(t.code)
        ) {
          const n = e.U_.shift();
          Du(e).h_(),
            await bu(e, () => e.remoteSyncer.rejectFailedWrite(n.batchId, t)),
            await Iu(e);
        }
      })(e, t)),
      Cu(e) && Au(e);
  }
  async function Pu(e, t) {
    const n = ki(e);
    n.asyncQueue.verifyOperationInProgress(),
      bi(mu, "RemoteStore received new credentials");
    const r = _u(n);
    n.W_.add(3),
      await wu(n),
      r && n.j_.set("Unknown"),
      await n.remoteSyncer.handleCredentialChange(t),
      n.W_.delete(3),
      await vu(n);
  }
  function Du(e) {
    return (
      e.Y_ ||
        ((e.Y_ = (function (e, t, n) {
          const r = ki(e);
          return (
            r.M_(),
            new du(
              t,
              r.connection,
              r.authCredentials,
              r.appCheckCredentials,
              r.serializer,
              n,
            )
          );
        })(e.datastore, e.asyncQueue, {
          xo: () => Promise.resolve(),
          No: ku.bind(null, e),
          Lo: Ou.bind(null, e),
          D_: Nu.bind(null, e),
          v_: Ru.bind(null, e),
        })),
        e.G_.push(async (t) => {
          t
            ? (e.Y_.h_(), await Iu(e))
            : (await e.Y_.stop(),
              e.U_.length > 0 &&
                (bi(
                  mu,
                  `Stopping write stream with ${e.U_.length} pending writes`,
                ),
                (e.U_ = [])));
        })),
      e.Y_
    );
  }
  class Lu {
    constructor(e, t, n, r, i) {
      (this.asyncQueue = e),
        (this.timerId = t),
        (this.targetTimeMs = n),
        (this.op = r),
        (this.removalCallback = i),
        (this.deferred = new Oi()),
        (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
        this.deferred.promise.catch((e) => {});
    }
    get promise() {
      return this.deferred.promise;
    }
    static createAndSchedule(e, t, n, r, i) {
      const s = Date.now() + n,
        o = new Lu(e, t, s, r, i);
      return o.start(n), o;
    }
    start(e) {
      this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
    }
    skipDelay() {
      return this.handleDelayElapsed();
    }
    cancel(e) {
      null !== this.timerHandle &&
        (this.clearTimeout(),
        this.deferred.reject(
          new Ri(Ni.CANCELLED, "Operation cancelled" + (e ? ": " + e : "")),
        ));
    }
    handleDelayElapsed() {
      this.asyncQueue.enqueueAndForget(() =>
        null !== this.timerHandle
          ? (this.clearTimeout(),
            this.op().then((e) => this.deferred.resolve(e)))
          : Promise.resolve(),
      );
    }
    clearTimeout() {
      null !== this.timerHandle &&
        (this.removalCallback(this),
        clearTimeout(this.timerHandle),
        (this.timerHandle = null));
    }
  }
  function xu(e, t) {
    if ((Ii("AsyncQueue", `${t}: ${e}`), us(e)))
      return new Ri(Ni.UNAVAILABLE, `${t}: ${e}`);
    throw e;
  }
  class Mu {
    constructor() {
      (this.queries = Uu()),
        (this.onlineState = "Unknown"),
        (this.ia = new Set());
    }
    terminate() {
      !(function (e, t) {
        const n = ki(e),
          r = n.queries;
        (n.queries = Uu()),
          r.forEach((e, n) => {
            for (const e of n.ta) e.onError(t);
          });
      })(this, new Ri(Ni.ABORTED, "Firestore shutting down"));
    }
  }
  function Uu() {
    return new ra((e) => Zo(e), Yo);
  }
  var Vu, Fu;
  ((Fu = Vu || (Vu = {}))._a = "default"), (Fu.Cache = "cache");
  class ju {
    constructor(e, t, n, r, i, s) {
      (this.localStore = e),
        (this.remoteStore = t),
        (this.eventManager = n),
        (this.sharedClientState = r),
        (this.currentUser = i),
        (this.maxConcurrentLimboResolutions = s),
        (this.La = {}),
        (this.ka = new ra((e) => Zo(e), Yo)),
        (this.qa = new Map()),
        (this.Qa = new Set()),
        (this.$a = new Rs(ns.comparator)),
        (this.Ua = new Map()),
        (this.Ka = new Pc()),
        (this.Wa = {}),
        (this.Ga = new Map()),
        (this.za = _c.Kn()),
        (this.onlineState = "Unknown"),
        (this.ja = void 0);
    }
    get isPrimaryClient() {
      return !0 === this.ja;
    }
  }
  function Bu(e, t, n) {
    const r = ki(e);
    if ((r.isPrimaryClient && 0 === n) || (!r.isPrimaryClient && 1 === n)) {
      const e = [];
      r.ka.forEach((n, r) => {
        const i = r.view.sa(t);
        i.snapshot && e.push(i.snapshot);
      }),
        (function (e, t) {
          const n = ki(e);
          n.onlineState = t;
          let r = !1;
          n.queries.forEach((e, n) => {
            for (const e of n.ta) e.sa(t) && (r = !0);
          }),
            r &&
              (function (e) {
                e.ia.forEach((e) => {
                  e.next();
                });
              })(n);
        })(r.eventManager, t),
        e.length && r.La.p_(e),
        (r.onlineState = t),
        r.isPrimaryClient && r.sharedClientState.setOnlineState(t);
    }
  }
  async function $u(e, t) {
    const n = ki(e),
      r = t.batch.batchId;
    try {
      const e = await (function (e, t) {
        const n = ki(e);
        return n.persistence.runTransaction(
          "Acknowledge batch",
          "readwrite-primary",
          (e) => {
            const r = t.batch.keys(),
              i = n.ds.newChangeBuffer({ trackRemovals: !0 });
            return (function (e, t, n, r) {
              const i = n.batch,
                s = i.keys();
              let o = cs.resolve();
              return (
                s.forEach((e) => {
                  o = o
                    .next(() => r.getEntry(t, e))
                    .next((t) => {
                      const s = n.docVersions.get(e);
                      Ai(null !== s),
                        t.version.compareTo(s) < 0 &&
                          (i.applyToRemoteDocument(t, n),
                          t.isValidDocument() &&
                            (t.setReadTime(n.commitVersion), r.addEntry(t)));
                    });
                }),
                o.next(() => e.mutationQueue.removeMutationBatch(t, i))
              );
            })(n, e, t, i)
              .next(() => i.apply(e))
              .next(() => n.mutationQueue.performConsistencyCheck(e))
              .next(() =>
                n.documentOverlayCache.removeOverlaysForBatchId(
                  e,
                  r,
                  t.batch.batchId,
                ),
              )
              .next(() =>
                n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                  e,
                  (function (e) {
                    let t = pa();
                    for (let n = 0; n < e.mutationResults.length; ++n)
                      e.mutationResults[n].transformResults.length > 0 &&
                        (t = t.add(e.batch.mutations[n].key));
                    return t;
                  })(t),
                ),
              )
              .next(() => n.localDocuments.getDocuments(e, r));
          },
        );
      })(n.localStore, t);
      qu(n, r, null),
        zu(n, r),
        n.sharedClientState.updateMutationState(r, "acknowledged"),
        await Gu(n, e);
    } catch (e) {
      await as(e);
    }
  }
  async function Hu(e, t, n) {
    const r = ki(e);
    try {
      const e = await (function (e, t) {
        const n = ki(e);
        return n.persistence.runTransaction(
          "Reject batch",
          "readwrite-primary",
          (e) => {
            let r;
            return n.mutationQueue
              .lookupMutationBatch(e, t)
              .next(
                (t) => (
                  Ai(null !== t),
                  (r = t.keys()),
                  n.mutationQueue.removeMutationBatch(e, t)
                ),
              )
              .next(() => n.mutationQueue.performConsistencyCheck(e))
              .next(() =>
                n.documentOverlayCache.removeOverlaysForBatchId(e, r, t),
              )
              .next(() =>
                n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                  e,
                  r,
                ),
              )
              .next(() => n.localDocuments.getDocuments(e, r));
          },
        );
      })(r.localStore, t);
      qu(r, t, n),
        zu(r, t),
        r.sharedClientState.updateMutationState(t, "rejected", n),
        await Gu(r, e);
    } catch (n) {
      await as(n);
    }
  }
  function zu(e, t) {
    (e.Ga.get(t) || []).forEach((e) => {
      e.resolve();
    }),
      e.Ga.delete(t);
  }
  function qu(e, t, n) {
    const r = ki(e);
    let i = r.Wa[r.currentUser.toKey()];
    if (i) {
      const e = i.get(t);
      e && (n ? e.reject(n) : e.resolve(), (i = i.remove(t))),
        (r.Wa[r.currentUser.toKey()] = i);
    }
  }
  async function Gu(e, t, n) {
    const r = ki(e),
      i = [],
      s = [],
      o = [];
    r.ka.isEmpty() ||
      (r.ka.forEach((e, a) => {
        o.push(
          r.Ha(a, t, n).then((e) => {
            var t;
            if ((e || n) && r.isPrimaryClient) {
              const i = e
                ? !e.fromCache
                : null ===
                      (t =
                        null == n ? void 0 : n.targetChanges.get(a.targetId)) ||
                    void 0 === t
                  ? void 0
                  : t.current;
              r.sharedClientState.updateQueryState(
                a.targetId,
                i ? "current" : "not-current",
              );
            }
            if (e) {
              i.push(e);
              const t = $c.Yi(a.targetId, e);
              s.push(t);
            }
          }),
        );
      }),
      await Promise.all(o),
      r.La.p_(i),
      await (async function (e, t) {
        const n = ki(e);
        try {
          await n.persistence.runTransaction(
            "notifyLocalViewChanges",
            "readwrite",
            (e) =>
              cs.forEach(t, (t) =>
                cs
                  .forEach(t.Hi, (r) =>
                    n.persistence.referenceDelegate.addReference(
                      e,
                      t.targetId,
                      r,
                    ),
                  )
                  .next(() =>
                    cs.forEach(t.Ji, (r) =>
                      n.persistence.referenceDelegate.removeReference(
                        e,
                        t.targetId,
                        r,
                      ),
                    ),
                  ),
              ),
          );
        } catch (e) {
          if (!us(e)) throw e;
          bi("LocalStore", "Failed to update sequence numbers: " + e);
        }
        for (const e of t) {
          const t = e.targetId;
          if (!e.fromCache) {
            const e = n.Ts.get(t),
              r = e.snapshotVersion,
              i = e.withLastLimboFreeSnapshotVersion(r);
            n.Ts = n.Ts.insert(t, i);
          }
        }
      })(r.localStore, s));
  }
  async function Ku(e, t) {
    const n = ki(e);
    if (!n.currentUser.isEqual(t)) {
      bi("SyncEngine", "User change. New user:", t.toKey());
      const e = await Gc(n.localStore, t);
      (n.currentUser = t),
        (function (e) {
          e.Ga.forEach((e) => {
            e.forEach((e) => {
              e.reject(
                new Ri(
                  Ni.CANCELLED,
                  "'waitForPendingWrites' promise is rejected due to a user change.",
                ),
              );
            });
          }),
            e.Ga.clear();
        })(n),
        n.sharedClientState.handleUserChange(
          t,
          e.removedBatchIds,
          e.addedBatchIds,
        ),
        await Gu(n, e.Rs);
    }
  }
  function Wu(e) {
    const t = ki(e);
    return (
      (t.remoteStore.remoteSyncer.applySuccessfulWrite = $u.bind(null, t)),
      (t.remoteStore.remoteSyncer.rejectFailedWrite = Hu.bind(null, t)),
      t
    );
  }
  class Qu {
    constructor() {
      (this.kind = "memory"), (this.synchronizeTabs = !1);
    }
    async initialize(e) {
      (this.serializer = cu(e.databaseInfo.databaseId)),
        (this.sharedClientState = this.Za(e)),
        (this.persistence = this.Xa(e)),
        await this.persistence.start(),
        (this.localStore = this.eu(e)),
        (this.gcScheduler = this.tu(e, this.localStore)),
        (this.indexBackfillerScheduler = this.nu(e, this.localStore));
    }
    tu(e, t) {
      return null;
    }
    nu(e, t) {
      return null;
    }
    eu(e) {
      return (function (e, t, n, r) {
        return new qc(e, t, n, r);
      })(this.persistence, new zc(), e.initialUser, this.serializer);
    }
    Xa(e) {
      return new Vc(jc.ri, this.serializer);
    }
    Za(e) {
      return new Qc();
    }
    async terminate() {
      var e, t;
      null === (e = this.gcScheduler) || void 0 === e || e.stop(),
        null === (t = this.indexBackfillerScheduler) ||
          void 0 === t ||
          t.stop(),
        this.sharedClientState.shutdown(),
        await this.persistence.shutdown();
    }
  }
  Qu.provider = { build: () => new Qu() };
  class Xu extends Qu {
    constructor(e) {
      super(), (this.cacheSizeBytes = e);
    }
    tu(e, t) {
      Ai(this.persistence.referenceDelegate instanceof Bc);
      const n = this.persistence.referenceDelegate.garbageCollector;
      return new Tc(n, e.asyncQueue, t);
    }
    Xa(e) {
      const t =
        void 0 !== this.cacheSizeBytes
          ? wc.withCacheSize(this.cacheSizeBytes)
          : wc.DEFAULT;
      return new Vc((e) => Bc.ri(e, t), this.serializer);
    }
  }
  class Ju {
    async initialize(e, t) {
      this.localStore ||
        ((this.localStore = e.localStore),
        (this.sharedClientState = e.sharedClientState),
        (this.datastore = this.createDatastore(t)),
        (this.remoteStore = this.createRemoteStore(t)),
        (this.eventManager = this.createEventManager(t)),
        (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
        (this.sharedClientState.onlineStateHandler = (e) =>
          Bu(this.syncEngine, e, 1)),
        (this.remoteStore.remoteSyncer.handleCredentialChange = Ku.bind(
          null,
          this.syncEngine,
        )),
        await (async function (e, t) {
          const n = ki(e);
          t
            ? (n.W_.delete(2), await vu(n))
            : t || (n.W_.add(2), await wu(n), n.j_.set("Unknown"));
        })(this.remoteStore, this.syncEngine.isPrimaryClient));
    }
    createEventManager(e) {
      return new Mu();
    }
    createDatastore(e) {
      const t = cu(e.databaseInfo.databaseId),
        n = (function (e) {
          return new ou(e);
        })(e.databaseInfo);
      return (function (e, t, n, r) {
        return new pu(e, t, n, r);
      })(e.authCredentials, e.appCheckCredentials, n, t);
    }
    createRemoteStore(e) {
      return (function (e, t, n, r, i) {
        return new yu(e, t, n, r, i);
      })(
        this.localStore,
        this.datastore,
        e.asyncQueue,
        (e) => Bu(this.syncEngine, e, 0),
        Yc.D() ? new Yc() : new Xc(),
      );
    }
    createSyncEngine(e, t) {
      return (function (e, t, n, r, i, s, o) {
        const a = new ju(e, t, n, r, i, s);
        return o && (a.ja = !0), a;
      })(
        this.localStore,
        this.remoteStore,
        this.eventManager,
        this.sharedClientState,
        e.initialUser,
        e.maxConcurrentLimboResolutions,
        t,
      );
    }
    async terminate() {
      var e, t;
      await (async function (e) {
        const t = ki(e);
        bi(mu, "RemoteStore shutting down."),
          t.W_.add(5),
          await wu(t),
          t.z_.shutdown(),
          t.j_.set("Unknown");
      })(this.remoteStore),
        null === (e = this.datastore) || void 0 === e || e.terminate(),
        null === (t = this.eventManager) || void 0 === t || t.terminate();
    }
  }
  Ju.provider = { build: () => new Ju() };
  const Yu = "FirestoreClient";
  class Zu {
    constructor(e, t, n, r, i) {
      (this.authCredentials = e),
        (this.appCheckCredentials = t),
        (this.asyncQueue = n),
        (this.databaseInfo = r),
        (this.user = vi.UNAUTHENTICATED),
        (this.clientId = Bi.newId()),
        (this.authCredentialListener = () => Promise.resolve()),
        (this.appCheckCredentialListener = () => Promise.resolve()),
        (this._uninitializedComponentsProvider = i),
        this.authCredentials.start(n, async (e) => {
          bi(Yu, "Received user=", e.uid),
            await this.authCredentialListener(e),
            (this.user = e);
        }),
        this.appCheckCredentials.start(
          n,
          (e) => (
            bi(Yu, "Received new app check token=", e),
            this.appCheckCredentialListener(e, this.user)
          ),
        );
    }
    get configuration() {
      return {
        asyncQueue: this.asyncQueue,
        databaseInfo: this.databaseInfo,
        clientId: this.clientId,
        authCredentials: this.authCredentials,
        appCheckCredentials: this.appCheckCredentials,
        initialUser: this.user,
        maxConcurrentLimboResolutions: 100,
      };
    }
    setCredentialChangeListener(e) {
      this.authCredentialListener = e;
    }
    setAppCheckTokenChangeListener(e) {
      this.appCheckCredentialListener = e;
    }
    terminate() {
      this.asyncQueue.enterRestrictedMode();
      const e = new Oi();
      return (
        this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
          try {
            this._onlineComponents &&
              (await this._onlineComponents.terminate()),
              this._offlineComponents &&
                (await this._offlineComponents.terminate()),
              this.authCredentials.shutdown(),
              this.appCheckCredentials.shutdown(),
              e.resolve();
          } catch (t) {
            const n = xu(t, "Failed to shutdown persistence");
            e.reject(n);
          }
        }),
        e.promise
      );
    }
  }
  async function el(e, t) {
    e.asyncQueue.verifyOperationInProgress(),
      bi(Yu, "Initializing OfflineComponentProvider");
    const n = e.configuration;
    await t.initialize(n);
    let r = n.initialUser;
    e.setCredentialChangeListener(async (e) => {
      r.isEqual(e) || (await Gc(t.localStore, e), (r = e));
    }),
      t.persistence.setDatabaseDeletedListener(() => e.terminate()),
      (e._offlineComponents = t);
  }
  async function tl(e, t) {
    e.asyncQueue.verifyOperationInProgress();
    const n = await (async function (e) {
      if (!e._offlineComponents)
        if (e._uninitializedComponentsProvider) {
          bi(Yu, "Using user provided OfflineComponentProvider");
          try {
            await el(e, e._uninitializedComponentsProvider._offline);
          } catch (t) {
            const n = t;
            if (
              !(function (e) {
                return "FirebaseError" === e.name
                  ? e.code === Ni.FAILED_PRECONDITION ||
                      e.code === Ni.UNIMPLEMENTED
                  : !(
                      "undefined" != typeof DOMException &&
                      e instanceof DOMException
                    ) ||
                      22 === e.code ||
                      20 === e.code ||
                      11 === e.code;
              })(n)
            )
              throw n;
            Ti(
              "Error using user provided cache. Falling back to memory cache: " +
                n,
            ),
              await el(e, new Qu());
          }
        } else
          bi(Yu, "Using default OfflineComponentProvider"),
            await el(e, new Xu(void 0));
      return e._offlineComponents;
    })(e);
    bi(Yu, "Initializing OnlineComponentProvider"),
      await t.initialize(n, e.configuration),
      e.setCredentialChangeListener((e) => Pu(t.remoteStore, e)),
      e.setAppCheckTokenChangeListener((e, n) => Pu(t.remoteStore, n)),
      (e._onlineComponents = t);
  }
  function nl(e) {
    return (async function (e) {
      return (
        e._onlineComponents ||
          (e._uninitializedComponentsProvider
            ? (bi(Yu, "Using user provided OnlineComponentProvider"),
              await tl(e, e._uninitializedComponentsProvider._online))
            : (bi(Yu, "Using default OnlineComponentProvider"),
              await tl(e, new Ju()))),
        e._onlineComponents
      );
    })(e).then((e) => e.syncEngine);
  }
  function rl(e) {
    const t = {};
    return (
      void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t
    );
  }
  const il = new Map();
  function sl(e, t, n) {
    if (!n)
      throw new Ri(
        Ni.INVALID_ARGUMENT,
        `Function ${e}() cannot be called with an empty ${t}.`,
      );
  }
  function ol(e) {
    if (!ns.isDocumentKey(e))
      throw new Ri(
        Ni.INVALID_ARGUMENT,
        `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`,
      );
  }
  function al(e) {
    if (ns.isDocumentKey(e))
      throw new Ri(
        Ni.INVALID_ARGUMENT,
        `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`,
      );
  }
  function cl(e) {
    if (void 0 === e) return "undefined";
    if (null === e) return "null";
    if ("string" == typeof e)
      return (
        e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e)
      );
    if ("number" == typeof e || "boolean" == typeof e) return "" + e;
    if ("object" == typeof e) {
      if (e instanceof Array) return "an array";
      {
        const t = (function (e) {
          return e.constructor ? e.constructor.name : null;
        })(e);
        return t ? `a custom ${t} object` : "an object";
      }
    }
    return "function" == typeof e ? "a function" : Ci();
  }
  function ul(e, t) {
    if (("_delegate" in e && (e = e._delegate), !(e instanceof t))) {
      if (t.name === e.constructor.name)
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?",
        );
      {
        const n = cl(e);
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          `Expected type '${t.name}', but it was: ${n}`,
        );
      }
    }
    return e;
  }
  const ll = "firestore.googleapis.com",
    hl = !0;
  class dl {
    constructor(e) {
      var t, n;
      if (void 0 === e.host) {
        if (void 0 !== e.ssl)
          throw new Ri(
            Ni.INVALID_ARGUMENT,
            "Can't provide ssl option if host option is not set",
          );
        (this.host = ll), (this.ssl = hl);
      } else
        (this.host = e.host),
          (this.ssl = null !== (t = e.ssl) && void 0 !== t ? t : hl);
      if (
        ((this.credentials = e.credentials),
        (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
        (this.localCache = e.localCache),
        void 0 === e.cacheSizeBytes)
      )
        this.cacheSizeBytes = vc;
      else {
        if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
          throw new Ri(
            Ni.INVALID_ARGUMENT,
            "cacheSizeBytes must be at least 1048576",
          );
        this.cacheSizeBytes = e.cacheSizeBytes;
      }
      (function (e, t, n, r) {
        if (!0 === t && !0 === r)
          throw new Ri(
            Ni.INVALID_ARGUMENT,
            "experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.",
          );
      })(
        0,
        e.experimentalForceLongPolling,
        0,
        e.experimentalAutoDetectLongPolling,
      ),
        (this.experimentalForceLongPolling = !!e.experimentalForceLongPolling),
        this.experimentalForceLongPolling
          ? (this.experimentalAutoDetectLongPolling = !1)
          : void 0 === e.experimentalAutoDetectLongPolling
            ? (this.experimentalAutoDetectLongPolling = !0)
            : (this.experimentalAutoDetectLongPolling =
                !!e.experimentalAutoDetectLongPolling),
        (this.experimentalLongPollingOptions = rl(
          null !== (n = e.experimentalLongPollingOptions) && void 0 !== n
            ? n
            : {},
        )),
        (function (e) {
          if (void 0 !== e.timeoutSeconds) {
            if (isNaN(e.timeoutSeconds))
              throw new Ri(
                Ni.INVALID_ARGUMENT,
                `invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`,
              );
            if (e.timeoutSeconds < 5)
              throw new Ri(
                Ni.INVALID_ARGUMENT,
                `invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`,
              );
            if (e.timeoutSeconds > 30)
              throw new Ri(
                Ni.INVALID_ARGUMENT,
                `invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`,
              );
          }
        })(this.experimentalLongPollingOptions),
        (this.useFetchStreams = !!e.useFetchStreams);
    }
    isEqual(e) {
      return (
        this.host === e.host &&
        this.ssl === e.ssl &&
        this.credentials === e.credentials &&
        this.cacheSizeBytes === e.cacheSizeBytes &&
        this.experimentalForceLongPolling === e.experimentalForceLongPolling &&
        this.experimentalAutoDetectLongPolling ===
          e.experimentalAutoDetectLongPolling &&
        (function (e, t) {
          return e.timeoutSeconds === t.timeoutSeconds;
        })(
          this.experimentalLongPollingOptions,
          e.experimentalLongPollingOptions,
        ) &&
        this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
        this.useFetchStreams === e.useFetchStreams
      );
    }
  }
  class fl {
    constructor(e, t, n, r) {
      (this._authCredentials = e),
        (this._appCheckCredentials = t),
        (this._databaseId = n),
        (this._app = r),
        (this.type = "firestore-lite"),
        (this._persistenceKey = "(lite)"),
        (this._settings = new dl({})),
        (this._settingsFrozen = !1),
        (this._emulatorOptions = {}),
        (this._terminateTask = "notTerminated");
    }
    get app() {
      if (!this._app)
        throw new Ri(
          Ni.FAILED_PRECONDITION,
          "Firestore was not initialized using the Firebase SDK. 'app' is not available",
        );
      return this._app;
    }
    get _initialized() {
      return this._settingsFrozen;
    }
    get _terminated() {
      return "notTerminated" !== this._terminateTask;
    }
    _setSettings(e) {
      if (this._settingsFrozen)
        throw new Ri(
          Ni.FAILED_PRECONDITION,
          "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.",
        );
      (this._settings = new dl(e)),
        (this._emulatorOptions = e.emulatorOptions || {}),
        void 0 !== e.credentials &&
          (this._authCredentials = (function (e) {
            if (!e) return new Di();
            switch (e.type) {
              case "firstParty":
                return new Ui(
                  e.sessionIndex || "0",
                  e.iamToken || null,
                  e.authTokenFactory || null,
                );
              case "provider":
                return e.client;
              default:
                throw new Ri(
                  Ni.INVALID_ARGUMENT,
                  "makeAuthCredentialsProvider failed due to invalid credential type",
                );
            }
          })(e.credentials));
    }
    _getSettings() {
      return this._settings;
    }
    _getEmulatorOptions() {
      return this._emulatorOptions;
    }
    _freezeSettings() {
      return (this._settingsFrozen = !0), this._settings;
    }
    _delete() {
      return (
        "notTerminated" === this._terminateTask &&
          (this._terminateTask = this._terminate()),
        this._terminateTask
      );
    }
    async _restart() {
      "notTerminated" === this._terminateTask
        ? await this._terminate()
        : (this._terminateTask = "notTerminated");
    }
    toJSON() {
      return {
        app: this._app,
        databaseId: this._databaseId,
        settings: this._settings,
      };
    }
    _terminate() {
      return (
        (function (e) {
          const t = il.get(e);
          t &&
            (bi("ComponentProvider", "Removing Datastore"),
            il.delete(e),
            t.terminate());
        })(this),
        Promise.resolve()
      );
    }
  }
  class pl {
    constructor(e, t, n) {
      (this.converter = t),
        (this._query = n),
        (this.type = "query"),
        (this.firestore = e);
    }
    withConverter(e) {
      return new pl(this.firestore, e, this._query);
    }
  }
  class gl {
    constructor(e, t, n) {
      (this.converter = t),
        (this._key = n),
        (this.type = "document"),
        (this.firestore = e);
    }
    get _path() {
      return this._key.path;
    }
    get id() {
      return this._key.path.lastSegment();
    }
    get path() {
      return this._key.path.canonicalString();
    }
    get parent() {
      return new ml(this.firestore, this.converter, this._key.path.popLast());
    }
    withConverter(e) {
      return new gl(this.firestore, e, this._key);
    }
  }
  class ml extends pl {
    constructor(e, t, n) {
      super(
        e,
        t,
        (function (e) {
          return new Ko(e);
        })(n),
      ),
        (this._path = n),
        (this.type = "collection");
    }
    get id() {
      return this._query.path.lastSegment();
    }
    get path() {
      return this._query.path.canonicalString();
    }
    get parent() {
      const e = this._path.popLast();
      return e.isEmpty() ? null : new gl(this.firestore, null, new ns(e));
    }
    withConverter(e) {
      return new ml(this.firestore, e, this._path);
    }
  }
  function yl(e, t, ...n) {
    if (((e = b(e)), sl("collection", "path", t), e instanceof fl)) {
      const r = Zi.fromString(t, ...n);
      return al(r), new ml(e, null, r);
    }
    {
      if (!(e instanceof gl || e instanceof ml))
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore",
        );
      const r = e._path.child(Zi.fromString(t, ...n));
      return al(r), new ml(e.firestore, null, r);
    }
  }
  function vl(e, t, ...n) {
    if (
      ((e = b(e)),
      1 === arguments.length && (t = Bi.newId()),
      sl("doc", "path", t),
      e instanceof fl)
    ) {
      const r = Zi.fromString(t, ...n);
      return ol(r), new gl(e, null, new ns(r));
    }
    {
      if (!(e instanceof gl || e instanceof ml))
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore",
        );
      const r = e._path.child(Zi.fromString(t, ...n));
      return (
        ol(r),
        new gl(e.firestore, e instanceof ml ? e.converter : null, new ns(r))
      );
    }
  }
  const wl = "AsyncQueue";
  class _l {
    constructor(e = Promise.resolve()) {
      (this.Vu = []),
        (this.mu = !1),
        (this.fu = []),
        (this.gu = null),
        (this.pu = !1),
        (this.yu = !1),
        (this.wu = []),
        (this.a_ = new uu(this, "async_queue_retry")),
        (this.Su = () => {
          const e = au();
          e && bi(wl, "Visibility state changed to " + e.visibilityState),
            this.a_.t_();
        }),
        (this.bu = e);
      const t = au();
      t &&
        "function" == typeof t.addEventListener &&
        t.addEventListener("visibilitychange", this.Su);
    }
    get isShuttingDown() {
      return this.mu;
    }
    enqueueAndForget(e) {
      this.enqueue(e);
    }
    enqueueAndForgetEvenWhileRestricted(e) {
      this.Du(), this.vu(e);
    }
    enterRestrictedMode(e) {
      if (!this.mu) {
        (this.mu = !0), (this.yu = e || !1);
        const t = au();
        t &&
          "function" == typeof t.removeEventListener &&
          t.removeEventListener("visibilitychange", this.Su);
      }
    }
    enqueue(e) {
      if ((this.Du(), this.mu)) return new Promise(() => {});
      const t = new Oi();
      return this.vu(() =>
        this.mu && this.yu
          ? Promise.resolve()
          : (e().then(t.resolve, t.reject), t.promise),
      ).then(() => t.promise);
    }
    enqueueRetryable(e) {
      this.enqueueAndForget(() => (this.Vu.push(e), this.Cu()));
    }
    async Cu() {
      if (0 !== this.Vu.length) {
        try {
          await this.Vu[0](), this.Vu.shift(), this.a_.reset();
        } catch (e) {
          if (!us(e)) throw e;
          bi(wl, "Operation failed with retryable error: " + e);
        }
        this.Vu.length > 0 && this.a_.Xo(() => this.Cu());
      }
    }
    vu(e) {
      const t = this.bu.then(
        () => (
          (this.pu = !0),
          e()
            .catch((e) => {
              (this.gu = e), (this.pu = !1);
              const t = (function (e) {
                let t = e.message || "";
                return (
                  e.stack &&
                    (t = e.stack.includes(e.message)
                      ? e.stack
                      : e.message + "\n" + e.stack),
                  t
                );
              })(e);
              throw (Ii("INTERNAL UNHANDLED ERROR: ", t), e);
            })
            .then((e) => ((this.pu = !1), e))
        ),
      );
      return (this.bu = t), t;
    }
    enqueueAfterDelay(e, t, n) {
      this.Du(), this.wu.indexOf(e) > -1 && (t = 0);
      const r = Lu.createAndSchedule(this, e, t, n, (e) => this.Fu(e));
      return this.fu.push(r), r;
    }
    Du() {
      this.gu && Ci();
    }
    verifyOperationInProgress() {}
    async Mu() {
      let e;
      do {
        (e = this.bu), await e;
      } while (e !== this.bu);
    }
    xu(e) {
      for (const t of this.fu) if (t.timerId === e) return !0;
      return !1;
    }
    Ou(e) {
      return this.Mu().then(() => {
        this.fu.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
        for (const t of this.fu)
          if ((t.skipDelay(), "all" !== e && t.timerId === e)) break;
        return this.Mu();
      });
    }
    Nu(e) {
      this.wu.push(e);
    }
    Fu(e) {
      const t = this.fu.indexOf(e);
      this.fu.splice(t, 1);
    }
  }
  class El extends fl {
    constructor(e, t, n, r) {
      super(e, t, n, r),
        (this.type = "firestore"),
        (this._queue = new _l()),
        (this._persistenceKey = (null == r ? void 0 : r.name) || "[DEFAULT]");
    }
    async _terminate() {
      if (this._firestoreClient) {
        const e = this._firestoreClient.terminate();
        (this._queue = new _l(e)), (this._firestoreClient = void 0), await e;
      }
    }
  }
  function bl(e) {
    if (e._terminated)
      throw new Ri(
        Ni.FAILED_PRECONDITION,
        "The client has already been terminated.",
      );
    return (
      e._firestoreClient ||
        (function (e) {
          var t, n, r;
          const i = e._freezeSettings(),
            s = (function (e, t, n, r) {
              return new Qs(
                e,
                t,
                n,
                r.host,
                r.ssl,
                r.experimentalForceLongPolling,
                r.experimentalAutoDetectLongPolling,
                rl(r.experimentalLongPollingOptions),
                r.useFetchStreams,
              );
            })(
              e._databaseId,
              (null === (t = e._app) || void 0 === t
                ? void 0
                : t.options.appId) || "",
              e._persistenceKey,
              i,
            );
          e._componentsProvider ||
            ((null === (n = i.localCache) || void 0 === n
              ? void 0
              : n._offlineComponentProvider) &&
              (null === (r = i.localCache) || void 0 === r
                ? void 0
                : r._onlineComponentProvider) &&
              (e._componentsProvider = {
                _offline: i.localCache._offlineComponentProvider,
                _online: i.localCache._onlineComponentProvider,
              })),
            (e._firestoreClient = new Zu(
              e._authCredentials,
              e._appCheckCredentials,
              e._queue,
              s,
              e._componentsProvider &&
                (function (e) {
                  const t = null == e ? void 0 : e._online.build();
                  return {
                    _offline: null == e ? void 0 : e._offline.build(t),
                    _online: t,
                  };
                })(e._componentsProvider),
            ));
        })(e),
      e._firestoreClient
    );
  }
  class Il {
    constructor(e) {
      this._byteString = e;
    }
    static fromBase64String(e) {
      try {
        return new Il(Us.fromBase64String(e));
      } catch (e) {
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Failed to construct data from Base64 string: " + e,
        );
      }
    }
    static fromUint8Array(e) {
      return new Il(Us.fromUint8Array(e));
    }
    toBase64() {
      return this._byteString.toBase64();
    }
    toUint8Array() {
      return this._byteString.toUint8Array();
    }
    toString() {
      return "Bytes(base64: " + this.toBase64() + ")";
    }
    isEqual(e) {
      return this._byteString.isEqual(e._byteString);
    }
  }
  class Tl {
    constructor(...e) {
      for (let t = 0; t < e.length; ++t)
        if (0 === e[t].length)
          throw new Ri(
            Ni.INVALID_ARGUMENT,
            "Invalid field name at argument $(i + 1). Field names must not be empty.",
          );
      this._internalPath = new ts(e);
    }
    isEqual(e) {
      return this._internalPath.isEqual(e._internalPath);
    }
  }
  class Sl {
    constructor(e) {
      this._methodName = e;
    }
  }
  class Cl {
    constructor(e, t) {
      if (!isFinite(e) || e < -90 || e > 90)
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Latitude must be a number between -90 and 90, but was: " + e,
        );
      if (!isFinite(t) || t < -180 || t > 180)
        throw new Ri(
          Ni.INVALID_ARGUMENT,
          "Longitude must be a number between -180 and 180, but was: " + t,
        );
      (this._lat = e), (this._long = t);
    }
    get latitude() {
      return this._lat;
    }
    get longitude() {
      return this._long;
    }
    isEqual(e) {
      return this._lat === e._lat && this._long === e._long;
    }
    toJSON() {
      return { latitude: this._lat, longitude: this._long };
    }
    _compareTo(e) {
      return $i(this._lat, e._lat) || $i(this._long, e._long);
    }
  }
  class Al {
    constructor(e) {
      this._values = (e || []).map((e) => e);
    }
    toArray() {
      return this._values.map((e) => e);
    }
    isEqual(e) {
      return (function (e, t) {
        if (e.length !== t.length) return !1;
        for (let n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
        return !0;
      })(this._values, e._values);
    }
  }
  const kl = /^__.*__$/;
  class Nl {
    constructor(e, t, n) {
      (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
    }
    toMutation(e, t) {
      return null !== this.fieldMask
        ? new Ba(e, this.data, this.fieldMask, t, this.fieldTransforms)
        : new ja(e, this.data, t, this.fieldTransforms);
    }
  }
  function Rl(e) {
    switch (e) {
      case 0:
      case 2:
      case 1:
        return !0;
      case 3:
      case 4:
        return !1;
      default:
        throw Ci();
    }
  }
  class Ol {
    constructor(e, t, n, r, i, s) {
      (this.settings = e),
        (this.databaseId = t),
        (this.serializer = n),
        (this.ignoreUndefinedProperties = r),
        void 0 === i && this.Bu(),
        (this.fieldTransforms = i || []),
        (this.fieldMask = s || []);
    }
    get path() {
      return this.settings.path;
    }
    get Lu() {
      return this.settings.Lu;
    }
    ku(e) {
      return new Ol(
        Object.assign(Object.assign({}, this.settings), e),
        this.databaseId,
        this.serializer,
        this.ignoreUndefinedProperties,
        this.fieldTransforms,
        this.fieldMask,
      );
    }
    qu(e) {
      var t;
      const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
        r = this.ku({ path: n, Qu: !1 });
      return r.$u(e), r;
    }
    Uu(e) {
      var t;
      const n = null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
        r = this.ku({ path: n, Qu: !1 });
      return r.Bu(), r;
    }
    Ku(e) {
      return this.ku({ path: void 0, Qu: !0 });
    }
    Wu(e) {
      return Bl(
        e,
        this.settings.methodName,
        this.settings.Gu || !1,
        this.path,
        this.settings.zu,
      );
    }
    contains(e) {
      return (
        void 0 !== this.fieldMask.find((t) => e.isPrefixOf(t)) ||
        void 0 !== this.fieldTransforms.find((t) => e.isPrefixOf(t.field))
      );
    }
    Bu() {
      if (this.path)
        for (let e = 0; e < this.path.length; e++) this.$u(this.path.get(e));
    }
    $u(e) {
      if (0 === e.length) throw this.Wu("Document fields must not be empty");
      if (Rl(this.Lu) && kl.test(e))
        throw this.Wu('Document fields cannot begin and end with "__"');
    }
  }
  class Pl {
    constructor(e, t, n) {
      (this.databaseId = e),
        (this.ignoreUndefinedProperties = t),
        (this.serializer = n || cu(e));
    }
    ju(e, t, n, r = !1) {
      return new Ol(
        { Lu: e, methodName: t, zu: n, path: ts.emptyPath(), Qu: !1, Gu: r },
        this.databaseId,
        this.serializer,
        this.ignoreUndefinedProperties,
      );
    }
  }
  function Dl(e) {
    const t = e._freezeSettings(),
      n = cu(e._databaseId);
    return new Pl(e._databaseId, !!t.ignoreUndefinedProperties, n);
  }
  function Ll(e, t, n, r, i, s = {}) {
    const o = e.ju(s.merge || s.mergeFields ? 2 : 0, t, n, i);
    Vl("Data must be an object, but it was:", o, r);
    const a = Ml(r, o);
    let c, u;
    if (s.merge) (c = new xs(o.fieldMask)), (u = o.fieldTransforms);
    else if (s.mergeFields) {
      const e = [];
      for (const r of s.mergeFields) {
        const i = Fl(t, r, n);
        if (!o.contains(i))
          throw new Ri(
            Ni.INVALID_ARGUMENT,
            `Field '${i}' is specified in your field mask but missing from your input data.`,
          );
        $l(e, i) || e.push(i);
      }
      (c = new xs(e)), (u = o.fieldTransforms.filter((e) => c.covers(e.field)));
    } else (c = null), (u = o.fieldTransforms);
    return new Nl(new wo(a), c, u);
  }
  function xl(e, t) {
    if (Ul((e = b(e)))) return Vl("Unsupported field value:", t, e), Ml(e, t);
    if (e instanceof Sl)
      return (
        (function (e, t) {
          if (!Rl(t.Lu))
            throw t.Wu(
              `${e._methodName}() can only be used with update() and set()`,
            );
          if (!t.path)
            throw t.Wu(
              `${e._methodName}() is not currently supported inside arrays`,
            );
          const n = e._toFieldTransform(t);
          n && t.fieldTransforms.push(n);
        })(e, t),
        null
      );
    if (void 0 === e && t.ignoreUndefinedProperties) return null;
    if ((t.path && t.fieldMask.push(t.path), e instanceof Array)) {
      if (t.settings.Qu && 4 !== t.Lu)
        throw t.Wu("Nested arrays are not supported");
      return (function (e, t) {
        const n = [];
        let r = 0;
        for (const i of e) {
          let e = xl(i, t.Ku(r));
          null == e && (e = { nullValue: "NULL_VALUE" }), n.push(e), r++;
        }
        return { arrayValue: { values: n } };
      })(e, t);
    }
    return (function (e, t) {
      if (null === (e = b(e))) return { nullValue: "NULL_VALUE" };
      if ("number" == typeof e) return va(t.serializer, e);
      if ("boolean" == typeof e) return { booleanValue: e };
      if ("string" == typeof e) return { stringValue: e };
      if (e instanceof Date) {
        const n = Qi.fromDate(e);
        return { timestampValue: Za(t.serializer, n) };
      }
      if (e instanceof Qi) {
        const n = new Qi(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
        return { timestampValue: Za(t.serializer, n) };
      }
      if (e instanceof Cl)
        return {
          geoPointValue: { latitude: e.latitude, longitude: e.longitude },
        };
      if (e instanceof Il)
        return { bytesValue: ec(t.serializer, e._byteString) };
      if (e instanceof gl) {
        const n = t.databaseId,
          r = e.firestore._databaseId;
        if (!r.isEqual(n))
          throw t.Wu(
            `Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`,
          );
        return {
          referenceValue: rc(
            e.firestore._databaseId || t.databaseId,
            e._key.path,
          ),
        };
      }
      if (e instanceof Al)
        return (function (e, t) {
          return {
            mapValue: {
              fields: {
                [Ys]: { stringValue: to },
                [no]: {
                  arrayValue: {
                    values: e.toArray().map((e) => {
                      if ("number" != typeof e)
                        throw t.Wu(
                          "VectorValues must only contain numeric values.",
                        );
                      return ma(t.serializer, e);
                    }),
                  },
                },
              },
            },
          };
        })(e, t);
      throw t.Wu(`Unsupported field value: ${cl(e)}`);
    })(e, t);
  }
  function Ml(e, t) {
    const n = {};
    return (
      Ns(e)
        ? t.path && t.path.length > 0 && t.fieldMask.push(t.path)
        : ks(e, (e, r) => {
            const i = xl(r, t.qu(e));
            null != i && (n[e] = i);
          }),
      { mapValue: { fields: n } }
    );
  }
  function Ul(e) {
    return !(
      "object" != typeof e ||
      null === e ||
      e instanceof Array ||
      e instanceof Date ||
      e instanceof Qi ||
      e instanceof Cl ||
      e instanceof Il ||
      e instanceof gl ||
      e instanceof Sl ||
      e instanceof Al
    );
  }
  function Vl(e, t, n) {
    if (
      !Ul(n) ||
      !(function (e) {
        return (
          "object" == typeof e &&
          null !== e &&
          (Object.getPrototypeOf(e) === Object.prototype ||
            null === Object.getPrototypeOf(e))
        );
      })(n)
    ) {
      const r = cl(n);
      throw "an object" === r
        ? t.Wu(e + " a custom object")
        : t.Wu(e + " " + r);
    }
  }
  function Fl(e, t, n) {
    if ((t = b(t)) instanceof Tl) return t._internalPath;
    if ("string" == typeof t)
      return (function (e, t, n) {
        if (t.search(jl) >= 0)
          throw Bl(
            `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,
            e,
            !1,
            void 0,
            n,
          );
        try {
          return new Tl(...t.split("."))._internalPath;
        } catch (r) {
          throw Bl(
            `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
            e,
            !1,
            void 0,
            n,
          );
        }
      })(e, t);
    throw Bl(
      "Field path arguments must be of type string or ",
      e,
      !1,
      void 0,
      n,
    );
  }
  const jl = new RegExp("[~\\*/\\[\\]]");
  function Bl(e, t, n, r, i) {
    const s = r && !r.isEmpty(),
      o = void 0 !== i;
    let a = `Function ${t}() called with invalid data`;
    n && (a += " (via `toFirestore()`)"), (a += ". ");
    let c = "";
    return (
      (s || o) &&
        ((c += " (found"),
        s && (c += ` in field ${r}`),
        o && (c += ` in document ${i}`),
        (c += ")")),
      new Ri(Ni.INVALID_ARGUMENT, a + e + c)
    );
  }
  function $l(e, t) {
    return e.some((e) => e.isEqual(t));
  }
  function Hl(e, t, n) {
    e = ul(e, gl);
    const r = ul(e.firestore, El),
      i = (function (e, t, n) {
        let r;
        return (
          (r = e
            ? n && (n.merge || n.mergeFields)
              ? e.toFirestore(t, n)
              : e.toFirestore(t)
            : t),
          r
        );
      })(e.converter, t, n);
    return (function (e, t) {
      return (function (e, t) {
        const n = new Oi();
        return (
          e.asyncQueue.enqueueAndForget(async () =>
            (async function (e, t, n) {
              const r = Wu(e);
              try {
                const e = await (function (e, t) {
                  const n = ki(e),
                    r = Qi.now(),
                    i = t.reduce((e, t) => e.add(t.key), pa());
                  let s, o;
                  return n.persistence
                    .runTransaction(
                      "Locally write mutations",
                      "readwrite",
                      (e) => {
                        let a = sa(),
                          c = pa();
                        return n.ds
                          .getEntries(e, i)
                          .next((e) => {
                            (a = e),
                              a.forEach((e, t) => {
                                t.isValidDocument() || (c = c.add(e));
                              });
                          })
                          .next(() =>
                            n.localDocuments.getOverlayedDocuments(e, a),
                          )
                          .next((i) => {
                            s = i;
                            const o = [];
                            for (const e of t) {
                              const t = Va(e, s.get(e.key).overlayedDocument);
                              null != t &&
                                o.push(
                                  new Ba(
                                    e.key,
                                    t,
                                    _o(t.value.mapValue),
                                    Pa.exists(!0),
                                  ),
                                );
                            }
                            return n.mutationQueue.addMutationBatch(e, r, o, t);
                          })
                          .next((t) => {
                            o = t;
                            const r = t.applyToLocalDocumentSet(s, c);
                            return n.documentOverlayCache.saveOverlays(
                              e,
                              t.batchId,
                              r,
                            );
                          });
                      },
                    )
                    .then(() => ({ batchId: o.batchId, changes: ca(s) }));
                })(r.localStore, t);
                r.sharedClientState.addPendingMutation(e.batchId),
                  (function (e, t, n) {
                    let r = e.Wa[e.currentUser.toKey()];
                    r || (r = new Rs($i)),
                      (r = r.insert(t, n)),
                      (e.Wa[e.currentUser.toKey()] = r);
                  })(r, e.batchId, n),
                  await Gu(r, e.changes),
                  await Iu(r.remoteStore);
              } catch (e) {
                const t = xu(e, "Failed to persist write");
                n.reject(t);
              }
            })(await nl(e), t, n),
          ),
          n.promise
        );
      })(bl(e), t);
    })(r, [
      Ll(Dl(r), "setDoc", e._key, i, null !== e.converter, n).toMutation(
        e._key,
        Pa.none(),
      ),
    ]);
  }
  new WeakMap(),
    (function (e, t = !0) {
      !(function (e) {
        wi = e;
      })(Ue),
        Pe(
          new I(
            "firestore",
            (e, { instanceIdentifier: n, options: r }) => {
              const i = e.getProvider("app").getImmediate(),
                s = new El(
                  new xi(e.getProvider("auth-internal")),
                  new Fi(i, e.getProvider("app-check-internal")),
                  (function (e, t) {
                    if (
                      !Object.prototype.hasOwnProperty.apply(e.options, [
                        "projectId",
                      ])
                    )
                      throw new Ri(
                        Ni.INVALID_ARGUMENT,
                        '"projectId" not provided in firebase.initializeApp.',
                      );
                    return new Js(e.options.projectId, t);
                  })(i, n),
                  i,
                );
              return (
                (r = Object.assign({ useFetchStreams: t }, r)),
                s._setSettings(r),
                s
              );
            },
            "PUBLIC",
          ).setMultipleInstances(!0),
        ),
        je(mi, yi, e),
        je(mi, yi, "esm2017");
    })();
  var zl = Ve({
      apiKey: "AIzaSyD3S7QjWcwvN9QPb-lWaV7EXyIKW-BOkv0",
      authDomain: "weight-tracker-2eee6.firebaseapp.com",
      projectId: "weight-tracker-2eee6",
      storageBucket: "weight-tracker-2eee6.firebasestorage.app",
      messagingSenderId: "415805786895",
      appId: "1:415805786895:web:db9a80ba5e44fa7bcf8c7a",
    }),
    ql = (function (e = Fe()) {
      const t = De(e, "auth");
      if (t.isInitialized()) return t.getImmediate();
      const n = (function (e, t) {
          const n = De(e, "auth");
          if (n.isInitialized()) {
            const e = n.getImmediate();
            if (g(n.getOptions(), null != t ? t : {})) return e;
            tt(e, "already-initialized");
          }
          return n.initialize({ options: t });
        })(e, { popupRedirectResolver: Xr, persistence: [pr, Jn, Zn] }),
        r = u("authTokenSyncURL");
      if (r && "boolean" == typeof isSecureContext && isSecureContext) {
        const e = new URL(r, location.origin);
        if (location.origin === e.origin) {
          const t =
            ((i = e.toString()),
            async (e) => {
              const t = e && (await e.getIdTokenResult()),
                n =
                  t &&
                  (new Date().getTime() - Date.parse(t.issuedAtTime)) / 1e3;
              if (n && n > ei) return;
              const r = null == t ? void 0 : t.token;
              ti !== r &&
                ((ti = r),
                await fetch(i, {
                  method: r ? "POST" : "DELETE",
                  headers: r ? { Authorization: `Bearer ${r}` } : {},
                }));
            });
          !(function (e, t, n) {
            b(e).beforeAuthStateChanged(t, n);
          })(n, t, () => t(n.currentUser)),
            (function (e) {
              b(e).onIdTokenChanged((e) => t(e), void 0, void 0);
            })(n);
        }
      }
      var i;
      const s = a("auth");
      return (
        s &&
          (function (e, t, n) {
            const r = cn(e);
            ot(/^https?:\/\//.test(t), r, "invalid-emulator-scheme");
            const i = !!(null == n ? void 0 : n.disableWarnings),
              s = wn(t),
              { host: o, port: a } = (function (e) {
                const t = wn(e),
                  n = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
                if (!n) return { host: "", port: null };
                const r = n[2].split("@").pop() || "",
                  i = /^(\[[^\]]+\])(:|$)/.exec(r);
                if (i) {
                  const e = i[1];
                  return { host: e, port: _n(r.substr(e.length + 1)) };
                }
                {
                  const [e, t] = r.split(":");
                  return { host: e, port: _n(t) };
                }
              })(t),
              c = { url: `${s}//${o}${null === a ? "" : `:${a}`}/` },
              u = Object.freeze({
                host: o,
                port: a,
                protocol: s.replace(":", ""),
                options: Object.freeze({ disableWarnings: i }),
              });
            if (!r._canInitEmulator)
              return (
                ot(
                  r.config.emulator && r.emulatorConfig,
                  r,
                  "emulator-config-failed",
                ),
                void ot(
                  g(c, r.config.emulator) && g(u, r.emulatorConfig),
                  r,
                  "emulator-config-failed",
                )
              );
            (r.config.emulator = c),
              (r.emulatorConfig = u),
              (r.settings.appVerificationDisabledForTesting = !0),
              i ||
                (function () {
                  function e() {
                    const e = document.createElement("p"),
                      t = e.style;
                    (e.innerText =
                      "Running in emulator mode. Do not use with production credentials."),
                      (t.position = "fixed"),
                      (t.width = "100%"),
                      (t.backgroundColor = "#ffffff"),
                      (t.border = ".1em solid #000000"),
                      (t.color = "#b50000"),
                      (t.bottom = "0px"),
                      (t.left = "0px"),
                      (t.margin = "0px"),
                      (t.zIndex = "10000"),
                      (t.textAlign = "center"),
                      e.classList.add("firebase-emulator-warning"),
                      document.body.appendChild(e);
                  }
                  "undefined" != typeof console &&
                    "function" == typeof console.info &&
                    console.info(
                      "WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.",
                    ),
                    "undefined" != typeof window &&
                      "undefined" != typeof document &&
                      ("loading" === document.readyState
                        ? window.addEventListener("DOMContentLoaded", e)
                        : e());
                })();
          })(n, `http://${s}`),
        n
      );
    })(zl),
    Gl = (function (e) {
      const t = "object" == typeof e ? e : Fe(),
        n = "string" == typeof e ? e : Xs,
        r = De(t, "firestore").getImmediate({ identifier: n });
      if (!r._initialized) {
        const e = (() => {
          const e = a("firestore");
          if (!e) return;
          const t = e.lastIndexOf(":");
          if (t <= 0 || t + 1 === e.length)
            throw new Error(
              `Invalid host ${e} with no separate hostname and port!`,
            );
          const n = parseInt(e.substring(t + 1), 10);
          return "[" === e[0]
            ? [e.substring(1, t - 1), n]
            : [e.substring(0, t), n];
        })();
        e &&
          (function (e, t, n, r = {}) {
            var s;
            const o = (e = ul(e, fl))._getSettings(),
              a = Object.assign(Object.assign({}, o), {
                emulatorOptions: e._getEmulatorOptions(),
              }),
              c = `${t}:${n}`;
            o.host !== ll &&
              o.host !== c &&
              Ti(
                "Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.",
              );
            const u = Object.assign(Object.assign({}, o), {
              host: c,
              ssl: !1,
              emulatorOptions: r,
            });
            if (!g(u, a) && (e._setSettings(u), r.mockUserToken)) {
              let t, n;
              if ("string" == typeof r.mockUserToken)
                (t = r.mockUserToken), (n = vi.MOCK_USER);
              else {
                t = (function (e, t) {
                  if (e.uid)
                    throw new Error(
                      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.',
                    );
                  const n = t || "demo-project",
                    r = e.iat || 0,
                    s = e.sub || e.user_id;
                  if (!s)
                    throw new Error(
                      "mockUserToken must contain 'sub' or 'user_id' field!",
                    );
                  const o = Object.assign(
                    {
                      iss: `https://securetoken.google.com/${n}`,
                      aud: n,
                      iat: r,
                      exp: r + 3600,
                      auth_time: r,
                      sub: s,
                      user_id: s,
                      firebase: { sign_in_provider: "custom", identities: {} },
                    },
                    e,
                  );
                  return [
                    i(JSON.stringify({ alg: "none", type: "JWT" })),
                    i(JSON.stringify(o)),
                    "",
                  ].join(".");
                })(
                  r.mockUserToken,
                  null === (s = e._app) || void 0 === s
                    ? void 0
                    : s.options.projectId,
                );
                const o = r.mockUserToken.sub || r.mockUserToken.user_id;
                if (!o)
                  throw new Ri(
                    Ni.INVALID_ARGUMENT,
                    "mockUserToken must contain 'sub' or 'user_id' field!",
                  );
                n = new vi(o);
              }
              e._authCredentials = new Li(new Pi(t, n));
            }
          })(r, ...e);
      }
      return r;
    })(zl);
  function Kl(e) {
    return (
      (Kl =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      Kl(e)
    );
  }
  function Wl() {
    Wl = function () {
      return t;
    };
    var e,
      t = {},
      n = Object.prototype,
      r = n.hasOwnProperty,
      i =
        Object.defineProperty ||
        function (e, t, n) {
          e[t] = n.value;
        },
      s = "function" == typeof Symbol ? Symbol : {},
      o = s.iterator || "@@iterator",
      a = s.asyncIterator || "@@asyncIterator",
      c = s.toStringTag || "@@toStringTag";
    function u(e, t, n) {
      return (
        Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        e[t]
      );
    }
    try {
      u({}, "");
    } catch (e) {
      u = function (e, t, n) {
        return (e[t] = n);
      };
    }
    function l(e, t, n, r) {
      var s = t && t.prototype instanceof y ? t : y,
        o = Object.create(s.prototype),
        a = new R(r || []);
      return i(o, "_invoke", { value: C(e, n, a) }), o;
    }
    function h(e, t, n) {
      try {
        return { type: "normal", arg: e.call(t, n) };
      } catch (e) {
        return { type: "throw", arg: e };
      }
    }
    t.wrap = l;
    var d = "suspendedStart",
      f = "suspendedYield",
      p = "executing",
      g = "completed",
      m = {};
    function y() {}
    function v() {}
    function w() {}
    var _ = {};
    u(_, o, function () {
      return this;
    });
    var E = Object.getPrototypeOf,
      b = E && E(E(O([])));
    b && b !== n && r.call(b, o) && (_ = b);
    var I = (w.prototype = y.prototype = Object.create(_));
    function T(e) {
      ["next", "throw", "return"].forEach(function (t) {
        u(e, t, function (e) {
          return this._invoke(t, e);
        });
      });
    }
    function S(e, t) {
      function n(i, s, o, a) {
        var c = h(e[i], e, s);
        if ("throw" !== c.type) {
          var u = c.arg,
            l = u.value;
          return l && "object" == Kl(l) && r.call(l, "__await")
            ? t.resolve(l.__await).then(
                function (e) {
                  n("next", e, o, a);
                },
                function (e) {
                  n("throw", e, o, a);
                },
              )
            : t.resolve(l).then(
                function (e) {
                  (u.value = e), o(u);
                },
                function (e) {
                  return n("throw", e, o, a);
                },
              );
        }
        a(c.arg);
      }
      var s;
      i(this, "_invoke", {
        value: function (e, r) {
          function i() {
            return new t(function (t, i) {
              n(e, r, t, i);
            });
          }
          return (s = s ? s.then(i, i) : i());
        },
      });
    }
    function C(t, n, r) {
      var i = d;
      return function (s, o) {
        if (i === p) throw Error("Generator is already running");
        if (i === g) {
          if ("throw" === s) throw o;
          return { value: e, done: !0 };
        }
        for (r.method = s, r.arg = o; ; ) {
          var a = r.delegate;
          if (a) {
            var c = A(a, r);
            if (c) {
              if (c === m) continue;
              return c;
            }
          }
          if ("next" === r.method) r.sent = r._sent = r.arg;
          else if ("throw" === r.method) {
            if (i === d) throw ((i = g), r.arg);
            r.dispatchException(r.arg);
          } else "return" === r.method && r.abrupt("return", r.arg);
          i = p;
          var u = h(t, n, r);
          if ("normal" === u.type) {
            if (((i = r.done ? g : f), u.arg === m)) continue;
            return { value: u.arg, done: r.done };
          }
          "throw" === u.type &&
            ((i = g), (r.method = "throw"), (r.arg = u.arg));
        }
      };
    }
    function A(t, n) {
      var r = n.method,
        i = t.iterator[r];
      if (i === e)
        return (
          (n.delegate = null),
          ("throw" === r &&
            t.iterator.return &&
            ((n.method = "return"),
            (n.arg = e),
            A(t, n),
            "throw" === n.method)) ||
            ("return" !== r &&
              ((n.method = "throw"),
              (n.arg = new TypeError(
                "The iterator does not provide a '" + r + "' method",
              )))),
          m
        );
      var s = h(i, t.iterator, n.arg);
      if ("throw" === s.type)
        return (n.method = "throw"), (n.arg = s.arg), (n.delegate = null), m;
      var o = s.arg;
      return o
        ? o.done
          ? ((n[t.resultName] = o.value),
            (n.next = t.nextLoc),
            "return" !== n.method && ((n.method = "next"), (n.arg = e)),
            (n.delegate = null),
            m)
          : o
        : ((n.method = "throw"),
          (n.arg = new TypeError("iterator result is not an object")),
          (n.delegate = null),
          m);
    }
    function k(e) {
      var t = { tryLoc: e[0] };
      1 in e && (t.catchLoc = e[1]),
        2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
        this.tryEntries.push(t);
    }
    function N(e) {
      var t = e.completion || {};
      (t.type = "normal"), delete t.arg, (e.completion = t);
    }
    function R(e) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        e.forEach(k, this),
        this.reset(!0);
    }
    function O(t) {
      if (t || "" === t) {
        var n = t[o];
        if (n) return n.call(t);
        if ("function" == typeof t.next) return t;
        if (!isNaN(t.length)) {
          var i = -1,
            s = function n() {
              for (; ++i < t.length; )
                if (r.call(t, i)) return (n.value = t[i]), (n.done = !1), n;
              return (n.value = e), (n.done = !0), n;
            };
          return (s.next = s);
        }
      }
      throw new TypeError(Kl(t) + " is not iterable");
    }
    return (
      (v.prototype = w),
      i(I, "constructor", { value: w, configurable: !0 }),
      i(w, "constructor", { value: v, configurable: !0 }),
      (v.displayName = u(w, c, "GeneratorFunction")),
      (t.isGeneratorFunction = function (e) {
        var t = "function" == typeof e && e.constructor;
        return (
          !!t && (t === v || "GeneratorFunction" === (t.displayName || t.name))
        );
      }),
      (t.mark = function (e) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(e, w)
            : ((e.__proto__ = w), u(e, c, "GeneratorFunction")),
          (e.prototype = Object.create(I)),
          e
        );
      }),
      (t.awrap = function (e) {
        return { __await: e };
      }),
      T(S.prototype),
      u(S.prototype, a, function () {
        return this;
      }),
      (t.AsyncIterator = S),
      (t.async = function (e, n, r, i, s) {
        void 0 === s && (s = Promise);
        var o = new S(l(e, n, r, i), s);
        return t.isGeneratorFunction(n)
          ? o
          : o.next().then(function (e) {
              return e.done ? e.value : o.next();
            });
      }),
      T(I),
      u(I, c, "Generator"),
      u(I, o, function () {
        return this;
      }),
      u(I, "toString", function () {
        return "[object Generator]";
      }),
      (t.keys = function (e) {
        var t = Object(e),
          n = [];
        for (var r in t) n.push(r);
        return (
          n.reverse(),
          function e() {
            for (; n.length; ) {
              var r = n.pop();
              if (r in t) return (e.value = r), (e.done = !1), e;
            }
            return (e.done = !0), e;
          }
        );
      }),
      (t.values = O),
      (R.prototype = {
        constructor: R,
        reset: function (t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = e),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = e),
            this.tryEntries.forEach(N),
            !t)
          )
            for (var n in this)
              "t" === n.charAt(0) &&
                r.call(this, n) &&
                !isNaN(+n.slice(1)) &&
                (this[n] = e);
        },
        stop: function () {
          this.done = !0;
          var e = this.tryEntries[0].completion;
          if ("throw" === e.type) throw e.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var n = this;
          function i(r, i) {
            return (
              (a.type = "throw"),
              (a.arg = t),
              (n.next = r),
              i && ((n.method = "next"), (n.arg = e)),
              !!i
            );
          }
          for (var s = this.tryEntries.length - 1; s >= 0; --s) {
            var o = this.tryEntries[s],
              a = o.completion;
            if ("root" === o.tryLoc) return i("end");
            if (o.tryLoc <= this.prev) {
              var c = r.call(o, "catchLoc"),
                u = r.call(o, "finallyLoc");
              if (c && u) {
                if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                if (this.prev < o.finallyLoc) return i(o.finallyLoc);
              } else if (c) {
                if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
              } else {
                if (!u) throw Error("try statement without catch or finally");
                if (this.prev < o.finallyLoc) return i(o.finallyLoc);
              }
            }
          }
        },
        abrupt: function (e, t) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var i = this.tryEntries[n];
            if (
              i.tryLoc <= this.prev &&
              r.call(i, "finallyLoc") &&
              this.prev < i.finallyLoc
            ) {
              var s = i;
              break;
            }
          }
          s &&
            ("break" === e || "continue" === e) &&
            s.tryLoc <= t &&
            t <= s.finallyLoc &&
            (s = null);
          var o = s ? s.completion : {};
          return (
            (o.type = e),
            (o.arg = t),
            s
              ? ((this.method = "next"), (this.next = s.finallyLoc), m)
              : this.complete(o)
          );
        },
        complete: function (e, t) {
          if ("throw" === e.type) throw e.arg;
          return (
            "break" === e.type || "continue" === e.type
              ? (this.next = e.arg)
              : "return" === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === e.type && t && (this.next = t),
            m
          );
        },
        finish: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.finallyLoc === e)
              return this.complete(n.completion, n.afterLoc), N(n), m;
          }
        },
        catch: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.tryLoc === e) {
              var r = n.completion;
              if ("throw" === r.type) {
                var i = r.arg;
                N(n);
              }
              return i;
            }
          }
          throw Error("illegal catch attempt");
        },
        delegateYield: function (t, n, r) {
          return (
            (this.delegate = { iterator: O(t), resultName: n, nextLoc: r }),
            "next" === this.method && (this.arg = e),
            m
          );
        },
      }),
      t
    );
  }
  function Ql(e, t, n, r, i, s, o) {
    try {
      var a = e[s](o),
        c = a.value;
    } catch (e) {
      return void n(e);
    }
    a.done ? t(c) : Promise.resolve(c).then(r, i);
  }
  function Xl(e) {
    return function () {
      var t = this,
        n = arguments;
      return new Promise(function (r, i) {
        var s = e.apply(t, n);
        function o(e) {
          Ql(s, r, i, o, a, "next", e);
        }
        function a(e) {
          Ql(s, r, i, o, a, "throw", e);
        }
        o(void 0);
      });
    };
  }
  console.log("hello from login.js");
  var Jl = document.getElementById("signUpBtn"),
    Yl = document.getElementById("signInButton"),
    Zl = document.getElementById("signUpLink"),
    eh = document.getElementById("signInLink"),
    th = document.getElementById("signIn"),
    nh = document.getElementById("signup"),
    rh = document.getElementById("passwordReset");
  function ih(e, t, n) {
    var r = document.getElementById("divId"),
      i = document.getElementById("loginDivId");
    null !== n
      ? (i.classList.add(
          "bg-red-100",
          "border",
          "border-red-400",
          "text-red-700",
          "px-4",
          "py-3",
          "rounded",
          "relative",
        ),
        (i.style.display = "block"),
        (i.innerHTML = e),
        (i.style.opacity = 1))
      : (r.classList.add(
          "bg-red-100",
          "border",
          "border-red-400",
          "text-red-700",
          "px-4",
          "py-3",
          "rounded",
          "relative",
        ),
        (r.style.display = "block"),
        (r.innerHTML = e),
        (r.style.opacity = 1));
  }
  Zl.addEventListener("click", function () {
    th.classList.toggle("hidden"), nh.classList.toggle("hidden");
  }),
    eh.addEventListener("click", function () {
      th.classList.toggle("hidden"), nh.classList.toggle("hidden");
    }),
    rh.addEventListener("click", function () {
      alert("Functionality to be implemented");
    }),
    Jl &&
      Jl.addEventListener(
        "click",
        (function () {
          var e = Xl(
            Wl().mark(function e(t) {
              var n, r, i, s, o, a, c, u;
              return Wl().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          (t.preventDefault(),
                          (n = document
                            .getElementById("signUpName")
                            .value.trim()),
                          (r = document
                            .getElementById("signUpEmail")
                            .value.trim()),
                          (i = document
                            .getElementById("signUpPassword")
                            .value.trim()),
                          n && r && i)
                        ) {
                          e.next = 7;
                          break;
                        }
                        return (
                          ih("All fields are required!", 0, null),
                          e.abrupt("return")
                        );
                      case 7:
                        return (e.prev = 7), (e.next = 10), qn(ql, r, i);
                      case 10:
                        return (
                          (s = e.sent),
                          (o = s.user),
                          (a = { name: n, email: r, createdAt: new Date() }),
                          (c = vl(Gl, "users", o.uid)),
                          (e.next = 16),
                          Hl(c, a)
                        );
                      case 16:
                        (u = yl(Gl, "users", o.uid, "weights")),
                          console.log("Collection Path:", u.path),
                          (window.location.href = "index.html"),
                          (e.next = 25);
                        break;
                      case 21:
                        (e.prev = 21),
                          (e.t0 = e.catch(7)),
                          console.error("Error:", e.t0),
                          "auth/email-already-in-use" === e.t0.code
                            ? ih("Email address already exists!", 0, null)
                            : "auth/weak-password" === e.t0.code
                              ? ih(
                                  " Password should be at least 6 characters!",
                                  0,
                                  null,
                                )
                              : (console.error("Sign in error:", e.t0),
                                ih("Unable to create user", 0, null));
                      case 25:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[7, 21]],
              );
            }),
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
      ),
    Yl &&
      Yl.addEventListener(
        "click",
        (function () {
          var e = Xl(
            Wl().mark(function e(t) {
              var n, r;
              return Wl().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          (t.preventDefault(),
                          (n = document
                            .getElementById("signInEmail")
                            .value.trim()),
                          (r = document
                            .getElementById("signInPassword")
                            .value.trim()),
                          n && r)
                        ) {
                          e.next = 6;
                          break;
                        }
                        return (
                          ih("All fields are required!"), e.abrupt("return")
                        );
                      case 6:
                        return (e.prev = 6), (e.next = 9), Gn(ql, n, r);
                      case 9:
                        e.sent.user,
                          (window.location.href = "/dashboard.html"),
                          (e.next = 17);
                        break;
                      case 14:
                        (e.prev = 14),
                          (e.t0 = e.catch(6)),
                          "auth/invalid-credential" === e.t0.code
                            ? ih("Incorrect Email or Password", 0, "login")
                            : "auth/user-not-found" === e.t0.code
                              ? ih(
                                  "No account found with this email",
                                  0,
                                  "login",
                                )
                              : "auth/too-many-requests" === e.t0.code
                                ? ih(
                                    "Too many failed attempts. Try again later.",
                                    0,
                                    "login",
                                  )
                                : (console.error("Sign in error:", e.t0),
                                  ih(
                                    "Something went wrong. Please try again.",
                                    0,
                                    "login",
                                  ));
                      case 17:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[6, 14]],
              );
            }),
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
      );
})();
