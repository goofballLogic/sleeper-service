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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = __webpack_require__(3);

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
            this.provider = findProvider(this);
        }
    }, {
        key: "deselect",
        value: function deselect() {

            var chosenKey = chosenKeys.get(this);
            _localStore2.default.removeItem(chosenKey);
            this.provider = findProvider(this);
        }
    }]);

    return Service;
}(_tinyEmitter2.default);

exports.default = Service;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _providerBase = __webpack_require__(11);

var _providerBase2 = _interopRequireDefault(_providerBase);

var _config = __webpack_require__(4);

var _config2 = _interopRequireDefault(_config);

var _shared = __webpack_require__(12);

var _diagnostics = __webpack_require__(2);

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
/* 2 */
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
/* 3 */
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

var _projects = __webpack_require__(9);

var _projects2 = _interopRequireDefault(_projects);

var _GoogleIdentity = __webpack_require__(19);

var _GoogleIdentity2 = _interopRequireDefault(_GoogleIdentity);

var _GoogleCapabilities = __webpack_require__(20);

var _GoogleCapabilities2 = _interopRequireDefault(_GoogleCapabilities);

var _GoogleProjects = __webpack_require__(21);

var _GoogleProjects2 = _interopRequireDefault(_GoogleProjects);

var _selfTest = __webpack_require__(18);

var _selfTest2 = _interopRequireDefault(_selfTest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof document === "undefined") throw new Error("document is not defined"); /* global document */

document.addEventListener("locate-services", function (e) {

    e.detail(null, {

        identity: new _identity2.default([_GoogleIdentity2.default]),
        capabilities: new _capabilities2.default([_GoogleCapabilities2.default]),
        projects: new _projects2.default([_GoogleProjects2.default])

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

var _service = __webpack_require__(0);

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var provider, _ref2, _ref3, canList, canStore, canGet, canDelete;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.ensureProvider();

                            case 2:
                                provider = _context.sent;
                                _context.next = 5;
                                return Promise.all([provider.verifyList(), provider.verifyStore(), provider.verifyGet(), provider.verifyDelete()]);

                            case 5:
                                _ref2 = _context.sent;
                                _ref3 = _slicedToArray(_ref2, 4);
                                canList = _ref3[0];
                                canStore = _ref3[1];
                                canGet = _ref3[2];
                                canDelete = _ref3[3];
                                return _context.abrupt("return", {

                                    canList: canList,
                                    canStore: canStore,
                                    canGet: canGet,
                                    canDelete: canDelete

                                });

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function verifyStorage() {
                return _ref.apply(this, arguments);
            }

            return verifyStorage;
        }()
    }, {
        key: "verifyProjectRepo",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var provider, _ref5, canListProjects, canDeleteProjects, canCreateProjects, canLoadData, canSaveData, canDeleteData;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.ensureProvider();

                            case 2:
                                provider = _context2.sent;
                                _context2.next = 5;
                                return provider.verifyProjects();

                            case 5:
                                _ref5 = _context2.sent;
                                canListProjects = _ref5.canListProjects;
                                canDeleteProjects = _ref5.canDeleteProjects;
                                canCreateProjects = _ref5.canCreateProjects;
                                canLoadData = _ref5.canLoadData;
                                canSaveData = _ref5.canSaveData;
                                canDeleteData = _ref5.canDeleteData;
                                return _context2.abrupt("return", { canListProjects: canListProjects, canDeleteProjects: canDeleteProjects, canCreateProjects: canCreateProjects, canLoadData: canLoadData, canSaveData: canSaveData, canDeleteData: canDeleteData });

                            case 13:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function verifyProjectRepo() {
                return _ref4.apply(this, arguments);
            }

            return verifyProjectRepo;
        }()
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

var _service = __webpack_require__(0);

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var requiredFunctions = ["list", "build"];
var chosenKey = "chosen-projects-provider";

var ProjectsService = function (_Service) {
    _inherits(ProjectsService, _Service);

    function ProjectsService(providers) {
        _classCallCheck(this, ProjectsService);

        return _possibleConstructorReturn(this, (ProjectsService.__proto__ || Object.getPrototypeOf(ProjectsService)).call(this, providers, chosenKey, requiredFunctions));
    }

    _createClass(ProjectsService, [{
        key: "list",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.ensureProvider();

                            case 2:
                                return _context.abrupt("return", _context.sent.list());

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function list() {
                return _ref.apply(this, arguments);
            }

            return list;
        }()
    }, {
        key: "build",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.ensureProvider();

                            case 2:
                                _context2.t0 = name;
                                return _context2.abrupt("return", _context2.sent.build(_context2.t0));

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function build(_x) {
                return _ref2.apply(this, arguments);
            }

            return build;
        }()
    }]);

    return ProjectsService;
}(_service2.default);

exports.default = ProjectsService;

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = __webpack_require__(3);

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
/* 12 */
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
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global gapi */

var _diagnostics = __webpack_require__(2);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
     * @return {Promise<void>} Promise of saved project
     */


    _createClass(Repo, [{
        key: "saveProject",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, metadata) {
                var _this = this;

                var segments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                var removedSegments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
                var index, project, segmentSaves, segmentDeletes;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                index = Object.keys(segments).reduce(function (acc, key) {
                                    return Object.assign(acc, _defineProperty({}, key, asSegmentFilename(name, key)));
                                }, {});
                                project = { index: index, metadata: metadata };
                                _context.next = 4;
                                return this.data.save(filename(name), project, { overwrite: true });

                            case 4:
                                segmentSaves = Object.keys(index).map(function (name) {
                                    return _this.data.save(index[name], segments[name], { overwrite: true });
                                });
                                _context.next = 7;
                                return Promise.all(segmentSaves);

                            case 7:
                                console.log("removed", removedSegments);
                                segmentDeletes = removedSegments.map(function (key) {
                                    return _this.data.permDelete(asSegmentFilename(name, key));
                                });
                                _context.next = 11;
                                return Promise.all(segmentDeletes);

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function saveProject(_x3, _x4) {
                return _ref.apply(this, arguments);
            }

            return saveProject;
        }()

        /**
         * Load a project with the specified name
         * @param {string} name of the project
         * @return {object} Promise of project { {object} metadata, {array} segments }
         */

    }, {
        key: "loadProject",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name) {
                var _this2 = this;

                var _ref3, metadata, index, segmentLoads, loaded, segments;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.load(filename(name));

                            case 2:
                                _ref3 = _context2.sent;
                                metadata = _ref3.metadata;
                                index = _ref3.index;
                                segmentLoads = Object.keys(index).map(function (name) {
                                    return _this2.data.load(index[name]);
                                });
                                _context2.next = 8;
                                return Promise.all(segmentLoads);

                            case 8:
                                loaded = _context2.sent;
                                segments = Object.keys(index).reduce(function (acc, name, i) {
                                    return _extends({}, acc, _defineProperty({}, name, loaded[i]));
                                }, {});
                                return _context2.abrupt("return", { metadata: metadata || {}, segments: segments });

                            case 11:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function loadProject(_x5) {
                return _ref2.apply(this, arguments);
            }

            return loadProject;
        }()

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
                return listing.map(function (_ref4) {
                    var name = _ref4.name;
                    return filenamePattern.exec(name);
                }).filter(function (x) {
                    return x;
                }).map(function (_ref5) {
                    var _ref6 = _slicedToArray(_ref5, 2),
                        name = _ref6[1];

                    return name;
                });
            });
        }
    }]);

    return Repo;
}();

exports.default = Repo;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var repos = new WeakMap();
var segmentsForProject = new WeakMap();
var removedSegmentsForProject = new WeakMap();

var clone = function clone(x) {
    return typeof x === "undefined" ? undefined : JSON.parse(JSON.stringify(x));
};

var Project = function () {
    function Project(name, repo) {
        _classCallCheck(this, Project);

        this.name = name;
        repos.set(this, repo);
        segmentsForProject.set(this, {});
        removedSegmentsForProject.set(this, []);
    }

    _createClass(Project, [{
        key: "deleteSelf",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var repo, segments, name, _ref2, _segments;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                repo = repos.get(this);
                                segments = segmentsForProject.get(this);
                                name = this.name;
                                _context.prev = 3;
                                _context.next = 6;
                                return repo.loadProject(name);

                            case 6:
                                _ref2 = _context.sent;
                                _segments = _ref2.segments;
                                return _context.abrupt("return", repo.deleteProject(name, _segments));

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context["catch"](3);

                                if (!(_context.t0.code !== 404)) {
                                    _context.next = 15;
                                    break;
                                }

                                throw _context.t0;

                            case 15:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[3, 11]]);
            }));

            function deleteSelf() {
                return _ref.apply(this, arguments);
            }

            return deleteSelf;
        }()
    }, {
        key: "removeSegment",
        value: function removeSegment(name) {

            var segments = segmentsForProject.get(this);

            if (name in segments) {

                console.log("Removing", name);
                var removedSegments = removedSegmentsForProject.get(this);
                removedSegments.push(name);
                delete segments[name];
            }
        }
    }, {
        key: "segment",
        value: function segment(name, maybeData) {

            var segments = segmentsForProject.get(this);
            if (typeof maybeData !== "undefined") {

                segments[name] = clone(maybeData);
            } else {

                return clone(segments[name]);
            }
        }
    }, {
        key: "save",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var repo, segments, removedSegments, metadata;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                repo = repos.get(this);
                                segments = segmentsForProject.get(this);
                                removedSegments = removedSegmentsForProject.get(this);
                                metadata = { saved: Date.now() };
                                _context2.next = 6;
                                return repo.saveProject(this.name, metadata, clone(segments), clone(removedSegments));

                            case 6:
                                removedSegmentsForProject.set(this, []);

                            case 7:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function save() {
                return _ref3.apply(this, arguments);
            }

            return save;
        }()
    }, {
        key: "load",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var repo, _ref5, segments;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                repo = repos.get(this);
                                _context3.next = 3;
                                return repo.loadProject(this.name);

                            case 3:
                                _ref5 = _context3.sent;
                                segments = _ref5.segments;

                                segmentsForProject.set(this, clone(segments));

                            case 6:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function load() {
                return _ref4.apply(this, arguments);
            }

            return load;
        }()
    }]);

    return Project;
}();

exports.default = Project;

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/* global document, CustomEvent, window */
/* eslint-disable no-console */

var testServices = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e, services) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        services.capabilities.verifyProjectRepo().then(console.log.bind(console));
                        window.x = services;
                        _context.next = 4;
                        return services.projects.build("test");

                    case 4:
                        window.testProject = _context.sent;

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function testServices(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = test;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function test() {

    document.dispatchEvent(new CustomEvent("locate-services", { detail: testServices }));
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provider = __webpack_require__(1);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* global fetch */

var verifyProjectsOperations = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var repoTestName, result, buildTestProjects, testProjects, recreateTestProjects, listing, newListing, remoaner, remoaner2;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        repoTestName = testName + "__repo";
                        result = {

                            canListProjects: undefined,
                            canCreateProjects: undefined,
                            canDeleteProjects: undefined,
                            canSaveData: undefined,
                            canLoadData: undefined,
                            canDeleteData: undefined

                        };
                        buildTestProjects = suffix(repoTestName, [1, 2]).map(function (x) {
                            return _GoogleProjects2.default.build(x);
                        });
                        _context.next = 5;
                        return Promise.all(buildTestProjects);

                    case 5:
                        testProjects = _context.sent;
                        recreateTestProjects = testProjects.map(function (x) {
                            return x.deleteSelf().then(function () {
                                return x.save();
                            });
                        });
                        _context.prev = 7;
                        _context.next = 10;
                        return Promise.all(recreateTestProjects);

                    case 10:

                        // check the listing shows the projects
                        result.canListProjects = false;
                        _context.next = 13;
                        return _GoogleProjects2.default.list();

                    case 13:
                        listing = _context.sent;

                        result.canListProjects = testProjects.every(function (p) {
                            return ~listing.indexOf(p.name);
                        });

                        if (result.canListProjects) {
                            _context.next = 17;
                            break;
                        }

                        throw new Error("Can't list/create projects");

                    case 17:
                        result.canCreateProjects = true;

                        // delete one of them and check it's gone
                        _context.next = 20;
                        return testProjects[0].deleteSelf();

                    case 20:
                        _context.next = 22;
                        return _GoogleProjects2.default.list();

                    case 22:
                        newListing = _context.sent;

                        result.canDeleteProjects = !~newListing.indexOf(testProjects[0].name);

                        if (result.canDeleteProjects) {
                            _context.next = 26;
                            break;
                        }

                        throw new Error("Can't delete projects");

                    case 26:

                        // add a segment to the remaining one
                        remoaner = testProjects[1];

                        remoaner.segment("eu", { "sentiment": "bye-bye" });
                        remoaner.segment("uk", { "sentiment": "hmmmm" });
                        remoaner.segment("world", { "sentiment": "hello" });
                        remoaner.removeSegment("world");
                        result.canSaveData = false;
                        _context.next = 34;
                        return remoaner.save();

                    case 34:
                        result.canSaveData = undefined;

                        // build and load a duplicate project
                        _context.next = 37;
                        return _GoogleProjects2.default.build(remoaner.name);

                    case 37:
                        remoaner2 = _context.sent;

                        result.canLoadData = false;
                        _context.next = 41;
                        return remoaner2.load();

                    case 41:
                        result.canLoadData = undefined;
                        result.canLoadData = typeof remoaner2.segment("world") === "undefined" && equalsJSON(remoaner2.segment("uk"), remoaner.segment("uk")) && equalsJSON(remoaner2.segment("eu"), remoaner.segment("eu"));
                        result.canSaveData = result.canLoadData;

                        if (result.canSaveData) {
                            _context.next = 46;
                            break;
                        }

                        throw new Error("Save and/or Load data didn't work");

                    case 46:

                        // delete one of the segments, save, then reload the original project
                        result.canDeleteData = false;
                        remoaner2.removeSegment("uk");
                        remoaner2.removeSegment("eu");
                        remoaner2.segment("eu", { "sentiment": "hello again!" });
                        _context.next = 52;
                        return remoaner2.save();

                    case 52:
                        _context.next = 54;
                        return remoaner.load();

                    case 54:
                        result.canDeleteData = typeof remoaner.segment("uk") === "undefined" && equalsJSON(remoaner.segment("eu"), remoaner2.segment("eu"));

                        if (result.canDeleteData) {
                            _context.next = 57;
                            break;
                        }

                        throw new Error("Delete data didn't work");

                    case 57:
                        _context.next = 63;
                        break;

                    case 59:
                        _context.prev = 59;
                        _context.t0 = _context["catch"](7);


                        (0, _diagnostics.logError)(_context.t0);
                        result.ex = _context.t0;

                    case 63:
                        return _context.abrupt("return", result);

                    case 64:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[7, 59]]);
    }));

    return function verifyProjectsOperations() {
        return _ref3.apply(this, arguments);
    };
}();

var cleanupTestStorage = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data, testName) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return deleteAll(data, testName);

                    case 3:
                        _context2.next = 8;
                        break;

                    case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2["catch"](0);


                        (0, _diagnostics.logError)("Cleaning up after self test", _context2.t0);

                    case 8:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 5]]);
    }));

    return function cleanupTestStorage(_x, _x2) {
        return _ref4.apply(this, arguments);
    };
}();

