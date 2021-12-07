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


    let productSlider;

    productSlider = new Swiper('.product_slider', {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
            nextEl: '.product_nav_right',
            prevEl: '.product_nav_left',
        },
        breakpoints: {
            1215: {
                slidesPerView: 5,
                spaceBetween: 25,
                enabled: true
            }
        }
    });

    



    const menuTrigger = document.querySelector('#menuTrigger');
    const mainCatalog = document.querySelector('#mainMenu');

    if(menuTrigger) {
        menuTrigger.addEventListener('click', (e) => {
            menuTrigger.classList.toggle('active');

            mainCatalog.classList.toggle('active');

            if(mainCatalog.classList.contains('active')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
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



    const tabs = document.querySelectorAll('.header__menu_aside_item');
    const tabsCotent = document.querySelectorAll('.header__menu_body');
    const tabsParent = document.querySelector('.header__menu_aside_list');
    const tabContentCloseBtn = document.querySelectorAll('[data-menuclose]');

    function hideTabContent() {
        tabsCotent.forEach(i => {
            i.style.display = 'none';
        });
    }

    function showTabContent(i = 0) {
        tabsCotent[i].style.display = 'flex';
    }

    hideTabContent();
    // showTabContent();

    tabsParent.addEventListener('click', (e) => {
        let tar = e.target;
        if(tar && tar.classList.contains('header__menu_aside_item')) {
            tabs.forEach((i, index) => {
                if(tar == i) {
                    hideTabContent();
                    showTabContent(index);
                }
            })
        }
    })
    tabContentCloseBtn.forEach(i => {
        i.addEventListener('click', hideTabContent);
    });

    
 
    dropDown('.header__main_search_drop', '.header__main_search_drop_list');
});


