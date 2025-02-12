document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const button = event.target;
        const item = button.closest('.item');
        const itemName = item.querySelector('.item-name').textContent;
        const itemPrice = item.querySelector('.item-price').textContent;
        const itemImage = item.querySelector('.item-image').src;
        const itemHeadline = item.querySelector('.item-headline').textContent;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name: itemName, price: itemPrice, image: itemImage, headline: itemHeadline });
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${itemName} has been added to your cart.`);
    }
});