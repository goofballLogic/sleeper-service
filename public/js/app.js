/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* eslint no-console: 0 */
/* global Rollbar */

exports.default = undefined;
var log = exports.log = console.log.bind(console);
var logError = exports.logError = function logError() {
    var _Rollbar, _console;

    (_Rollbar = Rollbar).error.apply(_Rollbar, arguments);
    (_console = console).error.apply(_console, arguments);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = __webpack_require__(2);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _localStore = __webpack_require__(7);

var _localStore2 = _interopRequireDefault(_localStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _providers = new WeakMap();
var chosenKeys = new WeakMap();

function findProvider(owner) {

    var chosenKey = chosenKeys.get(owner);
    var chosen = _localStore2.default.getItem(chosenKey);
    return _providers.get(owner).find(function (x) {
        return x.key === chosen;
    });
}

var Service = function (_EventEmitter) {
    _inherits(Service, _EventEmitter);

    function Service(availableProviders, chosenKey, requiredFunctions) {
        _classCallCheck(this, Service);

        var _this = _possibleConstructorReturn(this, (Service.__proto__ || Object.getPrototypeOf(Service)).call(this));

        availableProviders.forEach(function (p) {
            return p.verifyInterface(requiredFunctions);
        });
        _providers.set(_this, availableProviders);
        chosenKeys.set(_this, chosenKey);
        _this.provider = findProvider(_this);

        return _this;
    }

    _createClass(Service, [{
        key: "providers",
        value: function providers() {

            return (_providers.get(this) || []).map(function (p) {
                return p.describe();
            });
        }
    }, {
        key: "ensureProvider",
        value: function ensureProvider() {

            if (!this.provider) return Promise.reject(new Error("No provider selected"));
            return Promise.resolve(this.provider);
        }
    }, {
        key: "select",
        value: function select(provider) {

            var chosenKey = chosenKeys.get(this);
            _localStore2.default.setItem(chosenKey, provider.key);
            findProvider(this);
        }
    }, {
        key: "deselect",
        value: function deselect() {

            var chosenKey = chosenKeys.get(this);
            _localStore2.default.removeItem(chosenKey);
            findProvider(this);
        }
    }]);

    return Service;
}(_tinyEmitter2.default);

exports.default = Service;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function E() {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    liveEvents.length ? e[name] = liveEvents : delete e[name];

    return this;
  }
};

module.exports = E;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _providerBase = __webpack_require__(10);

var _providerBase2 = _interopRequireDefault(_providerBase);

var _config = __webpack_require__(4);

var _config2 = _interopRequireDefault(_config);

var _shared = __webpack_require__(11);

var _diagnostics = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document */


var loadFlag = false;
var loadError = void 0;

if (typeof document === "undefined") throw new Error("document is undefined");
document.addEventListener("google-api-loaded", function () {

    (0, _shared.init)(_config2.default.gapi).then(function () {

        loadFlag = true;
    }).catch(function (ex) {

        loadError = ex;
    });
});

function waitFor(condition, timeout, description) {

    if (timeout <= 0) return Promise.reject(new Error("Timed out " + description));
    if (condition()) return Promise.resolve(true);
    var newTimeout = timeout - 100;
    return new Promise(function (resolve, reject) {
        return setTimeout(function () {
            return waitFor(condition, newTimeout, description).then(resolve, reject);
        }, 100);
    });
}

var Provider = function (_ProviderBase) {
    _inherits(Provider, _ProviderBase);

    function Provider(description) {
        _classCallCheck(this, Provider);

        return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, "gapi", description));
    }

    _createClass(Provider, [{
        key: "status",
        value: function status() {
            // eslint-disable-line class-methods-use-this

            return { loaded: loadFlag, loadError: loadError };
        }
    }, {
        key: "waitForLoad",
        value: function waitForLoad() {
            var _this2 = this;

            if (loadFlag) return Promise.resolve();
            (0, _diagnostics.log)("Provider loading...", this);
            return waitFor(function () {
                return loadFlag;
            }, 5000).then(function () {

                (0, _diagnostics.log)("Provider loading complete", _this2);
            });
        }
    }]);

    return Provider;
}(_providerBase2.default);

exports.default = Provider;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window */
exports.default = window["sleeper-service-config"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _identity = __webpack_require__(6);

var _identity2 = _interopRequireDefault(_identity);

var _capabilities = __webpack_require__(8);

var _capabilities2 = _interopRequireDefault(_capabilities);

var _identity3 = __webpack_require__(9);

var _identity4 = _interopRequireDefault(_identity3);

var _capabilities3 = __webpack_require__(12);

var _capabilities4 = _interopRequireDefault(_capabilities3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global document */

if (typeof document === "undefined") throw new Error("document is not defined");

document.addEventListener("locate-services", function (e) {

    e.detail(null, {

        identity: new _identity2.default([_identity4.default]),
        capabilities: new _capabilities2.default([_capabilities4.default])

    });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = __webpack_require__(1);

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var requiredFunctions = ["current", "authorize", "deauthorize"];
var chosenKey = "chosen-identity-provider";

var IdentityService = function (_Service) {
    _inherits(IdentityService, _Service);

    function IdentityService(providers) {
        _classCallCheck(this, IdentityService);

        return _possibleConstructorReturn(this, (IdentityService.__proto__ || Object.getPrototypeOf(IdentityService)).call(this, providers, chosenKey, requiredFunctions));
    }

    _createClass(IdentityService, [{
        key: "current",
        value: function current() {

            return this.ensureProvider().then(function (p) {
                return p.current();
            });
        }
    }, {
        key: "signIn",
        value: function signIn() {
            var _this2 = this;

            return this.ensureProvider().then(function (p) {
                return p.authorize();
            }).then(function () {
                return _this2.current();
            });
        }
    }, {
        key: "signOut",
        value: function signOut() {
            var _this3 = this;

            return this.ensureProvider().then(function (p) {
                return p.deauthorize();
            }).then(function () {
                return _this3.current();
            });
        }
    }]);

    return IdentityService;
}(_service2.default);

exports.default = IdentityService;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window */
exports.default = window.localStorage;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = __webpack_require__(1);

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chosenKey = "chosen-capabilities-provider";
var requiredFunctions = ["clear", "verifyList", "verifyStore", "verifyGet", "verifyDelete", "verifyProjects"];

var CapabilitiesService = function (_Service) {
    _inherits(CapabilitiesService, _Service);

    function CapabilitiesService(providers) {
        _classCallCheck(this, CapabilitiesService);

        return _possibleConstructorReturn(this, (CapabilitiesService.__proto__ || Object.getPrototypeOf(CapabilitiesService)).call(this, providers, chosenKey, requiredFunctions));
    }

    _createClass(CapabilitiesService, [{
        key: "clear",
        value: function clear() {

            return this.ensureProvider().then(function (p) {
                return p.clear();
            }).then(function () {
                return true;
            });
        }
    }, {
        key: "verifyStorage",
        value: function verifyStorage() {

            return this.ensureProvider().then(function (p) {
                return Promise.all([p.verifyList(), p.verifyStore(), p.verifyGet(), p.verifyDelete()]).then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 4),
                        canList = _ref2[0],
                        canStore = _ref2[1],
                        canGet = _ref2[2],
                        canDelete = _ref2[3];

                    return {

                        canList: canList,
                        canStore: canStore,
                        canGet: canGet,
                        canDelete: canDelete

                    };
                });
            });
        }
    }, {
        key: "verifyProjectRepo",
        value: function verifyProjectRepo() {

            return this.ensureProvider().then(function (p) {
                return Promise.all([p.verifyProjects()]).then(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 1),
                        _ref4$ = _ref4[0],
                        canListProjects = _ref4$.canListProjects,
                        canDeleteProjects = _ref4$.canDeleteProjects,
                        canCreateProjects = _ref4$.canCreateProjects;

                    return {

                        canListProjects: canListProjects,
                        canDeleteProjects: canDeleteProjects,
                        canCreateProjects: canCreateProjects

                    };
                });
            });
        }
    }]);

    return CapabilitiesService;
}(_service2.default);

exports.default = CapabilitiesService;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provider = __webpack_require__(3);

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global gapi */

function buildIdentity(p) {

    var auth = gapi.auth2.getAuthInstance();
    var signedIn = auth.isSignedIn.get();
    var profile = signedIn ? auth.currentUser.get().getBasicProfile() : undefined;
    var name = signedIn && profile ? profile.getName() : undefined;
    var userId = signedIn && profile ? profile.getEmail() : undefined;
    var provider = Object.assign(p.describe(), p.status());
    return {

        provider: provider, signedIn: signedIn, userId: userId, name: name

    };
}

function signout(resolve, reject) {

    var auth = gapi.auth2.getAuthInstance();
    return auth.signOut().then(resolve, reject);
}

function signin(resolve, reject) {

    var auth = gapi.auth2.getAuthInstance();
    auth.signIn().then(function () {
        return resolve(Date.now());
    }, function (x) {
        return reject(x.error || x);
    });
}

var GoogleIdentity = function (_Provider) {
    _inherits(GoogleIdentity, _Provider);

    function GoogleIdentity() {
        _classCallCheck(this, GoogleIdentity);

        return _possibleConstructorReturn(this, (GoogleIdentity.__proto__ || Object.getPrototypeOf(GoogleIdentity)).call(this, "Your Google identity (e.g. gmail)"));
    }

    _createClass(GoogleIdentity, [{
        key: "current",
        value: function current() {
            var _this2 = this;

            return new Promise(function (resolve) {
                return resolve(buildIdentity(_this2));
            });
        }
    }, {
        key: "authorize",
        value: function authorize() {
            // eslint-disable-line class-methods-use-this

            return new Promise(signin);
        }
    }, {
        key: "deauthorize",
        value: function deauthorize() {
            // eslint-disable-line class-methods-use-this

            return new Promise(signout);
        }
    }]);

    return GoogleIdentity;
}(_provider2.default);

exports.default = new GoogleIdentity();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = __webpack_require__(2);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Provider = function (_EventEmitter) {
    _inherits(Provider, _EventEmitter);

    function Provider(key, description) {
        _classCallCheck(this, Provider);

        var _this = _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this));

        _this.name = _this.constructor.name;
        _this.key = key;
        _this.description = description;

        return _this;
    }

    _createClass(Provider, [{
        key: "verifyInterface",
        value: function verifyInterface(functions) {
            var _this2 = this;

            functions.forEach(function (func) {

                var maybeFunction = _this2[func];
                if (typeof maybeFunction !== "function") {

                    var provider = _this2.constructor.name;
                    throw new Error("Provider " + provider + " does not provide function '" + func + "' (" + maybeFunction + ")");
                }
            });
        }
    }, {
        key: "describe",
        value: function describe() {
            var key = this.key,
                name = this.name,
                description = this.description;

            return { key: key, name: name, description: description };
        }
    }]);

    return Provider;
}(_tinyEmitter2.default);

exports.default = Provider;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
/* global gapi */

var SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly", "https://www.googleapis.com/auth/drive.file"].join(" ");

function initAuthClient(config, resolve, reject) {

    var options = {

        apiKey: config.API_KEY,
        clientId: config.CLIENT_ID,
        scope: config.SCOPES || SCOPES

    };
    gapi.load("client:auth2", function () {
        return gapi.client.init(options).then(resolve, reject);
    });
}

function tryInitAuthClient(config, resolve, reject) {

    try {

        initAuthClient(config, resolve, reject);
    } catch (e) {

        reject(e);
    }
}

