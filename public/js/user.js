function crearTarjeta(item,new_product) {
    div_product = document.createElement('div');
    div_product.classList.add("product");

    div_id = document.createElement('div');
    div_id.classList.add("product-id");
    div_id.textContent = item["id_producto"];
    div_id.style.display = "none";
    div_product.appendChild(div_id);

    div_img = document.createElement('div');
    div_img.classList.add("product-img");

    div_body = document.createElement('div');
    div_body.classList.add("product-body");

    div_cart = document.createElement('div');
    div_cart.classList.add("add-to-cart");

    img_product = document.createElement('img');
    img_product.src = foto(item["tipo"]);
    img_product.alt = "Producto 1";
    div_img.appendChild(img_product);
    if (new_product) {
        div_product_label = document.createElement('div');
        div_product_label.classList.add("product-label");
        span_new = document.createElement('span');
        span_new.classList.add("new");
        span_new.textContent = "NUEVO";
        div_product_label.appendChild(span_new);
        div_img.appendChild(div_product_label);
    }
    if (item["descuento"] != 0) {
        div_product_label = document.createElement('div');
        div_product_label.classList.add("product-label");
        span_sale = document.createElement('span');
        span_sale.classList.add("sale");
        span_sale.textContent = "-"+item["descuento"]+"%";
        div_product_label.appendChild(span_sale);
        div_img.appendChild(div_product_label);
    }

    p_tipo = document.createElement('p');
    p_tipo.classList.add("product-category");
    p_tipo.textContent = item["tipo"].replace(/_/g, ' ')
    
    h3_nombre = document.createElement('h3');
    h3_nombre.classList.add("product-name");
    ah3_nombre = document.createElement('a');
    // ah3_nombre.href = "product.html";
    ah3_nombre.classList.add("producto-link");
    ah3_nombre.id = "producto-link-id-" + item["id_producto"];
    ah3_nombre.textContent = item["modelo"];
    h3_nombre.appendChild(ah3_nombre);

    h4_precio = document.createElement('h4');
    h4_precio.classList.add("product-price");

    if (item["descuento"] != 0) {
        var descuento = item["descuento"];
        var precio = item["precio"];
        var nuevo_precio = precio - (precio * (descuento / 100));
        h4_precio.textContent = nuevo_precio.toFixed(2) + "€";
        del_precio = document.createElement('del');
        del_precio.classList.add("product-old-price");
        del_precio.textContent = precio + "€";
        h4_precio.appendChild(del_precio);
    } else {
        h4_precio.textContent = item["precio"] + "€";
    }
        
    div_stars = document.createElement('div');
    div_stars.classList.add("product-rating");
    for (let i = 0; i < 5; i++) {
        i_star = document.createElement('i');
        i_star.classList.add("fa");
        i_star.classList.add("fa-star");
        div_stars.appendChild(i_star);
    }
    div_btns = document.createElement('div');
    div_btns.classList.add("product-btns");
    
    i_heart = document.createElement('i');
    i_heart.classList.add("fa");
    i_heart.classList.add("fa-heart-o");
    

    div_body.appendChild(p_tipo);
    div_body.appendChild(h3_nombre);
    div_body.appendChild(h4_precio);
    div_body.appendChild(div_stars);
    div_body.appendChild(div_btns);

    btn_cart = document.createElement('button');
    btn_cart.classList.add("add-to-cart-btn");
    btn_cart.classList.add("anadir-carrito-product");
    btn_cart.id = "qty-up-carrito-id-" + item["id_producto"];
    i_cart = document.createElement('i');
    i_cart.classList.add("fa");
    i_cart.classList.add("fa-shopping-cart");
    btn_cart.textContent = "añadir al carrito";
    btn_cart.value = item["id_producto"];
  
    btn_cart.appendChild(i_cart);
    div_cart.appendChild(btn_cart);


    div_product.appendChild(div_img);
    div_product.appendChild(div_body);
    div_product.appendChild(div_cart);
    
    return div_product
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
function new_products () {
    fetch("new_products")
    .then(response => response.json())
    .then(data => {
        new_products = document.getElementById('new_products_user');
        data.forEach(item => {
            const div_product = crearTarjeta(item,true);
            new_products.appendChild(div_product); 
        });

    })
    .catch(error => console.error('Error:', error));
}

function top_selling () {
    try {
        fetch("top_selling")
        .then(response => response.json())
        .then(data => {
            top_selling_user = document.getElementById('top_selling_user');
            data.forEach(item => {
                const div_product = crearTarjeta(item,false);
                top_selling_user.appendChild(div_product); 
            });
        })
        .then(() => {
            createEventosModificarCantidad();
            crearEventsListenersProductos();
        });
    }
    catch(error) {
         console.error('Error:', error)
    }
}

new_products();
top_selling();



//   <div class="product">
//     <div class="product-img">
//         <img src="https://m.media-amazon.com/images/I/61NsdQqTUzL._AC_UF894,1000_QL80_.jpg" alt="Producto 1">
//         <div class="product-label">
//             <span class="sale">-30%</span>
//             <span class="new">NEW</span>
//         </div>
//     </div>
//     <div class="product-body">
//         <p class="product-category">Procesador</p>
//         <h3 class="product-name"><a href="#">Intel Core i7</a></h3>
//         <h4 class="product-price">$249.99 <del class="product-old-price">$299.99</del></h4>
//         <div class="product-rating">
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//             <i class="fa fa-star"></i>
//         </div>
//         <div class="product-btns">
//             <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
//         </div>
//     </div>
//     <div class="add-to-cart">
//         <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> añadir al carrito</button>
//     </div>
// </div>