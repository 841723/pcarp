function crearTarjeta(item) {
    div_product = document.createElement('div');
    div_product.classList.add("product");

    div_img = document.createElement('div');
    div_img.classList.add("product-img");

    div_body = document.createElement('div');
    div_body.classList.add("product-body");

    div_cart = document.createElement('div');
    div_cart.classList.add("add-to-cart");

    img_product = document.createElement('img');
    img_product.src = "./media/box.png";
    img_product.alt = "Producto 1";
    div_img.appendChild(img_product);
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
    h3_nombre.textContent = item["nombre"];

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
    btn_wishlist = document.createElement('button');
    btn_wishlist.classList.add("add-to-wishlist");
    i_heart = document.createElement('i');
    i_heart.classList.add("fa");
    i_heart.classList.add("fa-heart-o");
    btn_wishlist.appendChild(i_heart);
    span_tooltip = document.createElement('span');
    span_tooltip.classList.add("tooltipp");
    span_tooltip.textContent = "add to wishlist";
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
    btn_cart.appendChild(i_cart);
    btn_cart.textContent = "añadir al carrito";
    div_cart.appendChild(btn_cart);


    div_product.appendChild(div_img);
    div_product.appendChild(div_body);
    div_product.appendChild(div_cart);
    
    return div_product
}   


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