// root sections
const SECTIONS = document.querySelectorAll('main>section');

// menu
const MENU = document.getElementsByClassName('header__navigation')[0];
const MENU_LINKS = document.querySelectorAll('.header__navigation ul li a');

// slider
const PROMO = document.getElementsByClassName('slider__promo')[0];

// parent of all slides
const PROMO_CONTENT = document.getElementsByClassName('promo__content')[0];
const ARROWS = document.getElementsByClassName('arrows');
const ARROW_LEFT = document.querySelector('.promo__arrow_left');
const ARROW_RIGHT = document.querySelector('.promo__arrow_right');
const PHONE_VERTICAL = document.getElementById('phone-vertical');
const PHONE_HORIZONTAL = document.getElementById('phone-horizontal');
const YELLOW_PICTURE = document.getElementById('yellow-picture');
const BLUE_PICTURE = document.getElementById('blue-picture');

// portfolio
const FILTERING = document.getElementsByClassName('gallery__filtering')[0];
const GALLERY_TILES = document.getElementsByClassName('gallery__tiles')[0];
const TILES = document.getElementsByClassName('tiles__tile');

// form
const NAME = document.getElementById('response-name');
const EMAIL = document.getElementById('response-email');
const SUBJECT = document.getElementById('response-subject');
const DESCRIBE = document.getElementById('response-describe');
const SUBMIT = document.getElementById('response-submit');

// modal
const OVERLAY = document.getElementsByClassName('overlay')[0];
const MODAL = document.getElementsByClassName('modal')[0];
const MODAL_BUTTON = document.querySelector('.modal button');

//constants
const SLIDE_SIZE = 1020;
const SLIDES_LENGTH = PROMO_CONTENT.querySelectorAll('.slide').length;

let TILES_NAMES = [ 'ship', 'face', 'town', 'robot', 'animals', 'sdk', 'space', 'birds', 'monster', 'letter', 'ogre', 'indicator' ]
let sliderPosition = PROMO_CONTENT.offsetLeft;
let currentSlide = 0;
let allowShift = true;

// after all content is loaded (includes css / images)
window.onload = function() {
    // add click handlers for all elements
    addElementsClickHandler();
}

const addElementsClickHandler = () => {
    cloneSlides(PROMO_CONTENT);
    PROMO_CONTENT.addEventListener('transitionend', checkCurrentSlide);

    MENU.addEventListener('click', (event) => {
        MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    })

    ARROW_LEFT.addEventListener('click', () => shiftSlide(-1));
    ARROW_RIGHT.addEventListener('click', () => shiftSlide(1));
    
    PHONE_VERTICAL.addEventListener('click', () => {
        YELLOW_PICTURE.classList.toggle('hide-content');
    })
    
    PHONE_HORIZONTAL.addEventListener('click', () => {
        BLUE_PICTURE.classList.toggle('hide-content');
    })
    
    FILTERING.addEventListener('click', (event) => {
        FILTERING.querySelectorAll('li').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    
        TILES_NAMES.sort(() => Math.random() - 0.5);
    
        Array.from(TILES).forEach((tile, index) => tile.className = `tiles__tile ${TILES_NAMES[index]}`)
    })
    
    GALLERY_TILES.addEventListener('click', (event) => {
        GALLERY_TILES.querySelectorAll('div').forEach(el => el.classList.remove('tiles__tile_active'));
        event.target.classList.add('tiles__tile_active');
    })
    
    SUBMIT.addEventListener('click', (event) => {
        event.preventDefault();
        const subject = SUBJECT.value;
        const describe = DESCRIBE.value;
        MODAL.querySelector('.modal__topic').textContent = (subject == 'Singolo') ? 'Тема: Singolo' : 'Без темы';
        MODAL.querySelector('.modal__describe').textContent = (describe == 'Portfolio project') ? 'Описание: Portfolio project' : 'Без описания';
    
        OVERLAY.classList.toggle('hide-content');
    })
    
    MODAL_BUTTON.addEventListener('click', () => {
        OVERLAY.classList.toggle('hide-content');
        earseFormContent();
    })

    document.addEventListener('scroll', onScroll)

}

const earseFormContent = () => {
    NAME.value = '';
    EMAIL.value = '';
    SUBJECT.value = '';
    DESCRIBE.value = '';
}

const onScroll = (event) => {
    const curPos = window.scrollY;

    SECTIONS.forEach((element) => {
        const id = element.getAttribute('id');

        if (element.offsetTop <= curPos && (element.offsetTop + element.offsetHeight) > curPos) {
            MENU_LINKS.forEach((link) => {
                link.classList.remove('active')
                if (id === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            });
        }
    });
}

const cloneSlides = (slides) => {
    const firstSlide = slides.children[0];
    const lastSlide = slides.children[slides.children.length - 1];

    const cloneFirst = firstSlide.cloneNode(true);
    const cloneLast = lastSlide.cloneNode(true);

    slides.appendChild(cloneFirst);
    slides.insertBefore(cloneLast, firstSlide);
}

const shiftSlide = (direction) => {
    PROMO_CONTENT.classList.add('shifting');

    if (allowShift) {
        sliderPosition = PROMO_CONTENT.offsetLeft;

        switch(direction) {
            case (1):
                PROMO_CONTENT.style.left = `${sliderPosition - SLIDE_SIZE}px`;
                currentSlide++;
                break;
            case (-1):
                PROMO_CONTENT.style.left = `${sliderPosition + SLIDE_SIZE}px`;
                currentSlide--;
                break;
        }
    }

    allowShift = false;
}

const checkCurrentSlide = () => {
    PROMO_CONTENT.classList.remove('shifting');

    if (currentSlide == -1) {
        PROMO_CONTENT.style.left = `-${(SLIDES_LENGTH * SLIDE_SIZE)}px`;
        currentSlide = SLIDES_LENGTH - 1;
    }

    if (currentSlide == SLIDES_LENGTH) {
        PROMO_CONTENT.style.left = `-${(1 * SLIDE_SIZE)}px`;
        currentSlide = 0;
    }

    allowShift = true;
}