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

var _projects = __webpack_require__(16);

var _projects2 = _interopRequireDefault(_projects);

var _identity3 = __webpack_require__(9);

var _identity4 = _interopRequireDefault(_identity3);

var _capabilities3 = __webpack_require__(12);

var _capabilities4 = _interopRequireDefault(_capabilities3);

var _projects3 = __webpack_require__(17);

var _projects4 = _interopRequireDefault(_projects3);

var _selfTest = __webpack_require__(15);

var _selfTest2 = _interopRequireDefault(_selfTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof document === "undefined") throw new Error("document is not defined"); /* global document */

document.addEventListener("locate-services", function (e) {

    e.detail(null, {

        identity: new _identity2.default([_identity4.default]),
        capabilities: new _capabilities2.default([_capabilities4.default]),
        projects: new _projects2.default([_projects4.default])

    });
});

(0, _selfTest2.default)();

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

var _Project = __webpack_require__(18);

var _Project2 = _interopRequireDefault(_Project);

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
        canDeleteProjects: undefined,
        canSaveData: undefined,
        canLoadData: undefined,
        canDeleteData: undefined

    };
    var testProjects = postfix(repoTestName, [1, 2]).map(function (x) {
        return new _Project2.default(x, repo);
    });
    var recreateTestProjects = testProjects.map(function (x) {
        return x.deleteSelf().then(function () {
            return x.save();
        });
    });
    return Promise.all(recreateTestProjects).then(function () {
        return repo.listProjects();
    }).then(function (listing) {

        result.canListProjects = testProjects.every(function (x) {
            return ~listing.indexOf(x.name);
        });
        if (!result.canListProjects) throw new Error("Can't list/create projects");
        result.canCreateProjects = true;
    }).then(function () {
        return testProjects[0].deleteSelf().then(function () {
            return repo.listProjects();
        }).then(function (listing) {

            result.canDeleteProjects = !~listing.indexOf(testProjects[0].name);
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
        var err = new Error("Not found: " + maybeSpec);
        err.code = 404;
        return Promise.reject(err);
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
var asSegmentFilename = function asSegmentFilename(name, key) {
    return name + "__" + key + ".json";
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
     * Save a project with the specified name, metadata and segments (hash of key-values)
     * @param {string} name of the project
     * @param {object} metadata to save in the main project file
     * @param {object} segments hash of key-value pairs to save, each in its own file
     * @return {object} Promise of saved project
     */


    _createClass(Repo, [{
        key: "saveProject",
        value: function saveProject(name, metadata) {
            var segments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            var index = {};
            Object.keys(segments).forEach(function (key) {

                index[key] = asSegmentFilename(name, key);
            });
            var project = { index: index, metadata: metadata };
            return this.data.save(filename(name), project, { overwrite: true });
        }

        /**
         * Load a project with the specified name
         * @param {string} name of the project
         * @return {object} Promise of project { {object} metadata, {array} segments }
         */

    }, {
        key: "loadProject",
        value: function loadProject(name) {

            return this.data.load(filename(name)).then(function (_ref) {
                var metadata = _ref.metadata,
                    index = _ref.index;
                return {

                    metadata: metadata || {},
                    segments: Object.keys(index || {})

                };
            });
        }

        /**
         * Delete a project with the specified name
         * @param {string} name of the project to delete
         * @return {object} Promise of deletion
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
                return listing.map(function (_ref2) {
                    var name = _ref2.name;
                    return filenamePattern.exec(name);
                }).filter(function (x) {
                    return x;
                }).map(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 2),
                        name = _ref4[1];

                    return name;
                });
            });
        }
    }]);

    return Repo;
}();

exports.default = Repo;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = test;
/* global document, CustomEvent, window */
/* eslint-disable no-console */

function testServices(e, services) {

    services.capabilities.verifyProjectRepo().then(console.log.bind(console));
    window.x = services;
}
function test() {

    document.dispatchEvent(new CustomEvent("locate-services", { detail: testServices }));
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _service = __webpack_require__(1);

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var requiredFunctions = ["list"];
var chosenKey = "chosen-projects-provider";

var ProjectsService = function (_Service) {
    _inherits(ProjectsService, _Service);

    function ProjectsService(providers) {
        _classCallCheck(this, ProjectsService);

        return _possibleConstructorReturn(this, (ProjectsService.__proto__ || Object.getPrototypeOf(ProjectsService)).call(this, providers, chosenKey, requiredFunctions));
    }

    return ProjectsService;
}(_service2.default);

exports.default = ProjectsService;

/***/ }),
/* 17 */
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

var Projects = function (_Provider) {
    _inherits(Projects, _Provider);

    function Projects() {
        _classCallCheck(this, Projects);

        return _possibleConstructorReturn(this, (Projects.__proto__ || Object.getPrototypeOf(Projects)).call(this, "Projects based on google drive"));
    }

    /**
     * Returns a list of projects stored in google drive
     * @returns {object} Promise of list of project names
     */


    _createClass(Projects, [{
        key: "list",
        value: function list() {

            throw new Error("Not implemented");
        }
    }]);

    return Projects;
}(_provider2.default);

exports.default = new Projects();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var repos = new WeakMap();

var Project = function () {
    function Project(name, repo) {
        _classCallCheck(this, Project);

        this.name = name;
        repos[this] = repo;
        this.init();
    }

    _createClass(Project, [{
        key: "init",
        value: function init() {

            this.segments = {};
        }
    }, {
        key: "deleteSelf",
        value: function deleteSelf() {

            var repo = repos[this];
            var name = this.name;

            return repo.loadProject(name).then(function (_ref) {
                var segments = _ref.segments;
                return repo.deleteProject(name, segments);
            }).catch(function (ex) {

                if (ex.code !== 404) throw ex;
            });
        }
    }, {
        key: "save",
        value: function save() {

            var metadata = { saved: Date.now() };
            return repos[this].saveProject(this.name, metadata, Object.keys(this.segments));
        }
    }]);

    return Project;
}();

exports.default = Project;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzgxOGZmNmVjN2YzMjhjNWZjNTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RpYWdub3N0aWNzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlcnZpY2VzL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9sb2NhbC1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvY2FwYWJpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9wcm92aWRlci1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9jYXBhYmlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvc3RvcmUvRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9zdG9yZS9SZXBvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZWxmLXRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlcnZpY2VzL3Byb2plY3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL3Byb2plY3RzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2RlbC9Qcm9qZWN0LmpzIl0sIm5hbWVzIjpbInVuZGVmaW5lZCIsImxvZyIsImNvbnNvbGUiLCJiaW5kIiwibG9nRXJyb3IiLCJlcnJvciIsInByb3ZpZGVycyIsIldlYWtNYXAiLCJjaG9zZW5LZXlzIiwiZmluZFByb3ZpZGVyIiwib3duZXIiLCJjaG9zZW5LZXkiLCJnZXQiLCJjaG9zZW4iLCJnZXRJdGVtIiwiZmluZCIsIngiLCJrZXkiLCJTZXJ2aWNlIiwiYXZhaWxhYmxlUHJvdmlkZXJzIiwicmVxdWlyZWRGdW5jdGlvbnMiLCJmb3JFYWNoIiwicCIsInZlcmlmeUludGVyZmFjZSIsInNldCIsInByb3ZpZGVyIiwibWFwIiwiZGVzY3JpYmUiLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJyZXNvbHZlIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJFIiwicHJvdG90eXBlIiwib24iLCJuYW1lIiwiY2FsbGJhY2siLCJjdHgiLCJlIiwicHVzaCIsImZuIiwib25jZSIsInNlbGYiLCJsaXN0ZW5lciIsIm9mZiIsImFwcGx5IiwiYXJndW1lbnRzIiwiXyIsImVtaXQiLCJkYXRhIiwic2xpY2UiLCJjYWxsIiwiZXZ0QXJyIiwiaSIsImxlbiIsImxlbmd0aCIsImV2dHMiLCJsaXZlRXZlbnRzIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvYWRGbGFnIiwibG9hZEVycm9yIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2FwaSIsInRoZW4iLCJjYXRjaCIsImV4Iiwid2FpdEZvciIsImNvbmRpdGlvbiIsInRpbWVvdXQiLCJkZXNjcmlwdGlvbiIsIm5ld1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwiUHJvdmlkZXIiLCJsb2FkZWQiLCJ3aW5kb3ciLCJkZXRhaWwiLCJpZGVudGl0eSIsImNhcGFiaWxpdGllcyIsInByb2plY3RzIiwiSWRlbnRpdHlTZXJ2aWNlIiwiZW5zdXJlUHJvdmlkZXIiLCJjdXJyZW50IiwiYXV0aG9yaXplIiwiZGVhdXRob3JpemUiLCJsb2NhbFN0b3JhZ2UiLCJDYXBhYmlsaXRpZXNTZXJ2aWNlIiwiY2xlYXIiLCJhbGwiLCJ2ZXJpZnlMaXN0IiwidmVyaWZ5U3RvcmUiLCJ2ZXJpZnlHZXQiLCJ2ZXJpZnlEZWxldGUiLCJjYW5MaXN0IiwiY2FuU3RvcmUiLCJjYW5HZXQiLCJjYW5EZWxldGUiLCJ2ZXJpZnlQcm9qZWN0cyIsImNhbkxpc3RQcm9qZWN0cyIsImNhbkRlbGV0ZVByb2plY3RzIiwiY2FuQ3JlYXRlUHJvamVjdHMiLCJidWlsZElkZW50aXR5IiwiYXV0aCIsImF1dGgyIiwiZ2V0QXV0aEluc3RhbmNlIiwic2lnbmVkSW4iLCJpc1NpZ25lZEluIiwicHJvZmlsZSIsImN1cnJlbnRVc2VyIiwiZ2V0QmFzaWNQcm9maWxlIiwiZ2V0TmFtZSIsInVzZXJJZCIsImdldEVtYWlsIiwiT2JqZWN0IiwiYXNzaWduIiwic3RhdHVzIiwic2lnbm91dCIsInNpZ25PdXQiLCJzaWduaW4iLCJzaWduSW4iLCJEYXRlIiwibm93IiwiR29vZ2xlSWRlbnRpdHkiLCJjb25zdHJ1Y3RvciIsImZ1bmN0aW9ucyIsImZ1bmMiLCJtYXliZUZ1bmN0aW9uIiwiaW5pdCIsIlNDT1BFUyIsImpvaW4iLCJpbml0QXV0aENsaWVudCIsImNvbmZpZyIsIm9wdGlvbnMiLCJhcGlLZXkiLCJBUElfS0VZIiwiY2xpZW50SWQiLCJDTElFTlRfSUQiLCJzY29wZSIsImxvYWQiLCJjbGllbnQiLCJ0cnlJbml0QXV0aENsaWVudCIsIm5hZ2EiLCJhcHBOYW1lIiwic3RvcmFnZVZlcmlmaWNhdGlvbnMiLCJzYW1lSXRlbXMiLCJhcyIsImJzIiwiZXZlcnkiLCJpbmRleE9mIiwic2FtZUpTT04iLCJhIiwiYiIsIkpTT04iLCJzdHJpbmdpZnkiLCJwb3N0Zml4IiwicG9zdGZpeGVzIiwiZXhwZWN0NDA5RXJyb3IiLCJlcnIiLCJjb2RlIiwicHJvbWlzZUFsbFRydXRoeSIsInByb21pc2VzIiwicmVzdWx0cyIsImZhaWxzIiwiZmlsdGVyIiwidmVyaWZ5Q2FuU3RvcmUiLCJ0ZXN0TmFtZSIsInRlc3RDb250ZW50Iiwib3ZlcndyaXRlVGVzdE5hbWUiLCJzYXZlIiwiY29udGVudCIsIm92ZXJ3cml0ZSIsImRlbGV0ZUxpc3RpbmciLCJsaXN0aW5nIiwicGVybURlbGV0ZSIsImdlbmVyYXRlRHVtbWllcyIsIm5hbWVzIiwidmVyaWZ5RGF0YUNhbkxpc3QiLCJsaXN0VGVzdE5hbWUiLCJsaXN0VGVzdE5hbWVzIiwibGlzdCIsInZlcmlmeURhdGFDYW5EZWxldGUiLCJkZWxldGVUZXN0TmFtZSIsImZpbGVTcGVjIiwiZGVsZXRlQWxsIiwidmVyaWZ5RGF0YSIsImRhdGFUZXN0TmFtZSIsInJlc3VsdCIsInZlcmlmeVJlcG8iLCJyZXBvIiwicmVwb1Rlc3ROYW1lIiwiY2FuU2F2ZURhdGEiLCJjYW5Mb2FkRGF0YSIsImNhbkRlbGV0ZURhdGEiLCJ0ZXN0UHJvamVjdHMiLCJyZWNyZWF0ZVRlc3RQcm9qZWN0cyIsImRlbGV0ZVNlbGYiLCJsaXN0UHJvamVjdHMiLCJ2ZXJpZnlTdG9yYWdlIiwiY2xlYW51cCIsImRhdGFSZXN1bHRzIiwicmVwb1Jlc3VsdHMiLCJpbml0U3RvcmFnZVZlcmlmaWNhdGlvbnMiLCJmZXRjaFRlc3REYXRhIiwiZmV0Y2giLCJyZXMiLCJqc29uIiwiYnVpbGREYXRhIiwiaW5Gb2xkZXIiLCJidWlsZFJlcG8iLCJkIiwidGVzdERhdGEiLCJ2ZXJpZmljYXRpb24iLCJ2ZXJpZnlBbGxTdG9yYWdlIiwid2FpdEZvckxvYWQiLCJHb29nbGVDYXBhYmlsaXRpZXMiLCJkZWxldGUiLCJmaWxlc0FQSSIsInVwbG9hZEFQSSIsImZvbGRlck1pbWVUeXBlIiwiYm91bmRhcnkiLCJtdWx0aVBhcnRNaW1lVHlwZSIsImRhdGFNaW1lVHlwZSIsIkpTT05jb250ZW50VHlwZSIsIkZpbGVTcGVjIiwiaWQiLCJ0aGluZyIsImNvdW50ZXIiLCJyZXF1ZXN0IiwiZGVmYXVsdGVkT3B0aW9ucyIsIm1ldGhvZCIsInBhdGgiLCJjcmVhdGVGb2xkZXIiLCJtaW1lVHlwZSIsImJvZHkiLCJmaXJzdE9yTnVsbCIsInRyYW5zZm9ybSIsImVuc3VyZUZvbGRlciIsInEiLCJwYXJhbXMiLCJmaWxlcyIsIm1heWJlRm9sZGVyIiwiYnVpbGQiLCJkdW1iRG93blByZWZpeCIsInByZWZpeCIsInJldCIsImRhc2hJbmRleCIsInN1YnN0cmluZyIsImxpc3RGaWxlc0luRm9sZGVyIiwiZm9sZGVyIiwibWF5YmVQcmVmaXgiLCJuYW1lRmlsdGVyIiwiYXBpUHJlZml4IiwicGFnZVNpemUiLCJmaW5kRmlsZUluRm9sZGVyIiwibWF5YmVTcGVjIiwiZmlsZSIsIkpTT05wYXJ0Iiwib2JqIiwibXVsdGlwYXJ0IiwicGFydFN0YXJ0IiwicGFydEVuZCIsInBhcnRzIiwiY3JlYXRlSW5Gb2xkZXIiLCJoZWFkZXJzIiwidXBsb2FkVHlwZSIsIm1ldGFkYXRhIiwicGFyZW50cyIsInVwZGF0ZUluRm9sZGVyIiwidGhyb3dBbHJlYWR5RXhpc3RzIiwic2F2ZUluRm9sZGVyIiwibWF5YmVGaWxlIiwibG9hZEZyb21Gb2xkZXIiLCJhbHQiLCJkZWxldGVGcm9tRm9sZGVyIiwiY2xlYW5VcEVycm9yIiwiY2xlYW5FcnJvciIsInN0YXR1c1RleHQiLCJEYXRhIiwiZm9sZGVyTmFtZSIsImZvbGRlclNwZWMiLCJmaWxlbmFtZSIsImFzU2VnbWVudEZpbGVuYW1lIiwiZmlsZW5hbWVQYXR0ZXJuIiwiUmVwbyIsInNlZ21lbnRzIiwiaW5kZXgiLCJrZXlzIiwicHJvamVjdCIsImV4ZWMiLCJ0ZXN0IiwidGVzdFNlcnZpY2VzIiwic2VydmljZXMiLCJ2ZXJpZnlQcm9qZWN0UmVwbyIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsIlByb2plY3RzU2VydmljZSIsIlByb2plY3RzIiwicmVwb3MiLCJQcm9qZWN0IiwibG9hZFByb2plY3QiLCJkZWxldGVQcm9qZWN0Iiwic2F2ZWQiLCJzYXZlUHJvamVjdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QUVqQixxQkFBYXhRLElBQWIsRUFBbUIwSixJQUFuQixFQUEwQjtBQUFBOztBQUV0QixhQUFLMUosSUFBTCxHQUFZQSxJQUFaO0FBQ0F1USxjQUFPLElBQVAsSUFBZ0I3RyxJQUFoQjtBQUNBLGFBQUs3RCxJQUFMO0FBRUg7Ozs7K0JBRU07O0FBRUgsaUJBQUs2SixRQUFMLEdBQWdCLEVBQWhCO0FBRUg7OztxQ0FFWTs7QUFFVCxnQkFBTWhHLE9BQU82RyxNQUFPLElBQVAsQ0FBYjtBQUZTLGdCQUdEdlEsSUFIQyxHQUdRLElBSFIsQ0FHREEsSUFIQzs7QUFJVCxtQkFBTzBKLEtBQUsrRyxXQUFMLENBQWtCelEsSUFBbEIsRUFDRjhCLElBREUsQ0FDSTtBQUFBLG9CQUFJNE4sUUFBSixRQUFJQSxRQUFKO0FBQUEsdUJBQW9CaEcsS0FBS2dILGFBQUwsQ0FBb0IxUSxJQUFwQixFQUEwQjBQLFFBQTFCLENBQXBCO0FBQUEsYUFESixFQUVGM04sS0FGRSxDQUVLLFVBQUVDLEVBQUYsRUFBVTs7QUFFZCxvQkFBS0EsR0FBRzRGLElBQUgsS0FBWSxHQUFqQixFQUF1QixNQUFNNUYsRUFBTjtBQUUxQixhQU5FLENBQVA7QUFRSDs7OytCQUVNOztBQUVILGdCQUFNdU0sV0FBVyxFQUFFb0MsT0FBT3JMLEtBQUtDLEdBQUwsRUFBVCxFQUFqQjtBQUNBLG1CQUFPZ0wsTUFBTyxJQUFQLEVBQWNLLFdBQWQsQ0FBMkIsS0FBSzVRLElBQWhDLEVBQXNDdU8sUUFBdEMsRUFBZ0R4SixPQUFPNkssSUFBUCxDQUFhLEtBQUtGLFFBQWxCLENBQWhELENBQVA7QUFFSDs7Ozs7O2tCQW5DZ0JjLE8iLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzgxOGZmNmVjN2YzMjhjNWZjNTIiLCIvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuLyogZ2xvYmFsIFJvbGxiYXIgKi9cblxuZXhwb3J0IGRlZmF1bHQgdW5kZWZpbmVkO1xuZXhwb3J0IGNvbnN0IGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoIGNvbnNvbGUgKTtcbmV4cG9ydCBjb25zdCBsb2dFcnJvciA9ICggLi4uYXJncyApID0+IHtcblxuICAgIFJvbGxiYXIuZXJyb3IoIC4uLmFyZ3MgKTtcbiAgICBjb25zb2xlLmVycm9yKCAuLi5hcmdzICk7XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2RpYWdub3N0aWNzLmpzIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwidGlueS1lbWl0dGVyXCI7XG5pbXBvcnQgbG9jYWwgZnJvbSBcIi4vbG9jYWwtc3RvcmVcIjtcblxuY29uc3QgcHJvdmlkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGNob3NlbktleXMgPSBuZXcgV2Vha01hcCgpO1xuXG5mdW5jdGlvbiBmaW5kUHJvdmlkZXIoIG93bmVyICkge1xuXG4gICAgY29uc3QgY2hvc2VuS2V5ID0gY2hvc2VuS2V5cy5nZXQoIG93bmVyICk7XG4gICAgY29uc3QgY2hvc2VuID0gbG9jYWwuZ2V0SXRlbSggY2hvc2VuS2V5ICk7XG4gICAgcmV0dXJuIHByb3ZpZGVycy5nZXQoIG93bmVyICkuZmluZCggeCA9PiB4LmtleSA9PT0gY2hvc2VuICk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmljZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvciggYXZhaWxhYmxlUHJvdmlkZXJzLCBjaG9zZW5LZXksIHJlcXVpcmVkRnVuY3Rpb25zICkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGF2YWlsYWJsZVByb3ZpZGVycy5mb3JFYWNoKCBwID0+IHAudmVyaWZ5SW50ZXJmYWNlKCByZXF1aXJlZEZ1bmN0aW9ucyApICk7XG4gICAgICAgIHByb3ZpZGVycy5zZXQoIHRoaXMsIGF2YWlsYWJsZVByb3ZpZGVycyApO1xuICAgICAgICBjaG9zZW5LZXlzLnNldCggdGhpcywgY2hvc2VuS2V5ICk7XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSBmaW5kUHJvdmlkZXIoIHRoaXMgKTtcblxuICAgIH1cblxuICAgIHByb3ZpZGVycygpIHtcblxuICAgICAgICByZXR1cm4gKCBwcm92aWRlcnMuZ2V0KCB0aGlzICkgfHwgW10gKS5tYXAoIHAgPT4gcC5kZXNjcmliZSgpICk7XG5cbiAgICB9XG5cbiAgICBlbnN1cmVQcm92aWRlcigpIHtcblxuICAgICAgICBpZiAoICF0aGlzLnByb3ZpZGVyICkgcmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgRXJyb3IoIFwiTm8gcHJvdmlkZXIgc2VsZWN0ZWRcIiApICk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHRoaXMucHJvdmlkZXIgKTtcblxuICAgIH1cblxuICAgIHNlbGVjdCggcHJvdmlkZXIgKSB7XG5cbiAgICAgICAgY29uc3QgY2hvc2VuS2V5ID0gY2hvc2VuS2V5cy5nZXQoIHRoaXMgKTtcbiAgICAgICAgbG9jYWwuc2V0SXRlbSggY2hvc2VuS2V5LCBwcm92aWRlci5rZXkgKTtcbiAgICAgICAgZmluZFByb3ZpZGVyKCB0aGlzICk7XG5cbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpIHtcblxuICAgICAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggdGhpcyApO1xuICAgICAgICBsb2NhbC5yZW1vdmVJdGVtKCBjaG9zZW5LZXkgKTtcbiAgICAgICAgZmluZFByb3ZpZGVyKCB0aGlzICk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9zZXJ2aWNlLmpzIiwiZnVuY3Rpb24gRSAoKSB7XG4gIC8vIEtlZXAgdGhpcyBlbXB0eSBzbyBpdCdzIGVhc2llciB0byBpbmhlcml0IGZyb21cbiAgLy8gKHZpYSBodHRwczovL2dpdGh1Yi5jb20vbGlwc21hY2sgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2lzc3Vlcy8zKVxufVxuXG5FLnByb3RvdHlwZSA9IHtcbiAgb246IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcblxuICAgIChlW25hbWVdIHx8IChlW25hbWVdID0gW10pKS5wdXNoKHtcbiAgICAgIGZuOiBjYWxsYmFjayxcbiAgICAgIGN0eDogY3R4XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvbmNlOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBmdW5jdGlvbiBsaXN0ZW5lciAoKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGxpc3RlbmVyLl8gPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIGxpc3RlbmVyLCBjdHgpO1xuICB9LFxuXG4gIGVtaXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGRhdGEgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGV2dEFyciA9ICgodGhpcy5lIHx8ICh0aGlzLmUgPSB7fSkpW25hbWVdIHx8IFtdKS5zbGljZSgpO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbGVuID0gZXZ0QXJyLmxlbmd0aDtcblxuICAgIGZvciAoaTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBldnRBcnJbaV0uZm4uYXBwbHkoZXZ0QXJyW2ldLmN0eCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb2ZmOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuICAgIHZhciBldnRzID0gZVtuYW1lXTtcbiAgICB2YXIgbGl2ZUV2ZW50cyA9IFtdO1xuXG4gICAgaWYgKGV2dHMgJiYgY2FsbGJhY2spIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBldnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChldnRzW2ldLmZuICE9PSBjYWxsYmFjayAmJiBldnRzW2ldLmZuLl8gIT09IGNhbGxiYWNrKVxuICAgICAgICAgIGxpdmVFdmVudHMucHVzaChldnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZXZlbnQgZnJvbSBxdWV1ZSB0byBwcmV2ZW50IG1lbW9yeSBsZWFrXG4gICAgLy8gU3VnZ2VzdGVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXpkXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2NvbW1pdC9jNmViZmFhOWJjOTczYjMzZDExMGE4NGEzMDc3NDJiN2NmOTRjOTUzI2NvbW1pdGNvbW1lbnQtNTAyNDkxMFxuXG4gICAgKGxpdmVFdmVudHMubGVuZ3RoKVxuICAgICAgPyBlW25hbWVdID0gbGl2ZUV2ZW50c1xuICAgICAgOiBkZWxldGUgZVtuYW1lXTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdGlueS1lbWl0dGVyL2luZGV4LmpzIiwiLyogZ2xvYmFsIGRvY3VtZW50ICovXG5pbXBvcnQgUHJvdmlkZXJCYXNlIGZyb20gXCIuLi9wcm92aWRlci1iYXNlXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7IGluaXQgfSBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9kaWFnbm9zdGljc1wiO1xuXG5sZXQgbG9hZEZsYWcgPSBmYWxzZTtcbmxldCBsb2FkRXJyb3I7XG5cbmlmICggdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiICkgdGhyb3cgbmV3IEVycm9yKCBcImRvY3VtZW50IGlzIHVuZGVmaW5lZFwiICk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcImdvb2dsZS1hcGktbG9hZGVkXCIsICgpID0+IHtcblxuICAgIGluaXQoIGNvbmZpZy5nYXBpIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcblxuICAgICAgICAgICAgbG9hZEZsYWcgPSB0cnVlO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAuY2F0Y2goICggZXggKSA9PiB7XG5cbiAgICAgICAgICAgIGxvYWRFcnJvciA9IGV4O1xuXG4gICAgICAgIH0gKTtcblxufSApO1xuXG5mdW5jdGlvbiB3YWl0Rm9yKCBjb25kaXRpb24sIHRpbWVvdXQsIGRlc2NyaXB0aW9uICkge1xuXG4gICAgaWYgKCB0aW1lb3V0IDw9IDAgKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvciggYFRpbWVkIG91dCAke2Rlc2NyaXB0aW9ufWAgKSApO1xuICAgIGlmICggY29uZGl0aW9uKCkgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0cnVlICk7XG4gICAgY29uc3QgbmV3VGltZW91dCA9IHRpbWVvdXQgLSAxMDA7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHNldFRpbWVvdXQoXG5cbiAgICAgICAgKCkgPT4gd2FpdEZvciggY29uZGl0aW9uLCBuZXdUaW1lb3V0LCBkZXNjcmlwdGlvbiApLnRoZW4oIHJlc29sdmUsIHJlamVjdCApLFxuICAgICAgICAxMDBcblxuICAgICkgKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm92aWRlciBleHRlbmRzIFByb3ZpZGVyQmFzZSB7XG5cbiAgICBjb25zdHJ1Y3RvciggZGVzY3JpcHRpb24gKSB7XG5cbiAgICAgICAgc3VwZXIoIFwiZ2FwaVwiLCBkZXNjcmlwdGlvbiApO1xuXG4gICAgfVxuXG4gICAgc3RhdHVzKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblxuICAgICAgICByZXR1cm4geyBsb2FkZWQ6IGxvYWRGbGFnLCBsb2FkRXJyb3IgfTtcblxuICAgIH1cblxuICAgIHdhaXRGb3JMb2FkKCkge1xuXG4gICAgICAgIGlmICggbG9hZEZsYWcgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIGxvZyggXCJQcm92aWRlciBsb2FkaW5nLi4uXCIsIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuIHdhaXRGb3IoICgpID0+IGxvYWRGbGFnLCA1MDAwICkudGhlbiggKCkgPT4ge1xuXG4gICAgICAgICAgICBsb2coIFwiUHJvdmlkZXIgbG9hZGluZyBjb21wbGV0ZVwiLCB0aGlzICk7XG5cbiAgICAgICAgfSApO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9wcm92aWRlci5qcyIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmV4cG9ydCBkZWZhdWx0IHdpbmRvd1sgXCJzbGVlcGVyLXNlcnZpY2UtY29uZmlnXCIgXTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvY29uZmlnLmpzIiwiLyogZ2xvYmFsIGRvY3VtZW50ICovXG5cbmltcG9ydCBJZGVudGl0eSBmcm9tIFwiLi9zZXJ2aWNlcy9pZGVudGl0eVwiO1xuaW1wb3J0IENhcGFiaWxpdGllcyBmcm9tIFwiLi9zZXJ2aWNlcy9jYXBhYmlsaXRpZXNcIjtcbmltcG9ydCBQcm9qZWN0cyBmcm9tIFwiLi9zZXJ2aWNlcy9wcm9qZWN0c1wiO1xuXG5pbXBvcnQgZ2FwaUlkZW50aXR5IGZyb20gXCIuL2dhcGkvaWRlbnRpdHlcIjtcbmltcG9ydCBnYXBpQ2FwYWJpbGl0aWVzIGZyb20gXCIuL2dhcGkvY2FwYWJpbGl0aWVzXCI7XG5pbXBvcnQgZ2FwaVByb2plY3RzIGZyb20gXCIuL2dhcGkvcHJvamVjdHNcIjtcblxuaW1wb3J0IHNlbGZUZXN0IGZyb20gXCIuL3NlbGYtdGVzdFwiO1xuXG5pZiAoIHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiApIHRocm93IG5ldyBFcnJvciggXCJkb2N1bWVudCBpcyBub3QgZGVmaW5lZFwiICk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9jYXRlLXNlcnZpY2VzXCIsICggZSApID0+IHtcblxuICAgIGUuZGV0YWlsKCBudWxsLCB7XG5cbiAgICAgICAgaWRlbnRpdHk6IG5ldyBJZGVudGl0eSggWyBnYXBpSWRlbnRpdHkgXSApLFxuICAgICAgICBjYXBhYmlsaXRpZXM6IG5ldyBDYXBhYmlsaXRpZXMoIFsgZ2FwaUNhcGFiaWxpdGllcyBdICksXG4gICAgICAgIHByb2plY3RzOiBuZXcgUHJvamVjdHMoIFsgZ2FwaVByb2plY3RzIF0gKVxuXG4gICAgfSApO1xuXG59ICk7XG5cbnNlbGZUZXN0KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2VudHJ5LmpzIiwiaW1wb3J0IFNlcnZpY2UgZnJvbSBcIi4vc2VydmljZVwiO1xuXG5jb25zdCByZXF1aXJlZEZ1bmN0aW9ucyA9IFsgXCJjdXJyZW50XCIsIFwiYXV0aG9yaXplXCIsIFwiZGVhdXRob3JpemVcIiBdO1xuY29uc3QgY2hvc2VuS2V5ID0gXCJjaG9zZW4taWRlbnRpdHktcHJvdmlkZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWRlbnRpdHlTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJvdmlkZXJzICkge1xuXG4gICAgICAgIHN1cGVyKCBwcm92aWRlcnMsIGNob3NlbktleSwgcmVxdWlyZWRGdW5jdGlvbnMgKTtcblxuICAgIH1cblxuICAgIGN1cnJlbnQoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKS50aGVuKCBwID0+IHAuY3VycmVudCgpICk7XG5cbiAgICB9XG5cbiAgICBzaWduSW4oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKS50aGVuKCBwID0+IHAuYXV0aG9yaXplKCkgKS50aGVuKCAoKSA9PiB0aGlzLmN1cnJlbnQoKSApO1xuXG4gICAgfVxuXG4gICAgc2lnbk91dCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5kZWF1dGhvcml6ZSgpICkudGhlbiggKCkgPT4gdGhpcy5jdXJyZW50KCkgKTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlcnZpY2VzL2lkZW50aXR5LmpzIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgd2luZG93LmxvY2FsU3RvcmFnZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc2VydmljZXMvbG9jYWwtc3RvcmUuanMiLCJpbXBvcnQgU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5cbmNvbnN0IGNob3NlbktleSA9IFwiY2hvc2VuLWNhcGFiaWxpdGllcy1wcm92aWRlclwiO1xuY29uc3QgcmVxdWlyZWRGdW5jdGlvbnMgPSBbXG5cbiAgICBcImNsZWFyXCIsXG4gICAgXCJ2ZXJpZnlMaXN0XCIsXG4gICAgXCJ2ZXJpZnlTdG9yZVwiLFxuICAgIFwidmVyaWZ5R2V0XCIsXG4gICAgXCJ2ZXJpZnlEZWxldGVcIixcbiAgICBcInZlcmlmeVByb2plY3RzXCIsXG5cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcGFiaWxpdGllc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm92aWRlcnMgKSB7XG5cbiAgICAgICAgc3VwZXIoIHByb3ZpZGVycywgY2hvc2VuS2V5LCByZXF1aXJlZEZ1bmN0aW9ucyApO1xuXG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKS50aGVuKCBwID0+IHAuY2xlYXIoKSApLnRoZW4oICgpID0+IHRydWUgKTtcblxuICAgIH1cblxuICAgIHZlcmlmeVN0b3JhZ2UoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKVxuICAgICAgICAgICAgLnRoZW4oIHAgPT4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICAgICAgICAgIHAudmVyaWZ5TGlzdCgpLFxuICAgICAgICAgICAgICAgIHAudmVyaWZ5U3RvcmUoKSxcbiAgICAgICAgICAgICAgICBwLnZlcmlmeUdldCgpLFxuICAgICAgICAgICAgICAgIHAudmVyaWZ5RGVsZXRlKCksXG5cbiAgICAgICAgICAgIF0gKS50aGVuKCAoIFsgY2FuTGlzdCwgY2FuU3RvcmUsIGNhbkdldCwgY2FuRGVsZXRlIF0gKSA9PiAoIHtcblxuICAgICAgICAgICAgICAgIGNhbkxpc3QsXG4gICAgICAgICAgICAgICAgY2FuU3RvcmUsXG4gICAgICAgICAgICAgICAgY2FuR2V0LFxuICAgICAgICAgICAgICAgIGNhbkRlbGV0ZSxcblxuICAgICAgICAgICAgfSApICkgKTtcblxuICAgIH1cblxuICAgIHZlcmlmeVByb2plY3RSZXBvKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVuc3VyZVByb3ZpZGVyKClcbiAgICAgICAgICAgIC50aGVuKCBwID0+IFByb21pc2UuYWxsKCBbXG5cbiAgICAgICAgICAgICAgICBwLnZlcmlmeVByb2plY3RzKCksXG5cbiAgICAgICAgICAgIF0gKS50aGVuKCAoIFsge1xuXG4gICAgICAgICAgICAgICAgY2FuTGlzdFByb2plY3RzLFxuICAgICAgICAgICAgICAgIGNhbkRlbGV0ZVByb2plY3RzLFxuICAgICAgICAgICAgICAgIGNhbkNyZWF0ZVByb2plY3RzXG5cbiAgICAgICAgICAgIH0gXSApID0+ICgge1xuXG4gICAgICAgICAgICAgICAgY2FuTGlzdFByb2plY3RzLFxuICAgICAgICAgICAgICAgIGNhbkRlbGV0ZVByb2plY3RzLFxuICAgICAgICAgICAgICAgIGNhbkNyZWF0ZVByb2plY3RzXG5cbiAgICAgICAgICAgIH0gKSApICk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9jYXBhYmlsaXRpZXMuanMiLCIvKiBnbG9iYWwgZ2FwaSAqL1xuXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcIi4vcHJvdmlkZXJcIjtcblxuZnVuY3Rpb24gYnVpbGRJZGVudGl0eSggcCApIHtcblxuICAgIGNvbnN0IGF1dGggPSBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpO1xuICAgIGNvbnN0IHNpZ25lZEluID0gYXV0aC5pc1NpZ25lZEluLmdldCgpO1xuICAgIGNvbnN0IHByb2ZpbGUgPSBzaWduZWRJbiA/IGF1dGguY3VycmVudFVzZXIuZ2V0KCkuZ2V0QmFzaWNQcm9maWxlKCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbmFtZSA9ICggc2lnbmVkSW4gJiYgcHJvZmlsZSApID8gcHJvZmlsZS5nZXROYW1lKCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgdXNlcklkID0gKCBzaWduZWRJbiAmJiBwcm9maWxlICkgPyBwcm9maWxlLmdldEVtYWlsKCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBPYmplY3QuYXNzaWduKCBwLmRlc2NyaWJlKCksIHAuc3RhdHVzKCkgKTtcbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHByb3ZpZGVyLCBzaWduZWRJbiwgdXNlcklkLCBuYW1lLFxuXG4gICAgfTtcblxufVxuXG5mdW5jdGlvbiBzaWdub3V0KCByZXNvbHZlLCByZWplY3QgKSB7XG5cbiAgICBjb25zdCBhdXRoID0gZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKTtcbiAgICByZXR1cm4gYXV0aC5zaWduT3V0KCkudGhlbiggcmVzb2x2ZSwgcmVqZWN0ICk7XG5cbn1cblxuZnVuY3Rpb24gc2lnbmluKCByZXNvbHZlLCByZWplY3QgKSB7XG5cbiAgICBjb25zdCBhdXRoID0gZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKTtcbiAgICBhdXRoLnNpZ25JbigpLnRoZW4oXG5cbiAgICAgICAgKCkgPT4gcmVzb2x2ZSggRGF0ZS5ub3coKSApLFxuICAgICAgICB4ID0+IHJlamVjdCggeC5lcnJvciB8fCB4IClcblxuICAgICk7XG5cbn1cblxuY2xhc3MgR29vZ2xlSWRlbnRpdHkgZXh0ZW5kcyBQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciggXCJZb3VyIEdvb2dsZSBpZGVudGl0eSAoZS5nLiBnbWFpbClcIiApO1xuXG4gICAgfVxuXG4gICAgY3VycmVudCgpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoIHJlc29sdmUgPT4gcmVzb2x2ZSggYnVpbGRJZGVudGl0eSggdGhpcyApICkgKTtcblxuICAgIH1cblxuICAgIGF1dGhvcml6ZSgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCBzaWduaW4gKTtcblxuICAgIH1cblxuICAgIGRlYXV0aG9yaXplKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoIHNpZ25vdXQgKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgR29vZ2xlSWRlbnRpdHkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL2lkZW50aXR5LmpzIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwidGlueS1lbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3ZpZGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCBrZXksIGRlc2NyaXB0aW9uICkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcblxuICAgIH1cblxuICAgIHZlcmlmeUludGVyZmFjZSggZnVuY3Rpb25zICkge1xuXG4gICAgICAgIGZ1bmN0aW9ucy5mb3JFYWNoKCAoIGZ1bmMgKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG1heWJlRnVuY3Rpb24gPSB0aGlzWyBmdW5jIF07XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBtYXliZUZ1bmN0aW9uICE9PSBcImZ1bmN0aW9uXCIgKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIGBQcm92aWRlciAke3Byb3ZpZGVyfSBkb2VzIG5vdCBwcm92aWRlIGZ1bmN0aW9uICcke2Z1bmN9JyAoJHttYXliZUZ1bmN0aW9ufSlgICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ICk7XG5cbiAgICB9XG5cbiAgICBkZXNjcmliZSgpIHtcblxuICAgICAgICBjb25zdCB7IGtleSwgbmFtZSwgZGVzY3JpcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7IGtleSwgbmFtZSwgZGVzY3JpcHRpb24gfTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3Byb3ZpZGVyLWJhc2UuanMiLCIvKiBnbG9iYWwgZ2FwaSAqL1xuXG5jb25zdCBTQ09QRVMgPSBbXG5cbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUubWV0YWRhdGEucmVhZG9ubHlcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuZmlsZVwiLFxuXG5dLmpvaW4oIFwiIFwiICk7XG5cbmZ1bmN0aW9uIGluaXRBdXRoQ2xpZW50KCBjb25maWcsIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG5cbiAgICAgICAgYXBpS2V5OiBjb25maWcuQVBJX0tFWSxcbiAgICAgICAgY2xpZW50SWQ6IGNvbmZpZy5DTElFTlRfSUQsXG4gICAgICAgIHNjb3BlOiBjb25maWcuU0NPUEVTIHx8IFNDT1BFUyxcblxuICAgIH07XG4gICAgZ2FwaS5sb2FkKCBcImNsaWVudDphdXRoMlwiLCAoKSA9PiBnYXBpLmNsaWVudFxuICAgICAgICAuaW5pdCggb3B0aW9ucyApXG4gICAgICAgIC50aGVuKCByZXNvbHZlLCByZWplY3QgKSApO1xuXG59XG5cbmZ1bmN0aW9uIHRyeUluaXRBdXRoQ2xpZW50KCBjb25maWcsIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgaW5pdEF1dGhDbGllbnQoIGNvbmZpZywgcmVzb2x2ZSwgcmVqZWN0ICk7XG5cbiAgICB9IGNhdGNoICggZSApIHtcblxuICAgICAgICByZWplY3QoIGUgKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCB1bmRlZmluZWQ7XG5leHBvcnQgZnVuY3Rpb24gaW5pdCggY29uZmlnICkge1xuXG4gICAgY29uc3QgbmFnYSA9IHRyeUluaXRBdXRoQ2xpZW50LmJpbmQoIG51bGwsIGNvbmZpZyApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSggbmFnYSApO1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvc2hhcmVkLmpzIiwiLyogZ2xvYmFsIGZldGNoICovXG5cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiLi9wcm92aWRlclwiO1xuaW1wb3J0IERhdGEgZnJvbSBcIi4vc3RvcmUvRGF0YVwiO1xuaW1wb3J0IFJlcG8gZnJvbSBcIi4vc3RvcmUvUmVwb1wiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XG5pbXBvcnQgeyBsb2csIGxvZ0Vycm9yIH0gZnJvbSBcIi4uL2RpYWdub3N0aWNzXCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi4vbW9kZWwvUHJvamVjdFwiO1xuXG5jb25zdCB7IGFwcE5hbWUgfSA9IGNvbmZpZztcbmNvbnN0IHN0b3JhZ2VWZXJpZmljYXRpb25zID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3Qgc2FtZUl0ZW1zID0gKCBhcywgYnMgKSA9PiBhcy5sZW5ndGggPT09IGJzLmxlbmd0aCAmJiBhcy5ldmVyeSggeCA9PiB+YnMuaW5kZXhPZiggeCApICk7XG5jb25zdCBzYW1lSlNPTiA9ICggYSwgYiApID0+IEpTT04uc3RyaW5naWZ5KCBhICkgPT09IEpTT04uc3RyaW5naWZ5KCBiICk7XG5jb25zdCBwb3N0Zml4ID0gKCB4LCBwb3N0Zml4ZXMgKSA9PiBwb3N0Zml4ZXMubWFwKCBwID0+IGAke3h9X18ke3B9YCApO1xuXG5mdW5jdGlvbiBleHBlY3Q0MDlFcnJvciggZXJyICkge1xuXG4gICAgaWYgKCBlcnIuY29kZSAhPT0gNDA5ICkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvciggYEV4cGVjdGVkIGEgNDA5IHJlamVjdGlvbiBvZiBub24tb3ZlcndyaXRlIHJlcXVlc3QsIGJ1dCBnb3QgJHtlcnJ9YCApO1xuXG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHByb21pc2VBbGxUcnV0aHkoIHByb21pc2VzICkge1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKCBwcm9taXNlcy5tYXAoIHAgPT4gcC5jYXRjaCggbG9nRXJyb3IgKSApICkudGhlbiggKCByZXN1bHRzICkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZhaWxzID0gcmVzdWx0cy5tYXAoICggeCwgaSApID0+IHtcblxuICAgICAgICAgICAgaWYgKCB4ICkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZXNbIGkgXTtcblxuICAgICAgICB9ICkuZmlsdGVyKCB4ID0+IHggKTtcbiAgICAgICAgcmV0dXJuIGZhaWxzLmxlbmd0aCA/IFByb21pc2UucmVqZWN0KCBmYWlscyApIDogUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5Q2FuU3RvcmUoIGRhdGEsIHRlc3ROYW1lLCB0ZXN0Q29udGVudCApIHtcblxuICAgIGNvbnN0IG92ZXJ3cml0ZVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9LXByZWV4aXN0aW5nYDtcbiAgICByZXR1cm4gcHJvbWlzZUFsbFRydXRoeSggW1xuXG4gICAgICAgIGRhdGEuc2F2ZSggdGVzdE5hbWUsIHRlc3RDb250ZW50IClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiBkYXRhLmxvYWQoIHRlc3ROYW1lICkgKVxuICAgICAgICAgICAgLnRoZW4oIGNvbnRlbnQgPT4gc2FtZUpTT04oIHRlc3RDb250ZW50LCBjb250ZW50ICkgKSxcblxuICAgICAgICBkYXRhLnNhdmUoIG92ZXJ3cml0ZVRlc3ROYW1lLCA0MiApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gZGF0YS5zYXZlKCBvdmVyd3JpdGVUZXN0TmFtZSwgNDIsIHsgb3ZlcndyaXRlOiBmYWxzZSB9ICkgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggXCJGYWlsZWQgdG8gcmVqZWN0IG5vbi1vdmVyd3JpdGUgcmVxdWVzdFwiICk7XG5cbiAgICAgICAgICAgIH0gKVxuICAgICAgICAgICAgLmNhdGNoKCBleHBlY3Q0MDlFcnJvciApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gdHJ1ZSApXG5cbiAgICBdICkuY2F0Y2goICgpID0+IGZhbHNlICk7XG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlTGlzdGluZyggZGF0YSwgbGlzdGluZyApIHtcblxuICAgIHJldHVybiBwcm9taXNlQWxsVHJ1dGh5KCBsaXN0aW5nLm1hcCggeCA9PiBkYXRhLnBlcm1EZWxldGUoIHggKSApICk7XG5cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEdW1taWVzKCBkYXRhLCBuYW1lcyApIHtcblxuICAgIHJldHVybiBwcm9taXNlQWxsVHJ1dGh5KCBuYW1lcy5tYXAoIHggPT4gZGF0YS5zYXZlKCB4LCBcImhlbGxvLCBkdW1teVwiICkgKSApO1xuXG59XG5cbmZ1bmN0aW9uIHZlcmlmeURhdGFDYW5MaXN0KCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIGNvbnN0IGxpc3RUZXN0TmFtZSA9IGAke3Rlc3ROYW1lfV9fbGlzdGA7XG4gICAgY29uc3QgbGlzdFRlc3ROYW1lcyA9IHBvc3RmaXgoIGxpc3RUZXN0TmFtZSwgWyAxLCAyLCAzIF0gKTtcbiAgICByZXR1cm4gZGF0YS5saXN0KCBsaXN0VGVzdE5hbWUgKVxuICAgICAgICAudGhlbiggbGlzdGluZyA9PiBkZWxldGVMaXN0aW5nKCBkYXRhLCBsaXN0aW5nICkgKVxuICAgICAgICAudGhlbiggKCkgPT4gZ2VuZXJhdGVEdW1taWVzKCBkYXRhLCBsaXN0VGVzdE5hbWVzICkgKVxuICAgICAgICAudGhlbiggKCkgPT4gZGF0YS5saXN0KCBsaXN0VGVzdE5hbWUgKSApXG4gICAgICAgIC50aGVuKCBsaXN0aW5nID0+IHNhbWVJdGVtcyggbGlzdGluZy5tYXAoIHggPT4geC5uYW1lICksIGxpc3RUZXN0TmFtZXMgKSApO1xuXG59XG5cbmZ1bmN0aW9uIHZlcmlmeURhdGFDYW5EZWxldGUoIGRhdGEsIHRlc3ROYW1lICkge1xuXG4gICAgY29uc3QgZGVsZXRlVGVzdE5hbWUgPSBgJHt0ZXN0TmFtZX1fX2RlbGV0ZWA7XG4gICAgcmV0dXJuIGRhdGEuc2F2ZSggZGVsZXRlVGVzdE5hbWUsIFwic3R1ZmZcIiApXG4gICAgICAgIC50aGVuKCBmaWxlU3BlYyA9PiBkYXRhLnBlcm1EZWxldGUoIGZpbGVTcGVjICkudGhlbiggKCkgPT4gZGF0YS5sb2FkKCBmaWxlU3BlYyApICkgKVxuICAgICAgICAuY2F0Y2goIGVyciA9PiBsb2dFcnJvciggZXJyICkgfHwgUHJvbWlzZS5yZXNvbHZlKCBlcnIuY29kZSA9PT0gNDA0ICkgKTtcblxufVxuXG5mdW5jdGlvbiBkZWxldGVBbGwoIGRhdGEsIHRlc3ROYW1lICkge1xuXG4gICAgcmV0dXJuIGRhdGEubGlzdCggdGVzdE5hbWUgKVxuICAgICAgICAudGhlbiggbGlzdGluZyA9PiBwcm9taXNlQWxsVHJ1dGh5KCBsaXN0aW5nLm1hcCggeCA9PiBkYXRhLnBlcm1EZWxldGUoIHggKSApICkgKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlEYXRhKCBkYXRhLCB0ZXN0TmFtZSwgdGVzdENvbnRlbnQgKSB7XG5cbiAgICBjb25zdCBkYXRhVGVzdE5hbWUgPSBgJHt0ZXN0TmFtZX1fX2RhdGFgO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgY2FuTGlzdDogdW5kZWZpbmVkLFxuICAgICAgICBjYW5TdG9yZTogdW5kZWZpbmVkLFxuICAgICAgICBjYW5EZWxldGU6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuR2V0OiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICByZXR1cm4gdmVyaWZ5Q2FuU3RvcmUoIGRhdGEsIGRhdGFUZXN0TmFtZSwgdGVzdENvbnRlbnQgKVxuICAgICAgICAudGhlbiggKCBjYW5TdG9yZSApID0+IHtcblxuICAgICAgICAgICAgcmVzdWx0LmNhblN0b3JlID0gcmVzdWx0LmNhbkdldCA9IGNhblN0b3JlO1xuICAgICAgICAgICAgaWYgKCAhY2FuU3RvcmUgKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbCggW1xuXG4gICAgICAgICAgICAgICAgdmVyaWZ5RGF0YUNhbkxpc3QoIGRhdGEsIGRhdGFUZXN0TmFtZSApLFxuICAgICAgICAgICAgICAgIHZlcmlmeURhdGFDYW5EZWxldGUoIGRhdGEsIGRhdGFUZXN0TmFtZSApXG5cbiAgICAgICAgICAgIF0gKS50aGVuKCAoIFsgY2FuTGlzdCwgY2FuRGVsZXRlIF0gKSA9PiB7XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuY2FuTGlzdCA9IGNhbkxpc3Q7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmNhbkRlbGV0ZSA9IGNhbkRlbGV0ZTtcblxuICAgICAgICAgICAgfSApO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4gcmVzdWx0ICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5UmVwbyggcmVwbywgdGVzdE5hbWUgKSB7XG5cbiAgICBjb25zdCByZXBvVGVzdE5hbWUgPSBgJHt0ZXN0TmFtZX1fX3JlcG9gO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcblxuICAgICAgICBjYW5MaXN0UHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuQ3JlYXRlUHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlUHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuU2F2ZURhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuTG9hZERhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlRGF0YTogdW5kZWZpbmVkXG5cbiAgICB9O1xuICAgIGNvbnN0IHRlc3RQcm9qZWN0cyA9IHBvc3RmaXgoIHJlcG9UZXN0TmFtZSwgWyAxLCAyIF0gKS5tYXAoIHggPT4gbmV3IFByb2plY3QoIHgsIHJlcG8gKSApO1xuICAgIGNvbnN0IHJlY3JlYXRlVGVzdFByb2plY3RzID0gdGVzdFByb2plY3RzLm1hcCggeCA9PiB4LmRlbGV0ZVNlbGYoKS50aGVuKCAoKSA9PiB4LnNhdmUoKSApICk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKCByZWNyZWF0ZVRlc3RQcm9qZWN0cyApXG4gICAgICAgIC50aGVuKCAoKSA9PiByZXBvLmxpc3RQcm9qZWN0cygpIClcbiAgICAgICAgLnRoZW4oICggbGlzdGluZyApID0+IHtcblxuICAgICAgICAgICAgcmVzdWx0LmNhbkxpc3RQcm9qZWN0cyA9IHRlc3RQcm9qZWN0cy5ldmVyeSggeCA9PiB+bGlzdGluZy5pbmRleE9mKCB4Lm5hbWUgKSApO1xuICAgICAgICAgICAgaWYgKCAhcmVzdWx0LmNhbkxpc3RQcm9qZWN0cyApIHRocm93IG5ldyBFcnJvciggXCJDYW4ndCBsaXN0L2NyZWF0ZSBwcm9qZWN0c1wiICk7XG4gICAgICAgICAgICByZXN1bHQuY2FuQ3JlYXRlUHJvamVjdHMgPSB0cnVlO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4gdGVzdFByb2plY3RzWyAwIF0uZGVsZXRlU2VsZigpXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gcmVwby5saXN0UHJvamVjdHMoKSApXG4gICAgICAgICAgICAudGhlbiggKCBsaXN0aW5nICkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmNhbkRlbGV0ZVByb2plY3RzID0gIX5saXN0aW5nLmluZGV4T2YoIHRlc3RQcm9qZWN0c1sgMCBdLm5hbWUgKTtcblxuICAgICAgICAgICAgfSApIClcbiAgICAgICAgLmNhdGNoKCAoIGV4ICkgPT4ge1xuXG4gICAgICAgICAgICBsb2dFcnJvciggZXggKTtcbiAgICAgICAgICAgIHJlc3VsdC5leCA9IGV4O1xuXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggKCkgPT4gcmVzdWx0ICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5U3RvcmFnZSggZGF0YSwgcmVwbywgdGVzdE5hbWUsIHRlc3RDb250ZW50ICkge1xuXG4gICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcblxuICAgICAgICBkZWxldGVBbGwoIGRhdGEsIHRlc3ROYW1lICkuY2F0Y2goIGVyciA9PiBsb2dFcnJvciggXCJDbGVhbmluZyB1cCBhZnRlciBzZWxmIHRlc3RcIiwgZXJyICkgKTtcblxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICB2ZXJpZnlEYXRhKCBkYXRhLCB0ZXN0TmFtZSwgdGVzdENvbnRlbnQgKSxcbiAgICAgICAgdmVyaWZ5UmVwbyggcmVwbywgdGVzdE5hbWUgKVxuXG4gICAgXSApLnRoZW4oICggWyBkYXRhUmVzdWx0cywgcmVwb1Jlc3VsdHMgXSApID0+IHtcblxuICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IGRhdGFSZXN1bHRzLCByZXBvOiByZXBvUmVzdWx0cyB9O1xuXG4gICAgfSApLmNhdGNoKCAoIGV4ICkgPT4ge1xuXG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgdGhyb3cgZXg7XG5cbiAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gaW5pdFN0b3JhZ2VWZXJpZmljYXRpb25zKCBvd25lciApIHtcblxuICAgIGNvbnN0IGZldGNoVGVzdERhdGEgPSBmZXRjaCggXCIvcHVibGljL2RhdGEvbm90c2hha2EuanNvblwiICkudGhlbiggcmVzID0+IHJlcy5qc29uKCkgKTtcbiAgICBjb25zdCBidWlsZERhdGEgPSBEYXRhLmluRm9sZGVyKCBhcHBOYW1lICk7XG4gICAgY29uc3QgYnVpbGRSZXBvID0gYnVpbGREYXRhLnRoZW4oIGQgPT4gbmV3IFJlcG8oIGQgKSApO1xuICAgIGNvbnN0IHRlc3ROYW1lID0gYF9fdGVtcF90ZXN0aW5nXyR7YXBwTmFtZX1gO1xuICAgIGxvZyggXCJWZXJpZnkgYWxsIHN0b3JhZ2UuLi5cIiwgb3duZXIgKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIFsgYnVpbGREYXRhLCBidWlsZFJlcG8sIGZldGNoVGVzdERhdGEgXSApXG4gICAgICAgIC50aGVuKCAoIFsgZGF0YSwgcmVwbywgdGVzdERhdGEgXSApID0+IHZlcmlmeVN0b3JhZ2UoIGRhdGEsIHJlcG8sIHRlc3ROYW1lLCB0ZXN0RGF0YSApIClcbiAgICAgICAgLnRoZW4oIHZlcmlmaWNhdGlvbiA9PiBzdG9yYWdlVmVyaWZpY2F0aW9ucy5zZXQoIG93bmVyLCB2ZXJpZmljYXRpb24gKSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGxvZyggXCJWZXJpZnkgYWxsIHN0b3JhZ2UgY29tcGxldGVcIiwgb3duZXIgKTtcbiAgICAgICAgICAgIHJldHVybiBzdG9yYWdlVmVyaWZpY2F0aW9ucy5nZXQoIG93bmVyICk7XG5cbiAgICAgICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIHZlcmlmeUFsbFN0b3JhZ2UoIG93bmVyICkge1xuXG4gICAgcmV0dXJuIG93bmVyLndhaXRGb3JMb2FkKCkudGhlbiggKCkgPT5cblxuICAgICAgICBzdG9yYWdlVmVyaWZpY2F0aW9ucy5nZXQoIG93bmVyIClcbiAgICAgICAgfHxcbiAgICAgICAgc3RvcmFnZVZlcmlmaWNhdGlvbnMuc2V0KCBvd25lciwgaW5pdFN0b3JhZ2VWZXJpZmljYXRpb25zKCBvd25lciApICkuZ2V0KCBvd25lciApXG5cbiAgICApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmN0aW9uLXBhcmVuLW5ld2xpbmVcblxufVxuXG5jbGFzcyBHb29nbGVDYXBhYmlsaXRpZXMgZXh0ZW5kcyBQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciggXCJZb3VyIEdvb2dsZSBEcml2ZSBzdG9yYWdlXCIgKTtcblxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuXG4gICAgICAgIHN0b3JhZ2VWZXJpZmljYXRpb25zLmRlbGV0ZSggdGhpcyApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICB9XG5cbiAgICB2ZXJpZnlMaXN0KCkge1xuXG4gICAgICAgIHJldHVybiB2ZXJpZnlBbGxTdG9yYWdlKCB0aGlzICkudGhlbiggKCB7IGRhdGEgfSApID0+ICEhZGF0YS5jYW5MaXN0ICk7XG5cbiAgICB9XG5cbiAgICB2ZXJpZnlTdG9yZSgpIHtcblxuICAgICAgICByZXR1cm4gdmVyaWZ5QWxsU3RvcmFnZSggdGhpcyApLnRoZW4oICggeyBkYXRhIH0gKSA9PiAhIWRhdGEuY2FuU3RvcmUgKTtcblxuICAgIH1cblxuICAgIHZlcmlmeUdldCgpIHtcblxuICAgICAgICByZXR1cm4gdmVyaWZ5QWxsU3RvcmFnZSggdGhpcyApLnRoZW4oICggeyBkYXRhIH0gKSA9PiAhIWRhdGEuY2FuR2V0ICk7XG5cbiAgICB9XG5cbiAgICB2ZXJpZnlEZWxldGUoKSB7XG5cbiAgICAgICAgcmV0dXJuIHZlcmlmeUFsbFN0b3JhZ2UoIHRoaXMgKS50aGVuKCAoIHsgZGF0YSB9ICkgPT4gISFkYXRhLmNhbkRlbGV0ZSApO1xuXG4gICAgfVxuXG4gICAgdmVyaWZ5UHJvamVjdHMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHZlcmlmeUFsbFN0b3JhZ2UoIHRoaXMgKS50aGVuKCAoIHsgcmVwbyB9ICkgPT4gcmVwbyApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHb29nbGVDYXBhYmlsaXRpZXMoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9jYXBhYmlsaXRpZXMuanMiLCIvKiBnbG9iYWwgZ2FwaSAqL1xuXG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vLi4vZGlhZ25vc3RpY3NcIjtcblxuY29uc3QgZmlsZXNBUEkgPSBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2RyaXZlL3YzL2ZpbGVzXCI7XG5jb25zdCB1cGxvYWRBUEkgPSBcImh0dHBzOi8vY29udGVudC5nb29nbGVhcGlzLmNvbS91cGxvYWQvZHJpdmUvdjMvZmlsZXNcIjtcbmNvbnN0IGZvbGRlck1pbWVUeXBlID0gXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyXCI7XG5jb25zdCBib3VuZGFyeSA9IFwiLi4uLi4uXCI7XG5jb25zdCBtdWx0aVBhcnRNaW1lVHlwZSA9IGBtdWx0aXBhcnQvcmVsYXRlZDsgYm91bmRhcnk9JHtib3VuZGFyeX1gO1xuY29uc3QgZGF0YU1pbWVUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG5jb25zdCBKU09OY29udGVudFR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLThcIjtcblxuY2xhc3MgRmlsZVNwZWMge1xuXG4gICAgY29uc3RydWN0b3IoIHsgaWQsIG5hbWUgfSApIHtcblxuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgYnVpbGQoIHRoaW5nICkge1xuXG4gICAgICAgIHJldHVybiBuZXcgRmlsZVNwZWMoIHRoaW5nICk7XG5cbiAgICB9XG5cbn1cblxubGV0IGNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiByZXF1ZXN0KCBvcHRpb25zICkge1xuXG4gICAgY29uc3QgZGVmYXVsdGVkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oIHsgbWV0aG9kOiBcIkdFVFwiLCBwYXRoOiBmaWxlc0FQSSB9LCBvcHRpb25zICk7XG4gICAgbG9nKCBcIkdBUEkgcmVxdWVzdFwiLCArK2NvdW50ZXIsIGRlZmF1bHRlZE9wdGlvbnMgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4gZ2FwaS5jbGllbnRcbiAgICAgICAgLnJlcXVlc3QoIGRlZmF1bHRlZE9wdGlvbnMgKVxuICAgICAgICAudGhlbiggcmVzb2x2ZSwgcmVqZWN0ICkgKTtcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb2xkZXIoIG5hbWUgKSB7XG5cbiAgICBjb25zdCBtaW1lVHlwZSA9IGZvbGRlck1pbWVUeXBlO1xuICAgIGNvbnN0IGJvZHkgPSB7IG5hbWUsIG1pbWVUeXBlIH07XG4gICAgY29uc3QgbWV0aG9kID0gXCJQT1NUXCI7XG4gICAgcmV0dXJuIHJlcXVlc3QoIHsgbWV0aG9kLCBib2R5IH0gKTtcblxufVxuXG5mdW5jdGlvbiBmaXJzdE9yTnVsbCggbGlzdCwgdHJhbnNmb3JtID0geCA9PiB4ICkge1xuXG4gICAgaWYgKCBsaXN0ICYmIGxpc3QubGVuZ3RoICkgcmV0dXJuIHRyYW5zZm9ybSggbGlzdFsgMCBdICk7XG4gICAgcmV0dXJuIG51bGw7XG5cbn1cbmZ1bmN0aW9uIGVuc3VyZUZvbGRlciggbmFtZSApIHtcblxuICAgIGNvbnN0IHEgPSBgbmFtZT0nJHtuYW1lfScgYW5kIG1pbWVUeXBlPScke2ZvbGRlck1pbWVUeXBlfScgYW5kIHRyYXNoZWQ9ZmFsc2VgO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgcSB9O1xuICAgIHJldHVybiByZXF1ZXN0KCB7IHBhcmFtcyB9IClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMucmVzdWx0LmZpbGVzIClcbiAgICAgICAgLnRoZW4oIGZpcnN0T3JOdWxsIClcbiAgICAgICAgLnRoZW4oIG1heWJlRm9sZGVyID0+IG1heWJlRm9sZGVyIHx8IGNyZWF0ZUZvbGRlciggbmFtZSApIClcbiAgICAgICAgLnRoZW4oIEZpbGVTcGVjLmJ1aWxkICk7XG5cbn1cblxuZnVuY3Rpb24gZHVtYkRvd25QcmVmaXgoIHByZWZpeCApIHtcblxuICAgIGxldCByZXQgPSBwcmVmaXg7XG4gICAgLy8gQVBJIGRvZXNuJ3QgbGlrZSBkYXNoZXMgZm9yIHNvbWUgcmVhc29uXG4gICAgY29uc3QgZGFzaEluZGV4ID0gcmV0LmluZGV4T2YoIFwiLVwiICk7XG4gICAgaWYgKCB+ZGFzaEluZGV4ICkgcmV0ID0gcmV0LnN1YnN0cmluZyggMCwgZGFzaEluZGV4ICk7XG4gICAgLy8gQVBJIGRvZXNuJ3QgbGlrZSBtb3JlIHRoYW4gfjIwIGNoYXJhY3RlcnMgZm9yIHNvbWUgcmVhc29uXG4gICAgaWYgKCByZXQubGVuZ3RoID4gMjAgKSByZXQgPSByZXQuc3Vic3RyaW5nKCAwLCAyMCApO1xuICAgIHJldHVybiByZXQ7XG5cbn1cbmZ1bmN0aW9uIGxpc3RGaWxlc0luRm9sZGVyKCBmb2xkZXIsIG1heWJlUHJlZml4ICkge1xuXG4gICAgbGV0IHEgPSBgbWltZVR5cGU9JyR7ZGF0YU1pbWVUeXBlfScgYW5kIHRyYXNoZWQ9ZmFsc2VgO1xuICAgIGxldCBuYW1lRmlsdGVyID0gKCkgPT4gdHJ1ZTtcbiAgICBpZiAoIG1heWJlUHJlZml4ICkge1xuXG4gICAgICAgIGNvbnN0IGFwaVByZWZpeCA9IGR1bWJEb3duUHJlZml4KCBtYXliZVByZWZpeCApO1xuICAgICAgICBpZiAoIGFwaVByZWZpeCAhPT0gbWF5YmVQcmVmaXggKSB7XG5cbiAgICAgICAgICAgIG5hbWVGaWx0ZXIgPSB4ID0+IHgubmFtZS5pbmRleE9mKCBtYXliZVByZWZpeCApID09PSAwO1xuXG4gICAgICAgIH1cbiAgICAgICAgcSA9IGBuYW1lIGNvbnRhaW5zICcke2FwaVByZWZpeH0nIGFuZCAke3F9YDtcblxuICAgIH1cbiAgICBjb25zdCBwYWdlU2l6ZSA9IDEwMDA7XG4gICAgY29uc3QgcGFyYW1zID0geyBxLCBwYWdlU2l6ZSB9O1xuICAgIHJldHVybiByZXF1ZXN0KCB7IHBhcmFtcyB9IClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMucmVzdWx0LmZpbGVzIClcbiAgICAgICAgLnRoZW4oIGZpbGVzID0+IGZpbGVzLmZpbHRlciggbmFtZUZpbHRlciApLm1hcCggRmlsZVNwZWMuYnVpbGQgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGZpbmRGaWxlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjICkge1xuXG4gICAgaWYgKCBtYXliZVNwZWMgaW5zdGFuY2VvZiBGaWxlU3BlYyApIHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCBtYXliZVNwZWMgKTtcblxuICAgIH1cbiAgICBjb25zdCB7IGlkIH0gPSBmb2xkZXIgfHwge307XG4gICAgY29uc3QgcSA9IGBuYW1lPScke21heWJlU3BlY30nIGFuZCAnJHtpZH0nIGluIHBhcmVudHMgYW5kIG1pbWVUeXBlPScke2RhdGFNaW1lVHlwZX0nIGFuZCB0cmFzaGVkPWZhbHNlYDtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHEgfTtcbiAgICByZXR1cm4gcmVxdWVzdCggeyBwYXJhbXMgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLnJlc3VsdC5maWxlcyApXG4gICAgICAgIC50aGVuKCBmaWxlcyA9PiBmaXJzdE9yTnVsbCggZmlsZXMsIGZpbGUgPT4gRmlsZVNwZWMuYnVpbGQoIGZpbGUgKSApICk7XG5cbn1cblxuZnVuY3Rpb24gSlNPTnBhcnQoIG9iaiApIHtcblxuICAgIHJldHVybiBgXFxyXFxuQ29udGVudC1UeXBlOiAke0pTT05jb250ZW50VHlwZX1cXHJcXG5cXHJcXG4ke0pTT04uc3RyaW5naWZ5KCBvYmosIG51bGwsIDEgKX1gO1xuXG59XG5cbmZ1bmN0aW9uIG11bHRpcGFydCggLi4ucGFydHMgKSB7XG5cbiAgICBjb25zdCBwYXJ0U3RhcnQgPSBgXFxyXFxuLS0ke2JvdW5kYXJ5fWA7XG4gICAgY29uc3QgcGFydEVuZCA9IGAke3BhcnRTdGFydH0tLWA7XG4gICAgcmV0dXJuIHBhcnRTdGFydCArIHBhcnRzLmpvaW4oIHBhcnRTdGFydCApICsgcGFydEVuZDtcblxufVxuXG5mdW5jdGlvbiBjcmVhdGVJbkZvbGRlciggZm9sZGVyLCBuYW1lLCBkYXRhICkge1xuXG4gICAgY29uc3QgbWV0aG9kID0gXCJQT1NUXCI7XG4gICAgY29uc3QgaGVhZGVycyA9IHsgXCJDb250ZW50LVR5cGVcIjogbXVsdGlQYXJ0TWltZVR5cGUgfTtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHVwbG9hZFR5cGU6IFwibXVsdGlwYXJ0XCIgfTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IHsgcGFyZW50czogWyBmb2xkZXIuaWQgXSwgbmFtZSB9O1xuICAgIGNvbnN0IGJvZHkgPSBtdWx0aXBhcnQoIEpTT05wYXJ0KCBtZXRhZGF0YSApLCBKU09OcGFydCggZGF0YSApICk7XG4gICAgY29uc3QgcGF0aCA9IHVwbG9hZEFQSTtcbiAgICByZXR1cm4gcmVxdWVzdCgge1xuXG4gICAgICAgIHBhdGgsIG1ldGhvZCwgcGFyYW1zLCBoZWFkZXJzLCBib2R5LFxuXG4gICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUluRm9sZGVyKCBmb2xkZXIsIGZpbGUsIGRhdGEgKSB7XG5cbiAgICBjb25zdCBtZXRob2QgPSBcIlBBVENIXCI7XG4gICAgY29uc3QgcGFyYW1zID0geyB1cGxvYWRUeXBlOiBcIm1lZGlhXCIgfTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IGRhdGFNaW1lVHlwZTtcbiAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoIGRhdGEgKTtcbiAgICBjb25zdCBwYXRoID0gYCR7dXBsb2FkQVBJfS8ke2ZpbGUuaWR9YDtcbiAgICByZXR1cm4gcmVxdWVzdCgge1xuXG4gICAgICAgIHBhdGgsIG1ldGhvZCwgcGFyYW1zLCBtaW1lVHlwZSwgYm9keSxcblxuICAgIH0gKTtcblxufVxuXG5mdW5jdGlvbiB0aHJvd0FscmVhZHlFeGlzdHMoIGZpbGUgKSB7XG5cbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoIGBGaWxlIGFscmVhZHkgZXhpc3RzOiAke2ZpbGUuaWR9ICR7ZmlsZS5uYW1lfWAgKTtcbiAgICBlcnIuY29kZSA9IDQwOTtcbiAgICB0aHJvdyBlcnI7XG5cbn1cblxuZnVuY3Rpb24gc2F2ZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYywgZGF0YSwgb3B0aW9ucyA9IHt9ICkge1xuXG4gICAgY29uc3QgeyBvdmVyd3JpdGUgfSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIGZpbmRGaWxlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjIClcbiAgICAgICAgLnRoZW4oICggbWF5YmVGaWxlICkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIG1heWJlRmlsZSAmJiAhb3ZlcndyaXRlICkgdGhyb3dBbHJlYWR5RXhpc3RzKCBtYXliZUZpbGUgKTtcbiAgICAgICAgICAgIGlmICggbWF5YmVGaWxlICkgcmV0dXJuIHVwZGF0ZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlRmlsZSwgZGF0YSApO1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYywgZGF0YSApO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggcmVzID0+IEZpbGVTcGVjLmJ1aWxkKCByZXMucmVzdWx0ICkgKTtcblxufVxuXG5mdW5jdGlvbiBsb2FkRnJvbUZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKSB7XG5cbiAgICByZXR1cm4gZmluZEZpbGVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKVxuICAgICAgICAudGhlbiggKCBtYXliZUZpbGUgKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICggbWF5YmVGaWxlICkgcmV0dXJuIG1heWJlRmlsZTtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvciggYE5vdCBmb3VuZDogJHttYXliZVNwZWN9YCApO1xuICAgICAgICAgICAgZXJyLmNvZGUgPSA0MDQ7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGVyciApO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAudGhlbiggKCBmaWxlICkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gYCR7ZmlsZXNBUEl9LyR7ZmlsZS5pZH1gO1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0geyBhbHQ6IFwibWVkaWFcIiB9O1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoIHsgcGF0aCwgcGFyYW1zIH0gKTtcblxuICAgICAgICB9IClcbiAgICAgICAgLmNhdGNoKCBleCA9PiBQcm9taXNlLnJlamVjdCggKCBleCAmJiBleC5yZXN1bHQgJiYgZXgucmVzdWx0LmVycm9yICkgfHwgZXggKSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLnJlc3VsdCApO1xuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUZyb21Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjICkge1xuXG4gICAgcmV0dXJuIGZpbmRGaWxlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjIClcbiAgICAgICAgLnRoZW4oICggbWF5YmVGaWxlICkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoICFtYXliZUZpbGUgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB7IGNvZGU6IDQwNCB9ICk7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gYCR7ZmlsZXNBUEl9LyR7bWF5YmVGaWxlLmlkfWA7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSBcIkRFTEVURVwiO1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QoIHsgbWV0aG9kLCBwYXRoIH0gKTtcblxuICAgICAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gY2xlYW5VcEVycm9yKCBlcnIgKSB7XG5cbiAgICBpZiAoIGVyci5jb2RlICkgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlcnIgKTtcbiAgICBpZiAoIGVyci5yZXN1bHQgKSB7XG5cbiAgICAgICAgY29uc29sZS5lcnJvciggYFdURiBhbSBpIHN1cHBvc2VkIHRvIGRvIHdpdGggdGhpcz8gJHtKU09OLnN0cmluZ2lmeSggZXJyLnJlc3VsdCwgbnVsbCwgMyApfWAgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgICB9XG4gICAgY29uc29sZS5lcnJvciggZXJyICk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnN0IGNsZWFuRXJyb3IgPSBuZXcgRXJyb3IoIGVyci5ib2R5IHx8IGVyci5zdGF0dXNUZXh0IHx8IFwiVW5rbm93biBlcnJvclwiICk7XG4gICAgY2xlYW5FcnJvci5lcnIgPSBlcnI7XG4gICAgY2xlYW5FcnJvci5jb2RlID0gZXJyLnN0YXR1cyB8fCA1MDA7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBjbGVhbkVycm9yICk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSB7XG5cbiAgICAvKipcbiAgICAgKiBidWlsZHMgYSBEYXRhIHJlcG9zaXRvcnkgZm9yIHRoZSBuYW1lZCBmb2xkZXJcbiAgICAgKiBpZiB0aGUgZm9sZGVyIGRvZXNuJ3QgYWxyZWFkeSBleGlzdCwgY3JlYXRlcyBpdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXJOYW1lIHRoZSBuYW1lIG9mIHRoZSBmb2xkZXIgZm9yIHdoaWNoIHRvIGJ1aWxkXG4gICAgICogQHJldHVybnMge0RhdGF9IHRoZSBkYXRhIHJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5Gb2xkZXIoIGZvbGRlck5hbWUgKSB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gZW5zdXJlRm9sZGVyKCBmb2xkZXJOYW1lICkgKVxuICAgICAgICAgICAgLnRoZW4oIGZvbGRlclNwZWMgPT4gbmV3IERhdGEoIGZvbGRlclNwZWMgKSApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBhIERhdGEgcmVwb3NpdG9yeSBmb3IgZmlsZXMgc3RvcmVkIGluIHRoZSBzcGVjaWZpZWQgZm9sZGVyXG4gICAgICogQHBhcmFtIHtGaWxlU3BlY30gZm9sZGVyU3BlYyB0aGUgZm9sZGVyIGNvbnRhaW5pbmcgZmlsZXMgdG8gb3BlcmF0ZSBvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBmb2xkZXJTcGVjICkge1xuXG4gICAgICAgIHRoaXMuZm9sZGVyID0gZm9sZGVyU3BlYztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBkYXRhIGZpbGVzIGluIHRoaXMgZm9sZGVyIChKU09OIGZpbGVzKVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWF5YmVQcmVmaXhdIGlmIHNwZWNpZmllZCwgb25seSBmaWxlcyB3aXRoIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBwcmVmaXggYXJlIHJldHVybmVkXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgdG8gbGlzdCB0aGUgZmlsZXMgaW4gdGhpcyBmb2xkZXJcbiAgICAgKi9cbiAgICBsaXN0KCBtYXliZVByZWZpeCApIHtcblxuICAgICAgICByZXR1cm4gbGlzdEZpbGVzSW5Gb2xkZXIoIHRoaXMuZm9sZGVyLCBtYXliZVByZWZpeCApLmNhdGNoKCBjbGVhblVwRXJyb3IgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIHRoZSBzcGVjaWZpZWQgZGF0YSBpbiBhIGRhdGEgZmlsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBmaWxlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgdGhlIGRhdGEgdG8gc2F2ZSAod2lsbCBiZSBKU09OIHN0cmluZ2lmaWVkKVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gc2F2ZSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMub3ZlcndyaXRlIGlmIFRydWUgd2lsbCBjaGVjayBpZiBmaWxlIGV4aXN0cyBhbmRcbiAgICAgKiByZXR1cm4gYW4gZXJyb3Igd2l0aCBjb2RlIDQwOVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRvIHNhdmUgdGhlIGZpbGVcbiAgICAgKi9cbiAgICBzYXZlKCBuYW1lLCBkYXRhLCBvcHRpb25zICkge1xuXG4gICAgICAgIHJldHVybiBzYXZlSW5Gb2xkZXIoIHRoaXMuZm9sZGVyLCBuYW1lLCBkYXRhLCBvcHRpb25zICkuY2F0Y2goIGNsZWFuVXBFcnJvciApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBzcGVjaWZpZWQgZGF0YSBpbiBhIGRhdGEgZmlsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS9zcGVjXG4gICAgICogQHBhcmFtIHtzdHJpbmd8RmlsZVNwZWN9IG1heWJlU3BlYyB0aGUgbmFtZSBvciBGaWxlU3BlYyBvZiB0aGUgZmlsZSB0byBsb2FkXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBQcm9taXNlIHRvIGxvYWQgdGhlIGZpbGUgc3BlY2lmaWVkXG4gICAgICovXG4gICAgbG9hZCggbWF5YmVTcGVjICkge1xuXG4gICAgICAgIHJldHVybiBsb2FkRnJvbUZvbGRlciggdGhpcy5mb2xkZXIsIG1heWJlU3BlYyApLmNhdGNoKCBjbGVhblVwRXJyb3IgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcm1lbmFudGx5IGRlbGV0ZXMgdGhlIGRhdGEgZmlsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZS9zcGVjLiBUaGUgZmlsZVxuICAgICAqIGlzIG5vdCByZWNvdmVyYWJsZSBmcm9tIHRoZSByZWN5Y2xlIGJpbi4gSWYgdGhlIGRhdGEgZmlsZSBpcyBhbHJlYWR5XG4gICAgICogZ29uZSwgcmVzb2x2ZXMgd2l0aCB7IGNvZGU6IDQwNCB9XG4gICAgICogQHBhcmFtIHtzdHJpbmd8RmlsZVNwZWN9IG1heWJlU3BlYyB0aGUgbmFtZSBvciBGaWxlU3BlYyBvZiB0aGUgZmlsZSB0byBkZWxldGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2UgdG8gZGVsZXRlIHRoZSBmaWxlXG4gICAgICovXG4gICAgcGVybURlbGV0ZSggbWF5YmVTcGVjICkge1xuXG4gICAgICAgIHJldHVybiBkZWxldGVGcm9tRm9sZGVyKCB0aGlzLmZvbGRlciwgbWF5YmVTcGVjICkuY2F0Y2goIGNsZWFuVXBFcnJvciApO1xuXG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvc3RvcmUvRGF0YS5qcyIsImNvbnN0IGZpbGVuYW1lID0gbmFtZSA9PiBgJHtuYW1lfV9wcm9qZWN0Lmpzb25gO1xuY29uc3QgYXNTZWdtZW50RmlsZW5hbWUgPSAoIG5hbWUsIGtleSApID0+IGAke25hbWV9X18ke2tleX0uanNvbmA7XG5jb25zdCBmaWxlbmFtZVBhdHRlcm4gPSAvXiguKilfcHJvamVjdFxcLmpzb24kLztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwbyB7XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHByb2plY3QgcmVwb3NpdG9yeSBmb3IgdGhlIGdpdmVuIGRhdGEgcmVwb3NpdG9yeVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIHRoZSBkYXRhIHJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciggZGF0YSApIHtcblxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZSBhIHByb2plY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUsIG1ldGFkYXRhIGFuZCBzZWdtZW50cyAoaGFzaCBvZiBrZXktdmFsdWVzKVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhIHRvIHNhdmUgaW4gdGhlIG1haW4gcHJvamVjdCBmaWxlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHNlZ21lbnRzIGhhc2ggb2Yga2V5LXZhbHVlIHBhaXJzIHRvIHNhdmUsIGVhY2ggaW4gaXRzIG93biBmaWxlXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBQcm9taXNlIG9mIHNhdmVkIHByb2plY3RcbiAgICAgKi9cbiAgICBzYXZlUHJvamVjdCggbmFtZSwgbWV0YWRhdGEsIHNlZ21lbnRzID0ge30gKSB7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMoIHNlZ21lbnRzICkuZm9yRWFjaCggKCBrZXkgKSA9PiB7XG5cbiAgICAgICAgICAgIGluZGV4WyBrZXkgXSA9IGFzU2VnbWVudEZpbGVuYW1lKCBuYW1lLCBrZXkgKTtcblxuICAgICAgICB9ICk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB7IGluZGV4LCBtZXRhZGF0YSB9O1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNhdmUoIGZpbGVuYW1lKCBuYW1lICksIHByb2plY3QsIHsgb3ZlcndyaXRlOiB0cnVlIH0gKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYSBwcm9qZWN0IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2Ugb2YgcHJvamVjdCB7IHtvYmplY3R9IG1ldGFkYXRhLCB7YXJyYXl9IHNlZ21lbnRzIH1cbiAgICAgKi9cbiAgICBsb2FkUHJvamVjdCggbmFtZSApIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxvYWQoIGZpbGVuYW1lKCBuYW1lICkgKVxuICAgICAgICAgICAgLnRoZW4oICggeyBtZXRhZGF0YSwgaW5kZXggfSApID0+ICgge1xuXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhIHx8IHt9LFxuICAgICAgICAgICAgICAgIHNlZ21lbnRzOiBPYmplY3Qua2V5cyggaW5kZXggfHwge30gKVxuXG4gICAgICAgICAgICB9ICkgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHByb2plY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBvZiB0aGUgcHJvamVjdCB0byBkZWxldGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2Ugb2YgZGVsZXRpb25cbiAgICAgKi9cbiAgICBkZWxldGVQcm9qZWN0KCBuYW1lICkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucGVybURlbGV0ZSggZmlsZW5hbWUoIG5hbWUgKSApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdHMgdGhlIHByb2plY3RzIGluIHRoaXMgcmVwb3NpdG9yeVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSBvZiBsaXN0aW5nIG9mIHByb2plY3QgbmFtZXNcbiAgICAgKi9cbiAgICBsaXN0UHJvamVjdHMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5saXN0KCkudGhlbiggbGlzdGluZyA9PiBsaXN0aW5nXG4gICAgICAgICAgICAubWFwKCAoIHsgbmFtZSB9ICkgPT4gZmlsZW5hbWVQYXR0ZXJuLmV4ZWMoIG5hbWUgKSApXG4gICAgICAgICAgICAuZmlsdGVyKCB4ID0+IHggKVxuICAgICAgICAgICAgLm1hcCggKCBbICwgbmFtZSBdICkgPT4gbmFtZSApICk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL3N0b3JlL1JlcG8uanMiLCIvKiBnbG9iYWwgZG9jdW1lbnQsIEN1c3RvbUV2ZW50LCB3aW5kb3cgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuZnVuY3Rpb24gdGVzdFNlcnZpY2VzKCBlLCBzZXJ2aWNlcyApIHtcblxuICAgIHNlcnZpY2VzLmNhcGFiaWxpdGllcy52ZXJpZnlQcm9qZWN0UmVwbygpLnRoZW4oIGNvbnNvbGUubG9nLmJpbmQoIGNvbnNvbGUgKSApO1xuICAgIHdpbmRvdy54ID0gc2VydmljZXM7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRlc3QoKSB7XG5cbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KCBuZXcgQ3VzdG9tRXZlbnQoIFwibG9jYXRlLXNlcnZpY2VzXCIsIHsgZGV0YWlsOiB0ZXN0U2VydmljZXMgfSApICk7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZWxmLXRlc3QuanMiLCJpbXBvcnQgU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5cbmNvbnN0IHJlcXVpcmVkRnVuY3Rpb25zID0gWyBcImxpc3RcIiBdO1xuY29uc3QgY2hvc2VuS2V5ID0gXCJjaG9zZW4tcHJvamVjdHMtcHJvdmlkZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdHNTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJvdmlkZXJzICkge1xuXG4gICAgICAgIHN1cGVyKCBwcm92aWRlcnMsIGNob3NlbktleSwgcmVxdWlyZWRGdW5jdGlvbnMgKTtcblxuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9wcm9qZWN0cy5qcyIsIi8qIGdsb2JhbCBnYXBpICovXG5cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiLi9wcm92aWRlclwiO1xuXG5jbGFzcyBQcm9qZWN0cyBleHRlbmRzIFByb3ZpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKCBcIlByb2plY3RzIGJhc2VkIG9uIGdvb2dsZSBkcml2ZVwiICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBwcm9qZWN0cyBzdG9yZWQgaW4gZ29vZ2xlIGRyaXZlXG4gICAgICogQHJldHVybnMge29iamVjdH0gUHJvbWlzZSBvZiBsaXN0IG9mIHByb2plY3QgbmFtZXNcbiAgICAgKi9cbiAgICBsaXN0KCkge1xuXG4gICAgICAgIHRocm93IG5ldyBFcnJvciggXCJOb3QgaW1wbGVtZW50ZWRcIiApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQcm9qZWN0cygpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvcHJvamVjdHMuanMiLCJjb25zdCByZXBvcyA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuXG4gICAgY29uc3RydWN0b3IoIG5hbWUsIHJlcG8gKSB7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgcmVwb3NbIHRoaXMgXSA9IHJlcG87XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgfVxuXG4gICAgaW5pdCgpIHtcblxuICAgICAgICB0aGlzLnNlZ21lbnRzID0ge307XG5cbiAgICB9XG5cbiAgICBkZWxldGVTZWxmKCkge1xuXG4gICAgICAgIGNvbnN0IHJlcG8gPSByZXBvc1sgdGhpcyBdO1xuICAgICAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiByZXBvLmxvYWRQcm9qZWN0KCBuYW1lIClcbiAgICAgICAgICAgIC50aGVuKCAoIHsgc2VnbWVudHMgfSApID0+IHJlcG8uZGVsZXRlUHJvamVjdCggbmFtZSwgc2VnbWVudHMgKSApXG4gICAgICAgICAgICAuY2F0Y2goICggZXggKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGV4LmNvZGUgIT09IDQwNCApIHRocm93IGV4O1xuXG4gICAgICAgICAgICB9ICk7XG5cbiAgICB9XG5cbiAgICBzYXZlKCkge1xuXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0geyBzYXZlZDogRGF0ZS5ub3coKSB9O1xuICAgICAgICByZXR1cm4gcmVwb3NbIHRoaXMgXS5zYXZlUHJvamVjdCggdGhpcy5uYW1lLCBtZXRhZGF0YSwgT2JqZWN0LmtleXMoIHRoaXMuc2VnbWVudHMgKSApO1xuXG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL21vZGVsL1Byb2plY3QuanMiXSwic291cmNlUm9vdCI6IiJ9