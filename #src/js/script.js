import Swiper from './libs/swiper';
import * as noUiSlider from 'nouislider';
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
import MicroModal from 'micromodal';
// import Choices from './libs/choices.js';

const Choices = require('./libs/choices.js');

document.addEventListener('DOMContentLoaded', () => {

    const defaultSelect = () => {
        // Select elements
        const headerSearchFilter = document.querySelector('.header__main_search_filter_select')
        const headerCitySearch = document.querySelector('.popup__city_search_select');
        const reviewsFilter = document.querySelector('.reviews__body_filter_drop_select');

        // Select constructors
        const headerSearchFilterSelect = new Choices(headerSearchFilter, {
            searchEnabled: false,
            itemSelectText: '',
            allowHTML: true
        })

        const headerCitySearchSelect = new Choices(headerCitySearch, {
            itemSelectText: '',
            allowHTML: true
        })

        if(reviewsFilter) {
                const reviewsFilterSelect = new Choices(reviewsFilter, {
                searchEnabled: false,
                itemSelectText: '',
                allowHTML: true
            })
        }
        
    }

    defaultSelect();

    MicroModal.init();

    const regButton = document.querySelector('#regButton');
    regButton.addEventListener('click', () => {
        MicroModal.close('login');
        MicroModal.show('signin');
    })

    const backpassButton = document.querySelector('#backpassButton');
    if(backpassButton) {
        backpassButton.addEventListener('click', () => {
            MicroModal.close('pass-edit');
            MicroModal.show('pass-reset');
        })
    }

    const logButton = document.querySelector('#logButton');
    logButton.addEventListener('click', () => {
        MicroModal.close('signin');
        MicroModal.show('login');
    })

    const deliveBtn = document.querySelector('#delivBtn');
    if(deliveBtn) {
        deliveBtn.addEventListener('click', () => {
            MicroModal.close('deliv');
            MicroModal.show('map-p');
        })
    }

    const tabs = document.querySelectorAll('.header__menu_aside_item');
    const tabsCotent = document.querySelectorAll('.header__menu_body');
    const tabsParent = document.querySelector('.header__menu_aside_list');
    const tabContentCloseBtn = document.querySelectorAll('[data-menuclose]');

    function hideTabContent(tCnt = tabsCotent) {
        tCnt.forEach(i => {
            i.style.display = 'none';
        });
    }

    function showTabContent(i = 0, tCnt = tabsCotent, style = 'flex') {
        tCnt[i].style.display = style;
    }

    const prevSwiper = new Swiper('.prev__in', {
        autoplay: {
            delay: 5000,

        },
        allowTouchMove: true,
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

    if(tabsParent) {
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
    }

    if(tabContentCloseBtn) {
        tabContentCloseBtn.forEach(i => {
            i.addEventListener('click', ()=> {
                hideTabContent();
            });
        }); 
    }
    



    const favBtns = document.querySelectorAll('.fav');

    if(favBtns) {
        favBtns.forEach(i => {

            if(i.classList.contains('active')) {
                i.innerHTML = `<svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.323242 1.167C0.323242 0.522484 0.846628 0 1.49226 0H8.50635C9.15198 0 9.67537 0.522483 9.67537 1.167V11.0865C9.67537 11.3051 9.553 11.5053 9.35832 11.6053C9.16364 11.7053 8.92929 11.6884 8.75112 11.5613L4.9993 8.88606L1.24749 11.5613C1.06932 11.6884 0.834973 11.7053 0.64029 11.6053C0.445607 11.5053 0.323242 11.3051 0.323242 11.0865V1.167ZM8.50635 1.167L4.65957 7.69419C4.8628 7.54927 5.13581 7.54927 5.33904 7.69419L2 8L8.50635 1.167Z" fill="#FF9700"/>
                    </svg>
                    `
            } else {
                if(!i.classList.contains('active')) {
                    i.innerHTML = `<svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1.167C0 0.522484 0.522483 0 1.167 0H8.169C8.81351 0 9.336 0.522483 9.336 1.167V11.0865C9.336 11.3051 9.21384 11.5053 9.0195 11.6053C8.82515 11.7053 8.59121 11.6884 8.41335 11.5613L4.668 8.88606L0.922652 11.5613C0.744793 11.6884 0.510848 11.7053 0.316501 11.6053C0.122154 11.5053 0 11.3051 0 11.0865V1.167ZM8.169 1.167L1.167 1.167V9.95265L4.32885 7.69419C4.53173 7.54927 4.80427 7.54927 5.00715 7.69419L8.169 9.95265V1.167Z" fill="#242424"/>
                    </svg>`;
                }
            }
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
                    </svg>`;
                }
            });
        });
    }


    /*RangeS Slider*/
    // const rangeSlider = document.querySelector('#rangeSlider');
    const sliders = document.querySelectorAll('.range');

    const valueBlock = document.querySelector('#valueBlock');
    const valueBlock1 = document.querySelector('#valueBlock1');

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
    
    if(filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            filter.classList.add('active');
            document.body.classList.add('no-scroll');
        });

        filterClose.addEventListener('click', ()=> {
            filter.classList.remove('active');
            document.body.classList.remove('no-scroll');
        })
    }

    const mainCarouselSelect = document.querySelector("#mainCarousel");

    if(mainCarouselSelect) {
        const mainCarousel = new Carousel(mainCarouselSelect, {
            Dots: false,
            Navigation: true
        });

        const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
            Sync: {
                target: mainCarousel,
                friction: 0,
            },
            Dots: false,
            // Navigation: false,
            center: false,
            // slidesPerPage: 1,
            infinite: false,
        });

        Fancybox.bind('[data-fancybox="gallery"]', {
            Carousel: {
            on: {
                change: (that) => {
                mainCarousel.slideTo(mainCarousel.findPageForSlide(that.page), {
                    friction: 0,
                });
                },
            },
            },
        });
    }
    

    const productReviewsSelect = document.querySelector("#productReviews");
    
    

    if(productReviewsSelect) {
        const productReviews = new Carousel(productReviewsSelect, {
            Dots:false,
            center: false,
            infinite: false
        });

        const revSlider = new Carousel(document.querySelector('.reviews__body_item_content'), {
            center: false,
            Dots: false,
            infinite: false
        });
    }



    

    const counter = () => {
        let counterBtns = document.querySelectorAll('.item__action_count_btn');

        if(counterBtns) {
            counterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    let direction = this.dataset.direction;
                    let input = this.parentElement.querySelector('.item__action_count_value');
        
                    const currentValue = +input.value;
                    let newValue;
        
                    if(direction === 'plus') {
                        newValue = currentValue + 1;
                    } else {
                        newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
                    }
        
                    input.value = newValue;
                });
            });
        }
    }
    

    // conuters.forEach(i => {
    //     i.addEventListener('click', (e) => {
    //         let target = e.target;
    //         let current = e.currentTarget;

    //         let value = current.querySelector('.item__action_count_value');
    //         let minus = current.querySelector('.btn_minus');
    //         let plus = current.querySelector('.btn_plus');
    //         let jsvalue = 1;

    //         value.innerHTML = jsvalue;

    //         if(target && target.classList.contains('btn_plus')) {
    //             jsvalue++;
    //             value.innerHTML = `${jsvalue}`;
    //             console.log('rabotaet');

    //             return jsvalue = jsvalue; 
    //         }
    //     })
    // })
    const articlesPage = document.querySelector('#arts');

    if(articlesPage) {
        const articlesTabs = articlesPage.querySelectorAll('.item');
        const articlesTabsParent = articlesPage.querySelector('.arts__side_tabs');
        const articlesContent = articlesPage.querySelectorAll('.arts__content');

        hideTabContent(articlesContent);
        showTabContent(0, articlesContent, 'block');

        articlesTabsParent.addEventListener('click', (e) => {
                let tar = e.target;

                if(tar && tar.classList.contains('item')) {
                    articlesTabs.forEach((i, index) => {
                        if(tar == i) {
                            hideTabContent(articlesContent);
                            showTabContent(index, articlesContent, 'block');
                        }
                    })
                }
            })


        // if(tabsParent) {
        //     tabsParent.addEventListener('click', (e) => {
        //         let tar = e.target;
        //         if(tar && tar.classList.contains('header__menu_aside_item')) {
        //             tabs.forEach((i, index) => {
        //                 if(tar == i) {
        //                     hideTabContent();
        //                     showTabContent(index);
        //                 }
        //             })
        //         }
        //     });
        // }

    }


    const funcBtns = document.querySelectorAll('.product_func');


    function funcMenuClose() {
        let menus = document.querySelectorAll('.product_func_menu');

        menus.forEach(i => {
            i.classList.remove('active');
        })
    }



    funcBtns.forEach(i => {
        i.addEventListener('click', (e)=> {
            let menu = e.currentTarget.querySelector('.product_func_menu');
            

            // funcMenuClose();


            if(e.target) {
                menu.classList.toggle('active');
            }


            if(e.target.className == 'product_func_menu' || e.target.className == 'fs') {
                menu.classList.remove('active');
            }

            // if(e.target || e.target.classList.contains('func_open') || e.target.classList.contains('product_func')) {
            //     menu.classList.add('active');
            // }

            // if(e.target.className == 'func_open' || e.target.className == 'product_func') {
            //     menu.classList.toggle('active');
            // }

            // if(e.target.classList.contains('fs')) {
            //     menu.classList.remove('active');
            // }

            // if(e.target.className != 'product_func_menu') {
            //     menu.classList.remove('active');
            // }

            // if(!e.target.classList.contains('product_func') || !e.target.classList.contains('func_open')) {
            //     menu.classList.remove('active')
            // }
            

           
        })
    })

    document.body.addEventListener('click', (e)=> {
        if(e.target.className != 'func_open') {
            funcMenuClose();
        }
    })


    /*Delivery filter*/

    function deliveryFilter() {
        const filter = document.querySelector('.lk__profile_filter');

        if(filter) {
            filter.addEventListener('click', (e) => {
                let target = e.target;
                let filterItems = e.currentTarget.querySelectorAll('.lk__profile_filter_item');
                if(target && target.classList.contains('lk__profile_filter_item')) {
                    filterItems.forEach(i => {
                        i.classList.remove('lk__profile_filter_item_active')
                    })

                    if(e.target.classList.contains('lk__profile_filter_item')) {
                        e.target.classList.add('lk__profile_filter_item_active');
                    }
                }
            });
        }
    }



    // Ymaps
    if(ymaps) {
        ymaps.ready(init);
    }
    

    function init() {
        // Подключаем поисковые подсказки к полю ввода.
        var suggestView = new ymaps.SuggestView('suggest'),
            map,
            placemark;
    
        // При клике по кнопке запускаем верификацию введёных данных.
        $('#button').bind('click', function (e) {
            geocode();
        });
    
        function geocode() {
            // Забираем запрос из поля ввода.
            var request = $('#suggest').val();
            // Геокодируем введённые данные.
            ymaps.geocode(request).then(function (res) {
                var obj = res.geoObjects.get(0),
                    error, hint;
    
                if (obj) {
                    // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
                    switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                        case 'exact':
                            break;
                        case 'number':
                        case 'near':
                        case 'range':
                            error = 'Неточный адрес, требуется уточнение';
                            hint = 'Уточните номер дома';
                            break;
                        case 'street':
                            error = 'Неполный адрес, требуется уточнение';
                            hint = 'Уточните номер дома';
                            break;
                        case 'other':
                        default:
                            error = 'Неточный адрес, требуется уточнение';
                            hint = 'Уточните адрес';
                    }
                } else {
                    error = 'Адрес не найден';
                    hint = 'Уточните адрес';
                }
    
                // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
                if (error) {
                    showError(error);
                    // showMessage(hint);
                    errorState();
                } else {
                    showResult(obj);
                    
                }
            }, function (e) {
                console.log(e)
            })
    
        }
        function showResult(obj) {
            // Удаляем сообщение об ошибке, если найденный адрес совпадает с поисковым запросом.
            $('#suggest').removeClass('input_error');
            $('#notice').css('display', 'none');
    
            var mapContainer = $('#map'),
                bounds = obj.properties.get('boundedBy'),
            // Рассчитываем видимую область для текущего положения пользователя.
                mapState = ymaps.util.bounds.getCenterAndZoom(
                    bounds,
                    [mapContainer.width(), mapContainer.height()]
                ),
            // Сохраняем полный адрес для сообщения под картой.
                // address = [obj.getCountry(), obj.getAddressLine()].join(', '),

                
            // Сохраняем укороченный адрес для подписи метки.
                shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
            // Убираем контролы с карты.
            mapState.controls = [];
            // Создаём карту.
            createMap(mapState, shortAddress);
            // Выводим сообщение под картой.
            showMessage(obj);
        }
    
        function showError(message) {
            $('#notice').text(message);
            $('#suggest').addClass('input_error');
            $('#notice').css('display', 'block');
            // Удаляем карту.
            if (map) {
                map.destroy();
                map = null;
            }
        }
    
        function createMap(state, caption) {
            // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
            if (!map) {
                map = new ymaps.Map('map', state);
                placemark = new ymaps.Placemark(
                    map.getCenter(), {
                        iconCaption: caption,
                        balloonContent: caption
                    }, {
                        preset: 'islands#redDotIconWithCaption'
                    });
                map.geoObjects.add(placemark);
                // Если карта есть, то выставляем новый центр карты и меняем данные и позицию метки в соответствии с найденным адресом.
            } else {
                map.setCenter(state.center, state.zoom);
                placemark.geometry.setCoordinates(state.center);
                placemark.properties.set({iconCaption: caption, balloonContent: caption});
            }
        }
    
        function showMessage(message) {
            // $('.popup__adress_head').classList.remove('dsbl');
            $('#map').css('display', 'block');
            $('#street-point').text(`${message.getThoroughfare()}, ${message.getPremiseNumber()}`);
            $('#city-point').text(message.getAdministrativeAreas());
            $('#country-point').text(message.getCountry());

            $('#street-point').removeClass('dsbl');
            $('.popup__adress_scdr').removeClass('dsbl');
            let mapForm = document.querySelector('#mapForm');
            if(mapForm) {
                let inputs = mapForm.querySelectorAll('input');
                let btn = mapForm.querySelector('button');
                inputs.forEach(i => {
                    i.removeAttribute('disabled');
                });
                btn.removeAttribute('disabled');
            }
        }


        function errorState() {
            $('#map').css('display', 'none');
            $('#street-point').text('Улица');
            $('#city-point').text('Город');
            $('#country-point').text('Страна');

            $('#street-point').addClass('dsbl');
            $('.popup__adress_scdr').addClass('dsbl');
            let mapForm = document.querySelector('#mapForm');
            if(mapForm) {
                let inputs = mapForm.querySelectorAll('input');
                let btn = mapForm.querySelector('button');
                inputs.forEach(i => {
                    i.setAttribute('disabled', 'disabled');
                });
                btn.setAttribute('disabled', 'disabled');
            }

            console.log('asd');

        }

    }



    // Rating
    let revStars = document.querySelectorAll('.item__stars_el');

    if(revStars) {
        revStars.forEach(item => {
            item.addEventListener('click', () => {
                const { itemValue } = item.dataset;
                item.parentNode.dataset.totalValue = itemValue;
            })
        })
    }




    

    deliveryFilter();
    
    counter();

 
    dropDown('.header__main_search_drop', '.header__main_search_drop_list');
    dropDown('.filter_form', '.hide_list', '1', 'Показать все', 'Скрыть');
    dropDown('.category', '.filter_category_list');
    dropDown('.filter_hidden', '.filter_hidden_list', '2', 'Все фильтры', 'Скрыть');
    dropDown('.reviews__body_filter_item', '.reviews__body_filter_item_list ');
    dropDown('.action__drop', '.action__drop_input');
    dropDown('.lk__body_drop', '.lk__body_drop_content');
    dropDown('.tab__list', '.tab__list_body');

});


