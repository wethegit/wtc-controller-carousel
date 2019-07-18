import { default as ElementController, ExecuteControllers } from 'wtc-controller-element';
import Breakpoints from 'wtc-utility-breakpoint';

class Carousel extends ElementController {
  constructor(element) {
    super(element);

    this.el = element;
    this.container = this.el.querySelector('.carousel__container');
    this.children = [];
    for (let i = 0; i < this.container.children.length; i++) {
      this.children.push(this.container.children[i].cloneNode(true));
    }
    this.nextChild = 0;

    this.onPointerLeave = this.onPointerLeave.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onResize = this.onResize.bind(this);
    this.run = this.run.bind(this);

    this.el.addEventListener('mousemove', this.onPointerMove);
    this.el.addEventListener('mouseleave', this.onPointerLeave);

    this.testSize();

    this.animating = true;
  }

  testSize() {
    let addWidth = this.width - this.offset;
    if (this.childWidth < addWidth) {
      let breaker = 0;
      let existingChildren = this.container.children;
      let addedOffset = 0;
      let toRemove = [];

      // First we test if any items are now offscreen
      // We don't do this every frame because that would be burdensome
      // So we only do it when we know we have new items to add
      for (let i = 0; i < existingChildren.length; i++) {
        let child = existingChildren[i];
        let offsetLeft = child.offsetLeft + this.offset;
        let offsetWidth = child.offsetWidth;
        if (offsetLeft < -offsetWidth) {
          toRemove.push(child);
          addedOffset += offsetWidth;
        }
      }

      toRemove.forEach(child => {
        this.container.removeChild(child);
      });
      this.offset += addedOffset;
      addWidth -= addedOffset;

      // Then we loop, adding new children until we're at full width
      while (this.childWidth < addWidth) {
        this.container.appendChild(
          this.children[this.nextChild++].cloneNode(true)
        );

        // Instanciate any data controllers in the container
        for (var element of this.container.querySelectorAll("[data-controller]")) {

          if (!element.data || !element.data.instanciated) {
            ExecuteControllers.instanciate(
              element,
              element.getAttribute('data-controller')
            );
          }
        }
        breaker++;

        if (breaker > 100) break; // we should never have more than 100 items. If we do something is wrong.
      }
    }
  }

  onPointerMove(e) {
    const hasClass = (element) => {
      if (!element || !element.parentNode || element.classList.contains('container')) return false;
      if (element.classList.contains('carousel__frame--product')) return true;
      return hasClass(element.parentNode);
    }

    const paused = hasClass(e.target);

    this.hovered = paused;
  }

  onPointerLeave(e) {
    this.hovered = false;
  }

  onResize(e) {
    this.testSize();
  }

  run(delta) {
    if (!this.paused) {
      this.offset -= this.speed;
      this.testSize();
    }

    if (this.animating) {
      requestAnimationFrame(this.run);
    }
  }

  get childWidth() {
    let children = this.container.children;
    let width = 0;
    for (let i = 0; i < children.length; i++) {
      width += children[i].offsetWidth;
    }
    return width;
  }

  get width() {
    return this.el.offsetWidth;
  }

  set nextChild(value) {
    this._nextChild = value % this.children.length;
  }
  get nextChild() {
    return this._nextChild;
  }

  set speed(value) {
    if (value >= 0) {
      this._speed = value;
    }
  }
  get speed() {
    return this._speed || this.basicSpeed;
  }

  get basicSpeed() {
    return Breakpoints.current / 10 + 0.6;
  }

  set offset(value) {
    if (!isNaN(value)) {
      this._offset = value;
      this.container.style.transform = `translate3d(${value}px, 0, 1px)`;
    }
  }
  get offset() {
    return this._offset || 0;
  }

  set paused(value) {
    this._paused = value === true;
  }
  get paused() {
    return this._paused === true;
  }

  set hovered(value) {
    let oldValue = this.hovered;
    this._hovered = value === true;

    if (oldValue !== value) {
      let transitioned = false;
      let targetSpeed = value === true ? this.basicSpeed * .1 : this.basicSpeed;
      let transition = () => {
        let step = (targetSpeed - this.speed) * .05;
        this.speed = this.speed + step;

        if (Math.abs(this.speed - targetSpeed) < 0.01) {
          transitioned = true;
        }

        if (!transitioned && this.hovered === value) {
          requestAnimationFrame(transition);
        }
      }
      requestAnimationFrame(transition);
    }
  }
  get hovered() {
    return this._hovered === true;
  }

  set animating(value) {
    if (value === true && this.animating !== true) {
      requestAnimationFrame(this.run);
    }
    this._animating = value === true;
  }
  get animating() {
    return this._animating === true;
  }
}

ExecuteControllers.registerController(Carousel, 'Carousel');

export default Carousel;
