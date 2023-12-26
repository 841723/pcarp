function crearImagenProducto(item) {
    console.log(item);
    div_object = document.createElement('div');
    div_object.style = "display:flex"


    div_imagenes1 = document.createElement('div');
    div_imagenes1.id = "product-main-img";

    for (let i = 0; i < 1; i++) {
        div_preview = document.createElement('div');
        div_preview.classList.add("product-preview");

        img_preview = document.createElement('img');
        img_preview.src = foto(item.tipo);
        img_preview.alt = "Producto 1";
        img_preview.style = "width: auto; height: 500px;"
        div_preview.appendChild(img_preview);

        div_imagenes1.appendChild(div_preview);
    }

    div_object.appendChild(div_imagenes1);

    div_object2 = document.createElement('div');
    div_object2.classList.add("col-md-2");
    div_object2.classList.add("col-md-pull-5");

    div_imagenes2 = document.createElement('div');

    div_text = document.createElement('div');
    div_text.style = "width: 3000px;"

    div_details = document.createElement('div');
    div_details.classList.add("product-details");

    h2_name = document.createElement('h2');
    h2_name.classList.add("product-name");
    h2_name.textContent = item.modelo + " - " + item.marca ;

    div_stars = document.createElement('div');
    div_stars.classList.add("product-rating");
    for (let i = 0; i < 5; i++) {
        i_star = document.createElement('i');
        i_star.classList.add("fa");
        i_star.classList.add("fa-star");
        div_stars.appendChild(i_star);
    }

    div_empty = document.createElement('div');
    h3_price = document.createElement('h3');
    h3_price.classList.add("product-price");
    h3_price.textContent = item.precio + "€";

        span_in_stock = document.createElement('span');
        span_in_stock.classList.add("product-available");
        span_in_stock.textContent = "In Stock";

    div_empty.appendChild(h3_price);
    div_empty.appendChild(span_in_stock);

    p_description = document.createElement('p');
    p_description.textContent = item.descripcion;

    div_details.appendChild(h2_name);
    div_details.appendChild(div_stars);
    div_details.appendChild(div_empty);
    div_details.appendChild(p_description);

    div_options = document.createElement('div');
    div_options.classList.add("product-options");

    label_color = document.createElement('label');
    label_color.textContent = "Color";
    select_color = document.createElement('select');
    select_color.classList.add("input-select");

    option_color = document.createElement('option');
    option_color.value = "0";
    option_color.textContent = "Rojo";
    select_color.appendChild(option_color);

    option_color = document.createElement('option');
    option_color.value = "1";
    option_color.textContent = "Blanco";
    select_color.appendChild(option_color);

    option_color = document.createElement('option');
    option_color.value = "2";
    option_color.textContent = "Negro"
    select_color.appendChild(option_color);
    
    option_color = document.createElement('option');
    option_color.value = "3";
    option_color.textContent = "Azul"
    select_color.appendChild(option_color);

    option_color = document.createElement('option');
    option_color.value = "4";
    option_color.textContent = "RGB"
    select_color.appendChild(option_color);

    div_cart = document.createElement('div')
    div_cart.classList.add("add-to-cart");

    button_cart = document.createElement('button');
    button_cart.classList.add("add-to-cart-btn");
    button_cart.classList.add("anadir-carrito-product");
    button_cart.id = "qty-up-carrito-id-" + item.id_producto
    button_cart.textContent = "añadir al carrito";

    div_cart.appendChild(button_cart);

    ul_btns = document.createElement('ul');
    ul_btns.classList.add("product-btns");
    li_btns = document.createElement('li');
    i_btns = document.createElement('i');
    i_btns.classList.add("fa");
    i_btns.classList.add("fa-heart-o");
    ul_btns.appendChild(li_btns);

    div_options.appendChild(label_color);
    div_options.appendChild(select_color);

    div_details.appendChild(div_options);
    div_details.appendChild(div_cart);
    div_details.appendChild(ul_btns);

    div_text.appendChild(div_details);

    div_object.appendChild(div_text);

    div_object2.appendChild(div_imagenes2);
    div_object.appendChild(div_object2);
    return div_object;
}

function foto(tipo) {
    console.log(tipo);
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

function crearPag() {
    let url = ""
    let random = false
    if (sessionStorage.getItem("id_producto") == null || sessionStorage.getItem("id_producto") == "") {
        random = true
        url = "/products_random"
    }
    else {
        random = false
        url = "/products_id?id="+(sessionStorage.getItem("id_producto")) 
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (random==true) {
            value = data[0]
        }
        else {
            value = data
        }
        product_see = document.getElementById('product_see');
        item = crearImagenProducto(value)
        product_see.appendChild(item);
        createEventosModificarCantidad();
    })
    .catch(error => console.error('Error:', error));
}

crearPag();



// <!-- Product main img -->
// 					<div class="col-md-5 col-md-push-2">
// 						<div id="product-main-img">
// 							<div class="product-preview">
// 								<img src="./img/product01.png" alt="">
// 							</div>

// 							<div class="product-preview">
// 								<img src="./img/product03.png" alt="">
// 							</div>

// 							<div class="product-preview">
// 								<img src="./img/product06.png" alt="">
// 							</div>

// 							<div class="product-preview">
// 								<img src="./img/product08.png" alt="">
// 							</div>
// 						</div>
// 					</div>
// 					<!-- /Product main img -->

// 					<!-- Product thumb imgs -->
// 					<div class="col-md-2  col-md-pull-5">
// 						<div id="product-imgs">
// 							<div class="product-preview">
// 								<img src="./img/product01.png" alt="">
// 							</div>

// 							<div class="product-preview">
// 								<img src="./img/product03.png" alt="">
// 							</div>

// 							<div class="product-preview">
// 								<img src="./img/product06.png" alt="">
// 							</div>

// 							<div class="product-preview">
// 								<img src="./img/product08.png" alt="">
// 							</div>
// 						</div>
// 					</div>
// 					<!-- /Product thumb imgs -->

// 					<!-- Product details -->
// 					<div class="col-md-5">
// 						<div class="product-details">
// 							<h2 class="product-name">product name goes here</h2>
// 							<div>
// 								<div class="product-rating">
// 									<i class="fa fa-star"></i>
// 									<i class="fa fa-star"></i>
// 									<i class="fa fa-star"></i>
// 									<i class="fa fa-star"></i>
// 									<i class="fa fa-star-o"></i>
// 								</div>
// 								<a class="review-link" href="#">10 Review(s) | Add your review</a>
// 							</div>
// 							<div>
// 								<h3 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h3>
// 								<span class="product-available">In Stock</span>
// 							</div>
// 							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

// 							<div class="product-options">
// 								<label>
// 									Color
// 									<select class="input-select">
// 										<option value="0">Rojo</option>
// 										<option value="1">Blanco</option>
// 										<option value="2">Negro</option>
// 										<option value="3">Azul</option>
// 										<option value="4">RGB</option>
// 									</select>
// 								</label>
// 							</div>

// 							<div class="add-to-cart">
// 								<div class="qty-label">
// 									Cant
// 									<div class="input-number">
// 										<input type="number">
// 										<span class="qty-up">+</span>
// 										<span class="qty-down">-</span>
// 									</div>
// 								</div>
// 								<button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
// 							</div>

// 							<ul class="product-btns">
// 								<li><a href="#"><i class="fa fa-heart-o"></i> add to wishlist</a></li>
// 							</ul>				

// 						</div>
// 					</div>
// 					<!-- /Product details -->