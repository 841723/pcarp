function crearTarjeta(item,qty) {
    // Crear el elemento principal
    const productContainer = document.createElement('div');
    productContainer.className = 'product-list';

    // Crear la sección de información del producto
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info-carrito';

    // Añadir la imagen del producto
    const productImage = document.createElement('img');
    productImage.src = foto(item.tipo);
    productImage.alt = '';
    productInfo.appendChild(productImage);

    // Añadir la información textual del producto
    const productTextInfo = document.createElement('div');
    productTextInfo.className = 'product-info-text-carrito';

    // Añadir el enlace
    const productLink = document.createElement('a');
    productLink.href = '#';
    productLink.textContent = item.modelo + ' - ' + item.marca;
    productTextInfo.appendChild(productLink);

    // Añadir la sección de precio
    const productPrice = document.createElement('div');
    productPrice.className = 'product-price-carrito';

    // Añadir el precio
    const priceSpan = document.createElement('span');
    if (hay_descuento) {
        priceSpan.textContent = precio_descuento + ' € ';
        precio_anterior = document.createElement('del');
        precio_anterior.textContent = item.precio + ' €';
        priceSpan.appendChild(precio_anterior);
    } 
    else {
        priceSpan.textContent = item.precio + ' €';
    } 
    productPrice.appendChild(priceSpan);

    // Completar la información del producto
    productTextInfo.appendChild(productPrice);
    productInfo.appendChild(productTextInfo);

    // Añadir la sección de selección de cantidad
    const qtySelector = document.createElement('div');
    qtySelector.className = 'qty-selector-carrito';

    // Añadir la sección de números de cantidad
    const qtySelectorNumber = document.createElement('div');
    qtySelectorNumber.className = 'qty-selector-number-carrito';

    // Añadir los botones de incremento y decremento de cantidad
    const qtyDown = document.createElement('span');
    qtyDown.className = 'qty-down-carrito';
    qtyDown.id = 'qty-down-carrito-id-'+item.id_producto;
    qtyDown.textContent = '-';
    const qtyNumber = document.createElement('span');
    qtyNumber.className = 'qty-number-carrito';
    qtyNumber.id = 'qty-number-carrito-id-'+item.id_producto;
    qtyNumber.textContent = qty.toString();
    const qtyUp = document.createElement('span');
    qtyUp.className = 'qty-up-carrito';
    qtyUp.id = 'qty-up-carrito-id-'+item.id_producto;
    qtyUp.textContent = '+';

    // Añadir los elementos de cantidad
    qtySelectorNumber.appendChild(qtyDown);
    qtySelectorNumber.appendChild(qtyNumber);
    qtySelectorNumber.appendChild(qtyUp);

    // Añadir el icono de eliminación de producto
    const eliminateProduct = document.createElement('i');
    eliminateProduct.className = 'eliminate-product-carrito fa fa-trash';
    eliminateProduct.id = 'eliminate-product-carrito-id-'+item.id_producto;

    // Completar la sección de selección de cantidad
    qtySelector.appendChild(qtySelectorNumber);
    qtySelector.appendChild(eliminateProduct);

    productContainer.appendChild(productInfo);
    productContainer.appendChild(qtySelector);

    return productContainer;
}

// crearTarjeta({modelo: 'HyperX Fury 8GB', marca: 'Kingston', price: 34.99}, 1);
function mostrarTarjeta(item,qty) {
    const tarjeta = crearTarjeta(item,qty);
    const horizontalLine = document.createElement('div');
    horizontalLine.className = 'carrito-horizontal-line';

    list_carrito_list = document.getElementById('list-carrito-list');
    list_carrito_list.appendChild(tarjeta);
    list_carrito_list.appendChild(horizontalLine);
}

// async function mostrarCarrito() {
//     mostrarTarjeta({modelo: '1HyperX Fury 8GB', marca: 'Kingston', price: 34.99}, 1);
//     mostrarTarjeta({modelo: '2HyperX Fury 8GB', marca: 'Kingston', price: 34.99}, 1);
// }

