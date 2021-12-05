import Swiper from './libs/swiper';

document.addEventListener('DOMContentLoaded', () => {


    const prevSwiper = new Swiper('.prev__in', {
        autoplay: {
            delay: 5000,

        },
        loop: true,
        speed: 1000,
        spaceBetween: 36,
        pagination: {
            el: '.prev__pag',
            type: 'bullets',
            bulletClass: 'prev__pag_item',
            bulletActiveClass: 'prev__pag_item_active',
            currentClass: 'prev__pag_item_current',
            clickable: true,
        },
        navigation: {
            nextEl: '.prev__nav_right',
            prevEl: '.prev__nav_left',
        }
    });


    const productSlider = new Swiper('.product_slider', {
        slidesPerView: 5,
        spaceBetween: 25,
        navigation: {
            nextEl: '.product_nav_right',
            prevEl: '.product_nav_left',
        }
    });
});