var _provider = __webpack_require__(1);

var _provider2 = _interopRequireDefault(_provider);

var _Data = __webpack_require__(14);

var _Data2 = _interopRequireDefault(_Data);

var _Repo = __webpack_require__(15);

var _Repo2 = _interopRequireDefault(_Repo);

var _config = __webpack_require__(4);

var _config2 = _interopRequireDefault(_config);

var _diagnostics = __webpack_require__(2);

var _Project = __webpack_require__(16);

var _Project2 = _interopRequireDefault(_Project);

var _GoogleProjects = __webpack_require__(21);

var _GoogleProjects2 = _interopRequireDefault(_GoogleProjects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var appName = _config2.default.appName;

var storageVerifications = new WeakMap();
var projectsVerifications = new WeakMap();
var cachedVerification = function cachedVerification(owner, verifications, verify) {
    return verifications.get(owner) || verifications.set(owner, verify()).get(owner);
};

var testName = "__test_" + appName;
var sameItems = function sameItems(as, bs) {
    return as.length === bs.length && as.every(function (x) {
        return ~bs.indexOf(x);
    });
};
var sameJSON = function sameJSON(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
};
var suffix = function suffix(x, suffixes) {
    return suffixes.map(function (p) {
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
    var listTestNames = suffix(listTestName, [1, 2, 3]);
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

var equalsJSON = function equalsJSON(x, y) {
    return JSON.stringify(x) === JSON.stringify(y);
};

;

var verifyStorage = function verifyStorage(owner) {
    return cachedVerification(owner, storageVerifications, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var data, testData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        data = void 0;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return owner.waitForLoad();

                    case 4:
                        _context3.next = 6;
                        return _Data2.default.inFolder(appName);

                    case 6:
                        data = _context3.sent;
                        _context3.next = 9;
                        return fetch("/public/data/notshaka.json").then(function (res) {
                            return res.json();
                        });

                    case 9:
                        testData = _context3.sent;
                        _context3.next = 12;
                        return verifyData(data, testName, testData).catch(_diagnostics.logError);

                    case 12:
                        return _context3.abrupt("return", _context3.sent);

                    case 13:
                        _context3.prev = 13;


                        (0, _diagnostics.log)("Verify all storage complete - cleaning up test storage");
                        _context3.next = 17;
                        return cleanupTestStorage(data, testName);

                    case 17:
                        return _context3.finish(13);

                    case 18:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1,, 13, 18]]);
    })));
};

var _verifyProjects = function _verifyProjects(owner) {
    return cachedVerification(owner, projectsVerifications, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        data = void 0;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return owner.waitForLoad();

                    case 4:
                        _context4.next = 6;
                        return _Data2.default.inFolder(appName);

                    case 6:
                        data = _context4.sent;
                        _context4.next = 9;
                        return verifyProjectsOperations(_GoogleProjects2.default, testName).catch(_diagnostics.logError);

                    case 9:
                        return _context4.abrupt("return", _context4.sent);

                    case 10:
                        _context4.prev = 10;


                        (0, _diagnostics.log)("Verify projects complete - cleaning up test storage", owner);
                        _context4.next = 14;
                        return cleanupTestStorage(data, testName);

                    case 14:
                        return _context4.finish(10);

                    case 15:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1,, 10, 15]]);
    })));
};

var GoogleCapabilities = function (_Provider) {
    _inherits(GoogleCapabilities, _Provider);

    function GoogleCapabilities() {
        _classCallCheck(this, GoogleCapabilities);

        return _possibleConstructorReturn(this, (GoogleCapabilities.__proto__ || Object.getPrototypeOf(GoogleCapabilities)).call(this, "Your Google Drive storage"));
    }

    _createClass(GoogleCapabilities, [{
        key: "clear",
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return storageVerifications.delete(this);

                            case 2:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function clear() {
                return _ref7.apply(this, arguments);
            }

            return clear;
        }()
    }, {
        key: "verifyList",
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _ref9, canList;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return verifyStorage(this);

                            case 2:
                                _ref9 = _context6.sent;
                                canList = _ref9.canList;
                                return _context6.abrupt("return", !!canList);

                            case 5:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function verifyList() {
                return _ref8.apply(this, arguments);
            }

            return verifyList;
        }()
    }, {
        key: "verifyStore",
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var _ref11, canStore;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return verifyStorage(this);

                            case 2:
                                _ref11 = _context7.sent;
                                canStore = _ref11.canStore;
                                return _context7.abrupt("return", !!canStore);

                            case 5:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function verifyStore() {
                return _ref10.apply(this, arguments);
            }

            return verifyStore;
        }()
    }, {
        key: "verifyGet",
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var _ref13, canGet;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return verifyStorage(this);

                            case 2:
                                _ref13 = _context8.sent;
                                canGet = _ref13.canGet;
                                return _context8.abrupt("return", !!canGet);

                            case 5:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function verifyGet() {
                return _ref12.apply(this, arguments);
            }

            return verifyGet;
        }()
    }, {
        key: "verifyDelete",
        value: function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var _ref15, canDelete;

                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return verifyStorage(this);

                            case 2:
                                _ref15 = _context9.sent;
                                canDelete = _ref15.canDelete;
                                return _context9.abrupt("return", !!canDelete);

                            case 5:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function verifyDelete() {
                return _ref14.apply(this, arguments);
            }

            return verifyDelete;
        }()
    }, {
        key: "verifyProjects",
        value: function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                var projects;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return _verifyProjects(this);

                            case 2:
                                projects = _context10.sent;
                                return _context10.abrupt("return", projects);

                            case 4:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function verifyProjects() {
                return _ref16.apply(this, arguments);
            }

            return verifyProjects;
        }()
    }]);

    return GoogleCapabilities;
}(_provider2.default);

exports.default = new GoogleCapabilities();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var initializeRepo = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _Data2.default.inFolder(appName);

                    case 2:
                        data = _context.sent;
                        return _context.abrupt("return", new _Repo2.default(data));

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function initializeRepo() {
        return _ref.apply(this, arguments);
    };
}();

var _provider = __webpack_require__(1);

var _provider2 = _interopRequireDefault(_provider);

var _config = __webpack_require__(4);

var _config2 = _interopRequireDefault(_config);

var _Data = __webpack_require__(14);

var _Data2 = _interopRequireDefault(_Data);

var _Repo = __webpack_require__(15);

var _Repo2 = _interopRequireDefault(_Repo);

var _Project = __webpack_require__(16);

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global gapi */

var appName = _config2.default.appName;

var GoogleProjects = function (_Provider) {
    _inherits(GoogleProjects, _Provider);

    function GoogleProjects() {
        _classCallCheck(this, GoogleProjects);

        var _this = _possibleConstructorReturn(this, (GoogleProjects.__proto__ || Object.getPrototypeOf(GoogleProjects)).call(this, "Projects based on google drive"));

        _this.repo = _this.waitForLoad().then(initializeRepo);

        return _this;
    }

    /**
     * @async
     * Returns a list of projects stored in google drive
     * @returns {Promise<Array>} list of project names
     */


    _createClass(GoogleProjects, [{
        key: "list",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var repo;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.repo;

                            case 2:
                                repo = _context2.sent;
                                return _context2.abrupt("return", repo.listProjects());

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function list() {
                return _ref2.apply(this, arguments);
            }

            return list;
        }()

        /**
         * Builds a project object
         * Note that this isn't necessarily loaded or saved yet
         */

    }, {
        key: "build",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name) {
                var repo;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.repo;

                            case 2:
                                repo = _context3.sent;
                                return _context3.abrupt("return", new _Project2.default(name, repo));

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function build(_x) {
                return _ref3.apply(this, arguments);
            }

            return build;
        }()
    }]);

    return GoogleProjects;
}(_provider2.default);

