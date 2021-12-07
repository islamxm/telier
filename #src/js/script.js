import Swiper from './libs/swiper';

document.addEventListener('DOMContentLoaded', () => {


    const prevSwiper = new Swiper('.prev__in', {
        // autoplay: {
        //     delay: 5000,

        // },
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



    const menuTrigger = document.querySelector('#menuTrigger');
    const mainCatalog = document.querySelector('#mainMenu');

    if(menuTrigger) {
        menuTrigger.addEventListener('click', (e) => {
            menuTrigger.classList.toggle('active');

            mainCatalog.classList.toggle('active');
        });
    }


    function dropDown(itemQuery, itemListQuery) {
        let dropDownItem = document.querySelector(itemQuery);

        if(dropDownItem) {
            dropDownItem.addEventListener('click', (e) => {
                let dropDownList = e.currentTarget.querySelector(itemListQuery);
                let target = e.target;

                if(target.hasAttribute('data-droplistitem')) {
                    dropDownItem.classList.remove('active');
                }
                if(target && e.target.hasAttribute('data-drophead')) {
                    dropDownItem.classList.toggle('active');

                    if(dropDownItem.classList.contains('active')) {
                        dropDownList.style.height = `${dropDownList.scrollHeight}px`;
                    }
                    if(!dropDownItem.classList.contains('active')) {
                        dropDownList.style.height = `0px`;
                    }
                }

            });
        }
    }

    dropDown('.header__main_search_drop', '.header__main_search_drop_list');
});