exports.default = undefined;
function init(config) {

    var naga = tryInitAuthClient.bind(null, config);
    return new Promise(naga);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global fetch */

var _provider = __webpack_require__(3);

var _provider2 = _interopRequireDefault(_provider);

var _Data = __webpack_require__(13);

var _Data2 = _interopRequireDefault(_Data);

var _Repo = __webpack_require__(14);

var _Repo2 = _interopRequireDefault(_Repo);

var _config = __webpack_require__(4);

var _config2 = _interopRequireDefault(_config);

var _diagnostics = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appName = _config2.default.appName;

var storageVerifications = new WeakMap();

var sameItems = function sameItems(as, bs) {
    return as.length === bs.length && as.every(function (x) {
        return ~bs.indexOf(x);
    });
};
var sameJSON = function sameJSON(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
};
var postfix = function postfix(x, postfixes) {
    return postfixes.map(function (p) {
        return x + "__" + p;
    });
};

function expect409Error(err) {

    if (err.code !== 409) {

        throw new Error("Expected a 409 rejection of non-overwrite request, but got " + err);
    }
}

function promiseAllTruthy(promises) {

    return Promise.all(promises.map(function (p) {
        return p.catch(_diagnostics.logError);
    })).then(function (results) {

        var fails = results.map(function (x, i) {

            if (x) return null;
            return promises[i];
        }).filter(function (x) {
            return x;
        });
        return fails.length ? Promise.reject(fails) : Promise.resolve();
    });
}

function verifyCanStore(data, testName, testContent) {

    var overwriteTestName = testName + "-preexisting";
    return promiseAllTruthy([data.save(testName, testContent).then(function () {
        return data.load(testName);
    }).then(function (content) {
        return sameJSON(testContent, content);
    }), data.save(overwriteTestName, 42).then(function () {
        return data.save(overwriteTestName, 42, { overwrite: false });
    }).then(function () {

        throw new Error("Failed to reject non-overwrite request");
    }).catch(expect409Error).then(function () {
        return true;
    })]).catch(function () {
        return false;
    });
}

function deleteListing(data, listing) {

    return promiseAllTruthy(listing.map(function (x) {
        return data.permDelete(x);
    }));
}

function generateDummies(data, names) {

    return promiseAllTruthy(names.map(function (x) {
        return data.save(x, "hello, dummy");
    }));
}

function verifyDataCanList(data, testName) {

    var listTestName = testName + "__list";
    var listTestNames = postfix(listTestName, [1, 2, 3]);
    return data.list(listTestName).then(function (listing) {
        return deleteListing(data, listing);
    }).then(function () {
        return generateDummies(data, listTestNames);
    }).then(function () {
        return data.list(listTestName);
    }).then(function (listing) {
        return sameItems(listing.map(function (x) {
            return x.name;
        }), listTestNames);
    });
}

function verifyDataCanDelete(data, testName) {

    var deleteTestName = testName + "__delete";
    return data.save(deleteTestName, "stuff").then(function (fileSpec) {
        return data.permDelete(fileSpec).then(function () {
            return data.load(fileSpec);
        });
    }).catch(function (err) {
        return (0, _diagnostics.logError)(err) || Promise.resolve(err.code === 404);
    });
}

function deleteAll(data, testName) {

    return data.list(testName).then(function (listing) {
        return promiseAllTruthy(listing.map(function (x) {
            return data.permDelete(x);
        }));
    });
}

function verifyData(data, testName, testContent) {

    var dataTestName = testName + "__data";
    var result = {
        canList: undefined,
        canStore: undefined,
        canDelete: undefined,
        canGet: undefined
    };
    return verifyCanStore(data, dataTestName, testContent).then(function (canStore) {

        result.canStore = result.canGet = canStore;
        if (!canStore) return null;
        return Promise.all([verifyDataCanList(data, dataTestName), verifyDataCanDelete(data, dataTestName)]).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                canList = _ref2[0],
                canDelete = _ref2[1];

            result.canList = canList;
            result.canDelete = canDelete;
        });
    }).then(function () {
        return result;
    });
}

function verifyRepo(repo, testName) {

    var repoTestName = testName + "__repo";
    var result = {

        canListProjects: undefined,
        canCreateProjects: undefined,
        canDeleteProjects: undefined

    };
    var testProjects = postfix(repoTestName, [1, 2]);
    return Promise.all(testProjects.map(function (x) {
        return repo.deleteProject(x);
    })).then(function () {
        return Promise.all(testProjects.map(function (x) {
            return repo.createProject(x);
        }));
    }).then(function () {
        return repo.listProjects();
    }).then(function (listing) {

        result.canListProjects = testProjects.every(function (x) {
            return ~listing.indexOf(x);
        });
        if (!result.canListProjects) throw new Error("Can't list/create projects");
        result.canCreateProjects = true;
    }).then(function () {
        return repo.deleteProject(testProjects[0]).then(function () {
            return repo.listProjects();
        }).then(function (listing) {

            result.canDeleteProjects = !~listing.indexOf(testProjects[0]);
        });
    }).catch(function (ex) {

        (0, _diagnostics.logError)(ex);
        result.ex = ex;
    }).then(function () {
        return result;
    });
}

function verifyStorage(data, repo, testName, testContent) {

    function cleanup() {

        deleteAll(data, testName).catch(function (err) {
            return (0, _diagnostics.logError)("Cleaning up after self test", err);
        });
    }
    return Promise.all([verifyData(data, testName, testContent), verifyRepo(repo, testName)]).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            dataResults = _ref4[0],
            repoResults = _ref4[1];

        cleanup();
        return { data: dataResults, repo: repoResults };
    }).catch(function (ex) {

        cleanup();
        throw ex;
    });
}

function initStorageVerifications(owner) {

    var fetchTestData = fetch("/public/data/notshaka.json").then(function (res) {
        return res.json();
    });
    var buildData = _Data2.default.inFolder(appName);
    var buildRepo = buildData.then(function (d) {
        return new _Repo2.default(d);
    });
    var testName = "__temp_testing_" + appName;
    (0, _diagnostics.log)("Verify all storage...", owner);
    return Promise.all([buildData, buildRepo, fetchTestData]).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 3),
            data = _ref6[0],
            repo = _ref6[1],
            testData = _ref6[2];

        return verifyStorage(data, repo, testName, testData);
    }).then(function (verification) {
        return storageVerifications.set(owner, verification);
    }).then(function () {

        (0, _diagnostics.log)("Verify all storage complete", owner);
        return storageVerifications.get(owner);
    });
}

function verifyAllStorage(owner) {

    return owner.waitForLoad().then(function () {
        return storageVerifications.get(owner) || storageVerifications.set(owner, initStorageVerifications(owner)).get(owner);
    }); // eslint-disable-line function-paren-newline
}

var GoogleCapabilities = function (_Provider) {
    _inherits(GoogleCapabilities, _Provider);

    function GoogleCapabilities() {
        _classCallCheck(this, GoogleCapabilities);

        return _possibleConstructorReturn(this, (GoogleCapabilities.__proto__ || Object.getPrototypeOf(GoogleCapabilities)).call(this, "Your Google Drive storage"));
    }

    _createClass(GoogleCapabilities, [{
        key: "clear",
        value: function clear() {

            storageVerifications.delete(this);
            return Promise.resolve();
        }
    }, {
        key: "verifyList",
        value: function verifyList() {

            return verifyAllStorage(this).then(function (_ref7) {
                var data = _ref7.data;
                return !!data.canList;
            });
        }
    }, {
        key: "verifyStore",
        value: function verifyStore() {

            return verifyAllStorage(this).then(function (_ref8) {
                var data = _ref8.data;
                return !!data.canStore;
            });
        }
    }, {
        key: "verifyGet",
        value: function verifyGet() {

            return verifyAllStorage(this).then(function (_ref9) {
                var data = _ref9.data;
                return !!data.canGet;
            });
        }
    }, {
        key: "verifyDelete",
        value: function verifyDelete() {

            return verifyAllStorage(this).then(function (_ref10) {
                var data = _ref10.data;
                return !!data.canDelete;
            });
        }
    }, {
        key: "verifyProjects",
        value: function verifyProjects() {

            return verifyAllStorage(this).then(function (_ref11) {
                var repo = _ref11.repo;
                return repo;
            });
        }
    }]);

    return GoogleCapabilities;
}(_provider2.default);

exports.default = new GoogleCapabilities();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global gapi */

var _diagnostics = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filesAPI = "https://www.googleapis.com/drive/v3/files";
var uploadAPI = "https://content.googleapis.com/upload/drive/v3/files";
var folderMimeType = "application/vnd.google-apps.folder";
var boundary = "......";
var multiPartMimeType = "multipart/related; boundary=" + boundary;
var dataMimeType = "application/json";
var JSONcontentType = "application/json; charset=UTF-8";

var FileSpec = function () {
    function FileSpec(_ref) {
        var id = _ref.id,
            name = _ref.name;

        _classCallCheck(this, FileSpec);

        this.id = id;
        this.name = name;
    }

    _createClass(FileSpec, null, [{
        key: "build",
        value: function build(thing) {

            return new FileSpec(thing);
        }
    }]);

    return FileSpec;
}();

var counter = 0;

function request(options) {

    var defaultedOptions = Object.assign({ method: "GET", path: filesAPI }, options);
    (0, _diagnostics.log)("GAPI request", ++counter, defaultedOptions);
    return new Promise(function (resolve, reject) {
        return gapi.client.request(defaultedOptions).then(resolve, reject);
    });
}

function createFolder(name) {

    var mimeType = folderMimeType;
    var body = { name: name, mimeType: mimeType };
    var method = "POST";
    return request({ method: method, body: body });
}

function firstOrNull(list) {
    var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
        return x;
    };


    if (list && list.length) return transform(list[0]);
    return null;
}
function ensureFolder(name) {

    var q = "name='" + name + "' and mimeType='" + folderMimeType + "' and trashed=false";
    var params = { q: q };
    return request({ params: params }).then(function (res) {
        return res.result.files;
    }).then(firstOrNull).then(function (maybeFolder) {
        return maybeFolder || createFolder(name);
    }).then(FileSpec.build);
}

function dumbDownPrefix(prefix) {

    var ret = prefix;
    // API doesn't like dashes for some reason
    var dashIndex = ret.indexOf("-");
    if (~dashIndex) ret = ret.substring(0, dashIndex);
    // API doesn't like more than ~20 characters for some reason
    if (ret.length > 20) ret = ret.substring(0, 20);
    return ret;
}
function listFilesInFolder(folder, maybePrefix) {

    var q = "mimeType='" + dataMimeType + "' and trashed=false";
    var nameFilter = function nameFilter() {
        return true;
    };
    if (maybePrefix) {

        var apiPrefix = dumbDownPrefix(maybePrefix);
        if (apiPrefix !== maybePrefix) {

            nameFilter = function nameFilter(x) {
                return x.name.indexOf(maybePrefix) === 0;
            };
        }
        q = "name contains '" + apiPrefix + "' and " + q;
    }
    var pageSize = 1000;
    var params = { q: q, pageSize: pageSize };
    return request({ params: params }).then(function (res) {
        return res.result.files;
    }).then(function (files) {
        return files.filter(nameFilter).map(FileSpec.build);
    });
}

function findFileInFolder(folder, maybeSpec) {

    if (maybeSpec instanceof FileSpec) {

        return Promise.resolve(maybeSpec);
    }

    var _ref2 = folder || {},
        id = _ref2.id;

    var q = "name='" + maybeSpec + "' and '" + id + "' in parents and mimeType='" + dataMimeType + "' and trashed=false";
    var params = { q: q };
    return request({ params: params }).then(function (res) {
        return res.result.files;
    }).then(function (files) {
        return firstOrNull(files, function (file) {
            return FileSpec.build(file);
        });
    });
}

function JSONpart(obj) {

    return "\r\nContent-Type: " + JSONcontentType + "\r\n\r\n" + JSON.stringify(obj, null, 1);
}

function multipart() {

    var partStart = "\r\n--" + boundary;
    var partEnd = partStart + "--";

    for (var _len = arguments.length, parts = Array(_len), _key = 0; _key < _len; _key++) {
        parts[_key] = arguments[_key];
    }

    return partStart + parts.join(partStart) + partEnd;
}

function createInFolder(folder, name, data) {

    var method = "POST";
    var headers = { "Content-Type": multiPartMimeType };
    var params = { uploadType: "multipart" };
    var metadata = { parents: [folder.id], name: name };
    var body = multipart(JSONpart(metadata), JSONpart(data));
    var path = uploadAPI;
    return request({

        path: path, method: method, params: params, headers: headers, body: body

    });
}

function updateInFolder(folder, file, data) {

    var method = "PATCH";
    var params = { uploadType: "media" };
    var mimeType = dataMimeType;
    var body = JSON.stringify(data);
    var path = uploadAPI + "/" + file.id;
    return request({

        path: path, method: method, params: params, mimeType: mimeType, body: body

    });
}

function throwAlreadyExists(file) {

    var err = new Error("File already exists: " + file.id + " " + file.name);
    err.code = 409;
    throw err;
}

function saveInFolder(folder, maybeSpec, data) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var overwrite = options.overwrite;

    return findFileInFolder(folder, maybeSpec).then(function (maybeFile) {

        if (maybeFile && !overwrite) throwAlreadyExists(maybeFile);
        if (maybeFile) return updateInFolder(folder, maybeFile, data);
        return createInFolder(folder, maybeSpec, data);
    }).then(function (res) {
        return FileSpec.build(res.result);
    });
}

function loadFromFolder(folder, maybeSpec) {

    return findFileInFolder(folder, maybeSpec).then(function (maybeFile) {

        if (maybeFile) return maybeFile;
        var err = new Error();
        err.error = { code: 404 };
        throw err;
    }).then(function (file) {

        var path = filesAPI + "/" + file.id;
        var params = { alt: "media" };
        return request({ path: path, params: params });
    }).catch(function (ex) {
        return Promise.reject(ex && ex.result && ex.result.error || ex);
    }).then(function (res) {
        return res.result;
    });
}

function deleteFromFolder(folder, maybeSpec) {

    return findFileInFolder(folder, maybeSpec).then(function (maybeFile) {

        if (!maybeFile) return Promise.resolve({ code: 404 });
        var path = filesAPI + "/" + maybeFile.id;
        var method = "DELETE";
        return request({ method: method, path: path });
    });
}

