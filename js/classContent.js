export default class Content {
    
    createContent(className, div, name, img, price, company) {
        let htmlItem = `
        <div class="${className} ${company} item">
            <img src="${img}" alt="photo" class="${className}-img item-img">
            <p class="${className}-name item-name">${name}</p>
            <p class="${className}-price item-price">$${price}</p>
        </div>`;
        div.innerHTML+= htmlItem;
    }

    createCart(div, img, name, price, quantity) {
        let htmlItem = `
        <div class="cart-item">
            <div class="cart-item-block">
                <img class="cart-item-img" src="${img}" alt="img">
                <div class="cart-text">
                    <div class="cart-name">${name}</div>
                    <div class="cart-price">${price}</div>
                    <button class="cart-remove">remove</button>
                </div>
            </div>
            <div class="cart-quantity">
                <img class="cart-quantity-up quantity" src="img/icons/arrow-up.svg" alt="">
                <div class="cart-quantity-number">${quantity}</div>
                <img class="cart-quantity-down quantity" src="img/icons/arrow-down.svg" alt="">
            </div>
        </div>`;
        div.innerHTML+= htmlItem;
    }
    
}

