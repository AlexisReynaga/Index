// Obtenemos todos los botones de "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Escuchamos cuando se haga click en un botón
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = event.target.getAttribute('data-product');
        const productPrice = event.target.getAttribute('data-price');

        // Agregar al carrito (puedes agregar lógica adicional aquí si lo deseas)
        alert(`Agregaste ${productName} al carrito por $${productPrice}`);

        // Mostrar el mensaje de confirmación (Toast)
        showToast(`¡${productName} agregado al carrito!`);
    });
});

// Función para mostrar el Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;

    // Hacer aparecer el toast
    toast.classList.add('show');

    // Ocultar el toast después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
