import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export interface ICarousel {
  el: HTMLElement;
  elNext: HTMLElement | null;
  elPrev: HTMLElement | null;
  carousel: any;
  init: () => void;
}

export default function AwardsCarousel(this: ICarousel, el: HTMLElement) {
  this.el = el;

  this.elNext = this.el.querySelector('.swiper-button-next');
  this.elPrev = this.el.querySelector('.swiper-button-prev');

  this.init = () => {
    this.carousel = new Swiper(this.el, {     
      modules: [Navigation],
      navigation: {
        nextEl: this.elNext,
        prevEl: this.elPrev,
      },    
      loop: true,    
      speed: 800,
      grabCursor: true,
      slidesPerView: 2,
      spaceBetween:50,    
      breakpoints: {
        768: {
          slidesPerView:5,
          spaceBetween: 80,
        },
      },
    });
  };
}
