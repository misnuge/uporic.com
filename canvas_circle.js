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


    var _controller = __webpack_require__(1);
    
    var _controller2 = _interopRequireDefault(_controller);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var lastTime = void 0;
    var controller = void 0;
    
    function init() {
        lastTime = Date.now();
        controller = new _controller2.default('#header-background');
    
        handleResize();
        // Set up event listeners.
        window.addEventListener('resize', handleResize);
        // Kick off the update loop
        window.requestAnimationFrame(everyFrame);
    
        window.addEventListener('mousemove', handleMouseEvent);
    }
    
    // TODO: Make tweak this to allow frame skipping for slow computers. Maybe.
    function everyFrame() {
        update();
        render();
        requestAnimationFrame(everyFrame);
    }
    
    function update() {
        var curTime = Date.now();
        var dt = (curTime - lastTime) / 1000;
        controller.update(dt);
        lastTime = curTime;
    }
    
    function render() {
        controller.clear();
        controller.render();
    }
    
    function handleResize() {
        controller.resize();
    }
    
    function handleMouseEvent(evt) {
        controller.onMouseInput({ x: evt.clientX, y: evt.clientY });
    }
    
    init();
    
    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    
    var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    var _util = __webpack_require__(2);
    
    var _circle = __webpack_require__(3);
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var MINUTES = 60;
    
    var COLORS = [{ r: 69, g: 74, b: 222 }, { r: 206, g: 45, b: 79 }, { r: 255, g: 190, b: 11 }, { r: 69, g: 74, b: 222 }];
    
    var Controller = function () {
        function Controller(canvasSelector) {
            _classCallCheck(this, Controller);
    
            this.canvas = document.querySelector(canvasSelector);
            /** @type {!CanvasRenderingContext2D} */
            this.context = this.canvas.getContext('2d');
    
            this.width = 100;
            this.height = 100;
            this.scale = 1;
    
            this.colorAnimAmt = Math.random();
            this.colorPeriod = 3 * MINUTES;
            this.baseColor = 'grey', this.highlightColor = 'white';
    
            var _getColor = getColor(this.colorAnimAmt);
    
            var _getColor2 = _slicedToArray(_getColor, 2);
    
            this.baseColor = _getColor2[0];
            this.highlightColor = _getColor2[1];
    
    
            this.animAmt = Math.random();
            this.period = 60;
    
            this.updateCssAmt = 1; // start at 1 -> update the CSS straight away
            this.updateCssPeriod = 0.5;
    
            this.currentOriginPoint = this.originPoint;
    
            this.lastMousePoint = { x: 0, y: 0 };
            this.mouseAmt = 0;
            this.mouseFallbackTime = 5;
    
            this.circles = [];
        }
    
        _createClass(Controller, [{
            key: "update",
            value: function update(dt) {
                this.addAllCircles();
    
                this.animAmt += dt / this.period;
                this.animAmt %= 1;
    
                this.colorAnimAmt += dt / this.colorPeriod;
                this.colorAnimAmt %= 1;
    
                var _getColor3 = getColor(this.colorAnimAmt);
    
                var _getColor4 = _slicedToArray(_getColor3, 2);
    
                this.baseColor = _getColor4[0];
                this.highlightColor = _getColor4[1];
    
    
                this.updateCssAmt += dt / this.updateCssPeriod;
    
                this.mouseAmt -= dt / this.mouseFallbackTime;
                if (this.mouseAmt < 0) {
                    this.mouseAmt = 0;
                }
    
                var originPoint = this.adjustedOriginPoint;
                this.currentOriginPoint = {
                    x: (0, _util.slurp)(this.currentOriginPoint.x, originPoint.x, 0.1),
                    y: (0, _util.slurp)(this.currentOriginPoint.y, originPoint.y, 0.1)
                };
            }
        }, {
            key: "clear",
            value: function clear() {
                // Clear the previous frame
                this.context.resetTransform();
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
                this.context.scale(this.scale, this.scale);
            }
    
            /**
       * @param {CanvasRenderingContext2D} context 
       */
    
        }, {
            key: "render",
            value: function render() {
                var originPoint = this.currentOriginPoint;
    
                this.context.fillStyle = this.baseColor;
                this.context.fillRect(0, 0, this.width, this.height);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
    
                try {
                    for (var _iterator = this.circles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var circle = _step.value;
    
                        var sqDistToOrigin = circle.sqDistToPoint(originPoint);
                        var distAmt = 1 / sqDistToOrigin;
                        var points = (0, _util.clampedSlurp)(3, 50, 500 * distAmt * circle.radius);
    
                        this.context.beginPath();
                        this.context.strokeStyle = this.highlightColor;
                        this.context.lineWidth = 2;
                        this.drawShape(this.transformPoints(circle.getPoints(points)));
                        this.context.stroke();
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
    
                if (this.updateCssAmt >= 1) {
                    this.updateCssAmt = 0;
                    // I guess also update the CSS here?
                    document.body.style.setProperty('--base-color', this.baseColor);
                }
            }
        }, {
            key: "resize",
            value: function resize() {
                var pixelRatio = window.devicePixelRatio || 1;
    
                this.canvas.width = this.canvas.clientWidth * pixelRatio;
                this.canvas.height = this.canvas.clientHeight * pixelRatio;
                this.scale = pixelRatio;
                this.width = this.canvas.clientWidth;
                this.height = this.canvas.clientHeight;
    
                this.render();
            }
        }, {
            key: "onMouseInput",
            value: function onMouseInput(mousePoint) {
                if (mousePoint.y > this.height) {
                    return;
                }
                this.lastMousePoint = mousePoint;
                this.mouseAmt = 1;
            }
        }, {
            key: "drawShape",
            value: function drawShape(points) {
                for (var i = 0; i < points.length; i++) {
                    if (i == 0) {
                        this.context.moveTo(points[i].x, points[i].y);
                    } else {
                        this.context.lineTo(points[i].x, points[i].y);
                    }
                }
                this.context.closePath();
            }
        }, {
            key: "transformPoints",
            value: function transformPoints(points) {
                var originPoint = this.currentOriginPoint;
                return points.map(function (p) {
                    var x = p.x - originPoint.x;
                    var y = p.y - originPoint.y;
                    var r = x * x + y * y;
                    var scaleThing = 0.00006;
                    return {
                        x: x / (scaleThing * r) + originPoint.x,
                        y: y / (scaleThing * r) + originPoint.y
                    };
                });
            }
        }, {
            key: "addAllCircles",
            value: function addAllCircles() {
                while (this.circles.length < 400) {
                    this.addCircle();
                }
            }
        }, {
            key: "addCircle",
            value: function addCircle() {
                var circle = new _circle.Circle();
                circle.radius = (0, _util.experp)(30, 70, Math.random());
                while (true) {
                    circle.x = (0, _util.slurp)(-1, 2, Math.random()) * this.canvas.width;
                    circle.y = (0, _util.slurp)(-1, 2, Math.random()) * this.canvas.height;
    
                    var touching = false;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
    
                    try {
                        for (var _iterator2 = this.circles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var other = _step2.value;
    
                            if (circle.touching(other)) {
                                touching = true;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
    
                    if (touching) {
                        circle.radius *= 0.9;
                        continue;
                    }
    
                    break;
                }
    
                this.circles.push(circle);
            }
        }, {
            key: "originAmt",
            get: function get() {
                return {
                    x: 0.5 + 0.3 * Math.cos(2 * Math.PI * this.animAmt),
                    y: 0.5 + 0.3 * Math.sin(3 * 2 * Math.PI * this.animAmt)
                };
            }
        }, {
            key: "originPoint",
            get: function get() {
                var originAmt = this.originAmt;
                return {
                    x: this.width * originAmt.x,
                    y: this.height * originAmt.y
                };
            }
    
            // Combination of the mouse position and the origin point.
    
        }, {
            key: "adjustedOriginPoint",
            get: function get() {
                // just doing this for the mo
                var originPoint = this.originPoint;
                var adjustedMouseAmt = (0, _util.easeInOut)(this.mouseAmt, 3);
                return {
                    x: (0, _util.slurp)(originPoint.x, this.lastMousePoint.x, adjustedMouseAmt),
                    y: (0, _util.slurp)(originPoint.y, this.lastMousePoint.y, adjustedMouseAmt)
                };
            }
        }]);
    
        return Controller;
    }();
    
    exports.default = Controller;
    
    
    function getColor(amt) {
        var colorIndex = Math.floor(3 * amt);
        var colorAmt = (0, _util.easeInOut)(3 * amt % 1, 5);
    
        var colorComponents = {
            r: (0, _util.slurp)(COLORS[colorIndex].r, COLORS[colorIndex + 1].r, colorAmt),
            g: (0, _util.slurp)(COLORS[colorIndex].g, COLORS[colorIndex + 1].g, colorAmt),
            b: (0, _util.slurp)(COLORS[colorIndex].b, COLORS[colorIndex + 1].b, colorAmt)
        };
    
        var baseColor = (0, _util.rgb)(0.8 * colorComponents.r, 0.8 * colorComponents.g, 0.8 * colorComponents.b);
        var highlightColor = (0, _util.rgb)(colorComponents.r, colorComponents.g, colorComponents.b);
        return [baseColor, highlightColor];
    }
    
    /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.easeInOut = easeInOut;
    exports.sinEaseInOut = sinEaseInOut;
    exports.slurp = slurp;
    exports.experp = experp;
    exports.clampedSlurp = clampedSlurp;
    exports.clamp = clamp;
    exports.divideInterval = divideInterval;
    exports.rgb = rgb;
    exports.hsl = hsl;
    exports.hslLerp = hslLerp;
    exports.angleLerp = angleLerp;
    exports.radianAngleLerp = radianAngleLerp;
    exports.gray = gray;
    function easeInOut(t) {
        var amt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    
        var tPow = Math.pow(t, amt);
        return tPow / (tPow + Math.pow(1 - t, amt));
    }
    
    function sinEaseInOut(t) {
        return 0.5 - 0.5 * Math.cos(Math.PI * t);
    }
    
    function slurp(val1, val2, amt) {
        return (val2 - val1) * amt + val1;
    }
    
    function experp(val1, val2, amt) {
        return Math.exp(slurp(Math.log(val1), Math.log(val2), amt));
    }
    
    function clampedSlurp(val1, val2, amt) {
        if (amt < 0) {
            return val1;
        }
        if (amt > 1) {
            return val2;
        }
        return slurp(val1, val2, amt);
    }
    
    function clamp(amt, val1, val2) {
        if (amt < 0) {
            return val1;
        }
        if (amt > 1) {
            return val2;
        }
        return amt;
    }
    
    /**
     * Extracts a 0-1 interval from a section of a 0-1 interval
     *
     * For example, if min == 0.3 and max == 0.7, you get:
     *
     *           0.3  0.7
     *     t: 0 --+----+-- 1
     *           /      \
     *          /        \
     *         /          \
     *     -> 0 ---------- 1
     *
     * Useful for making sub animations.
     *
     * Doesn't do any clamping, so you might want to clamp yourself.
     */
    function divideInterval(t, min, max) {
        return (t - min) / (max - min);
    }
    
    function rgb(r, g, b) {
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    
    function hsl(h, s, l) {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);
        return "hsl(" + h + "," + s + "%," + l + "%)";
    }
    
    function hslLerp(color1, color2, amt) {
        return {
            h: 360 * angleLerp(color1.h / 360, color2.h / 360, amt),
            s: slurp(color1.s, color2.s, amt),
            l: slurp(color1.l, color2.l, amt)
        };
    }
    
    /**
     * @param {number} angle1 0 to 1
     * @param {number} angle2 0 to 1
     * @param {number} amt 0 to 1
     */
    function angleLerp(angle1, angle2, amt) {
        return radianAngleLerp(2 * Math.PI * angle1, 2 * Math.PI * angle2, amt) / (2 * Math.PI);
    }
    
    function radianAngleLerp(angle1, angle2, amt) {
        var x1 = Math.cos(angle1);
        var y1 = Math.sin(angle1);
        var x2 = Math.cos(angle2);
        var y2 = Math.sin(angle2);
        var x3 = slurp(x1, x2, amt);
        var y3 = slurp(y1, y2, amt);
        return Math.atan2(y3, x3);
    }
    
    function gray(whiteAmt) {
        whiteAmt = clamp(whiteAmt, 0, 1);
        var whiteRgb = Math.floor(255 * whiteAmt);
        return rgb(whiteRgb, whiteRgb, whiteRgb);
    }
    
    /***/ }),
    /* 3 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var Circle = exports.Circle = function () {
        function Circle() {
            _classCallCheck(this, Circle);
    
            this.x = 0;
            this.y = 0;
            this.radius = 0;
        }
    
        /**
         * @param {Circle} circle 
         */
    
    
        _createClass(Circle, [{
            key: "touching",
            value: function touching(circle) {
                var xDist = this.x - circle.x;
                var yDist = this.y - circle.y;
                var sqDist = xDist * xDist + yDist * yDist;
    
                var minDist = this.radius + circle.radius;
    
                return sqDist < minDist * minDist;
            }
        }, {
            key: "sqDistToPoint",
            value: function sqDistToPoint(point) {
                var xDist = this.x - point.x;
                var yDist = this.y - point.y;
                var sqDist = xDist * xDist + yDist * yDist;
                return sqDist;
            }
    
            /**
             * @param {CanvasRenderingContext2D} context 
             */
    
        }, {
            key: "render",
            value: function render(context) {
                context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            }
        }, {
            key: "getPoints",
            value: function getPoints(numPoints) {
                // TODO: cache this?
                var points = [];
                for (var i = 0; i < numPoints; i++) {
                    var amt = i / numPoints;
                    var angle = 2 * Math.PI * amt;
                    points.push({
                        x: this.x + this.radius * Math.cos(angle),
                        y: this.y + this.radius * Math.sin(angle)
                    });
                }
                return points;
            }
        }]);
    
        return Circle;
    }();
    
    /***/ })
    /******/ ]);
    //# sourceMappingURL=main.bundle.js.map