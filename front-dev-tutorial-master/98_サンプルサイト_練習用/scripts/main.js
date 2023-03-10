// 下記コメントの内容をクラスに集約化
// const hero = new HeroSlider(".swiper");
// hero.start();

// const ta = new TweenTextAnimation(".tween-animate-title");
// ta.animate();

// const _textAnimation = function (el, inview) {
//     if (inview) {
//         const ta = new TweenTextAnimation(el);
//         ta.animate();
//     }
// };

// const so = new ScrollObserver(".tween-animate-title", _textAnimation);

// const _inviewAnimation = function (el, inview) {
//     if (inview) {
//         el.classList.add("inview");
//     } else {
//         el.classList.remove("inview");
//     }
// };

// const so2 = new ScrollObserver(".cover-slide", _inviewAnimation);

// const header = document.querySelector("header");

// const _navAnimation = function (el, inview) {
//     if (inview) {
//         header.classList.remove("triggered");
//     } else {
//         header.classList.add("triggered");
//     }
// };

// const so3 = new ScrollObserver(".nav-trigger", _navAnimation, {
//     once: false,
// });

// new MobileMenu();

// HTML側のscriptrタグにdeferをつけることが今の主流。
// その場合はDOMContentLoadedは不要
// document.addEventListener("DOMContentLoaded", function () {});

// これまで_で始めていたプロパティなど（プライベートなことを示す）は
// 最新のブラウザでは#をつけることで実現できる（クラス外から呼び出し不可）
class Main {
    // #なプロパティを使う場合は、constructor外に定義しないとエラーになる
    // ここで定義するとconstructor内のコメントアウトは不要
    // #observers = [];

    constructor() {
        this.header = document.querySelector("header");
        // this.#observers = [];
        this._observers = [];
        this.sides = document.querySelectorAll(".side");
        this.hero = new HeroSlider(".swiper");
        this._init();
    }

    _init() {
        new MobileMenu();
        Pace.on("done", this._scrollInit.bind(this));
    }

    destroy() {
        this._observers.forEach((so) => so.destroy());
    }

    _scrollInit() {
        this._observers.push(
            new ScrollObserver(".nav-trigger", this._navAnimation.bind(this), {
                once: false,
            }),
            new ScrollObserver(
                "#main-content",
                this._sideAnimation.bind(this),
                {
                    once: false,
                    rootMargin: "-300px 0px",
                }
            ),
            new ScrollObserver(
                ".swiper",
                this._toggleSlideAnimation.bind(this),
                {
                    once: false,
                }
            ),
            // this使ってないのでbindいらず
            new ScrollObserver(".cover-slide", this._inviewAnimation),
            new ScrollObserver(".appear", this._inviewAnimation),
            new ScrollObserver(".tween-animate-title", this._textAnimation)
        );
    }

    _toggleSlideAnimation(el, inview) {
        if (inview) {
            this.hero.start();
        } else {
            this.hero.stop();
        }
    }

    _textAnimation(el, inview) {
        if (inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    _navAnimation(el, inview) {
        if (inview) {
            this.header.classList.remove("triggered");
        } else {
            this.header.classList.add("triggered");
        }
    }

    _sideAnimation(el, inview) {
        if (inview) {
            this.sides.forEach((side) => side.classList.add("inview"));
        } else {
            this.sides.forEach((side) => side.classList.remove("inview"));
        }
    }

    _inviewAnimation(el, inview) {
        if (inview) {
            el.classList.add("inview");
        } else {
            el.classList.remove("inview");
        }
    }
}

new Main();
