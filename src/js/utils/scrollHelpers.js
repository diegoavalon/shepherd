export const _raf =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };

export const isElInView = function(el) {
    const scroll = window.scrollY || window.pageYOffset;
    const boundsTop = el.getBoundingClientRect().top + scroll;

    const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight
    };

    const bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight
    };

    return (
        (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
        (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
    );
};

// Usage
// window.addEventListener("scroll", () => {
//     _raf(() => {
//         isElInView(referencePoint)
//             ? bannerEl.classList.remove("is-active")
//             : bannerEl.classList.add("is-active");
//     });
// });
