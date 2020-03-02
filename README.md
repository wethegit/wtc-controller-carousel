# wtc-controller-carousel

Infinite sliding carousel.
Example on [Codepen](https://codepen.io/team/wtc/pen/f3f6619570dd0ef1925893509e2c2504).

## Usage

Install `wtc-controller-carousel` with `npm`/`yarn`.

1. Add the markup to your template

```pug
.carousel
  .carousel__container
    .carousel__item
      //- your stuff
    .carousel__item.carousel__item--2
      //- your stuff 2
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
