"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _wtcControllerElement = _interopRequireWildcard(require("wtc-controller-element"));

var _wtcUtilityBreakpoint = _interopRequireDefault(require("wtc-utility-breakpoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Carousel = /*#__PURE__*/function (_ElementController) {
  _inherits(Carousel, _ElementController);

  function Carousel(element) {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Carousel).call(this, element));
    _this.el = element;
    _this.container = _this.el.querySelector('.carousel__container');
    _this.children = [];

    for (var i = 0; i < _this.container.children.length; i++) {
      _this.children.push(_this.container.children[i].cloneNode(true));
    }

    _this.nextChild = 0;
    _this.onPointerLeave = _this.onPointerLeave.bind(_assertThisInitialized(_this));
    _this.onPointerMove = _this.onPointerMove.bind(_assertThisInitialized(_this));
    _this.onResize = _this.onResize.bind(_assertThisInitialized(_this));
    _this.run = _this.run.bind(_assertThisInitialized(_this));

    _this.el.addEventListener('pointermove', _this.onPointerMove);

    _this.el.addEventListener('pointerleave', _this.onPointerLeave);

    _this.testSize();

    _this.animating = true;
    return _this;
  }

  _createClass(Carousel, [{
    key: "testSize",
    value: function testSize() {
      var _this2 = this;

      var addWidth = this.width - this.offset;

      if (this.childWidth < addWidth) {
        var breaker = 0;
        var existingChildren = this.container.children;
        var addedOffset = 0;
        var toRemove = []; // First we test if any items are now offscreen
        // We don't do this every frame because that would be burdensome
        // So we only do it when we know we have new items to add

        for (var i = 0; i < existingChildren.length; i++) {
          var child = existingChildren[i];
          var offsetLeft = child.offsetLeft + this.offset;
          var offsetWidth = child.offsetWidth;

          if (offsetLeft < -offsetWidth) {
            toRemove.push(child);
            addedOffset += offsetWidth;
          }
        }

        toRemove.forEach(function (child) {
          _this2.container.removeChild(child);
        });
        this.offset += addedOffset;
        addWidth -= addedOffset; // Then we loop, adding new children until we're at full width

        while (this.childWidth < addWidth) {
          this.container.appendChild(this.children[this.nextChild++].cloneNode(true)); // Instanciate any data controllers in the container

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.container.querySelectorAll("[data-controller]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var element = _step.value;

              if (!element.data || !element.data.instanciated) {
                _wtcControllerElement.ExecuteControllers.instanciate(element, element.getAttribute('data-controller'));
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          breaker++;
          if (breaker > 100) break; // we should never have more than 100 items. If we do something is wrong.
        }
      }
    }
  }, {
    key: "onPointerMove",
    value: function onPointerMove(e) {
      var hasClass = function hasClass(element) {
        if (!element || !element.parentNode || element.classList.contains('carousel__container')) return false;
        if (element.classList.contains('carousel__item--hover')) return true;
        return hasClass(element.parentNode);
      };

      var paused = hasClass(e.target);
      this.hovered = paused;
    }
  }, {
    key: "onPointerLeave",
    value: function onPointerLeave(e) {
      this.hovered = false;
    }
  }, {
    key: "onResize",
    value: function onResize(e) {
      this.testSize();
    }
  }, {
    key: "run",
    value: function run(delta) {
      if (!this.paused) {
        this.offset -= this.speed;
        this.testSize();
      }

      if (this.animating) {
        requestAnimationFrame(this.run);
      }
    }
  }, {
    key: "childWidth",
    get: function get() {
      var children = this.container.children;
      var width = 0;

      for (var i = 0; i < children.length; i++) {
        width += children[i].offsetWidth;
      }

      return width;
    }
  }, {
    key: "width",
    get: function get() {
      return this.el.offsetWidth;
    }
  }, {
    key: "nextChild",
    set: function set(value) {
      this._nextChild = value % this.children.length;
    },
    get: function get() {
      return this._nextChild;
    }
  }, {
    key: "speed",
    set: function set(value) {
      if (value >= 0) {
        this._speed = value;
      }
    },
    get: function get() {
      return this._speed || this.basicSpeed;
    }
  }, {
    key: "basicSpeed",
    get: function get() {
      return _wtcUtilityBreakpoint["default"].current / 10 + 0.6;
    }
  }, {
    key: "offset",
    set: function set(value) {
      if (!isNaN(value)) {
        this._offset = value;
        this.container.style.transform = "translate3d(".concat(value, "px, 0, 1px)");
      }
    },
    get: function get() {
      return this._offset || 0;
    }
  }, {
    key: "paused",
    set: function set(value) {
      this._paused = value === true;
    },
    get: function get() {
      return this._paused === true;
    }
  }, {
    key: "hovered",
    set: function set(value) {
      var _this3 = this;

      var oldValue = this.hovered;
      this._hovered = value === true;

      if (oldValue !== value) {
        var transitioned = false;
        var targetSpeed = value === true ? this.basicSpeed * .1 : this.basicSpeed;

        var transition = function transition() {
          var step = (targetSpeed - _this3.speed) * .05;
          _this3.speed = _this3.speed + step;

          if (Math.abs(_this3.speed - targetSpeed) < 0.01) {
            transitioned = true;
          }

          if (!transitioned && _this3.hovered === value) {
            requestAnimationFrame(transition);
          }
        };

        requestAnimationFrame(transition);
      }
    },
    get: function get() {
      return this._hovered === true;
    }
  }, {
    key: "animating",
    set: function set(value) {
      if (value === true && this.animating !== true) {
        requestAnimationFrame(this.run);
      }

      this._animating = value === true;
    },
    get: function get() {
      return this._animating === true;
    }
  }]);

  return Carousel;
}(_wtcControllerElement["default"]);

_wtcControllerElement.ExecuteControllers.registerController(Carousel, 'Carousel');

var _default = Carousel;
exports["default"] = _default;