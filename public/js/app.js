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

console.log("registering google-api-loaded listener");

document.addEventListener("google-api-loaded", function handleAPILoaded() {

    console.log("Google API loaded event");
    (0, _shared.init)(_config2.default.gapi).then(function () {
        loadFlag = true;
    }).catch(function (ex) {
        loadError = ex;
    });
});

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

var requiredFunctions = ["clear", "verifyList", "verifyStore", "verifyGet", "verifyDelete"];
var chosenKey = "chosen-capabilities-provider";

var CapabilitiesService = function (_Service) {
    _inherits(CapabilitiesService, _Service);

    function CapabilitiesService(providers) {
        _classCallCheck(this, CapabilitiesService);

        return _possibleConstructorReturn(this, (CapabilitiesService.__proto__ || Object.getPrototypeOf(CapabilitiesService)).call(this, providers, chosenKey, requiredFunctions));
    }

    _createClass(CapabilitiesService, [{
        key: "verifyStorage",
        value: function verifyStorage() {

            return this.ensureProvider().then(function (p) {
                return p.clear();
            }).then(function (p) {
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

var _provider = __webpack_require__(2);

var _provider2 = _interopRequireDefault(_provider);

var _files = __webpack_require__(12);

var _files2 = _interopRequireDefault(_files);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appName = _config2.default.appName;

var verifications = new WeakMap();
var drive = new _files2.default();

function initVerification(owner) {

    var canList = false;
    var canStore = false;
    var canDelete = false;
    var canGet = false;
    var testName = "__temp_" + Date.now() + "_" + Math.floor(Math.random() * Date.now());
    console.log(testName);
    var isTestFile = function isTestFile(f) {
        return f.name === testName;
    };
    return drive.ensureFolder(appName).then(function (folder) {
        return drive.ensureFileInFolder(folder, testName).then(function () {
            canStore = true;
        }).then(function () {
            return drive.listFiles(folder);
        }).then(function (list) {
            canList = !!list.find(isTestFile);
        }).then(function () {
            return drive.findSheet(folder, testName);
        }).then(function () {
            canGet = true;
        }).then(function () {
            return drive.deleteFile(folder, testName);
        }).then(function () {
            return drive.listFiles(folder);
        }).then(function (list) {
            canDelete = !list.find(isTestFile);
        });
    }).then(function () {
        return verifications.set(owner, { canList: canList, canStore: canStore, canDelete: canDelete, canGet: canGet }).get(owner);
    });
}

function verifyAll(owner) {

    return Promise.resolve().then(function () {
        return verifications.get(owner) || verifications.set(owner, initVerification(owner)).get(owner);
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
            var _this2 = this;

            return Promise.resolve().then(function () {
                return verifications.delete(_this2);
            }).then(function () {
                return _this2;
            });
        }
    }, {
        key: "verifyList",
        value: function verifyList() {
            return verifyAll(this).then(function (v) {
                return v && v.canList;
            });
        }
    }, {
        key: "verifyStore",
        value: function verifyStore() {
            return verifyAll(this).then(function (v) {
                return v && v.canStore;
            });
        }
    }, {
        key: "verifyGet",
        value: function verifyGet() {
            return verifyAll(this).then(function (v) {
                return v && v.canGet;
            });
        }
    }, {
        key: "verifyDelete",
        value: function verifyDelete() {
            return verifyAll(this).then(function (v) {
                return v && v.canDelete;
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*global gapi*/

var _sheet = __webpack_require__(13);

var _sheet2 = _interopRequireDefault(_sheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var filesAPI = "https://www.googleapis.com/drive/v3/files";
var folderMime = "application/vnd.google-apps.folder";
var sheetsAPI = "https://sheets.googleapis.com/v4/spreadsheets";
var sheetMime = "application/vnd.google-apps.spreadsheet";

var asFileSpec = function asFileSpec(_ref) {
    var id = _ref.id,
        name = _ref.name;
    return { id: id, name: name };
};
var asFailSpec = function asFailSpec(code, message, isLogical) {
    return { code: code, message: message, isLogical: isLogical };
};
var notAFolder = function notAFolder(_ref2) {
    var mimeType = _ref2.mimeType;
    return mimeType !== folderMime;
};

function query(o) {

    return [o.name ? "name='" + o.name + "'" : null, o.mime ? "mimeType='" + o.mime + "'" : null, o.parent ? "'" + o.parent + "' in parents" : null, "trashed = false"].filter(function (x) {
        return x;
    }).join(" and ");
}

function request(params, body, method, path) {

    method = method || (body ? "POST" : "GET");
    var options = { path: path, params: params, method: method, body: body };
    console.log(options);
    return new Promise(function (resolve, reject) {
        return gapi.client.request(options).then(resolve, reject);
    });
}

function requestSheets(params, body, method, path) {

    path = path ? "" + sheetsAPI + path : sheetsAPI;
    return request(params, body, method, path);
}

function requestFiles(params, body, method, path) {

    path = path ? "" + filesAPI + path : filesAPI;
    return request(params, body, method, path);
}

function listSheets(containingFolderId) {

    var q = query({ mime: sheetMime, parent: containingFolderId });
    return requestFiles({ q: q });
}

function rejectOperation(res) {

    return asFailSpec(res.result.error);
}

function resolveList(res) {

    return res.result.files.map(asFileSpec);
}

function resolveListSingle(filter, res) {

    if (!res) {

        if (typeof filter === "function") {

            return function (deferredRes) {
                return resolveListSingle(filter, deferredRes);
            };
        }
        // no filter used
        res = filter;
        filter = undefined;
    }

    return new Promise(function (resolve, reject) {
        var _res = res,
            result = _res.result;
        var files = result.files;

        if (files && files.length && filter) {

            files = files.filter(filter);
        }
        return files.length < 1 ? reject(asFailSpec(404, "Not found", true)) : resolve(asFileSpec(files[0]));
    });
}

/* find */
function findItem(name, mime, parent) {

    var q = query({ name: name, mime: mime, parent: parent });
    return requestFiles({ q: q });
}
findItem.folder = function (name) {
    return findItem(name, folderMime);
};
findItem.sheet = {

    inFolder: function inFolder(_ref3) {
        var id = _ref3.id;
        return function (name) {
            return findItem(name, undefined, [id]);
        };
    }

};

/* create */
function createItem(name, mimeType, parents) {

    var body = { name: name, mimeType: mimeType, parents: parents };
    return requestFiles(null, body).then(function (res) {
        return asFileSpec(res.result);
    });
}
createItem.folder = function (name) {
    return createItem(name, folderMime);
};
createItem.sheet = {

    inFolder: function inFolder(_ref4) {
        var id = _ref4.id;
        return function (name) {
            return createItem(name, sheetMime, [id]);
        };
    }

};
createItem.ifMissing = function (name, strategy) {
    return function (err) {
        return err.isLogical ? strategy(name) : Promise.reject(err);
    };
};

/* delete */
function deleteItem(_ref5) {
    var id = _ref5.id;


    return requestFiles(null, null, "DELETE", "/" + id);
}

function getData(_ref6) {
    var id = _ref6.id;


    console.log(id);
}

var GoogleDrive = function () {
    function GoogleDrive() {
        _classCallCheck(this, GoogleDrive);
    }

    _createClass(GoogleDrive, [{
        key: "listFiles",
        value: function listFiles(folderSpec) {

            return listSheets(folderSpec.id).then(resolveList).catch(rejectOperation);
        }
    }, {
        key: "findSheet",
        value: function findSheet(folderSpec, name) {

            return findItem.sheet.inFolder(folderSpec)(name).then(function (res) {
                return resolveListSingle(res);
            }).then(function (item) {
                return new _sheet2.default(item);
            }).catch(rejectOperation);
        }
    }, {
        key: "deleteFile",
        value: function deleteFile(folderSpec, name) {

            return findItem.sheet.inFolder(folderSpec)(name).catch(function (err) {
                return err.isLogical ? null : Promise.reject(err);
            }).then(function (res) {
                return res ? resolveListSingle(res) : null;
            }).then(function (item) {
                return item ? deleteItem(item) : null;
            }).catch(rejectOperation);
        }
    }, {
        key: "ensureFileInFolder",
        value: function ensureFileInFolder(folderSpec, name) {

            var createItemInFolder = createItem.sheet.inFolder(folderSpec);
            var maybeCreate = createItem.ifMissing(name, createItemInFolder);
            return findItem.sheet.inFolder(folderSpec)(name).then(resolveListSingle(notAFolder)).catch(maybeCreate).catch(rejectOperation);
        }
    }, {
        key: "ensureFolder",
        value: function ensureFolder(name) {

            var maybeCreate = createItem.ifMissing(name, createItem.folder);
            return findItem.folder(name).then(resolveListSingle).catch(maybeCreate).catch(rejectOperation);
        }
    }]);

    return GoogleDrive;
}();

exports.default = GoogleDrive;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _table = __webpack_require__(14);

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var files = new WeakMap();

var Sheet = function () {
    function Sheet(fileSpec) {
        _classCallCheck(this, Sheet);

        files.set(this, fileSpec);
    }

    _createClass(Sheet, [{
        key: "listTables",
        value: function listTables() {

            return Promise.reject("Not implenented");
        }
    }, {
        key: "deleteTable",
        value: function deleteTable(name) {

            return Promise.reject("Not implemented");
        }
    }, {
        key: "createTable",
        value: function createTable(name, schema) {

            return Promise.reject("Not imlemented");
        }
    }, {
        key: "findTable",
        value: function findTable(name) {

            console.log(name);
            return Promise.reject("Not implemented");
        }
    }]);

    return Sheet;
}();

exports.default = Sheet;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = function Table() {
    _classCallCheck(this, Table);
};

exports.default = Table;

/***/ })
/******/ ]);