function eliminarCarrito() {
    list_carrito_list = document.getElementById('list-carrito-list')
    list_carrito_list.innerHTML = ''
    summary_carrito_list = document.getElementById('summary-carrito-list')
    summary_carrito_list.innerHTML = ''
    
    carrito = document.getElementById('carrito-list');
    carrito.style.display = "none";

}
async function mostrarCarrito() {
    carrito = document.getElementById('carrito-list');
    carrito.style.display = "block";

    list_carrito_list = document.getElementById('list-carrito-list')
    list_carrito_list.innerHTML = ''
    summary_carrito_list = document.getElementById('summary-carrito-list')
    summary_carrito_list.innerHTML = ''

    cart = sessionStorage.getItem('cart');
    
    if (cart === null || cart === "") {
        order_summary_id.style.display = "none";
        div_carrito_vacio = document.createElement('h2')
        div_carrito_vacio.textContent = "tu carrito está vacío"
        div_carrito_vacio.className = "text-center"
        div_carrito_vacio.style.marginTop = "50px"
        div_carrito_por_ahora = document.createElement('h4')
        div_carrito_por_ahora.textContent = "por ahora..."
        div_carrito_por_ahora.className = "text-center"
        div_carrito_por_ahora.style.marginTop = "10px"
        div_carrito_vacio.appendChild(div_carrito_por_ahora)
        
        botones_carrito_vacio = document.createElement('button')
        botones_carrito_vacio.className = "primary-btn"
        botones_carrito_vacio.style.marginTop = "25px"
        botones_carrito_vacio.textContent = "Ir a la tienda"
        botones_carrito_vacio.addEventListener('click', () => {
            window.location.href = '/store.html';
        });
        div_carrito_vacio.appendChild(botones_carrito_vacio)
        list_carrito_list.appendChild(div_carrito_vacio)

    } 
    else {
        precio_acumulado_carrito = 0;
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
                    precio_acumulado_carrito += precio_a_sumar;
                    mostrarTarjeta(data, veces, hay_descuento,precio_descuento);
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

            createSummaryCarritoList(precio_acumulado_carrito.toFixed(2) + " €")

            createEventosModificarCantidad();

        } catch (error) {
            console.error('Error en Promise.all:', error);
        }
    }
}

function createEventComprar() {
    boton_comprar = document.getElementById('boton-comprar');
    boton_comprar.addEventListener('click', () => {
        sessionStorage.setItem('cart', '');
        window.location.href = '/index.html';
    });
}

function createEventosModificarCantidad() {
    botones1 = document.querySelectorAll(".qty-down-carrito")
    botones2 = document.querySelectorAll(".qty-up-carrito")
    botones3 = document.querySelectorAll(".eliminate-product-carrito")
    botones = [...botones1, ...botones2, ...botones3]

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            id = boton.id.replace("qty-down-carrito-id-", "").replace("qty-up-carrito-id-", "").replace("eliminate-product-carrito-id-", "");
            
            if (boton.id.includes("qty-down-carrito-id-")) {
                console.log(id+" down")
                qty = sessionStorage.getItem('cart').split(";").filter(item => item.includes("id"+id))[0].split(":")[1]
                console.log(qty)
                if (qty <= 1) {
                    sessionStorage.setItem('cart', sessionStorage.getItem('cart').replace("id"+id+":"+qty, "id"+id+":"+1));
                }
                else {
                    sessionStorage.setItem('cart', sessionStorage.getItem('cart').replace("id"+id+":"+qty, "id"+id+":"+(parseInt(qty)-1)));
                }
                mostrarCarrito();  
            } 
            else if (boton.id.includes("qty-up-carrito-id-")) {
                console.log(id+" up")
                qty = sessionStorage.getItem('cart').split(";").filter(item => item.includes("id"+id))[0].split(":")[1]
                sessionStorage.setItem('cart', sessionStorage.getItem('cart').replace("id"+id+":"+qty, "id"+id+":"+(parseInt(qty)+1)));  
                mostrarCarrito();  
            }
            else if (boton.id.includes("eliminate-product-carrito-id-")) {
                console.log(id+" eliminate")
                qty = sessionStorage.getItem('cart').split(";").filter(item => item.includes("id"+id))[0].split(":")[1]
                sessionStorage.setItem('cart', sessionStorage.getItem('cart').replace(";id"+id+":"+qty,""));  
                mostrarCarrito();  
            }
        });
    });
}



