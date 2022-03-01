// src/index.js
var src_default = (Alpine) => {
  Alpine.directive("sticky-sidebar", (el, { modifiers }, { cleanup }) => {
    const modifiersObject = {};
    for (let index = 0; index < modifiers.length; index += 2) {
      modifiersObject[modifiers[index]] = Number(modifiers[index + 1]);
    }
    const top = modifiersObject.top || 0;
    const bottom = modifiersObject.bottom || 0;
    const minScreenWidth = modifiersObject.min_screen_width || 0;
    const layoutHeight = top + bottom;
    const defaultClassList = el.classList;
    el.classList.add("sticky", "transition-[top]");
    el.style.top = `${top}px`;
    let lastScrollTop = window.scrollTop();
    const handler = () => {
      if (window.innerWidth < minScreenWidth) {
        el.style.top = null;
        el.classList = defaultClassList;
        return;
      }
      const windowHeight = window.innerHeight - layoutHeight;
      if (windowHeight > el.offsetHeight) {
        el.style.top = `${top}px`;
        return;
      }
      const scrollTop = window.scrollTop();
      if (scrollTop > lastScrollTop) {
        el.style.top = `${top + (windowHeight - el.offsetHeight)}px`;
      } else {
        el.style.top = `${top}px`;
      }
      lastScrollTop = scrollTop;
    };
    document.addEventListener("scroll", handler);
    cleanup(() => {
      document.removeEventListener("scroll", handler);
    });
  });
};

// builds/module.js
var module_default = src_default;
export {
  module_default as default
};
