import Swiper from './libs/swiper';
import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';

document.addEventListener('DOMContentLoaded', () => {

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
            hideTabContent();
            menuTrigger.classList.toggle('active');
            
            mainCatalog.classList.toggle('active');

            if(window.innerWidth < 1215 && mainCatalog.classList.contains('active')) {
                const header = document.querySelector('.header');
                document.body.classList.add('no-scroll');
                menuTrigger.style.backgroundColor = '#00008b';
                
                mainCatalog.style.cssText = `height: calc(100vh - ${header.clientHeight}px + 10px)`;
            
            } else {
                document.body.classList.remove('no-scroll');
                showTabContent();
                
                menuTrigger.style.backgroundColor = '#0047FF';
                // mainCatalog.style.cssText = 'height: 0px';
            }
            if(window.innerWidth < 1215) {
                hideTabContent();
            }
        });
    }

    window.addEventListener('resize', () => {
        if(window.innerWidth < 1215 && mainCatalog.classList.contains('active')) {
                const header = document.querySelector('.header');
                document.body.classList.add('no-scroll');
                mainCatalog.style.cssText = `height: calc(100vh - ${header.clientHeight}px + 10px)`;
            } else {
                document.body.classList.remove('no-scroll');
                showTabContent();
            }
    })

    if(window.innerWidth > 1215) {
        showTabContent();
    }


    function dropDown(itemQuery, itemListQuery, itemNum, closed, opened) {
        let dropDownItem = document.querySelectorAll(itemQuery);

        if(dropDownItem) {
            dropDownItem.forEach(i => {
                i.addEventListener('click', (e) => {
                    let dropDownList = e.currentTarget.querySelector(itemListQuery);
                    let target = e.target;
                    let btn = e.currentTarget.querySelector(`[data-change = "${itemNum}"]`)

                    if(target.hasAttribute('data-droplistitem')) {
                        i.classList.remove('active');
                    }
                    if(target && e.target.hasAttribute('data-drophead') || e.target.hasAttribute('data-dropheadall')) {
                        i.classList.toggle('active');

                        if(i.classList.contains('active')) {
                            dropDownList.style.height = `${dropDownList.scrollHeight}px`;
                        }
                        if(!i.classList.contains('active')) {
                            dropDownList.style.height = `0px`;
                        }

                        if(i.classList.contains('active') && e.target.hasAttribute('data-change', itemNum)) {
                            btn.innerHTML = opened;
                        } 
                        if(!i.classList.contains('active') && e.target.hasAttribute('data-change', itemNum)) {
                            btn.innerHTML = closed;
                        }
                    }

                });
            })
        }
    }



    if(window.innerWidth > 1215) {
        hideTabContent();
        showTabContent();
    } else {
        hideTabContent();
    }

    window.addEventListener('resize', () => {
        if(window.innerWidth > 1215) {
            hideTabContent();
            showTabContent();
        } else {
            // hideTabContent();
        }
    })

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
    });

    tabContentCloseBtn.forEach(i => {
        i.addEventListener('click', hideTabContent);
    });



    const favBtns = document.querySelectorAll('.fav');

    if(favBtns) {
        favBtns.forEach(i => {
            i.addEventListener('click', () => {
                i.classList.toggle('active');

                if(i.classList.contains('active')) {
                    i.innerHTML = `<svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.323242 1.167C0.323242 0.522484 0.846628 0 1.49226 0H8.50635C9.15198 0 9.67537 0.522483 9.67537 1.167V11.0865C9.67537 11.3051 9.553 11.5053 9.35832 11.6053C9.16364 11.7053 8.92929 11.6884 8.75112 11.5613L4.9993 8.88606L1.24749 11.5613C1.06932 11.6884 0.834973 11.7053 0.64029 11.6053C0.445607 11.5053 0.323242 11.3051 0.323242 11.0865V1.167ZM8.50635 1.167L4.65957 7.69419C4.8628 7.54927 5.13581 7.54927 5.33904 7.69419L2 8L8.50635 1.167Z" fill="#FF9700"/>
                    </svg>
                    `
                }
                if(!i.classList.contains('active')) {
                    i.innerHTML = `<svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1.167C0 0.522484 0.522483 0 1.167 0H8.169C8.81351 0 9.336 0.522483 9.336 1.167V11.0865C9.336 11.3051 9.21384 11.5053 9.0195 11.6053C8.82515 11.7053 8.59121 11.6884 8.41335 11.5613L4.668 8.88606L0.922652 11.5613C0.744793 11.6884 0.510848 11.7053 0.316501 11.6053C0.122154 11.5053 0 11.3051 0 11.0865V1.167ZM8.169 1.167L1.167 1.167V9.95265L4.32885 7.69419C4.53173 7.54927 4.80427 7.54927 5.00715 7.69419L8.169 9.95265V1.167Z" fill="#242424"/>
                    </svg>`
                }
            })
        })
    }


    /*RangeS Slider*/
    const rangeSlider = document.querySelector('#rangeSlider');
    const sliders = document.querySelectorAll('.range');

    const valueBlock = document.querySelector('#valueBlock');

    if(sliders) {
        sliders.forEach(i => {
            noUiSlider.create(i, {
                start: [1, 512],
                connect: true,
                range: {
                    'min': 1,
                    'max': 512,
                },
                step:1,
                tooltips: false,
                format: {
                    from: function(value) {
                        return parseInt(value)
                    },
                    to: function(value) {
                        return parseInt(value)  
                    }
                }
                
            })

            i.noUiSlider.on('update', function(values, handle = 0) {
                valueBlock.innerHTML = `от ${values[0]}`
            })

            i.noUiSlider.on('update', function(values, handle = 1) {
                valueBlock1.innerHTML = `до ${values[1]}`
            }) 
        })


    }


    /*Filter btn*/
    const filterBtn = document.querySelector('.filter_btn');
    const filter = document.querySelector('.filter');
    const filterClose = document.querySelector('.filter_close');
    filterBtn.addEventListener('click', (e) => {
        filter.classList.add('active');
        document.body.classList.add('no-scroll');
    });

    filterClose.addEventListener('click', ()=> {
        filter.classList.remove('active');
        document.body.classList.remove('no-scroll');
    })



 
    dropDown('.header__main_search_drop', '.header__main_search_drop_list');
    dropDown('.filter_form', '.hide_list', '1', 'Показать все', 'Скрыть');
    dropDown('.category', '.filter_category_list');
    dropDown('.filter_hidden', '.filter_hidden_list', '2', 'Все фильтры', 'Скрыть');
});