function cleanUpError(err) {

    if (err.code) return Promise.reject(err);
    if (err.result) {

        console.error("WTF am i supposed to do with this? " + JSON.stringify(err.result, null, 3)); // eslint-disable-line no-console
    }
    console.error(err); // eslint-disable-line no-console
    var cleanError = new Error(err.body || err.statusText || "Unknown error");
    cleanError.err = err;
    cleanError.code = err.status || 500;
    return Promise.reject(cleanError);
}

var Data = function () {
    _createClass(Data, null, [{
        key: "inFolder",


        /**
         * builds a Data repository for the named folder
         * if the folder doesn't already exist, creates it
         * @param {string} folderName the name of the folder for which to build
         * @returns {Data} the data repository
         */
        value: function inFolder(folderName) {

            return Promise.resolve().then(function () {
                return ensureFolder(folderName);
            }).then(function (folderSpec) {
                return new Data(folderSpec);
            });
        }

        /**
         * Make a Data repository for files stored in the specified folder
         * @param {FileSpec} folderSpec the folder containing files to operate on
         */

    }]);

    function Data(folderSpec) {
        _classCallCheck(this, Data);

        this.folder = folderSpec;
    }

    /**
     * Returns a list of all data files in this folder (JSON files)
     * @param {object} [maybePrefix] if specified, only files with the specified
     * prefix are returned
     * @returns {Promise} promise to list the files in this folder
     */


    _createClass(Data, [{
        key: "list",
        value: function list(maybePrefix) {

            return listFilesInFolder(this.folder, maybePrefix).catch(cleanUpError);
        }

        /**
         * Saves the specified data in a data file with the specified name
         * @param {string} name the name of the file
         * @param {object} data the data to save (will be JSON stringified)
         * @param {object} [options] save options
         * @param {string} options.overwrite if True will check if file exists and
         * return an error with code 409
         * @returns {Promise} promise to save the file
         */

    }, {
        key: "save",
        value: function save(name, data, options) {

            return saveInFolder(this.folder, name, data, options).catch(cleanUpError);
        }

        /**
         * Retrieves the specified data in a data file with the specified name/spec
         * @param {string|FileSpec} maybeSpec the name or FileSpec of the file to load
         * @return {object} Promise to load the file specified
         */

    }, {
        key: "load",
        value: function load(maybeSpec) {

            return loadFromFolder(this.folder, maybeSpec).catch(cleanUpError);
        }

        /**
         * Permenantly deletes the data file with the specified name/spec. The file
         * is not recoverable from the recycle bin. If the data file is already
         * gone, resolves with { code: 404 }
         * @param {string|FileSpec} maybeSpec the name or FileSpec of the file to delete
         * @return {object} Promise to delete the file
         */

    }, {
        key: "permDelete",
        value: function permDelete(maybeSpec) {

            return deleteFromFolder(this.folder, maybeSpec).catch(cleanUpError);
        }
    }]);

    return Data;
}();

exports.default = Data;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filename = function filename(name) {
    return name + "_project.json";
};
var filenamePattern = /^(.*)_project\.json$/;

var Repo = function () {

    /**
     * Makes a project repository for the given data repository
     * @param {object} data the data repository
     */
    function Repo(data) {
        _classCallCheck(this, Repo);

        this.data = data;
    }

    /**
     * Create a project with the specified name
     * @param {string} name the name of the project
     * @return {object} Promise to create the proejct
     */


    _createClass(Repo, [{
        key: "createProject",
        value: function createProject(name) {

            var project = [];
            return this.data.save(filename(name), project, { overwrite: false });
        }

        /**
         * Permanently deletes the named project
         * @param {string} name the name of the project
         * @return {object} Promise to delete the project
         */

    }, {
        key: "deleteProject",
        value: function deleteProject(name) {

            return this.data.permDelete(filename(name));
        }

        /**
         * Lists the projects in this repository
         * @return {object} Promise of listing of project names
         */

    }, {
        key: "listProjects",
        value: function listProjects() {

            return this.data.list().then(function (listing) {
                return listing.map(function (_ref) {
                    var name = _ref.name;
                    return filenamePattern.exec(name);
                }).filter(function (x) {
                    return x;
                }).map(function (_ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2),
                        name = _ref3[1];

                    return name;
                });
            });
        }
    }]);

    return Repo;
}();

