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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = __webpack_require__(1);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _localStore = __webpack_require__(6);

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
    owner.provider = _providers.get(owner).find(function (x) {
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
        findProvider(_this);

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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _providerBase = __webpack_require__(9);

var _providerBase2 = _interopRequireDefault(_providerBase);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _shared = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loadFlag = false;
var loadError = void 0;

document.addEventListener("google-api-loaded", function handleAPILoaded() {

    (0, _shared.init)(_config2.default.gapi).then(function () {
        loadFlag = true;
    }).catch(function (ex) {
        loadError = ex;
    });
});

function waitFor(condition, timeout, description) {

    if (timeout <= 0) {
        return Promise.reject("Timed out");
    }
    if (condition()) {
        return Promise.resolve(true);
    }
    var newTimeout = timeout - 100;
    return new Promise(function (resolve, reject) {
        return setTimeout(function () {
            return waitFor(condition, newTimeout).then(resolve, reject);
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

            return { loaded: loadFlag, loadError: loadError };
        }
    }, {
        key: "waitForLoad",
        value: function waitForLoad() {
            var _this2 = this;

            if (loadFlag) {
                return Promise.resolve();
            }
            console.log("Provider loading...", this);
            return waitFor(function () {
                return loadFlag;
            }, 5000).then(function () {

                console.log("Provider loading complete", _this2);
            });
        }
    }]);

    return Provider;
}(_providerBase2.default);

exports.default = Provider;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = window["sleeper-service-config"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _identity = __webpack_require__(5);

var _identity2 = _interopRequireDefault(_identity);

var _capabilities = __webpack_require__(7);

var _capabilities2 = _interopRequireDefault(_capabilities);

var _identity3 = __webpack_require__(8);

var _identity4 = _interopRequireDefault(_identity3);

var _capabilities3 = __webpack_require__(11);

var _capabilities4 = _interopRequireDefault(_capabilities3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("locate-services", function (e) {

    e.detail(null, {

        identity: new _identity2.default([_identity4.default]),
        capabilities: new _capabilities2.default([_capabilities4.default])

    });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = __webpack_require__(0);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = window.localStorage;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = __webpack_require__(0);

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

                    return { canList: canList, canStore: canStore, canGet: canGet, canDelete: canDelete };
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provider = __webpack_require__(2);

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
    return { provider: provider, signedIn: signedIn, userId: userId, name: name };
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

            return new Promise(signin);
        }
    }, {
        key: "deauthorize",
        value: function deauthorize() {

            return new Promise(signout);
        }
    }]);

    return GoogleIdentity;
}(_provider2.default);

exports.default = new GoogleIdentity();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = __webpack_require__(1);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
/*global gapi*/

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

function init(config) {

    var naga = tryInitAuthClient.bind(null, config);
    return new Promise(naga);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global fetch */

var _provider = __webpack_require__(2);

var _provider2 = _interopRequireDefault(_provider);

var _Data = __webpack_require__(12);

var _Data2 = _interopRequireDefault(_Data);

var _Repo = __webpack_require__(13);

var _Repo2 = _interopRequireDefault(_Repo);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

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

function verifyCanStore(data, testName, testContent) {

    return data.save(testName, testContent).then(function () {
        return data.load(testName);
    }).then(function (content) {
        return sameJSON(testContent, content);
    });
}

function verifyDataCanList(data, testName) {

    var listTestName = testName + "__list";
    var listTestNames = postfix(listTestName, [1, 2, 3]);
    return data.list(listTestName).then(function (listing) {
        return Promise.all(listing.map(function (x) {
            return data.permDelete(x);
        }));
    }).then(function () {
        return Promise.all(listTestNames.map(function (x) {
            return data.save(x);
        }));
    }).then(function () {
        return data.list(listTestName);
    }).then(function (listing) {
        return sameItems(listing, listTestNames);
    });
}

function verifyDataCanDelete(data, testName) {

    var deleteTestName = testName + "__delete";
    return data.save(deleteTestName, "stuff").then(function () {
        return data.permDelete(deleteTestName);
    }).then(function () {
        return data.load(deleteTestName);
    }).catch(function (err) {
        return Promise.resolve(err.code === 404);
    });
}

function deleteAll(data, testName) {

    return data.list(testName).then(function (listing) {
        return console.log("To delete", listing, testName) || Promise.all(listing.map(function (x) {
            return data.permDelete(x);
        }));
    });
}

function verifyData(data, testName, testContent) {

    testName += "__data";
    var result = { canList: undefined, canStore: undefined, canDelete: undefined, canGet: undefined };
    return verifyCanStore(data, testName, testContent).then(function (canStore) {

        result.canStore = result.canGet = canStore;
        if (!canStore) {
            return;
        }
        return Promise.all([verifyDataCanList(data, testName), verifyDataCanDelete(data, testName)]);
    }).then(function () {
        return result;
    });
}

function verifyRepo(repo, testName) {

    testName += "__repo";
    var result = { canListProjects: undefined };
    var testProjects = postfix(testName, [1, 2]);
    return Promise.all(testProjects.map(function (x) {
        return repo.trashProject(x);
    })).then(function () {
        return Promise.all(testProjects.map(function (x) {
            return repo.createProject(x);
        }));
    }).then(function () {
        return repo.listProjects();
    }).then(function (listing) {

        result.canListProjects = testProjects.every(function (testProject) {
            return ~listing.indexOf(testProject);
        });
    }).catch(function (ex) {
        result.ex = ex;
    }).then(function () {
        return result;
    });
}

function verifyStorage(data, repo, testName, testContent) {

    return Promise.all([verifyData(data, testName, testContent), verifyRepo(repo, testName)]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            dataResults = _ref2[0],
            repoResults = _ref2[1];

        deleteAll(data, testName).catch(function (err) {
            return console.error("Cleaning up after self test", err);
        });
        return { data: dataResults, repo: repoResults };
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
    console.log("Verify all storage...", owner);
    return Promise.all([buildData, buildRepo, fetchTestData]).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 3),
            data = _ref4[0],
            repo = _ref4[1],
            testData = _ref4[2];

        return verifyStorage(data, repo, testName, testData);
    }).then(function (verification) {
        return storageVerifications.set(owner, verification);
    }).then(function () {

        console.log("Verify all storage complete", owner);
        return storageVerifications.get(owner);
    });
}

