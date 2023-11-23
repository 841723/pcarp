function crearTarjeta(item) {
    div_first = document.createElement('div');
    div_first.classList.add("col-md-4");
    div_first.classList.add("col-xs-6");

    div_product = document.createElement('div');
    div_product.classList.add("product");

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
    if (Math.random() >= 0.80 && item["descuento"] == 0) {
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
    p_tipo_text_content = item["tipo"]
    p_tipo_text_content.replace(/_/g, ' ')
    p_tipo.textContent = p_tipo_text_content;
    
    h3_nombre = document.createElement('h3');
    h3_nombre.classList.add("product-name");
    ah3_nombre = document.createElement('a');
    ah3_nombre.href = "#";
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
    num_stars = randomStars(50,25);
    for (let i = 0; i < 5; i++) {
        i_star = document.createElement('i');
        i_star.classList.add("fa");
        if (num_stars > 1) {
            i_star.classList.add("fa-star");
            num_stars--;
        } 
        else if (num_stars == 0.5) {
            i_star.classList.add("fa-star-half-o");
            num_stars--;
        } 
        else {
            i_star.classList.add("fa-star-o");
        }
        div_stars.appendChild(i_star);
    }
    function randomStars(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min) / 5 * 5;
    }
    
    div_btns = document.createElement('div');
    div_btns.classList.add("product-btns");
    btn_wishlist = document.createElement('button');
    btn_wishlist.classList.add("add-to-wishlist");
    i_heart = document.createElement('i');
    i_heart.classList.add("fa");
    i_heart.classList.add("fa-heart-o");
    btn_wishlist.appendChild(i_heart);
    span_tooltip = document.createElement('span');
    span_tooltip.classList.add("tooltipp");
    span_tooltip.textContent = "añadir a la lista de deseos";
    btn_wishlist.appendChild(span_tooltip);
    div_btns.appendChild(btn_wishlist);

    div_body.appendChild(p_tipo);
    div_body.appendChild(h3_nombre);
    div_body.appendChild(h4_precio);
    div_body.appendChild(div_stars);
    div_body.appendChild(div_btns);

    btn_cart = document.createElement('button');
    btn_cart.classList.add("add-to-cart-btn");
    i_cart = document.createElement('i');
    i_cart.classList.add("fa");
    i_cart.classList.add("fa-shopping-cart");
    btn_cart.textContent = "añadir al carrito";
    btn_cart.appendChild(i_cart);
    div_cart.appendChild(btn_cart);


    div_product.appendChild(div_img);
    div_product.appendChild(div_body);
    div_product.appendChild(div_cart);
    
    div_first.appendChild(div_product)
    return div_first
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

function hot_deals () {
    num_show_prod = document.getElementById('num_show_prod')
    number_productos = num_show_prod.options[num_show_prod.selectedIndex].text
    sort_by_show = document.getElementById('sort_by_show')
    order_by = sort_by_show.options[sort_by_show.selectedIndex].text

    price_max = document.getElementById('price-max').value
    price_min = document.getElementById('price-min').value
    if (price_max == "") { price_max = 999999 }
    if (price_min == "") { price_min = 0 }

    if (order_by == "Popular") { order_by = "ventas" }
    if (order_by == "Mas baratos primero") { order_by = "precio_asc" }
    if (order_by == "Mas caros primero") { order_by = "precio_desc" }

    selected_brands = document.getElementById('checkbox-marcas').querySelectorAll('input[type=checkbox]:checked');
    brands_names = []
    for (let i = 0; i < selected_brands.length; i++) {
        brands_names.push(selected_brands[i].parentElement.textContent.trim())
    }
    

    search_products(search_for,number_productos,order_by,price_max,price_min,brands_names)
}
   

function search_products (tipo,cantidad,order,precio_max,precio_min,brands_names) {
    stringCodificado = encodeURI("tipo="+tipo+"&cantidad="+cantidad+"&order="+order+
                                 "&precio_max="+precio_max+"&precio_min="+precio_min+"&brands_names="+brands_names);
    const url = `/search_products?${stringCodificado}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        product_container = document.getElementById('product-container');
        product_container.innerHTML = ""
        data.forEach(item => {
            const div_product = crearTarjeta(item);
            product_container.appendChild(div_product); 
        });
        if (data.length == 0) {
        
        }
        else if (data.length % 3 != 0) {
            for (let i = 0; i < 3 - (data.length % 3); i++) {
     
                const empty_div = crearTarjeta(data[0],false);
                product_container.appendChild(empty_div); 
            }
        }
        // codigo en js que indica cuantos objetos hay en la lista data
        showing_number = document.getElementById('showing-number');
        showing_number.textContent = "Mostrando " + data.length + " productos";
    })
    .catch(error => console.error('Error:', error));
}



num_show_prod = document.getElementById('num_show_prod')
num_show_prod.addEventListener('change', () => {
    selectedOptionText = num_show_prod.options[num_show_prod.selectedIndex].text;
    hot_deals();
});

sort_by_show = document.getElementById('sort_by_show')
sort_by_show.addEventListener('change', () => {
    selectedOptionText = sort_by_show.options[sort_by_show.selectedIndex].text;
    hot_deals();
});

search_btn_user = document.getElementById('search-btn-user')
search_btn_user.addEventListener('click', () => {
    hot_deals();
});


navbar_buttons = document.querySelectorAll('.navbar-btn')
navbar_buttons.forEach(navbar_button => {
    navbar_button.addEventListener('click', () => {
        search_for = navbar_button.textContent.trim();
        for (let i = 0; i < navbar_buttons.length; i++) {
            navbar_buttons[i].classList.remove("active");
        }
        navbar_button.classList.add("active");
        console.log(search_for)
        hot_deals();
    })
});

search_for = "none"
hot_deals();



