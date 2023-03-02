document.addEventListener("DOMContentLoaded", function () {
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

    new Main();
});

class Main {
    constructor() {
        this.header = document.querySelector("header");
        this._observers = [];
        this.hero = new HeroSlider(".swiper");
        this._init();
    }

    _init() {
        new MobileMenu();
        this._scrollInit();
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
                ".swiper",
                this._toggleSlideAnimation.bind(this),
                {
                    once: false,
                }
            ),
            // this使ってないのでbindいらず
            new ScrollObserver(".cover-slide", this._inviewAnimation),
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

    _inviewAnimation(el, inview) {
        if (inview) {
            el.classList.add("inview");
        } else {
            el.classList.remove("inview");
        }
    }
}
