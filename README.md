# wtc-controller-carousel

Infinite sliding carousel.
Example on [Codepen](https://codepen.io/team/wtc/pen/f3f6619570dd0ef1925893509e2c2504).

## Usage

Install `wtc-controller-carousel` with `npm`.  
`npm install wtc-controller-carousel`

1. Add the markup to your template

```html
<div class="carousel">
  <div class="carousel__container">
    <div class="carousel__item">
      <!-- stuff -->
    </div>
    <div class="carousel__item carousel__item--2">
      <!-- stuff 2-->
    </div>
  </div>
</div>
```

2. Import the css into your project.

```scss
@import ~wtc-controller-carousel;
```

3. Import the library into your JS and instanciate it

```js
import Carousel from "wtc-controller-carousel";

const myCarousel = new Carousel(document.querySelector(".carousel"));
```

## Examples

### Pausing

```js
myCarousel.paused = true;
```

### Changing speed

```js
myCarousel.speed = 4;
```
