import '../scss/_style.scss';

import EmblaCarousel from 'embla-carousel';
import ClassNames from 'embla-carousel-class-names';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Autoplay from 'embla-carousel-autoplay';
import { addDotBtnsAndClickHandlers } from './EmblaCarouselDotButton';
import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButtons';
import {
  anchorScroll,
  scrollEffectByPosition,
  setScrollInView,
} from './_utils';

let baseData = null;

initMain();

function initMain() {
  baseData = createBaseData();
  mvCarousel();
  observeCartQty();
  footerIntersection();
  observeNewsLetterFormSend();
  events();
}

function createBaseData() {
  if (typeof BASE_SETTINGS === 'undefined') {
    return null;
  }

  const settings = BASE_SETTINGS;
  const toInt = (value) => Number.parseInt(value, 10);
  //商品リスト次のページ
  //テーマ名・バージョンの取得
  const themeName = document.querySelector('meta[name="BASE-Theme-Name"]');
  const resolvedThemeName = themeName
    ? themeName.getAttribute('content')
    : 'mini-dot';
  const version = document.querySelector('meta[name="BASE-Theme-Version"]');
  const resolvedVersion = version ? version.getAttribute('content') : '1';

  return {
    baseData: settings,
    //商品リスト次のページ
    next: toInt(settings.itemNextPage),
    //商品リストの最後のページ
    max: toInt(settings.itemMaxPage),
    //通信中フラグ
    progress: false,
    //ブログフィードのカウント
    blogCount: toInt(settings.feedCount),
    //ブラウザバック時の取得スタートページ
    pageIndex: 2,
    themeName: resolvedThemeName,
    themeVersion: resolvedVersion,
    shopId: settings.shopId,
    scrollEffect: settings.scrollEffect,
    showLastOne: settings.showLastOne,
  };
}

function scrollAnimations() {
  //スクロール演出あり
  if (baseData.scrollEffect) {
    //すでにスクロール位置を超えている場合はエフェクトをスキップ
    scrollEffectByPosition();
    setScrollInView();
  } else {
    document.documentElement.classList.remove('scroll-animation');
  }
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
    onNavButtonClick,
  );

  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
    emblaApi,
    dotsNode,
    onNavButtonClick,
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

//メルマガAppの送信を監視
function observeNewsLetterFormSend() {
  const $elem = document.querySelector('#js-newsletter-form');
  if (!$elem) {
    return;
  }

  // 監視ターゲットの取得
  const target = document.querySelector(
    '#js-newsletter-form .mailMagazineSubscribe_confirm',
  );
  // オブザーバーの作成
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.textContent.length) {
        $elem.classList.add('is-newsletter-form-finished');
      } else {
        $elem.classList.remove('is-newsletter-form-finished');
      }
    });
  });

  // 監視の開始
  observer.observe(target, {
    childList: true,
  });
}

//フッター下交差時に実行
function footerIntersection() {
  const footer = document.querySelector('#js-footer');
  if (!footer) {
    return;
  }

  const options = {
    threshold: 0,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.documentElement.classList.add('footer-intersecting');
      } else {
        document.documentElement.classList.remove('footer-intersecting');
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(footer);
}

//メニュー閉じる
function closeMenu() {
  const menu = document.querySelector('#js-menu');
  if (!menu) {
    return;
  }

  document.documentElement.classList.remove('is-menu-active');
  menu.setAttribute('inert', '');
}

//メニュー開く
function openMenu() {
  const menu = document.querySelector('#js-menu');
  if (!menu) {
    return;
  }

  document.documentElement.classList.add('is-menu-active');
  menu.removeAttribute('inert');
}

function toggleMenu() {
  const menu = document.querySelector('#js-menu');
  if (!menu) {
    return;
  }

  if (document.documentElement.classList.contains('is-menu-active')) {
    closeMenu();
  } else {
    openMenu();
  }
}

function events() {
  //アンカースクロール
  document.addEventListener('click', (e) => {
    if (!e.target || !e.target.closest('a')) {
      return;
    }

    const anchor = e.target.closest('a');
    anchorScroll(anchor, e, () => {
      closeMenu();
    });
  });

  //メニュー開く
  document.addEventListener('click', (e) => {
    if (!e.target || !e.target.closest('#js-menu-open')) {
      return;
    }

    e.preventDefault();

    toggleMenu();
  });

  //メニュー閉じる
  document.addEventListener('click', (e) => {
    if (!e.target || !e.target.closest('.js-menu-close')) {
      return;
    }

    e.preventDefault();

    const isMenuOpen =
      document.documentElement.classList.contains('is-menu-active');
    if (!isMenuOpen) {
      return;
    }

    closeMenu();
  });
}
