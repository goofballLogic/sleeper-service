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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

var _tinyEmitter = __webpack_require__(4);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _localStore = __webpack_require__(11);

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

var _providerBase = __webpack_require__(15);

var _providerBase2 = _interopRequireDefault(_providerBase);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _shared = __webpack_require__(16);

var _diagnostics = __webpack_require__(3);

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
/* global window */
exports.default = window["sleeper-service-config"];

/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global gapi */

var _diagnostics = __webpack_require__(3);

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
/* 6 */
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
     * @param {array} removedSegments which have been removed and should be purged from the underlying storage
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
                                segmentSaves = Object.keys(index).map(function (segmentName) {
                                    return _this.data.save(index[segmentName], segments[segmentName], { overwrite: true });
                                });
                                _context.next = 7;
                                return Promise.all(segmentSaves);

                            case 7:
                                segmentDeletes = removedSegments.map(function (key) {
                                    return _this.data.permDelete(asSegmentFilename(name, key));
                                });
                                _context.next = 10;
                                return Promise.all(segmentDeletes);

                            case 10:
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
                                segmentLoads = Object.keys(index).map(function (segmentName) {
                                    return _this2.data.load(index[segmentName]);
                                });
                                _context2.next = 8;
                                return Promise.all(segmentLoads);

                            case 8:
                                loaded = _context2.sent;
                                segments = Object.keys(index).reduce(function (acc, segmentName, i) {
                                    return _extends({}, acc, _defineProperty({}, segmentName, loaded[i]));
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
/* 7 */
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
                var repo, name, _ref2, segments;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                repo = repos.get(this);
                                name = this.name;
                                _context.prev = 2;
                                _context.next = 5;
                                return repo.loadProject(name);

                            case 5:
                                _ref2 = _context.sent;
                                segments = _ref2.segments;
                                return _context.abrupt("return", repo.deleteProject(name, segments));

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context["catch"](2);

                                if (!(_context.t0.code !== 404)) {
                                    _context.next = 14;
                                    break;
                                }

                                throw _context.t0;

                            case 14:
                                return _context.abrupt("return", Promise.resolve());

                            case 15:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 10]]);
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
            }
            return clone(segments[name]);
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
/* 8 */
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

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _Data = __webpack_require__(5);

var _Data2 = _interopRequireDefault(_Data);

var _Repo = __webpack_require__(6);

var _Repo2 = _interopRequireDefault(_Repo);

var _Project = __webpack_require__(7);

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
         * @param {string} name The name of the project
         * @returns {Promise<Project>} project once the repo is ready
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _identity = __webpack_require__(10);

var _identity2 = _interopRequireDefault(_identity);

var _capabilities = __webpack_require__(12);

var _capabilities2 = _interopRequireDefault(_capabilities);

var _projects = __webpack_require__(13);

var _projects2 = _interopRequireDefault(_projects);

var _GoogleIdentity = __webpack_require__(14);

var _GoogleIdentity2 = _interopRequireDefault(_GoogleIdentity);

var _GoogleCapabilities = __webpack_require__(17);

var _GoogleCapabilities2 = _interopRequireDefault(_GoogleCapabilities);

var _GoogleProjects = __webpack_require__(8);

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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window */
exports.default = window.localStorage;

/***/ }),
/* 12 */
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
                                return _context2.abrupt("return", {
                                    canListProjects: canListProjects, canDeleteProjects: canDeleteProjects, canCreateProjects: canCreateProjects, canLoadData: canLoadData, canSaveData: canSaveData, canDeleteData: canDeleteData
                                });

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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = __webpack_require__(4);

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
/* 16 */
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
/* 17 */
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
                        repoTestName = testNamePrefix + "__repo";
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

                        remoaner.segment("eu", { sentiment: "bye-bye" });
                        remoaner.segment("uk", { sentiment: "hmmmm" });
                        remoaner.segment("world", { sentiment: "hello" });
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
                        remoaner2.segment("eu", { sentiment: "hello again!" });
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

var _Data = __webpack_require__(5);

var _Data2 = _interopRequireDefault(_Data);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _diagnostics = __webpack_require__(3);

var _GoogleProjects = __webpack_require__(8);

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

