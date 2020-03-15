// menu
const MENU = document.getElementsByClassName('header__navigation')[0];

// slider
const PROMO = document.getElementsByClassName('slider__promo')[0];
const PROMO_CONTENT = document.getElementsByClassName('promo__content')[0];
const ARROWS = document.getElementsByClassName('arrows');
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

let TILES_NAMES = [ 'ship', 'face', 'town', 'robot', 'animals', 'sdk', 'space', 'birds', 'monster', 'letter', 'ogre', 'indicator' ]

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
})

Array.from(ARROWS).forEach(arrow => arrow.addEventListener('click', () => {
    PROMO.classList.toggle('slide-2');
    PROMO_CONTENT.classList.toggle('hide-content');
}))

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
})