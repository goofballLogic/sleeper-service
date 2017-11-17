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
exports.default = undefined;
var log = exports.log = console.log.bind(console);
var logError = exports.logError = console.error.bind(console);

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
                        canListProjects = _ref4[0];

                    return { canListProjects: canListProjects };
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
    var result = { canListProjects: undefined };
    var testProjects = postfix(repoTestName, [1, 2]);
    return Promise.all(testProjects.map(function (x) {
        return repo.trashProject(x);
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
                return !!repo.canListProjects;
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _diagnostics = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filename = function filename(name) {
    return name + "_project.json";
};

var Repo = function () {
    function Repo(data) {
        _classCallCheck(this, Repo);

        this.data = data;
    }

    _createClass(Repo, [{
        key: "createProject",
        value: function createProject(name) {

            var project = [];
            return this.data.save(filename(name), project, { overwrite: false });
        }
    }, {
        key: "trashProject",
        value: function trashProject(name) {

            return this.data.permDelete(filename(name));
        }
    }, {
        key: "listProjects",
        value: function listProjects() {

            return this.data.list().then(function () {

                (0, _diagnostics.logError)(new Error("Not sure what to do here"));
            });
        }
    }]);

    return Repo;
}();

exports.default = Repo;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2EwMzQ1ZGEyOGY4ZDk4YjcxM2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RpYWdub3N0aWNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlcnZpY2VzL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9sb2NhbC1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvY2FwYWJpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wcm92aWRlci1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9jYXBhYmlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvc3RvcmUvRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9zdG9yZS9SZXBvLmpzIl0sIm5hbWVzIjpbInVuZGVmaW5lZCIsImxvZyIsImNvbnNvbGUiLCJiaW5kIiwibG9nRXJyb3IiLCJlcnJvciIsInByb3ZpZGVycyIsIldlYWtNYXAiLCJjaG9zZW5LZXlzIiwiZmluZFByb3ZpZGVyIiwib3duZXIiLCJjaG9zZW5LZXkiLCJnZXQiLCJjaG9zZW4iLCJnZXRJdGVtIiwiZmluZCIsIngiLCJrZXkiLCJTZXJ2aWNlIiwiYXZhaWxhYmxlUHJvdmlkZXJzIiwicmVxdWlyZWRGdW5jdGlvbnMiLCJmb3JFYWNoIiwicCIsInZlcmlmeUludGVyZmFjZSIsInNldCIsInByb3ZpZGVyIiwibWFwIiwiZGVzY3JpYmUiLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJyZXNvbHZlIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJFIiwicHJvdG90eXBlIiwib24iLCJuYW1lIiwiY2FsbGJhY2siLCJjdHgiLCJlIiwicHVzaCIsImZuIiwib25jZSIsInNlbGYiLCJsaXN0ZW5lciIsIm9mZiIsImFwcGx5IiwiYXJndW1lbnRzIiwiXyIsImVtaXQiLCJkYXRhIiwic2xpY2UiLCJjYWxsIiwiZXZ0QXJyIiwiaSIsImxlbiIsImxlbmd0aCIsImV2dHMiLCJsaXZlRXZlbnRzIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvYWRGbGFnIiwibG9hZEVycm9yIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2FwaSIsInRoZW4iLCJjYXRjaCIsImV4Iiwid2FpdEZvciIsImNvbmRpdGlvbiIsInRpbWVvdXQiLCJkZXNjcmlwdGlvbiIsIm5ld1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwiUHJvdmlkZXIiLCJsb2FkZWQiLCJ3aW5kb3ciLCJkZXRhaWwiLCJpZGVudGl0eSIsImNhcGFiaWxpdGllcyIsIklkZW50aXR5U2VydmljZSIsImVuc3VyZVByb3ZpZGVyIiwiY3VycmVudCIsImF1dGhvcml6ZSIsImRlYXV0aG9yaXplIiwibG9jYWxTdG9yYWdlIiwiQ2FwYWJpbGl0aWVzU2VydmljZSIsImNsZWFyIiwiYWxsIiwidmVyaWZ5TGlzdCIsInZlcmlmeVN0b3JlIiwidmVyaWZ5R2V0IiwidmVyaWZ5RGVsZXRlIiwiY2FuTGlzdCIsImNhblN0b3JlIiwiY2FuR2V0IiwiY2FuRGVsZXRlIiwidmVyaWZ5UHJvamVjdHMiLCJjYW5MaXN0UHJvamVjdHMiLCJidWlsZElkZW50aXR5IiwiYXV0aCIsImF1dGgyIiwiZ2V0QXV0aEluc3RhbmNlIiwic2lnbmVkSW4iLCJpc1NpZ25lZEluIiwicHJvZmlsZSIsImN1cnJlbnRVc2VyIiwiZ2V0QmFzaWNQcm9maWxlIiwiZ2V0TmFtZSIsInVzZXJJZCIsImdldEVtYWlsIiwiT2JqZWN0IiwiYXNzaWduIiwic3RhdHVzIiwic2lnbm91dCIsInNpZ25PdXQiLCJzaWduaW4iLCJzaWduSW4iLCJEYXRlIiwibm93IiwiR29vZ2xlSWRlbnRpdHkiLCJjb25zdHJ1Y3RvciIsImZ1bmN0aW9ucyIsImZ1bmMiLCJtYXliZUZ1bmN0aW9uIiwiaW5pdCIsIlNDT1BFUyIsImpvaW4iLCJpbml0QXV0aENsaWVudCIsImNvbmZpZyIsIm9wdGlvbnMiLCJhcGlLZXkiLCJBUElfS0VZIiwiY2xpZW50SWQiLCJDTElFTlRfSUQiLCJzY29wZSIsImxvYWQiLCJjbGllbnQiLCJ0cnlJbml0QXV0aENsaWVudCIsIm5hZ2EiLCJhcHBOYW1lIiwic3RvcmFnZVZlcmlmaWNhdGlvbnMiLCJzYW1lSXRlbXMiLCJhcyIsImJzIiwiZXZlcnkiLCJpbmRleE9mIiwic2FtZUpTT04iLCJhIiwiYiIsIkpTT04iLCJzdHJpbmdpZnkiLCJwb3N0Zml4IiwicG9zdGZpeGVzIiwiZXhwZWN0NDA5RXJyb3IiLCJlcnIiLCJjb2RlIiwicHJvbWlzZUFsbFRydXRoeSIsInByb21pc2VzIiwicmVzdWx0cyIsImZhaWxzIiwiZmlsdGVyIiwidmVyaWZ5Q2FuU3RvcmUiLCJ0ZXN0TmFtZSIsInRlc3RDb250ZW50Iiwib3ZlcndyaXRlVGVzdE5hbWUiLCJzYXZlIiwiY29udGVudCIsIm92ZXJ3cml0ZSIsImRlbGV0ZUxpc3RpbmciLCJsaXN0aW5nIiwicGVybURlbGV0ZSIsImdlbmVyYXRlRHVtbWllcyIsIm5hbWVzIiwidmVyaWZ5RGF0YUNhbkxpc3QiLCJsaXN0VGVzdE5hbWUiLCJsaXN0VGVzdE5hbWVzIiwibGlzdCIsInZlcmlmeURhdGFDYW5EZWxldGUiLCJkZWxldGVUZXN0TmFtZSIsImZpbGVTcGVjIiwiZGVsZXRlQWxsIiwidmVyaWZ5RGF0YSIsImRhdGFUZXN0TmFtZSIsInJlc3VsdCIsInZlcmlmeVJlcG8iLCJyZXBvIiwicmVwb1Rlc3ROYW1lIiwidGVzdFByb2plY3RzIiwidHJhc2hQcm9qZWN0IiwiY3JlYXRlUHJvamVjdCIsImxpc3RQcm9qZWN0cyIsInZlcmlmeVN0b3JhZ2UiLCJjbGVhbnVwIiwiZGF0YVJlc3VsdHMiLCJyZXBvUmVzdWx0cyIsImluaXRTdG9yYWdlVmVyaWZpY2F0aW9ucyIsImZldGNoVGVzdERhdGEiLCJmZXRjaCIsInJlcyIsImpzb24iLCJidWlsZERhdGEiLCJpbkZvbGRlciIsImJ1aWxkUmVwbyIsImQiLCJ0ZXN0RGF0YSIsInZlcmlmaWNhdGlvbiIsInZlcmlmeUFsbFN0b3JhZ2UiLCJ3YWl0Rm9yTG9hZCIsIkdvb2dsZUNhcGFiaWxpdGllcyIsImRlbGV0ZSIsImZpbGVzQVBJIiwidXBsb2FkQVBJIiwiZm9sZGVyTWltZVR5cGUiLCJib3VuZGFyeSIsIm11bHRpUGFydE1pbWVUeXBlIiwiZGF0YU1pbWVUeXBlIiwiSlNPTmNvbnRlbnRUeXBlIiwiRmlsZVNwZWMiLCJpZCIsInRoaW5nIiwiY291bnRlciIsInJlcXVlc3QiLCJkZWZhdWx0ZWRPcHRpb25zIiwibWV0aG9kIiwicGF0aCIsImNyZWF0ZUZvbGRlciIsIm1pbWVUeXBlIiwiYm9keSIsImZpcnN0T3JOdWxsIiwidHJhbnNmb3JtIiwiZW5zdXJlRm9sZGVyIiwicSIsInBhcmFtcyIsImZpbGVzIiwibWF5YmVGb2xkZXIiLCJidWlsZCIsImR1bWJEb3duUHJlZml4IiwicHJlZml4IiwicmV0IiwiZGFzaEluZGV4Iiwic3Vic3RyaW5nIiwibGlzdEZpbGVzSW5Gb2xkZXIiLCJmb2xkZXIiLCJtYXliZVByZWZpeCIsIm5hbWVGaWx0ZXIiLCJhcGlQcmVmaXgiLCJwYWdlU2l6ZSIsImZpbmRGaWxlSW5Gb2xkZXIiLCJtYXliZVNwZWMiLCJmaWxlIiwiSlNPTnBhcnQiLCJvYmoiLCJtdWx0aXBhcnQiLCJwYXJ0U3RhcnQiLCJwYXJ0RW5kIiwicGFydHMiLCJjcmVhdGVJbkZvbGRlciIsImhlYWRlcnMiLCJ1cGxvYWRUeXBlIiwibWV0YWRhdGEiLCJwYXJlbnRzIiwidXBkYXRlSW5Gb2xkZXIiLCJ0aHJvd0FscmVhZHlFeGlzdHMiLCJzYXZlSW5Gb2xkZXIiLCJtYXliZUZpbGUiLCJsb2FkRnJvbUZvbGRlciIsImFsdCIsImRlbGV0ZUZyb21Gb2xkZXIiLCJjbGVhblVwRXJyb3IiLCJjbGVhbkVycm9yIiwic3RhdHVzVGV4dCIsIkRhdGEiLCJmb2xkZXJOYW1lIiwiZm9sZGVyU3BlYyIsImZpbGVuYW1lIiwiUmVwbyIsInByb2plY3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQTtrQkFDZUEsUztBQUNSLElBQU1DLG9CQUFNQyxRQUFRRCxHQUFSLENBQVlFLElBQVosQ0FBa0JELE9BQWxCLENBQVo7QUFDQSxJQUFNRSw4QkFBV0YsUUFBUUcsS0FBUixDQUFjRixJQUFkLENBQW9CRCxPQUFwQixDQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7QUNIUDs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNSSxhQUFZLElBQUlDLE9BQUosRUFBbEI7QUFDQSxJQUFNQyxhQUFhLElBQUlELE9BQUosRUFBbkI7O0FBRUEsU0FBU0UsWUFBVCxDQUF1QkMsS0FBdkIsRUFBK0I7O0FBRTNCLFFBQU1DLFlBQVlILFdBQVdJLEdBQVgsQ0FBZ0JGLEtBQWhCLENBQWxCO0FBQ0Es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QUVkLG1CQUFPaUIsZUFBZ0IsS0FBS3ZCLE1BQXJCLEVBQTZCTSxTQUE3QixFQUF5Q3ZMLEtBQXpDLENBQWdEMk0sWUFBaEQsQ0FBUDtBQUVIOztBQUVEOzs7Ozs7Ozs7O21DQU9ZcEIsUyxFQUFZOztBQUVwQixtQkFBT21CLGlCQUFrQixLQUFLekIsTUFBdkIsRUFBK0JNLFNBQS9CLEVBQTJDdkwsS0FBM0MsQ0FBa0QyTSxZQUFsRCxDQUFQO0FBRUg7Ozs7OztrQkEzRWdCRyxJOzs7Ozs7Ozs7Ozs7Ozs7QUMvT3JCOzs7O0FBRUEsSUFBTUcsV0FBVyxTQUFYQSxRQUFXO0FBQUEsV0FBV2hQLElBQVg7QUFBQSxDQUFqQjs7SUFFcUJpUCxJO0FBRWpCLGtCQUFhbk8sSUFBYixFQUFvQjtBQUFBOztBQUVoQixhQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFFSDs7OztzQ0FFY2QsSSxFQUFPOztBQUVsQixnQkFBTWtQLFVBQVUsRUFBaEI7QUFDQSxtQkFBTyxLQUFLcE8sSUFBTCxDQUFVcUgsSUFBVixDQUFnQjZHLFNBQVVoUCxJQUFWLENBQWhCLEVBQWtDa1AsT0FBbEMsRUFBMkMsRUFBRTdHLFdBQVcsS0FBYixFQUEzQyxDQUFQO0FBRUg7OztxQ0FFYXJJLEksRUFBTzs7QUFFakIsbUJBQU8sS0FBS2MsSUFBTCxDQUFVMEgsVUFBVixDQUFzQndHLFNBQVVoUCxJQUFWLENBQXRCLENBQVA7QUFFSDs7O3VDQUVjOztBQUVYLG1CQUFPLEtBQUtjLElBQUwsQ0FBVWdJLElBQVYsR0FBaUJoSCxJQUFqQixDQUF1QixZQUFNOztBQUVoQywyQ0FBVSxJQUFJckMsS0FBSixDQUFXLDBCQUFYLENBQVY7QUFFSCxhQUpNLENBQVA7QUFNSDs7Ozs7O2tCQTdCZ0J3UCxJIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNhMDM0NWRhMjhmOGQ5OGI3MTNkIiwiLyogZXNsaW50IG5vLWNvbnNvbGU6IDAgKi9cbmV4cG9ydCBkZWZhdWx0IHVuZGVmaW5lZDtcbmV4cG9ydCBjb25zdCBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKCBjb25zb2xlICk7XG5leHBvcnQgY29uc3QgbG9nRXJyb3IgPSBjb25zb2xlLmVycm9yLmJpbmQoIGNvbnNvbGUgKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZGlhZ25vc3RpY3MuanMiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJ0aW55LWVtaXR0ZXJcIjtcbmltcG9ydCBsb2NhbCBmcm9tIFwiLi9sb2NhbC1zdG9yZVwiO1xuXG5jb25zdCBwcm92aWRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgY2hvc2VuS2V5cyA9IG5ldyBXZWFrTWFwKCk7XG5cbmZ1bmN0aW9uIGZpbmRQcm92aWRlciggb3duZXIgKSB7XG5cbiAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggb3duZXIgKTtcbiAgICBjb25zdCBjaG9zZW4gPSBsb2NhbC5nZXRJdGVtKCBjaG9zZW5LZXkgKTtcbiAgICByZXR1cm4gcHJvdmlkZXJzLmdldCggb3duZXIgKS5maW5kKCB4ID0+IHgua2V5ID09PSBjaG9zZW4gKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCBhdmFpbGFibGVQcm92aWRlcnMsIGNob3NlbktleSwgcmVxdWlyZWRGdW5jdGlvbnMgKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgYXZhaWxhYmxlUHJvdmlkZXJzLmZvckVhY2goIHAgPT4gcC52ZXJpZnlJbnRlcmZhY2UoIHJlcXVpcmVkRnVuY3Rpb25zICkgKTtcbiAgICAgICAgcHJvdmlkZXJzLnNldCggdGhpcywgYXZhaWxhYmxlUHJvdmlkZXJzICk7XG4gICAgICAgIGNob3NlbktleXMuc2V0KCB0aGlzLCBjaG9zZW5LZXkgKTtcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IGZpbmRQcm92aWRlciggdGhpcyApO1xuXG4gICAgfVxuXG4gICAgcHJvdmlkZXJzKCkge1xuXG4gICAgICAgIHJldHVybiAoIHByb3ZpZGVycy5nZXQoIHRoaXMgKSB8fCBbXSApLm1hcCggcCA9PiBwLmRlc2NyaWJlKCkgKTtcblxuICAgIH1cblxuICAgIGVuc3VyZVByb3ZpZGVyKCkge1xuXG4gICAgICAgIGlmICggIXRoaXMucHJvdmlkZXIgKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvciggXCJObyBwcm92aWRlciBzZWxlY3RlZFwiICkgKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcy5wcm92aWRlciApO1xuXG4gICAgfVxuXG4gICAgc2VsZWN0KCBwcm92aWRlciApIHtcblxuICAgICAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggdGhpcyApO1xuICAgICAgICBsb2NhbC5zZXRJdGVtKCBjaG9zZW5LZXksIHByb3ZpZGVyLmtleSApO1xuICAgICAgICBmaW5kUHJvdmlkZXIoIHRoaXMgKTtcblxuICAgIH1cblxuICAgIGRlc2VsZWN0KCkge1xuXG4gICAgICAgIGNvbnN0IGNob3NlbktleSA9IGNob3NlbktleXMuZ2V0KCB0aGlzICk7XG4gICAgICAgIGxvY2FsLnJlbW92ZUl0ZW0oIGNob3NlbktleSApO1xuICAgICAgICBmaW5kUHJvdmlkZXIoIHRoaXMgKTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlcnZpY2VzL3NlcnZpY2UuanMiLCJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCIvKiBnbG9iYWwgZG9jdW1lbnQgKi9cbmltcG9ydCBQcm92aWRlckJhc2UgZnJvbSBcIi4uL3Byb3ZpZGVyLWJhc2VcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHsgaW5pdCB9IGZyb20gXCIuL3NoYXJlZFwiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzXCI7XG5cbmxldCBsb2FkRmxhZyA9IGZhbHNlO1xubGV0IGxvYWRFcnJvcjtcblxuaWYgKCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgKSB0aHJvdyBuZXcgRXJyb3IoIFwiZG9jdW1lbnQgaXMgdW5kZWZpbmVkXCIgKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiZ29vZ2xlLWFwaS1sb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgaW5pdCggY29uZmlnLmdhcGkgKVxuICAgICAgICAudGhlbiggKCkgPT4ge1xuXG4gICAgICAgICAgICBsb2FkRmxhZyA9IHRydWU7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC5jYXRjaCggKCBleCApID0+IHtcblxuICAgICAgICAgICAgbG9hZEVycm9yID0gZXg7XG5cbiAgICAgICAgfSApO1xuXG59ICk7XG5cbmZ1bmN0aW9uIHdhaXRGb3IoIGNvbmRpdGlvbiwgdGltZW91dCwgZGVzY3JpcHRpb24gKSB7XG5cbiAgICBpZiAoIHRpbWVvdXQgPD0gMCApIHJldHVybiBQcm9taXNlLnJlamVjdCggbmV3IEVycm9yKCBgVGltZWQgb3V0ICR7ZGVzY3JpcHRpb259YCApICk7XG4gICAgaWYgKCBjb25kaXRpb24oKSApIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRydWUgKTtcbiAgICBjb25zdCBuZXdUaW1lb3V0ID0gdGltZW91dCAtIDEwMDtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4gc2V0VGltZW91dChcblxuICAgICAgICAoKSA9PiB3YWl0Rm9yKCBjb25kaXRpb24sIG5ld1RpbWVvdXQsIGRlc2NyaXB0aW9uICkudGhlbiggcmVzb2x2ZSwgcmVqZWN0ICksXG4gICAgICAgIDEwMFxuXG4gICAgKSApO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3ZpZGVyIGV4dGVuZHMgUHJvdmlkZXJCYXNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBkZXNjcmlwdGlvbiApIHtcblxuICAgICAgICBzdXBlciggXCJnYXBpXCIsIGRlc2NyaXB0aW9uICk7XG5cbiAgICB9XG5cbiAgICBzdGF0dXMoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXG4gICAgICAgIHJldHVybiB7IGxvYWRlZDogbG9hZEZsYWcsIGxvYWRFcnJvciB9O1xuXG4gICAgfVxuXG4gICAgd2FpdEZvckxvYWQoKSB7XG5cbiAgICAgICAgaWYgKCBsb2FkRmxhZyApIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgbG9nKCBcIlByb3ZpZGVyIGxvYWRpbmcuLi5cIiwgdGhpcyApO1xuICAgICAgICByZXR1cm4gd2FpdEZvciggKCkgPT4gbG9hZEZsYWcsIDUwMDAgKS50aGVuKCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGxvZyggXCJQcm92aWRlciBsb2FkaW5nIGNvbXBsZXRlXCIsIHRoaXMgKTtcblxuICAgICAgICB9ICk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL3Byb3ZpZGVyLmpzIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgd2luZG93WyBcInNsZWVwZXItc2VydmljZS1jb25maWdcIiBdO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9jb25maWcuanMiLCIvKiBnbG9iYWwgZG9jdW1lbnQgKi9cblxuaW1wb3J0IElkZW50aXR5IGZyb20gXCIuL3NlcnZpY2VzL2lkZW50aXR5XCI7XG5pbXBvcnQgQ2FwYWJpbGl0aWVzIGZyb20gXCIuL3NlcnZpY2VzL2NhcGFiaWxpdGllc1wiO1xuXG5pbXBvcnQgZ2FwaUlkZW50aXR5IGZyb20gXCIuL2dhcGkvaWRlbnRpdHlcIjtcbmltcG9ydCBnYXBpQ2FwYWJpbGl0aWVzIGZyb20gXCIuL2dhcGkvY2FwYWJpbGl0aWVzXCI7XG5cbmlmICggdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiICkgdGhyb3cgbmV3IEVycm9yKCBcImRvY3VtZW50IGlzIG5vdCBkZWZpbmVkXCIgKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2NhdGUtc2VydmljZXNcIiwgKCBlICkgPT4ge1xuXG4gICAgZS5kZXRhaWwoIG51bGwsIHtcblxuICAgICAgICBpZGVudGl0eTogbmV3IElkZW50aXR5KCBbIGdhcGlJZGVudGl0eSBdICksXG4gICAgICAgIGNhcGFiaWxpdGllczogbmV3IENhcGFiaWxpdGllcyggWyBnYXBpQ2FwYWJpbGl0aWVzIF0gKVxuXG4gICAgfSApO1xuXG59ICk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZW50cnkuanMiLCJpbXBvcnQgU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5cbmNvbnN0IHJlcXVpcmVkRnVuY3Rpb25zID0gWyBcImN1cnJlbnRcIiwgXCJhdXRob3JpemVcIiwgXCJkZWF1dGhvcml6ZVwiIF07XG5jb25zdCBjaG9zZW5LZXkgPSBcImNob3Nlbi1pZGVudGl0eS1wcm92aWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZGVudGl0eVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm92aWRlcnMgKSB7XG5cbiAgICAgICAgc3VwZXIoIHByb3ZpZGVycywgY2hvc2VuS2V5LCByZXF1aXJlZEZ1bmN0aW9ucyApO1xuXG4gICAgfVxuXG4gICAgY3VycmVudCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5jdXJyZW50KCkgKTtcblxuICAgIH1cblxuICAgIHNpZ25JbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5hdXRob3JpemUoKSApLnRoZW4oICgpID0+IHRoaXMuY3VycmVudCgpICk7XG5cbiAgICB9XG5cbiAgICBzaWduT3V0KCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVuc3VyZVByb3ZpZGVyKCkudGhlbiggcCA9PiBwLmRlYXV0aG9yaXplKCkgKS50aGVuKCAoKSA9PiB0aGlzLmN1cnJlbnQoKSApO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc2VydmljZXMvaWRlbnRpdHkuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9sb2NhbC1zdG9yZS5qcyIsImltcG9ydCBTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VcIjtcblxuY29uc3QgY2hvc2VuS2V5ID0gXCJjaG9zZW4tY2FwYWJpbGl0aWVzLXByb3ZpZGVyXCI7XG5jb25zdCByZXF1aXJlZEZ1bmN0aW9ucyA9IFtcblxuICAgIFwiY2xlYXJcIixcbiAgICBcInZlcmlmeUxpc3RcIixcbiAgICBcInZlcmlmeVN0b3JlXCIsXG4gICAgXCJ2ZXJpZnlHZXRcIixcbiAgICBcInZlcmlmeURlbGV0ZVwiLFxuICAgIFwidmVyaWZ5UHJvamVjdHNcIixcblxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FwYWJpbGl0aWVzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoIHByb3ZpZGVycyApIHtcblxuICAgICAgICBzdXBlciggcHJvdmlkZXJzLCBjaG9zZW5LZXksIHJlcXVpcmVkRnVuY3Rpb25zICk7XG5cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5jbGVhcigpICkudGhlbiggKCkgPT4gdHJ1ZSApO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5U3RvcmFnZSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpXG4gICAgICAgICAgICAudGhlbiggcCA9PiBQcm9taXNlLmFsbCggW1xuXG4gICAgICAgICAgICAgICAgcC52ZXJpZnlMaXN0KCksXG4gICAgICAgICAgICAgICAgcC52ZXJpZnlTdG9yZSgpLFxuICAgICAgICAgICAgICAgIHAudmVyaWZ5R2V0KCksXG4gICAgICAgICAgICAgICAgcC52ZXJpZnlEZWxldGUoKSxcblxuICAgICAgICAgICAgXSApLnRoZW4oICggWyBjYW5MaXN0LCBjYW5TdG9yZSwgY2FuR2V0LCBjYW5EZWxldGUgXSApID0+ICgge1xuXG4gICAgICAgICAgICAgICAgY2FuTGlzdCxcbiAgICAgICAgICAgICAgICBjYW5TdG9yZSxcbiAgICAgICAgICAgICAgICBjYW5HZXQsXG4gICAgICAgICAgICAgICAgY2FuRGVsZXRlLFxuXG4gICAgICAgICAgICB9ICkgKSApO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5UHJvamVjdFJlcG8oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKVxuICAgICAgICAgICAgLnRoZW4oIHAgPT4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICAgICAgICAgIHAudmVyaWZ5UHJvamVjdHMoKSxcblxuICAgICAgICAgICAgXSApLnRoZW4oICggWyBjYW5MaXN0UHJvamVjdHMgXSApID0+ICggeyBjYW5MaXN0UHJvamVjdHMgfSApICkgKTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5qcyIsIi8qIGdsb2JhbCBnYXBpICovXG5cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiLi9wcm92aWRlclwiO1xuXG5mdW5jdGlvbiBidWlsZElkZW50aXR5KCBwICkge1xuXG4gICAgY29uc3QgYXV0aCA9IGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCk7XG4gICAgY29uc3Qgc2lnbmVkSW4gPSBhdXRoLmlzU2lnbmVkSW4uZ2V0KCk7XG4gICAgY29uc3QgcHJvZmlsZSA9IHNpZ25lZEluID8gYXV0aC5jdXJyZW50VXNlci5nZXQoKS5nZXRCYXNpY1Byb2ZpbGUoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBuYW1lID0gKCBzaWduZWRJbiAmJiBwcm9maWxlICkgPyBwcm9maWxlLmdldE5hbWUoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB1c2VySWQgPSAoIHNpZ25lZEluICYmIHByb2ZpbGUgKSA/IHByb2ZpbGUuZ2V0RW1haWwoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm92aWRlciA9IE9iamVjdC5hc3NpZ24oIHAuZGVzY3JpYmUoKSwgcC5zdGF0dXMoKSApO1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgcHJvdmlkZXIsIHNpZ25lZEluLCB1c2VySWQsIG5hbWUsXG5cbiAgICB9O1xuXG59XG5cbmZ1bmN0aW9uIHNpZ25vdXQoIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIGNvbnN0IGF1dGggPSBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpO1xuICAgIHJldHVybiBhdXRoLnNpZ25PdXQoKS50aGVuKCByZXNvbHZlLCByZWplY3QgKTtcblxufVxuXG5mdW5jdGlvbiBzaWduaW4oIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIGNvbnN0IGF1dGggPSBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpO1xuICAgIGF1dGguc2lnbkluKCkudGhlbihcblxuICAgICAgICAoKSA9PiByZXNvbHZlKCBEYXRlLm5vdygpICksXG4gICAgICAgIHggPT4gcmVqZWN0KCB4LmVycm9yIHx8IHggKVxuXG4gICAgKTtcblxufVxuXG5jbGFzcyBHb29nbGVJZGVudGl0eSBleHRlbmRzIFByb3ZpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKCBcIllvdXIgR29vZ2xlIGlkZW50aXR5IChlLmcuIGdtYWlsKVwiICk7XG5cbiAgICB9XG5cbiAgICBjdXJyZW50KCkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiByZXNvbHZlKCBidWlsZElkZW50aXR5KCB0aGlzICkgKSApO1xuXG4gICAgfVxuXG4gICAgYXV0aG9yaXplKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoIHNpZ25pbiApO1xuXG4gICAgfVxuXG4gICAgZGVhdXRob3JpemUoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggc2lnbm91dCApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHb29nbGVJZGVudGl0eSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvaWRlbnRpdHkuanMiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJ0aW55LWVtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdmlkZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoIGtleSwgZGVzY3JpcHRpb24gKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5SW50ZXJmYWNlKCBmdW5jdGlvbnMgKSB7XG5cbiAgICAgICAgZnVuY3Rpb25zLmZvckVhY2goICggZnVuYyApID0+IHtcblxuICAgICAgICAgICAgY29uc3QgbWF5YmVGdW5jdGlvbiA9IHRoaXNbIGZ1bmMgXTtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIG1heWJlRnVuY3Rpb24gIT09IFwiZnVuY3Rpb25cIiApIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggYFByb3ZpZGVyICR7cHJvdmlkZXJ9IGRvZXMgbm90IHByb3ZpZGUgZnVuY3Rpb24gJyR7ZnVuY30nICgke21heWJlRnVuY3Rpb259KWAgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gKTtcblxuICAgIH1cblxuICAgIGRlc2NyaWJlKCkge1xuXG4gICAgICAgIGNvbnN0IHsga2V5LCBuYW1lLCBkZXNjcmlwdGlvbiB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHsga2V5LCBuYW1lLCBkZXNjcmlwdGlvbiB9O1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvcHJvdmlkZXItYmFzZS5qcyIsIi8qIGdsb2JhbCBnYXBpICovXG5cbmNvbnN0IFNDT1BFUyA9IFtcblxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5tZXRhZGF0YS5yZWFkb25seVwiLFxuICAgIFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5maWxlXCIsXG5cbl0uam9pbiggXCIgXCIgKTtcblxuZnVuY3Rpb24gaW5pdEF1dGhDbGllbnQoIGNvbmZpZywgcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcblxuICAgICAgICBhcGlLZXk6IGNvbmZpZy5BUElfS0VZLFxuICAgICAgICBjbGllbnRJZDogY29uZmlnLkNMSUVOVF9JRCxcbiAgICAgICAgc2NvcGU6IGNvbmZpZy5TQ09QRVMgfHwgU0NPUEVTLFxuXG4gICAgfTtcbiAgICBnYXBpLmxvYWQoIFwiY2xpZW50OmF1dGgyXCIsICgpID0+IGdhcGkuY2xpZW50XG4gICAgICAgIC5pbml0KCBvcHRpb25zIClcbiAgICAgICAgLnRoZW4oIHJlc29sdmUsIHJlamVjdCApICk7XG5cbn1cblxuZnVuY3Rpb24gdHJ5SW5pdEF1dGhDbGllbnQoIGNvbmZpZywgcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBpbml0QXV0aENsaWVudCggY29uZmlnLCByZXNvbHZlLCByZWplY3QgKTtcblxuICAgIH0gY2F0Y2ggKCBlICkge1xuXG4gICAgICAgIHJlamVjdCggZSApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IHVuZGVmaW5lZDtcbmV4cG9ydCBmdW5jdGlvbiBpbml0KCBjb25maWcgKSB7XG5cbiAgICBjb25zdCBuYWdhID0gdHJ5SW5pdEF1dGhDbGllbnQuYmluZCggbnVsbCwgY29uZmlnICk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCBuYWdhICk7XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9zaGFyZWQuanMiLCIvKiBnbG9iYWwgZmV0Y2ggKi9cblxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCIuL3Byb3ZpZGVyXCI7XG5pbXBvcnQgRGF0YSBmcm9tIFwiLi9zdG9yZS9EYXRhXCI7XG5pbXBvcnQgUmVwbyBmcm9tIFwiLi9zdG9yZS9SZXBvXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7IGxvZywgbG9nRXJyb3IgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3NcIjtcblxuY29uc3QgeyBhcHBOYW1lIH0gPSBjb25maWc7XG5jb25zdCBzdG9yYWdlVmVyaWZpY2F0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IHNhbWVJdGVtcyA9ICggYXMsIGJzICkgPT4gYXMubGVuZ3RoID09PSBicy5sZW5ndGggJiYgYXMuZXZlcnkoIHggPT4gfmJzLmluZGV4T2YoIHggKSApO1xuY29uc3Qgc2FtZUpTT04gPSAoIGEsIGIgKSA9PiBKU09OLnN0cmluZ2lmeSggYSApID09PSBKU09OLnN0cmluZ2lmeSggYiApO1xuY29uc3QgcG9zdGZpeCA9ICggeCwgcG9zdGZpeGVzICkgPT4gcG9zdGZpeGVzLm1hcCggcCA9PiBgJHt4fV9fJHtwfWAgKTtcblxuZnVuY3Rpb24gZXhwZWN0NDA5RXJyb3IoIGVyciApIHtcblxuICAgIGlmICggZXJyLmNvZGUgIT09IDQwOSApIHtcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIGBFeHBlY3RlZCBhIDQwOSByZWplY3Rpb24gb2Ygbm9uLW92ZXJ3cml0ZSByZXF1ZXN0LCBidXQgZ290ICR7ZXJyfWAgKTtcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBwcm9taXNlQWxsVHJ1dGh5KCBwcm9taXNlcyApIHtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbCggcHJvbWlzZXMubWFwKCBwID0+IHAuY2F0Y2goIGxvZ0Vycm9yICkgKSApLnRoZW4oICggcmVzdWx0cyApID0+IHtcblxuICAgICAgICBjb25zdCBmYWlscyA9IHJlc3VsdHMubWFwKCAoIHgsIGkgKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICggeCApIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VzWyBpIF07XG5cbiAgICAgICAgfSApLmZpbHRlciggeCA9PiB4ICk7XG4gICAgICAgIHJldHVybiBmYWlscy5sZW5ndGggPyBQcm9taXNlLnJlamVjdCggZmFpbHMgKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUNhblN0b3JlKCBkYXRhLCB0ZXN0TmFtZSwgdGVzdENvbnRlbnQgKSB7XG5cbiAgICBjb25zdCBvdmVyd3JpdGVUZXN0TmFtZSA9IGAke3Rlc3ROYW1lfS1wcmVleGlzdGluZ2A7XG4gICAgcmV0dXJuIHByb21pc2VBbGxUcnV0aHkoIFtcblxuICAgICAgICBkYXRhLnNhdmUoIHRlc3ROYW1lLCB0ZXN0Q29udGVudCApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gZGF0YS5sb2FkKCB0ZXN0TmFtZSApIClcbiAgICAgICAgICAgIC50aGVuKCBjb250ZW50ID0+IHNhbWVKU09OKCB0ZXN0Q29udGVudCwgY29udGVudCApICksXG5cbiAgICAgICAgZGF0YS5zYXZlKCBvdmVyd3JpdGVUZXN0TmFtZSwgNDIgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IGRhdGEuc2F2ZSggb3ZlcndyaXRlVGVzdE5hbWUsIDQyLCB7IG92ZXJ3cml0ZTogZmFsc2UgfSApIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIFwiRmFpbGVkIHRvIHJlamVjdCBub24tb3ZlcndyaXRlIHJlcXVlc3RcIiApO1xuXG4gICAgICAgICAgICB9IClcbiAgICAgICAgICAgIC5jYXRjaCggZXhwZWN0NDA5RXJyb3IgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHRydWUgKVxuXG4gICAgXSApLmNhdGNoKCAoKSA9PiBmYWxzZSApO1xuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUxpc3RpbmcoIGRhdGEsIGxpc3RpbmcgKSB7XG5cbiAgICByZXR1cm4gcHJvbWlzZUFsbFRydXRoeSggbGlzdGluZy5tYXAoIHggPT4gZGF0YS5wZXJtRGVsZXRlKCB4ICkgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRHVtbWllcyggZGF0YSwgbmFtZXMgKSB7XG5cbiAgICByZXR1cm4gcHJvbWlzZUFsbFRydXRoeSggbmFtZXMubWFwKCB4ID0+IGRhdGEuc2F2ZSggeCwgXCJoZWxsbywgZHVtbXlcIiApICkgKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlEYXRhQ2FuTGlzdCggZGF0YSwgdGVzdE5hbWUgKSB7XG5cbiAgICBjb25zdCBsaXN0VGVzdE5hbWUgPSBgJHt0ZXN0TmFtZX1fX2xpc3RgO1xuICAgIGNvbnN0IGxpc3RUZXN0TmFtZXMgPSBwb3N0Zml4KCBsaXN0VGVzdE5hbWUsIFsgMSwgMiwgMyBdICk7XG4gICAgcmV0dXJuIGRhdGEubGlzdCggbGlzdFRlc3ROYW1lIClcbiAgICAgICAgLnRoZW4oIGxpc3RpbmcgPT4gZGVsZXRlTGlzdGluZyggZGF0YSwgbGlzdGluZyApIClcbiAgICAgICAgLnRoZW4oICgpID0+IGdlbmVyYXRlRHVtbWllcyggZGF0YSwgbGlzdFRlc3ROYW1lcyApIClcbiAgICAgICAgLnRoZW4oICgpID0+IGRhdGEubGlzdCggbGlzdFRlc3ROYW1lICkgKVxuICAgICAgICAudGhlbiggbGlzdGluZyA9PiBzYW1lSXRlbXMoIGxpc3RpbmcubWFwKCB4ID0+IHgubmFtZSApLCBsaXN0VGVzdE5hbWVzICkgKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlEYXRhQ2FuRGVsZXRlKCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIGNvbnN0IGRlbGV0ZVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19kZWxldGVgO1xuICAgIHJldHVybiBkYXRhLnNhdmUoIGRlbGV0ZVRlc3ROYW1lLCBcInN0dWZmXCIgKVxuICAgICAgICAudGhlbiggZmlsZVNwZWMgPT4gZGF0YS5wZXJtRGVsZXRlKCBmaWxlU3BlYyApLnRoZW4oICgpID0+IGRhdGEubG9hZCggZmlsZVNwZWMgKSApIClcbiAgICAgICAgLmNhdGNoKCBlcnIgPT4gbG9nRXJyb3IoIGVyciApIHx8IFByb21pc2UucmVzb2x2ZSggZXJyLmNvZGUgPT09IDQwNCApICk7XG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlQWxsKCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIHJldHVybiBkYXRhLmxpc3QoIHRlc3ROYW1lIClcbiAgICAgICAgLnRoZW4oIGxpc3RpbmcgPT4gcHJvbWlzZUFsbFRydXRoeSggbGlzdGluZy5tYXAoIHggPT4gZGF0YS5wZXJtRGVsZXRlKCB4ICkgKSApICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5RGF0YSggZGF0YSwgdGVzdE5hbWUsIHRlc3RDb250ZW50ICkge1xuXG4gICAgY29uc3QgZGF0YVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19kYXRhYDtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGNhbkxpc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuU3RvcmU6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlOiB1bmRlZmluZWQsXG4gICAgICAgIGNhbkdldDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgcmV0dXJuIHZlcmlmeUNhblN0b3JlKCBkYXRhLCBkYXRhVGVzdE5hbWUsIHRlc3RDb250ZW50IClcbiAgICAgICAgLnRoZW4oICggY2FuU3RvcmUgKSA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5jYW5TdG9yZSA9IHJlc3VsdC5jYW5HZXQgPSBjYW5TdG9yZTtcbiAgICAgICAgICAgIGlmICggIWNhblN0b3JlICkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICAgICAgICAgIHZlcmlmeURhdGFDYW5MaXN0KCBkYXRhLCBkYXRhVGVzdE5hbWUgKSxcbiAgICAgICAgICAgICAgICB2ZXJpZnlEYXRhQ2FuRGVsZXRlKCBkYXRhLCBkYXRhVGVzdE5hbWUgKVxuXG4gICAgICAgICAgICBdICkudGhlbiggKCBbIGNhbkxpc3QsIGNhbkRlbGV0ZSBdICkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmNhbkxpc3QgPSBjYW5MaXN0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC5jYW5EZWxldGUgPSBjYW5EZWxldGU7XG5cbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICB9IClcbiAgICAgICAgLnRoZW4oICgpID0+IHJlc3VsdCApO1xuXG59XG5cbmZ1bmN0aW9uIHZlcmlmeVJlcG8oIHJlcG8sIHRlc3ROYW1lICkge1xuXG4gICAgY29uc3QgcmVwb1Rlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19yZXBvYDtcbiAgICBjb25zdCByZXN1bHQgPSB7IGNhbkxpc3RQcm9qZWN0czogdW5kZWZpbmVkIH07XG4gICAgY29uc3QgdGVzdFByb2plY3RzID0gcG9zdGZpeCggcmVwb1Rlc3ROYW1lLCBbIDEsIDIgXSApO1xuICAgIHJldHVybiBQcm9taXNlLmFsbCggdGVzdFByb2plY3RzLm1hcCggeCA9PiByZXBvLnRyYXNoUHJvamVjdCggeCApICkgKVxuICAgICAgICAudGhlbiggKCkgPT4gUHJvbWlzZS5hbGwoIHRlc3RQcm9qZWN0cy5tYXAoIHggPT4gcmVwby5jcmVhdGVQcm9qZWN0KCB4ICkgKSApIClcbiAgICAgICAgLnRoZW4oICgpID0+IHJlcG8ubGlzdFByb2plY3RzKCkgKVxuICAgICAgICAudGhlbiggKCBsaXN0aW5nICkgPT4ge1xuXG4gICAgICAgICAgICByZXN1bHQuY2FuTGlzdFByb2plY3RzID0gdGVzdFByb2plY3RzLmV2ZXJ5KCB4ID0+IH5saXN0aW5nLmluZGV4T2YoIHggKSApO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAuY2F0Y2goICggZXggKSA9PiB7XG5cbiAgICAgICAgICAgIGxvZ0Vycm9yKCBleCApO1xuICAgICAgICAgICAgcmVzdWx0LmV4ID0gZXg7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCAoKSA9PiByZXN1bHQgKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlTdG9yYWdlKCBkYXRhLCByZXBvLCB0ZXN0TmFtZSwgdGVzdENvbnRlbnQgKSB7XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuXG4gICAgICAgIGRlbGV0ZUFsbCggZGF0YSwgdGVzdE5hbWUgKS5jYXRjaCggZXJyID0+IGxvZ0Vycm9yKCBcIkNsZWFuaW5nIHVwIGFmdGVyIHNlbGYgdGVzdFwiLCBlcnIgKSApO1xuXG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLmFsbCggW1xuXG4gICAgICAgIHZlcmlmeURhdGEoIGRhdGEsIHRlc3ROYW1lLCB0ZXN0Q29udGVudCApLFxuICAgICAgICB2ZXJpZnlSZXBvKCByZXBvLCB0ZXN0TmFtZSApXG5cbiAgICBdICkudGhlbiggKCBbIGRhdGFSZXN1bHRzLCByZXBvUmVzdWx0cyBdICkgPT4ge1xuXG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgcmV0dXJuIHsgZGF0YTogZGF0YVJlc3VsdHMsIHJlcG86IHJlcG9SZXN1bHRzIH07XG5cbiAgICB9ICkuY2F0Y2goICggZXggKSA9PiB7XG5cbiAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB0aHJvdyBleDtcblxuICAgIH0gKTtcblxufVxuXG5mdW5jdGlvbiBpbml0U3RvcmFnZVZlcmlmaWNhdGlvbnMoIG93bmVyICkge1xuXG4gICAgY29uc3QgZmV0Y2hUZXN0RGF0YSA9IGZldGNoKCBcIi9wdWJsaWMvZGF0YS9ub3RzaGFrYS5qc29uXCIgKS50aGVuKCByZXMgPT4gcmVzLmpzb24oKSApO1xuICAgIGNvbnN0IGJ1aWxkRGF0YSA9IERhdGEuaW5Gb2xkZXIoIGFwcE5hbWUgKTtcbiAgICBjb25zdCBidWlsZFJlcG8gPSBidWlsZERhdGEudGhlbiggZCA9PiBuZXcgUmVwbyggZCApICk7XG4gICAgY29uc3QgdGVzdE5hbWUgPSBgX190ZW1wX3Rlc3RpbmdfJHthcHBOYW1lfWA7XG4gICAgbG9nKCBcIlZlcmlmeSBhbGwgc3RvcmFnZS4uLlwiLCBvd25lciApO1xuICAgIHJldHVybiBQcm9taXNlLmFsbCggWyBidWlsZERhdGEsIGJ1aWxkUmVwbywgZmV0Y2hUZXN0RGF0YSBdIClcbiAgICAgICAgLnRoZW4oICggWyBkYXRhLCByZXBvLCB0ZXN0RGF0YSBdICkgPT4gdmVyaWZ5U3RvcmFnZSggZGF0YSwgcmVwbywgdGVzdE5hbWUsIHRlc3REYXRhICkgKVxuICAgICAgICAudGhlbiggdmVyaWZpY2F0aW9uID0+IHN0b3JhZ2VWZXJpZmljYXRpb25zLnNldCggb3duZXIsIHZlcmlmaWNhdGlvbiApIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcblxuICAgICAgICAgICAgbG9nKCBcIlZlcmlmeSBhbGwgc3RvcmFnZSBjb21wbGV0ZVwiLCBvd25lciApO1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JhZ2VWZXJpZmljYXRpb25zLmdldCggb3duZXIgKTtcblxuICAgICAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5QWxsU3RvcmFnZSggb3duZXIgKSB7XG5cbiAgICByZXR1cm4gb3duZXIud2FpdEZvckxvYWQoKS50aGVuKCAoKSA9PlxuXG4gICAgICAgIHN0b3JhZ2VWZXJpZmljYXRpb25zLmdldCggb3duZXIgKVxuICAgICAgICB8fFxuICAgICAgICBzdG9yYWdlVmVyaWZpY2F0aW9ucy5zZXQoIG93bmVyLCBpbml0U3RvcmFnZVZlcmlmaWNhdGlvbnMoIG93bmVyICkgKS5nZXQoIG93bmVyIClcblxuICAgICk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuY3Rpb24tcGFyZW4tbmV3bGluZVxuXG59XG5cbmNsYXNzIEdvb2dsZUNhcGFiaWxpdGllcyBleHRlbmRzIFByb3ZpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKCBcIllvdXIgR29vZ2xlIERyaXZlIHN0b3JhZ2VcIiApO1xuXG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG5cbiAgICAgICAgc3RvcmFnZVZlcmlmaWNhdGlvbnMuZGVsZXRlKCB0aGlzICk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIH1cblxuICAgIHZlcmlmeUxpc3QoKSB7XG5cbiAgICAgICAgcmV0dXJuIHZlcmlmeUFsbFN0b3JhZ2UoIHRoaXMgKS50aGVuKCAoIHsgZGF0YSB9ICkgPT4gISFkYXRhLmNhbkxpc3QgKTtcblxuICAgIH1cblxuICAgIHZlcmlmeVN0b3JlKCkge1xuXG4gICAgICAgIHJldHVybiB2ZXJpZnlBbGxTdG9yYWdlKCB0aGlzICkudGhlbiggKCB7IGRhdGEgfSApID0+ICEhZGF0YS5jYW5TdG9yZSApO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5R2V0KCkge1xuXG4gICAgICAgIHJldHVybiB2ZXJpZnlBbGxTdG9yYWdlKCB0aGlzICkudGhlbiggKCB7IGRhdGEgfSApID0+ICEhZGF0YS5jYW5HZXQgKTtcblxuICAgIH1cblxuICAgIHZlcmlmeURlbGV0ZSgpIHtcblxuICAgICAgICByZXR1cm4gdmVyaWZ5QWxsU3RvcmFnZSggdGhpcyApLnRoZW4oICggeyBkYXRhIH0gKSA9PiAhIWRhdGEuY2FuRGVsZXRlICk7XG5cbiAgICB9XG5cbiAgICB2ZXJpZnlQcm9qZWN0cygpIHtcblxuICAgICAgICByZXR1cm4gdmVyaWZ5QWxsU3RvcmFnZSggdGhpcyApLnRoZW4oICggeyByZXBvIH0gKSA9PiAhIXJlcG8uY2FuTGlzdFByb2plY3RzICk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEdvb2dsZUNhcGFiaWxpdGllcygpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL2NhcGFiaWxpdGllcy5qcyIsIi8qIGdsb2JhbCBnYXBpICovXG5cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi8uLi9kaWFnbm9zdGljc1wiO1xuXG5jb25zdCBmaWxlc0FQSSA9IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZHJpdmUvdjMvZmlsZXNcIjtcbmNvbnN0IHVwbG9hZEFQSSA9IFwiaHR0cHM6Ly9jb250ZW50Lmdvb2dsZWFwaXMuY29tL3VwbG9hZC9kcml2ZS92My9maWxlc1wiO1xuY29uc3QgZm9sZGVyTWltZVR5cGUgPSBcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIjtcbmNvbnN0IGJvdW5kYXJ5ID0gXCIuLi4uLi5cIjtcbmNvbnN0IG11bHRpUGFydE1pbWVUeXBlID0gYG11bHRpcGFydC9yZWxhdGVkOyBib3VuZGFyeT0ke2JvdW5kYXJ5fWA7XG5jb25zdCBkYXRhTWltZVR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbmNvbnN0IEpTT05jb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiO1xuXG5jbGFzcyBGaWxlU3BlYyB7XG5cbiAgICBjb25zdHJ1Y3RvciggeyBpZCwgbmFtZSB9ICkge1xuXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBidWlsZCggdGhpbmcgKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGaWxlU3BlYyggdGhpbmcgKTtcblxuICAgIH1cblxufVxuXG5sZXQgY291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIHJlcXVlc3QoIG9wdGlvbnMgKSB7XG5cbiAgICBjb25zdCBkZWZhdWx0ZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbiggeyBtZXRob2Q6IFwiR0VUXCIsIHBhdGg6IGZpbGVzQVBJIH0sIG9wdGlvbnMgKTtcbiAgICBsb2coIFwiR0FQSSByZXF1ZXN0XCIsICsrY291bnRlciwgZGVmYXVsdGVkT3B0aW9ucyApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlLCByZWplY3QgKSA9PiBnYXBpLmNsaWVudFxuICAgICAgICAucmVxdWVzdCggZGVmYXVsdGVkT3B0aW9ucyApXG4gICAgICAgIC50aGVuKCByZXNvbHZlLCByZWplY3QgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvbGRlciggbmFtZSApIHtcblxuICAgIGNvbnN0IG1pbWVUeXBlID0gZm9sZGVyTWltZVR5cGU7XG4gICAgY29uc3QgYm9keSA9IHsgbmFtZSwgbWltZVR5cGUgfTtcbiAgICBjb25zdCBtZXRob2QgPSBcIlBPU1RcIjtcbiAgICByZXR1cm4gcmVxdWVzdCggeyBtZXRob2QsIGJvZHkgfSApO1xuXG59XG5cbmZ1bmN0aW9uIGZpcnN0T3JOdWxsKCBsaXN0LCB0cmFuc2Zvcm0gPSB4ID0+IHggKSB7XG5cbiAgICBpZiAoIGxpc3QgJiYgbGlzdC5sZW5ndGggKSByZXR1cm4gdHJhbnNmb3JtKCBsaXN0WyAwIF0gKTtcbiAgICByZXR1cm4gbnVsbDtcblxufVxuZnVuY3Rpb24gZW5zdXJlRm9sZGVyKCBuYW1lICkge1xuXG4gICAgY29uc3QgcSA9IGBuYW1lPScke25hbWV9JyBhbmQgbWltZVR5cGU9JyR7Zm9sZGVyTWltZVR5cGV9JyBhbmQgdHJhc2hlZD1mYWxzZWA7XG4gICAgY29uc3QgcGFyYW1zID0geyBxIH07XG4gICAgcmV0dXJuIHJlcXVlc3QoIHsgcGFyYW1zIH0gKVxuICAgICAgICAudGhlbiggcmVzID0+IHJlcy5yZXN1bHQuZmlsZXMgKVxuICAgICAgICAudGhlbiggZmlyc3RPck51bGwgKVxuICAgICAgICAudGhlbiggbWF5YmVGb2xkZXIgPT4gbWF5YmVGb2xkZXIgfHwgY3JlYXRlRm9sZGVyKCBuYW1lICkgKVxuICAgICAgICAudGhlbiggRmlsZVNwZWMuYnVpbGQgKTtcblxufVxuXG5mdW5jdGlvbiBkdW1iRG93blByZWZpeCggcHJlZml4ICkge1xuXG4gICAgbGV0IHJldCA9IHByZWZpeDtcbiAgICAvLyBBUEkgZG9lc24ndCBsaWtlIGRhc2hlcyBmb3Igc29tZSByZWFzb25cbiAgICBjb25zdCBkYXNoSW5kZXggPSByZXQuaW5kZXhPZiggXCItXCIgKTtcbiAgICBpZiAoIH5kYXNoSW5kZXggKSByZXQgPSByZXQuc3Vic3RyaW5nKCAwLCBkYXNoSW5kZXggKTtcbiAgICAvLyBBUEkgZG9lc24ndCBsaWtlIG1vcmUgdGhhbiB+MjAgY2hhcmFjdGVycyBmb3Igc29tZSByZWFzb25cbiAgICBpZiAoIHJldC5sZW5ndGggPiAyMCApIHJldCA9IHJldC5zdWJzdHJpbmcoIDAsIDIwICk7XG4gICAgcmV0dXJuIHJldDtcblxufVxuZnVuY3Rpb24gbGlzdEZpbGVzSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVQcmVmaXggKSB7XG5cbiAgICBsZXQgcSA9IGBtaW1lVHlwZT0nJHtkYXRhTWltZVR5cGV9JyBhbmQgdHJhc2hlZD1mYWxzZWA7XG4gICAgbGV0IG5hbWVGaWx0ZXIgPSAoKSA9PiB0cnVlO1xuICAgIGlmICggbWF5YmVQcmVmaXggKSB7XG5cbiAgICAgICAgY29uc3QgYXBpUHJlZml4ID0gZHVtYkRvd25QcmVmaXgoIG1heWJlUHJlZml4ICk7XG4gICAgICAgIGlmICggYXBpUHJlZml4ICE9PSBtYXliZVByZWZpeCApIHtcblxuICAgICAgICAgICAgbmFtZUZpbHRlciA9IHggPT4geC5uYW1lLmluZGV4T2YoIG1heWJlUHJlZml4ICkgPT09IDA7XG5cbiAgICAgICAgfVxuICAgICAgICBxID0gYG5hbWUgY29udGFpbnMgJyR7YXBpUHJlZml4fScgYW5kICR7cX1gO1xuXG4gICAgfVxuICAgIGNvbnN0IHBhZ2VTaXplID0gMTAwMDtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHEsIHBhZ2VTaXplIH07XG4gICAgcmV0dXJuIHJlcXVlc3QoIHsgcGFyYW1zIH0gKVxuICAgICAgICAudGhlbiggcmVzID0+IHJlcy5yZXN1bHQuZmlsZXMgKVxuICAgICAgICAudGhlbiggZmlsZXMgPT4gZmlsZXMuZmlsdGVyKCBuYW1lRmlsdGVyICkubWFwKCBGaWxlU3BlYy5idWlsZCApICk7XG5cbn1cblxuZnVuY3Rpb24gZmluZEZpbGVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKSB7XG5cbiAgICBpZiAoIG1heWJlU3BlYyBpbnN0YW5jZW9mIEZpbGVTcGVjICkge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIG1heWJlU3BlYyApO1xuXG4gICAgfVxuICAgIGNvbnN0IHsgaWQgfSA9IGZvbGRlciB8fCB7fTtcbiAgICBjb25zdCBxID0gYG5hbWU9JyR7bWF5YmVTcGVjfScgYW5kICcke2lkfScgaW4gcGFyZW50cyBhbmQgbWltZVR5cGU9JyR7ZGF0YU1pbWVUeXBlfScgYW5kIHRyYXNoZWQ9ZmFsc2VgO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgcSB9O1xuICAgIHJldHVybiByZXF1ZXN0KCB7IHBhcmFtcyB9IClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMucmVzdWx0LmZpbGVzIClcbiAgICAgICAgLnRoZW4oIGZpbGVzID0+IGZpcnN0T3JOdWxsKCBmaWxlcywgZmlsZSA9PiBGaWxlU3BlYy5idWlsZCggZmlsZSApICkgKTtcblxufVxuXG5mdW5jdGlvbiBKU09OcGFydCggb2JqICkge1xuXG4gICAgcmV0dXJuIGBcXHJcXG5Db250ZW50LVR5cGU6ICR7SlNPTmNvbnRlbnRUeXBlfVxcclxcblxcclxcbiR7SlNPTi5zdHJpbmdpZnkoIG9iaiwgbnVsbCwgMSApfWA7XG5cbn1cblxuZnVuY3Rpb24gbXVsdGlwYXJ0KCAuLi5wYXJ0cyApIHtcblxuICAgIGNvbnN0IHBhcnRTdGFydCA9IGBcXHJcXG4tLSR7Ym91bmRhcnl9YDtcbiAgICBjb25zdCBwYXJ0RW5kID0gYCR7cGFydFN0YXJ0fS0tYDtcbiAgICByZXR1cm4gcGFydFN0YXJ0ICsgcGFydHMuam9pbiggcGFydFN0YXJ0ICkgKyBwYXJ0RW5kO1xuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluRm9sZGVyKCBmb2xkZXIsIG5hbWUsIGRhdGEgKSB7XG5cbiAgICBjb25zdCBtZXRob2QgPSBcIlBPU1RcIjtcbiAgICBjb25zdCBoZWFkZXJzID0geyBcIkNvbnRlbnQtVHlwZVwiOiBtdWx0aVBhcnRNaW1lVHlwZSB9O1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgdXBsb2FkVHlwZTogXCJtdWx0aXBhcnRcIiB9O1xuICAgIGNvbnN0IG1ldGFkYXRhID0geyBwYXJlbnRzOiBbIGZvbGRlci5pZCBdLCBuYW1lIH07XG4gICAgY29uc3QgYm9keSA9IG11bHRpcGFydCggSlNPTnBhcnQoIG1ldGFkYXRhICksIEpTT05wYXJ0KCBkYXRhICkgKTtcbiAgICBjb25zdCBwYXRoID0gdXBsb2FkQVBJO1xuICAgIHJldHVybiByZXF1ZXN0KCB7XG5cbiAgICAgICAgcGF0aCwgbWV0aG9kLCBwYXJhbXMsIGhlYWRlcnMsIGJvZHksXG5cbiAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5Gb2xkZXIoIGZvbGRlciwgZmlsZSwgZGF0YSApIHtcblxuICAgIGNvbnN0IG1ldGhvZCA9IFwiUEFUQ0hcIjtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHVwbG9hZFR5cGU6IFwibWVkaWFcIiB9O1xuICAgIGNvbnN0IG1pbWVUeXBlID0gZGF0YU1pbWVUeXBlO1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSggZGF0YSApO1xuICAgIGNvbnN0IHBhdGggPSBgJHt1cGxvYWRBUEl9LyR7ZmlsZS5pZH1gO1xuICAgIHJldHVybiByZXF1ZXN0KCB7XG5cbiAgICAgICAgcGF0aCwgbWV0aG9kLCBwYXJhbXMsIG1pbWVUeXBlLCBib2R5LFxuXG4gICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIHRocm93QWxyZWFkeUV4aXN0cyggZmlsZSApIHtcblxuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvciggYEZpbGUgYWxyZWFkeSBleGlzdHM6ICR7ZmlsZS5pZH0gJHtmaWxlLm5hbWV9YCApO1xuICAgIGVyci5jb2RlID0gNDA5O1xuICAgIHRocm93IGVycjtcblxufVxuXG5mdW5jdGlvbiBzYXZlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjLCBkYXRhLCBvcHRpb25zID0ge30gKSB7XG5cbiAgICBjb25zdCB7IG92ZXJ3cml0ZSB9ID0gb3B0aW9ucztcbiAgICByZXR1cm4gZmluZEZpbGVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKVxuICAgICAgICAudGhlbiggKCBtYXliZUZpbGUgKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICggbWF5YmVGaWxlICYmICFvdmVyd3JpdGUgKSB0aHJvd0FscmVhZHlFeGlzdHMoIG1heWJlRmlsZSApO1xuICAgICAgICAgICAgaWYgKCBtYXliZUZpbGUgKSByZXR1cm4gdXBkYXRlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVGaWxlLCBkYXRhICk7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjLCBkYXRhICk7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gRmlsZVNwZWMuYnVpbGQoIHJlcy5yZXN1bHQgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGxvYWRGcm9tRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApIHtcblxuICAgIHJldHVybiBmaW5kRmlsZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApXG4gICAgICAgIC50aGVuKCAoIG1heWJlRmlsZSApID0+IHtcblxuICAgICAgICAgICAgaWYgKCBtYXliZUZpbGUgKSByZXR1cm4gbWF5YmVGaWxlO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICBlcnIuZXJyb3IgPSB7IGNvZGU6IDQwNCB9O1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggKCBmaWxlICkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gYCR7ZmlsZXNBUEl9LyR7ZmlsZS5pZH1gO1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0geyBhbHQ6IFwibWVkaWFcIiB9O1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoIHsgcGF0aCwgcGFyYW1zIH0gKTtcblxuICAgICAgICB9IClcbiAgICAgICAgLmNhdGNoKCBleCA9PiBQcm9taXNlLnJlamVjdCggKCBleCAmJiBleC5yZXN1bHQgJiYgZXgucmVzdWx0LmVycm9yICkgfHwgZXggKSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLnJlc3VsdCApO1xuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUZyb21Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjICkge1xuXG4gICAgcmV0dXJuIGZpbmRGaWxlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjIClcbiAgICAgICAgLnRoZW4oICggbWF5YmVGaWxlICkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoICFtYXliZUZpbGUgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB7IGNvZGU6IDQwNCB9ICk7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gYCR7ZmlsZXNBUEl9LyR7bWF5YmVGaWxlLmlkfWA7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBcIkRFTEVURVwiO1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoIHsgbWV0aG9kLCBwYXRoIH0gKTtcblxuICAgICAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gY2xlYW5VcEVycm9yKCBlcnIgKSB7XG5cbiAgICBpZiAoIGVyci5jb2RlICkgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlcnIgKTtcbiAgICBpZiAoIGVyci5yZXN1bHQgKSB7XG5cbiAgICAgICAgY29uc29sZS5lcnJvciggYFdURiBhbSBpIHN1cHBvc2VkIHRvIGRvIHdpdGggdGhpcz8gJHtKU09OLnN0cmluZ2lmeSggZXJyLnJlc3VsdCwgbnVsbCwgMyApfWAgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgICB9XG4gICAgY29uc29sZS5lcnJvciggZXJyICk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnN0IGNsZWFuRXJyb3IgPSBuZXcgRXJyb3IoIGVyci5ib2R5IHx8IGVyci5zdGF0dXNUZXh0IHx8IFwiVW5rbm93biBlcnJvclwiICk7XG4gICAgY2xlYW5FcnJvci5lcnIgPSBlcnI7XG4gICAgY2xlYW5FcnJvci5jb2RlID0gZXJyLnN0YXR1cyB8fCA1MDA7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBjbGVhbkVycm9yICk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSB7XG5cbiAgICAvKipcbiAgICAgKiBidWlsZHMgYSBEYXRhIHJlcG9zaXRvcnkgZm9yIHRoZSBuYW1lZCBmb2xkZXJcbiAgICAgKiBpZiB0aGUgZm9sZGVyIGRvZXNuJ3QgYWxyZWFkeSBleGlzdCwgY3JlYXRlcyBpdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXJOYW1lIHRoZSBuYW1lIG9mIHRoZSBmb2xkZXIgZm9yIHdoaWNoIHRvIGJ1aWxkXG4gICAgICogQHJldHVybnMge0RhdGF9IHRoZSBkYXRhIHJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5Gb2xkZXIoIGZvbGRlck5hbWUgKSB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gZW5zdXJlRm9sZGVyKCBmb2xkZXJOYW1lICkgKVxuICAgICAgICAgICAgLnRoZW4oIGZvbGRlclNwZWMgPT4gbmV3IERhdGEoIGZvbGRlclNwZWMgKSApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBhIERhdGEgcmVwb3NpdG9yeSBmb3IgZmlsZXMgc3RvcmVkIGluIHRoZSBzcGVjaWZpZWQgZm9sZGVyXG4gICAgICogQHBhcmFtIHtGaWxlU3BlY30gZm9sZGVyU3BlYyB0aGUgZm9sZGVyIGNvbnRhaW5pbmcgZmlsZXMgdG8gb3BlcmF0ZSBvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBmb2xkZXJTcGVjICkge1xuXG4gICAgICAgIHRoaXMuZm9sZGVyID0gZm9sZGVyU3BlYztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBkYXRhIGZpbGVzIGluIHRoaXMgZm9sZGVyIChKU09OIGZpbGVzKVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWF5YmVQcmVmaXhdIGlmIHNwZWNpZmllZCwgb25seSBmaWxlcyB3aXRoIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBwcmVmaXggYXJlIHJldHVybmVkXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgdG8gbGlzdCB0aGUgZmlsZXMgaW4gdGhpcyBmb2xkZXJcbiAgICAgKi9cbiAgICBsaXN0KCBtYXliZVByZWZpeCApIHtcblxuICAgICAgICByZXR1cm4gbGlzdEZpbGVzSW5Gb2xkZXIoIHRoaXMuZm9sZGVyLCBtYXliZVByZWZpeCApLmNhdGNoKCBjbGVhblVwRXJyb3IgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIHRoZSBzcGVjaWZpZWQgZGF0YSBpbiBhIGRhdGEgZmlsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBmaWxlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgdGhlIGRhdGEgdG8gc2F2ZSAod2lsbCBiZSBKU09OIHN0cmluZ2lmaWVkKVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gc2F2ZSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMub3ZlcndyaXRlIGlmIFRydWUgd2lsbCBjaGVjayBpZiBmaWxlIGV4aXN0cyBhbmRcbiAgICAgKiByZXR1cm4gYW4gZXJyb3Igd2l0aCBjb2RlIDQwOVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRvIHNhdmUgdGhlIGZpbGVcbiAgICAgKi9cbiAgICBzYXZlKCBuYW1lLCBkYXRhLCBvcHRpb25zICkge1xuXG4gICAgICAgIHJldHVybiBzYXZlSW5Gb2xkZXIoIHRoaXMuZm9sZGVyLCBuYW1lLCBkYXRhLCBvcHRpb25zICkuY2F0Y2goIGNsZWFuVXBFcnJvciApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBzcGVjaWZpZWQgZGF0YSBpbiBhIGRhdGEgZmlsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS9zcGVjXG4gICAgICogQHBhcmFtIHtzdHJpbmd8RmlsZVNwZWN9IG1heWJlU3BlYyB0aGUgbmFtZSBvciBGaWxlU3BlYyBvZiB0aGUgZmlsZSB0byBsb2FkXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBQcm9taXNlIHRvIGxvYWQgdGhlIGZpbGUgc3BlY2lmaWVkXG4gICAgICovXG4gICAgbG9hZCggbWF5YmVTcGVjICkge1xuXG4gICAgICAgIHJldHVybiBsb2FkRnJvbUZvbGRlciggdGhpcy5mb2xkZXIsIG1heWJlU3BlYyApLmNhdGNoKCBjbGVhblVwRXJyb3IgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcm1lbmFudGx5IGRlbGV0ZXMgdGhlIGRhdGEgZmlsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS9zcGVjLiBUaGUgZmlsZVxuICAgICAqIGlzIG5vdCByZWNvdmVyYWJsZSBmcm9tIHRoZSByZWN5Y2xlIGJpbi4gSWYgdGhlIGRhdGEgZmlsZSBpcyBhbHJlYWR5XG4gICAgICogZ29uZSwgcmVzb2x2ZXMgd2l0aCB7IGNvZGU6IDQwNCB9XG4gICAgICogQHBhcmFtIHtzdHJpbmd8RmlsZVNwZWN9IG1heWJlU3BlYyB0aGUgbmFtZSBvciBGaWxlU3BlYyBvZiB0aGUgZmlsZSB0byBkZWxldGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2UgdG8gZGVsZXRlIHRoZSBmaWxlXG4gICAgICovXG4gICAgcGVybURlbGV0ZSggbWF5YmVTcGVjICkge1xuXG4gICAgICAgIHJldHVybiBkZWxldGVGcm9tRm9sZGVyKCB0aGlzLmZvbGRlciwgbWF5YmVTcGVjICkuY2F0Y2goIGNsZWFuVXBFcnJvciApO1xuXG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvc3RvcmUvRGF0YS5qcyIsImltcG9ydCB7IGxvZ0Vycm9yIH0gZnJvbSBcIi4uLy4uL2RpYWdub3N0aWNzXCI7XG5cbmNvbnN0IGZpbGVuYW1lID0gbmFtZSA9PiBgJHtuYW1lfV9wcm9qZWN0Lmpzb25gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXBvIHtcblxuICAgIGNvbnN0cnVjdG9yKCBkYXRhICkge1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICB9XG5cbiAgICBjcmVhdGVQcm9qZWN0KCBuYW1lICkge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zYXZlKCBmaWxlbmFtZSggbmFtZSApLCBwcm9qZWN0LCB7IG92ZXJ3cml0ZTogZmFsc2UgfSApO1xuXG4gICAgfVxuXG4gICAgdHJhc2hQcm9qZWN0KCBuYW1lICkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucGVybURlbGV0ZSggZmlsZW5hbWUoIG5hbWUgKSApO1xuXG4gICAgfVxuXG4gICAgbGlzdFByb2plY3RzKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGlzdCgpLnRoZW4oICgpID0+IHtcblxuICAgICAgICAgICAgbG9nRXJyb3IoIG5ldyBFcnJvciggXCJOb3Qgc3VyZSB3aGF0IHRvIGRvIGhlcmVcIiApICk7XG5cbiAgICAgICAgfSApO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9zdG9yZS9SZXBvLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==