var testNamePrefix = "__test_" + appName;
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
                        return verifyData(data, testNamePrefix, testData).catch(_diagnostics.logError);

                    case 12:
                        return _context3.abrupt("return", _context3.sent);

                    case 13:
                        _context3.prev = 13;


                        (0, _diagnostics.log)("Verify all storage complete - cleaning up test storage");
                        _context3.next = 17;
                        return cleanupTestStorage(data, testNamePrefix);

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
                        return verifyProjectsOperations(_GoogleProjects2.default, testNamePrefix).catch(_diagnostics.logError);

                    case 9:
                        return _context4.abrupt("return", _context4.sent);

                    case 10:
                        _context4.prev = 10;


                        (0, _diagnostics.log)("Verify projects complete - cleaning up test storage", owner);
                        _context4.next = 14;
                        return cleanupTestStorage(data, testNamePrefix);

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
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                return _context10.abrupt("return", _verifyProjects(this));

                            case 1:
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDNmODM4NzgyMjVjNmViMGY5NmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlcnZpY2VzL3NlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGlhZ25vc3RpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2FwaS9zdG9yZS9EYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL3N0b3JlL1JlcG8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZGVsL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvR29vZ2xlUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VudHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zZXJ2aWNlcy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvbG9jYWwtc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VydmljZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvR29vZ2xlSWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3Byb3ZpZGVyLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dhcGkvc2hhcmVkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9nYXBpL0dvb2dsZUNhcGFiaWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2VsZi10ZXN0LmpzIl0sIm5hbWVzIjpbInByb3ZpZGVycyIsIldlYWtNYXAiLCJjaG9zZW5LZXlzIiwiZmluZFByb3ZpZGVyIiwib3duZXIiLCJjaG9zZW5LZXkiLCJnZXQiLCJjaG9zZW4iLCJnZXRJdGVtIiwiZmluZCIsIngiLCJrZXkiLCJTZXJ2aWNlIiwiYXZhaWxhYmxlUHJvdmlkZXJzIiwicmVxdWlyZWRGdW5jdGlvbnMiLCJmb3JFYWNoIiwicCIsInZlcmlmeUludGVyZmFjZSIsInNldCIsInByb3ZpZGVyIiwibWFwIiwiZGVzY3JpYmUiLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJyZXNvbHZlIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJsb2FkRmxhZyIsImxvYWRFcnJvciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImdhcGkiLCJ0aGVuIiwiY2F0Y2giLCJleCIsIndhaXRGb3IiLCJjb25kaXRpb24iLCJ0aW1lb3V0IiwiZGVzY3JpcHRpb24iLCJuZXdUaW1lb3V0Iiwic2V0VGltZW91dCIsIlByb3ZpZGVyIiwibG9hZGVkIiwid2luZG93IiwidW5kZWZpbmVkIiwibG9nIiwiY29uc29sZSIsImJpbmQiLCJsb2dFcnJvciIsImVycm9yIiwiRSIsInByb3RvdHlwZSIsIm9uIiwibmFtZSIsImNhbGxiYWNrIiwiY3R4IiwiZSIsInB1c2giLCJmbiIsIm9uY2UiLCJzZWxmIiwibGlzdGVuZXIiLCJvZmYiLCJhcHBseSIsImFyZ3VtZW50cyIsIl8iLCJlbWl0IiwiZGF0YSIsInNsaWNlIiwiY2FsbCIsImV2dEFyciIsImkiLCJsZW4iLCJsZW5ndGgiLCJldnRzIiwibGl2ZUV2ZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiLCJmaWxlc0FQSSIsInVwbG9hZEFQSSIsImZvbGRlck1pbWVUeXBlIiwiYm91bmRhcnkiLCJtdWx0aVBhcnRNaW1lVHlwZSIsImRhdGFNaW1lVHlwZSIsIkpTT05jb250ZW50VHlwZSIsIkZpbGVTcGVjIiwiaWQiLCJ0aGluZyIsImNvdW50ZXIiLCJyZXF1ZXN0Iiwib3B0aW9ucyIsImRlZmF1bHRlZE9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJtZXRob2QiLCJwYXRoIiwiY2xpZW50IiwiY3JlYXRlRm9sZGVyIiwibWltZVR5cGUiLCJib2R5IiwiZmlyc3RPck51bGwiLCJsaXN0IiwidHJhbnNmb3JtIiwiZW5zdXJlRm9sZGVyIiwicSIsInBhcmFtcyIsInJlcyIsInJlc3VsdCIsImZpbGVzIiwibWF5YmVGb2xkZXIiLCJidWlsZCIsImR1bWJEb3duUHJlZml4IiwicHJlZml4IiwicmV0IiwiZGFzaEluZGV4IiwiaW5kZXhPZiIsInN1YnN0cmluZyIsImxpc3RGaWxlc0luRm9sZGVyIiwiZm9sZGVyIiwibWF5YmVQcmVmaXgiLCJuYW1lRmlsdGVyIiwiYXBpUHJlZml4IiwicGFnZVNpemUiLCJmaWx0ZXIiLCJmaW5kRmlsZUluRm9sZGVyIiwibWF5YmVTcGVjIiwiZmlsZSIsIkpTT05wYXJ0Iiwib2JqIiwiSlNPTiIsInN0cmluZ2lmeSIsIm11bHRpcGFydCIsInBhcnRTdGFydCIsInBhcnRFbmQiLCJwYXJ0cyIsImpvaW4iLCJjcmVhdGVJbkZvbGRlciIsImhlYWRlcnMiLCJ1cGxvYWRUeXBlIiwibWV0YWRhdGEiLCJwYXJlbnRzIiwidXBkYXRlSW5Gb2xkZXIiLCJ0aHJvd0FscmVhZHlFeGlzdHMiLCJlcnIiLCJjb2RlIiwic2F2ZUluRm9sZGVyIiwib3ZlcndyaXRlIiwibWF5YmVGaWxlIiwibG9hZEZyb21Gb2xkZXIiLCJhbHQiLCJkZWxldGVGcm9tRm9sZGVyIiwiY2xlYW5VcEVycm9yIiwiY2xlYW5FcnJvciIsInN0YXR1c1RleHQiLCJzdGF0dXMiLCJEYXRhIiwiZm9sZGVyTmFtZSIsImZvbGRlclNwZWMiLCJmaWxlbmFtZSIsImFzU2VnbWVudEZpbGVuYW1lIiwiZmlsZW5hbWVQYXR0ZXJuIiwiUmVwbyIsInNlZ21lbnRzIiwicmVtb3ZlZFNlZ21lbnRzIiwiaW5kZXgiLCJrZXlzIiwicmVkdWNlIiwiYWNjIiwicHJvamVjdCIsInNhdmUiLCJzZWdtZW50U2F2ZXMiLCJzZWdtZW50TmFtZSIsImFsbCIsInNlZ21lbnREZWxldGVzIiwicGVybURlbGV0ZSIsImxvYWQiLCJzZWdtZW50TG9hZHMiLCJsaXN0aW5nIiwiZXhlYyIsInJlcG9zIiwic2VnbWVudHNGb3JQcm9qZWN0IiwicmVtb3ZlZFNlZ21lbnRzRm9yUHJvamVjdCIsImNsb25lIiwicGFyc2UiLCJQcm9qZWN0IiwicmVwbyIsImxvYWRQcm9qZWN0IiwiZGVsZXRlUHJvamVjdCIsIm1heWJlRGF0YSIsInNhdmVkIiwiRGF0ZSIsIm5vdyIsInNhdmVQcm9qZWN0IiwiaW5Gb2xkZXIiLCJhcHBOYW1lIiwiaW5pdGlhbGl6ZVJlcG8iLCJHb29nbGVQcm9qZWN0cyIsIndhaXRGb3JMb2FkIiwibGlzdFByb2plY3RzIiwiZGV0YWlsIiwiaWRlbnRpdHkiLCJjYXBhYmlsaXRpZXMiLCJwcm9qZWN0cyIsIklkZW50aXR5U2VydmljZSIsImVuc3VyZVByb3ZpZGVyIiwiY3VycmVudCIsImF1dGhvcml6ZSIsImRlYXV0aG9yaXplIiwibG9jYWxTdG9yYWdlIiwiQ2FwYWJpbGl0aWVzU2VydmljZSIsImNsZWFyIiwidmVyaWZ5TGlzdCIsInZlcmlmeVN0b3JlIiwidmVyaWZ5R2V0IiwidmVyaWZ5RGVsZXRlIiwiY2FuTGlzdCIsImNhblN0b3JlIiwiY2FuR2V0IiwiY2FuRGVsZXRlIiwidmVyaWZ5UHJvamVjdHMiLCJjYW5MaXN0UHJvamVjdHMiLCJjYW5EZWxldGVQcm9qZWN0cyIsImNhbkNyZWF0ZVByb2plY3RzIiwiY2FuTG9hZERhdGEiLCJjYW5TYXZlRGF0YSIsImNhbkRlbGV0ZURhdGEiLCJQcm9qZWN0c1NlcnZpY2UiLCJidWlsZElkZW50aXR5IiwiYXV0aCIsImF1dGgyIiwiZ2V0QXV0aEluc3RhbmNlIiwic2lnbmVkSW4iLCJpc1NpZ25lZEluIiwicHJvZmlsZSIsImN1cnJlbnRVc2VyIiwiZ2V0QmFzaWNQcm9maWxlIiwiZ2V0TmFtZSIsInVzZXJJZCIsImdldEVtYWlsIiwic2lnbm91dCIsInNpZ25PdXQiLCJzaWduaW4iLCJzaWduSW4iLCJHb29nbGVJZGVudGl0eSIsImNvbnN0cnVjdG9yIiwiZnVuY3Rpb25zIiwiZnVuYyIsIm1heWJlRnVuY3Rpb24iLCJpbml0IiwiU0NPUEVTIiwiaW5pdEF1dGhDbGllbnQiLCJjb25maWciLCJhcGlLZXkiLCJBUElfS0VZIiwiY2xpZW50SWQiLCJDTElFTlRfSUQiLCJzY29wZSIsInRyeUluaXRBdXRoQ2xpZW50IiwibmFnYSIsInJlcG9UZXN0TmFtZSIsInRlc3ROYW1lUHJlZml4IiwiYnVpbGRUZXN0UHJvamVjdHMiLCJzdWZmaXgiLCJ0ZXN0UHJvamVjdHMiLCJyZWNyZWF0ZVRlc3RQcm9qZWN0cyIsImRlbGV0ZVNlbGYiLCJldmVyeSIsIm5ld0xpc3RpbmciLCJyZW1vYW5lciIsInNlZ21lbnQiLCJzZW50aW1lbnQiLCJyZW1vdmVTZWdtZW50IiwicmVtb2FuZXIyIiwiZXF1YWxzSlNPTiIsInZlcmlmeVByb2plY3RzT3BlcmF0aW9ucyIsInRlc3ROYW1lIiwiZGVsZXRlQWxsIiwiY2xlYW51cFRlc3RTdG9yYWdlIiwic3RvcmFnZVZlcmlmaWNhdGlvbnMiLCJwcm9qZWN0c1ZlcmlmaWNhdGlvbnMiLCJjYWNoZWRWZXJpZmljYXRpb24iLCJ2ZXJpZmljYXRpb25zIiwidmVyaWZ5Iiwic2FtZUl0ZW1zIiwiYXMiLCJicyIsInNhbWVKU09OIiwiYSIsImIiLCJzdWZmaXhlcyIsImV4cGVjdDQwOUVycm9yIiwicHJvbWlzZUFsbFRydXRoeSIsInByb21pc2VzIiwicmVzdWx0cyIsImZhaWxzIiwidmVyaWZ5Q2FuU3RvcmUiLCJ0ZXN0Q29udGVudCIsIm92ZXJ3cml0ZVRlc3ROYW1lIiwiY29udGVudCIsImRlbGV0ZUxpc3RpbmciLCJnZW5lcmF0ZUR1bW1pZXMiLCJuYW1lcyIsInZlcmlmeURhdGFDYW5MaXN0IiwibGlzdFRlc3ROYW1lIiwibGlzdFRlc3ROYW1lcyIsInZlcmlmeURhdGFDYW5EZWxldGUiLCJkZWxldGVUZXN0TmFtZSIsImZpbGVTcGVjIiwidmVyaWZ5RGF0YSIsImRhdGFUZXN0TmFtZSIsInkiLCJ2ZXJpZnlTdG9yYWdlIiwiZmV0Y2giLCJqc29uIiwidGVzdERhdGEiLCJHb29nbGVDYXBhYmlsaXRpZXMiLCJkZWxldGUiLCJzZXJ2aWNlcyIsInZlcmlmeVByb2plY3RSZXBvIiwidGVzdFByb2plY3QiLCJ0ZXN0U2VydmljZXMiLCJ0ZXN0IiwiZGlzcGF0Y2hFdmVudCIsIkN1c3RvbUV2ZW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBWSxJQUFJQyxPQUFKLEVBQWxCO0FBQ0EsSUFBTUMsYUFBYSxJQUFJRCxPQUFKLEVBQW5COztBQUVBLFNBQVNFLFlBQVQsQ0FBdUJDLEtBQXZCLEVBQStCOztBQUUzQixRQUFNQyxZQUFZSCxXQUFXSSxHQUFYLENBQWdCRixLQUFoQixDQUFsQjtBQUNBLFFBQU1HLFNBQVMscUJBQU1DLE9BQU4sQ0FBZUgsU0FBZixDQUFmO0FBQ0EsV0FBT0wsV0FBVU0sR0FBVixDQUFlRixLQUFmLEVBQXVCSyxJQUF2QixDQUE2QjtBQUFBLGVBQUtDLEVBQUVDLEdBQUYsS0FBVUosTUFBZjtBQUFBLEtBQTdCLENBQVA7QUFFSDs7SUFHb0JLLE87OztBQUVqQixxQkFBYUMsa0JBQWIsRUFBaUNSLFNBQWpDLEVBQTRDUyxpQkFBNUMsRUFBZ0U7QUFBQTs7QUFBQTs7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QVNuSCxRQUFULENBQWtCNUYsS0FBbEIsQ0FBeUIsTUFBekIsQ0FKL0I7O0FBQUE7QUFJSW5FLCtCQUFPb1IsV0FKWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLOztvQkFBZUMsWTs7Ozs7a0JBT1NDLEk7Ozs7QUFBVCxTQUFTQSxJQUFULEdBQWdCOztBQUUzQnBTLGFBQVNxUyxhQUFULENBQXdCLElBQUlDLFdBQUosQ0FBaUIsaUJBQWpCLEVBQW9DLEVBQUU1SCxRQUFReUgsWUFBVixFQUFwQyxDQUF4QjtBQUVILEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDNmODM4NzgyMjVjNmViMGY5NmQiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJ0aW55LWVtaXR0ZXJcIjtcbmltcG9ydCBsb2NhbCBmcm9tIFwiLi9sb2NhbC1zdG9yZVwiO1xuXG5jb25zdCBwcm92aWRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgY2hvc2VuS2V5cyA9IG5ldyBXZWFrTWFwKCk7XG5cbmZ1bmN0aW9uIGZpbmRQcm92aWRlciggb3duZXIgKSB7XG5cbiAgICBjb25zdCBjaG9zZW5LZXkgPSBjaG9zZW5LZXlzLmdldCggb3duZXIgKTtcbiAgICBjb25zdCBjaG9zZW4gPSBsb2NhbC5nZXRJdGVtKCBjaG9zZW5LZXkgKTtcbiAgICByZXR1cm4gcHJvdmlkZXJzLmdldCggb3duZXIgKS5maW5kKCB4ID0+IHgua2V5ID09PSBjaG9zZW4gKTtcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZpY2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoIGF2YWlsYWJsZVByb3ZpZGVycywgY2hvc2VuS2V5LCByZXF1aXJlZEZ1bmN0aW9ucyApIHtcblxuICAgICAgICBzdXBlcigpO1xuICAgICAgICBhdmFpbGFibGVQcm92aWRlcnMuZm9yRWFjaCggcCA9PiBwLnZlcmlmeUludGVyZmFjZSggcmVxdWlyZWRGdW5jdGlvbnMgKSApO1xuICAgICAgICBwcm92aWRlcnMuc2V0KCB0aGlzLCBhdmFpbGFibGVQcm92aWRlcnMgKTtcbiAgICAgICAgY2hvc2VuS2V5cy5zZXQoIHRoaXMsIGNob3NlbktleSApO1xuICAgICAgICB0aGlzLnByb3ZpZGVyID0gZmluZFByb3ZpZGVyKCB0aGlzICk7XG5cbiAgICB9XG5cbiAgICBwcm92aWRlcnMoKSB7XG5cbiAgICAgICAgcmV0dXJuICggcHJvdmlkZXJzLmdldCggdGhpcyApIHx8IFtdICkubWFwKCBwID0+IHAuZGVzY3JpYmUoKSApO1xuXG4gICAgfVxuXG4gICAgZW5zdXJlUHJvdmlkZXIoKSB7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5wcm92aWRlciApIHJldHVybiBQcm9taXNlLnJlamVjdCggbmV3IEVycm9yKCBcIk5vIHByb3ZpZGVyIHNlbGVjdGVkXCIgKSApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0aGlzLnByb3ZpZGVyICk7XG5cbiAgICB9XG5cbiAgICBzZWxlY3QoIHByb3ZpZGVyICkge1xuXG4gICAgICAgIGNvbnN0IGNob3NlbktleSA9IGNob3NlbktleXMuZ2V0KCB0aGlzICk7XG4gICAgICAgIGxvY2FsLnNldEl0ZW0oIGNob3NlbktleSwgcHJvdmlkZXIua2V5ICk7XG4gICAgICAgIHRoaXMucHJvdmlkZXIgPSBmaW5kUHJvdmlkZXIoIHRoaXMgKTtcblxuICAgIH1cblxuICAgIGRlc2VsZWN0KCkge1xuXG4gICAgICAgIGNvbnN0IGNob3NlbktleSA9IGNob3NlbktleXMuZ2V0KCB0aGlzICk7XG4gICAgICAgIGxvY2FsLnJlbW92ZUl0ZW0oIGNob3NlbktleSApO1xuICAgICAgICB0aGlzLnByb3ZpZGVyID0gZmluZFByb3ZpZGVyKCB0aGlzICk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9zZXJ2aWNlLmpzIiwiLyogZ2xvYmFsIGRvY3VtZW50ICovXG5pbXBvcnQgUHJvdmlkZXJCYXNlIGZyb20gXCIuLi9wcm92aWRlci1iYXNlXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7IGluaXQgfSBmcm9tIFwiLi9zaGFyZWRcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi9kaWFnbm9zdGljc1wiO1xuXG5sZXQgbG9hZEZsYWcgPSBmYWxzZTtcbmxldCBsb2FkRXJyb3I7XG5cbmlmICggdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiICkgdGhyb3cgbmV3IEVycm9yKCBcImRvY3VtZW50IGlzIHVuZGVmaW5lZFwiICk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcImdvb2dsZS1hcGktbG9hZGVkXCIsICgpID0+IHtcblxuICAgIGluaXQoIGNvbmZpZy5nYXBpIClcbiAgICAgICAgLnRoZW4oICgpID0+IHtcblxuICAgICAgICAgICAgbG9hZEZsYWcgPSB0cnVlO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAuY2F0Y2goICggZXggKSA9PiB7XG5cbiAgICAgICAgICAgIGxvYWRFcnJvciA9IGV4O1xuXG4gICAgICAgIH0gKTtcblxufSApO1xuXG5mdW5jdGlvbiB3YWl0Rm9yKCBjb25kaXRpb24sIHRpbWVvdXQsIGRlc2NyaXB0aW9uICkge1xuXG4gICAgaWYgKCB0aW1lb3V0IDw9IDAgKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoIG5ldyBFcnJvciggYFRpbWVkIG91dCAke2Rlc2NyaXB0aW9ufWAgKSApO1xuICAgIGlmICggY29uZGl0aW9uKCkgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCB0cnVlICk7XG4gICAgY29uc3QgbmV3VGltZW91dCA9IHRpbWVvdXQgLSAxMDA7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHNldFRpbWVvdXQoXG5cbiAgICAgICAgKCkgPT4gd2FpdEZvciggY29uZGl0aW9uLCBuZXdUaW1lb3V0LCBkZXNjcmlwdGlvbiApLnRoZW4oIHJlc29sdmUsIHJlamVjdCApLFxuICAgICAgICAxMDBcblxuICAgICkgKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm92aWRlciBleHRlbmRzIFByb3ZpZGVyQmFzZSB7XG5cbiAgICBjb25zdHJ1Y3RvciggZGVzY3JpcHRpb24gKSB7XG5cbiAgICAgICAgc3VwZXIoIFwiZ2FwaVwiLCBkZXNjcmlwdGlvbiApO1xuXG4gICAgfVxuXG4gICAgc3RhdHVzKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblxuICAgICAgICByZXR1cm4geyBsb2FkZWQ6IGxvYWRGbGFnLCBsb2FkRXJyb3IgfTtcblxuICAgIH1cblxuICAgIHdhaXRGb3JMb2FkKCkge1xuXG4gICAgICAgIGlmICggbG9hZEZsYWcgKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIGxvZyggXCJQcm92aWRlciBsb2FkaW5nLi4uXCIsIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuIHdhaXRGb3IoICgpID0+IGxvYWRGbGFnLCA1MDAwICkudGhlbiggKCkgPT4ge1xuXG4gICAgICAgICAgICBsb2coIFwiUHJvdmlkZXIgbG9hZGluZyBjb21wbGV0ZVwiLCB0aGlzICk7XG5cbiAgICAgICAgfSApO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9wcm92aWRlci5qcyIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmV4cG9ydCBkZWZhdWx0IHdpbmRvd1sgXCJzbGVlcGVyLXNlcnZpY2UtY29uZmlnXCIgXTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvY29uZmlnLmpzIiwiLyogZXNsaW50IG5vLWNvbnNvbGU6IDAgKi9cbi8qIGdsb2JhbCBSb2xsYmFyICovXG5cbmV4cG9ydCBkZWZhdWx0IHVuZGVmaW5lZDtcbmV4cG9ydCBjb25zdCBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKCBjb25zb2xlICk7XG5leHBvcnQgY29uc3QgbG9nRXJyb3IgPSAoIC4uLmFyZ3MgKSA9PiB7XG5cbiAgICBSb2xsYmFyLmVycm9yKCAuLi5hcmdzICk7XG4gICAgY29uc29sZS5lcnJvciggLi4uYXJncyApO1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9kaWFnbm9zdGljcy5qcyIsImZ1bmN0aW9uIEUgKCkge1xuICAvLyBLZWVwIHRoaXMgZW1wdHkgc28gaXQncyBlYXNpZXIgdG8gaW5oZXJpdCBmcm9tXG4gIC8vICh2aWEgaHR0cHM6Ly9naXRodWIuY29tL2xpcHNtYWNrIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9pc3N1ZXMvMylcbn1cblxuRS5wcm90b3R5cGUgPSB7XG4gIG9uOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG5cbiAgICAoZVtuYW1lXSB8fCAoZVtuYW1lXSA9IFtdKSkucHVzaCh7XG4gICAgICBmbjogY2FsbGJhY2ssXG4gICAgICBjdHg6IGN0eFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb25jZTogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gbGlzdGVuZXIgKCkge1xuICAgICAgc2VsZi5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBsaXN0ZW5lci5fID0gY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBsaXN0ZW5lciwgY3R4KTtcbiAgfSxcblxuICBlbWl0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBkYXRhID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBldnRBcnIgPSAoKHRoaXMuZSB8fCAodGhpcy5lID0ge30pKVtuYW1lXSB8fCBbXSkuc2xpY2UoKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxlbiA9IGV2dEFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGk7IGkgPCBsZW47IGkrKykge1xuICAgICAgZXZ0QXJyW2ldLmZuLmFwcGx5KGV2dEFycltpXS5jdHgsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9mZjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcbiAgICB2YXIgZXZ0cyA9IGVbbmFtZV07XG4gICAgdmFyIGxpdmVFdmVudHMgPSBbXTtcblxuICAgIGlmIChldnRzICYmIGNhbGxiYWNrKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXZ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZXZ0c1tpXS5mbiAhPT0gY2FsbGJhY2sgJiYgZXZ0c1tpXS5mbi5fICE9PSBjYWxsYmFjaylcbiAgICAgICAgICBsaXZlRXZlbnRzLnB1c2goZXZ0c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGZyb20gcXVldWUgdG8gcHJldmVudCBtZW1vcnkgbGVha1xuICAgIC8vIFN1Z2dlc3RlZCBieSBodHRwczovL2dpdGh1Yi5jb20vbGF6ZFxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9jb21taXQvYzZlYmZhYTliYzk3M2IzM2QxMTBhODRhMzA3NzQyYjdjZjk0Yzk1MyNjb21taXRjb21tZW50LTUwMjQ5MTBcblxuICAgIChsaXZlRXZlbnRzLmxlbmd0aClcbiAgICAgID8gZVtuYW1lXSA9IGxpdmVFdmVudHNcbiAgICAgIDogZGVsZXRlIGVbbmFtZV07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi8qIGdsb2JhbCBnYXBpICovXG5cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi8uLi9kaWFnbm9zdGljc1wiO1xuXG5jb25zdCBmaWxlc0FQSSA9IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZHJpdmUvdjMvZmlsZXNcIjtcbmNvbnN0IHVwbG9hZEFQSSA9IFwiaHR0cHM6Ly9jb250ZW50Lmdvb2dsZWFwaXMuY29tL3VwbG9hZC9kcml2ZS92My9maWxlc1wiO1xuY29uc3QgZm9sZGVyTWltZVR5cGUgPSBcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIjtcbmNvbnN0IGJvdW5kYXJ5ID0gXCIuLi4uLi5cIjtcbmNvbnN0IG11bHRpUGFydE1pbWVUeXBlID0gYG11bHRpcGFydC9yZWxhdGVkOyBib3VuZGFyeT0ke2JvdW5kYXJ5fWA7XG5jb25zdCBkYXRhTWltZVR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbmNvbnN0IEpTT05jb250ZW50VHlwZSA9IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwiO1xuXG5jbGFzcyBGaWxlU3BlYyB7XG5cbiAgICBjb25zdHJ1Y3RvciggeyBpZCwgbmFtZSB9ICkge1xuXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBidWlsZCggdGhpbmcgKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBGaWxlU3BlYyggdGhpbmcgKTtcblxuICAgIH1cblxufVxuXG5sZXQgY291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIHJlcXVlc3QoIG9wdGlvbnMgKSB7XG5cbiAgICBjb25zdCBkZWZhdWx0ZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbiggeyBtZXRob2Q6IFwiR0VUXCIsIHBhdGg6IGZpbGVzQVBJIH0sIG9wdGlvbnMgKTtcbiAgICBsb2coIFwiR0FQSSByZXF1ZXN0XCIsICsrY291bnRlciwgZGVmYXVsdGVkT3B0aW9ucyApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlLCByZWplY3QgKSA9PiBnYXBpLmNsaWVudFxuICAgICAgICAucmVxdWVzdCggZGVmYXVsdGVkT3B0aW9ucyApXG4gICAgICAgIC50aGVuKCByZXNvbHZlLCByZWplY3QgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvbGRlciggbmFtZSApIHtcblxuICAgIGNvbnN0IG1pbWVUeXBlID0gZm9sZGVyTWltZVR5cGU7XG4gICAgY29uc3QgYm9keSA9IHsgbmFtZSwgbWltZVR5cGUgfTtcbiAgICBjb25zdCBtZXRob2QgPSBcIlBPU1RcIjtcbiAgICByZXR1cm4gcmVxdWVzdCggeyBtZXRob2QsIGJvZHkgfSApO1xuXG59XG5cbmZ1bmN0aW9uIGZpcnN0T3JOdWxsKCBsaXN0LCB0cmFuc2Zvcm0gPSB4ID0+IHggKSB7XG5cbiAgICBpZiAoIGxpc3QgJiYgbGlzdC5sZW5ndGggKSByZXR1cm4gdHJhbnNmb3JtKCBsaXN0WyAwIF0gKTtcbiAgICByZXR1cm4gbnVsbDtcblxufVxuZnVuY3Rpb24gZW5zdXJlRm9sZGVyKCBuYW1lICkge1xuXG4gICAgY29uc3QgcSA9IGBuYW1lPScke25hbWV9JyBhbmQgbWltZVR5cGU9JyR7Zm9sZGVyTWltZVR5cGV9JyBhbmQgdHJhc2hlZD1mYWxzZWA7XG4gICAgY29uc3QgcGFyYW1zID0geyBxIH07XG4gICAgcmV0dXJuIHJlcXVlc3QoIHsgcGFyYW1zIH0gKVxuICAgICAgICAudGhlbiggcmVzID0+IHJlcy5yZXN1bHQuZmlsZXMgKVxuICAgICAgICAudGhlbiggZmlyc3RPck51bGwgKVxuICAgICAgICAudGhlbiggbWF5YmVGb2xkZXIgPT4gbWF5YmVGb2xkZXIgfHwgY3JlYXRlRm9sZGVyKCBuYW1lICkgKVxuICAgICAgICAudGhlbiggRmlsZVNwZWMuYnVpbGQgKTtcblxufVxuXG5mdW5jdGlvbiBkdW1iRG93blByZWZpeCggcHJlZml4ICkge1xuXG4gICAgbGV0IHJldCA9IHByZWZpeDtcbiAgICAvLyBBUEkgZG9lc24ndCBsaWtlIGRhc2hlcyBmb3Igc29tZSByZWFzb25cbiAgICBjb25zdCBkYXNoSW5kZXggPSByZXQuaW5kZXhPZiggXCItXCIgKTtcbiAgICBpZiAoIH5kYXNoSW5kZXggKSByZXQgPSByZXQuc3Vic3RyaW5nKCAwLCBkYXNoSW5kZXggKTtcbiAgICAvLyBBUEkgZG9lc24ndCBsaWtlIG1vcmUgdGhhbiB+MjAgY2hhcmFjdGVycyBmb3Igc29tZSByZWFzb25cbiAgICBpZiAoIHJldC5sZW5ndGggPiAyMCApIHJldCA9IHJldC5zdWJzdHJpbmcoIDAsIDIwICk7XG4gICAgcmV0dXJuIHJldDtcblxufVxuZnVuY3Rpb24gbGlzdEZpbGVzSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVQcmVmaXggKSB7XG5cbiAgICBsZXQgcSA9IGBtaW1lVHlwZT0nJHtkYXRhTWltZVR5cGV9JyBhbmQgdHJhc2hlZD1mYWxzZWA7XG4gICAgbGV0IG5hbWVGaWx0ZXIgPSAoKSA9PiB0cnVlO1xuICAgIGlmICggbWF5YmVQcmVmaXggKSB7XG5cbiAgICAgICAgY29uc3QgYXBpUHJlZml4ID0gZHVtYkRvd25QcmVmaXgoIG1heWJlUHJlZml4ICk7XG4gICAgICAgIGlmICggYXBpUHJlZml4ICE9PSBtYXliZVByZWZpeCApIHtcblxuICAgICAgICAgICAgbmFtZUZpbHRlciA9IHggPT4geC5uYW1lLmluZGV4T2YoIG1heWJlUHJlZml4ICkgPT09IDA7XG5cbiAgICAgICAgfVxuICAgICAgICBxID0gYG5hbWUgY29udGFpbnMgJyR7YXBpUHJlZml4fScgYW5kICR7cX1gO1xuXG4gICAgfVxuICAgIGNvbnN0IHBhZ2VTaXplID0gMTAwMDtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHEsIHBhZ2VTaXplIH07XG4gICAgcmV0dXJuIHJlcXVlc3QoIHsgcGFyYW1zIH0gKVxuICAgICAgICAudGhlbiggcmVzID0+IHJlcy5yZXN1bHQuZmlsZXMgKVxuICAgICAgICAudGhlbiggZmlsZXMgPT4gZmlsZXMuZmlsdGVyKCBuYW1lRmlsdGVyICkubWFwKCBGaWxlU3BlYy5idWlsZCApICk7XG5cbn1cblxuZnVuY3Rpb24gZmluZEZpbGVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKSB7XG5cbiAgICBpZiAoIG1heWJlU3BlYyBpbnN0YW5jZW9mIEZpbGVTcGVjICkge1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIG1heWJlU3BlYyApO1xuXG4gICAgfVxuICAgIGNvbnN0IHsgaWQgfSA9IGZvbGRlciB8fCB7fTtcbiAgICBjb25zdCBxID0gYG5hbWU9JyR7bWF5YmVTcGVjfScgYW5kICcke2lkfScgaW4gcGFyZW50cyBhbmQgbWltZVR5cGU9JyR7ZGF0YU1pbWVUeXBlfScgYW5kIHRyYXNoZWQ9ZmFsc2VgO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgcSB9O1xuICAgIHJldHVybiByZXF1ZXN0KCB7IHBhcmFtcyB9IClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMucmVzdWx0LmZpbGVzIClcbiAgICAgICAgLnRoZW4oIGZpbGVzID0+IGZpcnN0T3JOdWxsKCBmaWxlcywgZmlsZSA9PiBGaWxlU3BlYy5idWlsZCggZmlsZSApICkgKTtcblxufVxuXG5mdW5jdGlvbiBKU09OcGFydCggb2JqICkge1xuXG4gICAgcmV0dXJuIGBcXHJcXG5Db250ZW50LVR5cGU6ICR7SlNPTmNvbnRlbnRUeXBlfVxcclxcblxcclxcbiR7SlNPTi5zdHJpbmdpZnkoIG9iaiwgbnVsbCwgMSApfWA7XG5cbn1cblxuZnVuY3Rpb24gbXVsdGlwYXJ0KCAuLi5wYXJ0cyApIHtcblxuICAgIGNvbnN0IHBhcnRTdGFydCA9IGBcXHJcXG4tLSR7Ym91bmRhcnl9YDtcbiAgICBjb25zdCBwYXJ0RW5kID0gYCR7cGFydFN0YXJ0fS0tYDtcbiAgICByZXR1cm4gcGFydFN0YXJ0ICsgcGFydHMuam9pbiggcGFydFN0YXJ0ICkgKyBwYXJ0RW5kO1xuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluRm9sZGVyKCBmb2xkZXIsIG5hbWUsIGRhdGEgKSB7XG5cbiAgICBjb25zdCBtZXRob2QgPSBcIlBPU1RcIjtcbiAgICBjb25zdCBoZWFkZXJzID0geyBcIkNvbnRlbnQtVHlwZVwiOiBtdWx0aVBhcnRNaW1lVHlwZSB9O1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgdXBsb2FkVHlwZTogXCJtdWx0aXBhcnRcIiB9O1xuICAgIGNvbnN0IG1ldGFkYXRhID0geyBwYXJlbnRzOiBbIGZvbGRlci5pZCBdLCBuYW1lIH07XG4gICAgY29uc3QgYm9keSA9IG11bHRpcGFydCggSlNPTnBhcnQoIG1ldGFkYXRhICksIEpTT05wYXJ0KCBkYXRhICkgKTtcbiAgICBjb25zdCBwYXRoID0gdXBsb2FkQVBJO1xuICAgIHJldHVybiByZXF1ZXN0KCB7XG5cbiAgICAgICAgcGF0aCwgbWV0aG9kLCBwYXJhbXMsIGhlYWRlcnMsIGJvZHksXG5cbiAgICB9ICk7XG5cbn1cblxuZnVuY3Rpb24gdXBkYXRlSW5Gb2xkZXIoIGZvbGRlciwgZmlsZSwgZGF0YSApIHtcblxuICAgIGNvbnN0IG1ldGhvZCA9IFwiUEFUQ0hcIjtcbiAgICBjb25zdCBwYXJhbXMgPSB7IHVwbG9hZFR5cGU6IFwibWVkaWFcIiB9O1xuICAgIGNvbnN0IG1pbWVUeXBlID0gZGF0YU1pbWVUeXBlO1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSggZGF0YSApO1xuICAgIGNvbnN0IHBhdGggPSBgJHt1cGxvYWRBUEl9LyR7ZmlsZS5pZH1gO1xuICAgIHJldHVybiByZXF1ZXN0KCB7XG5cbiAgICAgICAgcGF0aCwgbWV0aG9kLCBwYXJhbXMsIG1pbWVUeXBlLCBib2R5LFxuXG4gICAgfSApO1xuXG59XG5cbmZ1bmN0aW9uIHRocm93QWxyZWFkeUV4aXN0cyggZmlsZSApIHtcblxuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvciggYEZpbGUgYWxyZWFkeSBleGlzdHM6ICR7ZmlsZS5pZH0gJHtmaWxlLm5hbWV9YCApO1xuICAgIGVyci5jb2RlID0gNDA5O1xuICAgIHRocm93IGVycjtcblxufVxuXG5mdW5jdGlvbiBzYXZlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjLCBkYXRhLCBvcHRpb25zID0ge30gKSB7XG5cbiAgICBjb25zdCB7IG92ZXJ3cml0ZSB9ID0gb3B0aW9ucztcbiAgICByZXR1cm4gZmluZEZpbGVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKVxuICAgICAgICAudGhlbiggKCBtYXliZUZpbGUgKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICggbWF5YmVGaWxlICYmICFvdmVyd3JpdGUgKSB0aHJvd0FscmVhZHlFeGlzdHMoIG1heWJlRmlsZSApO1xuICAgICAgICAgICAgaWYgKCBtYXliZUZpbGUgKSByZXR1cm4gdXBkYXRlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVGaWxlLCBkYXRhICk7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSW5Gb2xkZXIoIGZvbGRlciwgbWF5YmVTcGVjLCBkYXRhICk7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCByZXMgPT4gRmlsZVNwZWMuYnVpbGQoIHJlcy5yZXN1bHQgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGxvYWRGcm9tRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApIHtcblxuICAgIHJldHVybiBmaW5kRmlsZUluRm9sZGVyKCBmb2xkZXIsIG1heWJlU3BlYyApXG4gICAgICAgIC50aGVuKCAoIG1heWJlRmlsZSApID0+IHtcblxuICAgICAgICAgICAgaWYgKCBtYXliZUZpbGUgKSByZXR1cm4gbWF5YmVGaWxlO1xuICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCBgTm90IGZvdW5kOiAke21heWJlU3BlY31gICk7XG4gICAgICAgICAgICBlcnIuY29kZSA9IDQwNDtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZXJyICk7XG5cbiAgICAgICAgfSApXG4gICAgICAgIC50aGVuKCAoIGZpbGUgKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBgJHtmaWxlc0FQSX0vJHtmaWxlLmlkfWA7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7IGFsdDogXCJtZWRpYVwiIH07XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCggeyBwYXRoLCBwYXJhbXMgfSApO1xuXG4gICAgICAgIH0gKVxuICAgICAgICAuY2F0Y2goIGV4ID0+IFByb21pc2UucmVqZWN0KCAoIGV4ICYmIGV4LnJlc3VsdCAmJiBleC5yZXN1bHQuZXJyb3IgKSB8fCBleCApIClcbiAgICAgICAgLnRoZW4oIHJlcyA9PiByZXMucmVzdWx0ICk7XG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlRnJvbUZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKSB7XG5cbiAgICByZXR1cm4gZmluZEZpbGVJbkZvbGRlciggZm9sZGVyLCBtYXliZVNwZWMgKVxuICAgICAgICAudGhlbiggKCBtYXliZUZpbGUgKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICggIW1heWJlRmlsZSApIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHsgY29kZTogNDA0IH0gKTtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBgJHtmaWxlc0FQSX0vJHttYXliZUZpbGUuaWR9YDtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IFwiREVMRVRFXCI7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdCggeyBtZXRob2QsIHBhdGggfSApO1xuXG4gICAgICAgIH0gKTtcblxufVxuXG5mdW5jdGlvbiBjbGVhblVwRXJyb3IoIGVyciApIHtcblxuICAgIGlmICggZXJyLmNvZGUgKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGVyciApO1xuICAgIGlmICggZXJyLnJlc3VsdCApIHtcblxuICAgICAgICBjb25zb2xlLmVycm9yKCBgV1RGIGFtIGkgc3VwcG9zZWQgdG8gZG8gd2l0aCB0aGlzPyAke0pTT04uc3RyaW5naWZ5KCBlcnIucmVzdWx0LCBudWxsLCAzICl9YCApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKCBlcnIgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgY29uc3QgY2xlYW5FcnJvciA9IG5ldyBFcnJvciggZXJyLmJvZHkgfHwgZXJyLnN0YXR1c1RleHQgfHwgXCJVbmtub3duIGVycm9yXCIgKTtcbiAgICBjbGVhbkVycm9yLmVyciA9IGVycjtcbiAgICBjbGVhbkVycm9yLmNvZGUgPSBlcnIuc3RhdHVzIHx8IDUwMDtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGNsZWFuRXJyb3IgKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhIHtcblxuICAgIC8qKlxuICAgICAqIGJ1aWxkcyBhIERhdGEgcmVwb3NpdG9yeSBmb3IgdGhlIG5hbWVkIGZvbGRlclxuICAgICAqIGlmIHRoZSBmb2xkZXIgZG9lc24ndCBhbHJlYWR5IGV4aXN0LCBjcmVhdGVzIGl0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlck5hbWUgdGhlIG5hbWUgb2YgdGhlIGZvbGRlciBmb3Igd2hpY2ggdG8gYnVpbGRcbiAgICAgKiBAcmV0dXJucyB7RGF0YX0gdGhlIGRhdGEgcmVwb3NpdG9yeVxuICAgICAqL1xuICAgIHN0YXRpYyBpbkZvbGRlciggZm9sZGVyTmFtZSApIHtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiBlbnN1cmVGb2xkZXIoIGZvbGRlck5hbWUgKSApXG4gICAgICAgICAgICAudGhlbiggZm9sZGVyU3BlYyA9PiBuZXcgRGF0YSggZm9sZGVyU3BlYyApICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIGEgRGF0YSByZXBvc2l0b3J5IGZvciBmaWxlcyBzdG9yZWQgaW4gdGhlIHNwZWNpZmllZCBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge0ZpbGVTcGVjfSBmb2xkZXJTcGVjIHRoZSBmb2xkZXIgY29udGFpbmluZyBmaWxlcyB0byBvcGVyYXRlIG9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoIGZvbGRlclNwZWMgKSB7XG5cbiAgICAgICAgdGhpcy5mb2xkZXIgPSBmb2xkZXJTcGVjO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGRhdGEgZmlsZXMgaW4gdGhpcyBmb2xkZXIgKEpTT04gZmlsZXMpXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFttYXliZVByZWZpeF0gaWYgc3BlY2lmaWVkLCBvbmx5IGZpbGVzIHdpdGggdGhlIHNwZWNpZmllZFxuICAgICAqIHByZWZpeCBhcmUgcmV0dXJuZWRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcHJvbWlzZSB0byBsaXN0IHRoZSBmaWxlcyBpbiB0aGlzIGZvbGRlclxuICAgICAqL1xuICAgIGxpc3QoIG1heWJlUHJlZml4ICkge1xuXG4gICAgICAgIHJldHVybiBsaXN0RmlsZXNJbkZvbGRlciggdGhpcy5mb2xkZXIsIG1heWJlUHJlZml4ICkuY2F0Y2goIGNsZWFuVXBFcnJvciApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZXMgdGhlIHNwZWNpZmllZCBkYXRhIGluIGEgZGF0YSBmaWxlIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIG5hbWUgb2YgdGhlIGZpbGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSB0aGUgZGF0YSB0byBzYXZlICh3aWxsIGJlIEpTT04gc3RyaW5naWZpZWQpXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBzYXZlIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5vdmVyd3JpdGUgaWYgVHJ1ZSB3aWxsIGNoZWNrIGlmIGZpbGUgZXhpc3RzIGFuZFxuICAgICAqIHJldHVybiBhbiBlcnJvciB3aXRoIGNvZGUgNDA5XG4gICAgICogQHJldHVybnMge1Byb21pc2V9IHByb21pc2UgdG8gc2F2ZSB0aGUgZmlsZVxuICAgICAqL1xuICAgIHNhdmUoIG5hbWUsIGRhdGEsIG9wdGlvbnMgKSB7XG5cbiAgICAgICAgcmV0dXJuIHNhdmVJbkZvbGRlciggdGhpcy5mb2xkZXIsIG5hbWUsIGRhdGEsIG9wdGlvbnMgKS5jYXRjaCggY2xlYW5VcEVycm9yICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIHNwZWNpZmllZCBkYXRhIGluIGEgZGF0YSBmaWxlIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lL3NwZWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xGaWxlU3BlY30gbWF5YmVTcGVjIHRoZSBuYW1lIG9yIEZpbGVTcGVjIG9mIHRoZSBmaWxlIHRvIGxvYWRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2UgdG8gbG9hZCB0aGUgZmlsZSBzcGVjaWZpZWRcbiAgICAgKi9cbiAgICBsb2FkKCBtYXliZVNwZWMgKSB7XG5cbiAgICAgICAgcmV0dXJuIGxvYWRGcm9tRm9sZGVyKCB0aGlzLmZvbGRlciwgbWF5YmVTcGVjICkuY2F0Y2goIGNsZWFuVXBFcnJvciApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVybWVuYW50bHkgZGVsZXRlcyB0aGUgZGF0YSBmaWxlIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lL3NwZWMuIFRoZSBmaWxlXG4gICAgICogaXMgbm90IHJlY292ZXJhYmxlIGZyb20gdGhlIHJlY3ljbGUgYmluLiBJZiB0aGUgZGF0YSBmaWxlIGlzIGFscmVhZHlcbiAgICAgKiBnb25lLCByZXNvbHZlcyB3aXRoIHsgY29kZTogNDA0IH1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xGaWxlU3BlY30gbWF5YmVTcGVjIHRoZSBuYW1lIG9yIEZpbGVTcGVjIG9mIHRoZSBmaWxlIHRvIGRlbGV0ZVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSB0byBkZWxldGUgdGhlIGZpbGVcbiAgICAgKi9cbiAgICBwZXJtRGVsZXRlKCBtYXliZVNwZWMgKSB7XG5cbiAgICAgICAgcmV0dXJuIGRlbGV0ZUZyb21Gb2xkZXIoIHRoaXMuZm9sZGVyLCBtYXliZVNwZWMgKS5jYXRjaCggY2xlYW5VcEVycm9yICk7XG5cbiAgICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9zdG9yZS9EYXRhLmpzIiwiY29uc3QgZmlsZW5hbWUgPSBuYW1lID0+IGAke25hbWV9X3Byb2plY3QuanNvbmA7XG5jb25zdCBhc1NlZ21lbnRGaWxlbmFtZSA9ICggbmFtZSwga2V5ICkgPT4gYCR7bmFtZX1fXyR7a2V5fS5qc29uYDtcbmNvbnN0IGZpbGVuYW1lUGF0dGVybiA9IC9eKC4qKV9wcm9qZWN0XFwuanNvbiQvO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXBvIHtcblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgcHJvamVjdCByZXBvc2l0b3J5IGZvciB0aGUgZ2l2ZW4gZGF0YSByZXBvc2l0b3J5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgdGhlIGRhdGEgcmVwb3NpdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCBkYXRhICkge1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXZlIGEgcHJvamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSwgbWV0YWRhdGEgYW5kIHNlZ21lbnRzIChoYXNoIG9mIGtleS12YWx1ZXMpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGEgdG8gc2F2ZSBpbiB0aGUgbWFpbiBwcm9qZWN0IGZpbGVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2VnbWVudHMgaGFzaCBvZiBrZXktdmFsdWUgcGFpcnMgdG8gc2F2ZSwgZWFjaCBpbiBpdHMgb3duIGZpbGVcbiAgICAgKiBAcGFyYW0ge2FycmF5fSByZW1vdmVkU2VnbWVudHMgd2hpY2ggaGF2ZSBiZWVuIHJlbW92ZWQgYW5kIHNob3VsZCBiZSBwdXJnZWQgZnJvbSB0aGUgdW5kZXJseWluZyBzdG9yYWdlXG4gICAgICogQHJldHVybiB7UHJvbWlzZTx2b2lkPn0gUHJvbWlzZSBvZiBzYXZlZCBwcm9qZWN0XG4gICAgICovXG4gICAgYXN5bmMgc2F2ZVByb2plY3QoIG5hbWUsIG1ldGFkYXRhLCBzZWdtZW50cyA9IHt9LCByZW1vdmVkU2VnbWVudHMgPSBbXSApIHtcblxuICAgICAgICBjb25zdCBpbmRleCA9IE9iamVjdC5rZXlzKCBzZWdtZW50cyApLnJlZHVjZSggKCBhY2MsIGtleSApID0+IE9iamVjdC5hc3NpZ24oIGFjYywge1xuXG4gICAgICAgICAgICBbIGtleSBdOiBhc1NlZ21lbnRGaWxlbmFtZSggbmFtZSwga2V5IClcblxuICAgICAgICB9ICksIHt9ICk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB7IGluZGV4LCBtZXRhZGF0YSB9O1xuICAgICAgICBhd2FpdCB0aGlzLmRhdGEuc2F2ZSggZmlsZW5hbWUoIG5hbWUgKSwgcHJvamVjdCwgeyBvdmVyd3JpdGU6IHRydWUgfSApO1xuICAgICAgICBjb25zdCBzZWdtZW50U2F2ZXMgPSBPYmplY3Qua2V5cyggaW5kZXggKVxuICAgICAgICAgICAgLm1hcCggc2VnbWVudE5hbWUgPT4gdGhpcy5kYXRhLnNhdmUoXG4gICAgICAgICAgICAgICAgaW5kZXhbIHNlZ21lbnROYW1lIF0sXG4gICAgICAgICAgICAgICAgc2VnbWVudHNbIHNlZ21lbnROYW1lIF0sXG4gICAgICAgICAgICAgICAgeyBvdmVyd3JpdGU6IHRydWUgfVxuICAgICAgICAgICAgKSApO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCggc2VnbWVudFNhdmVzICk7XG4gICAgICAgIGNvbnN0IHNlZ21lbnREZWxldGVzID0gcmVtb3ZlZFNlZ21lbnRzLm1hcCgga2V5ID0+XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YS5wZXJtRGVsZXRlKCBhc1NlZ21lbnRGaWxlbmFtZSggbmFtZSwga2V5ICkgKSApO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCggc2VnbWVudERlbGV0ZXMgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYSBwcm9qZWN0IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2Ugb2YgcHJvamVjdCB7IHtvYmplY3R9IG1ldGFkYXRhLCB7YXJyYXl9IHNlZ21lbnRzIH1cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkUHJvamVjdCggbmFtZSApIHtcblxuICAgICAgICBjb25zdCB7IG1ldGFkYXRhLCBpbmRleCB9ID0gYXdhaXQgdGhpcy5kYXRhLmxvYWQoIGZpbGVuYW1lKCBuYW1lICkgKTtcbiAgICAgICAgY29uc3Qgc2VnbWVudExvYWRzID0gT2JqZWN0LmtleXMoIGluZGV4ICkubWFwKCBzZWdtZW50TmFtZSA9PiB0aGlzLmRhdGEubG9hZCggaW5kZXhbIHNlZ21lbnROYW1lIF0gKSApO1xuICAgICAgICBjb25zdCBsb2FkZWQgPSBhd2FpdCBQcm9taXNlLmFsbCggc2VnbWVudExvYWRzICk7XG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gT2JqZWN0LmtleXMoIGluZGV4ICkucmVkdWNlKCAoIGFjYywgc2VnbWVudE5hbWUsIGkgKSA9PiAoIHtcblxuICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgWyBzZWdtZW50TmFtZSBdOiBsb2FkZWRbIGkgXVxuXG4gICAgICAgIH0gKSwgeyB9ICk7XG4gICAgICAgIHJldHVybiB7IG1ldGFkYXRhOiBtZXRhZGF0YSB8fCB7fSwgc2VnbWVudHMgfTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHByb2plY3Qgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBvZiB0aGUgcHJvamVjdCB0byBkZWxldGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFByb21pc2Ugb2YgZGVsZXRpb25cbiAgICAgKi9cbiAgICBkZWxldGVQcm9qZWN0KCBuYW1lICkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEucGVybURlbGV0ZSggZmlsZW5hbWUoIG5hbWUgKSApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdHMgdGhlIHByb2plY3RzIGluIHRoaXMgcmVwb3NpdG9yeVxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUHJvbWlzZSBvZiBsaXN0aW5nIG9mIHByb2plY3QgbmFtZXNcbiAgICAgKi9cbiAgICBsaXN0UHJvamVjdHMoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5saXN0KCkudGhlbiggbGlzdGluZyA9PiBsaXN0aW5nXG4gICAgICAgICAgICAubWFwKCAoIHsgbmFtZSB9ICkgPT4gZmlsZW5hbWVQYXR0ZXJuLmV4ZWMoIG5hbWUgKSApXG4gICAgICAgICAgICAuZmlsdGVyKCB4ID0+IHggKVxuICAgICAgICAgICAgLm1hcCggKCBbICwgbmFtZSBdICkgPT4gbmFtZSApICk7XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL3N0b3JlL1JlcG8uanMiLCJjb25zdCByZXBvcyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBzZWdtZW50c0ZvclByb2plY3QgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcmVtb3ZlZFNlZ21lbnRzRm9yUHJvamVjdCA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IGNsb25lID0geCA9PiAoIHR5cGVvZiB4ID09PSBcInVuZGVmaW5lZFwiID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkoIHggKSApICk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuXG4gICAgY29uc3RydWN0b3IoIG5hbWUsIHJlcG8gKSB7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgcmVwb3Muc2V0KCB0aGlzLCByZXBvICk7XG4gICAgICAgIHNlZ21lbnRzRm9yUHJvamVjdC5zZXQoIHRoaXMsIHt9ICk7XG4gICAgICAgIHJlbW92ZWRTZWdtZW50c0ZvclByb2plY3Quc2V0KCB0aGlzLCBbXSApO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgZGVsZXRlU2VsZigpIHtcblxuICAgICAgICBjb25zdCByZXBvID0gcmVwb3MuZ2V0KCB0aGlzICk7XG4gICAgICAgIGNvbnN0IHsgbmFtZSB9ID0gdGhpcztcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgY29uc3QgeyBzZWdtZW50cyB9ID0gYXdhaXQgcmVwby5sb2FkUHJvamVjdCggbmFtZSApO1xuICAgICAgICAgICAgcmV0dXJuIHJlcG8uZGVsZXRlUHJvamVjdCggbmFtZSwgc2VnbWVudHMgKTtcblxuICAgICAgICB9IGNhdGNoICggZXggKSB7XG5cbiAgICAgICAgICAgIGlmICggZXguY29kZSAhPT0gNDA0ICkgdGhyb3cgZXg7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVtb3ZlU2VnbWVudCggbmFtZSApIHtcblxuICAgICAgICBjb25zdCBzZWdtZW50cyA9IHNlZ21lbnRzRm9yUHJvamVjdC5nZXQoIHRoaXMgKTtcblxuICAgICAgICBpZiAoIG5hbWUgaW4gc2VnbWVudHMgKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRTZWdtZW50cyA9IHJlbW92ZWRTZWdtZW50c0ZvclByb2plY3QuZ2V0KCB0aGlzICk7XG4gICAgICAgICAgICByZW1vdmVkU2VnbWVudHMucHVzaCggbmFtZSApO1xuICAgICAgICAgICAgZGVsZXRlIHNlZ21lbnRzWyBuYW1lIF07XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2VnbWVudCggbmFtZSwgbWF5YmVEYXRhICkge1xuXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gc2VnbWVudHNGb3JQcm9qZWN0LmdldCggdGhpcyApO1xuICAgICAgICBpZiAoIHR5cGVvZiBtYXliZURhdGEgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cbiAgICAgICAgICAgIHNlZ21lbnRzWyBuYW1lIF0gPSBjbG9uZSggbWF5YmVEYXRhICk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvbmUoIHNlZ21lbnRzWyBuYW1lIF0gKTtcblxuICAgIH1cblxuICAgIGFzeW5jIHNhdmUoKSB7XG5cbiAgICAgICAgY29uc3QgcmVwbyA9IHJlcG9zLmdldCggdGhpcyApO1xuICAgICAgICBjb25zdCBzZWdtZW50cyA9IHNlZ21lbnRzRm9yUHJvamVjdC5nZXQoIHRoaXMgKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlZFNlZ21lbnRzID0gcmVtb3ZlZFNlZ21lbnRzRm9yUHJvamVjdC5nZXQoIHRoaXMgKTtcblxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHsgc2F2ZWQ6IERhdGUubm93KCkgfTtcbiAgICAgICAgYXdhaXQgcmVwby5zYXZlUHJvamVjdCggdGhpcy5uYW1lLCBtZXRhZGF0YSwgY2xvbmUoIHNlZ21lbnRzICksIGNsb25lKCByZW1vdmVkU2VnbWVudHMgKSApO1xuICAgICAgICByZW1vdmVkU2VnbWVudHNGb3JQcm9qZWN0LnNldCggdGhpcywgW10gKTtcblxuICAgIH1cblxuICAgIGFzeW5jIGxvYWQoKSB7XG5cbiAgICAgICAgY29uc3QgcmVwbyA9IHJlcG9zLmdldCggdGhpcyApO1xuICAgICAgICBjb25zdCB7IHNlZ21lbnRzIH0gPSBhd2FpdCByZXBvLmxvYWRQcm9qZWN0KCB0aGlzLm5hbWUgKTtcbiAgICAgICAgc2VnbWVudHNGb3JQcm9qZWN0LnNldCggdGhpcywgY2xvbmUoIHNlZ21lbnRzICkgKTtcblxuICAgIH1cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2RlbC9Qcm9qZWN0LmpzIiwiaW1wb3J0IFByb3ZpZGVyIGZyb20gXCIuL3Byb3ZpZGVyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCBEYXRhIGZyb20gXCIuL3N0b3JlL0RhdGFcIjtcbmltcG9ydCBSZXBvIGZyb20gXCIuL3N0b3JlL1JlcG9cIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuLi9tb2RlbC9Qcm9qZWN0XCI7XG5cbmNvbnN0IHsgYXBwTmFtZSB9ID0gY29uZmlnO1xuXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplUmVwbygpIHtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBEYXRhLmluRm9sZGVyKCBhcHBOYW1lICk7XG4gICAgcmV0dXJuIG5ldyBSZXBvKCBkYXRhICk7XG5cbn1cblxuY2xhc3MgR29vZ2xlUHJvamVjdHMgZXh0ZW5kcyBQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciggXCJQcm9qZWN0cyBiYXNlZCBvbiBnb29nbGUgZHJpdmVcIiApO1xuICAgICAgICB0aGlzLnJlcG8gPSB0aGlzLndhaXRGb3JMb2FkKCkudGhlbiggaW5pdGlhbGl6ZVJlcG8gKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBhc3luY1xuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIHByb2plY3RzIHN0b3JlZCBpbiBnb29nbGUgZHJpdmVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheT59IGxpc3Qgb2YgcHJvamVjdCBuYW1lc1xuICAgICAqL1xuICAgIGFzeW5jIGxpc3QoKSB7XG5cbiAgICAgICAgY29uc3QgcmVwbyA9IGF3YWl0IHRoaXMucmVwbztcbiAgICAgICAgcmV0dXJuIHJlcG8ubGlzdFByb2plY3RzKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCdWlsZHMgYSBwcm9qZWN0IG9iamVjdFxuICAgICAqIE5vdGUgdGhhdCB0aGlzIGlzbid0IG5lY2Vzc2FyaWx5IGxvYWRlZCBvciBzYXZlZCB5ZXRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFByb2plY3Q+fSBwcm9qZWN0IG9uY2UgdGhlIHJlcG8gaXMgcmVhZHlcbiAgICAgKi9cbiAgICBhc3luYyBidWlsZCggbmFtZSApIHtcblxuICAgICAgICBjb25zdCByZXBvID0gYXdhaXQgdGhpcy5yZXBvO1xuICAgICAgICByZXR1cm4gbmV3IFByb2plY3QoIG5hbWUsIHJlcG8gKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgR29vZ2xlUHJvamVjdHMoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL0dvb2dsZVByb2plY3RzLmpzIiwiLyogZ2xvYmFsIGRvY3VtZW50ICovXG5cbmltcG9ydCBJZGVudGl0eSBmcm9tIFwiLi9zZXJ2aWNlcy9pZGVudGl0eVwiO1xuaW1wb3J0IENhcGFiaWxpdGllcyBmcm9tIFwiLi9zZXJ2aWNlcy9jYXBhYmlsaXRpZXNcIjtcbmltcG9ydCBQcm9qZWN0cyBmcm9tIFwiLi9zZXJ2aWNlcy9wcm9qZWN0c1wiO1xuXG5pbXBvcnQgZ2FwaUlkZW50aXR5IGZyb20gXCIuL2dhcGkvR29vZ2xlSWRlbnRpdHlcIjtcbmltcG9ydCBnYXBpQ2FwYWJpbGl0aWVzIGZyb20gXCIuL2dhcGkvR29vZ2xlQ2FwYWJpbGl0aWVzXCI7XG5pbXBvcnQgZ2FwaVByb2plY3RzIGZyb20gXCIuL2dhcGkvR29vZ2xlUHJvamVjdHNcIjtcblxuaW1wb3J0IHNlbGZUZXN0IGZyb20gXCIuL3NlbGYtdGVzdFwiO1xuXG5pZiAoIHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiApIHRocm93IG5ldyBFcnJvciggXCJkb2N1bWVudCBpcyBub3QgZGVmaW5lZFwiICk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwibG9jYXRlLXNlcnZpY2VzXCIsICggZSApID0+IHtcblxuICAgIGUuZGV0YWlsKCBudWxsLCB7XG5cbiAgICAgICAgaWRlbnRpdHk6IG5ldyBJZGVudGl0eSggWyBnYXBpSWRlbnRpdHkgXSApLFxuICAgICAgICBjYXBhYmlsaXRpZXM6IG5ldyBDYXBhYmlsaXRpZXMoIFsgZ2FwaUNhcGFiaWxpdGllcyBdICksXG4gICAgICAgIHByb2plY3RzOiBuZXcgUHJvamVjdHMoIFsgZ2FwaVByb2plY3RzIF0gKVxuXG4gICAgfSApO1xuXG59ICk7XG5cbnNlbGZUZXN0KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2VudHJ5LmpzIiwiaW1wb3J0IFNlcnZpY2UgZnJvbSBcIi4vc2VydmljZVwiO1xuXG5jb25zdCByZXF1aXJlZEZ1bmN0aW9ucyA9IFsgXCJjdXJyZW50XCIsIFwiYXV0aG9yaXplXCIsIFwiZGVhdXRob3JpemVcIiBdO1xuY29uc3QgY2hvc2VuS2V5ID0gXCJjaG9zZW4taWRlbnRpdHktcHJvdmlkZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWRlbnRpdHlTZXJ2aWNlIGV4dGVuZHMgU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvciggcHJvdmlkZXJzICkge1xuXG4gICAgICAgIHN1cGVyKCBwcm92aWRlcnMsIGNob3NlbktleSwgcmVxdWlyZWRGdW5jdGlvbnMgKTtcblxuICAgIH1cblxuICAgIGN1cnJlbnQoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKS50aGVuKCBwID0+IHAuY3VycmVudCgpICk7XG5cbiAgICB9XG5cbiAgICBzaWduSW4oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKS50aGVuKCBwID0+IHAuYXV0aG9yaXplKCkgKS50aGVuKCAoKSA9PiB0aGlzLmN1cnJlbnQoKSApO1xuXG4gICAgfVxuXG4gICAgc2lnbk91dCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVQcm92aWRlcigpLnRoZW4oIHAgPT4gcC5kZWF1dGhvcml6ZSgpICkudGhlbiggKCkgPT4gdGhpcy5jdXJyZW50KCkgKTtcblxuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlcnZpY2VzL2lkZW50aXR5LmpzIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgd2luZG93LmxvY2FsU3RvcmFnZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvc2VydmljZXMvbG9jYWwtc3RvcmUuanMiLCJpbXBvcnQgU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5cbmNvbnN0IGNob3NlbktleSA9IFwiY2hvc2VuLWNhcGFiaWxpdGllcy1wcm92aWRlclwiO1xuY29uc3QgcmVxdWlyZWRGdW5jdGlvbnMgPSBbXG5cbiAgICBcImNsZWFyXCIsXG4gICAgXCJ2ZXJpZnlMaXN0XCIsXG4gICAgXCJ2ZXJpZnlTdG9yZVwiLFxuICAgIFwidmVyaWZ5R2V0XCIsXG4gICAgXCJ2ZXJpZnlEZWxldGVcIixcbiAgICBcInZlcmlmeVByb2plY3RzXCIsXG5cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcGFiaWxpdGllc1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm92aWRlcnMgKSB7XG5cbiAgICAgICAgc3VwZXIoIHByb3ZpZGVycywgY2hvc2VuS2V5LCByZXF1aXJlZEZ1bmN0aW9ucyApO1xuXG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlUHJvdmlkZXIoKS50aGVuKCBwID0+IHAuY2xlYXIoKSApLnRoZW4oICgpID0+IHRydWUgKTtcblxuICAgIH1cblxuICAgIGFzeW5jIHZlcmlmeVN0b3JhZ2UoKSB7XG5cbiAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLmVuc3VyZVByb3ZpZGVyKCk7XG4gICAgICAgIGNvbnN0IFsgY2FuTGlzdCwgY2FuU3RvcmUsIGNhbkdldCwgY2FuRGVsZXRlIF0gPSBhd2FpdCBQcm9taXNlLmFsbCggW1xuXG4gICAgICAgICAgICBwcm92aWRlci52ZXJpZnlMaXN0KCksXG4gICAgICAgICAgICBwcm92aWRlci52ZXJpZnlTdG9yZSgpLFxuICAgICAgICAgICAgcHJvdmlkZXIudmVyaWZ5R2V0KCksXG4gICAgICAgICAgICBwcm92aWRlci52ZXJpZnlEZWxldGUoKSxcblxuICAgICAgICBdICk7XG4gICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgIGNhbkxpc3QsXG4gICAgICAgICAgICBjYW5TdG9yZSxcbiAgICAgICAgICAgIGNhbkdldCxcbiAgICAgICAgICAgIGNhbkRlbGV0ZSxcblxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5UHJvamVjdFJlcG8oKSB7XG5cbiAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLmVuc3VyZVByb3ZpZGVyKCk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNhbkxpc3RQcm9qZWN0cywgY2FuRGVsZXRlUHJvamVjdHMsIGNhbkNyZWF0ZVByb2plY3RzLCBjYW5Mb2FkRGF0YSwgY2FuU2F2ZURhdGEsIGNhbkRlbGV0ZURhdGFcbiAgICAgICAgfSA9IGF3YWl0IHByb3ZpZGVyLnZlcmlmeVByb2plY3RzKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYW5MaXN0UHJvamVjdHMsIGNhbkRlbGV0ZVByb2plY3RzLCBjYW5DcmVhdGVQcm9qZWN0cywgY2FuTG9hZERhdGEsIGNhblNhdmVEYXRhLCBjYW5EZWxldGVEYXRhXG4gICAgICAgIH07XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZXJ2aWNlcy9jYXBhYmlsaXRpZXMuanMiLCJpbXBvcnQgU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5cbmNvbnN0IHJlcXVpcmVkRnVuY3Rpb25zID0gWyBcImxpc3RcIiwgXCJidWlsZFwiIF07XG5jb25zdCBjaG9zZW5LZXkgPSBcImNob3Nlbi1wcm9qZWN0cy1wcm92aWRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0c1NlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm92aWRlcnMgKSB7XG5cbiAgICAgICAgc3VwZXIoIHByb3ZpZGVycywgY2hvc2VuS2V5LCByZXF1aXJlZEZ1bmN0aW9ucyApO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgbGlzdCgpIHtcblxuICAgICAgICByZXR1cm4gKCBhd2FpdCB0aGlzLmVuc3VyZVByb3ZpZGVyKCkgKS5saXN0KCk7XG5cbiAgICB9XG5cbiAgICBhc3luYyBidWlsZCggbmFtZSApIHtcblxuICAgICAgICByZXR1cm4gKCBhd2FpdCB0aGlzLmVuc3VyZVByb3ZpZGVyKCkgKS5idWlsZCggbmFtZSApO1xuXG4gICAgfVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3NlcnZpY2VzL3Byb2plY3RzLmpzIiwiLyogZ2xvYmFsIGdhcGkgKi9cblxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCIuL3Byb3ZpZGVyXCI7XG5cbmZ1bmN0aW9uIGJ1aWxkSWRlbnRpdHkoIHAgKSB7XG5cbiAgICBjb25zdCBhdXRoID0gZ2FwaS5hdXRoMi5nZXRBdXRoSW5zdGFuY2UoKTtcbiAgICBjb25zdCBzaWduZWRJbiA9IGF1dGguaXNTaWduZWRJbi5nZXQoKTtcbiAgICBjb25zdCBwcm9maWxlID0gc2lnbmVkSW4gPyBhdXRoLmN1cnJlbnRVc2VyLmdldCgpLmdldEJhc2ljUHJvZmlsZSgpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG5hbWUgPSAoIHNpZ25lZEluICYmIHByb2ZpbGUgKSA/IHByb2ZpbGUuZ2V0TmFtZSgpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHVzZXJJZCA9ICggc2lnbmVkSW4gJiYgcHJvZmlsZSApID8gcHJvZmlsZS5nZXRFbWFpbCgpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb3ZpZGVyID0gT2JqZWN0LmFzc2lnbiggcC5kZXNjcmliZSgpLCBwLnN0YXR1cygpICk7XG4gICAgcmV0dXJuIHtcblxuICAgICAgICBwcm92aWRlciwgc2lnbmVkSW4sIHVzZXJJZCwgbmFtZSxcblxuICAgIH07XG5cbn1cblxuZnVuY3Rpb24gc2lnbm91dCggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG4gICAgY29uc3QgYXV0aCA9IGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCk7XG4gICAgcmV0dXJuIGF1dGguc2lnbk91dCgpLnRoZW4oIHJlc29sdmUsIHJlamVjdCApO1xuXG59XG5cbmZ1bmN0aW9uIHNpZ25pbiggcmVzb2x2ZSwgcmVqZWN0ICkge1xuXG4gICAgY29uc3QgYXV0aCA9IGdhcGkuYXV0aDIuZ2V0QXV0aEluc3RhbmNlKCk7XG4gICAgYXV0aC5zaWduSW4oKS50aGVuKFxuXG4gICAgICAgICgpID0+IHJlc29sdmUoIERhdGUubm93KCkgKSxcbiAgICAgICAgeCA9PiByZWplY3QoIHguZXJyb3IgfHwgeCApXG5cbiAgICApO1xuXG59XG5cbmNsYXNzIEdvb2dsZUlkZW50aXR5IGV4dGVuZHMgUHJvdmlkZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgc3VwZXIoIFwiWW91ciBHb29nbGUgaWRlbnRpdHkgKGUuZy4gZ21haWwpXCIgKTtcblxuICAgIH1cblxuICAgIGN1cnJlbnQoKSB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHJlc29sdmUoIGJ1aWxkSWRlbnRpdHkoIHRoaXMgKSApICk7XG5cbiAgICB9XG5cbiAgICBhdXRob3JpemUoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggc2lnbmluICk7XG5cbiAgICB9XG5cbiAgICBkZWF1dGhvcml6ZSgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCBzaWdub3V0ICk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEdvb2dsZUlkZW50aXR5KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9Hb29nbGVJZGVudGl0eS5qcyIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcInRpbnktZW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm92aWRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcigga2V5LCBkZXNjcmlwdGlvbiApIHtcblxuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG5cbiAgICB9XG5cbiAgICB2ZXJpZnlJbnRlcmZhY2UoIGZ1bmN0aW9ucyApIHtcblxuICAgICAgICBmdW5jdGlvbnMuZm9yRWFjaCggKCBmdW5jICkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBtYXliZUZ1bmN0aW9uID0gdGhpc1sgZnVuYyBdO1xuICAgICAgICAgICAgaWYgKCB0eXBlb2YgbWF5YmVGdW5jdGlvbiAhPT0gXCJmdW5jdGlvblwiICkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBgUHJvdmlkZXIgJHtwcm92aWRlcn0gZG9lcyBub3QgcHJvdmlkZSBmdW5jdGlvbiAnJHtmdW5jfScgKCR7bWF5YmVGdW5jdGlvbn0pYCApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSApO1xuXG4gICAgfVxuXG4gICAgZGVzY3JpYmUoKSB7XG5cbiAgICAgICAgY29uc3QgeyBrZXksIG5hbWUsIGRlc2NyaXB0aW9uIH0gPSB0aGlzO1xuICAgICAgICByZXR1cm4geyBrZXksIG5hbWUsIGRlc2NyaXB0aW9uIH07XG5cbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9wcm92aWRlci1iYXNlLmpzIiwiLyogZ2xvYmFsIGdhcGkgKi9cblxuY29uc3QgU0NPUEVTID0gW1xuXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLm1ldGFkYXRhLnJlYWRvbmx5XCIsXG4gICAgXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLmZpbGVcIixcblxuXS5qb2luKCBcIiBcIiApO1xuXG5mdW5jdGlvbiBpbml0QXV0aENsaWVudCggY29uZmlnLCByZXNvbHZlLCByZWplY3QgKSB7XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuXG4gICAgICAgIGFwaUtleTogY29uZmlnLkFQSV9LRVksXG4gICAgICAgIGNsaWVudElkOiBjb25maWcuQ0xJRU5UX0lELFxuICAgICAgICBzY29wZTogY29uZmlnLlNDT1BFUyB8fCBTQ09QRVMsXG5cbiAgICB9O1xuICAgIGdhcGkubG9hZCggXCJjbGllbnQ6YXV0aDJcIiwgKCkgPT4gZ2FwaS5jbGllbnRcbiAgICAgICAgLmluaXQoIG9wdGlvbnMgKVxuICAgICAgICAudGhlbiggcmVzb2x2ZSwgcmVqZWN0ICkgKTtcblxufVxuXG5mdW5jdGlvbiB0cnlJbml0QXV0aENsaWVudCggY29uZmlnLCByZXNvbHZlLCByZWplY3QgKSB7XG5cbiAgICB0cnkge1xuXG4gICAgICAgIGluaXRBdXRoQ2xpZW50KCBjb25maWcsIHJlc29sdmUsIHJlamVjdCApO1xuXG4gICAgfSBjYXRjaCAoIGUgKSB7XG5cbiAgICAgICAgcmVqZWN0KCBlICk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgdW5kZWZpbmVkO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoIGNvbmZpZyApIHtcblxuICAgIGNvbnN0IG5hZ2EgPSB0cnlJbml0QXV0aENsaWVudC5iaW5kKCBudWxsLCBjb25maWcgKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoIG5hZ2EgKTtcblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9nYXBpL3NoYXJlZC5qcyIsIi8qIGdsb2JhbCBmZXRjaCAqL1xuXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcIi4vcHJvdmlkZXJcIjtcbmltcG9ydCBEYXRhIGZyb20gXCIuL3N0b3JlL0RhdGFcIjtcbmltcG9ydCBjb25maWcgZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9nLCBsb2dFcnJvciB9IGZyb20gXCIuLi9kaWFnbm9zdGljc1wiO1xuaW1wb3J0IHByb2plY3RzIGZyb20gXCIuL0dvb2dsZVByb2plY3RzXCI7XG5cbmNvbnN0IHsgYXBwTmFtZSB9ID0gY29uZmlnO1xuY29uc3Qgc3RvcmFnZVZlcmlmaWNhdGlvbnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcHJvamVjdHNWZXJpZmljYXRpb25zID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IGNhY2hlZFZlcmlmaWNhdGlvbiA9ICggb3duZXIsIHZlcmlmaWNhdGlvbnMsIHZlcmlmeSApID0+XG4gICAgdmVyaWZpY2F0aW9ucy5nZXQoIG93bmVyICkgfHxcbiAgICB2ZXJpZmljYXRpb25zLnNldCggb3duZXIsIHZlcmlmeSgpICkuZ2V0KCBvd25lciApO1xuXG5jb25zdCB0ZXN0TmFtZVByZWZpeCA9IGBfX3Rlc3RfJHthcHBOYW1lfWA7XG5jb25zdCBzYW1lSXRlbXMgPSAoIGFzLCBicyApID0+IGFzLmxlbmd0aCA9PT0gYnMubGVuZ3RoICYmIGFzLmV2ZXJ5KCB4ID0+IH5icy5pbmRleE9mKCB4ICkgKTtcbmNvbnN0IHNhbWVKU09OID0gKCBhLCBiICkgPT4gSlNPTi5zdHJpbmdpZnkoIGEgKSA9PT0gSlNPTi5zdHJpbmdpZnkoIGIgKTtcbmNvbnN0IHN1ZmZpeCA9ICggeCwgc3VmZml4ZXMgKSA9PiBzdWZmaXhlcy5tYXAoIHAgPT4gYCR7eH1fXyR7cH1gICk7XG5cbmZ1bmN0aW9uIGV4cGVjdDQwOUVycm9yKCBlcnIgKSB7XG5cbiAgICBpZiAoIGVyci5jb2RlICE9PSA0MDkgKSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBgRXhwZWN0ZWQgYSA0MDkgcmVqZWN0aW9uIG9mIG5vbi1vdmVyd3JpdGUgcmVxdWVzdCwgYnV0IGdvdCAke2Vycn1gICk7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gcHJvbWlzZUFsbFRydXRoeSggcHJvbWlzZXMgKSB7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoIHByb21pc2VzLm1hcCggcCA9PiBwLmNhdGNoKCBsb2dFcnJvciApICkgKS50aGVuKCAoIHJlc3VsdHMgKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZmFpbHMgPSByZXN1bHRzLm1hcCggKCB4LCBpICkgPT4ge1xuXG4gICAgICAgICAgICBpZiAoIHggKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlc1sgaSBdO1xuXG4gICAgICAgIH0gKS5maWx0ZXIoIHggPT4geCApO1xuICAgICAgICByZXR1cm4gZmFpbHMubGVuZ3RoID8gUHJvbWlzZS5yZWplY3QoIGZhaWxzICkgOiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIH0gKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlDYW5TdG9yZSggZGF0YSwgdGVzdE5hbWUsIHRlc3RDb250ZW50ICkge1xuXG4gICAgY29uc3Qgb3ZlcndyaXRlVGVzdE5hbWUgPSBgJHt0ZXN0TmFtZX0tcHJlZXhpc3RpbmdgO1xuICAgIHJldHVybiBwcm9taXNlQWxsVHJ1dGh5KCBbXG5cbiAgICAgICAgZGF0YS5zYXZlKCB0ZXN0TmFtZSwgdGVzdENvbnRlbnQgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IGRhdGEubG9hZCggdGVzdE5hbWUgKSApXG4gICAgICAgICAgICAudGhlbiggY29udGVudCA9PiBzYW1lSlNPTiggdGVzdENvbnRlbnQsIGNvbnRlbnQgKSApLFxuXG4gICAgICAgIGRhdGEuc2F2ZSggb3ZlcndyaXRlVGVzdE5hbWUsIDQyIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiBkYXRhLnNhdmUoIG92ZXJ3cml0ZVRlc3ROYW1lLCA0MiwgeyBvdmVyd3JpdGU6IGZhbHNlIH0gKSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCBcIkZhaWxlZCB0byByZWplY3Qgbm9uLW92ZXJ3cml0ZSByZXF1ZXN0XCIgKTtcblxuICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAuY2F0Y2goIGV4cGVjdDQwOUVycm9yIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB0cnVlIClcblxuICAgIF0gKS5jYXRjaCggKCkgPT4gZmFsc2UgKTtcblxufVxuXG5mdW5jdGlvbiBkZWxldGVMaXN0aW5nKCBkYXRhLCBsaXN0aW5nICkge1xuXG4gICAgcmV0dXJuIHByb21pc2VBbGxUcnV0aHkoIGxpc3RpbmcubWFwKCB4ID0+IGRhdGEucGVybURlbGV0ZSggeCApICkgKTtcblxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUR1bW1pZXMoIGRhdGEsIG5hbWVzICkge1xuXG4gICAgcmV0dXJuIHByb21pc2VBbGxUcnV0aHkoIG5hbWVzLm1hcCggeCA9PiBkYXRhLnNhdmUoIHgsIFwiaGVsbG8sIGR1bW15XCIgKSApICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5RGF0YUNhbkxpc3QoIGRhdGEsIHRlc3ROYW1lICkge1xuXG4gICAgY29uc3QgbGlzdFRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19saXN0YDtcbiAgICBjb25zdCBsaXN0VGVzdE5hbWVzID0gc3VmZml4KCBsaXN0VGVzdE5hbWUsIFsgMSwgMiwgMyBdICk7XG4gICAgcmV0dXJuIGRhdGEubGlzdCggbGlzdFRlc3ROYW1lIClcbiAgICAgICAgLnRoZW4oIGxpc3RpbmcgPT4gZGVsZXRlTGlzdGluZyggZGF0YSwgbGlzdGluZyApIClcbiAgICAgICAgLnRoZW4oICgpID0+IGdlbmVyYXRlRHVtbWllcyggZGF0YSwgbGlzdFRlc3ROYW1lcyApIClcbiAgICAgICAgLnRoZW4oICgpID0+IGRhdGEubGlzdCggbGlzdFRlc3ROYW1lICkgKVxuICAgICAgICAudGhlbiggbGlzdGluZyA9PiBzYW1lSXRlbXMoIGxpc3RpbmcubWFwKCB4ID0+IHgubmFtZSApLCBsaXN0VGVzdE5hbWVzICkgKTtcblxufVxuXG5mdW5jdGlvbiB2ZXJpZnlEYXRhQ2FuRGVsZXRlKCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIGNvbnN0IGRlbGV0ZVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19kZWxldGVgO1xuICAgIHJldHVybiBkYXRhLnNhdmUoIGRlbGV0ZVRlc3ROYW1lLCBcInN0dWZmXCIgKVxuICAgICAgICAudGhlbiggZmlsZVNwZWMgPT4gZGF0YS5wZXJtRGVsZXRlKCBmaWxlU3BlYyApLnRoZW4oICgpID0+IGRhdGEubG9hZCggZmlsZVNwZWMgKSApIClcbiAgICAgICAgLmNhdGNoKCBlcnIgPT4gbG9nRXJyb3IoIGVyciApIHx8IFByb21pc2UucmVzb2x2ZSggZXJyLmNvZGUgPT09IDQwNCApICk7XG5cbn1cblxuZnVuY3Rpb24gZGVsZXRlQWxsKCBkYXRhLCB0ZXN0TmFtZSApIHtcblxuICAgIHJldHVybiBkYXRhLmxpc3QoIHRlc3ROYW1lIClcbiAgICAgICAgLnRoZW4oIGxpc3RpbmcgPT4gcHJvbWlzZUFsbFRydXRoeSggbGlzdGluZy5tYXAoIHggPT4gZGF0YS5wZXJtRGVsZXRlKCB4ICkgKSApICk7XG5cbn1cblxuZnVuY3Rpb24gdmVyaWZ5RGF0YSggZGF0YSwgdGVzdE5hbWUsIHRlc3RDb250ZW50ICkge1xuXG4gICAgY29uc3QgZGF0YVRlc3ROYW1lID0gYCR7dGVzdE5hbWV9X19kYXRhYDtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGNhbkxpc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuU3RvcmU6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlOiB1bmRlZmluZWQsXG4gICAgICAgIGNhbkdldDogdW5kZWZpbmVkLFxuICAgIH07XG4gICAgcmV0dXJuIHZlcmlmeUNhblN0b3JlKCBkYXRhLCBkYXRhVGVzdE5hbWUsIHRlc3RDb250ZW50IClcbiAgICAgICAgLnRoZW4oICggY2FuU3RvcmUgKSA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdC5jYW5TdG9yZSA9IHJlc3VsdC5jYW5HZXQgPSBjYW5TdG9yZTtcbiAgICAgICAgICAgIGlmICggIWNhblN0b3JlICkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoIFtcblxuICAgICAgICAgICAgICAgIHZlcmlmeURhdGFDYW5MaXN0KCBkYXRhLCBkYXRhVGVzdE5hbWUgKSxcbiAgICAgICAgICAgICAgICB2ZXJpZnlEYXRhQ2FuRGVsZXRlKCBkYXRhLCBkYXRhVGVzdE5hbWUgKVxuXG4gICAgICAgICAgICBdICkudGhlbiggKCBbIGNhbkxpc3QsIGNhbkRlbGV0ZSBdICkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmNhbkxpc3QgPSBjYW5MaXN0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC5jYW5EZWxldGUgPSBjYW5EZWxldGU7XG5cbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICB9IClcbiAgICAgICAgLnRoZW4oICgpID0+IHJlc3VsdCApO1xuXG59XG5cbmNvbnN0IGVxdWFsc0pTT04gPSAoIHgsIHkgKSA9PiBKU09OLnN0cmluZ2lmeSggeCApID09PSBKU09OLnN0cmluZ2lmeSggeSApO1xuXG5hc3luYyBmdW5jdGlvbiB2ZXJpZnlQcm9qZWN0c09wZXJhdGlvbnMoKSB7XG5cbiAgICBjb25zdCByZXBvVGVzdE5hbWUgPSBgJHt0ZXN0TmFtZVByZWZpeH1fX3JlcG9gO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcblxuICAgICAgICBjYW5MaXN0UHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuQ3JlYXRlUHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlUHJvamVjdHM6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuU2F2ZURhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuTG9hZERhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FuRGVsZXRlRGF0YTogdW5kZWZpbmVkXG5cbiAgICB9O1xuICAgIGNvbnN0IGJ1aWxkVGVzdFByb2plY3RzID0gc3VmZml4KCByZXBvVGVzdE5hbWUsIFsgMSwgMiBdICkubWFwKCB4ID0+IHByb2plY3RzLmJ1aWxkKCB4ICkgKTtcbiAgICBjb25zdCB0ZXN0UHJvamVjdHMgPSBhd2FpdCBQcm9taXNlLmFsbCggYnVpbGRUZXN0UHJvamVjdHMgKTtcbiAgICBjb25zdCByZWNyZWF0ZVRlc3RQcm9qZWN0cyA9IHRlc3RQcm9qZWN0cy5tYXAoIHggPT4geC5kZWxldGVTZWxmKCkudGhlbiggKCkgPT4geC5zYXZlKCkgKSApO1xuICAgIHRyeSB7XG5cbiAgICAgICAgLy8gKHJlKWNyZWF0ZSBhbGwgdGVzdCBwcm9qZWN0c1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCggcmVjcmVhdGVUZXN0UHJvamVjdHMgKTtcblxuICAgICAgICAvLyBjaGVjayB0aGUgbGlzdGluZyBzaG93cyB0aGUgcHJvamVjdHNcbiAgICAgICAgcmVzdWx0LmNhbkxpc3RQcm9qZWN0cyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBsaXN0aW5nID0gYXdhaXQgcHJvamVjdHMubGlzdCgpO1xuICAgICAgICByZXN1bHQuY2FuTGlzdFByb2plY3RzID0gdGVzdFByb2plY3RzLmV2ZXJ5KCBwID0+IH5saXN0aW5nLmluZGV4T2YoIHAubmFtZSApICk7XG4gICAgICAgIGlmICggIXJlc3VsdC5jYW5MaXN0UHJvamVjdHMgKSB0aHJvdyBuZXcgRXJyb3IoIFwiQ2FuJ3QgbGlzdC9jcmVhdGUgcHJvamVjdHNcIiApO1xuICAgICAgICByZXN1bHQuY2FuQ3JlYXRlUHJvamVjdHMgPSB0cnVlO1xuXG4gICAgICAgIC8vIGRlbGV0ZSBvbmUgb2YgdGhlbSBhbmQgY2hlY2sgaXQncyBnb25lXG4gICAgICAgIGF3YWl0IHRlc3RQcm9qZWN0c1sgMCBdLmRlbGV0ZVNlbGYoKTtcbiAgICAgICAgY29uc3QgbmV3TGlzdGluZyA9IGF3YWl0IHByb2plY3RzLmxpc3QoKTtcbiAgICAgICAgcmVzdWx0LmNhbkRlbGV0ZVByb2plY3RzID0gIX5uZXdMaXN0aW5nLmluZGV4T2YoIHRlc3RQcm9qZWN0c1sgMCBdLm5hbWUgKTtcbiAgICAgICAgaWYgKCAhcmVzdWx0LmNhbkRlbGV0ZVByb2plY3RzICkgdGhyb3cgbmV3IEVycm9yKCBcIkNhbid0IGRlbGV0ZSBwcm9qZWN0c1wiICk7XG5cbiAgICAgICAgLy8gYWRkIGEgc2VnbWVudCB0byB0aGUgcmVtYWluaW5nIG9uZVxuICAgICAgICBjb25zdCByZW1vYW5lciA9IHRlc3RQcm9qZWN0c1sgMSBdO1xuICAgICAgICByZW1vYW5lci5zZWdtZW50KCBcImV1XCIsIHsgc2VudGltZW50OiBcImJ5ZS1ieWVcIiB9ICk7XG4gICAgICAgIHJlbW9hbmVyLnNlZ21lbnQoIFwidWtcIiwgeyBzZW50aW1lbnQ6IFwiaG1tbW1cIiB9ICk7XG4gICAgICAgIHJlbW9hbmVyLnNlZ21lbnQoIFwid29ybGRcIiwgeyBzZW50aW1lbnQ6IFwiaGVsbG9cIiB9ICk7XG4gICAgICAgIHJlbW9hbmVyLnJlbW92ZVNlZ21lbnQoIFwid29ybGRcIiApO1xuICAgICAgICByZXN1bHQuY2FuU2F2ZURhdGEgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgcmVtb2FuZXIuc2F2ZSgpO1xuICAgICAgICByZXN1bHQuY2FuU2F2ZURhdGEgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gYnVpbGQgYW5kIGxvYWQgYSBkdXBsaWNhdGUgcHJvamVjdFxuICAgICAgICBjb25zdCByZW1vYW5lcjIgPSBhd2FpdCBwcm9qZWN0cy5idWlsZCggcmVtb2FuZXIubmFtZSApO1xuICAgICAgICByZXN1bHQuY2FuTG9hZERhdGEgPSBmYWxzZTtcbiAgICAgICAgYXdhaXQgcmVtb2FuZXIyLmxvYWQoKTtcbiAgICAgICAgcmVzdWx0LmNhbkxvYWREYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICByZXN1bHQuY2FuTG9hZERhdGEgPSAoIHR5cGVvZiByZW1vYW5lcjIuc2VnbWVudCggXCJ3b3JsZFwiICkgPT09IFwidW5kZWZpbmVkXCIgKVxuICAgICAgICAgICAgJiYgZXF1YWxzSlNPTiggcmVtb2FuZXIyLnNlZ21lbnQoIFwidWtcIiApLCByZW1vYW5lci5zZWdtZW50KCBcInVrXCIgKSApXG4gICAgICAgICAgICAmJiBlcXVhbHNKU09OKCByZW1vYW5lcjIuc2VnbWVudCggXCJldVwiICksIHJlbW9hbmVyLnNlZ21lbnQoIFwiZXVcIiApICk7XG4gICAgICAgIHJlc3VsdC5jYW5TYXZlRGF0YSA9IHJlc3VsdC5jYW5Mb2FkRGF0YTtcbiAgICAgICAgaWYgKCAhcmVzdWx0LmNhblNhdmVEYXRhICkgdGhyb3cgbmV3IEVycm9yKCBcIlNhdmUgYW5kL29yIExvYWQgZGF0YSBkaWRuJ3Qgd29ya1wiICk7XG5cbiAgICAgICAgLy8gZGVsZXRlIG9uZSBvZiB0aGUgc2VnbWVudHMsIHNhdmUsIHRoZW4gcmVsb2FkIHRoZSBvcmlnaW5hbCBwcm9qZWN0XG4gICAgICAgIHJlc3VsdC5jYW5EZWxldGVEYXRhID0gZmFsc2U7XG4gICAgICAgIHJlbW9hbmVyMi5yZW1vdmVTZWdtZW50KCBcInVrXCIgKTtcbiAgICAgICAgcmVtb2FuZXIyLnJlbW92ZVNlZ21lbnQoIFwiZXVcIiApO1xuICAgICAgICByZW1vYW5lcjIuc2VnbWVudCggXCJldVwiLCB7IHNlbnRpbWVudDogXCJoZWxsbyBhZ2FpbiFcIiB9ICk7XG4gICAgICAgIGF3YWl0IHJlbW9hbmVyMi5zYXZlKCk7XG4gICAgICAgIGF3YWl0IHJlbW9hbmVyLmxvYWQoKTtcbiAgICAgICAgcmVzdWx0LmNhbkRlbGV0ZURhdGEgPSAoIHR5cGVvZiByZW1vYW5lci5zZWdtZW50KCBcInVrXCIgKSA9PT0gXCJ1bmRlZmluZWRcIiApXG4gICAgICAgICAgICAmJiBlcXVhbHNKU09OKCByZW1vYW5lci5zZWdtZW50KCBcImV1XCIgKSwgcmVtb2FuZXIyLnNlZ21lbnQoIFwiZXVcIiApICk7XG4gICAgICAgIGlmICggIXJlc3VsdC5jYW5EZWxldGVEYXRhICkgdGhyb3cgbmV3IEVycm9yKCBcIkRlbGV0ZSBkYXRhIGRpZG4ndCB3b3JrXCIgKTtcblxuICAgIH0gY2F0Y2ggKCBleCApIHtcblxuICAgICAgICBsb2dFcnJvciggZXggKTtcbiAgICAgICAgcmVzdWx0LmV4ID0gZXg7XG5cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcblxufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbnVwVGVzdFN0b3JhZ2UoIGRhdGEsIHRlc3ROYW1lICkge1xuXG4gICAgdHJ5IHtcblxuICAgICAgICBhd2FpdCBkZWxldGVBbGwoIGRhdGEsIHRlc3ROYW1lICk7XG5cbiAgICB9IGNhdGNoICggZXJyICkge1xuXG4gICAgICAgIGxvZ0Vycm9yKCBcIkNsZWFuaW5nIHVwIGFmdGVyIHNlbGYgdGVzdFwiLCBlcnIgKTtcblxuICAgIH1cblxufVxuXG5jb25zdCB2ZXJpZnlTdG9yYWdlID0gb3duZXIgPT4gY2FjaGVkVmVyaWZpY2F0aW9uKCBvd25lciwgc3RvcmFnZVZlcmlmaWNhdGlvbnMsIGFzeW5jICgpID0+IHtcblxuICAgIGxldCBkYXRhO1xuICAgIHRyeSB7XG5cbiAgICAgICAgYXdhaXQgb3duZXIud2FpdEZvckxvYWQoKTtcbiAgICAgICAgZGF0YSA9IGF3YWl0IERhdGEuaW5Gb2xkZXIoIGFwcE5hbWUgKTtcbiAgICAgICAgY29uc3QgdGVzdERhdGEgPSBhd2FpdCBmZXRjaCggXCIvcHVibGljL2RhdGEvbm90c2hha2EuanNvblwiICkudGhlbiggcmVzID0+IHJlcy5qc29uKCkgKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHZlcmlmeURhdGEoIGRhdGEsIHRlc3ROYW1lUHJlZml4LCB0ZXN0RGF0YSApLmNhdGNoKCBsb2dFcnJvciApO1xuXG4gICAgfSBmaW5hbGx5IHtcblxuICAgICAgICBsb2coIFwiVmVyaWZ5IGFsbCBzdG9yYWdlIGNvbXBsZXRlIC0gY2xlYW5pbmcgdXAgdGVzdCBzdG9yYWdlXCIgKTtcbiAgICAgICAgYXdhaXQgY2xlYW51cFRlc3RTdG9yYWdlKCBkYXRhLCB0ZXN0TmFtZVByZWZpeCApO1xuXG4gICAgfVxuXG59ICk7XG5cbmNvbnN0IHZlcmlmeVByb2plY3RzID0gb3duZXIgPT4gY2FjaGVkVmVyaWZpY2F0aW9uKCBvd25lciwgcHJvamVjdHNWZXJpZmljYXRpb25zLCBhc3luYyAoKSA9PiB7XG5cbiAgICBsZXQgZGF0YTtcbiAgICB0cnkge1xuXG4gICAgICAgIGF3YWl0IG93bmVyLndhaXRGb3JMb2FkKCk7XG4gICAgICAgIGRhdGEgPSBhd2FpdCBEYXRhLmluRm9sZGVyKCBhcHBOYW1lICk7XG4gICAgICAgIHJldHVybiBhd2FpdCB2ZXJpZnlQcm9qZWN0c09wZXJhdGlvbnMoIHByb2plY3RzLCB0ZXN0TmFtZVByZWZpeCApLmNhdGNoKCBsb2dFcnJvciApO1xuXG4gICAgfSBmaW5hbGx5IHtcblxuICAgICAgICBsb2coIFwiVmVyaWZ5IHByb2plY3RzIGNvbXBsZXRlIC0gY2xlYW5pbmcgdXAgdGVzdCBzdG9yYWdlXCIsIG93bmVyICk7XG4gICAgICAgIGF3YWl0IGNsZWFudXBUZXN0U3RvcmFnZSggZGF0YSwgdGVzdE5hbWVQcmVmaXggKTtcblxuICAgIH1cblxufSApO1xuXG5jbGFzcyBHb29nbGVDYXBhYmlsaXRpZXMgZXh0ZW5kcyBQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciggXCJZb3VyIEdvb2dsZSBEcml2ZSBzdG9yYWdlXCIgKTtcblxuICAgIH1cblxuICAgIGFzeW5jIGNsZWFyKCkge1xuXG4gICAgICAgIGF3YWl0IHN0b3JhZ2VWZXJpZmljYXRpb25zLmRlbGV0ZSggdGhpcyApO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5TGlzdCgpIHtcblxuICAgICAgICBjb25zdCB7IGNhbkxpc3QgfSA9IGF3YWl0IHZlcmlmeVN0b3JhZ2UoIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuICEhY2FuTGlzdDtcblxuICAgIH1cblxuICAgIGFzeW5jIHZlcmlmeVN0b3JlKCkge1xuXG4gICAgICAgIGNvbnN0IHsgY2FuU3RvcmUgfSA9IGF3YWl0IHZlcmlmeVN0b3JhZ2UoIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuICEhY2FuU3RvcmU7XG5cbiAgICB9XG5cbiAgICBhc3luYyB2ZXJpZnlHZXQoKSB7XG5cbiAgICAgICAgY29uc3QgeyBjYW5HZXQgfSA9IGF3YWl0IHZlcmlmeVN0b3JhZ2UoIHRoaXMgKTtcbiAgICAgICAgcmV0dXJuICEhY2FuR2V0O1xuXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5RGVsZXRlKCkge1xuXG4gICAgICAgIGNvbnN0IHsgY2FuRGVsZXRlIH0gPSBhd2FpdCB2ZXJpZnlTdG9yYWdlKCB0aGlzICk7XG4gICAgICAgIHJldHVybiAhIWNhbkRlbGV0ZTtcblxuICAgIH1cblxuICAgIGFzeW5jIHZlcmlmeVByb2plY3RzKCkge1xuXG4gICAgICAgIHJldHVybiB2ZXJpZnlQcm9qZWN0cyggdGhpcyApO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBHb29nbGVDYXBhYmlsaXRpZXMoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZ2FwaS9Hb29nbGVDYXBhYmlsaXRpZXMuanMiLCIvKiBnbG9iYWwgZG9jdW1lbnQsIEN1c3RvbUV2ZW50LCB3aW5kb3cgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuYXN5bmMgZnVuY3Rpb24gdGVzdFNlcnZpY2VzKCBlLCBzZXJ2aWNlcyApIHtcblxuICAgIHNlcnZpY2VzLmNhcGFiaWxpdGllcy52ZXJpZnlQcm9qZWN0UmVwbygpLnRoZW4oIGNvbnNvbGUubG9nLmJpbmQoIGNvbnNvbGUgKSApO1xuICAgIHdpbmRvdy54ID0gc2VydmljZXM7XG4gICAgd2luZG93LnRlc3RQcm9qZWN0ID0gYXdhaXQgc2VydmljZXMucHJvamVjdHMuYnVpbGQoIFwidGVzdFwiICk7XG5cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRlc3QoKSB7XG5cbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KCBuZXcgQ3VzdG9tRXZlbnQoIFwibG9jYXRlLXNlcnZpY2VzXCIsIHsgZGV0YWlsOiB0ZXN0U2VydmljZXMgfSApICk7XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zZWxmLXRlc3QuanMiXSwic291cmNlUm9vdCI6IiJ9