function createSummaryCarritoList(total) {
    // Crear el elemento principal
    const summaryCarritoList = document.createElement('div');
    summaryCarritoList.className = 'summary-carrito-list';
  
    // Crear la sección de total del carrito
    const totalCarritoList = document.createElement('div');
    totalCarritoList.className = 'total-carrito-list';
  
    // Añadir los elementos de total del carrito
    const totalSpan = document.createElement('span');
    totalSpan.textContent = 'TOTAL';
    const precioTotalSpan = document.createElement('span');
    precioTotalSpan.id = 'precio-total-carrito-list';
    precioTotalSpan.textContent = total;
  
    // Completar la sección de total del carrito
    totalCarritoList.appendChild(totalSpan);
    totalCarritoList.appendChild(precioTotalSpan);
  
    // Crear la sección de botones del carrito
    const botonesCarritoList = document.createElement('div');
    botonesCarritoList.className = 'botones-carrito-list';
  
    // Añadir el botón de comprar
    const botonComprar = document.createElement('a');
    botonComprar.href = 'checkout.html';
    botonComprar.id = 'boton-comprar';
    botonComprar.className = 'primary-btn';
    botonComprar.textContent = 'COMPRAR';
  
    // Completar la sección de botones del carrito
    botonesCarritoList.appendChild(botonComprar);
  
    // Completar el elemento principal
    summaryCarritoList.appendChild(totalCarritoList);
    summaryCarritoList.appendChild(botonesCarritoList);
    
    document.getElementById('summary-carrito-list').appendChild(summaryCarritoList);

    createEventComprar();
    // Devolver el HTML como una cadena
    return summaryCarritoList;
}

function foto(tipo) {
    switch (tipo) {
        case "procesador":
            return "https://thumb.pccomponentes.com/w-300-300/articles/1064/10644154/1324-intel-core-i5-13400f-25-ghz-46-ghz.jpg";
        case "placa_base":
            return "https://thumb.pccomponentes.com/w-530-530/articles/30/302203/1879-msi-mpg-b550-gaming-plus.jpg";
        case "grafica":
            return "https://thumb.pccomponentes.com/w-300-300/articles/1070/10706590/18-gigabyte-geforce-rtx-4070-gaming-oc-12-gb-gddr6x-dlss3-9c6abf07-81c0-4863-95cb-2ae6467fc76d.jpg";
        case "ram":
            return "https://thumb.pccomponentes.com/w-300-300/articles/1071/10711396/1323-corsair-vengeance-rgb-ddr5-6000mhz-pc5-48000-32gb-2x16gb-cl36-negro.jpg";
        case "disco_duro":
            return "https://thumb.pccomponentes.com/w-300-300/articles/28/281064/seagate-ironwolf-nas-8-tb-sata3-caracteristicas.jpg";
        case "caja_torre":
            return "https://thumb.pccomponentes.com/w-300-300/articles/33/332443/1398-tempest-umbra-rgb-torre-atx-negra-caracteristicas.jpg";
        case "ventilador":
            return "https://thumb.pccomponentes.com/w-300-300/articles/51/516914/1499-tempest-fan-120mm-argb-black-pwm.jpg";
        case "fuente_alimentacion":
            return "https://thumb.pccomponentes.com/w-300-300/articles/1074/10745583/3516-msi-mag-a750gl-pcie5-750w-80-plus-gold-modular-mejor-precio.jpg";
    }
}
