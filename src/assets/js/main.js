import '../scss/_style.scss';

import EmblaCarousel from 'embla-carousel';
import ClassNames from 'embla-carousel-class-names';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Autoplay from 'embla-carousel-autoplay';
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton';
import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButtons';

initMain();

function initMain() {
  mvCarousel();
  observeCartQty();
}

function mvCarousel() {
  const rootNode = document.querySelector('.js-slide');
  if (!rootNode) {
    return;
  }
  const viewportNode = rootNode.querySelector('.js-slide-list');
  if (!viewportNode) {
    return;
  }

  const imgs = viewportNode.querySelectorAll('img');
  if (imgs.length < 4) {
    rootNode.classList.add('no-slide');
    return;
  }

  const prevButtonNode = rootNode.querySelector('.js-slide-prev');
  const nextButtonNode = rootNode.querySelector('.js-slide-next');
  const dotsNode = rootNode.querySelector('.js-slide-dots');

  const options = {
    loop: true,
    skipSnaps: true,
    containScroll: 'trimSnaps',
  };
  const emblaApi = EmblaCarousel(viewportNode, options, [
    ClassNames(),
    Autoplay({ delay: 5000 }),
    WheelGesturesPlugin({ forceWheelAxis: 'x' }),
  ]);

  const onNavButtonClick = (emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  };

  const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
    emblaApi,
    prevButtonNode,
    nextButtonNode,
    onNavButtonClick
  );

  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
    emblaApi,
    dotsNode,
    onNavButtonClick
  );
  emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
  emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
}

//カートの数量変更を監視
function observeCartQty() {
  const targets = document.querySelectorAll('.cart-qty');

  // インスタンスの作成
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
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
