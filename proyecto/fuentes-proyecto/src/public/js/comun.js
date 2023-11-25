window.addEventListener('load', mostrarEnlaceDatos);

function mostrarEnlaceDatos() {
	if (sessionStorage.getItem("cart") === "") {
        document.getElementById("number_carrito").style.display = "none";
    }
	else {
		document.getElementById("number_carrito").textContent = getNumberCart();
		document.getElementById("number_carrito").style.display = "block";
	}
	const datosLi = document.getElementById('datosLi');
	const loginpopup = document.getElementById('loginpop');
	console.log(sessionStorage.getItem('userToken'));
	if (sessionStorage.getItem('userToken') === null) {
		sessionStorage.setItem('userToken', false);

	}
	else if (sessionStorage.getItem('userToken')== 'true') {
	  datosLi.style.display = 'block'; // Mostrar el enlace "Datos"
	  loginpopup.style.display = "none";

	}
	 else {
	  datosLi.style.display = 'none'; // Ocultar el enlace "Datos"
	  loginpopup.style.display = "block";
	}
  }



search_btn_header = document.getElementById("search-btn-header")
search_btn_header.addEventListener('click', () => {
    event.preventDefault()
    
    // search_products_header();
});


function getNumberCart() {
	cart = sessionStorage.getItem('cart');
	if (cart === null || cart === "") {
		return 0;
	} else {
		item_sum = [];
		cart_list = cart.split(";");
		cart_list.forEach(item => {
			item_sum.push(parseInt(item.split(":")[1]));
		});
		item_sum.shift();
		item_sum = item_sum.reduce((a, b) => a + b, 0);
		console.log(item_sum);
		return item_sum;
	}
}