exports.default = Repo;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWRhZTY0YjliNWY5NTk2ZTI4OGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RpYWdub3N0aWNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlcnZpY2VzL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9sb2NhbC1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvY2FwYWJpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wcm92aWRlci1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9jYXBhYmlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvc3RvcmUvRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9zdG9yZS9SZXBvLmpzIl0sIm5hbWVzIjpbInVuZGVmaW5lZCIsImxvZyIsImNvbnNvbGUiLCJiaW5kIiwibG9nRXJyb3IiLCJlcnJvciIsInByb3ZpZGVycyIsIldlYWtNYXAiLCJjaG9zZW5LZXlzIiwiZmluZFByb3ZpZGVyIiwib3duZXIiLCJjaG9zZW5LZXkiLCJnZXQiLCJjaG9zZW4iLCJnZXRJdGVtIiwiZmluZCIsIngiLCJrZXkiLCJTZXJ2aWNlIiwiYXZhaWxhYmxlUHJvdmlkZXJzIiwicmVxdWlyZWRGdW5jdGlvbnMiLCJmb3JFYWNoIiwicCIsInZlcmlmeUludGVyZmFjZSIsInNldCIsInByb3ZpZGVyIiwibWFwIiwiZGVzY3JpYmUiLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJyZXNvbHZlIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJFIiwicHJvdG90eXBlIiwib24iLCJuYW1lIiwiY2FsbGJhY2siLCJjdHgiLCJlIiwicHVzaCIsImZuIiwib25jZSIsInNlbGYiLCJsaXN0ZW5lciIsIm9mZiIsImFwcGx5IiwiYXJndW1lbnRzIiwiXyIsImVtaXQiLCJkYXRhIiwic2xpY2UiLCJjYWxsIiwiZXZ0QXJyIiwiaSIsImxlbiIsImxlbmd0aCIsImV2dHMiLCJsaXZlRXZlbnRzIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvYWRGbGFnIiwibG9hZEVycm9yIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2FwaSIsInRoZW4iLCJjYXRjaCIsImV4Iiwid2FpdEZvciIsImNvbmRpdGlvbiIsInRpbWVvdXQiLCJkZXNjcmlwdGlvbiIsIm5ld1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwiUHJvdmlkZXIiLCJsb2FkZWQiLCJ3aW5kb3ciLCJkZXRhaWwiLCJpZGVudGl0eSIsImNhcGFiaWxpdGllcyIsIklkZW50aXR5U2VydmljZSIsImVuc3VyZVByb3ZpZGVyIiwiY3VycmVudCIsImF1dGhvcml6ZSIsImRlYXV0aG9yaXplIiwibG9jYWxTdG9yYWdlIiwiQ2FwYWJpbGl0aWVzU2VydmljZSIsImNsZWFyIiwiYWxsIiwidmVyaWZ5TGlzdCIsInZlcmlmeVN0b3JlIiwidmVyaWZ5R2V0IiwidmVyaWZ5RGVsZXRlIiwiY2FuTGlzdCIsImNhblN0b3JlIiwiY2FuR2V0IiwiY2FuRGVsZXRlIiwidmVyaWZ5UHJvamVjdHMiLCJjYW5MaXN0UHJvamVjdHMiLCJjYW5EZWxldGVQcm9qZWN0cyIsImNhbkNyZWF0ZVByb2plY3RzIiwiYnVpbGRJZGVudGl0eSIsImF1dGgiLCJhdXRoMiIsImdldEF1dGhJbnN0YW5jZSIsInNpZ25lZEluIiwiaXNTaWduZWRJbiIsInByb2ZpbGUiLCJjdXJyZW50VXNlciIsImdldEJhc2ljUHJvZmlsZSIsImdldE5hbWUiLCJ1c2VySWQiLCJnZXRFbWFpbCIsIk9iamVjdCIsImFzc2lnbiIsInN0YXR1cyIsInNpZ25vdXQiLCJzaWduT3V0Iiwic2lnbmluIiwic2lnbkluIiwiRGF0ZSIsIm5vdyIsIkdvb2dsZUlkZW50aXR5IiwiY29uc3RydWN0b3IiLCJmdW5jdGlvbnMiLCJmdW5jIiwibWF5YmVGdW5jdGlvbiIsImluaXQiLCJTQ09QRVMiLCJqb2luIiwiaW5pdEF1dGhDbGllbnQiLCJjb25maWciLCJvcHRpb25zIiwiYXBpS2V5IiwiQVBJX0tFWSIsImNsaWVudElkIiwiQ0xJRU5UX0lEIiwic2NvcGUiLCJsb2FkIiwiY2xpZW50IiwidHJ5SW5pdEF1dGhDbGllbnQiLCJuYWdhIiwiYXBwTmFtZSIsInN0b3JhZ2VWZXJpZmljYXRpb25zIiwic2FtZUl0ZW1zIiwiYXMiLCJicyIsImV2ZXJ5IiwiaW5kZXhPZiIsInNhbWVKU09OIiwiYSIsImIiLCJKU09OIiwic3RyaW5naWZ5IiwicG9zdGZpeCIsInBvc3RmaXhlcyIsImV4cGVjdDQwOUVycm9yIiwiZXJyIiwiY29kZSIsInByb21pc2VBbGxUcnV0aHkiLCJwcm9taXNlcyIsInJlc3VsdHMiLCJmYWlscyIsImZpbHRlciIsInZlcmlmeUNhblN0b3JlIiwidGVzdE5hbWUiLCJ0ZXN0Q29udGVudCIsIm92ZXJ3cml0ZVRlc3ROYW1lIiwic2F2ZSIsImNvbnRlbnQiLCJvdmVyd3JpdGUiLCJkZWxldGVMaXN0aW5nIiwibGlzdGluZyIsInBlcm1EZWxldGUiLCJnZW5lcmF0ZUR1bW1pZXMiLCJuYW1lcyIsInZlcmlmeURhdGFDYW5MaXN0IiwibGlzdFRlc3ROYW1lIiwibGlzdFRlc3ROYW1lcyIsImxpc3QiLCJ2ZXJpZnlEYXRhQ2FuRGVsZXRlIiwiZGVsZXRlVGVzdE5hbWUiLCJmaWxlU3BlYyIsImRlbGV0ZUFsbCIsInZlcmlmeURhdGEiLCJkYXRhVGVzdE5hbWUiLCJyZXN1bHQiLCJ2ZXJpZnlSZXBvIiwicmVwbyIsInJlcG9UZXN0TmFtZSIsInRlc3RQcm9qZWN0cyIsImRlbGV0ZVByb2plY3QiLCJjcmVhdGVQcm9qZWN0IiwibGlzdFByb2plY3RzIiwidmVyaWZ5U3RvcmFnZSIsImNsZWFudXAiLCJkYXRhUmVzdWx0cyIsInJlcG9SZXN1bHRzIiwiaW5pdFN0b3JhZ2VWZXJpZmljYXRpb25zIiwiZmV0Y2hUZXN0RGF0YSIsImZldGNoIiwicmVzIiwianNvbiIsImJ1aWxkRGF0YSIsImluRm9sZGVyIiwiYnVpbGRSZXBvIiwiZCIsInRlc3REYXRhIiwidmVyaWZpY2F0aW9uIiwidmVyaWZ5QWxsU3RvcmFnZSIsIndhaXRGb3JMb2FkIiwiR29vZ2xlQ2FwYWJpbGl0aWVzIiwiZGVsZXRlIiwiZmlsZXNBUEkiLCJ1cGxvYWRBUEkiLCJmb2xkZXJNaW1lVHlwZSIsImJvdW5kYXJ5IiwibXVsdGlQYXJ0TWltZVR5cGUiLCJkYXRhTWltZVR5cGUiLCJKU09OY29udGVudFR5cGUiLCJGaWxlU3BlYyIsImlkIiwidGhpbmciLCJjb3VudGVyIiwicmVxdWVzdCIsImRlZmF1bHRlZE9wdGlvbnMiLCJtZXRob2QiLCJwYXRoIiwiY3JlYXRlRm9sZGVyIiwibWltZVR5cGUiLCJib2R5IiwiZmlyc3RPck51bGwiLCJ0cmFuc2Zvcm0iLCJlbnN1cmVGb2xkZXIiLCJxIiwicGFyYW1zIiwiZmlsZXMiLCJtYXliZUZvbGRlciIsImJ1aWxkIiwiZHVtYkRvd25QcmVmaXgiLCJwcmVmaXgiLCJyZXQiLCJkYXNoSW5kZXgiLCJzdWJzdHJpbmciLCJsaXN0RmlsZXNJbkZvbGRlciIsImZvbGRlciIsIm1heWJlUHJlZml4IiwibmFtZUZpbHRlciIsImFwaVByZWZpeCIsInBhZ2VTaXplIiwiZmluZEZpbGVJbkZvbGRlciIsIm1heWJlU3BlYyIsImZpbGUiLCJKU09OcGFydCIsIm9iaiIsIm11bHRpcGFydCIsInBhcnRTdGFydCIsInBhcnRFbmQiLCJwYXJ0cyIsImNyZWF0ZUluRm9sZGVyIiwiaGVhZGVycyIsInVwbG9hZFR5cGUiLCJtZXRhZGF0YSIsInBhcmVudHMiLCJ1cGRhdGVJbkZvbGRlciIsInRocm93QWxyZWFkeUV4aXN0cyIsInNhdmVJbkZvbGRlciIsIm1heWJlRmlsZSIsImxvYWRGcm9tRm9sZGVyIiwiYWx0IiwiZGVsZXRlRnJvbUZvbGRlciIsImNsZWFuVXBFcnJvciIsImNsZWFuRXJyb3IiLCJzdGF0dXNUZXh0IiwiRGF0YSIsImZvbGRlck5hbWUiLCJmb2xkZXJTcGVjIiwiZmlsZW5hbWUiLCJmaWxlbmFtZVBhdHRlcm4iLCJSZXBvIiwicHJvamVjdCIsImV4ZWMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBOztrQkFFZUEsUztBQUNSLElBQU1DLG9CQUFNQyxRQUFRRCxHQUFSLENBQVlFLElBQVosQ0FBa0JELE9BQWxCLENBQVo7QUFDQSxJQUFNRSw4QkFBVyxTQUFYQSxRQUFXLEdBQWU7QUFBQTs7QUFFbkMseUJBQVFDLEtBQVI7QUFDQSx5QkFBUUEsS0FBUjtBQUVILENBTE0sQzs7Ozs7Ozs7Ozs7Ozs7O0FDTFA7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUMsYUFBWSxJQUFJQyxPQUFKLEVBQWxCO0FBQ0EsSUFBTUMsYUFBYSxJQUFJRCxPQUFK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LHNCQUF4Qjs7SUFFcUJDLEk7O0FBRWpCOzs7O0FBSUEsa0JBQWF0TyxJQUFiLEVBQW9CO0FBQUE7O0FBRWhCLGFBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUVIOztBQUVEOzs7Ozs7Ozs7c0NBS2VkLEksRUFBTzs7QUFFbEIsZ0JBQU1xUCxVQUFVLEVBQWhCO0FBQ0EsbUJBQU8sS0FBS3ZPLElBQUwsQ0FBVXVILElBQVYsQ0FBZ0I2RyxTQUFVbFAsSUFBVixDQUFoQixFQUFrQ3FQLE9BQWxDLEVBQTJDLEVBQUU5RyxXQUFXLEtBQWIsRUFBM0MsQ0FBUDtBQUVIOztBQUVEOzs7Ozs7OztzQ0FLZXZJLEksRUFBTzs7QUFFbEIsbUJBQU8sS0FBS2MsSUFBTCxDQUFVNEgsVUFBVixDQUFzQndHLFNBQVVsUCxJQUFWLENBQXRCLENBQVA7QUFFSDs7QUFFRDs7Ozs7Ozt1Q0FJZTs7QUFFWCxtQkFBTyxLQUFLYyxJQUFMLENBQVVrSSxJQUFWLEdBQWlCbEgsSUFBakIsQ0FBdUI7QUFBQSx1QkFBVzJHLFFBQ3BDcEosR0FEb0MsQ0FDL0I7QUFBQSx3QkFBSVcsSUFBSixRQUFJQSxJQUFKO0FBQUEsMkJBQWdCbVAsZ0JBQWdCRyxJQUFoQixDQUFzQnRQLElBQXRCLENBQWhCO0FBQUEsaUJBRCtCLEVBRXBDZ0ksTUFGb0MsQ0FFNUI7QUFBQSwyQkFBS3JKLENBQUw7QUFBQSxpQkFGNEIsRUFHcENVLEdBSG9DLENBRy9CO0FBQUE7QUFBQSx3QkFBTVcsSUFBTjs7QUFBQSwyQkFBa0JBLElBQWxCO0FBQUEsaUJBSCtCLENBQVg7QUFBQSxhQUF2QixDQUFQO0FBS0g7Ozs7OztrQkE5Q2dCb1AsSSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZGFlNjRiOWI1Zjk1OTZlMjg4ZiIsIi8qIGVzbGludCBuby1jb25zb2xlOiAwICovXG4vKiBnbG9iYWwgUm9sbGJhciAqL1xuXG5leHBvcnQgZGVmYXVsdCB1bmRlZmluZWQ7XG5leHBvcnQgY29uc3QgbG9nID0gY29uc29sZS5sb2cuYmluZCggY29uc29sZSApO1xuZXhwb3J0IGNvbnN0IGxvZ0Vycm9yID0gKCAuLi5hcmdzICkgPT4ge1xuXG4gICAgUm9sbGJhci5lcnJvciggLi4uYXJncyApO1xuICAgIGNvbnNvbGUuZXJyb3IoIC4uLmFyZ3MgKTtcblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZGlhZ25vc3RpY3MuanMiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJ0aW55LWVtaXR0ZXJcIjtcbmltcG9ydCBsb2NhbCBmcm9tIFwiLi9sb2NhbC1zdG9yZVwiO1xuXG5jb25zdCBwcm92aWRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgY2hvc2VuS2V5cyA9IG5ldyBXZWFrTWFwKCk7XG5cbmZ1bmN0aW9uIGZpbmRQcm92aWRlciggb3duZXIgKSB7XG5cbiAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggb3duZXIgKTtcbiAgICBjb25zdCBjaG9zZW4gPSBsb2NhbC5nZXRJdGVtKCBjaG9zZW5LZXkgKTtcbiAgICByZXR1cm4gcHJvdmlkZXJzLmdldCggb3duZXIgKS5maW5kKCB4ID0+IHgua2V5ID09PSBjaG9zZW4gKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCBhdmFpbGFibGVQcm92aWRlcnMsIGNob3NlbktleSwgcmVxdWlyZWRGdW5jdGlvbnMgKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgYXZhaWxhYmxlUHJvdmlkZXJzLmZvckVhY2goIHAgPT4gcC52ZXJpZnlJbnRlcmZhY2UoIHJlcXVpcmVkRnVuY3Rpb25zICkgKTtcbiAgICAgICAgcHJvdmlkZXJzLnNldCggdGhpcywgYXZhaWxhYmxlUHJvdmlkZXJzICk7XG4gICAgICAgIGNob3NlbktleXMuc2V0KCB0aGlzLCBjaG9zZW5LZXkgKTtcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IGZpbmRQcm92aWRlciggdGhpcyApO1xuXG4gICAgfVxuXG4gICAgcHJvdmlkZXJzKCkge1xuXG4gICAgICAgIHJldHVybiAoIHByb3ZpZGVycy5nZXQoIHRoaXMgKSB8fCBbXSApLm1hcCggcCA9PiBwLmRlc2NyaWJlKCkgKTtcblxuICAgIH1cblxuICAgIGVuc3VyZVByb3ZpZGVyKCkge1xuXG4gICAgICAgIGlmICggIXRoaXMucHJvdmlkZXIgKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvciggXCJObyBwcm92aWRlciBzZWxlY3RlZFwiICkgKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcy5wcm92aWRlciApO1xuXG4gICAgfVxuXG4gICAgc2VsZWN0KCBwcm92aWRlciApIHtcblxuICAgICAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggdGhpcyApO1xuICAgICAgICBsb2NhbC5zZXRJdGVtKCBjaG9zZW5LZXksIHByb3ZpZGVyLmtleSApO1xuICAgICAgICBmaW5kUHJvdmlkZXIoIHRoaXMgKTtcblxuICAgIH1cblxuICAgIGRlc2VsZWN0KCkge1xuXG4gICAgICAgIGNvbnN0IGNob3NlbktleSA9IGNob3NlbktleXMuZ2V0KCB0aGlzICk7XG4gICAgICAgIGxvY2FsLnJlbW92ZUl0ZW0oIGNob3NlbktleSApO1xuICAgICAgICBmaW5kUHJvdmlkZXIoIHRoaXMgKTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlcnZpY2VzL3NlcnZpY2UuanMiLCJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCIvKiBnbG9iYWwgZG9jdW1lbnQgKi9cbmltcG9ydCBQcm92aWRlckJhc2UgZnJvbSBcIi4uL3Byb3ZpZGVyLWJhc2VcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHsgaW5pdCB9IGZyb20gXCIuL3NoYXJlZFwiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzXCI7XG5cbmxldCBsb2FkRmxhZyA9IGZhbHNlO1xubGV0IGxvYWRFcnJvcjtcblxuaWYgKCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgKSB0aHJvdyBuZXcgRXJyb3IoIFwiZG9jdW1lbnQgaXMgdW5kZWZpbmVkXCIgKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiZ29vZ2xlLWFwaS1sb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgaW5pdCggY29uZmlnLmdhcGkgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuXG4gICAgICAgICAgICBsb2FkRmxhZyA9IHRydWU7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC5jYXRjaCggKCBleCApID0+IHtcblxuICAgICAgICAgICAgbG9hZEVycm9yID0gZXg7XG5cbiAgICAgICAgfSApO1xuXG59ICk7XG5cbmZ1bmN0aW9uIHdhaXRGb3IoIGNvbmRpdGlvbiwgdGltZW91dCwgZGVzY3JpcHRpb24gKSB7XG5cbiAgICBpZiAoIHRpbWVvdXQgPD0gMCApIHJldHVybiBQcm9taXNlLnJlamVjdCggbmV3IEVycm9yKCBgVGltZWQgb3V0ICR7ZGVzY3JpcHRpb259YCApICk7XG4gICAgaWYgKCBjb25kaXRpb24oKSApIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRydWUgKTtcbiAgICBjb25zdCBuZXdUaW1lb3V0ID0gdGltZW91dCAtIDEwMDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4gc2V0VGltZW91dChcblxuICAgICAgICAoKSA9PiB3YWl0Rm9yKCBjb25kaXRpb24sIG5ld1RpbWVvdXQsIGRlc2NyaXB0aW9uICkudGhlbiggcmVzb2x2ZSwgcmVqZWN0ICksXG4gICAgICAgIDEwMFxuXG4gICAgKSApO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3ZpZGVyIGV4dGVuZHMgUHJvdmlkZXJCYXNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBkZXNjcmlwdGlvbiApIHtcblxuICAgICAgICBzdXBlciggXCJnYXBpXCIsIGRlc2NyaXB0aW9uICk7XG5cbiAgICB9XG5cbiAgICBzdGF0dXMoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXG4gICAgICAgIHJldHVybiB7IGxvYWRlZDogbG9hZEZsYWcsIGxvYWRFcnJvciB9O1xuXG4gICAgfVxuXG4gICAgd2FpdEZvckxvYWQoKSB7XG5cbiAgICAgICAgaWYgKCBsb2FkRmxhZyApIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgbG9nKCBcIlByb3ZpZGVyIGxvYWRpbmcuLi5cIiwgdGhpcyApO1xuICAgICAgICByZXR1cm4gd2FpdEZvciggKCkgPT4gbG9hZEZsYWcsIDUwMDAgKS50aGVuKCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGxvZyggXCJQcm92aWRlciBsb2FkaW5nIGNvbXBsZXRlXCIsIHRoaXMgKTtcblxuICAgICAgICB9ICk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL3Byb3ZpZGVyLmpzIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgd2luZG93WyBcInNsZWVwZXItc2VydmljZS1jb25maWdcIiBdO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9jb25maWcuanMiLCIvKiBnbG9iYWwgZG9jdW1lbnQgKi9cblxuaW1wb3J0IElkZW50aXR5IGZyb20gXCIuL3NlcnZpY2VzL2lkZW50aXR5XCI7XG5pbXBvcnQgQ2FwYWJpbGl0aWVzIGZyb20gXCIuL3NlcnZpY2VzL2NhcGFiaWxpdGllc1wiO1xuXG5pbXBvcnQgZ2FwaUlkZW50aXR5IGZyb20gXCIuL2dhcGkvaWRlbnRpdHlcIjtcbmltcG9ydCBnYXBpQ2FwYWJpbGl0aWVzIGZyb20gXCIuL2dhcGkvY2FwYWJpbGl0aWVzXCI7XG5cbmlmICggdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiICkgdGhyb3cgbmV3IEVycm9yKCBcImRvY3VtZW50IGlzIG5vdCBkZWZpbmVkXCIgKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2NhdGUtc2VydmljZXNcIiwgKCBlICkgPT4ge1xuXG4gICAgZS5kZXRhaWwoIG51bGwsIHtcblxuICAgICAgICBpZGVudGl0eTogbmV3IElkZW50aXR5KCBbIGdhcGlJZGVudGl0eSBdICksXG4gICAgICAgIGNhcGFiaWxpdGllczogbmV3IENhcGFiaWxpdGllcyggWyBnYXBpQ2FwYWJpbGl0aWVzIF0gKVxuXG4gICAgfSApO1xuXG59ICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZW50cnkuanMiLCJpbXBvcnQgU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5cbmNvbnN0IHJlcXVpcmVkRnVuY3Rpb25zID0gWyBcImN1cnJlbnRcIiwgXCJhdXRob3JpemVcIiwgXCJkZWF1dGhvcml6ZVwiIF07XG5jb25zdCBjaG9zZW5LZXkgPSBcImNob3Nlbi1pZGVudGl0eS1wcm92aWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZGVudGl0eVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm92aWRlcnMgKSB7XG5cbiAgICAgICAgc3VwZXIoIHByb3ZpZGVycywgY2hvc2VuS2V5LCByZXF1aXJlZEZ1bmN0aW9ucyApO1xuXG4gICAgfVxuXG4gICAgY3VycmVudCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5jdXJyZW50KCkgKTtcblxuICAgIH1cblxuICAgIHNpZ25JbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5hdXRob3JpemUoKSApLnRoZW4oICgpID0+IHRoaXMuY3VycmVudCgpICk7XG5cbiAgICB9XG5cbiAgICBzaWduT3V0KCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVuc3VyZVByb3ZpZGVyKCkudGhlbiggcCA9PiBwLmRlYXV0aG9yaXplKCkgKS50aGVuKCAoKSA9PiB0aGlzLmN1cnJlbnQoKSApO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc2VydmljZXMvaWRlbnRpdHkuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9sb2NhbC1zdG9yZS5qcyIsImltcG9ydCBTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VcIjtcblxuY29uc3QgY2hvc2VuS2V5ID0gXCJjaG9zZW4tY2FwYWJpbGl0aWVzLXByb3ZpZGVyXCI7XG5jb25zdCByZXF1aXJlZEZ1bmN0aW9ucyA9IFtcblxuICAgIFwiY2xlYXJcIixcbiAgICBcInZlcmlmeUxpc3RcIixcbiAgICBcInZlcmlmeVN0b3JlXCIsXG4gICAgXCJ2ZXJpZnlHZXRcIixcbiAgICBcInZlcmlmeURlbGV0ZVwiLFxuICAgIFwidmVyaWZ5UHJvamVjdHNcIixcblxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FwYWJpbGl0aWVzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoIHByb3ZpZGVycyApIHtcblxuICAgICAgICBzdXBlciggcHJvdmlkZXJzLCBjaG9zZW5LZXksIHJlcXVpcmVkRnVuY3Rpb25zICk7XG5cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5jbGVhcigpICkudGhlbiggKCkgPT4gdHJ1ZSApO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5U3RvcmFnZSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpXG4gICAgICAgICAgICAudGhlbiggcCA9PiBQcm9taXNlLmFsbCggW1xuXG4gICAgICAgICAgICAgICAgcC52ZXJpZnlMaXN0KCksXG4gICAgICAgICAgICAgICAgcC52ZXJpZnlTdG9yZSgpLFxuICAgICAgICAgICAgICAgIHAudmVyaWZ5R2V0KCksXG4gICAgICAgICAgICAgICAgcC52ZXJpZnlEZWxldGUoKSxcblxuICAgICAgICAgICAgXSApLnRoZW4oICggWyBjYW5MaXN0LCBjYW5TdG9yZSwgY2FuR2V0LCBjYW5EZWxldGUgXSApID0+ICgge1xuXG4gICAgICAgICAgICAgICAgY2FuTGlzdCxcbiAgICAgICAgICAgICAgICBjYW5TdG9yZSxcbiAgICAgICAgICAgICAgICBjYW5HZXQsXG4gICAgICAgICAgICAgICAgY2FuRGVsZXRlLFxuXG4gICAgICAgICAgICB9ICkgKSApO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5UHJvamVjdFJlcG8oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKVxuICAgICAgICAgICAgLnRoZW4oIHAgPT4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICAgICAgICAgIHAudmVyaWZ5UHJvamVjdHMoKSxcblxuICAgICAgICAgICAgXSApLnRoZW4oICggWyB7XG5cbiAgICAgICAgICAgICAgICBjYW5MaXN0UHJvamVjdHMsXG4gICAgICAgICAgICAgICAgY2FuRGVsZXRlUHJvamVjdHMsXG4gICAgICAgICAgICAgICAgY2FuQ3JlYXRlUHJvamVjdHNcblxuICAgICAgICAgICAgfSBdICkgPT4gKCB7XG5cbiAgICAgICAgICAgICAgICBjYW5MaXN0UHJvamVjdHMsXG4gICAgICAgICAgICAgICAgY2FuRGVsZXRlUHJvamVjdHMsXG4gICAgICAgICAgICAgICAgY2FuQ3JlYXRlUHJvamVjdHNcblxuICAgICAgICAgICAgfSApICkgKTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5qcyIsIi8qIGdsb2JhbCBnYXBpICovXG5cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiLi9wcm92aWRlclwiO1xuXG5mdW5jdGlvbiBidWlsZElkZW50aXR5KCBwICkge1xuXG4gICAgY29uc3QgYXV0aCA9IGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCk7XG4gICAgY29uc3Qgc2lnbmVkSW4gPSBhdXRoLmlzU2lnbmVkSW4uZ2V0KCk7XG4gICAgY29uc3QgcHJvZmlsZSA9IHNpZ25lZEluID8gYXV0aC5jdXJyZW50VXNlci5nZXQoKS5nZXRCYXNpY1Byb2ZpbGUoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBuYW1lID0gKCBzaWduZWRJbiAmJiBwcm9maWxlICkgPyBwcm9maWxlLmdldE5hbWUoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB1c2VySWQgPSAoIHNpZ25lZEluICYmIHByb2ZpbGUgKSA/IHByb2ZpbGUuZ2V0RW1haWwoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm92aWRlciA9IE9iamVjdC5hc3NpZ24oIHAuZGVzY3JpYmUoKSwgcC5zdGF0dXMoKSApO1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgcHJvdmlkZXIsIHNpZ25lZEluLCB1c2VySWQsIG5hbWUsXG5cbiAgICB9O1xuXG59XG5cbmZ1bmN0aW9uIHNpZ25vdXQoIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIGNvbnN0IGF1dGggPSBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpO1xuICAgIHJldHVybiBhdXRoLnNpZ25PdXQoKS50aGVuKCByZXNvbHZlLCByZWplY3QgKTtcblxufVxuXG5mdW5jdGlvbiBzaWduaW4oIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIGNvbnN0IGF1dGggPSBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpO1xuICAgIGF1dGguc2lnbkluKCkudGhlbihcblxuICAgICAgICAoKSA9PiByZXNvbHZlKCBEYXRlLm5vdygpICksXG4gICAgICAgIHggPT4gcmVqZWN0KCB4LmVycm9yIHx8IHggKVxuXG4gICAgKTtcblxufVxuXG5jbGFzcyBHb29nbGVJZGVudGl0eSBleHRlbmRzIFByb3ZpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKCBcIllvdXIgR29vZ2xlIGlkZW50aXR5IChlLmcuIGdtYWlsKVwiICk7XG5cbiAgICB9XG5cbiAgICBjdXJyZW50KCkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiByZXNvbHZlKCBidWlsZElkZW50aXR5KCB0aGlzICkgKSApO1xuXG4gICAgfVxuXG4gICAgYXV0aG9yaXplKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoIHNpZ25pbiApO1xuXG4gICAgfVxuXG4gICAgZGVhdXRob3JpemUoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggc2lnbm91dCApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHb29nbGVJZGVudGl0eSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvaWRlbnRpdHkuanMiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJ0aW55LWVtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoIGtleSwgZGVzY3JpcHRpb24gKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5SW50ZXJmYWNlKCBmdW5jdGlvbnMgKSB7XG5cbiAgICAgICAgZnVuY3Rpb25zLmZvckVhY2goICggZnVuYyApID0+IHtcblxuICAgICAgICAgICAgY29uc3QgbWF5YmVGdW5jdGlvbiA9IHRoaXNbIGZ1bmMgXTtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIG1heWJlRnVuY3Rpb24gIT09IFwiZnVuY3Rpb25cIiApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggYFByb3ZpZGVyICR7cHJvdmlkZXJ9IGRvZXMgbm90IHByb3ZpZGUgZnVuY3Rpb24gJyR7ZnVuY30nICgke21heWJlRnVuY3Rpb259KWAgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gKTtcblxuICAgIH1cblxuICAgIGRlc2NyaWJlKCkge1xuXG4gICAgICAgIGNvbnN0IHsga2V5LCBuYW1lLCBkZXNjcmlwdGlvbiB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHsga2V5LCBuYW1lLCBkZXNjcmlwdGlvbiB9O1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcHJvdmlkZXItYmFzZS5qcyIsIi8qIGdsb2JhbCBnYXBpICovXG5cbmNvbnN0IFNDT1BFUyA9IFtcblxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5tZXRhZGF0YS5yZWFkb25seVwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5maWxlXCIsXG5cbl0uam9pbiggXCIgXCIgKTtcblxuZnVuY3Rpb24gaW5pdEF1dGhDbGllbnQoIGNvbmZpZywgcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcblxuICAgICAgICBhcGlLZXk6IGNvbmZpZy5BUElfS0VZLFxuICAgICAgICBjbGllbnRJZDogY29uZmlnLkNMSUVOVF9JRCxcbiAgICAgICAgc2NvcGU6IGNvbmZpZy5TQ09QRVMgfHwgU0NPUEVTLFxuXG4gICAgfTtcbiAgICBnYXBpLmxvYWQoIFwiY2xpZW50OmF1dGgyXCIsICgpID0+IGdhcGkuY2xpZW50XG4gICAgICAgIC5pbml0KCBvcHRpb25zIClcbiAgICAgICAgLnRoZW4oIHJlc29sdmUsIHJlamVjdCApICk7XG5cbn1cblxuZnVuY3Rpb24gdHJ5SW5pdEF1dGhDbGllbnQoIGNvbmZpZywgcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBpbml0QXV0aENsaWVudCggY29uZmlnLCByZXNvbHZlLCByZWplY3QgKTtcblxuICAgIH0gY2F0Y2ggKCBlICkge1xuXG4gICAgICAgIHJlamVjdCggZSApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHVuZGVmaW5lZDtcbmV4cG9ydCBmdW5jdGlvbiBpbml0KCBjb25maWcgKSB7XG5cbiAgICBjb25zdCBuYWdhID0gdHJ5SW5pdEF1dGhDbGllbnQuYmluZCggbnVsbCwgY29uZmlnICk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCBuYWdhICk7XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9zaGFyZWQuanMiLCIvKiBnbG9iYWwgZmV0Y2ggKi9cblxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCIuL3Byb3ZpZGVyXCI7XG5pbXBvcnQgRGF0YSBmcm9tIFwiLi9zdG9yZS9EYXRhXCI7XG5pbXBvcnQgUmVwbyBmcm9tIFwiLi9zdG9yZS9SZXBvXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7IGxvZywgbG9nRXJyb3IgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3NcIjtcblxuY29uc3QgeyBhcHBOYW1lIH0gPSBjb25maWc7XG5jb25zdCBzdG9yYWdlVmVyaWZpY2F0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IHNhbWVJdGVtcyA9ICggYXMsIGJzICkgPT4gYXMubGVuZ3RoID09PSBicy5sZW5ndGggJiYgYXMuZXZlcnkoIHggPT4gfmJzLmluZGV4T2YoIHggKSApO1xuY29uc3Qgc2FtZUpTT04gPSAoIGEsIGIgKSA9PiBKU09OLnN0cmluZ2lmeSggYSApID09PSBKU09OLnN0cmluZ2lmeSggYiApO1xuY29uc3QgcG9zdGZpeCA9ICggeCwgcG9zdGZpeGVzICkgPT4gcG9zdGZpeGVzLm1hcCggcCA9PiBgJHt4fV9fJHtwfWAgKTtcblxuZnVuY3Rpb24gZXhwZWN0NDA5RXJyb3IoIGVyciApIHtcblxuICAgIGlmICggZXJyLmNvZGUgIT09IDQwOSApIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIGBFeHBlY3RlZCBhIDQwOSByZWplY3Rpb24gb2Ygbm9uLW92ZXJ3cml0ZSByZXF1ZXN0LCBidXQgZ290ICR7ZXJyfWAgKTtcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBwcm9taXNlQWxsVHJ1dGh5KCBwcm9taXNlcyApIHtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbCggcHJvbWlzZXMubWFwKCBwID0+IHAuY2F0Y2goIGxvZ0Vycm9yICkgKSApLnRoZW4oICggcmVzdWx0cyApID0+IHtcblxuICAgICAgICBjb25zdCBmYWlscyA9IHJlc3VsdHMubWFwKCAoIHgsIGkgKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICggeCApIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VzWyBpIF07XG5cbiAgICAgICAgfSApLmZpbHRlciggeCA9PiB4ICk7XG4gICAgICAgIHJldHVybiBmYWlscy5sZW5ndGggPyBQcm9taXNlLnJlamVjdCggZmFpbHMgKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUNhblN0b3JlKCBkYXRhLCB0ZXN0TmFtZSwgdGVzdENvbnRlbnQgKSB7XG5cbiAgICBjb25zdCBvdmVyd3JpdGVUZXN0TmFtZSA9IGAke3Rlc3ROYW1lfS1wcmVleGlzdGluZ2A7XG4gICAgcmV0dXJuIHByb21pc2VBbGxUcnV0aHkoIFtcblxuICAgICAgICBkYXRhLnNhdmUoIHRlc3ROYW1lLCB0ZXN0Q29udGVudCApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gZGF0YS5sb2FkKCB0ZXN0TmFtZSApIClcbiAgICAgICAgICAgIC50aGVuKCBjb250ZW50ID0+IHNhbWVKU09OKCB0ZXN0Q29udGVudCwgY29udGVudCApICksXG5cbiAgICAgICAgZGF0YS5zYXZlKCBvdmVyd3JpdGVUZXN0TmFtZSwgNDIgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IGRhdGEuc2F2ZSggb3ZlcndyaXRlVGVzdE5hbWUsIDQyLCB7IG92ZXJ3cml0ZTogZmFsc2UgfSApIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIFwiRmFpbGVkIHRvIHJlamVjdCBub24tb3ZlcndyaXRlIHJlcXVlc3RcIiApO1xuXG4gICAgICAgICAgICB9IClcbiAgICAgICAgICAgIC5jYXRjaCggZXhwZWN0NDA5RXJyb3IgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHRydWUgKVxuXG4gICAgXSApLmNhdGNoKCAoKSA9PiBmYWxzZSApO1xuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUxpc3RpbmcoIGRhdGEsIGxpc3RpbmcgKSB7XG5cbiAgICByZXR1cm4gcHJvbWlzZUFsbFRydXRoeSggbGlzdGluZy5tYXAoIHggPT4gZGF0YS5wZXJtRGVsZXRlKCB4ICkgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRHVtbWllcyggZGF0YSwgbmFtZXMgKSB7XG5cbiAgICByZXR1cm4gcHJvbWlzZUFsbFRydXRoeSggbmFtZXMubWFwKCB4ID0+IGRhdGEuc2F2ZSggeCwgXCJoZWxsbywgZHVtbXlcIiApICkgKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlEYXRhQ2FuTGlzdCggZGF0YSwgdGVzdE5hbWUgKSB7XG5cbiAgICBjb25zdCBsaXN0VGVzdE5hbWUgPSBgJHt0ZXN0TmFtZX1fX2xpc3RgO1xuICAgIGNvbnN0IGxpc3RUZXN0TmFtZXMgPSBwb3N0Zml4KCBsaXN0VGVzdE5hbWUsIFsgMSwgMiwgMyBdICk7XG4gICAgcmV0dXJuIGRhdGEubGlzdCggbGlzdFRlc3ROYW1lIClcbiAgICAgICAgLnRoZW4oIGxpc3RpbmcgPT4gZGVsZXRlTGlzdGluZyggZGF0YSwgbGlzdGluZyApIClcbiAgICAgICAgLnRoZW4oICgpID0+IGdlbmVyYXRlRHVtbWllcyggZGF0YSwgbGlzdFRlc3ROYW1lcyApIClcbiAgICAgICAgLnRoZW4oICgpID0+IGRhdGEubGlzdCggbGlzdFRlc3ROYW1lICkgKVxuICAgICAgICAudGhlbiggbGlzdGluZyA9PiBzYW1lSXRlbXMoIGxpc3RpbmcubWFwKCB4ID0+IHgubmFtZSApLCBsaXN0VGVzdE5hbWVzICkgKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlEYXRhQ2FuRGVsZXRlKCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIGNvbnN0IGRlbGV0ZVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19kZWxldGVgO1xuICAgIHJldHVybiBkYXRhLnNhdmUoIGRlbGV0ZVRlc3ROYW1lLCBcInN0dWZmXCIgKVxuICAgICAgICAudGhlbiggZmlsZVNwZWMgPT4gZGF0YS5wZXJtRGVsZXRlKCBmaWxlU3BlYyApLnRoZW4oICgpID0+IGRhdGEubG9hZCggZmlsZVNwZWMgKSApIClcbiAgICAgICAgLmNhdGNoKCBlcnIgPT4gbG9nRXJyb3IoIGVyciApIHx8IFByb21pc2UucmVzb2x2ZSggZXJyLmNvZGUgPT09IDQwNCApICk7XG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlQWxsKCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIHJldHVybiBkYXRhLmxpc3QoIHRlc3ROYW1lIClcbiAgICAgICAgLnRoZW4oIGxpc3RpbmcgPT4gcHJvbWlzZUFsbFRydXRoeSggbGlzdGluZy5tYXAoIHggPT4gZGF0YS5wZXJtRGVsZXRlKCB4ICkgKSApICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5RGF0YSggZGF0YSwgdGVzdE5hbWUsIHRlc3RDb250ZW50ICkge1xuXG4gICAgY29uc3QgZGF0YVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19kYXRhYDtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGNhbkxpc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuU3RvcmU6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlOiB1bmRlZmluZWQsXG4gICAgICAgIGNhbkdldDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgcmV0dXJuIHZlcmlmeUNhblN0b3JlKCBkYXRhLCBkYXRhVGVzdE5hbWUsIHRlc3RDb250ZW50IClcbiAgICAgICAgLnRoZW4oICggY2FuU3RvcmUgKSA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5jYW5TdG9yZSA9IHJlc3VsdC5jYW5HZXQgPSBjYW5TdG9yZTtcbiAgICAgICAgICAgIGlmICggIWNhblN0b3JlICkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICAgICAgICAgIHZlcmlmeURhdGFDYW5MaXN0KCBkYXRhLCBkYXRhVGVzdE5hbWUgKSxcbiAgICAgICAgICAgICAgICB2ZXJpZnlEYXRhQ2FuRGVsZXRlKCBkYXRhLCBkYXRhVGVzdE5hbWUgKVxuXG4gICAgICAgICAgICBdICkudGhlbiggKCBbIGNhbkxpc3QsIGNhbkRlbGV0ZSBdICkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmNhbkxpc3QgPSBjYW5MaXN0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC5jYW5EZWxldGUgPSBjYW5EZWxldGU7XG5cbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICB9IClcbiAgICAgICAgLnRoZW4oICgpID0+IHJlc3VsdCApO1xuXG59XG5cbmZ1bmN0aW9uIHZlcmlmeVJlcG8oIHJlcG8sIHRlc3ROYW1lICkge1xuXG4gICAgY29uc3QgcmVwb1Rlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19yZXBvYDtcbiAgICBjb25zdCByZXN1bHQgPSB7XG5cbiAgICAgICAgY2FuTGlzdFByb2plY3RzOiB1bmRlZmluZWQsXG4gICAgICAgIGNhbkNyZWF0ZVByb2plY3RzOiB1bmRlZmluZWQsXG4gICAgICAgIGNhbkRlbGV0ZVByb2plY3RzOiB1bmRlZmluZWQsXG5cbiAgICB9O1xuICAgIGNvbnN0IHRlc3RQcm9qZWN0cyA9IHBvc3RmaXgoIHJlcG9UZXN0TmFtZSwgWyAxLCAyIF0gKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIHRlc3RQcm9qZWN0cy5tYXAoIHggPT4gcmVwby5kZWxldGVQcm9qZWN0KCB4ICkgKSApXG4gICAgICAgIC50aGVuKCAoKSA9PiBQcm9taXNlLmFsbCggdGVzdFByb2plY3RzLm1hcCggeCA9PiByZXBvLmNyZWF0ZVByb2plY3QoIHggKSApICkgKVxuICAgICAgICAudGhlbiggKCkgPT4gcmVwby5saXN0UHJvamVjdHMoKSApXG4gICAgICAgIC50aGVuKCAoIGxpc3RpbmcgKSA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5jYW5MaXN0UHJvamVjdHMgPSB0ZXN0UHJvamVjdHMuZXZlcnkoIHggPT4gfmxpc3RpbmcuaW5kZXhPZiggeCApICk7XG4gICAgICAgICAgICBpZiAoICFyZXN1bHQuY2FuTGlzdFByb2plY3RzICkgdGhyb3cgbmV3IEVycm9yKCBcIkNhbid0IGxpc3QvY3JlYXRlIHByb2plY3RzXCIgKTtcbiAgICAgICAgICAgIHJlc3VsdC5jYW5DcmVhdGVQcm9qZWN0cyA9IHRydWU7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCAoKSA9PiByZXBvLmRlbGV0ZVByb2plY3QoIHRlc3RQcm9qZWN0c1sgMCBdIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiByZXBvLmxpc3RQcm9qZWN0cygpIClcbiAgICAgICAgICAgIC50aGVuKCAoIGxpc3RpbmcgKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuY2FuRGVsZXRlUHJvamVjdHMgPSAhfmxpc3RpbmcuaW5kZXhPZiggdGVzdFByb2plY3RzWyAwIF0gKTtcblxuICAgICAgICAgICAgfSApIClcbiAgICAgICAgLmNhdGNoKCAoIGV4ICkgPT4ge1xuXG4gICAgICAgICAgICBsb2dFcnJvciggZXggKTtcbiAgICAgICAgICAgIHJlc3VsdC5leCA9IGV4O1xuXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4gcmVzdWx0ICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5U3RvcmFnZSggZGF0YSwgcmVwbywgdGVzdE5hbWUsIHRlc3RDb250ZW50ICkge1xuXG4gICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcblxuICAgICAgICBkZWxldGVBbGwoIGRhdGEsIHRlc3ROYW1lICkuY2F0Y2goIGVyciA9PiBsb2dFcnJvciggXCJDbGVhbmluZyB1cCBhZnRlciBzZWxmIHRlc3RcIiwgZXJyICkgKTtcblxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICB2ZXJpZnlEYXRhKCBkYXRhLCB0ZXN0TmFtZSwgdGVzdENvbnRlbnQgKSxcbiAgICAgICAgdmVyaWZ5UmVwbyggcmVwbywgdGVzdE5hbWUgKVxuXG4gICAgXSApLnRoZW4oICggWyBkYXRhUmVzdWx0cywgcmVwb1Jlc3VsdHMgXSApID0+IHtcblxuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IGRhdGFSZXN1bHRzLCByZXBvOiByZXBvUmVzdWx0cyB9O1xuXG4gICAgfSApLmNhdGNoKCAoIGV4ICkgPT4ge1xuXG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgdGhyb3cgZXg7XG5cbiAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gaW5pdFN0b3JhZ2VWZXJpZmljYXRpb25zKCBvd25lciApIHtcblxuICAgIGNvbnN0IGZldGNoVGVzdERhdGEgPSBmZXRjaCggXCIvcHVibGljL2RhdGEvbm90c2hha2EuanNvblwiICkudGhlbiggcmVzID0+IHJlcy5qc29uKCkgKTtcbiAgICBjb25zdCBidWlsZERhdGEgPSBEYXRhLmluRm9sZGVyKCBhcHBOYW1lICk7XG4gICAgY29uc3QgYnVpbGRSZXBvID0gYnVpbGREYXRhLnRoZW4oIGQgPT4gbmV3IFJlcG8oIGQgKSApO1xuICAgIGNvbnN0IHRlc3ROYW1lID0gYF9fdGVtcF90ZXN0aW5nXyR7YXBwTmFtZX1gO1xuICAgIGxvZyggXCJWZXJpZnkgYWxsIHN0b3JhZ2UuLi5cIiwgb3duZXIgKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIFsgYnVpbGREYXRhLCBidWlsZFJlcG8sIGZldGNoVGVzdERhdGEgXSApXG4gICAgICAgIC50aGVuKCAoIFsgZGF0YSwgcmVwbywgdGVzdERhdGEgXSApID0+IHZlcmlmeVN0b3JhZ2UoIGRhdGEsIHJlcG8sIHRlc3ROYW1lLCB0ZXN0RGF0YSApIClcbiAgICAgICAgLnRoZW4oIHZlcmlmaWNhdGlvbiA9PiBzdG9yYWdlVmVyaWZpY2F0aW9ucy5zZXQoIG93bmVyLCB2ZXJpZmljYXRpb24gKSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGxvZyggXCJWZXJpZnkgYWxsIHN0b3JhZ2UgY29tcGxldGVcIiwgb3duZXIgKTtcbiAgICAgICAgICAgIHJldHVybiBzdG9yYWdlVmVyaWZpY2F0aW9ucy5nZXQoIG93bmVyICk7XG5cbiAgICAgICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUFsbFN0b3JhZ2UoIG93bmVyICkge1xuXG4gICAgcmV0dXJuIG93bmVyLndhaXRGb3JMb2FkKCkudGhlbiggKCkgPT5cblxuICAgICAgICBzdG9yYWdlVmVyaWZpY2F0aW9ucy5nZXQoIG93bmVyIClcbiAgICAgICAgfHxcbiAgICAgICAgc3RvcmFnZVZlcmlmaWNhdGlvbnMuc2V0KCBvd25lciwgaW5pdFN0b3JhZ2VWZXJpZmljYXRpb25zKCBvd25lciApICkuZ2V0KCBvd25lciApXG5cbiAgICApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcblxufVxuXG5jbGFzcyBHb29nbGVDYXBhYmlsaXRpZXMgZXh0ZW5kcyBQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciggXCJZb3VyIEdvb2dsZSBEcml2ZSBzdG9yYWdlXCIgKTtcblxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuXG4gICAgICAgIHN0b3JhZ2VWZXJpZmljYXRpb25zLmRlbGV0ZSggdGhpcyApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICB9XG5cbiAgICB2ZXJpZnlMaXN0KCkge1xuXG4gICAgICAgIHJldHVybiB2ZXJpZnlBbGxTdG9yYWdlKCB0aGlzICkudGhlbiggKCB7IGRhdGEgfSApID0+ICEhZGF0YS5jYW5MaXN0ICk7XG5cbiAgICB9XG5cbiAgICB2ZXJpZnlTdG9yZSgpIHtcblxuICAgICAgICByZXR1cm4gdmVyaWZ5QWxsU3RvcmFnZSggdGhpcyApLnRoZW4oICggeyBkYXRhIH0gKSA9PiAhIWRhdGEuY2FuU3RvcmUgKTtcblxuICAgIH1cblxuICAgIHZlcmlmeUdldCgpIHtcblxuICAgICAgICByZXR1cm4gdmVyaWZ5QWxsU3RvcmFnZSggdGhpcyApLnRoZW4oICggeyBkYXRhIH0gKSA9PiAhIWRhdGEuY2FuR2V0ICk7XG5cbiAgICB9XG5cbiAgICB2ZXJpZnlEZWxldGUoKSB7XG5cbiAgICAgICAgcmV0dXJuIHZlcmlmeUFsbFN0b3JhZ2UoIHRoaXMgKS50aGVuKCAoIHsgZGF0YSB9ICkgPT4gISFkYXRhLmNhbkRlbGV0ZSApO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5UHJvamVjdHMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHZlcmlmeUFsbFN0b3JhZ2UoIHRoaXMgKS50aGVuKCAoIHsgcmVwbyB9ICkgPT4gcmVwbyApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHb29nbGVDYXBhYmlsaXRpZXMoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9jYXBhYmlsaXRpZXMuanMiLCIvKiBnbG9iYWwgZ2FwaSAqL1xuXG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vLi4vZGlhZ25vc3RpY3NcIjtcblxuY29uc3QgZmlsZXNBUEkgPSBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2RyaXZlL3YzL2ZpbGVzXCI7XG5jb25zdCB1cGxvYWRBUEkgPSBcImh0dHBzOi8vY29udGVudC5nb29nbGVhcGlzLmNvbS91cGxvYWQvZHJpdmUvdjMvZmlsZXNcIjtcbmNvbnN0IGZvbGRlck1pbWVUeXBlID0gXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyXCI7XG5jb25zdCBib3VuZGFyeSA9IFwiLi4uLi4uXCI7XG5jb25zdCBtdWx0aVBhcnRNaW1lVHlwZSA9IGBtdWx0aXBhcnQvcmVsYXRlZDsgYm91bmRhcnk9JHtib3VuZGFyeX1gO1xuY29uc3QgZGF0YU1pbWVUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG5jb25zdCBKU09OY29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIjtcblxuY2xhc3MgRmlsZVNwZWMge1xuXG4gICAgY29uc3RydWN0b3IoIHsgaWQsIG5hbWUgfSApIHtcblxuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgYnVpbGQoIHRoaW5nICkge1xuXG4gICAgICAgIHJldHVybiBuZXcgRmlsZVNwZWMoIHRoaW5nICk7XG5cbiAgICB9XG5cbn1cblxubGV0IGNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiByZXF1ZXN0KCBvcHRpb25zICkge1xuXG4gICAgY29uc3QgZGVmYXVsdGVkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oIHsgbWV0aG9kOiBcIkdFVFwiLCBwYXRoOiBmaWxlc0FQSSB9LCBvcHRpb25zICk7XG4gICAgbG9nKCBcIkdBUEkgcmVxdWVzdFwiLCArK2NvdW50ZXIsIGRlZmF1bHRlZE9wdGlvbnMgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4gZ2FwaS5jbGllbnRcbiAgICAgICAgLnJlcXVlc3QoIGRlZmF1bHRlZE9wdGlvbnMgKVxuICAgICAgICAudGhlbiggcmVzb2x2ZSwgcmVqZWN0ICkgKTtcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb2xkZXIoIG5hbWUgKSB7XG5cbiAgICBjb25zdCBtaW1lVHlwZSA9IGZvbGRlck1pbWVUeXBlO1xuICAgIGNvbnN0IGJvZHkgPSB7IG5hbWUsIG1pbWVUeXBlIH07XG4gICAgY29uc3QgbWV0aG9kID0gXCJQT1NUXCI7XG4gICAgcmV0dXJuIHJlcXVlc3QoIHsgbWV0aG9kLCBib2R5IH0gKTtcblxufVxuXG5mdW5jdGlvbiBmaXJzdE9yTnVsbCggbGlzdCwgdHJhbnNmb3JtID0geCA9PiB4ICkge1xuXG4gICAgaWYgKCBsaXN0ICYmIGxpc3QubGVuZ3RoICkgcmV0dXJuIHRyYW5zZm9ybSggbGlzdFsgMCBdICk7XG4gICAgcmV0dXJuIG51bGw7XG5cbn1cbmZ1bmN0aW9uIGVuc3VyZUZvbGRlciggbmFtZSApIHtcblxuICAgIGNvbnN0IHEgPSBgbmFtZT0nJHtuYW1lfScgYW5kIG1pbWVUeXBlPScke2ZvbGRlck1pbWVUeXBlfScgYW5kIHRyYXNoZWQ9ZmFsc2VgO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgcSB9O1xuICAgIHJldHVybiByZXF1ZXN0KCB7IHBhcmFtcyB9IClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMucmVzdWx0LmZpbGVzIClcbiAgICAgICAgLnRoZW4oIGZpcnN0T3JOdWxsIClcbiAgICAgICAgLnRoZW4oIG1heWJlRm9sZGVyID0+IG1heWJlRm9sZGVyIHx8IGNyZWF0ZUZvbGRlciggbmFtZSApIClcbiAgICAgICAgLnRoZW4oIEZpbGVTcGVjLmJ1aWxkICk7XG5cbn1cblxuZnVuY3Rpb24gZHVtYkRvd25QcmVmaXgoIHByZWZpeCApIHtcblxuICAgIGxldCByZXQgPSBwcmVmaXg7XG4gICAgLy8gQVBJIGRvZXNuJ3QgbGlrZSBkYXNoZXMgZm9yIHNvbWUgcmVhc29uXG4gICAgY29uc3QgZGFzaEluZGV4ID0gcmV0LmluZGV4T2YoIFwiLVwiICk7XG4gICAgaWYgKCB+ZGFzaEluZGV4ICkgcmV0ID0gcmV0LnN1YnN0cmluZyggMCwgZGFzaEluZGV4ICk7XG4gICAgLy8gQVBJIGRvZXNuJ3QgbGlrZSBtb3JlIHRoYW4gfjIwIGNoYXJhY3RlcnMgZm9yIHNvbWUgcmVhc29uXG4gICAgaWYgKCByZXQubGVuZ3RoID4gMjAgKSByZXQgPSByZXQuc3Vic3RyaW5nKCAwLCAyMCApO1xuICAgIHJldHVybiByZXQ7XG5cbn1cbmZ1bmN0aW9uIGxpc3RGaWxlc0luRm9sZGVyKCBmb2xkZXIsIG1heWJlUHJlZml4ICkge1xuXG4gICAgbGV0IHEgPSBgbWltZVR5cGU9JyR7ZGF0YU1pbWVUeXBlfScgYW5kIHRyYXNoZWQ9ZmFsc2VgO1xuICAgIGxldCBuYW1lRmlsdGVyID0gKCkgPT4gdHJ1ZTtcbiAgICBpZiAoIG1heWJlUHJlZml4ICkge1xuXG4gICAgICAgIGNvbnN0IGFwaVByZWZpeCA9IGR1bWJEb3duUHJlZml4KCBtYXliZVByZWZpeCApO1xuICAgICAgICBpZiAoIGFwaVByZWZpeCAhPT0gbWF5YmVQcmVmaXggKSB7XG5cbiAgICAgICAgICAgIG5hbWVGaWx0ZXIgPSB4ID0+IHgubmFtZS5pbmRleE9mKCBtYXliZVByZWZpeCApID09PSAwO1xuXG4gICAgICAgIH1cbiAgICAgICAgcSA9IGBuYW1lIGNvbnRhaW5zICcke2FwaVByZWZpeH0nIGFuZCAke3F9YDtcblxuICAgIH1cbiAgICBjb25zdCBwYWdlU2l6ZSA9IDEwMDA7XG4gICAgY29uc3QgcGFyYW1zID0geyBxLCBwYWdlU2l6ZSB9O1xuICAgIHJldHVybiByZXF1ZXN0KCB7IHBhcmFtcyB9IClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMucmVzdWx0LmZpbGVzIClcbiAgICAgICAgLnRoZW4oIGZpbGVzID0+IGZpbGVzLmZpbHRlciggbmFtZUZpbHRlciApLm1hcCggRmlsZVNwZWMuYnVpbGQgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGZpbmRGaWxlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjICkge1xuXG4gICAgaWYgKCBtYXliZVNwZWMgaW5zdGFuY2VvZiBGaWxlU3BlYyApIHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBtYXliZVNwZWMgKTtcblxuICAgIH1cbiAgICBjb25zdCB7IGlkIH0gPSBmb2xkZXIgfHwge307XG4gICAgY29uc3QgcSA9IGBuYW1lPScke21heWJlU3BlY30nIGFuZCAnJHtpZH0nIGluIHBhcmVudHMgYW5kIG1pbWVUeXBlPScke2RhdGFNaW1lVHlwZX0nIGFuZCB0cmFzaGVkPWZhbHNlYDtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHEgfTtcbiAgICByZXR1cm4gcmVxdWVzdCggeyBwYXJhbXMgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLnJlc3VsdC5maWxlcyApXG4gICAgICAgIC50aGVuKCBmaWxlcyA9PiBmaXJzdE9yTnVsbCggZmlsZXMsIGZpbGUgPT4gRmlsZVNwZWMuYnVpbGQoIGZpbGUgKSApICk7XG5cbn1cblxuZnVuY3Rpb24gSlNPTnBhcnQoIG9iaiApIHtcblxuICAgIHJldHVybiBgXFxyXFxuQ29udGVudC1UeXBlOiAke0pTT05jb250ZW50VHlwZX1cXHJcXG5cXHJcXG4ke0pTT04uc3RyaW5naWZ5KCBvYmosIG51bGwsIDEgKX1gO1xuXG59XG5cbmZ1bmN0aW9uIG11bHRpcGFydCggLi4ucGFydHMgKSB7XG5cbiAgICBjb25zdCBwYXJ0U3RhcnQgPSBgXFxyXFxuLS0ke2JvdW5kYXJ5fWA7XG4gICAgY29uc3QgcGFydEVuZCA9IGAke3BhcnRTdGFydH0tLWA7XG4gICAgcmV0dXJuIHBhcnRTdGFydCArIHBhcnRzLmpvaW4oIHBhcnRTdGFydCApICsgcGFydEVuZDtcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVJbkZvbGRlciggZm9sZGVyLCBuYW1lLCBkYXRhICkge1xuXG4gICAgY29uc3QgbWV0aG9kID0gXCJQT1NUXCI7XG4gICAgY29uc3QgaGVhZGVycyA9IHsgXCJDb250ZW50LVR5cGVcIjogbXVsdGlQYXJ0TWltZVR5cGUgfTtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHVwbG9hZFR5cGU6IFwibXVsdGlwYXJ0XCIgfTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IHsgcGFyZW50czogWyBmb2xkZXIuaWQgXSwgbmFtZSB9O1xuICAgIGNvbnN0IGJvZHkgPSBtdWx0aXBhcnQoIEpTT05wYXJ0KCBtZXRhZGF0YSApLCBKU09OcGFydCggZGF0YSApICk7XG4gICAgY29uc3QgcGF0aCA9IHVwbG9hZEFQSTtcbiAgICByZXR1cm4gcmVxdWVzdCgge1xuXG4gICAgICAgIHBhdGgsIG1ldGhvZCwgcGFyYW1zLCBoZWFkZXJzLCBib2R5LFxuXG4gICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluRm9sZGVyKCBmb2xkZXIsIGZpbGUsIGRhdGEgKSB7XG5cbiAgICBjb25zdCBtZXRob2QgPSBcIlBBVENIXCI7XG4gICAgY29uc3QgcGFyYW1zID0geyB1cGxvYWRUeXBlOiBcIm1lZGlhXCIgfTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IGRhdGFNaW1lVHlwZTtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoIGRhdGEgKTtcbiAgICBjb25zdCBwYXRoID0gYCR7dXBsb2FkQVBJfS8ke2ZpbGUuaWR9YDtcbiAgICByZXR1cm4gcmVxdWVzdCgge1xuXG4gICAgICAgIHBhdGgsIG1ldGhvZCwgcGFyYW1zLCBtaW1lVHlwZSwgYm9keSxcblxuICAgIH0gKTtcblxufVxuXG5mdW5jdGlvbiB0aHJvd0FscmVhZHlFeGlzdHMoIGZpbGUgKSB7XG5cbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoIGBGaWxlIGFscmVhZHkgZXhpc3RzOiAke2ZpbGUuaWR9ICR7ZmlsZS5uYW1lfWAgKTtcbiAgICBlcnIuY29kZSA9IDQwOTtcbiAgICB0aHJvdyBlcnI7XG5cbn1cblxuZnVuY3Rpb24gc2F2ZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYywgZGF0YSwgb3B0aW9ucyA9IHt9ICkge1xuXG4gICAgY29uc3QgeyBvdmVyd3JpdGUgfSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIGZpbmRGaWxlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjIClcbiAgICAgICAgLnRoZW4oICggbWF5YmVGaWxlICkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIG1heWJlRmlsZSAmJiAhb3ZlcndyaXRlICkgdGhyb3dBbHJlYWR5RXhpc3RzKCBtYXliZUZpbGUgKTtcbiAgICAgICAgICAgIGlmICggbWF5YmVGaWxlICkgcmV0dXJuIHVwZGF0ZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlRmlsZSwgZGF0YSApO1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYywgZGF0YSApO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggcmVzID0+IEZpbGVTcGVjLmJ1aWxkKCByZXMucmVzdWx0ICkgKTtcblxufVxuXG5mdW5jdGlvbiBsb2FkRnJvbUZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKSB7XG5cbiAgICByZXR1cm4gZmluZEZpbGVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKVxuICAgICAgICAudGhlbiggKCBtYXliZUZpbGUgKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICggbWF5YmVGaWxlICkgcmV0dXJuIG1heWJlRmlsZTtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgZXJyLmVycm9yID0geyBjb2RlOiA0MDQgfTtcbiAgICAgICAgICAgIHRocm93IGVycjtcblxuICAgICAgICB9IClcbiAgICAgICAgLnRoZW4oICggZmlsZSApID0+IHtcblxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGAke2ZpbGVzQVBJfS8ke2ZpbGUuaWR9YDtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYWx0OiBcIm1lZGlhXCIgfTtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KCB7IHBhdGgsIHBhcmFtcyB9ICk7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC5jYXRjaCggZXggPT4gUHJvbWlzZS5yZWplY3QoICggZXggJiYgZXgucmVzdWx0ICYmIGV4LnJlc3VsdC5lcnJvciApIHx8IGV4ICkgKVxuICAgICAgICAudGhlbiggcmVzID0+IHJlcy5yZXN1bHQgKTtcblxufVxuXG5mdW5jdGlvbiBkZWxldGVGcm9tRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApIHtcblxuICAgIHJldHVybiBmaW5kRmlsZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApXG4gICAgICAgIC50aGVuKCAoIG1heWJlRmlsZSApID0+IHtcblxuICAgICAgICAgICAgaWYgKCAhbWF5YmVGaWxlICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggeyBjb2RlOiA0MDQgfSApO1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGAke2ZpbGVzQVBJfS8ke21heWJlRmlsZS5pZH1gO1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gXCJERUxFVEVcIjtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KCB7IG1ldGhvZCwgcGF0aCB9ICk7XG5cbiAgICAgICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIGNsZWFuVXBFcnJvciggZXJyICkge1xuXG4gICAgaWYgKCBlcnIuY29kZSApIHJldHVybiBQcm9taXNlLnJlamVjdCggZXJyICk7XG4gICAgaWYgKCBlcnIucmVzdWx0ICkge1xuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoIGBXVEYgYW0gaSBzdXBwb3NlZCB0byBkbyB3aXRoIHRoaXM/ICR7SlNPTi5zdHJpbmdpZnkoIGVyci5yZXN1bHQsIG51bGwsIDMgKX1gICk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoIGVyciApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zdCBjbGVhbkVycm9yID0gbmV3IEVycm9yKCBlcnIuYm9keSB8fCBlcnIuc3RhdHVzVGV4dCB8fCBcIlVua25vd24gZXJyb3JcIiApO1xuICAgIGNsZWFuRXJyb3IuZXJyID0gZXJyO1xuICAgIGNsZWFuRXJyb3IuY29kZSA9IGVyci5zdGF0dXMgfHwgNTAwO1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggY2xlYW5FcnJvciApO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGEge1xuXG4gICAgLyoqXG4gICAgICogYnVpbGRzIGEgRGF0YSByZXBvc2l0b3J5IGZvciB0aGUgbmFtZWQgZm9sZGVyXG4gICAgICogaWYgdGhlIGZvbGRlciBkb2Vzbid0IGFscmVhZHkgZXhpc3QsIGNyZWF0ZXMgaXRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyTmFtZSB0aGUgbmFtZSBvZiB0aGUgZm9sZGVyIGZvciB3aGljaCB0byBidWlsZFxuICAgICAqIEByZXR1cm5zIHtEYXRhfSB0aGUgZGF0YSByZXBvc2l0b3J5XG4gICAgICovXG4gICAgc3RhdGljIGluRm9sZGVyKCBmb2xkZXJOYW1lICkge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IGVuc3VyZUZvbGRlciggZm9sZGVyTmFtZSApIClcbiAgICAgICAgICAgIC50aGVuKCBmb2xkZXJTcGVjID0+IG5ldyBEYXRhKCBmb2xkZXJTcGVjICkgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgYSBEYXRhIHJlcG9zaXRvcnkgZm9yIGZpbGVzIHN0b3JlZCBpbiB0aGUgc3BlY2lmaWVkIGZvbGRlclxuICAgICAqIEBwYXJhbSB7RmlsZVNwZWN9IGZvbGRlclNwZWMgdGhlIGZvbGRlciBjb250YWluaW5nIGZpbGVzIHRvIG9wZXJhdGUgb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciggZm9sZGVyU3BlYyApIHtcblxuICAgICAgICB0aGlzLmZvbGRlciA9IGZvbGRlclNwZWM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgZGF0YSBmaWxlcyBpbiB0aGlzIGZvbGRlciAoSlNPTiBmaWxlcylcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW21heWJlUHJlZml4XSBpZiBzcGVjaWZpZWQsIG9ubHkgZmlsZXMgd2l0aCB0aGUgc3BlY2lmaWVkXG4gICAgICogcHJlZml4IGFyZSByZXR1cm5lZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRvIGxpc3QgdGhlIGZpbGVzIGluIHRoaXMgZm9sZGVyXG4gICAgICovXG4gICAgbGlzdCggbWF5YmVQcmVmaXggKSB7XG5cbiAgICAgICAgcmV0dXJuIGxpc3RGaWxlc0luRm9sZGVyKCB0aGlzLmZvbGRlciwgbWF5YmVQcmVmaXggKS5jYXRjaCggY2xlYW5VcEVycm9yICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyB0aGUgc3BlY2lmaWVkIGRhdGEgaW4gYSBkYXRhIGZpbGUgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgZmlsZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIHRoZSBkYXRhIHRvIHNhdmUgKHdpbGwgYmUgSlNPTiBzdHJpbmdpZmllZClcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIHNhdmUgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm92ZXJ3cml0ZSBpZiBUcnVlIHdpbGwgY2hlY2sgaWYgZmlsZSBleGlzdHMgYW5kXG4gICAgICogcmV0dXJuIGFuIGVycm9yIHdpdGggY29kZSA0MDlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSB0byBzYXZlIHRoZSBmaWxlXG4gICAgICovXG4gICAgc2F2ZSggbmFtZSwgZGF0YSwgb3B0aW9ucyApIHtcblxuICAgICAgICByZXR1cm4gc2F2ZUluRm9sZGVyKCB0aGlzLmZvbGRlciwgbmFtZSwgZGF0YSwgb3B0aW9ucyApLmNhdGNoKCBjbGVhblVwRXJyb3IgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgc3BlY2lmaWVkIGRhdGEgaW4gYSBkYXRhIGZpbGUgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUvc3BlY1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfEZpbGVTcGVjfSBtYXliZVNwZWMgdGhlIG5hbWUgb3IgRmlsZVNwZWMgb2YgdGhlIGZpbGUgdG8gbG9hZFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSB0byBsb2FkIHRoZSBmaWxlIHNwZWNpZmllZFxuICAgICAqL1xuICAgIGxvYWQoIG1heWJlU3BlYyApIHtcblxuICAgICAgICByZXR1cm4gbG9hZEZyb21Gb2xkZXIoIHRoaXMuZm9sZGVyLCBtYXliZVNwZWMgKS5jYXRjaCggY2xlYW5VcEVycm9yICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJtZW5hbnRseSBkZWxldGVzIHRoZSBkYXRhIGZpbGUgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUvc3BlYy4gVGhlIGZpbGVcbiAgICAgKiBpcyBub3QgcmVjb3ZlcmFibGUgZnJvbSB0aGUgcmVjeWNsZSBiaW4uIElmIHRoZSBkYXRhIGZpbGUgaXMgYWxyZWFkeVxuICAgICAqIGdvbmUsIHJlc29sdmVzIHdpdGggeyBjb2RlOiA0MDQgfVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEZpbGVTcGVjfSBtYXliZVNwZWMgdGhlIG5hbWUgb3IgRmlsZVNwZWMgb2YgdGhlIGZpbGUgdG8gZGVsZXRlXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBQcm9taXNlIHRvIGRlbGV0ZSB0aGUgZmlsZVxuICAgICAqL1xuICAgIHBlcm1EZWxldGUoIG1heWJlU3BlYyApIHtcblxuICAgICAgICByZXR1cm4gZGVsZXRlRnJvbUZvbGRlciggdGhpcy5mb2xkZXIsIG1heWJlU3BlYyApLmNhdGNoKCBjbGVhblVwRXJyb3IgKTtcblxuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL3N0b3JlL0RhdGEuanMiLCJjb25zdCBmaWxlbmFtZSA9IG5hbWUgPT4gYCR7bmFtZX1fcHJvamVjdC5qc29uYDtcbmNvbnN0IGZpbGVuYW1lUGF0dGVybiA9IC9eKC4qKV9wcm9qZWN0XFwuanNvbiQvO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXBvIHtcblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgcHJvamVjdCByZXBvc2l0b3J5IGZvciB0aGUgZ2l2ZW4gZGF0YSByZXBvc2l0b3J5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgdGhlIGRhdGEgcmVwb3NpdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBkYXRhICkge1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBwcm9qZWN0IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2UgdG8gY3JlYXRlIHRoZSBwcm9lamN0XG4gICAgICovXG4gICAgY3JlYXRlUHJvamVjdCggbmFtZSApIHtcblxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gW107XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc2F2ZSggZmlsZW5hbWUoIG5hbWUgKSwgcHJvamVjdCwgeyBvdmVyd3JpdGU6IGZhbHNlIH0gKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcm1hbmVudGx5IGRlbGV0ZXMgdGhlIG5hbWVkIHByb2plY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSB0byBkZWxldGUgdGhlIHByb2plY3RcbiAgICAgKi9cbiAgICBkZWxldGVQcm9qZWN0KCBuYW1lICkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucGVybURlbGV0ZSggZmlsZW5hbWUoIG5hbWUgKSApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdHMgdGhlIHByb2plY3RzIGluIHRoaXMgcmVwb3NpdG9yeVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSBvZiBsaXN0aW5nIG9mIHByb2plY3QgbmFtZXNcbiAgICAgKi9cbiAgICBsaXN0UHJvamVjdHMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5saXN0KCkudGhlbiggbGlzdGluZyA9PiBsaXN0aW5nXG4gICAgICAgICAgICAubWFwKCAoIHsgbmFtZSB9ICkgPT4gZmlsZW5hbWVQYXR0ZXJuLmV4ZWMoIG5hbWUgKSApXG4gICAgICAgICAgICAuZmlsdGVyKCB4ID0+IHggKVxuICAgICAgICAgICAgLm1hcCggKCBbICwgbmFtZSBdICkgPT4gbmFtZSApICk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL3N0b3JlL1JlcG8uanMiXSwic291cmNlUm9vdCI6IiJ9