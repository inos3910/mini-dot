(async () => {
  if (typeof FONT_FAMILY === 'undefined') {
    return;
  }

  const srcs = {
    gothic:
      'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&display=swap',
    mincho:
      'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&family=Wittgenstein:ital,wght@0,400..900;1,400..900&display=swap',
    maru: 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap',
  };

  const loadFonts = {
    gothic: ['Inter', '"Zen Kaku Gothic Antique"'],
    mincho: ['Wittgenstein', '"Noto Serif JP"'],
    maru: ['Nunito', '"M PLUS Rounded 1c"'],
  };

  if (!(FONT_FAMILY in srcs) || !(FONT_FAMILY in loadFonts)) {
    return;
  }

  const head = document.querySelector('head');

  function addPreload() {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'style';
    preload.href = srcs[FONT_FAMILY];
    preload.fetchPriority = 'high';
    head.appendChild(preload);
  }

  function addLink() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = srcs[FONT_FAMILY];
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
      checkFonts(FONT_FAMILY);
    };
    link.onerror = () => {
      document.documentElement.classList.add('no-webfont');
    };
    link.fetchPriority = 'high';
    head.appendChild(link);
  }

  async function checkFonts(familyKey) {
    if (loadFonts[familyKey] && 'fonts' in document) {
      try {
        const fontPromises = loadFonts[familyKey].map((fontName) =>
          document.fonts.load(`1em ${fontName}`)
        );
        await Promise.all(fontPromises);

        const fontLoaded = loadFonts[familyKey].every((fontName) =>
          document.fonts.check(`1em ${fontName}`)
        );

        if (fontLoaded) {
          document.documentElement.classList.add('fonts-loaded');
        } else {
          document.documentElement.classList.add('no-webfont');
        }
      } catch (error) {
        document.documentElement.classList.add('no-webfont');
      }
    } else {
      document.documentElement.classList.add('no-webfont');
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    addPreload();
    addLink();

    //5秒後には必ず表示
    setTimeout(() => {
      if (
        document.documentElement.classList.contains('fonts-loaded') ||
        document.documentElement.classList.contains('no-webfont')
      ) {
        return;
      }

      document.documentElement.classList.add('no-webfont');
    }, 5000);
  });
})();