function verifyAllStorage(owner) {

    return owner.waitForLoad().then(function () {
        return storageVerifications.get(owner) || storageVerifications.set(owner, initStorageVerifications(owner)).get(owner);
    });
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
            return verifyAllStorage(this).then(function (_ref5) {
                var data = _ref5.data;
                return !!data.canList;
            });
        }
    }, {
        key: "verifyStore",
        value: function verifyStore() {
            return verifyAllStorage(this).then(function (_ref6) {
                var data = _ref6.data;
                return !!data.canStore;
            });
        }
    }, {
        key: "verifyGet",
        value: function verifyGet() {
            return verifyAllStorage(this).then(function (_ref7) {
                var data = _ref7.data;
                return !!data.canGet;
            });
        }
    }, {
        key: "verifyDelete",
        value: function verifyDelete() {
            return verifyAllStorage(this).then(function (_ref8) {
                var data = _ref8.data;
                return !!data.canDelete;
            });
        }
    }, {
        key: "verifyProjects",
        value: function verifyProjects() {
            return verifyAllStorage(this).then(function (_ref9) {
                var repo = _ref9.repo;
                return console.log(repo) || !!repo.canListProjects;
            });
        }
    }]);

    return GoogleCapabilities;
}(_provider2.default);

exports.default = new GoogleCapabilities();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global gapi */
var filesAPI = "https://www.googleapis.com/drive/v3/files";
var uploadAPI = "https://content.googleapis.com/upload/drive/v3/files";
var folderMimeType = "application/vnd.google-apps.folder";
var boundary = "......";
var multiPartMimeType = "multipart/related; boundary=" + boundary;
var dataMimeType = "application/json";
var JSONcontentType = "application/json; charset=UTF-8";

var encodeName = window.z1 = function (name) {
    return name.replace(/[-\!\~\*\'\(\)]/g, function (x) {
        return "%" + x.charCodeAt(0).toString(16).toUpperCase();
    });
};
var decodeName = window.z2 = function (name) {
    return name.replace(/%(..)/g, function (_, code) {
        return String.fromCharCode(Number.parseInt(code, 16));
    });
};

var FileSpec = function () {
    function FileSpec(_ref) {
        var id = _ref.id,
            name = _ref.name;

        _classCallCheck(this, FileSpec);

        this.id = id;
        this.name = decodeName(name);
    }

    _createClass(FileSpec, null, [{
        key: "build",
        value: function build(thing) {

            return new FileSpec(thing);
        }
    }]);

    return FileSpec;
}();

function request(options) {

    options = Object.assign({ method: "GET", path: filesAPI }, options);
    console.log("request:", options);
    return new Promise(function (resolve, reject) {
        return gapi.client.request(options).then(resolve, reject);
    });
}

function createFolder(name) {

    var mimeType = folderMimeType;
    var body = { name: name, mimeType: mimeType };
    var method = "POST";
    return request({ method: method, body: body });
}

function ensureFolder(name) {

    var q = "name='" + name + "' and mimeType='" + folderMimeType + "' and trashed=false";
    var params = { q: q };
    return request({ params: params }).then(function (res) {
        return res.result.files;
    }).then(function (files) {
        return files.length ? files[0] : null;
    }).then(function (maybeFolder) {
        return maybeFolder || createFolder(name);
    }).then(FileSpec.build);
}

