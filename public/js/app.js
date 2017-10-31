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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _identity = __webpack_require__(1);

var _identity2 = _interopRequireDefault(_identity);

var _identity3 = __webpack_require__(4);

var _identity4 = _interopRequireDefault(_identity3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("locate-services", function (e) {

    e.detail(null, {

        identity: (0, _identity2.default)([_identity4.default])

    });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = factory;

var _tinyEmitter = __webpack_require__(2);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _localStore = __webpack_require__(3);

var _localStore2 = _interopRequireDefault(_localStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var functions = ["on", "current", "authorize", "deauthorize"];

function factory(providers) {

    providers.forEach(function (p) {
        return p.verifyInterface(functions);
    });
    return new service(providers);
}

var chosenKey = "chosen-identity-provider";
var state = { providers: new WeakMap() };

function findProvider(owner) {

    var chosen = _localStore2.default.getItem(chosenKey);
    owner.provider = state.providers.get(owner).find(function (x) {
        return x.key === chosen;
    });
}

var service = function (_EventEmitter) {
    _inherits(service, _EventEmitter);

    function service(providers) {
        _classCallCheck(this, service);

        var _this = _possibleConstructorReturn(this, (service.__proto__ || Object.getPrototypeOf(service)).call(this));

        state.providers.set(_this, providers);
        findProvider(_this);

        return _this;
    }

    _createClass(service, [{
        key: "providers",
        value: function providers() {

            var asDescription = function asDescription(_ref) {
                var key = _ref.key,
                    description = _ref.description;
                return { key: key, description: description };
            };
            return (state.providers.get(this) || []).map(asDescription);
        }
    }, {
        key: "select",
        value: function select(provider) {

            _localStore2.default.setItem(chosenKey, provider.key);
            findProvider(this);
            return this.current();
        }
    }, {
        key: "deselect",
        value: function deselect() {

            _localStore2.default.removeItem(chosenKey);
            findProvider(this);
            return this.current();
        }
    }, {
        key: "current",
        value: function current() {

            if (!this.provider) return Promise.reject(new Error("No provider selected"));
            return this.provider.current();
        }
    }, {
        key: "signIn",
        value: function signIn() {

            if (!this.provider) return this.current();
            var continuation = this.current.bind(this);
            return this.provider.authorize().then(continuation);
        }
    }, {
        key: "signOut",
        value: function signOut() {

            if (!this.provider) return;
            var continuation = this.current.bind(this);
            return this.provider.deauthorize().then(continuation);
        }
    }]);

    return service;
}(_tinyEmitter2.default);

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
exports.default = window.localStorage;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provider = __webpack_require__(5);

var _provider2 = _interopRequireDefault(_provider);

var _config = __webpack_require__(7);

var _config2 = _interopRequireDefault(_config);

var _shared = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global gapi */

var loadFlag = false;
var loadError = void 0;

window.handleGAPILoad = function () {
    return (0, _shared.init)(_config2.default.gapi).then(function () {
        loadFlag = true;
    }).catch(function (ex) {
        loadError = ex;
    });
};

function buildIdentity(provider) {

    var auth = gapi.auth2.getAuthInstance();
    var signedIn = auth.isSignedIn.get();
    var profile = signedIn ? auth.currentUser.get().getBasicProfile() : {};
    var name = signedIn && profile ? profile.getName() : undefined;
    var userId = signedIn && profile ? profile.getEmail() : undefined;
    var loaded = loadFlag;
    return { provider: provider, loaded: loaded, loadError: loadError, signedIn: signedIn, userId: userId, name: name };
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

        return _possibleConstructorReturn(this, (GoogleIdentity.__proto__ || Object.getPrototypeOf(GoogleIdentity)).call(this));
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _providerBase = __webpack_require__(6);

var _providerBase2 = _interopRequireDefault(_providerBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Provider = function (_ProviderBase) {
    _inherits(Provider, _ProviderBase);

    function Provider() {
        _classCallCheck(this, Provider);

        return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, "gapi", "Your Google identity (e.g. gmail)"));
    }

    return Provider;
}(_providerBase2.default);

exports.default = Provider;
;

/***/ }),
/* 6 */
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
    }]);

    return Provider;
}(_tinyEmitter2.default);

exports.default = Provider;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = window["sleeper-service-config"];

/***/ }),
/* 8 */
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

/***/ })
/******/ ]);