import { allFurniture } from "./getData.js";
import Content from "./classContent.js"
let content = new Content;
const shoppingCart = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];
let fullPrice = localStorage.getItem('price') ? JSON.parse(localStorage.getItem('price')) : 0;
console.log(shoppingCart);
console.log(fullPrice);

const amountOfCart = document.querySelector('.header-cart-amount');
const cartContainer = document.querySelector('.checkout-cart-items');
const totalPrice = document.querySelector('.total-amount');
let total = fullPrice;
totalPrice.innerHTML = `$${total}`

export const getProductsFurniture = async () => {
    const productsContainer = document.querySelector('.catalogue-items');
    try {
        let furniture = await allFurniture();
        if (furniture) {
            for (const item of furniture) {
                content.createContent('catalogue-item', productsContainer, item.name, item.img, item.price, item.company);
            }
            await searchFilters();
            const homeItem = document.querySelectorAll('.item');
            addToShoppinCart(homeItem);
        }
    } catch (error) {
        console.log(error);
    }
    async function searchFilters() {
        const productsItem = document.querySelectorAll('.catalogue-item');
        const priceRange = document.querySelector('.filter-price-range');
            productsItem.forEach(item => {
                //*----Company--Filter----
                const companies = document.querySelectorAll('li');
                    companies.forEach(company => {
                        company.addEventListener('click', () => {
                            if (item.classList.contains(company.className)) {
                                item.classList.remove('hidden');
                            } else {
                                item.classList.add('hidden');
                            }
                            if (company.className === 'all') {
                                item.classList.remove('hidden');
                            }
                        });
                    });
                //*----Price--Filter------
                priceRange.addEventListener('input', () => {
                    const itemPrice = item.children[2].innerHTML.slice(1, item.children[2].innerHTML.length);
                    document.querySelector('.price-amount').innerHTML = `$${priceRange.value}`;
                    setTimeout(() => {
                        if (itemPrice < parseInt(priceRange.value)) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    }, 300)
                });
                //*----Search--Filter-----
                const search = document.querySelector('.catalogue-filter-search');
                const itemName = item.children[1].textContent.toLowerCase();
                search.addEventListener('keyup', () => {
                    let lowerCaseSearch = search.value.toLowerCase();
                    if (itemName.indexOf(lowerCaseSearch) == -1) {
                        item.classList.add('hidden');
                    } else {
                        item.classList.remove('hidden');
                    }
                })
            });
    }
}

export const getHomeFurniture = async function () {
    const homeContainer = document.querySelector('.featured-items');
    let randomNumber = Math.floor(Math.random() * 13);
    try {
        let data = await allFurniture();
        if (data) {
            for (let i = randomNumber; i <=(randomNumber + 2); i++) {
                content.createContent('featured-item', homeContainer, data[i].name, data[i].img, data[i].price);
            }
        }
        const homeItem = document.querySelectorAll('.item');
        addToShoppinCart(homeItem);
    }
    catch (error) {
        console.log(error);
    }
}


function addToShoppinCart(items) {
    items.forEach(item => {
        item.addEventListener('click', () => {
            let itemImg =  item.children[0].getAttribute('src');
            let itemName = item.children[1].innerHTML;
            let itemPrice = item.children[2].innerHTML;
            totalPrice.innerHTML = `$${total}`;
            UpdtCart(itemImg, itemName, itemPrice, 1);
        })
       })
}

function UpdtCart(img, name, price, quantity) {      
    const match = shoppingCart.find((e) => {
        return e.name === name;
    })   
    if (match) {
        alert('This product is already in cart!')
        return false;      
    } else {
        const obj = {
            img: img,
            name: name,
            price: price,
            quantity: 1,
        }
        shoppingCart.push(obj);
        content.createCart(cartContainer, img, name, price, quantity);
        quantityUpDown();
        removeCartItem();
        cartNumber(cartContainer);
        const priceNum = +(price.slice(1, price.length))
        total += priceNum;
        totalPrice.innerHTML = `$${total}`
        addPrice();
    }
    localStorage.setItem('name', JSON.stringify(shoppingCart)); 
}

function addPrice() {
    fullPrice = total;
    localStorage.setItem('price', JSON.stringify(fullPrice)); 
}



export function quantityUpDown() {
    const arrows = document.querySelectorAll('.quantity');
    arrows.forEach(arrow => {
        arrow.addEventListener('click', e => {
            const target = e.target;
            const priceElement = target.parentElement.previousSibling.previousSibling.children[1].children[1];
            const price = +(priceElement.innerHTML.slice(1, priceElement.length));
            const currentName = target.parentElement.previousSibling.previousSibling.children[1].children[0].innerHTML;
            //*-------Quantity--btn---
            if (target.classList.contains('cart-quantity-up')) {
                let amount = +(target.nextSibling.nextSibling.innerHTML);
                amount++;
                target.nextSibling.nextSibling.innerHTML = amount;
                quantityChange(currentName, amount);
                total+= price;
                totalPrice.innerHTML = `$${total}`
                addPrice();
            }
            if (target.classList.contains('cart-quantity-down')) {
                let amount = +(target.previousSibling.previousSibling.innerHTML);
                if (amount > 1) {
                    amount--;
                    total-= price;
                }
                quantityChange(currentName, amount);
                target.previousSibling.previousSibling.innerHTML = amount;
                totalPrice.innerHTML = `$${total}`
                addPrice();
            }
        })
    })
}

export function removeCartItem() {
    const remove = document.querySelectorAll('.cart-remove');
    remove.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target;
            const elementName = target.parentElement.children[0].innerHTML
            let amount = +(target.parentElement.parentElement.nextSibling.nextSibling.children[1].innerHTML);
            let currentPrice = target.previousSibling.previousSibling.innerHTML.slice(1, 999);
            target.parentElement.parentElement.parentElement.remove()
            total -= currentPrice * amount;
            totalPrice.innerHTML = `$${total}`
            addPrice();
            cartNumber(cartContainer);
               for (let i = 0; i < shoppingCart.length; i++) {
                   if (elementName === shoppingCart[i].name) {
                   shoppingCart.splice(i, 1);
                   localStorage.setItem('name', JSON.stringify(shoppingCart)); 
                   }
               }
        })
    })
}

window.onload = () => {
    cartNumber(cartContainer);
}



function quantityChange(currentName, amount) {
    const match = shoppingCart.find((e) => {
        return e.name === currentName;
    })   
    if (match) {
        match.quantity = amount;
        localStorage.setItem('name', JSON.stringify(shoppingCart)); 
    }
}

    
     
function cartNumber() {
    amountOfCart.innerHTML = cartContainer.children.length;
}

function storage () {
    for (let product of shoppingCart) {
        content.createCart(cartContainer, product.img, product.name, product.price, product.quantity)
    }
}
storage();