function listFilesInFolder(folder, maybePrefix) {

    maybePrefix = maybePrefix ? encodeName(maybePrefix) : maybePrefix;
    var q = "mimeType='" + dataMimeType + "' and trashed=false";
    var nameFilter = function nameFilter(x) {
        return true;
    };
    if (maybePrefix) {

        var prefix = maybePrefix.length > 20 ? maybePrefix.substring(0, 20) : maybePrefix;
        nameFilter = maybePrefix.length > 20 ? function (x) {
            return x.name.indexOf(maybePrefix) === 0;
        } : nameFilter;
        q = "name contains '" + prefix + "' and " + q;
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
    var name = encodeName(maybeSpec);

    var _ref2 = folder || {},
        id = _ref2.id;

    var q = "name='" + name + "' and '" + id + "' in parents and mimeType='" + dataMimeType + "' and trashed=false";
    var params = { q: q };
    return request({ params: params }).then(function (res) {
        return res.result.files;
    }).then(function (files) {
        return files.length ? FileSpec.build(files[0]) : null;
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

    name = encodeName(name);
    var method = "POST";
    var headers = { "Content-Type": multiPartMimeType };
    var params = { "uploadType": "multipart" };
    var metadata = { parents: [folder.id], name: name };
    var body = multipart(JSONpart(metadata), JSONpart(data));
    var path = uploadAPI;
    return request({ path: path, method: method, params: params, headers: headers, body: body });
}

function updateInFolder(folder, file, data) {

    var method = "PATCH";
    var params = { "uploadType": "media" };
    var mimeType = dataMimeType;
    var body = JSON.stringify(data);
    var path = uploadAPI + "/" + file.id;
    return request({ path: path, method: method, params: params, mimeType: mimeType, body: body });
}

function saveInFolder(folder, name, data) {

    return findFileInFolder(folder, name).then(function (maybeFile) {
        return maybeFile ? updateInFolder(folder, maybeFile, data) : createInFolder(folder, name, data);
    }).then(function (res) {
        return FileSpec.build(res.result);
    });
}

function loadFromFolder(folder, name) {

    return findFileInFolder(folder, name).then(function (maybeFile) {
        return maybeFile ? maybeFile : Promise.reject({ code: 404 });
    }).then(function (file) {

        var path = filesAPI + "/" + file.id;
        var params = { alt: "media" };
        return request({ path: path, params: params });
    }).then(function (res) {
        return res.result;
    });
}

function deleteFromFolder(folder, maybeSpec) {

    return findFileInFolder(folder, maybeSpec).then(function (file) {

        var path = filesAPI + "/" + file.id;
        var method = "DELETE";
        return request({ method: method, path: path });
    }).catch(function (err) {
        return err.code === 404 ? Promise.resolve({ code: 404 }) : Promise.reject(err);
    });
}

function cleanUpError(err) {

    if (err.code) {
        return Promise.reject(err);
    }
    if (err.result) {

        return Promise.reject("WTF am i supposed to do with this? " + JSON.stringify(err.result, null, 3));
    } else {

        console.error(err);
        return Promise.reject({
            code: err.status || 500,
            message: err.body || err.statusText || "Unknown error",
            err: err
        });
    }
}

var Data = function () {
    _createClass(Data, null, [{
        key: "inFolder",


        // builds a Data repository for the named folder
        // if the folder doesn't already exist, creates it
        value: function inFolder(folderName) {

            return Promise.resolve().then(function () {
                return ensureFolder(folderName);
            }).then(function (folderSpec) {
                return new Data(folderSpec);
            });
        }

        // make a Data repository for files stored in the specified folder

    }]);

    function Data(folderSpec) {
        _classCallCheck(this, Data);

        this.folder = folderSpec;
    }

    // returns a list of all data files in this folder (JSON files)
    // if maybePrefix is specified, only files with the specified prefix are returned


    _createClass(Data, [{
        key: "list",
        value: function list(maybePrefix) {

            return listFilesInFolder(this.folder, maybePrefix).catch(cleanUpError);
        }

        // saves the specified data in a data file with the specified name

    }, {
        key: "save",
        value: function save(name, data) {

            return saveInFolder(this.folder, name, data).catch(cleanUpError);
        }

        // retrieves the specified data in a data file with the specified name

    }, {
        key: "load",
        value: function load(name) {

            return loadFromFolder(this.folder, name).catch(cleanUpError);
        }

        // deletes the data file with the specified name
        // if the data file is already gone, resolves with { code: 404 }

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repo = function () {
    function Repo(data) {
        _classCallCheck(this, Repo);

        this.data = data;
    }

    _createClass(Repo, [{
        key: "createProject",
        value: function createProject(name) {

            var project = [];
            console.log("Creating", name);
            return this.data.save(name + "_project.json", project, { overwrite: false });
        }
    }, {
        key: "trashProject",
        value: function trashProject(name) {}
    }, {
        key: "listProjects",
        value: function listProjects() {

            return this.data.list().then(function (something) {

                console.log("Something", something);
            });
        }
    }]);

    return Repo;
}();

exports.default = Repo;

/***/ })
/******/ ]);