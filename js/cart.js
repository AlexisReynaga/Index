// Verifica si el carrito ya está guardado en localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el contenido del carrito (el contador en la barra de navegación)
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerHTML = cart.length;  // Muestra el número de productos en el carrito
    }
    updateCartTotal(); // Actualiza el total cuando se actualiza el carrito
}

// Función para agregar un producto al carrito
function addToCart(productName, productPrice, productImage) {
    // Crea el objeto producto
    const product = {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage // Agregamos la ruta de la imagen
    };
    
    // Agrega el producto al carrito
    cart.push(product);
    
    // Guarda el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Muestra el toast
    showToast(`${productName} se ha agregado al carrito`);
    
    // Actualiza la visualización del carrito
    updateCart();
}

// Función para mostrar un mensaje tipo toast
function showToast(message) {
    // Crear el contenedor del toast
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = message;

    // Agregar el toast al body
    document.body.appendChild(toast);

    // Mostrar el toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100); // Aparece después de un pequeño delay

    // Eliminar el toast después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300); // Eliminar después de la animación
    }, 3000);
}

// Función para mostrar los productos en el carrito en `cart.html`
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-products');  // Contenedor de los productos en el carrito

    if (cartItemsContainer) {
        // Si el carrito está vacío, mostrar mensaje
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No tienes productos en tu carrito.</p>';
            return;
        }

        // Limpiar el contenedor de productos en el carrito
        cartItemsContainer.innerHTML = '';

        // Mostrar todos los productos en el carrito
        cart.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}"> <!-- Mostramos la imagen correcta -->
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Descripción del producto</p>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <button class="remove-item" onclick="removeItem('${item.name}')">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });
    }
}

// Función para calcular y actualizar el total
function updateCartTotal() {
    const subtotalContainer = document.getElementById('cart-subtotal');
    const totalContainer = document.getElementById('cart-total');
    
    if (subtotalContainer && totalContainer) {
        // Sumar los precios de todos los productos en el carrito
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        
        // Sumar el costo de envío (esto puede ser dinámico dependiendo de tu lógica)
        const shipping = 5.00;
        
        // Calcular el total (subtotal + envío)
        const total = subtotal + shipping;
        
        // Mostrar el subtotal y el total en los contenedores
        subtotalContainer.innerHTML = `$${subtotal.toFixed(2)}`;
        totalContainer.innerHTML = `$${total.toFixed(2)}`;
    }
}

// Función para eliminar un producto del carrito
function removeItem(productName) {
    // Filtrar el carrito para eliminar el producto
    cart = cart.filter(item => item.name !== productName);

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualiza la visualización del carrito
    updateCart();
    displayCartItems();
}

// Verifica si el botón de agregar al carrito existe en `menu.html` y `index.html`
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.closest('.menu-item, .card');
        const productName = productItem.querySelector('h3, .card-title').textContent;
        const productPrice = productItem.querySelector('.price').textContent.replace('$', '');
        const productImage = productItem.querySelector('img').src; // Obtenemos la ruta de la imagen

        // Agrega el producto al carrito
        addToCart(productName, parseFloat(productPrice), productImage);
    });
});

// Actualiza el carrito al cargar la página
updateCart();

// Si estamos en `cart.html`, mostramos los productos en el carrito
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}
