import { allFurniture } from "./getData.js";
import { getProductsFurniture, getHomeFurniture, quantityUpDown, removeCartItem } from "./createContent.js";


//*----------Overall--------pages-----------------------
const menu = document.querySelector('.header-nav');
const burger = document.querySelector('.header-burger-icon');
const cartBtn = document.querySelector('.header-cart');
const cart = document.querySelector('.checkout-cart');
const closeCart = document.querySelector('.checkout-cart-close');
const cover = document.querySelector('.cover');
const html = document.querySelector('html');

quantityUpDown();
removeCartItem();



cartBtn.addEventListener('click', () => {
    cart.classList.add('active');
    cover.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
    cover.classList.remove('active');
});

html.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('cover')) {
        cart.classList.remove('active');
        cover.classList.remove('active');
    }
});

if (menu && burger) {
    burger.addEventListener('click', () => {
        menu.classList.toggle('active')
        burger.classList.toggle('active')
    })
}



//*----------Products--------pages-----------------------
if (window.location.href.indexOf("products") != -1) {
    allFurniture();
    getProductsFurniture();
    
}

//*----------Home--------pages---------------------------
if (window.location.href.indexOf("index") != -1) {
    const allProd = document.querySelector('.featured-btn');
    const showNow = document.querySelector('.home-btn');
    allFurniture();
    getHomeFurniture();
    showNow.addEventListener('click', () => {
        location.href = 'products.html';
    });
    allProd.addEventListener('click', () => {
        location.href = 'products.html';
    });
}











