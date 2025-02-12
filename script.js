document.addEventListener('DOMContentLoaded', function() {
    const buyNowButtons = document.getElementsByClassName('buy-now');

    for (let button of buyNowButtons) {
        button.addEventListener('click', function() {
            const btcAmountElement = document.getElementById('btc-amount');
            if (btcAmountElement) {
                let btcAmount = parseFloat(btcAmountElement.textContent);
                if (btcAmount > 500) {
                    alert('You cannot buy more than 500 bitcoins at once.');
                    return;
                }
            }

            const originalText = button.textContent;
            button.textContent = 'Thank you for your purchase!';
            button.disabled = true;
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);

            // reset the amount of BTC and price
            const priceElement = document.getElementById('btc-price');
            if (btcAmountElement && priceElement) {
                btcAmountElement.textContent = '0';
                priceElement.textContent = '$0.00';
            }
        });
    }
});

const cartIcon = document.createElement('div');
cartIcon.id = 'cart-icon';
cartIcon.style.position = 'fixed';
cartIcon.style.top = '10px';
cartIcon.style.right = '10px';
cartIcon.style.width = '50px';
cartIcon.style.height = '50px';
cartIcon.className = 'cart-icon';
cartIcon.style.backgroundImage = 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tcCToE9yV06lkyiS21d5-QHaHa%26pid%3DApi&f=1&ipt=c1c6c7d614475b8c52dc0c6d3b5f708ef9664989ee4b2b4d8d4715bbdf5fd894&ipo=images")';
cartIcon.style.backgroundSize = 'cover';
cartIcon.style.pointerEvents = 'auto';
cartIcon.style.display = 'none'; 
document.body.appendChild(cartIcon);

const cartCountBubble = document.createElement('div');
cartCountBubble.id = 'cart-count-bubble';
cartCountBubble.style.position = 'absolute';
cartCountBubble.style.top = '0';
cartCountBubble.style.right = '-10px';
cartCountBubble.style.width = '25px';
cartCountBubble.style.height = '25px';
cartCountBubble.style.backgroundColor = 'red';
cartCountBubble.style.color = 'white';
cartCountBubble.style.fontSize = '16px';
cartCountBubble.style.fontWeight = 'bold';
cartCountBubble.style.textAlign = 'center';
cartCountBubble.style.lineHeight = '25px';
cartCountBubble.style.borderRadius = '50%';
cartCountBubble.style.display = 'none';
cartIcon.appendChild(cartCountBubble);

let cartCount = 0;
const addToCartButtons = document.getElementsByClassName('add-to-cart');
for (let button of addToCartButtons) {
    button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-item-name');
        const itemPrice = this.getAttribute('data-item-price');
        const itemImage = this.getAttribute('data-item-image');
        
        const cartItems = getCartItems();
        cartItems.push({ name: itemName, price: itemPrice, image: itemImage });
        saveCartItems(cartItems);

        const originalText = button.textContent;
        button.textContent = 'Successfully added to cart';
        button.disabled = true;
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
        cartCount++;
        cartCountBubble.textContent = cartCount;
        cartCountBubble.style.display = 'block';
        cartIcon.style.display = 'block'; 
    });
}

// Add event listener to cartIcon to redirect to another page
cartIcon.addEventListener('click', function() {
    window.location.href = 'cart.html';
});

// Function to save cart items to localStorage
function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to get cart items from localStorage
function getCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

// On cart.html, load cart items and display them
if (window.location.pathname.endsWith('cart.html')) {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear any existing content

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image" />
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price}</span>
        `;
        cartContainer.appendChild(itemElement);
    });
}