exports.default = new GoogleProjects();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2VjZTdjZmY3ZDlmYzE0MGRjMWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlcnZpY2VzL3NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RpYWdub3N0aWNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlcnZpY2VzL2lkZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9sb2NhbC1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvY2FwYWJpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcHJvdmlkZXItYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvc3RvcmUvRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9zdG9yZS9SZXBvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2RlbC9Qcm9qZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZWxmLXRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvR29vZ2xlSWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvR29vZ2xlQ2FwYWJpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL0dvb2dsZVByb2plY3RzLmpzIl0sIm5hbWVzIjpbInByb3ZpZGVycyIsIldlYWtNYXAiLCJjaG9zZW5LZXlzIiwiZmluZFByb3ZpZGVyIiwib3duZXIiLCJjaG9zZW5LZXkiLCJnZXQiLCJjaG9zZW4iLCJnZXRJdGVtIiwiZmluZCIsIngiLCJrZXkiLCJTZXJ2aWNlIiwiYXZhaWxhYmxlUHJvdmlkZXJzIiwicmVxdWlyZWRGdW5jdGlvbnMiLCJmb3JFYWNoIiwicCIsInZlcmlmeUludGVyZmFjZSIsInNldCIsInByb3ZpZGVyIiwibWFwIiwiZGVzY3JpYmUiLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJyZXNvbHZlIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJsb2FkRmxhZyIsImxvYWRFcnJvciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdhcGkiLCJ0aGVuIiwiY2F0Y2giLCJleCIsIndhaXRGb3IiLCJjb25kaXRpb24iLCJ0aW1lb3V0IiwiZGVzY3JpcHRpb24iLCJuZXdUaW1lb3V0Iiwic2V0VGltZW91dCIsIlByb3ZpZGVyIiwibG9hZGVkIiwidW5kZWZpbmVkIiwibG9nIiwiY29uc29sZSIsImJpbmQiLCJsb2dFcnJvciIsImVycm9yIiwiRSIsInByb3RvdHlwZSIsIm9uIiwibmFtZSIsImNhbGxiYWNrIiwiY3R4IiwiZSIsInB1c2giLCJmbiIsIm9uY2UiLCJzZWxmIiwibGlzdGVuZXIiLCJvZmYiLCJhcHBseSIsImFyZ3VtZW50cyIsIl8iLCJlbWl0IiwiZGF0YSIsInNsaWNlIiwiY2FsbCIsImV2dEFyciIsImkiLCJsZW4iLCJsZW5ndGgiLCJldnRzIiwibGl2ZUV2ZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3aW5kb3ciLCJkZXRhaWwiLCJpZGVudGl0eSIsImNhcGFiaWxpdGllcyIsInByb2plY3RzIiwiSWRlbnRpdHlTZXJ2aWNlIiwiZW5zdXJlUHJvdmlkZXIiLCJjdXJyZW50IiwiYXV0aG9yaXplIiwiZGVhdXRob3JpemUiLCJsb2NhbFN0b3JhZ2UiLCJDYXBhYmlsaXRpZXNTZXJ2aWNlIiwiY2xlYXIiLCJhbGwiLCJ2ZXJpZnlMaXN0IiwidmVyaWZ5U3RvcmUiLCJ2ZXJpZnlHZXQiLCJ2ZXJpZnlEZWxldGUiLCJjYW5MaXN0IiwiY2FuU3RvcmUiLCJjYW5HZXQiLCJjYW5EZWxldGUiLCJ2ZXJpZnlQcm9qZWN0cyIsImNhbkxpc3RQcm9qZWN0cyIsImNhbkRlbGV0ZVByb2plY3RzIiwiY2FuQ3JlYXRlUHJvamVjdHMiLCJjYW5Mb2FkRGF0YSIsImNhblNhdmVEYXRhIiwiY2FuRGVsZXRlRGF0YSIsIlByb2plY3RzU2VydmljZSIsImxpc3QiLCJidWlsZCIsImNvbnN0cnVjdG9yIiwiZnVuY3Rpb25zIiwiZnVuYyIsIm1heWJlRnVuY3Rpb24iLCJpbml0IiwiU0NPUEVTIiwiam9pbiIsImluaXRBdXRoQ2xpZW50IiwiY29uZmlnIiwib3B0aW9ucyIsImFwaUtleSIsIkFQSV9LRVkiLCJjbGllbnRJZCIsIkNMSUVOVF9JRCIsInNjb3BlIiwibG9hZCIsImNsaWVudCIsInRyeUluaXRBdXRoQ2xpZW50IiwibmFnYSIsImZpbGVzQVBJIiwidXBsb2FkQVBJIiwiZm9sZGVyTWltZVR5cGUiLCJib3VuZGFyeSIsIm11bHRpUGFydE1pbWVUeXBlIiwiZGF0YU1pbWVUeXBlIiwiSlNPTmNvbnRlbnRUeXBlIiwiRmlsZVNwZWMiLCJpZCIsInRoaW5nIiwiY291bnRlciIsInJlcXVlc3QiLCJkZWZhdWx0ZWRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwibWV0aG9kIiwicGF0aCIsImNyZWF0ZUZvbGRlciIsIm1pbWVUeXBlIiwiYm9keSIsImZpcnN0T3JOdWxsIiwidHJhbnNmb3JtIiwiZW5zdXJlRm9sZGVyIiwicSIsInBhcmFtcyIsInJlcyIsInJlc3VsdCIsImZpbGVzIiwibWF5YmVGb2xkZXIiLCJkdW1iRG93blByZWZpeCIsInByZWZpeCIsInJldCIsImRhc2hJbmRleCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsaXN0RmlsZXNJbkZvbGRlciIsImZvbGRlciIsIm1heWJlUHJlZml4IiwibmFtZUZpbHRlciIsImFwaVByZWZpeCIsInBhZ2VTaXplIiwiZmlsdGVyIiwiZmluZEZpbGVJbkZvbGRlciIsIm1heWJlU3BlYyIsImZpbGUiLCJKU09OcGFydCIsIm9iaiIsIkpTT04iLCJzdHJpbmdpZnkiLCJtdWx0aXBhcnQiLCJwYXJ0U3RhcnQiLCJwYXJ0RW5kIiwicGFydHMiLCJjcmVhdGVJbkZvbGRlciIsImhlYWRlcnMiLCJ1cGxvYWRUeXBlIiwibWV0YWRhdGEiLCJwYXJlbnRzIiwidXBkYXRlSW5Gb2xkZXIiLCJ0aHJvd0FscmVhZHlFeGlzdHMiLCJlcnIiLCJjb2RlIiwic2F2ZUluRm9sZGVyIiwib3ZlcndyaXRlIiwibWF5YmVGaWxlIiwibG9hZEZyb21Gb2xkZXIiLCJhbHQiLCJkZWxldGVGcm9tRm9sZGVyIiwiY2xlYW5VcEVycm9yIiwiY2xlYW5FcnJvciIsInN0YXR1c1RleHQiLCJzdGF0dXMiLCJEYXRhIiwiZm9sZGVyTmFtZSIsImZvbGRlclNwZWMiLCJmaWxlbmFtZSIsImFzU2VnbWVudEZpbGVuYW1lIiwiZmlsZW5hbWVQYXR0ZXJuIiwiUmVwbyIsInNlZ21lbnRzIiwicmVtb3ZlZFNlZ21lbnRzIiwiaW5kZXgiLCJrZXlzIiwicmVkdWNlIiwiYWNjIiwicHJvamVjdCIsInNhdmUiLCJzZWdtZW50U2F2ZXMiLCJzZWdtZW50RGVsZXRlcyIsInBlcm1EZWxldGUiLCJzZWdtZW50TG9hZHMiLCJsaXN0aW5nIiwiZXhlYyIsInJlcG9zIiwic2VnbWVudHNGb3JQcm9qZWN0IiwicmVtb3ZlZFNlZ21lbnRzRm9yUHJvamVjdCIsImNsb25lIiwicGFyc2UiLCJQcm9qZWN0IiwicmVwbyIsImxvYWRQcm9qZWN0IiwiZGVsZXRlUHJvamVjdCIsIm1heWJlRGF0YSIsInNhdmVkIiwiRGF0ZSIsIm5vdyIsInNhdmVQcm9qZWN0Iiwic2VydmljZXMiLCJ2ZXJpZnlQcm9qZWN0UmVwbyIsInRlc3RQcm9qZWN0IiwidGVzdFNlcnZpY2VzIiwidGVzdCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImJ1aWxkSWRlbnRpdHkiLCJhdXRoIiwiYXV0aDIiLCJnZXRBdXRoSW5zdGFuY2UiLCJzaWduZWRJbiIsImlzU2lnbmVkSW4iLCJwcm9maWxlIiwiY3VycmVudFVzZXIiLCJnZXRCYXNpY1Byb2ZpbGUiLCJnZXROYW1lIiwidXNlcklkIiwiZ2V0RW1haWwiLCJzaWdub3V0Iiwic2lnbk91dCIsInNpZ25pbiIsInNpZ25JbiIsIkdvb2dsZUlkZW50aXR5IiwicmVwb1Rlc3ROYW1lIiwidGVzdE5hbWUiLCJidWlsZFRlc3RQcm9qZWN0cyIsInN1ZmZpeCIsInRlc3RQcm9qZWN0cyIsInJlY3JlYXRlVGVzdFByb2plY3RzIiwiZGVsZXRlU2VsZiIsImV2ZXJ5IiwibmV3TGlzdGluZyIsInJlbW9hbmVyIiwic2VnbWVudCIsInJlbW92ZVNlZ21lbnQiLCJyZW1vYW5lcjIiLCJlcXVhbHNKU09OIiwidmVyaWZ5UHJvamVjdHNPcGVyYXRpb25zIiwiZGVsZXRlQWxsIiwiY2xlYW51cFRlc3RTdG9yYWdlIiwiYXBwTmFtZSIsInN0b3JhZ2VWZXJpZmljYXRpb25zIiwicHJvamVjdHNWZXJpZmljYXRpb25zIiwiY2FjaGVkVmVyaWZpY2F0aW9uIiwidmVyaWZpY2F0aW9ucyIsInZlcmlmeSIsInNhbWVJdGVtcyIsImFzIiwiYnMiLCJzYW1lSlNPTiIsImEiLCJiIiwic3VmZml4ZXMiLCJleHBlY3Q0MDlFcnJvciIsInByb21pc2VBbGxUcnV0aHkiLCJwcm9taXNlcyIsInJlc3VsdHMiLCJmYWlscyIsInZlcmlmeUNhblN0b3JlIiwidGVzdENvbnRlbnQiLCJvdmVyd3JpdGVUZXN0TmFtZSIsImNvbnRlbnQiLCJkZWxldGVMaXN0aW5nIiwiZ2VuZXJhdGVEdW1taWVzIiwibmFtZXMiLCJ2ZXJpZnlEYXRhQ2FuTGlzdCIsImxpc3RUZXN0TmFtZSIsImxpc3RUZXN0TmFtZXMiLCJ2ZXJpZnlEYXRhQ2FuRGVsZXRlIiwiZGVsZXRlVGVzdE5hbWUiLCJmaWxlU3BlYyIsInZlcmlmeURhdGEiLCJkYXRhVGVzdE5hbWUiLCJ5IiwidmVyaWZ5U3RvcmFnZSIsIndhaXRGb3JMb2FkIiwiaW5Gb2xkZXIiLCJmZXRjaCIsImpzb24iLCJ0ZXN0RGF0YSIsIkdvb2dsZUNhcGFiaWxpdGllcyIsImRlbGV0ZSIsImluaXRpYWxpemVSZXBvIiwiR29vZ2xlUHJvamVjdHMiLCJsaXN0UHJvamVjdHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFZLElBQUlDLE9BQUosRUFBbEI7QUFDQSxJQUFNQyxhQUFhLElBQUlELE9BQUosRUFBbkI7O0FBRUEsU0FBU0UsWUFBVCxDQUF1QkMsS0FBdkIsRUFBK0I7O0FBRTNCLFFBQU1DLFlBQVlILFdBQVdJLEdBQVgsQ0FBZ0JGLEtBQWhCLENBQWxCO0FBQ0EsUUFBTUcsU0FBUyxxQkFBTUMsT0FBTixDQUFlSCxTQUFmLENBQWY7QUFDQSxXQUFPTCxXQUFVTSxHQUFWLENBQWVGLEtBQWYsRUFBdUJLLElBQXZCLENBQTZCO0FBQUEsZUFBS0MsRUFBRUMsR0FBRixLQUFVSixNQUFmO0FBQUEsS0FBN0IsQ0FBUDtBQUVIOztJQUVvQkssTzs7O0FBRWpCLHFCQUFhQyxrQkFBYixFQUFpQ1IsU0FBakMsRUFBNENTLGlCQUE1QyxFQUFnRTtBQUFBOztBQUFBOztBQUc1REQsMkJBQW1CRSxPQUFuQixDQUE0QjtBQUFBLG1CQUFLQyxFQUFF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O0FBQ0E7Ozs7Ozs7Ozs7OzsyY0FOQTs7SUFPUTFDLE8sb0JBQUFBLE87O0lBU0YyQyxjOzs7QUFFRiw4QkFBYztBQUFBOztBQUFBLG9JQUVILGdDQUZHOztBQUdWLGNBQUs1RixJQUFMLEdBQVksTUFBS29GLFdBQUwsR0FBbUJ2UixJQUFuQixDQUF5QjhSLGNBQXpCLENBQVo7O0FBSFU7QUFLYjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBT3VCLEtBQUszRixJOzs7QUFBbEJBLG9DO2tFQUNDQSxLQUFLNkYsWUFBTCxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQUlYOzs7Ozs7OztrR0FJYTVRLEk7Ozs7Ozs7dUNBRVUsS0FBSytLLEk7OztBQUFsQkEsb0M7a0VBQ0Msc0JBQWEvSyxJQUFiLEVBQW1CK0ssSUFBbkIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQU1BLElBQUk0RixjQUFKLEUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2VjZTdjZmY3ZDlmYzE0MGRjMWUiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJ0aW55LWVtaXR0ZXJcIjtcbmltcG9ydCBsb2NhbCBmcm9tIFwiLi9sb2NhbC1zdG9yZVwiO1xuXG5jb25zdCBwcm92aWRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgY2hvc2VuS2V5cyA9IG5ldyBXZWFrTWFwKCk7XG5cbmZ1bmN0aW9uIGZpbmRQcm92aWRlciggb3duZXIgKSB7XG5cbiAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggb3duZXIgKTtcbiAgICBjb25zdCBjaG9zZW4gPSBsb2NhbC5nZXRJdGVtKCBjaG9zZW5LZXkgKTtcbiAgICByZXR1cm4gcHJvdmlkZXJzLmdldCggb3duZXIgKS5maW5kKCB4ID0+IHgua2V5ID09PSBjaG9zZW4gKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCBhdmFpbGFibGVQcm92aWRlcnMsIGNob3NlbktleSwgcmVxdWlyZWRGdW5jdGlvbnMgKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgYXZhaWxhYmxlUHJvdmlkZXJzLmZvckVhY2goIHAgPT4gcC52ZXJpZnlJbnRlcmZhY2UoIHJlcXVpcmVkRnVuY3Rpb25zICkgKTtcbiAgICAgICAgcHJvdmlkZXJzLnNldCggdGhpcywgYXZhaWxhYmxlUHJvdmlkZXJzICk7XG4gICAgICAgIGNob3NlbktleXMuc2V0KCB0aGlzLCBjaG9zZW5LZXkgKTtcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IGZpbmRQcm92aWRlciggdGhpcyApO1xuXG4gICAgfVxuXG4gICAgcHJvdmlkZXJzKCkge1xuXG4gICAgICAgIHJldHVybiAoIHByb3ZpZGVycy5nZXQoIHRoaXMgKSB8fCBbXSApLm1hcCggcCA9PiBwLmRlc2NyaWJlKCkgKTtcblxuICAgIH1cblxuICAgIGVuc3VyZVByb3ZpZGVyKCkge1xuXG4gICAgICAgIGlmICggIXRoaXMucHJvdmlkZXIgKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvciggXCJObyBwcm92aWRlciBzZWxlY3RlZFwiICkgKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdGhpcy5wcm92aWRlciApO1xuXG4gICAgfVxuXG4gICAgc2VsZWN0KCBwcm92aWRlciApIHtcblxuICAgICAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggdGhpcyApO1xuICAgICAgICBsb2NhbC5zZXRJdGVtKCBjaG9zZW5LZXksIHByb3ZpZGVyLmtleSApO1xuICAgICAgICB0aGlzLnByb3ZpZGVyID0gZmluZFByb3ZpZGVyKCB0aGlzICk7XG5cbiAgICB9XG5cbiAgICBkZXNlbGVjdCgpIHtcblxuICAgICAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggdGhpcyApO1xuICAgICAgICBsb2NhbC5yZW1vdmVJdGVtKCBjaG9zZW5LZXkgKTtcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IGZpbmRQcm92aWRlciggdGhpcyApO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc2VydmljZXMvc2VydmljZS5qcyIsIi8qIGdsb2JhbCBkb2N1bWVudCAqL1xuaW1wb3J0IFByb3ZpZGVyQmFzZSBmcm9tIFwiLi4vcHJvdmlkZXItYmFzZVwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XG5pbXBvcnQgeyBpbml0IH0gZnJvbSBcIi4vc2hhcmVkXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3NcIjtcblxubGV0IGxvYWRGbGFnID0gZmFsc2U7XG5sZXQgbG9hZEVycm9yO1xuXG5pZiAoIHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiApIHRocm93IG5ldyBFcnJvciggXCJkb2N1bWVudCBpcyB1bmRlZmluZWRcIiApO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJnb29nbGUtYXBpLWxvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICBpbml0KCBjb25maWcuZ2FwaSApXG4gICAgICAgIC50aGVuKCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGxvYWRGbGFnID0gdHJ1ZTtcblxuICAgICAgICB9IClcbiAgICAgICAgLmNhdGNoKCAoIGV4ICkgPT4ge1xuXG4gICAgICAgICAgICBsb2FkRXJyb3IgPSBleDtcblxuICAgICAgICB9ICk7XG5cbn0gKTtcblxuZnVuY3Rpb24gd2FpdEZvciggY29uZGl0aW9uLCB0aW1lb3V0LCBkZXNjcmlwdGlvbiApIHtcblxuICAgIGlmICggdGltZW91dCA8PSAwICkgcmV0dXJuIFByb21pc2UucmVqZWN0KCBuZXcgRXJyb3IoIGBUaW1lZCBvdXQgJHtkZXNjcmlwdGlvbn1gICkgKTtcbiAgICBpZiAoIGNvbmRpdGlvbigpICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggdHJ1ZSApO1xuICAgIGNvbnN0IG5ld1RpbWVvdXQgPSB0aW1lb3V0IC0gMTAwO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlLCByZWplY3QgKSA9PiBzZXRUaW1lb3V0KFxuXG4gICAgICAgICgpID0+IHdhaXRGb3IoIGNvbmRpdGlvbiwgbmV3VGltZW91dCwgZGVzY3JpcHRpb24gKS50aGVuKCByZXNvbHZlLCByZWplY3QgKSxcbiAgICAgICAgMTAwXG5cbiAgICApICk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvdmlkZXIgZXh0ZW5kcyBQcm92aWRlckJhc2Uge1xuXG4gICAgY29uc3RydWN0b3IoIGRlc2NyaXB0aW9uICkge1xuXG4gICAgICAgIHN1cGVyKCBcImdhcGlcIiwgZGVzY3JpcHRpb24gKTtcblxuICAgIH1cblxuICAgIHN0YXR1cygpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cbiAgICAgICAgcmV0dXJuIHsgbG9hZGVkOiBsb2FkRmxhZywgbG9hZEVycm9yIH07XG5cbiAgICB9XG5cbiAgICB3YWl0Rm9yTG9hZCgpIHtcblxuICAgICAgICBpZiAoIGxvYWRGbGFnICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBsb2coIFwiUHJvdmlkZXIgbG9hZGluZy4uLlwiLCB0aGlzICk7XG4gICAgICAgIHJldHVybiB3YWl0Rm9yKCAoKSA9PiBsb2FkRmxhZywgNTAwMCApLnRoZW4oICgpID0+IHtcblxuICAgICAgICAgICAgbG9nKCBcIlByb3ZpZGVyIGxvYWRpbmcgY29tcGxldGVcIiwgdGhpcyApO1xuXG4gICAgICAgIH0gKTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvcHJvdmlkZXIuanMiLCIvKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xuLyogZ2xvYmFsIFJvbGxiYXIgKi9cblxuZXhwb3J0IGRlZmF1bHQgdW5kZWZpbmVkO1xuZXhwb3J0IGNvbnN0IGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoIGNvbnNvbGUgKTtcbmV4cG9ydCBjb25zdCBsb2dFcnJvciA9ICggLi4uYXJncyApID0+IHtcblxuICAgIFJvbGxiYXIuZXJyb3IoIC4uLmFyZ3MgKTtcbiAgICBjb25zb2xlLmVycm9yKCAuLi5hcmdzICk7XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2RpYWdub3N0aWNzLmpzIiwiZnVuY3Rpb24gRSAoKSB7XG4gIC8vIEtlZXAgdGhpcyBlbXB0eSBzbyBpdCdzIGVhc2llciB0byBpbmhlcml0IGZyb21cbiAgLy8gKHZpYSBodHRwczovL2dpdGh1Yi5jb20vbGlwc21hY2sgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2lzc3Vlcy8zKVxufVxuXG5FLnByb3RvdHlwZSA9IHtcbiAgb246IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcblxuICAgIChlW25hbWVdIHx8IChlW25hbWVdID0gW10pKS5wdXNoKHtcbiAgICAgIGZuOiBjYWxsYmFjayxcbiAgICAgIGN0eDogY3R4XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvbmNlOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBmdW5jdGlvbiBsaXN0ZW5lciAoKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGxpc3RlbmVyLl8gPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIGxpc3RlbmVyLCBjdHgpO1xuICB9LFxuXG4gIGVtaXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGRhdGEgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGV2dEFyciA9ICgodGhpcy5lIHx8ICh0aGlzLmUgPSB7fSkpW25hbWVdIHx8IFtdKS5zbGljZSgpO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbGVuID0gZXZ0QXJyLmxlbmd0aDtcblxuICAgIGZvciAoaTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBldnRBcnJbaV0uZm4uYXBwbHkoZXZ0QXJyW2ldLmN0eCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb2ZmOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuICAgIHZhciBldnRzID0gZVtuYW1lXTtcbiAgICB2YXIgbGl2ZUV2ZW50cyA9IFtdO1xuXG4gICAgaWYgKGV2dHMgJiYgY2FsbGJhY2spIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBldnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChldnRzW2ldLmZuICE9PSBjYWxsYmFjayAmJiBldnRzW2ldLmZuLl8gIT09IGNhbGxiYWNrKVxuICAgICAgICAgIGxpdmVFdmVudHMucHVzaChldnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZXZlbnQgZnJvbSBxdWV1ZSB0byBwcmV2ZW50IG1lbW9yeSBsZWFrXG4gICAgLy8gU3VnZ2VzdGVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXpkXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2NvbW1pdC9jNmViZmFhOWJjOTczYjMzZDExMGE4NGEzMDc3NDJiN2NmOTRjOTUzI2NvbW1pdGNvbW1lbnQtNTAyNDkxMFxuXG4gICAgKGxpdmVFdmVudHMubGVuZ3RoKVxuICAgICAgPyBlW25hbWVdID0gbGl2ZUV2ZW50c1xuICAgICAgOiBkZWxldGUgZVtuYW1lXTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdGlueS1lbWl0dGVyL2luZGV4LmpzIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgd2luZG93WyBcInNsZWVwZXItc2VydmljZS1jb25maWdcIiBdO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9jb25maWcuanMiLCIvKiBnbG9iYWwgZG9jdW1lbnQgKi9cblxuaW1wb3J0IElkZW50aXR5IGZyb20gXCIuL3NlcnZpY2VzL2lkZW50aXR5XCI7XG5pbXBvcnQgQ2FwYWJpbGl0aWVzIGZyb20gXCIuL3NlcnZpY2VzL2NhcGFiaWxpdGllc1wiO1xuaW1wb3J0IFByb2plY3RzIGZyb20gXCIuL3NlcnZpY2VzL3Byb2plY3RzXCI7XG5cbmltcG9ydCBnYXBpSWRlbnRpdHkgZnJvbSBcIi4vZ2FwaS9Hb29nbGVJZGVudGl0eVwiO1xuaW1wb3J0IGdhcGlDYXBhYmlsaXRpZXMgZnJvbSBcIi4vZ2FwaS9Hb29nbGVDYXBhYmlsaXRpZXNcIjtcbmltcG9ydCBnYXBpUHJvamVjdHMgZnJvbSBcIi4vZ2FwaS9Hb29nbGVQcm9qZWN0c1wiO1xuXG5pbXBvcnQgc2VsZlRlc3QgZnJvbSBcIi4vc2VsZi10ZXN0XCI7XG5cbmlmICggdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiICkgdGhyb3cgbmV3IEVycm9yKCBcImRvY3VtZW50IGlzIG5vdCBkZWZpbmVkXCIgKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJsb2NhdGUtc2VydmljZXNcIiwgKCBlICkgPT4ge1xuXG4gICAgZS5kZXRhaWwoIG51bGwsIHtcblxuICAgICAgICBpZGVudGl0eTogbmV3IElkZW50aXR5KCBbIGdhcGlJZGVudGl0eSBdICksXG4gICAgICAgIGNhcGFiaWxpdGllczogbmV3IENhcGFiaWxpdGllcyggWyBnYXBpQ2FwYWJpbGl0aWVzIF0gKSxcbiAgICAgICAgcHJvamVjdHM6IG5ldyBQcm9qZWN0cyggWyBnYXBpUHJvamVjdHMgXSApXG5cbiAgICB9ICk7XG5cbn0gKTtcblxuc2VsZlRlc3QoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZW50cnkuanMiLCJpbXBvcnQgU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5cbmNvbnN0IHJlcXVpcmVkRnVuY3Rpb25zID0gWyBcImN1cnJlbnRcIiwgXCJhdXRob3JpemVcIiwgXCJkZWF1dGhvcml6ZVwiIF07XG5jb25zdCBjaG9zZW5LZXkgPSBcImNob3Nlbi1pZGVudGl0eS1wcm92aWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZGVudGl0eVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm92aWRlcnMgKSB7XG5cbiAgICAgICAgc3VwZXIoIHByb3ZpZGVycywgY2hvc2VuS2V5LCByZXF1aXJlZEZ1bmN0aW9ucyApO1xuXG4gICAgfVxuXG4gICAgY3VycmVudCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5jdXJyZW50KCkgKTtcblxuICAgIH1cblxuICAgIHNpZ25JbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5hdXRob3JpemUoKSApLnRoZW4oICgpID0+IHRoaXMuY3VycmVudCgpICk7XG5cbiAgICB9XG5cbiAgICBzaWduT3V0KCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmVuc3VyZVByb3ZpZGVyKCkudGhlbiggcCA9PiBwLmRlYXV0aG9yaXplKCkgKS50aGVuKCAoKSA9PiB0aGlzLmN1cnJlbnQoKSApO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc2VydmljZXMvaWRlbnRpdHkuanMiLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9sb2NhbC1zdG9yZS5qcyIsImltcG9ydCBTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VcIjtcblxuY29uc3QgY2hvc2VuS2V5ID0gXCJjaG9zZW4tY2FwYWJpbGl0aWVzLXByb3ZpZGVyXCI7XG5jb25zdCByZXF1aXJlZEZ1bmN0aW9ucyA9IFtcblxuICAgIFwiY2xlYXJcIixcbiAgICBcInZlcmlmeUxpc3RcIixcbiAgICBcInZlcmlmeVN0b3JlXCIsXG4gICAgXCJ2ZXJpZnlHZXRcIixcbiAgICBcInZlcmlmeURlbGV0ZVwiLFxuICAgIFwidmVyaWZ5UHJvamVjdHNcIixcblxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FwYWJpbGl0aWVzU2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoIHByb3ZpZGVycyApIHtcblxuICAgICAgICBzdXBlciggcHJvdmlkZXJzLCBjaG9zZW5LZXksIHJlcXVpcmVkRnVuY3Rpb25zICk7XG5cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5jbGVhcigpICkudGhlbiggKCkgPT4gdHJ1ZSApO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5U3RvcmFnZSgpIHtcblxuICAgICAgICBjb25zdCBwcm92aWRlciA9IGF3YWl0IHRoaXMuZW5zdXJlUHJvdmlkZXIoKTtcbiAgICAgICAgY29uc3QgWyBjYW5MaXN0LCBjYW5TdG9yZSwgY2FuR2V0LCBjYW5EZWxldGUgXSA9IGF3YWl0IFByb21pc2UuYWxsKCBbXG5cbiAgICAgICAgICAgIHByb3ZpZGVyLnZlcmlmeUxpc3QoKSxcbiAgICAgICAgICAgIHByb3ZpZGVyLnZlcmlmeVN0b3JlKCksXG4gICAgICAgICAgICBwcm92aWRlci52ZXJpZnlHZXQoKSxcbiAgICAgICAgICAgIHByb3ZpZGVyLnZlcmlmeURlbGV0ZSgpLFxuXG4gICAgICAgIF0gKTtcbiAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICAgICAgY2FuTGlzdCxcbiAgICAgICAgICAgIGNhblN0b3JlLFxuICAgICAgICAgICAgY2FuR2V0LFxuICAgICAgICAgICAgY2FuRGVsZXRlLFxuXG4gICAgICAgIH07XG5cbiAgICB9XG5cbiAgICBhc3luYyB2ZXJpZnlQcm9qZWN0UmVwbygpIHtcblxuICAgICAgICBjb25zdCBwcm92aWRlciA9IGF3YWl0IHRoaXMuZW5zdXJlUHJvdmlkZXIoKTtcbiAgICAgICAgY29uc3QgeyBjYW5MaXN0UHJvamVjdHMsIGNhbkRlbGV0ZVByb2plY3RzLCBjYW5DcmVhdGVQcm9qZWN0cywgY2FuTG9hZERhdGEsIGNhblNhdmVEYXRhLCBjYW5EZWxldGVEYXRhIH0gPSBhd2FpdCBwcm92aWRlci52ZXJpZnlQcm9qZWN0cygpO1xuICAgICAgICByZXR1cm4geyBjYW5MaXN0UHJvamVjdHMsIGNhbkRlbGV0ZVByb2plY3RzLCBjYW5DcmVhdGVQcm9qZWN0cywgY2FuTG9hZERhdGEsIGNhblNhdmVEYXRhLCBjYW5EZWxldGVEYXRhIH07XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9jYXBhYmlsaXRpZXMuanMiLCJpbXBvcnQgU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5cbmNvbnN0IHJlcXVpcmVkRnVuY3Rpb25zID0gWyBcImxpc3RcIiwgXCJidWlsZFwiIF07XG5jb25zdCBjaG9zZW5LZXkgPSBcImNob3Nlbi1wcm9qZWN0cy1wcm92aWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0c1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm92aWRlcnMgKSB7XG5cbiAgICAgICAgc3VwZXIoIHByb3ZpZGVycywgY2hvc2VuS2V5LCByZXF1aXJlZEZ1bmN0aW9ucyApO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgbGlzdCgpIHtcblxuICAgICAgICByZXR1cm4gKCBhd2FpdCB0aGlzLmVuc3VyZVByb3ZpZGVyKCkgKS5saXN0KCk7XG5cbiAgICB9XG5cbiAgICBhc3luYyBidWlsZCggbmFtZSApIHtcblxuICAgICAgICByZXR1cm4gKCBhd2FpdCB0aGlzLmVuc3VyZVByb3ZpZGVyKCkgKS5idWlsZCggbmFtZSApO1xuXG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlcnZpY2VzL3Byb2plY3RzLmpzIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwidGlueS1lbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3ZpZGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCBrZXksIGRlc2NyaXB0aW9uICkge1xuXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcblxuICAgIH1cblxuICAgIHZlcmlmeUludGVyZmFjZSggZnVuY3Rpb25zICkge1xuXG4gICAgICAgIGZ1bmN0aW9ucy5mb3JFYWNoKCAoIGZ1bmMgKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG1heWJlRnVuY3Rpb24gPSB0aGlzWyBmdW5jIF07XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBtYXliZUZ1bmN0aW9uICE9PSBcImZ1bmN0aW9uXCIgKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIGBQcm92aWRlciAke3Byb3ZpZGVyfSBkb2VzIG5vdCBwcm92aWRlIGZ1bmN0aW9uICcke2Z1bmN9JyAoJHttYXliZUZ1bmN0aW9ufSlgICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ICk7XG5cbiAgICB9XG5cbiAgICBkZXNjcmliZSgpIHtcblxuICAgICAgICBjb25zdCB7IGtleSwgbmFtZSwgZGVzY3JpcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7IGtleSwgbmFtZSwgZGVzY3JpcHRpb24gfTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3Byb3ZpZGVyLWJhc2UuanMiLCIvKiBnbG9iYWwgZ2FwaSAqL1xuXG5jb25zdCBTQ09QRVMgPSBbXG5cbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUubWV0YWRhdGEucmVhZG9ubHlcIixcbiAgICBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUuZmlsZVwiLFxuXG5dLmpvaW4oIFwiIFwiICk7XG5cbmZ1bmN0aW9uIGluaXRBdXRoQ2xpZW50KCBjb25maWcsIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG5cbiAgICAgICAgYXBpS2V5OiBjb25maWcuQVBJX0tFWSxcbiAgICAgICAgY2xpZW50SWQ6IGNvbmZpZy5DTElFTlRfSUQsXG4gICAgICAgIHNjb3BlOiBjb25maWcuU0NPUEVTIHx8IFNDT1BFUyxcblxuICAgIH07XG4gICAgZ2FwaS5sb2FkKCBcImNsaWVudDphdXRoMlwiLCAoKSA9PiBnYXBpLmNsaWVudFxuICAgICAgICAuaW5pdCggb3B0aW9ucyApXG4gICAgICAgIC50aGVuKCByZXNvbHZlLCByZWplY3QgKSApO1xuXG59XG5cbmZ1bmN0aW9uIHRyeUluaXRBdXRoQ2xpZW50KCBjb25maWcsIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIHRyeSB7XG5cbiAgICAgICAgaW5pdEF1dGhDbGllbnQoIGNvbmZpZywgcmVzb2x2ZSwgcmVqZWN0ICk7XG5cbiAgICB9IGNhdGNoICggZSApIHtcblxuICAgICAgICByZWplY3QoIGUgKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCB1bmRlZmluZWQ7XG5leHBvcnQgZnVuY3Rpb24gaW5pdCggY29uZmlnICkge1xuXG4gICAgY29uc3QgbmFnYSA9IHRyeUluaXRBdXRoQ2xpZW50LmJpbmQoIG51bGwsIGNvbmZpZyApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSggbmFnYSApO1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvc2hhcmVkLmpzIiwiLyogZ2xvYmFsIGdhcGkgKi9cblxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4uLy4uL2RpYWdub3N0aWNzXCI7XG5cbmNvbnN0IGZpbGVzQVBJID0gXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9kcml2ZS92My9maWxlc1wiO1xuY29uc3QgdXBsb2FkQVBJID0gXCJodHRwczovL2NvbnRlbnQuZ29vZ2xlYXBpcy5jb20vdXBsb2FkL2RyaXZlL3YzL2ZpbGVzXCI7XG5jb25zdCBmb2xkZXJNaW1lVHlwZSA9IFwiYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmZvbGRlclwiO1xuY29uc3QgYm91bmRhcnkgPSBcIi4uLi4uLlwiO1xuY29uc3QgbXVsdGlQYXJ0TWltZVR5cGUgPSBgbXVsdGlwYXJ0L3JlbGF0ZWQ7IGJvdW5kYXJ5PSR7Ym91bmRhcnl9YDtcbmNvbnN0IGRhdGFNaW1lVHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuY29uc3QgSlNPTmNvbnRlbnRUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCI7XG5cbmNsYXNzIEZpbGVTcGVjIHtcblxuICAgIGNvbnN0cnVjdG9yKCB7IGlkLCBuYW1lIH0gKSB7XG5cbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGJ1aWxkKCB0aGluZyApIHtcblxuICAgICAgICByZXR1cm4gbmV3IEZpbGVTcGVjKCB0aGluZyApO1xuXG4gICAgfVxuXG59XG5cbmxldCBjb3VudGVyID0gMDtcblxuZnVuY3Rpb24gcmVxdWVzdCggb3B0aW9ucyApIHtcblxuICAgIGNvbnN0IGRlZmF1bHRlZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKCB7IG1ldGhvZDogXCJHRVRcIiwgcGF0aDogZmlsZXNBUEkgfSwgb3B0aW9ucyApO1xuICAgIGxvZyggXCJHQVBJIHJlcXVlc3RcIiwgKytjb3VudGVyLCBkZWZhdWx0ZWRPcHRpb25zICk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IGdhcGkuY2xpZW50XG4gICAgICAgIC5yZXF1ZXN0KCBkZWZhdWx0ZWRPcHRpb25zIClcbiAgICAgICAgLnRoZW4oIHJlc29sdmUsIHJlamVjdCApICk7XG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9sZGVyKCBuYW1lICkge1xuXG4gICAgY29uc3QgbWltZVR5cGUgPSBmb2xkZXJNaW1lVHlwZTtcbiAgICBjb25zdCBib2R5ID0geyBuYW1lLCBtaW1lVHlwZSB9O1xuICAgIGNvbnN0IG1ldGhvZCA9IFwiUE9TVFwiO1xuICAgIHJldHVybiByZXF1ZXN0KCB7IG1ldGhvZCwgYm9keSB9ICk7XG5cbn1cblxuZnVuY3Rpb24gZmlyc3RPck51bGwoIGxpc3QsIHRyYW5zZm9ybSA9IHggPT4geCApIHtcblxuICAgIGlmICggbGlzdCAmJiBsaXN0Lmxlbmd0aCApIHJldHVybiB0cmFuc2Zvcm0oIGxpc3RbIDAgXSApO1xuICAgIHJldHVybiBudWxsO1xuXG59XG5mdW5jdGlvbiBlbnN1cmVGb2xkZXIoIG5hbWUgKSB7XG5cbiAgICBjb25zdCBxID0gYG5hbWU9JyR7bmFtZX0nIGFuZCBtaW1lVHlwZT0nJHtmb2xkZXJNaW1lVHlwZX0nIGFuZCB0cmFzaGVkPWZhbHNlYDtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHEgfTtcbiAgICByZXR1cm4gcmVxdWVzdCggeyBwYXJhbXMgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLnJlc3VsdC5maWxlcyApXG4gICAgICAgIC50aGVuKCBmaXJzdE9yTnVsbCApXG4gICAgICAgIC50aGVuKCBtYXliZUZvbGRlciA9PiBtYXliZUZvbGRlciB8fCBjcmVhdGVGb2xkZXIoIG5hbWUgKSApXG4gICAgICAgIC50aGVuKCBGaWxlU3BlYy5idWlsZCApO1xuXG59XG5cbmZ1bmN0aW9uIGR1bWJEb3duUHJlZml4KCBwcmVmaXggKSB7XG5cbiAgICBsZXQgcmV0ID0gcHJlZml4O1xuICAgIC8vIEFQSSBkb2Vzbid0IGxpa2UgZGFzaGVzIGZvciBzb21lIHJlYXNvblxuICAgIGNvbnN0IGRhc2hJbmRleCA9IHJldC5pbmRleE9mKCBcIi1cIiApO1xuICAgIGlmICggfmRhc2hJbmRleCApIHJldCA9IHJldC5zdWJzdHJpbmcoIDAsIGRhc2hJbmRleCApO1xuICAgIC8vIEFQSSBkb2Vzbid0IGxpa2UgbW9yZSB0aGFuIH4yMCBjaGFyYWN0ZXJzIGZvciBzb21lIHJlYXNvblxuICAgIGlmICggcmV0Lmxlbmd0aCA+IDIwICkgcmV0ID0gcmV0LnN1YnN0cmluZyggMCwgMjAgKTtcbiAgICByZXR1cm4gcmV0O1xuXG59XG5mdW5jdGlvbiBsaXN0RmlsZXNJbkZvbGRlciggZm9sZGVyLCBtYXliZVByZWZpeCApIHtcblxuICAgIGxldCBxID0gYG1pbWVUeXBlPScke2RhdGFNaW1lVHlwZX0nIGFuZCB0cmFzaGVkPWZhbHNlYDtcbiAgICBsZXQgbmFtZUZpbHRlciA9ICgpID0+IHRydWU7XG4gICAgaWYgKCBtYXliZVByZWZpeCApIHtcblxuICAgICAgICBjb25zdCBhcGlQcmVmaXggPSBkdW1iRG93blByZWZpeCggbWF5YmVQcmVmaXggKTtcbiAgICAgICAgaWYgKCBhcGlQcmVmaXggIT09IG1heWJlUHJlZml4ICkge1xuXG4gICAgICAgICAgICBuYW1lRmlsdGVyID0geCA9PiB4Lm5hbWUuaW5kZXhPZiggbWF5YmVQcmVmaXggKSA9PT0gMDtcblxuICAgICAgICB9XG4gICAgICAgIHEgPSBgbmFtZSBjb250YWlucyAnJHthcGlQcmVmaXh9JyBhbmQgJHtxfWA7XG5cbiAgICB9XG4gICAgY29uc3QgcGFnZVNpemUgPSAxMDAwO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgcSwgcGFnZVNpemUgfTtcbiAgICByZXR1cm4gcmVxdWVzdCggeyBwYXJhbXMgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gcmVzLnJlc3VsdC5maWxlcyApXG4gICAgICAgIC50aGVuKCBmaWxlcyA9PiBmaWxlcy5maWx0ZXIoIG5hbWVGaWx0ZXIgKS5tYXAoIEZpbGVTcGVjLmJ1aWxkICkgKTtcblxufVxuXG5mdW5jdGlvbiBmaW5kRmlsZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApIHtcblxuICAgIGlmICggbWF5YmVTcGVjIGluc3RhbmNlb2YgRmlsZVNwZWMgKSB7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggbWF5YmVTcGVjICk7XG5cbiAgICB9XG4gICAgY29uc3QgeyBpZCB9ID0gZm9sZGVyIHx8IHt9O1xuICAgIGNvbnN0IHEgPSBgbmFtZT0nJHttYXliZVNwZWN9JyBhbmQgJyR7aWR9JyBpbiBwYXJlbnRzIGFuZCBtaW1lVHlwZT0nJHtkYXRhTWltZVR5cGV9JyBhbmQgdHJhc2hlZD1mYWxzZWA7XG4gICAgY29uc3QgcGFyYW1zID0geyBxIH07XG4gICAgcmV0dXJuIHJlcXVlc3QoIHsgcGFyYW1zIH0gKVxuICAgICAgICAudGhlbiggcmVzID0+IHJlcy5yZXN1bHQuZmlsZXMgKVxuICAgICAgICAudGhlbiggZmlsZXMgPT4gZmlyc3RPck51bGwoIGZpbGVzLCBmaWxlID0+IEZpbGVTcGVjLmJ1aWxkKCBmaWxlICkgKSApO1xuXG59XG5cbmZ1bmN0aW9uIEpTT05wYXJ0KCBvYmogKSB7XG5cbiAgICByZXR1cm4gYFxcclxcbkNvbnRlbnQtVHlwZTogJHtKU09OY29udGVudFR5cGV9XFxyXFxuXFxyXFxuJHtKU09OLnN0cmluZ2lmeSggb2JqLCBudWxsLCAxICl9YDtcblxufVxuXG5mdW5jdGlvbiBtdWx0aXBhcnQoIC4uLnBhcnRzICkge1xuXG4gICAgY29uc3QgcGFydFN0YXJ0ID0gYFxcclxcbi0tJHtib3VuZGFyeX1gO1xuICAgIGNvbnN0IHBhcnRFbmQgPSBgJHtwYXJ0U3RhcnR9LS1gO1xuICAgIHJldHVybiBwYXJ0U3RhcnQgKyBwYXJ0cy5qb2luKCBwYXJ0U3RhcnQgKSArIHBhcnRFbmQ7XG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5Gb2xkZXIoIGZvbGRlciwgbmFtZSwgZGF0YSApIHtcblxuICAgIGNvbnN0IG1ldGhvZCA9IFwiUE9TVFwiO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7IFwiQ29udGVudC1UeXBlXCI6IG11bHRpUGFydE1pbWVUeXBlIH07XG4gICAgY29uc3QgcGFyYW1zID0geyB1cGxvYWRUeXBlOiBcIm11bHRpcGFydFwiIH07XG4gICAgY29uc3QgbWV0YWRhdGEgPSB7IHBhcmVudHM6IFsgZm9sZGVyLmlkIF0sIG5hbWUgfTtcbiAgICBjb25zdCBib2R5ID0gbXVsdGlwYXJ0KCBKU09OcGFydCggbWV0YWRhdGEgKSwgSlNPTnBhcnQoIGRhdGEgKSApO1xuICAgIGNvbnN0IHBhdGggPSB1cGxvYWRBUEk7XG4gICAgcmV0dXJuIHJlcXVlc3QoIHtcblxuICAgICAgICBwYXRoLCBtZXRob2QsIHBhcmFtcywgaGVhZGVycywgYm9keSxcblxuICAgIH0gKTtcblxufVxuXG5mdW5jdGlvbiB1cGRhdGVJbkZvbGRlciggZm9sZGVyLCBmaWxlLCBkYXRhICkge1xuXG4gICAgY29uc3QgbWV0aG9kID0gXCJQQVRDSFwiO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgdXBsb2FkVHlwZTogXCJtZWRpYVwiIH07XG4gICAgY29uc3QgbWltZVR5cGUgPSBkYXRhTWltZVR5cGU7XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KCBkYXRhICk7XG4gICAgY29uc3QgcGF0aCA9IGAke3VwbG9hZEFQSX0vJHtmaWxlLmlkfWA7XG4gICAgcmV0dXJuIHJlcXVlc3QoIHtcblxuICAgICAgICBwYXRoLCBtZXRob2QsIHBhcmFtcywgbWltZVR5cGUsIGJvZHksXG5cbiAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gdGhyb3dBbHJlYWR5RXhpc3RzKCBmaWxlICkge1xuXG4gICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCBgRmlsZSBhbHJlYWR5IGV4aXN0czogJHtmaWxlLmlkfSAke2ZpbGUubmFtZX1gICk7XG4gICAgZXJyLmNvZGUgPSA0MDk7XG4gICAgdGhyb3cgZXJyO1xuXG59XG5cbmZ1bmN0aW9uIHNhdmVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMsIGRhdGEsIG9wdGlvbnMgPSB7fSApIHtcblxuICAgIGNvbnN0IHsgb3ZlcndyaXRlIH0gPSBvcHRpb25zO1xuICAgIHJldHVybiBmaW5kRmlsZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApXG4gICAgICAgIC50aGVuKCAoIG1heWJlRmlsZSApID0+IHtcblxuICAgICAgICAgICAgaWYgKCBtYXliZUZpbGUgJiYgIW92ZXJ3cml0ZSApIHRocm93QWxyZWFkeUV4aXN0cyggbWF5YmVGaWxlICk7XG4gICAgICAgICAgICBpZiAoIG1heWJlRmlsZSApIHJldHVybiB1cGRhdGVJbkZvbGRlciggZm9sZGVyLCBtYXliZUZpbGUsIGRhdGEgKTtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMsIGRhdGEgKTtcblxuICAgICAgICB9IClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiBGaWxlU3BlYy5idWlsZCggcmVzLnJlc3VsdCApICk7XG5cbn1cblxuZnVuY3Rpb24gbG9hZEZyb21Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjICkge1xuXG4gICAgcmV0dXJuIGZpbmRGaWxlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjIClcbiAgICAgICAgLnRoZW4oICggbWF5YmVGaWxlICkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIG1heWJlRmlsZSApIHJldHVybiBtYXliZUZpbGU7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoIGBOb3QgZm91bmQ6ICR7bWF5YmVTcGVjfWAgKTtcbiAgICAgICAgICAgIGVyci5jb2RlID0gNDA0O1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlcnIgKTtcblxuICAgICAgICB9IClcbiAgICAgICAgLnRoZW4oICggZmlsZSApID0+IHtcblxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGAke2ZpbGVzQVBJfS8ke2ZpbGUuaWR9YDtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYWx0OiBcIm1lZGlhXCIgfTtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KCB7IHBhdGgsIHBhcmFtcyB9ICk7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC5jYXRjaCggZXggPT4gUHJvbWlzZS5yZWplY3QoICggZXggJiYgZXgucmVzdWx0ICYmIGV4LnJlc3VsdC5lcnJvciApIHx8IGV4ICkgKVxuICAgICAgICAudGhlbiggcmVzID0+IHJlcy5yZXN1bHQgKTtcblxufVxuXG5mdW5jdGlvbiBkZWxldGVGcm9tRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApIHtcblxuICAgIHJldHVybiBmaW5kRmlsZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApXG4gICAgICAgIC50aGVuKCAoIG1heWJlRmlsZSApID0+IHtcblxuICAgICAgICAgICAgaWYgKCAhbWF5YmVGaWxlICkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggeyBjb2RlOiA0MDQgfSApO1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGAke2ZpbGVzQVBJfS8ke21heWJlRmlsZS5pZH1gO1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gXCJERUxFVEVcIjtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0KCB7IG1ldGhvZCwgcGF0aCB9ICk7XG5cbiAgICAgICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIGNsZWFuVXBFcnJvciggZXJyICkge1xuXG4gICAgaWYgKCBlcnIuY29kZSApIHJldHVybiBQcm9taXNlLnJlamVjdCggZXJyICk7XG4gICAgaWYgKCBlcnIucmVzdWx0ICkge1xuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoIGBXVEYgYW0gaSBzdXBwb3NlZCB0byBkbyB3aXRoIHRoaXM/ICR7SlNPTi5zdHJpbmdpZnkoIGVyci5yZXN1bHQsIG51bGwsIDMgKX1gICk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoIGVyciApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zdCBjbGVhbkVycm9yID0gbmV3IEVycm9yKCBlcnIuYm9keSB8fCBlcnIuc3RhdHVzVGV4dCB8fCBcIlVua25vd24gZXJyb3JcIiApO1xuICAgIGNsZWFuRXJyb3IuZXJyID0gZXJyO1xuICAgIGNsZWFuRXJyb3IuY29kZSA9IGVyci5zdGF0dXMgfHwgNTAwO1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggY2xlYW5FcnJvciApO1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGEge1xuXG4gICAgLyoqXG4gICAgICogYnVpbGRzIGEgRGF0YSByZXBvc2l0b3J5IGZvciB0aGUgbmFtZWQgZm9sZGVyXG4gICAgICogaWYgdGhlIGZvbGRlciBkb2Vzbid0IGFscmVhZHkgZXhpc3QsIGNyZWF0ZXMgaXRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyTmFtZSB0aGUgbmFtZSBvZiB0aGUgZm9sZGVyIGZvciB3aGljaCB0byBidWlsZFxuICAgICAqIEByZXR1cm5zIHtEYXRhfSB0aGUgZGF0YSByZXBvc2l0b3J5XG4gICAgICovXG4gICAgc3RhdGljIGluRm9sZGVyKCBmb2xkZXJOYW1lICkge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IGVuc3VyZUZvbGRlciggZm9sZGVyTmFtZSApIClcbiAgICAgICAgICAgIC50aGVuKCBmb2xkZXJTcGVjID0+IG5ldyBEYXRhKCBmb2xkZXJTcGVjICkgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgYSBEYXRhIHJlcG9zaXRvcnkgZm9yIGZpbGVzIHN0b3JlZCBpbiB0aGUgc3BlY2lmaWVkIGZvbGRlclxuICAgICAqIEBwYXJhbSB7RmlsZVNwZWN9IGZvbGRlclNwZWMgdGhlIGZvbGRlciBjb250YWluaW5nIGZpbGVzIHRvIG9wZXJhdGUgb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciggZm9sZGVyU3BlYyApIHtcblxuICAgICAgICB0aGlzLmZvbGRlciA9IGZvbGRlclNwZWM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgZGF0YSBmaWxlcyBpbiB0aGlzIGZvbGRlciAoSlNPTiBmaWxlcylcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW21heWJlUHJlZml4XSBpZiBzcGVjaWZpZWQsIG9ubHkgZmlsZXMgd2l0aCB0aGUgc3BlY2lmaWVkXG4gICAgICogcHJlZml4IGFyZSByZXR1cm5lZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBwcm9taXNlIHRvIGxpc3QgdGhlIGZpbGVzIGluIHRoaXMgZm9sZGVyXG4gICAgICovXG4gICAgbGlzdCggbWF5YmVQcmVmaXggKSB7XG5cbiAgICAgICAgcmV0dXJuIGxpc3RGaWxlc0luRm9sZGVyKCB0aGlzLmZvbGRlciwgbWF5YmVQcmVmaXggKS5jYXRjaCggY2xlYW5VcEVycm9yICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlcyB0aGUgc3BlY2lmaWVkIGRhdGEgaW4gYSBkYXRhIGZpbGUgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgZmlsZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIHRoZSBkYXRhIHRvIHNhdmUgKHdpbGwgYmUgSlNPTiBzdHJpbmdpZmllZClcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIHNhdmUgb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm92ZXJ3cml0ZSBpZiBUcnVlIHdpbGwgY2hlY2sgaWYgZmlsZSBleGlzdHMgYW5kXG4gICAgICogcmV0dXJuIGFuIGVycm9yIHdpdGggY29kZSA0MDlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSB0byBzYXZlIHRoZSBmaWxlXG4gICAgICovXG4gICAgc2F2ZSggbmFtZSwgZGF0YSwgb3B0aW9ucyApIHtcblxuICAgICAgICByZXR1cm4gc2F2ZUluRm9sZGVyKCB0aGlzLmZvbGRlciwgbmFtZSwgZGF0YSwgb3B0aW9ucyApLmNhdGNoKCBjbGVhblVwRXJyb3IgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgc3BlY2lmaWVkIGRhdGEgaW4gYSBkYXRhIGZpbGUgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUvc3BlY1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfEZpbGVTcGVjfSBtYXliZVNwZWMgdGhlIG5hbWUgb3IgRmlsZVNwZWMgb2YgdGhlIGZpbGUgdG8gbG9hZFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSB0byBsb2FkIHRoZSBmaWxlIHNwZWNpZmllZFxuICAgICAqL1xuICAgIGxvYWQoIG1heWJlU3BlYyApIHtcblxuICAgICAgICByZXR1cm4gbG9hZEZyb21Gb2xkZXIoIHRoaXMuZm9sZGVyLCBtYXliZVNwZWMgKS5jYXRjaCggY2xlYW5VcEVycm9yICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJtZW5hbnRseSBkZWxldGVzIHRoZSBkYXRhIGZpbGUgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUvc3BlYy4gVGhlIGZpbGVcbiAgICAgKiBpcyBub3QgcmVjb3ZlcmFibGUgZnJvbSB0aGUgcmVjeWNsZSBiaW4uIElmIHRoZSBkYXRhIGZpbGUgaXMgYWxyZWFkeVxuICAgICAqIGdvbmUsIHJlc29sdmVzIHdpdGggeyBjb2RlOiA0MDQgfVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEZpbGVTcGVjfSBtYXliZVNwZWMgdGhlIG5hbWUgb3IgRmlsZVNwZWMgb2YgdGhlIGZpbGUgdG8gZGVsZXRlXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBQcm9taXNlIHRvIGRlbGV0ZSB0aGUgZmlsZVxuICAgICAqL1xuICAgIHBlcm1EZWxldGUoIG1heWJlU3BlYyApIHtcblxuICAgICAgICByZXR1cm4gZGVsZXRlRnJvbUZvbGRlciggdGhpcy5mb2xkZXIsIG1heWJlU3BlYyApLmNhdGNoKCBjbGVhblVwRXJyb3IgKTtcblxuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL3N0b3JlL0RhdGEuanMiLCJjb25zdCBmaWxlbmFtZSA9IG5hbWUgPT4gYCR7bmFtZX1fcHJvamVjdC5qc29uYDtcbmNvbnN0IGFzU2VnbWVudEZpbGVuYW1lID0gKCBuYW1lLCBrZXkgKSA9PiBgJHtuYW1lfV9fJHtrZXl9Lmpzb25gO1xuY29uc3QgZmlsZW5hbWVQYXR0ZXJuID0gL14oLiopX3Byb2plY3RcXC5qc29uJC87XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcG8ge1xuXG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBwcm9qZWN0IHJlcG9zaXRvcnkgZm9yIHRoZSBnaXZlbiBkYXRhIHJlcG9zaXRvcnlcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSB0aGUgZGF0YSByZXBvc2l0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoIGRhdGEgKSB7XG5cbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmUgYSBwcm9qZWN0IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLCBtZXRhZGF0YSBhbmQgc2VnbWVudHMgKGhhc2ggb2Yga2V5LXZhbHVlcylcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBvZiB0aGUgcHJvamVjdFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YSB0byBzYXZlIGluIHRoZSBtYWluIHByb2plY3QgZmlsZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzZWdtZW50cyBoYXNoIG9mIGtleS12YWx1ZSBwYWlycyB0byBzYXZlLCBlYWNoIGluIGl0cyBvd24gZmlsZVxuICAgICAqIEByZXR1cm4ge1Byb21pc2U8dm9pZD59IFByb21pc2Ugb2Ygc2F2ZWQgcHJvamVjdFxuICAgICAqL1xuICAgIGFzeW5jIHNhdmVQcm9qZWN0KCBuYW1lLCBtZXRhZGF0YSwgc2VnbWVudHMgPSB7fSwgcmVtb3ZlZFNlZ21lbnRzID0gW10gKSB7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSBPYmplY3Qua2V5cyggc2VnbWVudHMgKS5yZWR1Y2UoICggYWNjLCBrZXkgKSA9PiBPYmplY3QuYXNzaWduKCBhY2MsIHtcblxuICAgICAgICAgICAgWyBrZXkgXTogYXNTZWdtZW50RmlsZW5hbWUoIG5hbWUsIGtleSApXG5cbiAgICAgICAgfSApLCB7fSApO1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0geyBpbmRleCwgbWV0YWRhdGEgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5kYXRhLnNhdmUoIGZpbGVuYW1lKCBuYW1lICksIHByb2plY3QsIHsgb3ZlcndyaXRlOiB0cnVlIH0gKTtcbiAgICAgICAgY29uc3Qgc2VnbWVudFNhdmVzID0gT2JqZWN0LmtleXMoIGluZGV4ICkubWFwKCBuYW1lID0+XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlKCBpbmRleFsgbmFtZSBdLCBzZWdtZW50c1sgbmFtZSBdLCB7IG92ZXJ3cml0ZTogdHJ1ZSB9IClcblxuICAgICAgICApO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCggc2VnbWVudFNhdmVzICk7XG5jb25zb2xlLmxvZyggXCJyZW1vdmVkXCIsIHJlbW92ZWRTZWdtZW50cyApO1xuICAgICAgICBjb25zdCBzZWdtZW50RGVsZXRlcyA9IHJlbW92ZWRTZWdtZW50cy5tYXAoIGtleSA9PlxuXG4gICAgICAgICAgICB0aGlzLmRhdGEucGVybURlbGV0ZSggYXNTZWdtZW50RmlsZW5hbWUoIG5hbWUsIGtleSApIClcblxuICAgICAgICApO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCggc2VnbWVudERlbGV0ZXMgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYSBwcm9qZWN0IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2Ugb2YgcHJvamVjdCB7IHtvYmplY3R9IG1ldGFkYXRhLCB7YXJyYXl9IHNlZ21lbnRzIH1cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkUHJvamVjdCggbmFtZSApIHtcblxuICAgICAgICBjb25zdCB7IG1ldGFkYXRhLCBpbmRleCB9ID0gYXdhaXQgdGhpcy5kYXRhLmxvYWQoIGZpbGVuYW1lKCBuYW1lICkgKTtcbiAgICAgICAgY29uc3Qgc2VnbWVudExvYWRzID0gT2JqZWN0LmtleXMoIGluZGV4ICkubWFwKCBuYW1lID0+IHRoaXMuZGF0YS5sb2FkKCBpbmRleFsgbmFtZSBdICkgKTtcbiAgICAgICAgY29uc3QgbG9hZGVkID0gYXdhaXQgUHJvbWlzZS5hbGwoIHNlZ21lbnRMb2FkcyApO1xuICAgICAgICBjb25zdCBzZWdtZW50cyA9IE9iamVjdC5rZXlzKCBpbmRleCApLnJlZHVjZSggKCBhY2MsIG5hbWUsIGkgKSA9PiAoIHtcblxuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgWyBuYW1lIF06IGxvYWRlZFsgaSBdXG5cbiAgICAgICAgfSApLCB7IH0gKTtcbiAgICAgICAgcmV0dXJuIHsgbWV0YWRhdGE6IG1ldGFkYXRhIHx8IHt9LCBzZWdtZW50cyB9O1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgcHJvamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG9mIHRoZSBwcm9qZWN0IHRvIGRlbGV0ZVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSBvZiBkZWxldGlvblxuICAgICAqL1xuICAgIGRlbGV0ZVByb2plY3QoIG5hbWUgKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5wZXJtRGVsZXRlKCBmaWxlbmFtZSggbmFtZSApICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0cyB0aGUgcHJvamVjdHMgaW4gdGhpcyByZXBvc2l0b3J5XG4gICAgICogQHJldHVybiB7b2JqZWN0fSBQcm9taXNlIG9mIGxpc3Rpbmcgb2YgcHJvamVjdCBuYW1lc1xuICAgICAqL1xuICAgIGxpc3RQcm9qZWN0cygpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxpc3QoKS50aGVuKCBsaXN0aW5nID0+IGxpc3RpbmdcbiAgICAgICAgICAgIC5tYXAoICggeyBuYW1lIH0gKSA9PiBmaWxlbmFtZVBhdHRlcm4uZXhlYyggbmFtZSApIClcbiAgICAgICAgICAgIC5maWx0ZXIoIHggPT4geCApXG4gICAgICAgICAgICAubWFwKCAoIFsgLCBuYW1lIF0gKSA9PiBuYW1lICkgKTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvc3RvcmUvUmVwby5qcyIsImNvbnN0IHJlcG9zID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHNlZ21lbnRzRm9yUHJvamVjdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCByZW1vdmVkU2VnbWVudHNGb3JQcm9qZWN0ID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgY2xvbmUgPSB4ID0+IHR5cGVvZiB4ID09PSBcInVuZGVmaW5lZFwiID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkoIHggKSApO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKCBuYW1lLCByZXBvICkge1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHJlcG9zLnNldCggdGhpcywgcmVwbyApO1xuICAgICAgICBzZWdtZW50c0ZvclByb2plY3Quc2V0KCB0aGlzLCB7fSApO1xuICAgICAgICByZW1vdmVkU2VnbWVudHNGb3JQcm9qZWN0LnNldCggdGhpcywgW10gKTtcblxuICAgIH1cblxuICAgIGFzeW5jIGRlbGV0ZVNlbGYoKSB7XG5cbiAgICAgICAgY29uc3QgcmVwbyA9IHJlcG9zLmdldCggdGhpcyApO1xuICAgICAgICBjb25zdCBzZWdtZW50cyA9IHNlZ21lbnRzRm9yUHJvamVjdC5nZXQoIHRoaXMgKTtcbiAgICAgICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzO1xuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICBjb25zdCB7IHNlZ21lbnRzIH0gPSBhd2FpdCByZXBvLmxvYWRQcm9qZWN0KCBuYW1lICk7XG4gICAgICAgICAgICByZXR1cm4gcmVwby5kZWxldGVQcm9qZWN0KCBuYW1lLCBzZWdtZW50cyApO1xuXG4gICAgICAgIH0gY2F0Y2goIGV4ICkge1xuXG4gICAgICAgICAgICBpZiAoIGV4LmNvZGUgIT09IDQwNCApIHRocm93IGV4O1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJlbW92ZVNlZ21lbnQoIG5hbWUgKSB7XG5cbiAgICAgICAgY29uc3Qgc2VnbWVudHMgPSBzZWdtZW50c0ZvclByb2plY3QuZ2V0KCB0aGlzICk7XG5cbiAgICAgICAgaWYgKCBuYW1lIGluIHNlZ21lbnRzIClcbiAgICAgICAge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyggXCJSZW1vdmluZ1wiLCBuYW1lICk7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVkU2VnbWVudHMgPSByZW1vdmVkU2VnbWVudHNGb3JQcm9qZWN0LmdldCggdGhpcyApO1xuICAgICAgICAgICAgcmVtb3ZlZFNlZ21lbnRzLnB1c2goIG5hbWUgKTtcbiAgICAgICAgICAgIGRlbGV0ZSBzZWdtZW50c1sgbmFtZSBdO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNlZ21lbnQoIG5hbWUsIG1heWJlRGF0YSApIHtcblxuICAgICAgICBjb25zdCBzZWdtZW50cyA9IHNlZ21lbnRzRm9yUHJvamVjdC5nZXQoIHRoaXMgKTtcbiAgICAgICAgaWYgKCB0eXBlb2YgbWF5YmVEYXRhICE9PSBcInVuZGVmaW5lZFwiICkge1xuXG4gICAgICAgICAgICBzZWdtZW50c1sgbmFtZSBdID0gY2xvbmUoIG1heWJlRGF0YSApO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiBjbG9uZSggc2VnbWVudHNbIG5hbWUgXSApO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFzeW5jIHNhdmUoKSB7XG5cbiAgICAgICAgY29uc3QgcmVwbyA9IHJlcG9zLmdldCggdGhpcyApO1xuICAgICAgICBjb25zdCBzZWdtZW50cyA9IHNlZ21lbnRzRm9yUHJvamVjdC5nZXQoIHRoaXMgKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlZFNlZ21lbnRzID0gcmVtb3ZlZFNlZ21lbnRzRm9yUHJvamVjdC5nZXQoIHRoaXMgKTtcblxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHsgc2F2ZWQ6IERhdGUubm93KCkgfTtcbiAgICAgICAgYXdhaXQgcmVwby5zYXZlUHJvamVjdCggdGhpcy5uYW1lLCBtZXRhZGF0YSwgY2xvbmUoIHNlZ21lbnRzICksIGNsb25lKCByZW1vdmVkU2VnbWVudHMgKSApO1xuICAgICAgICByZW1vdmVkU2VnbWVudHNGb3JQcm9qZWN0LnNldCggdGhpcywgW10gKTtcblxuICAgIH1cblxuICAgIGFzeW5jIGxvYWQoKSB7XG5cbiAgICAgICAgY29uc3QgcmVwbyA9IHJlcG9zLmdldCggdGhpcyAgKTtcbiAgICAgICAgY29uc3QgeyBzZWdtZW50cyB9ID0gYXdhaXQgcmVwby5sb2FkUHJvamVjdCggdGhpcy5uYW1lICk7XG4gICAgICAgIHNlZ21lbnRzRm9yUHJvamVjdC5zZXQoIHRoaXMsIGNsb25lKCBzZWdtZW50cyApICk7XG5cbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvbW9kZWwvUHJvamVjdC5qcyIsIi8qIGdsb2JhbCBkb2N1bWVudCwgQ3VzdG9tRXZlbnQsIHdpbmRvdyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG5hc3luYyBmdW5jdGlvbiB0ZXN0U2VydmljZXMoIGUsIHNlcnZpY2VzICkge1xuXG4gICAgc2VydmljZXMuY2FwYWJpbGl0aWVzLnZlcmlmeVByb2plY3RSZXBvKCkudGhlbiggY29uc29sZS5sb2cuYmluZCggY29uc29sZSApICk7XG4gICAgd2luZG93LnggPSBzZXJ2aWNlcztcbiAgICB3aW5kb3cudGVzdFByb2plY3QgPSBhd2FpdCBzZXJ2aWNlcy5wcm9qZWN0cy5idWlsZCggXCJ0ZXN0XCIgKTtcblxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGVzdCgpIHtcblxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoIG5ldyBDdXN0b21FdmVudCggXCJsb2NhdGUtc2VydmljZXNcIiwgeyBkZXRhaWw6IHRlc3RTZXJ2aWNlcyB9ICkgKTtcblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlbGYtdGVzdC5qcyIsIi8qIGdsb2JhbCBnYXBpICovXG5cbmltcG9ydCBQcm92aWRlciBmcm9tIFwiLi9wcm92aWRlclwiO1xuXG5mdW5jdGlvbiBidWlsZElkZW50aXR5KCBwICkge1xuXG4gICAgY29uc3QgYXV0aCA9IGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCk7XG4gICAgY29uc3Qgc2lnbmVkSW4gPSBhdXRoLmlzU2lnbmVkSW4uZ2V0KCk7XG4gICAgY29uc3QgcHJvZmlsZSA9IHNpZ25lZEluID8gYXV0aC5jdXJyZW50VXNlci5nZXQoKS5nZXRCYXNpY1Byb2ZpbGUoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBuYW1lID0gKCBzaWduZWRJbiAmJiBwcm9maWxlICkgPyBwcm9maWxlLmdldE5hbWUoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB1c2VySWQgPSAoIHNpZ25lZEluICYmIHByb2ZpbGUgKSA/IHByb2ZpbGUuZ2V0RW1haWwoKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm92aWRlciA9IE9iamVjdC5hc3NpZ24oIHAuZGVzY3JpYmUoKSwgcC5zdGF0dXMoKSApO1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgcHJvdmlkZXIsIHNpZ25lZEluLCB1c2VySWQsIG5hbWUsXG5cbiAgICB9O1xuXG59XG5cbmZ1bmN0aW9uIHNpZ25vdXQoIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIGNvbnN0IGF1dGggPSBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpO1xuICAgIHJldHVybiBhdXRoLnNpZ25PdXQoKS50aGVuKCByZXNvbHZlLCByZWplY3QgKTtcblxufVxuXG5mdW5jdGlvbiBzaWduaW4oIHJlc29sdmUsIHJlamVjdCApIHtcblxuICAgIGNvbnN0IGF1dGggPSBnYXBpLmF1dGgyLmdldEF1dGhJbnN0YW5jZSgpO1xuICAgIGF1dGguc2lnbkluKCkudGhlbihcblxuICAgICAgICAoKSA9PiByZXNvbHZlKCBEYXRlLm5vdygpICksXG4gICAgICAgIHggPT4gcmVqZWN0KCB4LmVycm9yIHx8IHggKVxuXG4gICAgKTtcblxufVxuXG5jbGFzcyBHb29nbGVJZGVudGl0eSBleHRlbmRzIFByb3ZpZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKCBcIllvdXIgR29vZ2xlIGlkZW50aXR5IChlLmcuIGdtYWlsKVwiICk7XG5cbiAgICB9XG5cbiAgICBjdXJyZW50KCkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiByZXNvbHZlKCBidWlsZElkZW50aXR5KCB0aGlzICkgKSApO1xuXG4gICAgfVxuXG4gICAgYXV0aG9yaXplKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoIHNpZ25pbiApO1xuXG4gICAgfVxuXG4gICAgZGVhdXRob3JpemUoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggc2lnbm91dCApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHb29nbGVJZGVudGl0eSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2dhcGkvR29vZ2xlSWRlbnRpdHkuanMiLCIvKiBnbG9iYWwgZmV0Y2ggKi9cblxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCIuL3Byb3ZpZGVyXCI7XG5pbXBvcnQgRGF0YSBmcm9tIFwiLi9zdG9yZS9EYXRhXCI7XG5pbXBvcnQgUmVwbyBmcm9tIFwiLi9zdG9yZS9SZXBvXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7IGxvZywgbG9nRXJyb3IgfSBmcm9tIFwiLi4vZGlhZ25vc3RpY3NcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuLi9tb2RlbC9Qcm9qZWN0XCI7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSBcIi4vR29vZ2xlUHJvamVjdHNcIjtcblxuY29uc3QgeyBhcHBOYW1lIH0gPSBjb25maWc7XG5jb25zdCBzdG9yYWdlVmVyaWZpY2F0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBwcm9qZWN0c1ZlcmlmaWNhdGlvbnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgY2FjaGVkVmVyaWZpY2F0aW9uID0gKCBvd25lciwgdmVyaWZpY2F0aW9ucywgdmVyaWZ5ICkgPT4gdmVyaWZpY2F0aW9ucy5nZXQoIG93bmVyICkgfHwgdmVyaWZpY2F0aW9ucy5zZXQoIG93bmVyLCB2ZXJpZnkoKSApLmdldCggb3duZXIgKTtcblxuY29uc3QgdGVzdE5hbWUgPSBgX190ZXN0XyR7YXBwTmFtZX1gO1xuY29uc3Qgc2FtZUl0ZW1zID0gKCBhcywgYnMgKSA9PiBhcy5sZW5ndGggPT09IGJzLmxlbmd0aCAmJiBhcy5ldmVyeSggeCA9PiB+YnMuaW5kZXhPZiggeCApICk7XG5jb25zdCBzYW1lSlNPTiA9ICggYSwgYiApID0+IEpTT04uc3RyaW5naWZ5KCBhICkgPT09IEpTT04uc3RyaW5naWZ5KCBiICk7XG5jb25zdCBzdWZmaXg9ICggeCwgc3VmZml4ZXMgKSA9PiBzdWZmaXhlcy5tYXAoIHAgPT4gYCR7eH1fXyR7cH1gICk7XG5cbmZ1bmN0aW9uIGV4cGVjdDQwOUVycm9yKCBlcnIgKSB7XG5cbiAgICBpZiAoIGVyci5jb2RlICE9PSA0MDkgKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBgRXhwZWN0ZWQgYSA0MDkgcmVqZWN0aW9uIG9mIG5vbi1vdmVyd3JpdGUgcmVxdWVzdCwgYnV0IGdvdCAke2Vycn1gICk7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gcHJvbWlzZUFsbFRydXRoeSggcHJvbWlzZXMgKSB7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIHByb21pc2VzLm1hcCggcCA9PiBwLmNhdGNoKCBsb2dFcnJvciApICkgKS50aGVuKCAoIHJlc3VsdHMgKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmFpbHMgPSByZXN1bHRzLm1hcCggKCB4LCBpICkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIHggKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlc1sgaSBdO1xuXG4gICAgICAgIH0gKS5maWx0ZXIoIHggPT4geCApO1xuICAgICAgICByZXR1cm4gZmFpbHMubGVuZ3RoID8gUHJvbWlzZS5yZWplY3QoIGZhaWxzICkgOiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIH0gKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlDYW5TdG9yZSggZGF0YSwgdGVzdE5hbWUsIHRlc3RDb250ZW50ICkge1xuXG4gICAgY29uc3Qgb3ZlcndyaXRlVGVzdE5hbWUgPSBgJHt0ZXN0TmFtZX0tcHJlZXhpc3RpbmdgO1xuICAgIHJldHVybiBwcm9taXNlQWxsVHJ1dGh5KCBbXG5cbiAgICAgICAgZGF0YS5zYXZlKCB0ZXN0TmFtZSwgdGVzdENvbnRlbnQgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IGRhdGEubG9hZCggdGVzdE5hbWUgKSApXG4gICAgICAgICAgICAudGhlbiggY29udGVudCA9PiBzYW1lSlNPTiggdGVzdENvbnRlbnQsIGNvbnRlbnQgKSApLFxuXG4gICAgICAgIGRhdGEuc2F2ZSggb3ZlcndyaXRlVGVzdE5hbWUsIDQyIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiBkYXRhLnNhdmUoIG92ZXJ3cml0ZVRlc3ROYW1lLCA0MiwgeyBvdmVyd3JpdGU6IGZhbHNlIH0gKSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBcIkZhaWxlZCB0byByZWplY3Qgbm9uLW92ZXJ3cml0ZSByZXF1ZXN0XCIgKTtcblxuICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAuY2F0Y2goIGV4cGVjdDQwOUVycm9yIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB0cnVlIClcblxuICAgIF0gKS5jYXRjaCggKCkgPT4gZmFsc2UgKTtcblxufVxuXG5mdW5jdGlvbiBkZWxldGVMaXN0aW5nKCBkYXRhLCBsaXN0aW5nICkge1xuXG4gICAgcmV0dXJuIHByb21pc2VBbGxUcnV0aHkoIGxpc3RpbmcubWFwKCB4ID0+IGRhdGEucGVybURlbGV0ZSggeCApICkgKTtcblxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUR1bW1pZXMoIGRhdGEsIG5hbWVzICkge1xuXG4gICAgcmV0dXJuIHByb21pc2VBbGxUcnV0aHkoIG5hbWVzLm1hcCggeCA9PiBkYXRhLnNhdmUoIHgsIFwiaGVsbG8sIGR1bW15XCIgKSApICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5RGF0YUNhbkxpc3QoIGRhdGEsIHRlc3ROYW1lICkge1xuXG4gICAgY29uc3QgbGlzdFRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19saXN0YDtcbiAgICBjb25zdCBsaXN0VGVzdE5hbWVzID0gc3VmZml4KCBsaXN0VGVzdE5hbWUsIFsgMSwgMiwgMyBdICk7XG4gICAgcmV0dXJuIGRhdGEubGlzdCggbGlzdFRlc3ROYW1lIClcbiAgICAgICAgLnRoZW4oIGxpc3RpbmcgPT4gZGVsZXRlTGlzdGluZyggZGF0YSwgbGlzdGluZyApIClcbiAgICAgICAgLnRoZW4oICgpID0+IGdlbmVyYXRlRHVtbWllcyggZGF0YSwgbGlzdFRlc3ROYW1lcyApIClcbiAgICAgICAgLnRoZW4oICgpID0+IGRhdGEubGlzdCggbGlzdFRlc3ROYW1lICkgKVxuICAgICAgICAudGhlbiggbGlzdGluZyA9PiBzYW1lSXRlbXMoIGxpc3RpbmcubWFwKCB4ID0+IHgubmFtZSApLCBsaXN0VGVzdE5hbWVzICkgKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlEYXRhQ2FuRGVsZXRlKCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIGNvbnN0IGRlbGV0ZVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19kZWxldGVgO1xuICAgIHJldHVybiBkYXRhLnNhdmUoIGRlbGV0ZVRlc3ROYW1lLCBcInN0dWZmXCIgKVxuICAgICAgICAudGhlbiggZmlsZVNwZWMgPT4gZGF0YS5wZXJtRGVsZXRlKCBmaWxlU3BlYyApLnRoZW4oICgpID0+IGRhdGEubG9hZCggZmlsZVNwZWMgKSApIClcbiAgICAgICAgLmNhdGNoKCBlcnIgPT4gbG9nRXJyb3IoIGVyciApIHx8IFByb21pc2UucmVzb2x2ZSggZXJyLmNvZGUgPT09IDQwNCApICk7XG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlQWxsKCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIHJldHVybiBkYXRhLmxpc3QoIHRlc3ROYW1lIClcbiAgICAgICAgLnRoZW4oIGxpc3RpbmcgPT4gcHJvbWlzZUFsbFRydXRoeSggbGlzdGluZy5tYXAoIHggPT4gZGF0YS5wZXJtRGVsZXRlKCB4ICkgKSApICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5RGF0YSggZGF0YSwgdGVzdE5hbWUsIHRlc3RDb250ZW50ICkge1xuXG4gICAgY29uc3QgZGF0YVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19kYXRhYDtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGNhbkxpc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuU3RvcmU6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlOiB1bmRlZmluZWQsXG4gICAgICAgIGNhbkdldDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgcmV0dXJuIHZlcmlmeUNhblN0b3JlKCBkYXRhLCBkYXRhVGVzdE5hbWUsIHRlc3RDb250ZW50IClcbiAgICAgICAgLnRoZW4oICggY2FuU3RvcmUgKSA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5jYW5TdG9yZSA9IHJlc3VsdC5jYW5HZXQgPSBjYW5TdG9yZTtcbiAgICAgICAgICAgIGlmICggIWNhblN0b3JlICkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICAgICAgICAgIHZlcmlmeURhdGFDYW5MaXN0KCBkYXRhLCBkYXRhVGVzdE5hbWUgKSxcbiAgICAgICAgICAgICAgICB2ZXJpZnlEYXRhQ2FuRGVsZXRlKCBkYXRhLCBkYXRhVGVzdE5hbWUgKVxuXG4gICAgICAgICAgICBdICkudGhlbiggKCBbIGNhbkxpc3QsIGNhbkRlbGV0ZSBdICkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmNhbkxpc3QgPSBjYW5MaXN0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC5jYW5EZWxldGUgPSBjYW5EZWxldGU7XG5cbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICB9IClcbiAgICAgICAgLnRoZW4oICgpID0+IHJlc3VsdCApO1xuXG59XG5cbmNvbnN0IGVxdWFsc0pTT04gPSAoIHgsIHkgKSA9PiBKU09OLnN0cmluZ2lmeSggeCApID09PSBKU09OLnN0cmluZ2lmeSggeSApO1xuXG5hc3luYyBmdW5jdGlvbiB2ZXJpZnlQcm9qZWN0c09wZXJhdGlvbnMoKSB7XG5cbiAgICBjb25zdCByZXBvVGVzdE5hbWUgPSBgJHt0ZXN0TmFtZX1fX3JlcG9gO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcblxuICAgICAgICBjYW5MaXN0UHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuQ3JlYXRlUHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlUHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuU2F2ZURhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuTG9hZERhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlRGF0YTogdW5kZWZpbmVkXG5cbiAgICB9O1xuICAgIGNvbnN0IGJ1aWxkVGVzdFByb2plY3RzID0gc3VmZml4KCByZXBvVGVzdE5hbWUsIFsgMSwgMiBdICkubWFwKCB4ID0+IHByb2plY3RzLmJ1aWxkKCB4ICkgKTtcbiAgICBjb25zdCB0ZXN0UHJvamVjdHMgPSBhd2FpdCBQcm9taXNlLmFsbCggYnVpbGRUZXN0UHJvamVjdHMgKTtcbiAgICBjb25zdCByZWNyZWF0ZVRlc3RQcm9qZWN0cyA9IHRlc3RQcm9qZWN0cy5tYXAoIHggPT4geC5kZWxldGVTZWxmKCkudGhlbiggKCkgPT4geC5zYXZlKCkgKSApO1xuICAgIHRyeSB7XG5cbiAgICAgICAgLy8gKHJlKWNyZWF0ZSBhbGwgdGVzdCBwcm9qZWN0c1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCggcmVjcmVhdGVUZXN0UHJvamVjdHMgKTtcblxuICAgICAgICAvLyBjaGVjayB0aGUgbGlzdGluZyBzaG93cyB0aGUgcHJvamVjdHNcbiAgICAgICAgcmVzdWx0LmNhbkxpc3RQcm9qZWN0cyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBsaXN0aW5nID0gYXdhaXQgcHJvamVjdHMubGlzdCgpO1xuICAgICAgICByZXN1bHQuY2FuTGlzdFByb2plY3RzID0gdGVzdFByb2plY3RzLmV2ZXJ5KCBwID0+IH5saXN0aW5nLmluZGV4T2YoIHAubmFtZSApICk7XG4gICAgICAgIGlmICggIXJlc3VsdC5jYW5MaXN0UHJvamVjdHMgICkgdGhyb3cgbmV3IEVycm9yKCBcIkNhbid0IGxpc3QvY3JlYXRlIHByb2plY3RzXCIgKTtcbiAgICAgICAgcmVzdWx0LmNhbkNyZWF0ZVByb2plY3RzID0gdHJ1ZTtcblxuICAgICAgICAvLyBkZWxldGUgb25lIG9mIHRoZW0gYW5kIGNoZWNrIGl0J3MgZ29uZVxuICAgICAgICBhd2FpdCB0ZXN0UHJvamVjdHNbIDAgXS5kZWxldGVTZWxmKCk7XG4gICAgICAgIGNvbnN0IG5ld0xpc3RpbmcgPSBhd2FpdCBwcm9qZWN0cy5saXN0KCk7XG4gICAgICAgIHJlc3VsdC5jYW5EZWxldGVQcm9qZWN0cyA9ICF+bmV3TGlzdGluZy5pbmRleE9mKCB0ZXN0UHJvamVjdHNbIDAgXS5uYW1lICk7XG4gICAgICAgIGlmICggIXJlc3VsdC5jYW5EZWxldGVQcm9qZWN0cyApIHRocm93IG5ldyBFcnJvciggXCJDYW4ndCBkZWxldGUgcHJvamVjdHNcIiApO1xuXG4gICAgICAgIC8vIGFkZCBhIHNlZ21lbnQgdG8gdGhlIHJlbWFpbmluZyBvbmVcbiAgICAgICAgY29uc3QgcmVtb2FuZXIgPSB0ZXN0UHJvamVjdHNbIDEgXTtcbiAgICAgICAgcmVtb2FuZXIuc2VnbWVudCggXCJldVwiLCB7IFwic2VudGltZW50XCI6IFwiYnllLWJ5ZVwiIH0gKTtcbiAgICAgICAgcmVtb2FuZXIuc2VnbWVudCggXCJ1a1wiLCB7IFwic2VudGltZW50XCI6IFwiaG1tbW1cIiB9ICk7XG4gICAgICAgIHJlbW9hbmVyLnNlZ21lbnQoIFwid29ybGRcIiwgeyBcInNlbnRpbWVudFwiOiBcImhlbGxvXCIgfSApO1xuICAgICAgICByZW1vYW5lci5yZW1vdmVTZWdtZW50KCBcIndvcmxkXCIgKTtcbiAgICAgICAgcmVzdWx0LmNhblNhdmVEYXRhID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHJlbW9hbmVyLnNhdmUoKTtcbiAgICAgICAgcmVzdWx0LmNhblNhdmVEYXRhID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIGJ1aWxkIGFuZCBsb2FkIGEgZHVwbGljYXRlIHByb2plY3RcbiAgICAgICAgY29uc3QgcmVtb2FuZXIyID0gYXdhaXQgcHJvamVjdHMuYnVpbGQoIHJlbW9hbmVyLm5hbWUgKTtcbiAgICAgICAgcmVzdWx0LmNhbkxvYWREYXRhID0gZmFsc2U7XG4gICAgICAgIGF3YWl0IHJlbW9hbmVyMi5sb2FkKCk7XG4gICAgICAgIHJlc3VsdC5jYW5Mb2FkRGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmVzdWx0LmNhbkxvYWREYXRhID0gKCB0eXBlb2YgcmVtb2FuZXIyLnNlZ21lbnQoIFwid29ybGRcIiApID09PSBcInVuZGVmaW5lZFwiIClcbiAgICAgICAgICAgICYmIGVxdWFsc0pTT04oIHJlbW9hbmVyMi5zZWdtZW50KCBcInVrXCIgKSwgcmVtb2FuZXIuc2VnbWVudCggXCJ1a1wiICkgKVxuICAgICAgICAgICAgJiYgZXF1YWxzSlNPTiggcmVtb2FuZXIyLnNlZ21lbnQoIFwiZXVcIiApLCByZW1vYW5lci5zZWdtZW50KCBcImV1XCIgKSApO1xuICAgICAgICByZXN1bHQuY2FuU2F2ZURhdGEgPSByZXN1bHQuY2FuTG9hZERhdGE7XG4gICAgICAgIGlmICggIXJlc3VsdC5jYW5TYXZlRGF0YSApIHRocm93IG5ldyBFcnJvciggXCJTYXZlIGFuZC9vciBMb2FkIGRhdGEgZGlkbid0IHdvcmtcIiApO1xuXG4gICAgICAgIC8vIGRlbGV0ZSBvbmUgb2YgdGhlIHNlZ21lbnRzLCBzYXZlLCB0aGVuIHJlbG9hZCB0aGUgb3JpZ2luYWwgcHJvamVjdFxuICAgICAgICByZXN1bHQuY2FuRGVsZXRlRGF0YSA9IGZhbHNlO1xuICAgICAgICByZW1vYW5lcjIucmVtb3ZlU2VnbWVudCggXCJ1a1wiICk7XG4gICAgICAgIHJlbW9hbmVyMi5yZW1vdmVTZWdtZW50KCBcImV1XCIgKTtcbiAgICAgICAgcmVtb2FuZXIyLnNlZ21lbnQoIFwiZXVcIiwgeyBcInNlbnRpbWVudFwiOiBcImhlbGxvIGFnYWluIVwiIH0gKTtcbiAgICAgICAgYXdhaXQgcmVtb2FuZXIyLnNhdmUoKTtcbiAgICAgICAgYXdhaXQgcmVtb2FuZXIubG9hZCgpO1xuICAgICAgICByZXN1bHQuY2FuRGVsZXRlRGF0YSA9ICggdHlwZW9mIHJlbW9hbmVyLnNlZ21lbnQoIFwidWtcIiApID09PSBcInVuZGVmaW5lZFwiIClcbiAgICAgICAgICAgICYmIGVxdWFsc0pTT04oIHJlbW9hbmVyLnNlZ21lbnQoIFwiZXVcIiApLCByZW1vYW5lcjIuc2VnbWVudCggXCJldVwiICkgKTtcbiAgICAgICAgaWYgKCAhcmVzdWx0LmNhbkRlbGV0ZURhdGEgKSB0aHJvdyBuZXcgRXJyb3IoIFwiRGVsZXRlIGRhdGEgZGlkbid0IHdvcmtcIiApO1xuXG4gICAgfSBjYXRjaCggZXggKSB7XG5cbiAgICAgICAgbG9nRXJyb3IoIGV4ICk7XG4gICAgICAgIHJlc3VsdC5leCA9IGV4O1xuXG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG5cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFudXBUZXN0U3RvcmFnZSggZGF0YSwgdGVzdE5hbWUgKSB7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGF3YWl0IGRlbGV0ZUFsbCggZGF0YSwgdGVzdE5hbWUgKTtcblxuICAgIH0gY2F0Y2goIGVyciApIHtcblxuICAgICAgICBsb2dFcnJvciggXCJDbGVhbmluZyB1cCBhZnRlciBzZWxmIHRlc3RcIiwgZXJyICk7XG5cbiAgICB9XG5cbn1cblxuY29uc3QgdmVyaWZ5U3RvcmFnZSA9IG93bmVyID0+IGNhY2hlZFZlcmlmaWNhdGlvbiggb3duZXIsIHN0b3JhZ2VWZXJpZmljYXRpb25zLCBhc3luYyAoKSA9PiB7XG5cbiAgICBsZXQgZGF0YTtcbiAgICB0cnkge1xuXG4gICAgICAgIGF3YWl0IG93bmVyLndhaXRGb3JMb2FkKCk7XG4gICAgICAgIGRhdGEgPSBhd2FpdCBEYXRhLmluRm9sZGVyKCBhcHBOYW1lICk7XG4gICAgICAgIGNvbnN0IHRlc3REYXRhID0gYXdhaXQgZmV0Y2goIFwiL3B1YmxpYy9kYXRhL25vdHNoYWthLmpzb25cIiApLnRoZW4oIHJlcyA9PiByZXMuanNvbigpIClcbiAgICAgICAgcmV0dXJuIGF3YWl0IHZlcmlmeURhdGEoIGRhdGEsIHRlc3ROYW1lLCB0ZXN0RGF0YSApLmNhdGNoKCBsb2dFcnJvciApO1xuXG4gICAgfSBmaW5hbGx5IHtcblxuICAgICAgICBsb2coIFwiVmVyaWZ5IGFsbCBzdG9yYWdlIGNvbXBsZXRlIC0gY2xlYW5pbmcgdXAgdGVzdCBzdG9yYWdlXCIgKTtcbiAgICAgICAgYXdhaXQgY2xlYW51cFRlc3RTdG9yYWdlKCBkYXRhLCB0ZXN0TmFtZSApO1xuXG4gICAgfVxuXG59ICk7XG5cbmNvbnN0IHZlcmlmeVByb2plY3RzID0gb3duZXIgPT4gY2FjaGVkVmVyaWZpY2F0aW9uKCBvd25lciwgcHJvamVjdHNWZXJpZmljYXRpb25zLCBhc3luYyAoKSA9PiB7XG5cbiAgICBsZXQgZGF0YTtcbiAgICB0cnkge1xuXG4gICAgICAgIGF3YWl0IG93bmVyLndhaXRGb3JMb2FkKCk7XG4gICAgICAgIGRhdGEgPSBhd2FpdCBEYXRhLmluRm9sZGVyKCBhcHBOYW1lICk7XG4gICAgICAgIHJldHVybiBhd2FpdCB2ZXJpZnlQcm9qZWN0c09wZXJhdGlvbnMoIHByb2plY3RzLCB0ZXN0TmFtZSApLmNhdGNoKCBsb2dFcnJvciApO1xuXG4gICAgfSBmaW5hbGx5IHtcblxuICAgICAgICBsb2coIFwiVmVyaWZ5IHByb2plY3RzIGNvbXBsZXRlIC0gY2xlYW5pbmcgdXAgdGVzdCBzdG9yYWdlXCIsIG93bmVyICk7XG4gICAgICAgIGF3YWl0IGNsZWFudXBUZXN0U3RvcmFnZSggZGF0YSwgdGVzdE5hbWUgKTtcblxuICAgIH1cblxufSApO1xuXG5jbGFzcyBHb29nbGVDYXBhYmlsaXRpZXMgZXh0ZW5kcyBQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciggXCJZb3VyIEdvb2dsZSBEcml2ZSBzdG9yYWdlXCIgKTtcblxuICAgIH1cblxuICAgIGFzeW5jIGNsZWFyKCkge1xuXG4gICAgICAgIGF3YWl0IHN0b3JhZ2VWZXJpZmljYXRpb25zLmRlbGV0ZSggdGhpcyApO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5TGlzdCgpIHtcblxuICAgICAgICBjb25zdCB7IGNhbkxpc3QgfSA9IGF3YWl0IHZlcmlmeVN0b3JhZ2UoIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuICEhY2FuTGlzdDtcblxuICAgIH1cblxuICAgIGFzeW5jIHZlcmlmeVN0b3JlKCkge1xuXG4gICAgICAgIGNvbnN0IHsgY2FuU3RvcmUgfSA9IGF3YWl0IHZlcmlmeVN0b3JhZ2UoIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuICEhY2FuU3RvcmU7XG5cbiAgICB9XG5cbiAgICBhc3luYyB2ZXJpZnlHZXQoKSB7XG5cbiAgICAgICAgY29uc3QgeyBjYW5HZXQgfSA9IGF3YWl0IHZlcmlmeVN0b3JhZ2UoIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuICEhY2FuR2V0O1xuXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5RGVsZXRlKCkge1xuXG4gICAgICAgIGNvbnN0IHsgY2FuRGVsZXRlIH0gPSBhd2FpdCB2ZXJpZnlTdG9yYWdlKCB0aGlzICk7XG4gICAgICAgIHJldHVybiAhIWNhbkRlbGV0ZTtcblxuICAgIH1cblxuICAgIGFzeW5jIHZlcmlmeVByb2plY3RzKCkge1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RzID0gYXdhaXQgdmVyaWZ5UHJvamVjdHMoIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHb29nbGVDYXBhYmlsaXRpZXMoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9Hb29nbGVDYXBhYmlsaXRpZXMuanMiLCIvKiBnbG9iYWwgZ2FwaSAqL1xuXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcIi4vcHJvdmlkZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IERhdGEgZnJvbSBcIi4vc3RvcmUvRGF0YVwiO1xuaW1wb3J0IFJlcG8gZnJvbSBcIi4vc3RvcmUvUmVwb1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4uL21vZGVsL1Byb2plY3RcIjtcbmNvbnN0IHsgYXBwTmFtZSB9ID0gY29uZmlnO1xuXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplUmVwbygpIHtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBEYXRhLmluRm9sZGVyKCBhcHBOYW1lICk7XG4gICAgcmV0dXJuIG5ldyBSZXBvKCBkYXRhICk7XG5cbn1cblxuY2xhc3MgR29vZ2xlUHJvamVjdHMgZXh0ZW5kcyBQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciggXCJQcm9qZWN0cyBiYXNlZCBvbiBnb29nbGUgZHJpdmVcIiApO1xuICAgICAgICB0aGlzLnJlcG8gPSB0aGlzLndhaXRGb3JMb2FkKCkudGhlbiggaW5pdGlhbGl6ZVJlcG8gKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBhc3luY1xuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIHByb2plY3RzIHN0b3JlZCBpbiBnb29nbGUgZHJpdmVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheT59IGxpc3Qgb2YgcHJvamVjdCBuYW1lc1xuICAgICAqL1xuICAgIGFzeW5jIGxpc3QoKSB7XG5cbiAgICAgICAgY29uc3QgcmVwbyA9IGF3YWl0IHRoaXMucmVwbztcbiAgICAgICAgcmV0dXJuIHJlcG8ubGlzdFByb2plY3RzKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgYSBwcm9qZWN0IG9iamVjdFxuICAgICAqIE5vdGUgdGhhdCB0aGlzIGlzbid0IG5lY2Vzc2FyaWx5IGxvYWRlZCBvciBzYXZlZCB5ZXRcbiAgICAgKi9cbiAgICBhc3luYyBidWlsZCggbmFtZSApIHtcblxuICAgICAgICBjb25zdCByZXBvID0gYXdhaXQgdGhpcy5yZXBvO1xuICAgICAgICByZXR1cm4gbmV3IFByb2plY3QoIG5hbWUsIHJlcG8gKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgR29vZ2xlUHJvamVjdHMoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL0dvb2dsZVByb2plY3RzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==