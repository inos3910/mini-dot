import '@splidejs/splide/css';
import '../scss/_style.scss';

import { Splide } from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', () => {
  initMain();
});

function initMain() {
  mvSlide();
}

function mvSlide() {
  const target = document.querySelector('.js-mv-slide');
  if (!target) {
    return;
  }

  const splide = new Splide(target, {
    type: 'loop',
    perPage: 1440 / 750,
    perMove: 1,
    gap: `${(30 / 1440) * 100}%`,
    focus: 'center',
    speed: 600,
    autoplay: true,
    interval: 6000,
    autoHeight: true,
    arrows: true,
    pagination: true,
    clones: 3,
    cloneStatus: true,
    updateOnMove: true,
    keyboard: true,
    easing: 'cubic-bezier(0.22, 0.025, 0.2, 1)',
    // wheel: true,
    // waitForTransition: true,
    // releaseWheel: true,
    direction: 'ltr',
    breakpoints: {
      800: {
        perPage: 1.2,
        gap: `${(30 / 750) * 100}%`,
      },
    },
  });
  splide.mount();
}
