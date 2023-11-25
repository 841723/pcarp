
  
function cargarDatosPersonales() {
    if (sessionStorage.getItem('email') === null) {
        window.location.href = '/login.html';
    }
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const direccionInput = document.getElementById('direccion');

    // Obtener el correo electrónico del usuario de sessionStorage
    const userEmail = sessionStorage.getItem('email');

    // Realizar la consulta a la base de datos para obtener los datos del usuario
    const url = `/user_mail?data=${encodeURIComponent(userEmail)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
        // Asignar los resultados a las cajas de texto
        emailInput.value = data.mail;
        nombreInput.value = data.nombre;
        apellidosInput.value = data.apellidos;
        direccionInput.value = data.direccion
    })
    .catch(error => console.error('Error al cargar datos personales:', error));
}

// Llamar a la función para obtener y mostrar los pedidos del cliente al cargar la página
// document.addEventListener('DOMContentLoaded', obtenerPedidosCliente);
window.addEventListener('load', cargarDatosPersonales);
mostrarCarrito()

// order_submit = document.getElementById('order_submit');
// order_submit.addEventListener('click', function() {
//     event.preventDefault();
    
// })



function crearEntradaCheckOut(product, veces, hay_descuento, precio_descuento) {
    // <div class="order-col">
    //     <div>2x Product Name Goes Here</div>
    //     <div>$980.00</div>
    // </div>

    div_order_col = document.createElement('div');
    div_order_col.className = "order-col";

    div_product_name = document.createElement('div');
    div_product_name.textContent = veces + "x " + product.modelo + " - " + product.marca;
    div_order_col.appendChild(div_product_name);

    

    if (hay_descuento) {
        div_product_price = document.createElement('div');
        div_product_price.className = "product-price-discounted";
        div_product_price.textContent = precio_descuento + " € ";

        precio_anterior = document.createElement('del');

        precio_anterior.textContent = product.precio + " €";
        div_product_price.appendChild(precio_anterior);
        div_order_col.appendChild(div_product_price);
    }
    else {
        div_product_price = document.createElement('div');
        div_product_price.className = "product-price";

        div_product_price.textContent = product.precio + " €";
        div_order_col.appendChild(div_product_price);
    }
    return div_order_col;
}

async function mostrarCarrito() {
    order_summary_id = document.getElementById('order-summary-id');
    cart = sessionStorage.getItem('cart');
    
    if (cart === null || cart === "") {
        order_summary_id.style.display = "none";
    } else {
        precio_acumulado = 0;
        // order_summary_id.style.visibility = "hidden";
        cart_list = cart.split(";");
        const fetchPromises = [];

        for (const item of cart_list) {
            const id = item.split(":")[0].replace("id", "");
            const veces = item.split(":")[1];

            if (id !== "") {    
                const url = `/products_id?id=${encodeURIComponent(id)}`;
                const fetchPromise = fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.descuento != 0) {
                        hay_descuento = true;
                        precio_descuento = data.precio - (data.precio * data.descuento / 100);
                        precio_descuento = precio_descuento.toFixed(2);
                        precio_a_sumar = precio_descuento * veces;
                    }
                    else {
                        hay_descuento = false;
                        precio_descuento = 0;
                        precio_a_sumar = data.precio * veces;
                    }
                    precio_acumulado += precio_a_sumar;
                    const div_product = crearEntradaCheckOut(data, veces,hay_descuento,precio_descuento);
                    order_summary_id.appendChild(div_product);
                })
                .catch(error => console.error('Error:', error));
                
                fetchPromises.push(fetchPromise);
            }
        }

        try {
            // Esperar a que todas las promesas se resuelvan
            await Promise.all(fetchPromises);

            // Actualizar la interfaz de usuario después de completar todas las llamadas fetch
            order_summary_id.style.display = "block";
            order_summary_id.style.visibility = "show";

            precio_total = document.getElementById('precio-total');
            precio_total.textContent = precio_acumulado.toFixed(2) + " €"; // Asegúrate de redondear el precio a dos decimales
        } catch (error) {
            console.error('Error en Promise.all:', error);
        }
    }
}