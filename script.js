document.addEventListener('DOMContentLoaded', () => {
    let cart = [];    function updateCartSummary() {
        const cartSummary = document.getElementById('cartSummary');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');        cartItems.innerHTML = '';        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });        cartTotal.textContent = total.toFixed(2);        cartSummary.style.display = cart.length > 0 ? 'block' : 'none';
    }    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();            const product = {
                id: btn.parentElement.dataset.productId,
                name: btn.parentElement.querySelector('h3').textContent,
                price: parseFloat(btn.previousElementSibling.textContent.replace('$', '')),
                quantity: 1
            };            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }            updateCartSummary();            alert('Product added to cart!');
        });
    });    const categories = document.querySelectorAll('.category');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            const categoryName = cat.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
            window.location.href = `category-${categoryName}.html`;
        });
    });    updateCartSummary();     function displayTabContent(contentId) {
        const contentSections = {
            home: "Welcome to Sports Fitness Gear! We provide top-quality fitness equipment to enhance your workout experience. Explore our products tailored for all your fitness needs.",
            categories: "Discover our wide range of categories to find exactly what you need for your fitness journey. From running shoes to yoga mats and fitness tech, we have everything covered.",
            about: `
                <h2>Our Stores</h2>
                <ul>
                    <li>Sports Fitness Gear Downtown - 123 Main St, Anytown, USA</li>
                    <li>Sports Fitness Gear Uptown - 456 Elm St, Anytown, USA</li>
                    <li>Sports Fitness Gear Suburbia - 789 Oak St, Anytown, USA</li>
                </ul>
            `,
            contact: `
                <h2>Contact Us</h2>
                <p>Email: support@sportsfitnessgear.com</p>
                <p>Customer Service: 1-800-555-GEAR</p>
            `
        };        const mainContent = document.querySelector('main');
        mainContent.innerHTML = `<div class='tab-content'>${contentSections[contentId]}</div>`;
    }    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const contentId = link.getAttribute('href').substring(1);            document.getElementById(contentId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });});