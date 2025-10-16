import '@splidejs/splide/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/mousewheel';
import '../scss/_style.scss';

import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Mousewheel,
  Autoplay,
  Keyboard,
} from 'swiper/modules';
import { Splide } from '@splidejs/splide';

initMain();

function initMain() {
  mvSlide();
  kvSlide();
  observeCartQty();
}

function kvSlide() {
  const target = document.querySelector('#js-kv-slide');
  if (!target) {
    return;
  }

  new Swiper(target, {
    modules: [Navigation, Pagination, Mousewheel, Autoplay, Keyboard],
    pagination: {
      el: '.swiper-pagination',
    },
    mousewheel: {
      forceToAxis: true,
    },
    keyboard: {
      enabled: true,
    },
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    slidesPerView: 1.2,
    spaceBetween: `${(30 / 750) * 100}%`,
    loop: true,
    breakpoints: {
      801: {
        slidesPerView: 3.25,
        spaceBetween: `${(15 / 1440) * 100}%`,
      },
    },
  });
}

function mvSlide() {
  const target = document.querySelector('.js-mv-slide');
  if (!target) {
    return;
  }

  const splide = new Splide(target, {
    type: 'loop',
    perPage: 3.25,
    perMove: 1,
    gap: `${(15 / 1440) * 100}%`,
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

//カートの数量変更を監視
function observeCartQty() {
  const targets = document.querySelectorAll('.cart-qty');
  console.log(targets);

  // インスタンスの作成
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log(mutation.target.textContent);
      if (mutation.target.textContent !== '0') {
        mutation.target.style.display = 'grid';
      }
    });
  });

  // 監視の開始
  for (const target of targets) {
    observer.observe(target, {
      attributes: true,
      attributeFilter: ['style'], // 特定の属性の変更を監視
      characterData: true,
    });
  }
}
