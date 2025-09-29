class Icon {
  constructor() {
    this.addSvgIcon();
  }

  addSvgIcon() {
    const icons = this.icons();
    document.addEventListener('DOMContentLoaded', (event) => {
      Object.keys(icons).forEach((val) => {
        const target = document.querySelectorAll(`.js-icon--${val}`);
        if (target[0]) {
          [...target].forEach((el) => {
            el.insertAdjacentHTML('beforeend', icons[val]);
          });
        }
      });
    });
  }

  icons() {
    return {
      search:
        '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 17L22 22M19.5 10.75C19.5 15.5825 15.5825 19.5 10.75 19.5C5.91751 19.5 2 15.5825 2 10.75C2 5.91751 5.91751 2 10.75 2C15.5825 2 19.5 5.91751 19.5 10.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',

      cart: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3H5.5L7.85836 13.4425C8.0643 14.3543 8.87398 15 9.8088 15H18.3957C19.3331 15 20.1447 14.3489 20.348 13.4339L22 6H6.5M11 20C11 20.5523 10.5523 21 10 21C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19C10.5523 19 11 19.4477 11 20ZM19 20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',

      menu: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7H19M5 12H19M5 17H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',

      close:
        '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5L19 19M5 19L19 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',

      arrow:
        '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.97 12.11"><path d="M9.99,12.11L.44,2.56C-.15,1.98-.15,1.03.44.44S1.97-.15,2.56.44l7.43,7.42L17.41.44c.59-.59,1.54-.59,2.12,0,.59.59.59,1.54,0,2.12l-9.55,9.55Z" /></svg>',

      mail: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.11 54.74"><polygon fill="#fff" points="90.11 54.74 0 54.74 0 0 89.1 0 89.1 4 4 4 4 50.74 86.11 50.74 86.11 16.15 90.11 16.15 90.11 54.74" /><polygon fill="#fff" points="44.56 31.88 1.82 3.35 4.04 .02 44.56 27.07 85.07 .02 87.29 3.35 44.56 31.88" /></svg>',

      next: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.81 19.37"><path fill="#fff" d="M1.5,19.37c-.38,0-.77-.15-1.06-.44-.59-.59-.59-1.54,0-2.12l7.13-7.13L.44,2.56C-.15,1.98-.15,1.03.44.44S1.97-.15,2.56.44l9.25,9.25L2.56,18.94c-.29.29-.68.44-1.06.44Z" /></svg>',

      prev: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.81 19.37"><path fill="#fff" d="M10.31,19.37c-.38,0-.77-.15-1.06-.44L0,9.69,9.25.44c.59-.59,1.54-.59,2.12,0,.59.59.59,1.54,0,2.12l-7.13,7.13,7.13,7.13c.59.59.59,1.54,0,2.12-.29.29-.68.44-1.06.44Z" /></svg>',

      mypage:
        '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.4 41.7"><path fill="currentColor" d="m17.7,25.4c-7,0-12.7-5.7-12.7-12.7S10.7,0,17.7,0s12.7,5.7,12.7,12.7-5.7,12.7-12.7,12.7Zm0-22.4c-5.35,0-9.7,4.35-9.7,9.7s4.35,9.7,9.7,9.7,9.7-4.35,9.7-9.7S23.05,3,17.7,3Z"/><path fill="currentColor" d="m33.9,41.7c-.83,0-1.5-.67-1.5-1.5,0-8.11-6.59-14.7-14.7-14.7s-14.7,6.59-14.7,14.7c0,.83-.67,1.5-1.5,1.5s-1.5-.67-1.5-1.5c0-9.76,7.94-17.7,17.7-17.7s17.7,7.94,17.7,17.7c0,.83-.67,1.5-1.5,1.5Z"/></svg>',

      contact:
        '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 768"><path fill="currentColor" d="M384 352.5l256.5-160.5h-513zM640.5 576v-319.5l-256.5 159-256.5-159v319.5h513zM640.5 127.5q25.5 0 44.25 19.5t18.75 45v384q0 25.5-18.75 45t-44.25 19.5h-513q-25.5 0-44.25-19.5t-18.75-45v-384q0-25.5 18.75-45t44.25-19.5h513z"></path></svg>',
    };
  }
}

new Icon();
