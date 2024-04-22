import Swiper from 'swiper';

export interface IBanner {
  el: HTMLElement;
  carousel: any;
  init: () => void;
}

export default function Banner(this: IBanner, el: HTMLElement) {
  this.el = el;

  this.init = () => {
    this.carousel = new Swiper(this.el, {
      loop: true,
      speed: 800,
      slidesPerView: 1,
      autoplay: true,
      grabCursor: true,
      mousewheel: false,
    });
  };
}
