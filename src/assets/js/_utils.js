/*
 * ターゲット位置へのスクロールアニメーション
 * @param {Object} target ターゲット要素
 * @param {Number} speed ターゲット要素
 */
export function scrollTo(target) {
  if (!target) {
    return;
  }

  const header = document.querySelector('#js-header');
  const headerHeight = header ? header.clientHeight : 0;

  const targetPosition =
    target.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}

/*
 * アンカースクロール
 * @param {Object} e イベントオブジェクト
 * @param {Function} cb コールバック関数
 */
export function anchorScroll(currentTarget, e, cb = null) {
  if (!currentTarget.hash) {
    return;
  }

  const targetUrl = currentTarget.href.replace(currentTarget.hash, '');
  const currentUrl =
    location.protocol +
    '//' +
    location.host +
    location.pathname +
    location.search;

  if (targetUrl !== currentUrl) {
    return;
  }

  const target = document.querySelector(currentTarget.hash);
  if (!target) {
    return;
  }

  if (e.cancelable) {
    e.preventDefault();
  }
  e.stopPropagation();

  scrollTo(target);

  if (cb) {
    cb();
  }
}

//すでにスクロール位置を超えている場合はエフェクトをスキップ
export function scrollEffectByPosition() {
  const elems = document.querySelectorAll('.is-ev:not(.hidden)');
  if (!elems.length) {
    return;
  }

  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  for (const el of elems) {
    const rect = el.getBoundingClientRect();
    const targetPosition = rect.top + scrollPosition;
    if (scrollPosition >= targetPosition) {
      el.classList.remove('is-ev');
    }
  }
}

//画面内の位置で要素を出現させるエフェクト
export function setScrollInView(elems) {
  const observers = elems
    ? elems
    : document.querySelectorAll('.is-ev:not(.is-effect)');
  if (!observers.length) {
    return;
  }

  const options = {
    threshold: 0,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('hidden')) {
          return;
        }

        entry.target.classList.add('is-effect');
        entry.target.addEventListener('transitionend', () => {
          entry.target.classList.remove('is-ev', 'is-effect');
        });

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  for (const el of observers) {
    observer.observe(el);
  }
}
